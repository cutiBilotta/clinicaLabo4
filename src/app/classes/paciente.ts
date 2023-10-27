export class Paciente {
    email: string;
    contraseña: string;
    nombre:string;
    apellido:string;
    obraSocial:string;
    dni:number;

  
    constructor(nombre:string, apellido: string, dni: number, email: string, contraseña: string, obraSocial:string) {
      this.email = email;
      this.contraseña = contraseña;
      this.nombre = nombre;
      this.apellido = apellido;
      this.obraSocial = obraSocial;
      this.dni = dni;

    }

    toJSON() {
        return {
          nombre: this.nombre,
          apellido: this.apellido,
          email: this.email,
          dni: this.dni,
          especialidad: this.obraSocial,
          password: this.contraseña
        };
      }
}