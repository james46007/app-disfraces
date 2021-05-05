import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisfracesComponent } from './disfraces.component';

describe('DisfracesComponent', () => {
  let component: DisfracesComponent;
  let fixture: ComponentFixture<DisfracesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisfracesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisfracesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
