export class Paciente {
    email: string;
    contraseña: string;
    nombre:string;
    apellido:string;
    obra_social:string;
    dni:number;
    edad:number;
    perfil:string ="Paciente";
    imgPerfil: string="";

  
    constructor(nombre:string, apellido: string,edad:number, dni: number, email: string, contraseña: string, obraSocial:string) {
      this.email = email;
      this.contraseña = contraseña;
      this.nombre = nombre;
      this.apellido = apellido;
      this.obra_social = obraSocial;
      this.dni = dni;
      this.edad = edad;

    }

    toJSON() {
        return {
          nombre: this.nombre,
          apellido: this.apellido,
          edad: this.edad,
          email: this.email,
          dni: this.dni,
          obra_social: this.obra_social,
          password: this.contraseña,
          perfil: this.perfil,
          imgPerfil: this.imgPerfil
        };
      }
}