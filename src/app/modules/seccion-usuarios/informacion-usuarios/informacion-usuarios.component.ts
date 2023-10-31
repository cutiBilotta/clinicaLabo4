import { Component } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';

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

  especialistaSeleccionado: any | null = null;

  keysAdministradores:any[] = [];
  keysPacientes:any[]= [];
  keysEspecialistas:any[]= [];

  ngOnInit() {
    this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
     //console.log("usuariosRef: ", usuariosRef);
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;
        return usuario;
      });
      this.obtenerKeys();
      this.cargarTablas();

      console.log(this.usuarios)
    })
  }

  obtenerKeys(){

    this.usuarios.forEach((usuario) => {
      const perfil = usuario.perfil.toLowerCase(); 
      
      if (this.keysPacientes.length==0 && perfil == "paciente") {
        this.keysPacientes = Object.keys(usuario);
      } else if ( this.keysEspecialistas.length==0 &&  perfil == "especialista") {
        this.keysEspecialistas = Object.keys(usuario);
      }else if( this.keysAdministradores.length==0 &&  perfil == "administrador") {
        this.keysAdministradores = Object.keys(usuario);

      }
      if(this.keysPacientes.length>0 && this.keysEspecialistas.length>0 && this.keysAdministradores.length>0){
        return
      }
    });


  }


  cargarTablas(){

    this.usuarios.forEach((usuario) => {
      const perfil = usuario.perfil.toLowerCase(); 

      if (perfil == "paciente") {
        this.pacientes.push(usuario);
      } else if (perfil == "especialista") {
        this.especialistas.push(usuario);
      }else if( perfil == "administrador"){
        this.administradores.push(usuario);

      } 
    });
 
    console.log(this.pacientes);
    console.log(this.especialistas);

  }

  seleccionarEspecialista(especialista: any) {
    this.especialistaSeleccionado = especialista;
  }

  habilitar(){

    this.especialistaSeleccionado.habilitacion = true;
   
    this.database.actualizar("usuarios", this.especialistaSeleccionado, this.especialistaSeleccionado.id );
    console.log("Especialista Habilitado");

  }
  
  deshabilitar(){


    this.especialistaSeleccionado.habilitacion = false;
   
    this.database.actualizar("usuarios", this.especialistaSeleccionado, this.especialistaSeleccionado.id );
    console.log("Especialista Inhabilitado");


  }

}

