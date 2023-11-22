import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { Turno } from 'src/app/classes/turno';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {

  constructor(private database: DataBaseService, private afauth: AuthService, private storageService:StorageService){}
  @Output() captchaStatusChange = new EventEmitter<string>();

  usuarios:any[]=[];
  especialistas:any[]=[];
  especialidades:any[]=[];
  especialistasFiltrados:any[]=[];
  especialidadSeleccionada:any;
  fechasGeneradas:any[] = [];
  horariosGenerados:any[] = [];
  turnos:any[]=[];
  fechaSeleccionada:Date = new Date();
  horarioSeleccionado: any;
  disponibilidadEspecialidad:any;
  especialistaSeleccionado:any;
  pacienteSeleccionado:any;
spinner:boolean=true;
  esAdmin:boolean=false;
  especialistaId:any;
  usuarioActualId:any;
  especialidadesFiltradas:any[]=[];
  usuarioSeleccionadoId:any;
especialidadesDelEspecialista:any[]=[];
  captchaGenerado: any;
  listadoPacientes:any[]=[];
  especialidadesConImagenes:any[]=[];
  mostrarCaptcha:boolean=false;

  disponibilidadEspecialista:any;

  mensajeConfirmacion:string="";

  fechaFinal:any;
  horarioFinal:any;

  ngOnInit() {
    this.afauth.getAuthState().subscribe(user => {

      if (user) {
        this.usuarioActualId = user.uid.toString();
        const usuarioActualEmail = user.email?.toString();
        console.log(usuarioActualEmail);
  
        this.database.obtenerTodos("usuarios").subscribe(async (usuariosRef) => {
          this.usuarios = usuariosRef.map(userRef => {
            let usuario: any = userRef.payload.doc.data();
            usuario['id'] = userRef.payload.doc.id;
            return usuario;
          });
          for (const usuario of this.usuarios) {
            if (usuario.imgPerfil && usuario.imgPerfil.length > 0) {
              const nombreImagen = usuario.imgPerfil[0];
              const url = await this.storageService.obtenerImagen("users", nombreImagen);
              usuario.imagenURL = url;
            }
          }
      
          this.especialistas = this.usuarios.map(usuario => {
            if (this.especialistas.includes(usuario.email)) {
               
                return {
                  nombre: usuario.nombre,
                  email:usuario.email,
                  perfil: usuario.perfil,
                  password: usuario.password,
                  imagenURL: usuario.imagenURL
                };
              
            }
            return null;
          }).filter(usuario => usuario !== null);
          this.spinner=false;

  
          const usuarioActual = this.usuarios.find(usuario => usuario.email == usuarioActualEmail);
          this.usuarioActualId=usuarioActual.id;
          console.log(this.usuarioActualId);

          this.especialistas = this.usuarios.filter(usuario => usuario.perfil == "Especialista" && usuario.disponibilidad);

  
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
  
  
         

        })

      }
    });

    this.database.obtenerTodos("turnos").subscribe((turnosRef) => {
      this.turnos = turnosRef.map(turnoRef => {
        let turno: any = turnoRef.payload.doc.data();
        turno['id'] = turnoRef.payload.doc.id;
        return turno;
      });
        
      this.database.obtenerTodos("especialidades").subscribe(async (especialidadesRef) => {
        this.especialidades = especialidadesRef.map(async (especialidadRef) => {
          let especialidad: any = especialidadRef.payload.doc.data();
          especialidad['id'] = especialidadRef.payload.doc.id;
      
          return especialidad.especialidades.map((nombreEspecialidad: string) => nombreEspecialidad.toLowerCase());
        });
      
        // Esperar a que todas las promesas se resuelvan
        const nombresEspecialidadesArrays = await Promise.all(this.especialidades);
      
        for (const nombresEspecialidades of nombresEspecialidadesArrays) {
          for (const nombreEspecialidad of nombresEspecialidades) {
            const nombreImagen = nombreEspecialidad + '.png';
            const url = await this.storageService.obtenerImagen("especialidades", nombreImagen);
      
            this.especialidadesConImagenes.push({
              nombreEspecialidad: nombreEspecialidad,
              urlImagen: url
            });
          }
        }
      
        // Puedes realizar otras operaciones con this.especialidadesConImagenes después de obtener todas las imágenes
      });
 
    

    

        console.log(this.turnos);
    });

      
  }
  
  
  seleccionarEspecialista(especialista: any) {
    this.especialistaId= especialista.id;
  
    if (this.especialistaId) {
      this.especialistaSeleccionado = this.especialistas.find(especialista => especialista.id == this.especialistaId);
      console.log(this.especialistaSeleccionado);
  
    }
  
    this.obtenerEspecialidadesDelEspecialista();
  }
  
  
  
  obtenerEspecialidadesDelEspecialista() {
  
    if (this.especialistaSeleccionado) {
      this.especialidadesDelEspecialista = this.especialistaSeleccionado.especialidad || [];
      console.log(this.especialidadesDelEspecialista);
    
    }
  }

  async seleccionarEspecialidad(especialidad: string) {
    this.especialidadSeleccionada = especialidad;
  
    console.log(this.especialidadSeleccionada);
  
    let disponibilidadEspecialista = await this.obtenerDisponibilidadEspecialista();
    console.log(disponibilidadEspecialista);
  
    if(disponibilidadEspecialista){
      this.calcularFechas(disponibilidadEspecialista.horarios);
      console.log(disponibilidadEspecialista);

    }else{
      this.fechasGeneradas=[];
    }
  }
  
  async obtenerDisponibilidadEspecialista() {

    console.log(this.especialistaSeleccionado);
    interface Disponibilidad {
      especialidad: string;
      horarios: { [key: string]: { inicio: number; egreso: number } };
    }
  
    interface Especialista {
      especialidad: string;
      disponibilidad: Disponibilidad[];
    }
  
    // Variables para almacenar la información seleccionada
    let especialistaSeleccionado: Especialista | undefined;
  
    // Lógica para obtener la disponibilidad del especialista seleccionado
    if (this.especialistas && this.especialistas.length > 0 && this.especialidadSeleccionada) {
  
      especialistaSeleccionado=this.especialistaSeleccionado;
      
      if (especialistaSeleccionado) {
        console.log(especialistaSeleccionado);
        this.disponibilidadEspecialista = especialistaSeleccionado.disponibilidad
          .filter((disp) => disp.especialidad === this.especialidadSeleccionada)
          .map((disp) => {
            const disponibilidad: any = { especialidad: disp.especialidad, horarios: {} };
  
            Object.keys(disp.horarios).forEach((nombreDia) => {
              const detalleHorario = disp.horarios[nombreDia];
  
              disponibilidad.horarios[nombreDia] = {
                inicio: detalleHorario.inicio,
                egreso: detalleHorario.egreso
              };
            });
            return disponibilidad;
          })[0];
      }
    }
  
    console.log(this.disponibilidadEspecialista);
  
    return this.disponibilidadEspecialista; // Retornar la disponibilidad al final
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
      const anio = fecha.getFullYear()
      this.fechasGeneradas.push({ dia, mes, anio });
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

generarCombincacionFechaHora(fecha: any, hora: string) {
  console.log('Fecha seleccionada:', fecha);
  console.log('Hora seleccionada:', hora);
}

/*seleccionarFecha(event: any) {
  this.horariosGenerados = [];
  const selectedDateParts = event.target.value.split('/'); // Suponiendo que el formato sea 'DD/MM'
  const selectedDay = parseInt(selectedDateParts[0], 10);
  const selectedMonth = parseInt(selectedDateParts[1], 10);
  const currentYear = new Date().getFullYear(); // Obtener el año actual
  this.fechaSeleccionada = new Date(currentYear, selectedMonth - 1, selectedDay); // Restar 1 a selectedMonth ya que los meses en JavaScript son 0-based
  
  if (this.fechaSeleccionada) {
    console.log(this.fechaSeleccionada.toLocaleDateString('en-GB'));
  }
  console.log(this.fechaSeleccionada);
 this.calcularHorariosDisponibles();
}*/

seleccionarHorario(event: any) {
  this.horarioSeleccionado = event.target.value;
  if(this.horarioSeleccionado){
    console.log(this.horarioSeleccionado);
  }
}

calcularHorariosDisponibles(fechaActual: { dia: number; mes: number }) {
  const fechaClonada = new Date(); // Obtener la fecha actual
  fechaClonada.setDate(fechaActual.dia); // Establecer el día
  fechaClonada.setMonth(fechaActual.mes - 1); // Establecer el mes (se resta 1 porque los meses en JavaScript son de 0 a 11)

  const fechaFormateada = fechaClonada.toLocaleDateString('en-GB');

  this.horariosGenerados = [];
  if (!this.disponibilidadEspecialista || !fechaActual) {
    return [];
  }

  const diaSemana = fechaClonada.getDay();
  const nombreDia = this.obtenerNombreDia(diaSemana);

  //console.log(this.disponibilidadEspecialista);
  if (
    this.disponibilidadEspecialista.horarios[nombreDia] &&
    this.disponibilidadEspecialista.horarios[nombreDia].inicio &&
    this.disponibilidadEspecialista.horarios[nombreDia].egreso
  ) {
    const horaIngreso = this.disponibilidadEspecialista.horarios[nombreDia].inicio;
    const horaEgreso = this.disponibilidadEspecialista.horarios[nombreDia].egreso;

    //console.log(horaEgreso); console.log(horaIngreso);
    /*console.log(fechaActual.toLocaleDateString('en-GB'));
    console.log(this.especialistaSeleccionado.id);*/

    for (let hora = horaIngreso; hora < horaEgreso; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horaFormateada = `${hora.toString().padStart(2, '0')}:${minuto
          .toString()
          .padStart(2, '0')}`;

        // Validar si el horario está disponible
        const turnoExistente = this.turnos.find(
          (turno) =>
            turno.especialistaId == this.especialistaSeleccionado.id &&
            //turno.dia == fechaActual.toLocaleDateString('en-GB') &&
            turno.horario == horaFormateada &&
            (turno.estado.toLowerCase() == "solicitado" || turno.estado.toLowerCase() == "aceptado") 
        );
        
        if (!turnoExistente) {
          this.horariosGenerados.push(horaFormateada);
        } 
        
      }
    }
  }
 // console.log(this.horariosGenerados);
  return this.horariosGenerados;
}

getImage(especialidad: string): string | undefined {
  let imagenUrl: string | undefined;
  this.especialidadesConImagenes.forEach((item) => {
    if (item.nombreEspecialidad == especialidad.toLocaleLowerCase()) {
      return imagenUrl = item.urlImagen;
    }
  });

  return imagenUrl;
}

seleccionarPaciente(event: any) {
  this.usuarioSeleccionadoId = event.target.value;
}


onCaptchaStatusChange(status: string) {
  this.mostrarCaptcha=true;

    
}


manejarCaptcha(estadoCaptcha: string) {
  if (estadoCaptcha === 'valido') {
    console.log('Captcha válido');
    if(this.usuarioActualId && !this.esAdmin){
        
      let turno = new Turno(this.usuarioActualId, this.especialistaId, this.especialidadSeleccionada, this.fechaFinal, this.horarioFinal);
      let turnoJSON = turno.toJSON();
      this.database.crear("turnos", turnoJSON);
  
  
  }else if(this.esAdmin && this.usuarioSeleccionadoId!=undefined){
    
    let turno = new Turno(this.usuarioSeleccionadoId, this.especialistaId, this.especialidadSeleccionada, this.fechaFinal, this.horarioFinal);
    let turnoJSON = turno.toJSON();
    this.database.crear("turnos", turnoJSON);
  }

  } else if (estadoCaptcha === 'invalido') {
    console.log('Captcha inválido. ');
  }
}


seleccionarFechaHora(fecha: any, hora: any) {
  this.fechaFinal = fecha.dia + "/" + fecha.mes + "/" + fecha.anio;
  this.horarioFinal=hora;
  console.log(this.horarioFinal);

  this.mensajeConfirmacion= "Turno seleccionado: " + this.especialidadSeleccionada + "  |  " +this.fechaFinal + "  |  " + this.especialistaSeleccionado.nombre + this.especialistaSeleccionado.apellido;

}


aceptar(){

  this.mostrarCaptcha=true;
  console.log('mostrarCaptcha:', this.mostrarCaptcha);
  
  
} 

 


}