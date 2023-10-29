import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-envio-mail-verificacion',
  templateUrl: './envio-mail-verificacion.component.html',
  styleUrls: ['./envio-mail-verificacion.component.scss']
})
export class EnvioMailVerificacionComponent {

  constructor(private authService: AuthService) {}

  reenviarEmail(): void {
    this.authService.sendVerificationEmail();
  }
}
