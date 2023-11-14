import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import Swal from'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  @Output() captchaStatusChange = new EventEmitter<string>();

  captcha: string = "";
  captchaIngresado: string = "";

  constructor(private router:Router){}

  ngOnInit(): void {
      this.mostrarSweetAlert();
  }

  generarCaptcha() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return captcha;
  }

  mostrarSweetAlert() {
    this.captcha = this.generarCaptcha();
    const content = document.createElement('div');
    content.innerHTML = `
      <p style="text-decoration: line-through; color:#84b705; font-size: 30px">${this.captcha}</p>
      <input class="form-control" id="captchaInput" placeholder="Ingrese el captcha">`;

    Swal.fire({
      title: "Captcha",
      html: content,
      confirmButtonText: 'Verificar',
      confirmButtonColor: '#caff42', // Cambia el color del botón de confirmación
      preConfirm: () => {
        return this.verificarCaptcha();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/home');
      } else if (result.isDismissed) {
        // Hacer algo si se cancela, por ejemplo, mostrar un mensaje de cancelación
      }
    });
  }

  verificarCaptcha(): boolean {
    const captchaInput = document.getElementById('captchaInput') as HTMLInputElement;
    if (captchaInput.value == this.captcha) {
      this.captchaStatusChange.emit('valido');
      return true;
    } else {
      Swal.showValidationMessage('Captcha inválido');
      this.captchaStatusChange.emit('invalido');
      return false;
    }
  }
}
