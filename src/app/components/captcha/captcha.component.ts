import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  @Output() captchaStatusChange = new EventEmitter<string>();
  captcha: string = "";
  imagenUrl: any;
  nombreImagen: any;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    // Obtener una imagen aleatoria y su nombre desde Firebase Storage
    this.storageService.obtenerImagenRandomEnCarpeta("captchas").then((url) => {
      this.imagenUrl = url;

      // Extraer el nombre del archivo (sin la extensión .png)
      this.nombreImagen = this.obtenerNombreImagenSinExtension(this.imagenUrl);

      // Mostrar el SweetAlert después de obtener la imagen
      this.mostrarSweetAlert();
    });
  }

  obtenerNombreImagenSinExtension(url: string): string {
    // Obtener el nombre del archivo de la URL
    const partesUrl = url.split("/");
  
    // Obtener el último fragmento de la URL (nombre del archivo)
    let nombreArchivoConExtension = partesUrl[partesUrl.length - 1];
  
    // Decodificar la parte del nombre que está codificada
    nombreArchivoConExtension = decodeURIComponent(nombreArchivoConExtension);
  
    // Eliminar la extensión .png y cualquier parámetro adicional
    const nombreSinExtension = nombreArchivoConExtension.split(".")[0];
  
    // Eliminar el nombre de la carpeta 'captchas/'
    const nombreSinCarpeta = nombreSinExtension.replace('captchas/', '');
  
    return nombreSinCarpeta;
  }
  mostrarSweetAlert() {
    const content = document.createElement('div');
    content.innerHTML = `
      <img src="${this.imagenUrl}" alt="Captcha Image" style="width: 100%; max-width: 300px;">
      <input class="form-control" id="captchaInput" placeholder="Ingrese el captcha">
    `;

    Swal.fire({
      title: "Verifique Captcha",
      html: content,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#caff42',
      allowOutsideClick: false, 
      preConfirm: () => {
        return this.verificarCaptcha();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Turno otorgado exitosamente",
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#caff42'
        });

        this.router.navigateByUrl('/home');
      } else if (result.isDismissed) {
        // Hacer algo si se cancela
      }
    });
  }

  verificarCaptcha(): boolean {
    const captchaInput = document.getElementById('captchaInput') as HTMLInputElement;
    console.log(this.nombreImagen);
    if (captchaInput.value === this.nombreImagen) {
      this.captchaStatusChange.emit('valido');
      return true;
    } else {
      Swal.showValidationMessage('Captcha inválido');
      this.captchaStatusChange.emit('invalido');
      return false;
    }
  }
}