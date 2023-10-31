export class Administrador {
    email: string;
    contraseña: string;
    nombre:string;
    apellido:string;
    dni:number;
    edad:number;
    perfil:string = "Administrador"
    imgPerfil=""
  
    constructor(nombre:string, apellido: string, edad:number, dni: number, email: string, contraseña: string) {
      this.email = email;
      this.contraseña = contraseña;
      this.edad =edad;
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;

    }

    toJSON() {
        return {
          nombre: this.nombre,
          apellido: this.apellido,
          edad: this.edad,
          email: this.email,
          dni: this.dni,
          password: this.contraseña,
          perfil: this.perfil,
          imgPerfil:this.imgPerfil


        };
      }
}
