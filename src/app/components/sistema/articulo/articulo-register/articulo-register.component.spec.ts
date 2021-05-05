import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloRegisterComponent } from './articulo-register.component';

describe('ArticuloRegisterComponent', () => {
  let component: ArticuloRegisterComponent;
  let fixture: ComponentFixture<ArticuloRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
