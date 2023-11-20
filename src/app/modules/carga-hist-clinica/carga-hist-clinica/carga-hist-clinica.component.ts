import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carga-hist-clinica',
  templateUrl: './carga-hist-clinica.component.html',
  styleUrls: ['./carga-hist-clinica.component.scss']
})
export class CargaHistClinicaComponent implements OnInit {

  constructor(private database: DataBaseService, private afauth: AuthService){}
  usuarios: any[]=[];
  especialistas: any[]=[];
  pacientes: any[]=[];
usuarioActualBd:any;
turnos: any[]=[];
turnosFiltrados:any[]=[];
turnosKeys:any[] =[];
turnoSeleccionado:any;
pacienteSeleccionado:any;
  
altura: any;
  peso: any;
  temperatura: any;
  presion: any;

  datoUno:any;
  datoDos:any;
  datoTres:any;
  descUno:any;
  descDos:any;
  descTres:any;
  pacientesFiltrados:any[]=[];
  camposVisibles: number = 1;

  mensajeError:string = "";
  mensajeErrorHist:string = "";


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
          console.log(this.usuarioActualBd.id);
        
        })

      }
    
   
      this.database.obtenerTodos("turnos").subscribe((turnosRef) => {
        this.turnos = turnosRef.map(turnoRef => {
          let turno: any = turnoRef.payload.doc.data();
          turno['id'] = turnoRef.payload.doc.id;
          return turno;
        });

        this.turnos.forEach((turno) => {
                    
          if(turno.especialistaId == this.usuarioActualBd.id && turno.estado.toLowerCase() == "finalizado"){
            this.turnosFiltrados.push(turno);
          }
        });
        if(this.turnosKeys.length==0){
        this.turnosKeys.push("especialidad", "dia", "horario", "nombre", "apellido")
        }

        this.turnosFiltrados.forEach((turnoFiltrado) => {
          const pacienteId = turnoFiltrado.pacienteId;
        
          // Buscar el usuario con el ID del paciente
          const paciente = this.usuarios.find((usuario) => usuario.id === pacienteId);
        
          // Verificar si el paciente no está en el array pacientesFiltrados antes de agregarlo
          if (paciente && !this.pacientesFiltrados.includes(paciente)) {
            this.pacientesFiltrados.push(paciente);
          }
        });
        console.log(this.pacientesFiltrados);

      });
  });

  }

  obtenerNombrePaciente(pacienteId: string): string {
    const paciente = this.pacientesFiltrados.find((p) => p.id === pacienteId);
    return paciente ? paciente.nombre : '';
  }
  
  obtenerApellidoPaciente(pacienteId: string): string {
    const paciente = this.pacientesFiltrados.find((p) => p.id === pacienteId);
    return paciente ? paciente.apellido : '';
  }

  obtenerPaciente(pacienteId: string){
    const paciente = this.pacientesFiltrados.find((p) => p.id === pacienteId);
    this.pacienteSeleccionado = paciente;
    console.log(this.pacienteSeleccionado);
  }

  seleccionarTurno(turnoSeleccionado:any){
    this.turnoSeleccionado=turnoSeleccionado;
    console.log(this.turnoSeleccionado);
    this.obtenerPaciente(turnoSeleccionado.pacienteId)
  }

  enviarHistoriaClinica() {
    // Verifica que ningun input esté vacío
    
    if (!this.altura || !this.peso || !this.temperatura || !this.presion) {
      this.mensajeError='Todos los campos son obligatorios';
      return;
    }

    // Verifica la altura
    if (this.altura <= 30 || this.altura >= 250) {
      this.mensajeError='La altura debe estar entre 30 y 250 centímetros';
      return;
    }

    // Verifica el peso
    if (this.peso <= 1 || this.peso >= 300) {
      this.mensajeError='El peso debe estar entre 1 y 300 gramos';
      return;
    }

    // Verifica la temperatura
    if (isNaN(this.temperatura) || this.temperatura <= 30 || this.temperatura >= 45) {
      this.mensajeError = 'La temperatura debe ser un número válido y estar entre 30 y 45 grados.';
      return;
    }
    if (this.camposVisibles >= 1 && (!this.datoUno || !this.descUno)) {
      this.mensajeError = 'Los campos Dato y Descripción son obligatorios.';
      return;
  }

  if (this.camposVisibles >= 2 && (!this.datoDos || !this.descDos)) {
      this.mensajeError = 'Los campos Dato y Descripción son obligatorios.';
      return;
  }

  if (this.camposVisibles === 3 && (!this.datoTres || !this.descTres)) {
      this.mensajeError = 'Los campos Dato y Descripción son obligatorios.';
      return;
  }

  // Verifica las condiciones específicas para cada input
  if (this.camposVisibles >= 1) {
      // Verifica que datoUno solo contenga letras y espacios
      if (!/^[a-zA-Z\s]+$/.test(this.datoUno)) {
          this.mensajeErrorHist = 'El campo Dato solo puede contener letras y espacios.';
          return;
      }
  }

  if (this.camposVisibles >= 2) {
      // Verifica que datoDos solo contenga letras y espacios
      if (!/^[a-zA-Z\s]+$/.test(this.datoDos)) {
          this.mensajeErrorHist = 'El campo Dato solo puede contener letras y espacios.';
          return;
      }
  }

  if (this.camposVisibles === 3) {
      // Verifica que datoTres solo contenga letras y espacios
      if (!/^[a-zA-Z\s]+$/.test(this.datoTres)) {
          this.mensajeErrorHist = 'El campo Dato solo puede contener letras y espacios.';
          return;
      }
  }

    // Verifica la presión
    const presionParts = this.presion.split('/');
    const presionMin = 10;
    const presionMax = 300;

    if (
      presionParts.length !== 2 ||
      isNaN(+presionParts[0]) ||
      isNaN(+presionParts[1]) ||
      +presionParts[0] < presionMin ||
      +presionParts[0] > presionMax ||
      +presionParts[1] < presionMin ||
      +presionParts[1] > presionMax
    ){
      this.mensajeError='El formato de presión no es válido. Debe ser XX/YY donde ambos números están entre 10 y 300';
      return;
    }
    const detallesCargados = [];
    detallesCargados.push({ dato: this.datoUno, descripcion: this.descUno })

    if (this.camposVisibles >= 2 && this.datoDos && this.descDos) {
      detallesCargados.push({ dato: this.datoDos, descripcion: this.descDos });
    }
  
    if (this.camposVisibles === 3 && this.datoTres && this.descTres) {
      detallesCargados.push({ dato: this.datoTres, descripcion: this.descTres });
    }
  
    // Agregar la nueva historia clínica al array
    const nuevaHistoriaClinica = {
      presion: this.presion,
      altura: this.altura,
      peso: this.peso,
      temperatura: this.temperatura,
      detalles: detallesCargados
    };
  
    if (!this.pacienteSeleccionado.hasOwnProperty('historiaClinica')) {
      this.pacienteSeleccionado['historiaClinica'] = [];
    }
    // Agregar la nueva historia clínica al array de detallesCargados
    this.pacienteSeleccionado.historiaClinica.push(nuevaHistoriaClinica);
  
    // Console log para verificar
    console.log('Paciente con historia clínica:', this.pacienteSeleccionado);
    
    this.database.actualizar("usuarios", this.pacienteSeleccionado, this.pacienteSeleccionado.id);
  }


  agregarCampo(){
    if (this.camposVisibles < 3) {
      this.camposVisibles++;
    }

  }
  eliminarCampo() {
    if (this.camposVisibles > 1) {
      this.camposVisibles--;
    }
  }

}

