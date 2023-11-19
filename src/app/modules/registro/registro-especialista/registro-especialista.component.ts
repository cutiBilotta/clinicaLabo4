import { Component,OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Especialista } from 'src/app/classes/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit{

  listadoEspecialidades:any;
  form!: FormGroup;
  mensajeError:any[]=[];
  mensajeExito:string="";
  usuarios:any[]=[];
  nuevoEspecialista:any;
  mostrarEmailComponent:boolean=false;
  nuevaEspecialidad:boolean=false;
  otra = "Otra";
  imagenIngresada:boolean = false;
  especialidadesSeleccionadas: string[] = [];
mostrarCargaImg:Boolean=false;
  mensajeErrorImg:string="";
  imagenes:any[]=[];


  constructor(private storageService:StorageService, private authService: AuthService, private database: DataBaseService, private formBuilder: FormBuilder, private router:Router){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      
      nombre : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      edad: new FormControl('', [Validators.required, Validators.min(18),  Validators.max(65)]),
      dni: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
      especialidad: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      nuevaEspecialidadControl: new FormControl('')


    });
  
    this.database.obtenerTodos('especialidades').subscribe((snapshot) => {
      this.listadoEspecialidades = snapshot.map((item) => {
        const data: any = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          ...data,
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
    const inputFile = document.getElementById('inputFile') as HTMLInputElement;
    const archivos = inputFile.files;
    this.mensajeError=[];
    console.log("Nombre" + this.form?.get('nombre')?.value);
    if (this.form?.invalid) {
        for (const controlName in this.form?.controls) {
          if (this.form?.controls[controlName]?.invalid) {
            this.mensajeError.push(` ${controlName} `);
          }
        }
        console.log(this.mensajeError);
    } else if (this.form.valid) {
      const nombre = this.form.get('nombre')?.value;
      const apellido = this.form.get('apellido')?.value;
      const edad = this.form.get('edad')?.value;
      const email = this.form.get('email')?.value;
      const dni = this.form.get('dni')?.value;
      const password = this.form.get('password')?.value;
  
      // Verifica si se ha ingresado una especialidad personalizada
      const especialidadControl = this.form.get('especialidad');
      const especialidad = this.especialidadesSeleccionadas.slice(); // Clonar el array para evitar referencias
      if (this.nuevaEspecialidad) {
        const nuevaEspecialidad = this.form.get('nuevaEspecialidadControl')?.value;
        especialidad.push(nuevaEspecialidad);
        especialidadControl?.setValue(especialidad);
      }
  
      this.nuevoEspecialista = new Especialista(nombre, apellido, edad, dni, email, password, especialidad);
      this.nuevaEspecialidad = false;
      this.especialidadesSeleccionadas = []; // Reinicia la lista de especialidades seleccionadas
      if(this.registrarse() == null){
        this.mostrarCargaImg=false;
        console.log("retorno null Registrarse()")
        }else{
          console.log("entre al else porque no retorno null")
          console.log(archivos);
        if (archivos) {
         this.cargarImagen(archivos);
         this.router.navigateByUrl('/verificacion');

        }
  
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
      if (user !== null) {
        console.log("Se registró en Firebase Authentication: ", user);

        const nuevoEspecialistaJSON = this.nuevoEspecialista.toJSON();

        console.log(nuevoEspecialistaJSON);
        this.database.crear('usuarios', nuevoEspecialistaJSON);
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
    this.mensajeError.push("El usuario ya se encuentra registrado");
    return null;
  }
  return true;
}


selectChange(event: any) {
  const checkbox = event.target as HTMLInputElement;
  const valor = checkbox.value;

  if (valor.toLowerCase() == "otra") {
    this.nuevaEspecialidad = checkbox.checked; // Solo actualiza nuevaEspecialidad si "Otra" está marcada
  } else {
    this.nuevaEspecialidad = false;
  

    // Verifica si la especialidad ya está en la lista de seleccionadas antes de agregarla.
    if (checkbox.checked && !this.especialidadesSeleccionadas.includes(valor)) {
      this.especialidadesSeleccionadas.push(valor);
    } else if (!checkbox.checked) {
      // Checkbox desmarcado, eliminar del array
      const index = this.especialidadesSeleccionadas.indexOf(valor);
      if (index !== -1) {
        this.especialidadesSeleccionadas.splice(index, 1);
      }
    }
  }

  console.log(this.especialidadesSeleccionadas);
}

cargarImagen(archivos: any) {
  //this.spinner=true;
  let id: any;
  console.log(archivos);

  if (archivos.length > 1) {
    this.mensajeErrorImg = 'Se ha excedido el límite de imágenes';
    return;
  }

  setTimeout(() => {
    id = this.buscarUsuarioPorDNI();

    console.log(id);
    if (id) {
      const nombresArchivos: string[] = []; // Array to store file names

      for (let i = 0; i < archivos.length; i++) {
        const reader = new FileReader();
        const nombreArchivo =
          this.form.get('nombre')?.value +
          this.form.get('apellido')?.value +
          '_' +
          Date.now() +
          '_' +
          i;

        reader.readAsDataURL(archivos[i]);
        reader.onloadend = () => {
          
          this.imagenes.push(reader.result);
          // Upload the image to Firebase Storage
          this.storageService.subirImagen(nombreArchivo, reader.result).then((urlImagen) => {
            nombresArchivos.push(nombreArchivo); // Store the file name
            console.log(nombreArchivo);
            console.log(nombresArchivos.length)
            console.log(archivos.length);
            if (nombresArchivos.length === archivos.length) {
              // Update the 'imgPerfil' field in nuevoPaciente with the array of file names
              this.nuevoEspecialista.imgPerfil = nombresArchivos;

              console.log(this.nuevoEspecialista.imgPerfil);
              const nuevoPacienteJSON = this.nuevoEspecialista.toJSON();
              // Update the user's data in the Firestore database
              this.database.actualizar('usuarios', nuevoPacienteJSON, id);
              console.log('se actualizo el database');

              this.router.navigateByUrl('/verificacion');
            }
          });
        }
      }
    } else {
      // Handle the case where the user is not found
    }
  }, 5000); // Agregamos un retraso de 1 segundo
}
 buscarUsuarioPorDNI() {
  const dniToFind = this.nuevoEspecialista.dni; // DNI to search for

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
onFileChange(event: any) {
  // Verifica si se seleccionó algún archivo
  this.imagenIngresada = event.target.files && event.target.files.length > 0;
}
}


