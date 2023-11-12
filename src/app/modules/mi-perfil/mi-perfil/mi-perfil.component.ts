import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit{

  constructor(private authService:AuthService, private database:DataBaseService, private storageService:StorageService, private formBuilder: FormBuilder){}
  usuarioLoggeado:any;
  usuarioBD:any;
  imagenUrl:any;
  diasHabiles:string[] =["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  diasSeleccionados: { [key: string]: boolean } = {};
  especialidadSeleccionada:string="";
  mostrarForm:boolean=false;
  mensajeError:string="";
  usuarios:any[]=[];
  form!: FormGroup;
  especialidadesSelect:any;

  ngOnInit(): void {


    this.authService.getUserLogged().subscribe((user) => {
      if (user) {
        this.usuarioLoggeado = user;
  
        // Ahora puedes acceder al email del usuario
        const email = user.email;
        console.log('Email del usuario loggeado:', email);
        this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
          this.usuarios = usuariosRef.map((userRef) => {
            let usuario: any = userRef.payload.doc.data();
            usuario['id'] = userRef.payload.doc.id;
            return usuario;
          });
          console.log(this.usuarios);
  
          this.usuarioBD = this.usuarios.find((usuario) => usuario.email == email);
  
          if (this.usuarioBD) {
            // El usuario loggeado coincide con un usuario en el array de usuarios
            console.log('Usuario encontrado en el array de usuarios:', this.usuarioBD);
  
   
            if (this.usuarioBD.perfil.toLowerCase() == "paciente") {
              const nombreImagen = this.usuarioBD.imgPerfil[0];
              this.storageService.obtenerImagen(nombreImagen).then((url) => {
                this.imagenUrl = url;
                console.log(this.imagenUrl);
              });
            } else if (this.usuarioBD.perfil.toLowerCase() == "administrador") {
              const nombreImagen = this.usuarioBD.imgPerfil;
              this.storageService.obtenerImagen(nombreImagen).then((url) => {
                this.imagenUrl = url;
                console.log(this.imagenUrl);
              });


            }else if(this.usuarioBD.perfil.toLowerCase() == "especialista"){
              if (this.usuarioBD.perfil.toLowerCase() == "especialista") {
                const especialidadesEspecialista = this.usuarioBD.especialidad; // Obtén las especialidades del especialista
                const especialidadesConDisponibilidad = this.usuarioBD.disponibilidad.map((disponibilidad: any) => disponibilidad.especialidad);
                const especialidadesSinDisponibilidad = especialidadesEspecialista.filter((especialidad: string) =>
                    !especialidadesConDisponibilidad.includes(especialidad)
                );
                if (especialidadesSinDisponibilidad.length > 0) {
             
                    this.especialidadesSelect = especialidadesSinDisponibilidad;
                } else {
                   
                    this.especialidadesSelect = [];
                }
            }


            }
          }
        });
      }
    });
  }

  seleccionarEspecialidad(event: any) {
    this.especialidadSeleccionada = event.target.value;
    this.mostrarForm=true;
    
  }

  definirDisponibilidad() {
    let vacio = true;
  
    interface DiaHorario {
      [dia: string]: { inicio: number; egreso: number };
    }
  
    const disponibilidadEspecialista = {
      especialidad: this.especialidadSeleccionada,
      horarios: {} as DiaHorario  // Definimos el tipo de horarios
    };
  
    for (const dia in this.diasSeleccionados) {
      vacio = false;
      if (this.diasSeleccionados[dia]) {
        const horaIngresoInput = document.getElementById(`inputIngreso_${dia}`) as HTMLInputElement;
        const horaEgresoInput = document.getElementById(`inputEgreso_${dia}`) as HTMLInputElement;
  
        const horarioIngreso = +horaIngresoInput.value;
        const horarioEgreso = +horaEgresoInput.value;
  
        console.log(horarioEgreso);
        console.log(horarioIngreso);
  
        if (horaIngresoInput.value == "" || horaEgresoInput.value == "") {
          this.mensajeError = `Debe ingresar horarios para ${dia}`;
          return;
        }
  
        if (horarioIngreso >= 8 && horarioIngreso <= 19 && horarioEgreso >= 8 && horarioEgreso <= 19) {
          disponibilidadEspecialista.horarios[dia] = { inicio: horarioIngreso, egreso: horarioEgreso };
        } else {
          this.mensajeError = 'Los horarios ingresados no son válidos';
          return;
        }
      }
    }
  
    if (vacio) {
      this.mensajeError = "Debe definir su disponibilidad";
      return;
    } else {
      if (!this.usuarioBD.disponibilidad) {
        this.usuarioBD.disponibilidad = [];
      }
      //resetearForm

      this.usuarioBD.disponibilidad.push(disponibilidadEspecialista);
  
      this.database.actualizar("usuarios", this.usuarioBD, this.usuarioBD.id);
      console.log(this.usuarioBD);
    }
  }


}






