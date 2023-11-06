import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Usuario } from '../classes/usuario';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

    public usuarios: Usuario[] = [];
    public especialidades: any[] = [];
    public turnos: any[] = [];
    public prestadores: any[] = [];
  
    constructor(private firestore: AngularFirestore) {
      // Inicializa los arrays utilizando el método obtenerTodos
      this.inicializarArray("usuarios", this.usuarios);
      this.inicializarArray("especialidades", this.especialidades);
      this.inicializarArray("turnos", this.turnos);
      this.inicializarArray("prestadores", this.prestadores);
    }
  
    // Método para inicializar un array utilizando obtenerTodos
    private inicializarArray(coleccion: string, array: any[]) {
      
      this.obtenerTodos(coleccion).subscribe((dataRef) => {
        array = dataRef.map(itemRef => {
          let item: any = itemRef.payload.doc.data();
          item['id'] = itemRef.payload.doc.id;

          return item;
        });
        console.log(this.turnos);

      });

    }



  //Crea un nuevo dato   
  public crear(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  public obtenerPorId(coleccion: string, id: string) {
    return this.firestore.collection(coleccion).doc(id).snapshotChanges();
    // El documento que tenga ese id tal cual este ahora, le saca una foto y me lo devuelve
  }

  public obtenerTodos(coleccion: string) {
    return this.firestore.collection(coleccion).snapshotChanges();
  }

  public actualizar(coleccion: string, data: any, id: string) {
    return this.firestore.collection(coleccion).doc(id).set(data);
  }

  public eliminar(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }

  public createWithCustomId(collection: string, customId: string, data: any) {
    this.firestore.collection(collection).doc(customId).set(data);
  }

}
