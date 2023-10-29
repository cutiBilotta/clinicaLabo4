import { Component, OnInit,  Input, Output, EventEmitter  } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  constructor(private router: Router, private database: DataBaseService){}


  opcionSeleccionada:string = "";
  altaPaciente:boolean=false;
  altaEspecialista:boolean=false;
  mostrarVerificacionEmail:boolean=false;

  aceptar(){
    
    if(this.opcionSeleccionada == "paciente"){
      this.altaPaciente=true;

    }else if (this.opcionSeleccionada == "especialista"){
      this.altaEspecialista=true;
    }

  }

  verificacionEmail(){
    this.altaEspecialista=false;
    this.altaPaciente=false;
    this.router.navigateByUrl('/verificacion');


  }

}
