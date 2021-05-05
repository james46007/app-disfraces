import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosAddComponent } from './articulos-add.component';

describe('ArticulosAddComponent', () => {
  let component: ArticulosAddComponent;
  let fixture: ComponentFixture<ArticulosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
