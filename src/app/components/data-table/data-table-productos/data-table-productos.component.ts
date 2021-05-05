import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-data-table-productos',
  templateUrl: './data-table-productos.component.html',
  styleUrls: ['./data-table-productos.component.css']
})
export class DataTableProductosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public inventario: [];

  constructor(
    private _inventarioService: InventarioService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this._inventarioService.getInventario().subscribe(
      response => {    
          this.inventario = response;
          this.dtTrigger.next();
      },
      error => {
        console.log(error);
      }
    );
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
