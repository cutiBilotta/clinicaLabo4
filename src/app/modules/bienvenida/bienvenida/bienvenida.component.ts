import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent {

  constructor(private router:Router){}

  ruteoSeccionUsuarios(){

    this.router.navigateByUrl('/seccion-usuarios');
  }

}
