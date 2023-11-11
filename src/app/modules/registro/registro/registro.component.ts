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
  paciente:boolean=false;
  especialista:boolean=false;
  mostrarVerificacionEmail:boolean=false;

  altaPaciente(){
    this.paciente=true;
  }

  altaEspecialista(){
    this.especialista=true;
  }


  verificacionEmail(){
    this.especialista=false;
    this.paciente=false;
    this.router.navigateByUrl('/verificacion');


  }

}
