import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private afauth: AuthService, private database:DataBaseService){}

  usuarios:any[]= [];
  perfilActual:any;
  usuarioActual:any;

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

 

          this.usuarioActual = this.usuarios.find(usuario => usuario.email == usuarioActualEmail);
          console.log(this.usuarioActual.id);
          this.perfilActual = this.usuarioActual ? this.usuarioActual.perfil.toLowerCase() :null;
          console.log("Perfil actual" + this.perfilActual);
     

        })

      }
    })
}
}
