import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorDetallesproductoComponent } from './administrador-detallesproducto.component';

describe('AdministradorDetallesproductoComponent', () => {
  let component: AdministradorDetallesproductoComponent;
  let fixture: ComponentFixture<AdministradorDetallesproductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministradorDetallesproductoComponent]
    });
    fixture = TestBed.createComponent(AdministradorDetallesproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
