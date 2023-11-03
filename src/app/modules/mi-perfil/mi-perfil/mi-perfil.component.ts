import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit{

  constructor(private authService:AuthService, private database:DataBaseService, private storageService:StorageService){}
  usuarioLoggeado:any;
  usuarioBD:any;
  imagenUrl:any;
  diasHabiles:string[] =["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  diasSeleccionados: { [key: string]: boolean } = {};
  especialidadSeleccionada:string="";
  mostrarForm:boolean=false;
  
  ngOnInit(): void {
    // Obtener el usuario loggeado
    this.authService.getUserLogged().subscribe(async (user) => {
      if (user) {
        this.usuarioLoggeado = user;

        // Ahora puedes acceder al email del usuario
        const email = user.email;
        console.log('Email del usuario loggeado:', email);

        // Comparar el email del usuario loggeado con el array de usuarios
        this.usuarioBD = this.database.usuarios.find((usuario) => usuario.email == email);

        if (this.usuarioBD) {
          // El usuario loggeado coincide con un usuario en el array de usuarios
          console.log('Usuario encontrado en el array de usuarios:', this.usuarioBD);

          // Obtener la imagen del usuario desde el StorageService
          const nombreImagen = this.usuarioBD.imgPerfil;
           // Reemplaza con el nombre de la imagen que deseas obtener
          this.imagenUrl = await this.storageService.obtenerImagen(nombreImagen);

          if (this.imagenUrl) {
            // La URL de la imagen está disponible, puedes usarla en tu componente
            console.log('URL de la imagen:', this.imagenUrl);
          }
        }
      }
    });
  }

  seleccionarEspecialidad(event: any) {
    this.especialidadSeleccionada = event.target.value;
    this.mostrarForm=true;
    
  }

  definirDisponibilidad() {
    const disponibilidadEspecialista: {
      especialidad: string;
      horarios: { [dia: string]: { inicio: number; egreso: number } };
    } = {
      especialidad: this.especialidadSeleccionada,
      horarios: {}  // Un objeto para almacenar los horarios de los días seleccionados
    };
  
    for (const dia in this.diasSeleccionados) {
      if (this.diasSeleccionados[dia]) {
        const horaIngresoInput = document.getElementById(`inputIngreso_${dia}`) as HTMLInputElement;
        const horaEgresoInput = document.getElementById(`inputEgreso_${dia}`) as HTMLInputElement;
  
        const horarioIngreso = +horaIngresoInput.value;
        const horarioEgreso = +horaEgresoInput.value;
  
        if (horarioIngreso >= 8 && horarioIngreso <= 19 && horarioEgreso >= 8 && horarioEgreso <= 19) {
          disponibilidadEspecialista.horarios[dia] = { inicio: horarioIngreso, egreso: horarioEgreso };
        } else {
          alert(`Los horarios ingresados para ${dia} no son válidos.`);
        }
      }
    }
  
    if (!this.usuarioBD.disponibilidad) {
      this.usuarioBD.disponibilidad = [];
    }
    this.usuarioBD.disponibilidad.push(disponibilidadEspecialista);
  
    console.log('Usuario con disponibilidad definida:', this.usuarioBD);
  }


}






