export class Especialista {
    email: string;
    contraseña: string;
    nombre:string;
    apellido:string;
    especialidad:string[];
    dni:number;
    edad:number;
    perfil:string = "Especialista"
    habilitacion:boolean=false;
  
    constructor(nombre:string, apellido: string, edad:number, dni: number, email: string, contraseña: string, especialidad:string[]) {
      this.email = email;
      this.contraseña = contraseña;
      this.edad =edad;
      this.nombre = nombre;
      this.apellido = apellido;
      this.especialidad = especialidad;
      this.dni = dni;

    }

    toJSON() {
        return {
          nombre: this.nombre,
          apellido: this.apellido,
          edad: this.edad,
          email: this.email,
          dni: this.dni,
          especialidad: this.especialidad,
          password: this.contraseña,
          perfil: this.perfil,
          habilitacion:false


        };
      }

      especialidadesToJSON(especialidades: string[] = []) {
        return {
          // ... otros campos
          especialidad: especialidades,
        };
      }
    }


   
