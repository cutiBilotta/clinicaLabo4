export class Turno {
   
    pacienteId: string;
    especialistaId: string;
    especialidad: string;
    dia:string;
    horario:string;
  
    constructor(pacienteId: string, especialistaId: string, especialidad:string, dia:string, horario:string) {
      this.pacienteId = pacienteId;
      this.especialistaId = especialistaId;
      this.especialidad = especialidad;
      this.dia = dia;
      this.horario = horario;


    }

    toJSON() {
      return {
        pacienteId: this.pacienteId,
        especialistaId: this.especialistaId,
        especialidad: this.especialidad,
        dia: this.dia,
        horario: this.horario,
        estado: "solicitado"
      };
    }

}