import { Component,OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Especialista } from 'src/app/classes/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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
  imagenIngresada:boolean = false;
  especialidadesSeleccionadas: string[] = [];


  constructor(private authService: AuthService, private database: DataBaseService, private formBuilder: FormBuilder, private router:Router){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      
      nombre : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      edad: new FormControl('', [Validators.required, Validators.min(18),  Validators.max(65)]),
      dni: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      especialidad: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      nuevaEspecialidadControl: new FormControl('')


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
    } else if (this.form.valid) {
      const nombre = this.form.get('nombre')?.value;
      const apellido = this.form.get('apellido')?.value;
      const edad = this.form.get('edad')?.value;
      const email = this.form.get('email')?.value;
      const dni = this.form.get('dni')?.value;
      const password = this.form.get('password')?.value;
  
      // Verifica si se ha ingresado una especialidad personalizada
      const especialidadControl = this.form.get('especialidad');
      const especialidad = this.especialidadesSeleccionadas.slice(); // Clonar el array para evitar referencias
      if (this.nuevaEspecialidad) {
        const nuevaEspecialidad = this.form.get('nuevaEspecialidadControl')?.value;
        especialidad.push(nuevaEspecialidad);
        especialidadControl?.setValue(especialidad);
      }
  
      this.nuevoEspecialista = new Especialista(nombre, apellido, edad, dni, email, password, especialidad);
      this.registrarse();
      this.form.reset();
      this.nuevaEspecialidad = false;
      this.router.navigateByUrl('/verificacion');
      this.especialidadesSeleccionadas = []; // Reinicia la lista de especialidades seleccionadas
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


selectChange(event: any) {
  const checkbox = event.target as HTMLInputElement;
  const valor = checkbox.value;

  if (valor.toLowerCase() == "otra") {
    this.nuevaEspecialidad = checkbox.checked; // Solo actualiza nuevaEspecialidad si "Otra" está marcada
  } else {
    this.nuevaEspecialidad = false;
  

    // Verifica si la especialidad ya está en la lista de seleccionadas antes de agregarla.
    if (checkbox.checked && !this.especialidadesSeleccionadas.includes(valor)) {
      this.especialidadesSeleccionadas.push(valor);
    } else if (!checkbox.checked) {
      // Checkbox desmarcado, eliminar del array
      const index = this.especialidadesSeleccionadas.indexOf(valor);
      if (index !== -1) {
        this.especialidadesSeleccionadas.splice(index, 1);
      }
    }
  }

  console.log(this.especialidadesSeleccionadas);
}

}


