import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteArticulosComponent } from './reporte-articulos.component';

describe('ReporteArticulosComponent', () => {
  let component: ReporteArticulosComponent;
  let fixture: ComponentFixture<ReporteArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
