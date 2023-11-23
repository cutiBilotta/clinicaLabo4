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

  filtrarTabla(campo: string) {
    console.log(this.opcionFiltro);
    console.log(campo);
    this.campoSeleccionado = campo; // Asigna el valor de campo a la propiedad
  
    // Limpiar la tabla filtrada al inicio de cada filtrado
    this.tablaFiltrada = [...this.tablaCompleta];
    if (this.detalleFiltro.trim() !== '') {
      this.campoSeleccionado = campo;
    }
    // Aplicar los filtros según la opción seleccionada
    if (campo === 'estado') {
      this.tablaFiltrada = this.tablaFiltrada.filter(turno => turno.estado === this.opcionFiltro);
    } else if (campo === 'especialidad') {
      this.tablaFiltrada = this.tablaFiltrada.filter(turno => turno.especialidad === this.opcionFiltro);
    }if (campo === 'dia') {
        this.tablaFiltrada = this.tablaFiltrada.filter(turno => turno.dia.includes(this.detalleFiltro));
    } else if (campo === 'horario') {
        this.tablaFiltrada = this.tablaFiltrada.filter(turno => turno.horario.includes(this.detalleFiltro));
    }if (this.opcionFiltro === 'altura' || this.opcionFiltro === 'peso' || this.opcionFiltro === 'presion' || this.opcionFiltro === 'detalle') {
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
          }
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
