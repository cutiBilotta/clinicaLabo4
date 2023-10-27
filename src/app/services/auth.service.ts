import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth, private firestore: AngularFirestore) { }



  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en register: ", err);
      return null;
    }
  }


  async login(email: string, password: string) {
    try {
      const userCredential = await this.afauth.signInWithEmailAndPassword(email, password);
  
      if (!userCredential.user) {
        return null; 
      }

      const user = userCredential.user;
      const fechaIngreso = new Date();
      await this.firestore.collection('users').doc(user.uid).set({ fechaIngreso }, { merge: true });
  
      return user;
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  getUserLogged() {
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