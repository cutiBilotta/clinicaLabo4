import { Component } from '@angular/core';
import { keyframes, state, style, trigger, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.8,
      })),
      transition('open => closed', [
        animate('1s', keyframes([
          style({ transform: 'scale(1) rotateX(0)', offset: 0 }), // Estado inicial
          style({ transform: 'scale(2.5) rotateX(-90deg)', offset: 1 }) // Final de la animación
        ]))
      ]),
      transition('closed => open', [
        animate('0.5s', keyframes([
          style({ transform: 'scale(1) rotateX(0)', offset: 0 }), // Estado inicial
          style({ transform: 'scale(2.5) rotateX(-90deg)', offset: 1 }) // Final de la animación
        ]))
      ]),
    ]),
  ],
})
export class SeccionUsuariosComponent {

  isOpen=true;
  constructor(){}

  registrarPaciente:boolean=false;
  registrarEspecialista:boolean=false;
  registrarAdministrador:boolean=false;
  mostrarTurnos:boolean=false;
  mostrarHistorias:boolean=false;
  mostrarUsuarios:boolean=false;
  mostrarCuerpo:boolean=true;
 
  volver(){
    this.registrarPaciente = false;
    this.registrarEspecialista = false;
    this.registrarAdministrador = false;
    this.mostrarUsuarios = false;
    this.mostrarTurnos = false;
    this.mostrarHistorias = false;
    this.mostrarCuerpo=true;

  }
  paciente() {
    
      this.registrarPaciente = true;
      this.registrarEspecialista = false;
      this.registrarAdministrador = false;
      this.mostrarUsuarios = false;
      this.mostrarCuerpo = false;
      this.mostrarTurnos = false;
      this.mostrarHistorias = false;
  }

  especialista(){
    this.registrarEspecialista=true;
    this.registrarPaciente=false;
    this.registrarAdministrador=false;
    this.mostrarUsuarios=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;
    this.mostrarHistorias=false;


  }

  administrador(){
    this.registrarAdministrador=true;
    this.registrarPaciente=false;
    this.registrarEspecialista=false;
    this.mostrarUsuarios=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;
    this.mostrarHistorias=false;


  }

  usuarios(){
    this.mostrarUsuarios=true;
    this.registrarPaciente=false;
    this.registrarEspecialista=false;
    this.registrarAdministrador=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;
    this.mostrarHistorias=false;


  }
  turnos(){
    this.mostrarUsuarios=false;
    this.registrarPaciente=false;
    this.registrarEspecialista=false;
    this.registrarAdministrador=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=true;
    this.mostrarHistorias=false;


  }
  historias(){
    this.mostrarUsuarios=false;
    this.registrarPaciente=false;
    this.registrarEspecialista=false;
    this.registrarAdministrador=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;
    this.mostrarHistorias=true;


  }



}
