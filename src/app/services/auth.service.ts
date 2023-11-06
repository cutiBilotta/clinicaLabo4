import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth, private firestore: AngularFirestore) { }

  async sendVerificationEmail(): Promise<void> {
    const user = await this.afauth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        // El correo de verificación ha sido enviado con éxito
      } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante el envío del correo
        console.error("Error al enviar el correo de verificación:", error);
        
      }
    } else {
      throw new Error("El usuario actual es nulo.");
    }
  }

  async register(email: string, password: string) {
    try {
      const userCredential = await this.afauth.createUserWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        // Usuario registrado con éxito, enviar el correo de verificación
        await this.sendVerificationEmail(); // Llamada a la función sendVerificationEmail
        return userCredential; // Devuelve el userCredential
      } else {
        console.log("No se pudo obtener el usuario después del registro.");
        return null;
      }
    } catch (err) {
      console.log("Error en register: ", err);
      return null;
    }
  }


  async login(email: string, password: string) {
    try {
      const userCredential = await this.afauth.signInWithEmailAndPassword(email, password);
  
      if (!userCredential.user) {
        return null; 
      }
      //const user = userCredential.user;

      return userCredential;
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  getAuthState() {
    return this.afauth.authState;
  }



  logout() {
    this.afauth.signOut();
  }

  getUserEmail() {
    return this.afauth.authState.pipe(
      map((user) => (user ? user.email : null))
    );
  }

  getUserEmailByUID(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges().pipe(
      map((user: any) => (user ? user.email : null))
    );
  }

}