import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { keyframes, state, style, trigger, transition, animate } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }), // Cambio aquí
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' })), // Cambio aquí
  ]),
]);

export const openCloseAnimation = trigger('openClose', [
  state('open', style({
    opacity: 1,
  })),
  state('closed', style({
    opacity: 0.8,
  })),
  transition('open => closed', [
    animate('1s', keyframes([
      style({ transform: 'scale(1) rotateX(0)', offset: 0 }), // Estado inicial
      style({ transform: 'scale(2.5) rotateX(-90deg)', offset: 1 }) // Final de la animación
    ]))
  ]),
  transition('closed => open', [
    animate('0.5s', keyframes([
      style({ transform: 'scale(1) rotateX(0)', offset: 0 }), // Estado inicial
      style({ transform: 'scale(2.5) rotateX(-90deg)', offset: 1 }) // Final de la animación
    ]))
  ]),
]);

const firebaseConfig = {
  apiKey: "AIzaSyDhMeOKg3NlfID1yZj0pWK3C0XIT-dM9gU",
  authDomain: "clinica-7cd94.firebaseapp.com",
  projectId: "clinica-7cd94",
  storageBucket: "clinica-7cd94.appspot.com",
  messagingSenderId: "112194966494",
  appId: "1:112194966494:web:8a8472354ee23bfb57034f"
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule,
    FormsModule,BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
