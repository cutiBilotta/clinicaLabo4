import { Component } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {

  constructor(private database: DataBaseService, private afauth: AuthService){}

  usuarios:any[]=[];
  especialistas:any[]=[];
  especialidades:any[]=[];
  especialistasFiltrados:any[]=[];
  especialidadSeleccionada:any;
  fechasGeneradas:any[] = [];
  horariosGenerados:any[] = [];

  fechaSeleccionada:Date = new Date();
  horarioSeleccionado: any;
  disponibilidadEspecialidad:any;
  especialistaSeleccionado:any;
  pacienteSeleccionado:any;

  esAdmin:boolean=false;
  especialistaId:any;
  usuarioActualId:any;

  usuarioSeleccionadoId:any;

  listadoPacientes:any[]=[];


  ngOnInit() {
    this.afauth.getAuthState().subscribe(user => {

      if (user) {
        this.usuarioActualId = user.uid.toString();
        const usuarioActualEmail = user.email?.toString();
        console.log(usuarioActualEmail);
  
        this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
          this.usuarios = usuariosRef.map(userRef => {
            let usuario: any = userRef.payload.doc.data();
            usuario['id'] = userRef.payload.doc.id;
            return usuario;
          });
  
          const usuarioActual = this.usuarios.find(usuario => usuario.email == usuarioActualEmail);
          this.usuarioActualId=usuarioActual.id;
          console.log(this.usuarioActualId);

          this.especialistas = this.usuarios.filter(usuario => usuario.perfil == "Especialista" );

  
          if (usuarioActual) {
            this.esAdmin = usuarioActual.perfil == "Administrador" || usuarioActual.perfil == "administrador";
            console.log("Es administrador: " + this.esAdmin);
            if(this.esAdmin){
              this.listadoPacientes = this.usuarios.filter(usuario => usuario.perfil.toLowerCase() === "paciente");
            }else{
              console.log("No es admin");
            }
            
          } else {
            console.log("Usuario no encontrado en la base de datos.");
          }
  
          console.log(this.usuarios);
          console.log(this.listadoPacientes);

        })

      }
    });
  
        
      this.database.obtenerTodos("especialidades").subscribe((especialidadesRef) => {
          this.especialidades = especialidadesRef.map(especialidadRef => {
            let especialidad: any = especialidadRef.payload.doc.data();
            especialidad['id'] = especialidadRef.payload.doc.id;
            return especialidad;
          });
        });


      
      }
  


  seleccionarEspecialidad(event: any) {
    
    const selectedIndex = event.target.value;
    if (selectedIndex !== '') {
       this.especialidadSeleccionada = this.especialidades[0].especialidades[selectedIndex];
      console.log('Especialidad seleccionada:', this.especialidadSeleccionada);
    }

    const selectElement = document.getElementById("especialistasFiltrados") as HTMLSelectElement;
    if(selectElement){
    selectElement.value = ""; // Establece el valor a la opción vacía
    }
    this.obtenerEspecialidad();
  }


  obtenerEspecialidad() {
    this.especialistasFiltrados = [];

    this.especialistas.forEach(especialista => {
      if (especialista.especialidad.includes(this.especialidadSeleccionada)) {
        
        this.especialistasFiltrados.push(especialista);
        }
    });

    // Agrega un console.log cuando termine de filtrar
    console.log('Especialistas filtrados:', this.especialistasFiltrados);

      
    
}

calcularFechas(disponibilidadEspecialista: any) {
  this.fechasGeneradas=[];
  // Verifica si disponibilidadEspecialista está definido
  if (!disponibilidadEspecialista) {
    return [];
  }

  // Extrae los días disponibles de los objetos de disponibilidad
  const diasDisponibles = Object.keys(disponibilidadEspecialista);
  console.log(diasDisponibles);
  // Crea un arreglo para almacenar las fechas generadas

  // Obtiene la fecha actual
  const fechaActual = new Date();

  // Itera para los próximos 15 días
  for (let i = 0; i < 15; i++) {
    const fecha = new Date(fechaActual);
    fecha.setDate(fecha.getDate() + i);
    const diaSemana = fecha.getDay();
    // Verifica si el día de la semana coincide con alguno de los días disponibles
    if (diasDisponibles.includes(this.obtenerNombreDia(diaSemana))) {
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      this.fechasGeneradas.push({ dia, mes });
    }
  }

  console.log(this.fechasGeneradas);
  return this.fechasGeneradas;
}

