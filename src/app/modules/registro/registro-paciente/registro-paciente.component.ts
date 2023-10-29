import { Component,OnInit,  Input, Output, EventEmitter  } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Paciente } from 'src/app/classes/paciente';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {

  listadoObrasSociales:any;
  form!: FormGroup;
  mensajeError:any[]=[];
  mensajeExito:string="";
  usuarios:any[]=[];
  usuario:any;
  nuevoPaciente:any;

  @Output() verificacionEmail = new EventEmitter<string>();

  constructor(private authService: AuthService, private database: DataBaseService, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      
      nombre : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      edad: new FormControl("", [Validators.required, Validators.min(1), Validators.max(100)]),
      dni: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      obraSocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required]),


    });
  
    this.database.obtenerTodos('prestadores').subscribe((snapshot) => {
      // Assuming 'prestadores' is an array field in the data
      this.listadoObrasSociales = snapshot.map((item) => {
          const data: any = item.payload.doc.data();
          return {
              id: item.payload.doc.id,
              prestadores: data.prestadores || [], // Assuming it's an array field
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
            this.mensajeError.push(`Campo ${controlName} incorrecto`);
          }
        }
        console.log(this.mensajeError);
    } else if(this.form.valid) {
    const nombre = this.form.get('nombre')?.value;
    const apellido = this.form.get('apellido')?.value;
    const edad = this.form.get('edad')?.value;
    const email = this.form.get('email')?.value;
    const dni = this.form.get('dni')?.value;
    const obraSocial = this.form.get('obraSocial')?.value;
    const password = this.form.get('password')?.value;

    this.nuevoPaciente = new Paciente(nombre, apellido, edad, dni, email, password, obraSocial);
    this.registrarse();
    this.form.reset();
    this.redirigirVerificacionEmail();
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

        const nuevoPacienteJSON = this.nuevoPaciente.toJSON();

        console.log(nuevoPacienteJSON);
        this.database.crear('usuarios', nuevoPacienteJSON);
        

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

redirigirVerificacionEmail() {
  this.verificacionEmail.emit();
}

}
