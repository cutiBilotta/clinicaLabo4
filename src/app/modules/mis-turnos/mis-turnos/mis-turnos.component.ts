import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  constructor(private database:DataBaseService, private afauth: AuthService){}
  turnos:any[]=[];
  usuarios:any[]=[]
  usuarioActualId:any;
  especialistas:any[]=[];
  esPaciente:boolean=false;
  pacientes:any[]=[];
  usuarioActualBd:any;
  turnosKeys:any[]=[];
  tablaFiltrada:any[]=[];
mensajeError:string="";
  especialidades:any[]=[];

  resenias:any[]=[];
turnoSeleccionado:any;
  mostrarBotonCancelar:boolean=false;
  mostrarDivDiagnostico:boolean = false;

    ngOnInit() {
      this.afauth.getAuthState().subscribe(user => {
  
        if (user) {
          const usuarioActualEmail = user.email?.toString();
          console.log(usuarioActualEmail);
    
          this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
            this.usuarios = usuariosRef.map(userRef => {
              let usuario: any = userRef.payload.doc.data();
              usuario['id'] = userRef.payload.doc.id;
              return usuario;
            });
            this.especialistas = this.usuarios.filter(usuario => usuario.perfil == "Especialista" );    
            this.pacientes = this.usuarios.filter(usuario => usuario.perfil == "Paciente" );    

            this.usuarioActualBd = this.usuarios.find(usuario => usuario.email == usuarioActualEmail);
            this.usuarioActualId = this.usuarioActualBd.id;
            console.log(this.usuarioActualId);
            this.esPaciente = this.usuarioActualBd ? this.usuarioActualBd.perfil.toLowerCase() == "paciente" : false;
            console.log("Es Paciente : " +  this.esPaciente);
            console.log(this.usuarios);
            console.log(this.pacientes);
  
          })
  
        }
      });
      this.database.obtenerTodos("especialidades").subscribe((especialidadesRef) => {
        this.especialidades = especialidadesRef.map(especialidadRef => {
          let especialidad: any = especialidadRef.payload.doc.data();
          especialidad['id'] = especialidadRef.payload.doc.id;
          return especialidad;
        })
        });
    
      this.database.obtenerTodos("turnos").subscribe((turnosRef) => {
        this.turnos = turnosRef.map(turnoRef => {
          let usuario: any = turnoRef.payload.doc.data();
          usuario['id'] = turnoRef.payload.doc.id;
          return usuario;
        });

        this.turnos.forEach((turno) => {   
          this.turnosKeys = Object.keys(turno);
          if(turno.reseñaCancelacion!= undefined){
            this.resenias.push({id: turno.id , resenia: turno.reseñaCancelacion});
          }

        });
        console.log(this.turnos);
        this.filtrarTurnos(); // Llama a la función para filtrar los turnos      
      });
    
    }

filtrarTurnos() {
  if (this.esPaciente) {
    console.log(this.usuarioActualId);
    // Si es paciente, filtra los turnos por pacienteId
    this.tablaFiltrada = this.turnos.filter(turno => turno.pacienteId == this.usuarioActualId);
  } else {
    // Si no es paciente, filtra los turnos por especialistaId
    this.tablaFiltrada = this.turnos.filter(turno => turno.especialistaId == this.usuarioActualId);
  }
}


filtrarTablaEspecialidad(especialidadSeleccionada: string) {

  const filtroSeleccionado = especialidadSeleccionada;
  console.log(filtroSeleccionado);
  if(this.esPaciente){
  this.tablaFiltrada = this.turnos.filter((turno: any) => turno.especialidad == filtroSeleccionado && turno.pacienteId == this.usuarioActualId);
  }else{
    this.tablaFiltrada = this.turnos.filter((turno: any) => turno.especialidad == filtroSeleccionado && turno.especialistaId == this.usuarioActualId);

  }  
}

filtrarTablaEspecialista(especialistaSeleccionado: string) {

  const filtroSeleccionado = especialistaSeleccionado;
  console.log(filtroSeleccionado);
  if(this.esPaciente){
    this.tablaFiltrada = this.turnos.filter((turno: any) => turno.especialistaId == filtroSeleccionado && turno.pacienteId == this.usuarioActualId);
  }else{
    this.tablaFiltrada = this.turnos.filter((turno: any) => turno.especialistaId == filtroSeleccionado);

  }
}

filtrarTablaPacientes(pacienteSeleccionado: string) {

  const filtroSeleccionado = pacienteSeleccionado;
  console.log(filtroSeleccionado);
  if(this.esPaciente){
  this.tablaFiltrada = this.turnos.filter((turno: any) => turno.pacienteId == filtroSeleccionado);
  }else{
    this.tablaFiltrada = this.turnos.filter((turno: any) => turno.pacienteId == filtroSeleccionado && turno.especialistaId == this.usuarioActualId);

  } 
}

seleccionarTurno(turno:any){
  this.turnoSeleccionado=turno;
  console.log(turno.id);

  if(turno.estado.toLowerCase() != "realizado" && turno.estado.toLowerCase() != "cancelado" ){

    this.mostrarBotonCancelar = true;

  }


}

cancelarTurno(resenia:string){

  if (resenia.trim() !== '' && this.turnoSeleccionado.estado.toLowerCase() == "solicitado") {
    this.turnoSeleccionado.estado = "Cancelado";
    this.turnoSeleccionado.reseñaCancelacion = resenia; // Asigna el valor del campo de reseña al objeto
    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  } else {
    // Maneja el caso en el que el campo de reseña está vacío
    this.mensajeError="El campo de reseña por cancelación no puede estar vacío";
  }

  this.resenias=[];

}

aceptarTurno(){


  if (this.turnoSeleccionado.estado.toLowerCase() == "solicitado") {
    this.turnoSeleccionado.estado = "Aceptado";
    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  }

  this.resenias=[];

}

rechazarTurno(resenia:string){

  if (resenia.trim() !== '') {
    this.turnoSeleccionado.estado = "Rechazado";
    this.turnoSeleccionado.reseñaCancelacion = resenia; 
    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  } else {
    // Maneja el caso en el que el campo de reseña está vacío
    this.mensajeError="El campo de reseña por cancelación no puede estar vacío";
  }

  this.resenias=[];

}

finalizarTurno(resenia:string, diagnostico:string){
  this.mostrarDivDiagnostico=true;

  if (resenia.trim() !== '' && diagnostico.trim() !== ''  && this.turnoSeleccionado.estado.toLowerCase() == "aceptado") {
    this.turnoSeleccionado.estado = "Finalizado";
    this.turnoSeleccionado.reseña = resenia; // Asigna el valor del campo de reseña al objeto
    this.turnoSeleccionado.diagnostico = diagnostico

    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  } else {
    // Maneja el caso en el que el campo de reseña está vacío
    this.mensajeError="El campo de reseña y diagnostico no puede estar vacío";
  }

  this.resenias=[];

}

}


