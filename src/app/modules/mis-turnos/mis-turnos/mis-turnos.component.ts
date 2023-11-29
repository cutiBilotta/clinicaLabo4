import { Component, OnInit, ViewChild} from '@angular/core';
import { Calificacion } from 'src/app/classes/calificacion';
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
  mostrarDivEspecialista:boolean=false;
  mostrarDivResenia:boolean=false;
tablaCompleta:any[]=[];
  mostrarDivDiagnostico:boolean = false;
  mostrarEncuesta:boolean=false;
  mostrarCalificacion:boolean=false;
  puntuacion:number=0;
  mostrarBtnCancelar:boolean=false;

  filtros:string[]= ["especialidad", "dia", "horario", "estado", "reseñaCancelacion", "temperatura", "presion", "altura","peso", "detalle"];
  especialidadSeleccionada: string = '';
especialistaSeleccionado: string = '';
opcionFiltro:any;


detalleFiltro: any;
estadosFiltro:string[]= ["solicitado", "aceptado", "rechazado","cancelado", "finalizado"];
campoSeleccionado: string = '';
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
      
      this.database.obtenerTodos("especialidades").subscribe((especialidadesRef) => {
        this.especialidades = especialidadesRef.map(especialidadRef => {
          let especialidad: any = especialidadRef.payload.doc.data();
          especialidad['id'] = especialidadRef.payload.doc.id;
          return especialidad;
        })
        console.log(this.especialidades);
        });
    
        this.turnos=[];
      this.database.obtenerTodos("turnos").subscribe((turnosRef) => {
        this.turnos = turnosRef.map(turnoRef => {
          let turno: any = turnoRef.payload.doc.data();
          turno['id'] = turnoRef.payload.doc.id;
          return turno;
        });

        this.resenias = [];
        this.turnos.forEach((turno) => {

                    
          if((this.esPaciente && turno.pacienteId==this.usuarioActualId && turno.hasOwnProperty('reseñaCancelacion')) || (!this.esPaciente && turno.especialistaId == this.usuarioActualId &&  turno.hasOwnProperty('reseñaCancelacion'))){
            this.resenias.push({id: turno.id , resenia: turno.reseñaCancelacion, dia: turno.dia, horario:turno.horario, especialidad:turno.especialidad});
          }

        });
        if(this.turnosKeys.length==0){
        this.turnosKeys.push("especialidad", "dia", "horario", "estado", "reseñaCancelacion");
        }

        console.log(this.turnosKeys);
        this.filtrarTurnos(); // Llama a la función para filtrar los turnos      
        console.log(this.resenias);
      });
    });

    }

  seleccionarPuntuacion(starNumber: number) {
      this.puntuacion = starNumber;
      console.log('Puntuación seleccionada:', this.puntuacion);
}


filtrarTurnos() {
  if (this.esPaciente) {
    console.log(this.usuarioActualId);
    // Si es paciente, filtra los turnos por pacienteId
    this.tablaFiltrada = this.turnos.filter(turno => turno.pacienteId == this.usuarioActualId);
    this.tablaCompleta = this.tablaFiltrada
  } else {
    // Si no es paciente, filtra los turnos por especialistaId
    this.tablaFiltrada = this.turnos.filter(turno => turno.especialistaId == this.usuarioActualId);
    this.tablaCompleta = this.tablaFiltrada

  }
}


encontrarUsuario(pacienteId: string) {
  return this.usuarios.find(user => user.id === pacienteId) || {};
}

mostrarHistoriaClinica(turno: any): boolean {
  return turno.pacienteId && this.usuarios && this.usuarios.length > 0 && this.encontrarUsuario(turno.pacienteId).historiaClinica && this.encontrarUsuario(turno.pacienteId).historiaClinica.length > 0;
}



seleccionarTurno(turno:any){
  this.turnoSeleccionado=turno;
  console.log(turno.estado);
  if((!this.esPaciente && this.turnoSeleccionado.estado.toLowerCase() == "aceptado") || (!this.esPaciente && this.turnoSeleccionado.estado.toLowerCase() == "solicitado")){
    this.mostrarDivEspecialista = true;
  }else if(((!this.esPaciente && this.turnoSeleccionado.estado.toLowerCase() != "aceptado") && (!this.esPaciente && this.turnoSeleccionado.estado.toLowerCase() != "solicitado"))|| this.turnoSeleccionado.estado.toLowerCase() == "cancelado"){
    this.mostrarDivEspecialista = false;
    this.mostrarCalificacion=false;
  }else if((this.esPaciente &&turno.estado.toLowerCase() == "finalizado" ) || (this.esPaciente && turno.estado.toLowerCase() == "finalizado" && turno.hasOwnProperty('reseñaFinalizacion'))){
    this.mostrarCalificacion = true;
  }else if(this.esPaciente && turno.estado.toLowerCase() != "finalizado"){
    this.mostrarCalificacion = false;

  }

}

aceptar(resenia:string){

  if (resenia.trim() !== '' && this.turnoSeleccionado.estado.toLowerCase() == "finalizado") {
    console.log("aqui");
    let nuevaCalificacion= new Calificacion(this.turnoSeleccionado.especialistaId, this.usuarioActualId, this.puntuacion.toString(), resenia , this.turnoSeleccionado.id)
    let calificacionJSON= nuevaCalificacion.toJSON();
    console.log(calificacionJSON);
    this.database.crear("calificaciones", calificacionJSON);
    this.mostrarCalificacion=false;
  } else {
    // Maneja el caso en el que el campo de reseña está vacío
    this.mensajeError="El campo de reseña y diagnostico no puede estar vacío";
  }


}

