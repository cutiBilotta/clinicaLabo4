import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService:AuthService, private database:DataBaseService, private router: Router){}
  
  user: any;
  email:string="";
  password:string="";
  perfil:string="";
  usuarios: any[] = [];
  mensajeError:string="";

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
  

  autocompletarEmpleado(){
    this.email = "especialista@test.com";
    this.password = "especialistaTest";
    this.perfil = "Especialista";
    this.user = new Usuario(this.email, this.password, this.perfil);

  }

  autocompletarAdmin(){
  this.email = "paciente@test.com";
  this.password = "pacienteTest";
  this.perfil = "Paciente";
  this.user = new Usuario(this.email, this.password, this.perfil);

  }



  ingresar() {
    this.user = new Usuario(this.email, this.password, "indefinido");
  
    let usuarioEncontrado = this.usuarios.find(u => u.email == this.email);
  
    if (usuarioEncontrado) {
      this.perfil = usuarioEncontrado.perfil;
      if(this.perfil == "especialista" || this.perfil=="Especialista"){
        if(usuarioEncontrado.habilitacion == false){
          this.mensajeError="Usted no se encuentra habilitado";
          return

        }else{
          this.authService.login(this.user.email, this.password)
          .then(userCredential => {
            // Verifica si el correo electrónico del usuario está verificado
            if (userCredential?.user && userCredential.user.emailVerified) {
              // El usuario ha verificado su correo electrónico
              console.log("Ingreso exitoso");
              // Redirige al usuario a la página deseada
              // this.router.navigate(['/menu']);
            } else {
              this.mensajeError="El usuario aún no ha verificado su correo electrónico.";
              // Puedes mostrar un mensaje al usuario para que verifique su correo electrónico antes de continuar.
            }
          })
          .catch(err => {
            console.log("Error al iniciar sesión:", err);
          });

        }
      }
  
      // Realiza el inicio de sesión en Firebase
      this.authService.login(this.user.email, this.password)
        .then(userCredential => {
          // Verifica si el correo electrónico del usuario está verificado
          if (userCredential?.user && userCredential.user.emailVerified) {
            // El usuario ha verificado su correo electrónico
            console.log("Ingreso exitoso");
            // Redirige al usuario a la página deseada
            // this.router.navigate(['/menu']);
          } else {
            this.mensajeError="El usuario aún no ha verificado su correo electrónico.";
            // Puedes mostrar un mensaje al usuario para que verifique su correo electrónico antes de continuar.
          }
        })
        .catch(err => {
          console.log("Error al iniciar sesión:", err);
        });
    } else {
      this.mensajeError="Antes de ingresar debe registrarse";
    }
  }



}