import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCategoriaComponent } from './registrar-categoria.component';

describe('RegistrarCategoriaComponent', () => {
  let component: RegistrarCategoriaComponent;
  let fixture: ComponentFixture<RegistrarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
