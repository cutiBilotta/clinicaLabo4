import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
