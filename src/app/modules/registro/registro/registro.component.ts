import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  constructor(private database: DataBaseService){}


  opcionSeleccionada:string = "";
  altaPaciente:boolean=false;
  altaEspecialista:boolean=false;


  aceptar(){
    
    if(this.opcionSeleccionada == "paciente"){
      this.altaPaciente=true;

    }else if (this.opcionSeleccionada == "especialista"){
      this.altaEspecialista=true;
    }

  }

}
