import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {


  turnos: any[] = [];
  turnosKeys:any[] = [];
  especialidades:any[]=[];
  especialistas:any[]=[];
  mensajeError:string="";
  turnoSeleccionado: any;
  idTurnoSeleccionado:any;
  mostrarBoton:boolean=false;
  
  tablaFiltrada:any[]=[];

  constructor(private database: DataBaseService) {}

  ngOnInit() {
    this.database.obtenerTodos("turnos").subscribe((turnosRef) => {
      this.turnos = []; // Limpia el array antes de llenarlo
  
      turnosRef.forEach((turnoDoc) => {
        const turnoData = turnoDoc.payload.doc.data();
        const turnoId = turnoDoc.payload.doc.id; // Obtiene el ID del documento
  
        if (typeof turnoData === 'object') { // Comprueba si turnoData es un objeto
          const turnoConId = { id: turnoId, ...turnoData }; // Combina el ID con los datos
          this.turnos.push(turnoConId);
        } else {
          console.log("turnoData no es un objeto válido:", turnoData);
        }
      });
  
      // Ahora puedes acceder al ID del documento en cada objeto turno en this.turnos.
   

      this.turnos.forEach((turno) => {   
        this.turnosKeys = Object.keys(turno);      
      });

      //console.log(this.turnosKeys);
     // console.log(this.turnos);

      this.database.obtenerTodos("especialidades").subscribe((espRef) => {
        this.especialidades = [];
      
        espRef.forEach((espDoc) => {
          const doc = espDoc.payload.doc.data();
          this.especialidades.push(doc);
        });
      
        //console.log(this.especialidades);
      });

     this.tablaFiltrada=this.turnos;


    });


    this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
      this.especialistas = usuariosRef
        .map((usuario: any) => usuario.payload.doc.data()) // Añade ": any" para indicar que es un objeto de tipo desconocido
        .filter((usuario: any) => {
          const perfil = usuario.perfil;
          return perfil && (perfil.toLowerCase() == 'especialista');
        });
    
      //console.log(this.especialistas);
    });

  
  }

 /* seleccionarTurno(turno: any) {
    
    }
  }*/

  seleccionarTurno(turno:any) {

    this.mostrarBoton = false;
    console.log(turno);
    this.turnoSeleccionado = turno;
    if (turno.estado == "solicitado") {
      this.mostrarBoton = true;
      this.turnoSeleccionado = turno;

    }

    
  }

  cancelarTurno(resenia: string) {
    if (resenia.trim() !== '') { // Verifica si el campo de reseña no está vacío
      this.turnoSeleccionado.estado = "Cancelado";
      this.turnoSeleccionado.reseñaCancelacion = resenia; // Asigna el valor del campo de reseña al objeto
      this.database.actualizar("turnos", this.turnoSeleccionado, this.turnoSeleccionado.id);
    } else {
      // Maneja el caso en el que el campo de reseña está vacío
      this.mensajeError="El campo de reseña por cancelación no puede estar vacío";
    }
  }

  filtrarTabla(especialidadSeleccionada: string) {

    const filtroSeleccionado = especialidadSeleccionada;
    console.log(filtroSeleccionado);

    this.tablaFiltrada = this.turnos.filter((turno: any) => turno.especialidad == filtroSeleccionado);



    
  }

  filtrarTablaEspecialista(especialistaSeleccionado: string) {

    const filtroSeleccionado = especialistaSeleccionado;
    console.log(filtroSeleccionado);

    this.tablaFiltrada = this.turnos.filter((turno: any) => turno.especialistaId == filtroSeleccionado);



    
  }





}
