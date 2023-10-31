import { Component,OnInit,  Input, Output, EventEmitter  } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Administrador } from 'src/app/classes/administrador';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent {

  listadoObrasSociales:any;
  form!: FormGroup;
  mensajeError:any[]=[];
  mensajeExito:string="";
  usuarios:any[]=[];
  usuario:any;
  nuevoAdmin:any;
  imagenes:any[]=[];
  mostrarCargaImg:boolean=false;
  mensajeErrorImg:string="";

  @Output() verificacionEmail = new EventEmitter<string>();

  constructor(private authService: AuthService, private database: DataBaseService, private formBuilder: FormBuilder, private storageService: StorageService){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      
      nombre : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      edad: new FormControl("", [Validators.required, Validators.min(1), Validators.max(100)]),
      dni: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required]),


    });
  
    this.database.obtenerTodos('prestadores').subscribe((snapshot) => {
      // Assuming 'prestadores' is an array field in the data
      this.listadoObrasSociales = snapshot.map((item) => {
          const data: any = item.payload.doc.data();
          return {
              id: item.payload.doc.id,
              prestadores: data.prestadores || [], // Assuming it's an array field
          };
      });
  });


  this.database.obtenerTodos("usuarios").subscribe((usuariosRef) => {
    // console.log("usuariosRef: ", usuariosRef);
     this.usuarios = usuariosRef.map(userRef => {
       let usuario: any = userRef.payload.doc.data();
       usuario['id'] = userRef.payload.doc.id;
       return usuario;
     });
     //console.log(this.usuarios)
   })
}
    
  aceptar() {
    this.mensajeError=[];
    console.log("Nombre" + this.form?.get('nombre')?.value);
    if (this.form?.invalid) {
        for (const controlName in this.form?.controls) {
          if (this.form?.controls[controlName]?.invalid) {
            this.mensajeError.push(`${controlName}`);
          }
        }
        console.log(this.mensajeError);
    } else if(this.form.valid) {
    const nombre = this.form.get('nombre')?.value;
    const apellido = this.form.get('apellido')?.value;
    const edad = this.form.get('edad')?.value;
    const email = this.form.get('email')?.value;
    const dni = this.form.get('dni')?.value;
    const password = this.form.get('password')?.value;

    this.nuevoAdmin = new Administrador(nombre, apellido, edad, dni, email, password);
    if(this.registrarse() == null){
      this.mostrarCargaImg=false;

    }else{
      this.mostrarCargaImg=true;

    }
  } else {
    console.log('Formulario Inválido');
  }
}


registrarse() {
  let email = this.form.get('email')?.value;
  let password = this.form.get('password')?.value;

  let lista = [...this.usuarios];
  let existe = lista.find(user => user.email == email);

  if (!existe) {
    this.authService.register(email, password).then(user => {
      if (user != null) {
        console.log("Se registró en Firebase Authentication: ", user);

        const nuevoAdminJSON = this.nuevoAdmin.toJSON();

        console.log(nuevoAdminJSON);
        this.database.crear('usuarios', nuevoAdminJSON);
        return true;

      } else {
        console.log("Error. Ingrese datos válidos");
        return null;
      }
    }).catch(err => {
      console.log(err);
      return null;
    });
  } else {
    this.mensajeError.push("El administrador ya se encuentra registrado");
    return null;
    
  }
  return true;
}

redirigirVerificacionEmail() {
  this.verificacionEmail.emit();
}

cargarImagen(event: any) {
  const archivos = event.target.files;
  
  if (this.imagenes.length + archivos.length > 2) {
    this.mensajeErrorImg= 'Se ha excedido el límite de imágenes';
    return;
  }

  let id = this.buscarUsuarioPorDNI();

  if (id) {
    const nombresArchivos: string[] = []; // Array to store file names

    for (let i = 0; i < archivos.length; i++) {
      const reader = new FileReader();
      const nombreArchivo = this.form.get('nombre')?.value + this.form.get('apellido')?.value + "_" + Date.now() + "_" + i;

      reader.readAsDataURL(archivos[i]);
      reader.onloadend = () => {
        this.imagenes.push(reader.result);
        
        // Upload the image to Firebase Storage
        this.storageService.subirImagen(nombreArchivo, reader.result).then(urlImagen => {
          nombresArchivos.push(nombreArchivo); // Store the file name

          if (nombresArchivos.length === archivos.length) {
            // Update the 'imgPerfil' field in nuevoAdmin with the array of file names
            this.nuevoAdmin.imgPerfil = nombresArchivos;

            const nuevoAdminJSON = this.nuevoAdmin.toJSON();
            // Update the user's data in the Firestore database
            this.database.actualizar("usuarios", nuevoAdminJSON, id);

            this.form.reset();
            this.redirigirVerificacionEmail();
          }
        });
      }
    }
  } else {
    // Handle the case where the user is not found
  }
}

buscarUsuarioPorDNI() {
  const dniToFind = this.nuevoAdmin.dni; // DNI to search for

  const matchingUser = this.usuarios.find(user => user.dni === dniToFind);

  if (matchingUser) {
    const userId = matchingUser.id;
    // userId is the ID of the user with the matching DNI
    return userId;
  } else {
    // User not found
    return null;
  }
}
}


