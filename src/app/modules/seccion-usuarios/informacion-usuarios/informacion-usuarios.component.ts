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
  pacienteFields: string[] = ['nombre', 'apellido', 'edad', 'email' , 'obra social'];
  especialistaFields: string[] = ['nombre', 'apellido' , 'edad', 'email', 'especialidad'];

  ngOnInit() {
    this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
     //console.log("usuariosRef: ", usuariosRef);
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;
        return usuario;
      });
      console.log(this.usuarios)
    })
  }


  verificarPerfiles(){

    this.usuarios.forEach((usuario) => {
      const perfil = usuario.perfil.toLowerCase(); 
    
      if (perfil == "paciente") {
        this.pacientes.push(usuario);
      } else if (perfil == "especialista") {
        this.especialistas.push(usuario);
      }
    });

    console.log(this.pacientes);
    console.log(this.especialistas);
  }



}

