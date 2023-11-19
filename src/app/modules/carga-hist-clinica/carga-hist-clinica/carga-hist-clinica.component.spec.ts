import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaHistClinicaComponent } from './carga-hist-clinica.component';

describe('CargaHistClinicaComponent', () => {
  let component: CargaHistClinicaComponent;
  let fixture: ComponentFixture<CargaHistClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargaHistClinicaComponent]
    });
    fixture = TestBed.createComponent(CargaHistClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