cancelarTurno(resenia:string){

  if (resenia.trim() !== '' && this.turnoSeleccionado.estado.toLowerCase() == "solicitado") {
    this.turnoSeleccionado.estado = "cancelado";
    this.turnoSeleccionado.reseñaCancelacion = resenia; // Asigna el valor del campo de reseña al objeto
    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  } else {
    // Maneja el caso en el que el campo de reseña está vacío
    this.mensajeError="El campo de reseña por cancelación no puede estar vacío";
  }


}

aceptarTurno(){


  if (this.turnoSeleccionado.estado.toLowerCase() == "solicitado") {
    this.turnoSeleccionado.estado = "aceptado";
    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  }


}

rechazarTurno(resenia:string){

  if (resenia.trim() !== '') {
    this.turnoSeleccionado.estado = "rechazado";
    this.turnoSeleccionado.reseñaCancelacion = resenia; 
    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  } else {
    // Maneja el caso en el que el campo de reseña está vacío
    this.mensajeError="El campo de reseña por cancelación no puede estar vacío";
  }


}

finalizarTurno(resenia:string, diagnostico:string){
  this.mostrarDivDiagnostico=true;

  if (resenia.trim() !== '' && diagnostico.trim() !== ''  && this.turnoSeleccionado.estado.toLowerCase() == "aceptado") {
    this.turnoSeleccionado.estado = "finalizado";
    this.turnoSeleccionado.reseñaFinalizacion = resenia; // Asigna el valor del campo de reseña al objeto
    this.turnoSeleccionado.diagnostico = diagnostico

    this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
  } else {
    // Maneja el caso en el que el campo de reseña está vacío
    this.mensajeError="El campo de reseña y diagnostico no puede estar vacío";
  }


}



onTextoChange() {
  // Aquí puedes manejar lógica específica para el campo de texto
  console.log('Cambio en el campo de texto');
  // No es necesario llamar a filtrarTabla aquí, ya que el filtrado se hace en onRadioChange
}





// En tu componente:


// En tu componente:
filtrarTabla() {

  interface DetalleHistoriaClinica {
    dato: string;
    descripcion: string;
  }
  
  interface HistoriaClinica {
    altura: string;
    peso: string;
    presion: string;
    temperatura: string;
    detalles: DetalleHistoriaClinica[];
  }
  
  interface Turno {
    especialidad: string;
    dia: string;
    horario: string;
    estado: string;
    resenaCancelacion: string;
    pacienteId: string;
  }
  this.tablaFiltrada = this.tablaCompleta; // Reemplaza con tu arreglo original

  if (this.detalleFiltro.trim() !== '') {
    this.tablaFiltrada = this.tablaFiltrada.filter((turno: Turno) => {
      // Filtrar por campos regulares
      const camposFiltrables: (keyof Turno)[] = ['especialidad', 'dia', 'horario', 'estado', 'resenaCancelacion'];
      const contieneFiltro = camposFiltrables.some((key: keyof Turno) =>
        turno[key]?.toString().toLowerCase().includes(this.detalleFiltro.toLowerCase())
      );

      // Filtrar por campos de historia clínica
      const contieneFiltroHistoria = turno.pacienteId && this.usuarios && this.usuarios.length > 0 &&
        this.encontrarUsuario(turno.pacienteId).historiaClinica && this.encontrarUsuario(turno.pacienteId).historiaClinica.some((historia: HistoriaClinica) => {
          const camposHistoriaClinica: (keyof HistoriaClinica)[] = ['altura', 'peso', 'presion', 'temperatura'];
          const contieneFiltroCamposHistoria = camposHistoriaClinica.some((campo: keyof HistoriaClinica) =>
            historia[campo]?.toString().toLowerCase().includes(this.detalleFiltro.toLowerCase())
          );

          // Filtrar por detalles de historia clínica
          const contieneFiltroDetalles = historia.detalles && historia.detalles.length > 0 && historia.detalles.some((detalle: DetalleHistoriaClinica) => {
            return detalle.dato?.toString().toLowerCase().includes(this.detalleFiltro.toLowerCase()) ||
                   detalle.descripcion?.toString().toLowerCase().includes(this.detalleFiltro.toLowerCase());
          });

          return contieneFiltroCamposHistoria || contieneFiltroDetalles;
        });

      return contieneFiltro || contieneFiltroHistoria;
    });
  }
}
 /*
          // Filtrar por campos de la Historia Clínica
          this.tablaFiltrada = this.tablaFiltrada.filter(turno => {
            const historia = this.encontrarUsuario(turno.pacienteId)?.historiaClinica;
            console.log(historia);
            if (historia) {
              return historia.some((detalle: any) => {
                if (this.opcionFiltro === 'detalle') {
                  // Filtrar por detalles
                  return detalle.detalles.some((subdetalle: any) =>
                    subdetalle.dato.includes(this.detalleFiltro)
                  );
                } else {
                  // Filtrar por otros campos de la historia clínica
                  return detalle[this.opcionFiltro] && detalle[this.opcionFiltro].toString().includes(this.detalleFiltro);
                }
              });
            }
            return false;
          });
        }*/
      
    
    

eliminarFiltro(){
  this.tablaFiltrada=this.tablaCompleta;

}

}

