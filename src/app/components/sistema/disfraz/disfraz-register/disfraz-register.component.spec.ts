import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisfrazRegisterComponent } from './disfraz-register.component';

describe('DisfrazRegisterComponent', () => {
  let component: DisfrazRegisterComponent;
  let fixture: ComponentFixture<DisfrazRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisfrazRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisfrazRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
