import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionCompraComponent } from './confirmacion-compra.component';

describe('ConfirmacionCompraComponent', () => {
  let component: ConfirmacionCompraComponent;
  let fixture: ComponentFixture<ConfirmacionCompraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionCompraComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
