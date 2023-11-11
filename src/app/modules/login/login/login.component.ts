import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService:AuthService, private database:DataBaseService, private router: Router, private storageService: StorageService){}
  
  user: any;
  email:string="";
  password:string="";
  perfil:string="";
  usuarios: any[] = [];
  mensajeError:string="";
  usuarioBD:any;
  usuariosAcceso:any[]=['jmkeixwzrgmlvbkgxm@cazlv.com','dvzbjkhmoexktcouuj@cazlq.com','orkjqizsbgtagpdena@cazlq.com', 'haazgxzjipavfpigda@cazlv.com', 'aadxlldlzqamkjrpsx@cwmxc.com' , 'hokiocithgxwlwybri@cazlg.com' ];
  imagenURL:any;
  spinner:boolean= true;
  
  ngOnInit() {
    this.database.obtenerTodos("usuarios").subscribe(async (usuariosRef) => {
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;
        return usuario;
      });
      console.log(this.usuarios);
  
      for (const usuario of this.usuarios) {
        if (usuario.imgPerfil && usuario.imgPerfil.length > 0) {
          const nombreImagen = usuario.imgPerfil[0];
          const url = await this.storageService.obtenerImagen(nombreImagen);
          usuario.imagenURL = url;
        }
      }
  
      this.usuariosAcceso = this.usuarios.map(usuario => {
        if (this.usuariosAcceso.includes(usuario.email)) {
          if (usuario.perfil === 'Especialista') {
            return {
              nombre: usuario.nombre,
              email:usuario.email,
              perfil: usuario.perfil,
              password: usuario.password
            };
          } else {
            return {
              nombre: usuario.nombre,
              email:usuario.email,
              perfil: usuario.perfil,
              password: usuario.password,
              imagenURL: usuario.perfil === 'Paciente' || usuario.perfil === 'Administrador' ? usuario.imagenURL : null
            };
          }
        }
        return null;
      }).filter(usuario => usuario !== null);

      this.spinner=false;
    });
  }

  autocompletar(usuario:any){
    this.email = usuario.email;
    this.password = usuario.password;

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
              this.router.navigate(['/home']);
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
            this.router.navigate(['/home']);

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