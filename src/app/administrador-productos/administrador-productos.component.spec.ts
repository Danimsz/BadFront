import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorProductosComponent } from './administrador-productos.component';

describe('AdministradorProductosComponent', () => {
  let component: AdministradorProductosComponent;
  let fixture: ComponentFixture<AdministradorProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministradorProductosComponent]
    });
    fixture = TestBed.createComponent(AdministradorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
