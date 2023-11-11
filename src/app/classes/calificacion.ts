export class Calificacion {
   
    especilistaId: string;
    pacienteId: string;
    calificacion:string;
    comentario:string
    turnoId:string
  
    constructor(especilistaId: string, pacienteId: string, calificacion:string, comentario:string, turnoId:string) {
      this.especilistaId = especilistaId;
      this.pacienteId = pacienteId;
      this.calificacion = calificacion;
      this.comentario = comentario;
      this.turnoId= turnoId

    }

    toJSON() {
      return {
        especilistaId: this.especilistaId,
        pacienteId: this.pacienteId,
        calificacion: this.calificacion,
        comentario: this.comentario,
        turnoId: this.turnoId
      };
    }
}