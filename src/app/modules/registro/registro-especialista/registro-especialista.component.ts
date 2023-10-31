import { Component,OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Especialista } from 'src/app/classes/especialista';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit{

  listadoEspecialidades:any;
  form!: FormGroup;
  mensajeError:any[]=[];
  mensajeExito:string="";
  usuarios:any[]=[];
  nuevoEspecialista:any;
  mostrarEmailComponent:boolean=false;
  nuevaEspecialidad:boolean=false;
  otra = "Otra";

  constructor(private authService: AuthService, private database: DataBaseService, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      
      nombre : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      edad: new FormControl('', [Validators.required, Validators.min(18),  Validators.max(65)]),
      dni: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      especialidad: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required]),


    });
  
    this.database.obtenerTodos('especialidades').subscribe((snapshot) => {
      this.listadoEspecialidades = snapshot.map((item) => {
        const data: any = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          ...data,
        };
      });
    });

    this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
      // console.log("usuariosRef: ", usuariosRef);
       this.usuarios = usuariosRef.map(userRef => {
         let usuario: any = userRef.payload.doc.data();
         usuario['id'] = userRef.payload.doc.id;
         return usuario;
       });
       //console.log(this.usuarios)
     })
  }
    
  aceptar() {
    this.mensajeError=[];
    console.log("Nombre" + this.form?.get('nombre')?.value);
    if (this.form?.invalid) {
        for (const controlName in this.form?.controls) {
          if (this.form?.controls[controlName]?.invalid) {
            this.mensajeError.push(` ${controlName} `);
          }
        }
        console.log(this.mensajeError);
    } else if(this.form.valid) {
    const nombre = this.form.get('nombre')?.value;
    const apellido = this.form.get('apellido')?.value;
    const edad = this.form.get('edad')?.value;
    const email = this.form.get('email')?.value;
    const dni = this.form.get('dni')?.value;
    const especialidad = this.form.get('especialidad')?.value;
    const password = this.form.get('password')?.value;

    this.nuevoEspecialista = new Especialista(nombre, apellido, edad, dni, email, password, especialidad);
    this.registrarse();
    this.form.reset();
    this.nuevaEspecialidad = false;

  } else {
    console.log('Formulario Inválido');
  }
}


registrarse() {
  let email = this.form.get('email')?.value;
  let password = this.form.get('password')?.value;

  let lista = [...this.usuarios];
  let existe = lista.find(user => user.email == email);

  if (!existe) {
    this.authService.register(email, password).then(user => {
      if (user !== null) {
        console.log("Se registró en Firebase Authentication: ", user);

        const nuevoEspecialistaJSON = this.nuevoEspecialista.toJSON();

        console.log(nuevoEspecialistaJSON);
        this.database.crear('usuarios', nuevoEspecialistaJSON);

      } else {
        console.log("Error. Ingrese datos válidos");
      }
    }).catch(err => {
      console.log(err);
    });
  } else {
    this.mensajeError.push("El usuario ya se encuentra registrado");
  }
}


selectChange(event: Event) {
  const valor = (event.target as HTMLSelectElement).value;

  console.log("aca");

  if (valor.toLowerCase() === "otra") {
    this.nuevaEspecialidad = true;
    console.log("aca");
} else {
    this.nuevaEspecialidad = false;
}
}

}

