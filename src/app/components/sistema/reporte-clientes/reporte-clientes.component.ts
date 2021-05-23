import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
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
  public clientesAlquiler: [];
  public desde;
  public hasta;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  }

  constructor(
    private _service: NotificationsService,
    private _inventarioService: InventarioService
  ) { 
    this.page_title = 'Reporte clientes rango de fecha';
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
        if(response.code == 200){
          this._service.success('Exito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
