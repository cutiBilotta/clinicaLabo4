import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';

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
      this.turnosKeys.push("especialidad", "dia", "horario", "reseñaCancelacion", "pacienteId")

    });
  });

  }

}