export class Paciente {
    email: string;
    contraseña: string;
    nombre:string;
    apellido:string;
    obraSocial:string;
    dni:number;
    edad:number;
    perfil:string ="Paciente";

  
    constructor(nombre:string, apellido: string,edad:number, dni: number, email: string, contraseña: string, obraSocial:string) {
      this.email = email;
      this.contraseña = contraseña;
      this.nombre = nombre;
      this.apellido = apellido;
      this.obraSocial = obraSocial;
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
          especialidad: this.obraSocial,
          password: this.contraseña,
          perfil: this.perfil
        };
      }
}