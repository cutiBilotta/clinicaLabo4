import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioMailVerificacionComponent } from './envio-mail-verificacion.component';

describe('EnvioMailVerificacionComponent', () => {
  let component: EnvioMailVerificacionComponent;
  let fixture: ComponentFixture<EnvioMailVerificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvioMailVerificacionComponent]
    });
    fixture = TestBed.createComponent(EnvioMailVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
