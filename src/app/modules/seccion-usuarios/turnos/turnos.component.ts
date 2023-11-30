import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  @ViewChild('reseniaInput') reseniaInput!: ElementRef;

  turnos: any[] = [];
  turnosKeys:any[] = [];
  especialidades:any[]=[];
  especialistas:any[]=[];
  mensajeError:string="";
  turnoSeleccionado: any;
  idTurnoSeleccionado:any;
  mostrarBoton:boolean=false;
  
  tablaFiltrada:any[]=[];

  detalleFiltro: string = '';
  opcionFiltro:any;
  tablaCompleta:any[]=[];
  campoSeleccionado:any;
  usuarios:any[]=[];
  estadosFiltro=["solicitado", "aceptado", "rechazado","cancelado", "finalizado"];
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

      this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
        this.usuarios = usuariosRef.map(userRef => {
          let usuario: any = userRef.payload.doc.data();
          usuario['id'] = userRef.payload.doc.id;
          return usuario;
        })
  
      // Ahora puedes acceder al ID del documento en cada objeto turno en this.turnos.
   

      if(this.turnosKeys){
          this.turnosKeys.push("especialidad", "dia", "horario", "estado")   
      }

      this.database.obtenerTodos("especialidades").subscribe((espRef) => {
        this.especialidades = [];
      
        espRef.forEach((espDoc) => {
          const doc = espDoc.payload.doc.data();
          this.especialidades.push(doc);
        });
      
        //console.log(this.especialidades);
      });

     this.tablaFiltrada=this.turnos;
     this.tablaFiltrada.sort((a, b) => a.pacienteId.localeCompare(b.pacienteId));


     this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
      this.especialistas = usuariosRef
        .map((usuario: any) => usuario.payload.doc.data()) // Añade ": any" para indicar que es un objeto de tipo desconocido
        .filter((usuario: any) => {
          const perfil = usuario.perfil;
          return perfil && (perfil.toLowerCase() == 'especialista');
        });
    
        this.tablaCompleta=this.tablaFiltrada;

    });

    });


   

  
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
      this.reseniaInput.nativeElement.value = '';

    } else {
      // Maneja el caso en el que el campo de reseña está vacío
      this.mensajeError="El campo de reseña por cancelación no puede estar vacío";
    }
  }

  onTextoChange() {
    // Aquí puedes manejar lógica específica para el campo de texto
    console.log('Cambio en el campo de texto');
    // No es necesario llamar a filtrarTabla aquí, ya que el filtrado se hace en onRadioChange
  }

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
      
  contarFilasConMismoPaciente(index: number, pacienteId: string): number {
    let contador = 1;
    while (index + contador < this.tablaFiltrada.length && this.tablaFiltrada[index + contador].pacienteId === pacienteId) {
      contador++;
    }
    return contador;
  }  
  
  eliminarFiltro(){
    this.opcionFiltro="";
    this.tablaFiltrada=this.tablaCompleta;
  
  }
  

  encontrarUsuario(pacienteId: string) {
    return this.usuarios.find(user => user.id === pacienteId) || {};
  }
  
  mostrarHistoriaClinica(turno: any): boolean {
    return turno.pacienteId && this.usuarios && this.usuarios.length > 0 && this.encontrarUsuario(turno.pacienteId).historiaClinica && this.encontrarUsuario(turno.pacienteId).historiaClinica.length > 0;
  }
  


}
