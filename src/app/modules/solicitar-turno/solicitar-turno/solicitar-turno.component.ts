import { Component } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {

  constructor(private database: DataBaseService){}

  usuarios:any[]=[];
  especialistas:any[]=[];
  especialidades:any[]=[];
  especialistasFiltrados:any[]=[];
   fechasGeneradas:any[]= [];
  hoarios:any[]=[];
  especialidadSeleccionada:any;

  
  ngOnInit() {
    this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;
        return usuario;
      });
  
      // Filtrar especialistas y almacenarlos en this.especialistas
      this.especialistas = this.usuarios.filter(usuario => usuario.perfil == "Especialista" );
  
      console.log(this.usuarios);
      console.log(this.especialistas);
    });
  
    this.database.obtenerTodos("especialidades").subscribe((especialidadesRef) => {
      this.especialidades = especialidadesRef.map(especialidadRef => {
        let especialidad: any = especialidadRef.payload.doc.data();
        especialidad['id'] = especialidadRef.payload.doc.id;
        return especialidad;
      });
  
      console.log(this.especialidades);
    });

  }



  seleccionarEspecialidad(event: any) {
      const selectedIndex = event.target.value;
      if (selectedIndex !== '') {
         this.especialidadSeleccionada = this.especialidades[0].especialidades[selectedIndex];
        console.log('Especialidad seleccionada:', this.especialidadSeleccionada);
      }

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
  console.log(disponibilidadEspecialista);
  if (!disponibilidadEspecialista || !disponibilidadEspecialista.disponibilidad) {

      return [];
  }

  const diasDisponibles = disponibilidadEspecialista.disponibilidad.map((dia: any) => dia.especialidad);

  const fechaActual = new Date();

  for (let i = 0; i < 15; i++) {
      const fecha = new Date(fechaActual);
      fecha.setDate(fecha.getDate() + i);
      const diaSemana = fecha.getDay();

      if (diasDisponibles.includes(this.obtenerNombreDia(diaSemana))) {
          const dia = fecha.getDate();
          const mes = fecha.getMonth() + 1;
          this.fechasGeneradas.push({ dia, mes });
      }
  }

  return this.fechasGeneradas;
}

obtenerNombreDia(numeroDia: number) {
  // Convierte el número de día de la semana en el nombre del día correspondiente.
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return diasSemana[numeroDia];
}

seleccionarEspecialista(event: any) {

  const especialistaId = event.target.value;
  if (especialistaId) {
      // Encuentra el médico seleccionado por su ID o como lo tengas en tus datos.
      const especialistaSeleccionado = this.especialistasFiltrados.find(especialista => especialista.id == especialistaId);

      if (especialistaSeleccionado) {
        const especialidadSeleccionada = this.especialidadSeleccionada; // Supongo que ya tienes esta información
    
        // Busca la entrada de disponibilidad correspondiente a la especialidad seleccionada
        const disponibilidadEspecialidad = especialistaSeleccionado.disponibilidad.find((disponibilidad: { especialidad: string, horarios: any }) => disponibilidad.especialidad === especialidadSeleccionada);
    
        if (disponibilidadEspecialidad) {
            // Ahora puedes acceder a los horarios dentro de la disponibilidad de la especialidad
            console.log('Horarios de la especialidad:', disponibilidadEspecialidad.horarios);
    
            // Llama a calcularFechas() con los horarios de disponibilidad
            this.calcularFechas(disponibilidadEspecialidad.horarios);
        }
    }
  }
}

}
