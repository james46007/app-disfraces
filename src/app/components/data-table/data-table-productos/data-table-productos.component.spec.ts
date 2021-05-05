import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableProductosComponent } from './data-table-productos.component';

describe('DataTableProductosComponent', () => {
  let component: DataTableProductosComponent;
  let fixture: ComponentFixture<DataTableProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
