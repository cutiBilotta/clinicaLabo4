import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionUsuariosComponent } from './informacion-usuarios.component';

describe('InformacionUsuariosComponent', () => {
  let component: InformacionUsuariosComponent;
  let fixture: ComponentFixture<InformacionUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionUsuariosComponent]
    });
    fixture = TestBed.createComponent(InformacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
