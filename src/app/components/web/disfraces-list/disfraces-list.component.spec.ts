import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisfracesListComponent } from './disfraces-list.component';

describe('DisfracesListComponent', () => {
  let component: DisfracesListComponent;
  let fixture: ComponentFixture<DisfracesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisfracesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisfracesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