obtenerNombreDia(numeroDia: number) {
  // Convierte el número de día de la semana en el nombre del día correspondiente.
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return diasSemana[numeroDia];
}


seleccionarEspecialista(event: any) {

  this.especialistaId = event.target.value;
  console.log(this.especialistaId);
  if (this.especialistaId) {
    this.especialistaSeleccionado = this.especialistasFiltrados.find(especialista => especialista.id == this.especialistaId);
  }

  this.obtenerEspecialista();
}

obtenerEspecialista() {

  if (this.especialistaSeleccionado) {
    
    // Busca la entrada de disponibilidad correspondiente a la especialidad seleccionada
    this.disponibilidadEspecialidad = this.especialistaSeleccionado.disponibilidad.find((disponibilidad: { especialidad: string, horarios: any }) => disponibilidad.especialidad == this.especialidadSeleccionada);

    if (this.disponibilidadEspecialidad) {
        // Ahora puedes acceder a los horarios dentro de la disponibilidad de la especialidad
        console.log('Horarios de la especialidad:', this.disponibilidadEspecialidad.horarios);

        // Llama a calcularFechas() con los horarios de disponibilidad
        this.calcularFechas(this.disponibilidadEspecialidad.horarios);
    }

  }
}

seleccionarFecha(event: any) {
  this.horariosGenerados=[];
  const selectedDateParts = event.target.value.split('/'); // Suponiendo que el formato sea 'DD/MM'
  const selectedDay = parseInt(selectedDateParts[0], 10);
  const selectedMonth = parseInt(selectedDateParts[1], 10);
  const currentYear = new Date().getFullYear(); // Obtener el año actual
  this.fechaSeleccionada = new Date(currentYear, selectedMonth - 1, selectedDay); // Restar 1 a selectedMonth ya que los meses en JavaScript son 0-based
  if (this.fechaSeleccionada) {
    console.log(this.fechaSeleccionada.toLocaleDateString('en-US'));
  }
  this.calcularHorariosDisponibles(this.disponibilidadEspecialidad.horarios);
}

seleccionarHorario(event: any) {
this.horarioSeleccionado = event.target.value;
if(this.horarioSeleccionado){
  console.log(this.horarioSeleccionado);
}
}

calcularHorariosDisponibles(disponibilidadEspecialista: any) {

  this.horariosGenerados=[];
  if (!disponibilidadEspecialista || !this.fechaSeleccionada) {
    return [];
  }

  const diaSemana = this.fechaSeleccionada.getDay(); 
  const nombreDia = this.obtenerNombreDia(diaSemana);


  // Verificar si el día de la semana está en la disponibilidad del especialista
  if (disponibilidadEspecialista[nombreDia] && disponibilidadEspecialista[nombreDia].inicio && disponibilidadEspecialista[nombreDia].egreso) {
    const horaIngreso = disponibilidadEspecialista[nombreDia].inicio;
    const horaEgreso = disponibilidadEspecialista[nombreDia].egreso;

    // Iterar en intervalos de 30 minutos desde la hora de ingreso hasta la hora de egreso
    for (let hora = horaIngreso; hora < horaEgreso; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        // Formatear la hora en formato de 24 horas (ejemplo: "08:00")
        const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        this.horariosGenerados.push(horaFormateada);
      }
    }
  }

  console.log(this.horariosGenerados);
  return this.horariosGenerados;
}

seleccionarPaciente(event: any) {
  this.usuarioSeleccionadoId = event.target.value;
}


aceptar(){


  console.log(this.usuarioActualId);
  
      if(this.usuarioActualId && !this.esAdmin){
        
          let turno = new Turno(this.usuarioActualId, this.especialistaId, this.especialidadSeleccionada, this.fechaSeleccionada.toLocaleDateString('en-US'), this.horarioSeleccionado);
          let turnoJSON = turno.toJSON();
          this.database.crear("turnos", turnoJSON);

      }else if(this.esAdmin && this.usuarioSeleccionadoId!=undefined){
        
        let turno = new Turno(this.usuarioSeleccionadoId, this.especialistaId, this.especialidadSeleccionada, this.fechaSeleccionada.toLocaleDateString('en-US'), this.horarioSeleccionado);
        let turnoJSON = turno.toJSON();
        this.database.crear("turnos", turnoJSON);
      }else{

        console.log("ACA");
      }
} 




}

