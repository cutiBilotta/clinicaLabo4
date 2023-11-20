import { Component, OnInit,  Input, Output, EventEmitter  } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { keyframes, state, style, trigger, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [
    trigger('openCloseButton1', [
      state('open', style({
        opacity: 1,
        transform: 'scale(1)',
      })),
      state('closed', style({
        opacity: 0.8,
        transform: 'scale(0.5)',
      })),
      transition('* => *', animate('0.5s ease-in-out')),
    ]),
    trigger('openCloseButton2', [
      state('open', style({
        opacity: 1,
        transform: 'scale(1)',
      })),
      state('closed', style({
        opacity: 0.8,
        transform: 'scale(0.5)',
      })),
      transition('* => *', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class RegistroComponent {

  constructor(private router: Router, private database: DataBaseService){}

  opcionSeleccionada:string = "";
  paciente:boolean=false;
  especialista:boolean=false;
  mostrarVerificacionEmail:boolean=false;

  isOpenButton1 = true;
  isOpenButton2 = true;

  altaPaciente(buttonNumber: number) {
    if (buttonNumber === 1) {
      this.isOpenButton1 = !this.isOpenButton1;
    } else if (buttonNumber === 2) {

      this.isOpenButton2 = !this.isOpenButton2;
    }
      setTimeout(() => {

        this.paciente=true;
        },500);
    
  }

  altaEspecialista(buttonNumber: number){
    if (buttonNumber === 2) {
      this.isOpenButton2 = !this.isOpenButton2;
    } else if (buttonNumber === 1) {
      this.isOpenButton1 = !this.isOpenButton1;
    }
      setTimeout(() => {

        this.especialista=true;
        },500);
    
  }


  verificacionEmail(){
    this.especialista=false;
    this.paciente=false;
    this.router.navigateByUrl('/verificacion');


  }

}
