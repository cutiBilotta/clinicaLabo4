import { Component,OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Especialista } from 'src/app/classes/especialista';
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

  constructor(private database: DataBaseService, private formBuilder: FormBuilder){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      
      nombre : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
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
    const email = this.form.get('email')?.value;
    const dni = this.form.get('dni')?.value;
    const especialidad = this.form.get('especialidad')?.value;
    const password = this.form.get('password')?.value;

    let nuevoEspecialista = new Especialista(nombre, apellido, dni, email, password, especialidad);
    const nuevoEspecialistaJSON = nuevoEspecialista.toJSON();

    this.database.crear('especialistas', nuevoEspecialistaJSON);
    this.mensajeExito= 'Se dio de alta un nuevo Especialista';
    this.form.reset();
  } else {
    console.log('Form is invalid');
    // You can also display error messages if needed
  }
}
}

