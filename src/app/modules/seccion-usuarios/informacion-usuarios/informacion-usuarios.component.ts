import { Component } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


interface Usuario {
  perfil: string;
  // Agrega otros campos aquí según la estructura real de tus documentos
}

@Component({
  selector: 'app-informacion-usuarios',
  templateUrl: './informacion-usuarios.component.html',
  styleUrls: ['./informacion-usuarios.component.scss']
})
export class InformacionUsuariosComponent {

  constructor(private database:DataBaseService){}

  usuarios: any[] = [];
  mensajeError:string="";
  pacientes:any[]=[];
  especialistas:any[]=[];
  administradores:any[] = [];
  turnos:any[]=[];
  especialistaSeleccionado: any | null = null;

  keysAdministradores:any[] = [];
  keysPacientes:any[]= [];
  keysEspecialistas:any[]= [];


  pacienteSeleccionado:any;
  usuariosEspecialistas:any[] = [];

  turnosDescarga:any[] = [];

  ngOnInit() {
    this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
     //console.log("usuariosRef: ", usuariosRef);
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;
        return usuario;
      });

      this.usuariosEspecialistas = this.usuarios.filter(user => user.perfil.toLowerCase() === "especialista");

      this.database.obtenerTodos("turnos").subscribe((turnosRef) => {
        this.turnos = turnosRef.map(turnoRef => {
          let turno: any = turnoRef.payload.doc.data();
          turno['id'] = turnoRef.payload.doc.id;
          return turno;
        });

      this.obtenerKeys();
      this.cargarTablas();

      console.log(this.usuarios)
      })
    })
  }

  obtenerKeys(){

    this.usuarios.forEach((usuario) => {
      const perfil = usuario.perfil.toLowerCase(); 
      
      if (this.keysPacientes.length==0 && perfil == "paciente") {
        this.keysPacientes.push("nombre", "apellido", "edad", "obra_social" , "dni", "email");
      } else if ( this.keysEspecialistas.length==0 &&  perfil == "especialista") {
        this.keysEspecialistas.push("nombre", "apellido", "edad", "especialidad" , "habilitacion", "dni", "email");
      }else if( this.keysAdministradores.length==0 &&  perfil == "administrador") {
        this.keysAdministradores.push("nombre", "apellido", "edad", "dni", "email");

      }
      if(this.keysPacientes.length>0 && this.keysEspecialistas.length>0 && this.keysAdministradores.length>0){
        return
      }
    });


  }


  cargarTablas() {
    this.pacientes = [];
    this.especialistas = [];
    this.administradores = [];
  
    this.usuarios.forEach((usuario) => {
      const perfil = usuario.perfil.toLowerCase();
  
      if (perfil == "paciente") {
        this.pacientes.push(usuario);
      } else if (perfil == "especialista") {
        this.especialistas.push(usuario);
      } else if (perfil == "administrador") {
        this.administradores.push(usuario);
      }
    });
  
    console.log(this.pacientes);
    console.log(this.especialistas);
  }

  seleccionarEspecialista(especialista: any) {
    this.especialistaSeleccionado = especialista;
  }

  habilitar() {
    this.especialistaSeleccionado.habilitacion = true;
    this.database.actualizar("usuarios", this.especialistaSeleccionado, this.especialistaSeleccionado.id);
    console.log("Especialista Habilitado");
  }
  
  deshabilitar() {
    this.especialistaSeleccionado.habilitacion = false;
    this.database.actualizar("usuarios", this.especialistaSeleccionado, this.especialistaSeleccionado.id);
  
    // Remove the disabled especialista from the local array
    const index = this.especialistas.findIndex(e => e.id === this.especialistaSeleccionado.id);
    if (index !== -1) {
      this.especialistas.splice(index, 1);
    }
  
    console.log("Especialista Inhabilitado");
  }


  exportExcel(): void {
    // Ordenar el array de usuarios por el campo 'perfil'
    this.usuarios.sort((a, b) => (a.perfil > b.perfil ? 1 : -1));
  
    const usuarios = this.convertirArraysACadenas(this.usuarios);
  
    const wb: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    const pacientesWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(usuarios);
  
    // Ejemplo: Dar formato al primer objeto (cambiar 'A1' por la celda que desees)
    pacientesWs['A1'].s = { fill: { fgColor: { rgb: 'FFFF00' } } }; // Color de fondo amarillo
  
    XLSX.utils.book_append_sheet(wb, pacientesWs, 'Usuarios');
  
    const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'usuarios_clinica.xlsx';
    document.body.appendChild(a);
    a.click();
  
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }, 0);
  }
  
  convertirArraysACadenas(data: any[]): any[] {
    return data.map(item => {
      const newItem: any = {};
  
      // Convertir los arrays a cadenas
      Object.keys(item).forEach(key => {
        if (Array.isArray(item[key])) {
          newItem[key] = JSON.stringify(item[key]);
        } else {
          newItem[key] = item[key];
        }
      });
  
      return newItem;
    });
  }

  descargarInformacion(paciente: any) {
    this.pacienteSeleccionado = paciente;
  
    const turnosUsuarioSeleccionado = this.turnos.filter(turno => turno.pacienteId === this.pacienteSeleccionado.id);
  
    this.turnosDescarga = [];
  
    turnosUsuarioSeleccionado.forEach((turno) => {
      const medico = this.usuariosEspecialistas.find(medico => medico.id == turno.especialistaId);
  
      this.turnosDescarga.push({
        especialista: medico.nombre + " " + medico.apellido,
        especialidad: turno.especialidad,
        dia: turno.dia,
        horario: turno.horario,
      });
    });
  
    console.log(this.turnosDescarga);
  
    // Lógica para descargar como archivo de texto
    const contenidoTexto = this.convertirTurnosAFormatoTexto();
    const blob = new Blob([contenidoTexto], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, this.pacienteSeleccionado.nombre + this.pacienteSeleccionado.apellido + "Turnos.txt");
  }
  
  private convertirTurnosAFormatoTexto(): string {
    // Aquí puedes personalizar cómo deseas que se forme el contenido del archivo de texto
    return this.turnosDescarga.map(turno => `${turno.especialista}, ${turno.especialidad}, ${turno.dia}, ${turno.horario}`).join('\n');
  }


 
  
}

