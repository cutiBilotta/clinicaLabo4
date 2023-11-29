import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { StorageService } from 'src/app/services/storage.service';
import { RouterOutlet } from '@angular/router';
import { keyframes, state, style, trigger, transition, animate } from '@angular/animations';
import { openCloseAnimation, slideInAnimation } from 'src/app/app.module';


@Component({
  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [openCloseAnimation, slideInAnimation]

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
  usuariosAcceso:any[]=['jmkeixwzrgmlvbkgxm@cazlv.com','dvzbjkhmoexktcouuj@cazlq.com', 'haazgxzjipavfpigda@cazlv.com',  'agus.bilotta@gmail.com', 'july.bilotta@gmail.com', 'cavvurxgzmyqtgrmbc@cwmxc.com' ];
  imagenURL:any;
  spinner:boolean= true;
  isOpen=true ;
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
          const url = await this.storageService.obtenerImagen("users",nombreImagen);
          usuario.imagenURL = url;
        }
      }
  
      this.usuariosAcceso = this.usuarios.map(usuario => {
        if (this.usuariosAcceso.includes(usuario.email)) {
           
            return {
              nombre: usuario.nombre,
              email:usuario.email,
              perfil: usuario.perfil,
              password: usuario.password,
              imagenURL: usuario.imagenURL
            };
          
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


  getRouterOutletState(outlet: RouterOutlet): any {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ingresar() {

    this.isOpen = !this.isOpen;
    this.user = new Usuario(this.email, this.password, "indefinido");
  
    let usuarioEncontrado = this.usuarios.find(u => u.email == this.email);
  
    setTimeout(() => {

    if (usuarioEncontrado) {
      this.perfil = usuarioEncontrado.perfil;
      if(this.perfil.toLocaleLowerCase() == "especialista" && usuarioEncontrado.habilitacion == false) {
          this.mensajeError="Usted no se encuentra habilitado";
          return

      }else{
          this.authService.login(this.user.email, this.password)
          .then(userCredential => {
            if(!userCredential?.user){
              this.mensajeError="Contraseña incorrecta";

            }else if ( !userCredential?.user?.emailVerified) {
              this.mensajeError="El usuario no ha verificado el email";
            }else if(userCredential?.user && userCredential.user.emailVerified){

              this.router.navigate(['/home']);
            }
          })
          .catch(err => {
            console.log("Error al iniciar sesión:", err);
          });

        }
      }
    },1000);
    
       
  }



}

