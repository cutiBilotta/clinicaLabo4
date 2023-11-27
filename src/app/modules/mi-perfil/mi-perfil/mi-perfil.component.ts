import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from'sweetalert2';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit{

  constructor(private router: Router, private authService:AuthService, private database:DataBaseService, private storageService:StorageService, private formBuilder: FormBuilder){}
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
  esPaciente:boolean=false;
  historiaClinica:any;
  turnos:any[]=[];
  turnosUsuarioActual:any[]=[];
  especialistasFiltrados:any[]=[];
  especialistas:any[]=[];

  especialistaSeleccionado:any;
  informacion:any[]=[];
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

          this.especialistas = this.usuarios.filter(user => user.perfil.toLowerCase() === "especialista");
console.log(this.especialistas);
          this.database.obtenerTodos("turnos").subscribe((turnosRef) => {
            this.turnos = turnosRef.map(turnoRef => {
              let turno: any = turnoRef.payload.doc.data();
              turno['id'] = turnoRef.payload.doc.id;
              return turno;
            });
          
  
          this.usuarioBD = this.usuarios.find((usuario) => usuario.email == email);
  
          console.log(this.usuarioBD);
          if (this.usuarioBD) {
            // El usuario loggeado coincide con un usuario en el array de usuarios
            console.log('Usuario encontrado en el array de usuarios:', this.usuarioBD);
  
   
            
            if (this.usuarioBD.perfil.toLowerCase() == "paciente") {
              const nombreImagen = this.usuarioBD.imgPerfil[0];
              this.storageService.obtenerImagen("users",nombreImagen).then((url) => {
                this.imagenUrl = url;
                console.log(this.imagenUrl);
              });

              this.esPaciente=true;
              this.historiaClinica = this.usuarioBD.historiaClinica;
              console.log(this.historiaClinica);
              this.obtenerTurnosUsuarioActual();

            } else if (this.usuarioBD.perfil.toLowerCase() == "administrador") {
              const nombreImagen = this.usuarioBD.imgPerfil;
              this.storageService.obtenerImagen("users",nombreImagen).then((url) => {
                this.imagenUrl = url;
                console.log(this.imagenUrl);
              });


            }else if(this.usuarioBD.perfil.toLowerCase() == "especialista") {
              const nombreImagen = this.usuarioBD.imgPerfil;
              this.storageService.obtenerImagen("users",nombreImagen).then((url) => {
                this.imagenUrl = url;
                console.log(this.imagenUrl);
              });
              
                  const especialidadesEspecialista = this.usuarioBD.especialidad; // Obtén las especialidades del especialista
          console.log(especialidadesEspecialista);
                  console.log(this.usuarioBD);
                  if (this.usuarioBD.disponibilidad !== false) {

                      const especialidadesConDisponibilidad = this.usuarioBD.disponibilidad.map((disponibilidad: any) => disponibilidad.especialidad);
                      const especialidadesSinDisponibilidad = especialidadesEspecialista.filter((especialidad: string) =>
                          !especialidadesConDisponibilidad.includes(especialidad)
                      );
          
                      if (especialidadesSinDisponibilidad.length > 0) {
                          this.especialidadesSelect = especialidadesSinDisponibilidad;
                      } else {
                          this.especialidadesSelect = [];
                      }
                  } else {
                      // Si no existe el campo "disponibilidad", cargar todas las especialidades

                      this.especialidadesSelect = especialidadesEspecialista;
                      console.log(this.especialidadesSelect);
                  }
              
          }


        
          }
        })
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
      horarios: {} as DiaHorario // Definimos el tipo de horarios
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
          if (dia == "Sábado" && horarioEgreso > 14) {
            this.mensajeError = 'El horario de egreso no puede ser mayor a 14 los sábados';
            return;
          }
  
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
      // resetearForm
  
      this.usuarioBD.disponibilidad.push(disponibilidadEspecialista);
  
      this.database.actualizar("usuarios", this.usuarioBD, this.usuarioBD.id);
      console.log(this.usuarioBD);
      Swal.fire({
        title: "Disponibilidad Actualizada",
        confirmButtonColor: '#caff42',
        confirmButtonText: "Entendido"
      }).then(() => {
        // Redireccionar a '/home'
        this.router.navigateByUrl('/home');
      });
    }
  
  }


  obtenerTurnosUsuarioActual() {
    this.turnosUsuarioActual = this.turnos.filter(turno => turno.pacienteId === this.usuarioBD.id);
  
    this.especialistasFiltrados = [];
  
    this.especialistas.forEach((especialista) => {
      const turnosFiltrados = this.turnosUsuarioActual.filter(turno => turno.especialistaId === especialista.id);
  
      if (turnosFiltrados.length > 0) {
        this.especialistasFiltrados.push(especialista);
      }
    });
  
    console.log(this.especialistasFiltrados);
    console.log(this.turnosUsuarioActual);
  
    this.turnosUsuarioActual.forEach((turno) => {
      const especialista = this.especialistasFiltrados.find(esp => esp.id === turno.especialistaId && turno.pacienteId == this.usuarioBD.id);
    
      const informacion: any = {
        especialidad: turno.especialidad,
        dia: turno.dia,
        horario: turno.horario,
        especialista: especialista.nombre + " " + especialista.apellido 
      };
    
      this.informacion.push(informacion);
    });

    console.log(this.informacion);
  }


  descargarTurnos() {
    // Verificar si se ha seleccionado un especialista
    const contenidoTexto = this.convertirTurnosAFormatoTexto();
    console.log(contenidoTexto);
    /*const blob = new Blob([contenidoTexto], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, this.usuarioBD.nombre + this.usuarioBD.apellido + "Turnos.txt");*/
  }
  
  private convertirTurnosAFormatoTexto(): string {
    // Aquí puedes personalizar cómo deseas que se forme el contenido del archivo de texto
    return this.informacion.map(turno => `${this.especialistaSeleccionado.nombre}, ${this.especialistaSeleccionado.apellido} ${turno.especialidad}, ${turno.dia}, ${turno.horario}`).join('\n');
  }

}















