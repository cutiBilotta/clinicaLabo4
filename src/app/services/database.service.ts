import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Usuario } from '../classes/usuario';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  
  
    public usuarios: Usuario[] = [];

  constructor(private firestore: AngularFirestore) {
    this.obtenerTodos("usuarios").subscribe((usuariosRef) => {
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;
        return usuario;
      });
    
   }
  )};



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
