import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['../usuario/usuarios/usuarios.component.css'],
  providers: [InventarioService]
})
export class ReporteClientesComponent implements OnInit {

  public page_title;
  public message;
  public clientesAlquiler: [];
  public status;
  public desde;
  public hasta;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();

  constructor(
    private _inventarioService: InventarioService
  ) { 
    this.page_title = 'Reporte clientes rango de fecha';
    this.message = '';
    let f = new Date();
    this.desde = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      },
    };
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(this.desde.replace('-',''))
    this._inventarioService.getReporteClienteFechas(this.desde.replace('-','').replace('-',''),this.hasta.replace('-','').replace('-','')).subscribe(
      response => {
        this.clientesAlquiler = response.data;
        if(response.status == 'error'){
          this.status = response.status;
          this.message = response.message;
        }else{
          this.status = response.status;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
