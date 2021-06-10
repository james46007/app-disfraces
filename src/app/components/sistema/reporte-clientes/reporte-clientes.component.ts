import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['../usuario/usuarios/usuarios.component.css'],
  providers: [InventarioService]
})
export class ReporteClientesComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public page_title;
  public clientesAlquiler: [];
  public desde;
  public hasta;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();

  public fechaMaxima = new Date().getFullYear().toString() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2).toString() + "-" + ("0" + (new Date().getDate())).slice(-2).toString();
  public fechaActual = new Date().getFullYear().toString() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2).toString() + "-" + ("0" + (new Date().getDate())).slice(-2).toString();

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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  onSubmit(form){
    console.log(this.desde.replace('-',''))
    this._inventarioService.getReporteClienteFechas(this.desde.replace('-','').replace('-',''),this.hasta.replace('-','').replace('-','')).subscribe(
      response => {
        this.clientesAlquiler = response.data;
        if(response.code == 200){
          this._service.success('Exito', response.message);
          this.rerender()
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  limiteFecha(){
    this.fechaMaxima = this.hasta;
  }

}
