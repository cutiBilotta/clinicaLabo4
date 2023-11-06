import { Component } from '@angular/core';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent {

  constructor(){}

  registrarPaciente:boolean=false;
  registrarEspecialista:boolean=false;
  registrarAdministrador:boolean=false;
  mostrarTurnos:boolean=false;

  mostrarUsuarios:boolean=false;
  mostrarCuerpo:boolean=true;

  paciente(){
    this.registrarPaciente=true;
    this.registrarEspecialista=false;
    this.registrarAdministrador=false;
    this.mostrarUsuarios=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;

  }

  especialista(){
    this.registrarEspecialista=true;
    this.registrarPaciente=false;
    this.registrarAdministrador=false;
    this.mostrarUsuarios=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;


  }

  administrador(){
    this.registrarAdministrador=true;
    this.registrarPaciente=false;
    this.registrarEspecialista=false;
    this.mostrarUsuarios=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;


  }

  usuarios(){
    this.mostrarUsuarios=true;
    this.registrarPaciente=false;
    this.registrarEspecialista=false;
    this.registrarAdministrador=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=false;


  }
  turnos(){
    this.mostrarUsuarios=false;
    this.registrarPaciente=false;
    this.registrarEspecialista=false;
    this.registrarAdministrador=false;
    this.mostrarCuerpo=false;
    this.mostrarTurnos=true;


  }


}
