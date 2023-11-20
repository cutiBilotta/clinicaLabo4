import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.scss']
})
export class HistoriasComponent implements OnInit{

  constructor(private database: DataBaseService){}
  usuarios:any[]=[];
  usuariosKeys:any[]=[];
  pacientes:any[]=[];

  ngOnInit(): void {
    this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
      //console.log("usuariosRef: ", usuariosRef);
       this.usuarios = usuariosRef.map(userRef => {
         let usuario: any = userRef.payload.doc.data();
         usuario['id'] = userRef.payload.doc.id;
         return usuario;
       });

       this.usuarios.forEach((user)=>{
        if(user.perfil.toLowerCase()== 'paciente'){
          this.pacientes.push(user);
        }
       })

       console.log(this.usuarios)
     })

     if(this.usuariosKeys.length==0){

      this.usuariosKeys.push("nombre", "apellido", "historiaClinica");
     }
  }

}
