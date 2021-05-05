import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUsuarioComponent } from './roles-usuario.component';

describe('RolesUsuarioComponent', () => {
  let component: RolesUsuarioComponent;
  let fixture: ComponentFixture<RolesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
