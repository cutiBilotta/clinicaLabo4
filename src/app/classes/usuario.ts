export class Usuario {
   
    email: string;
    contraseña: string;
    perfil:string;
  
    constructor(email: string, contraseña: string, perfil:string) {
      this.email = email;
      this.contraseña = contraseña;
      this.perfil = perfil;
    }

    toJSON() {
      return {
        email: this.email,
        password: this.contraseña,
        perfil: this.perfil
      };
    }
}