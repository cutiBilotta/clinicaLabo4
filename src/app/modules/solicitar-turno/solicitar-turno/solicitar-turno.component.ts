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
  fechas:any[]=[];
    
  
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

    this.calcularFechas();
  }



  seleccionarEspecialidad(event: any) {
    const selectedIndex = event.target.value;
    if (selectedIndex !== '') {
      const especialidadSeleccionada = this.especialidades[0].especialidades[selectedIndex];
      console.log('Especialidad seleccionada:', especialidadSeleccionada);
  
      // Filtrar especialistas en función de la especialidad seleccionada
      this.especialistasFiltrados = this.especialistas.filter(especialista => especialista.especialidad == especialidadSeleccionada);
      console.log(this.especialistasFiltrados);
      // Realiza la lógica de filtro u otras acciones aquí.
    } else {
      // Lógica si se selecciona la opción predeterminada.
      // En este caso, podrías mostrar todos los especialistas sin filtrar.
      this.especialistasFiltrados = this.especialistas;
    }
  }

  calcularFechas(){
    const fechaActual = new Date();

    for (let i = 0; i < 15; i++) {
    const fecha = new Date(fechaActual);
    fecha.setDate(fecha.getDate() + i);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    this.fechas.push({ dia, mes });
}
  }

}
