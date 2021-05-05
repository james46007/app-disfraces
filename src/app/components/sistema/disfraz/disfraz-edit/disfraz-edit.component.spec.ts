import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisfrazEditComponent } from './disfraz-edit.component';

describe('DisfrazEditComponent', () => {
  let component: DisfrazEditComponent;
  let fixture: ComponentFixture<DisfrazEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisfrazEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisfrazEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
