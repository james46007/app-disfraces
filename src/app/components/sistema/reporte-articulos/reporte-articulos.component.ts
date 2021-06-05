import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
import { InventarioService } from 'src/app/services/inventario.service';
import { DisfrazService } from 'src/app/services/disfraz.service';


@Component({
  selector: 'app-reporte-articulos',
  templateUrl: './reporte-articulos.component.html',
  styleUrls: ['../usuario/usuarios/usuarios.component.css'],
  providers:[InventarioService, DisfrazService]
})
export class ReporteArticulosComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public page_title;
  public articulosAlquiler: [];
  public articulos: Object[];
  public desde;
  public hasta;
  public seleccionado = 0;
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
    private _disfrazService: DisfrazService,
    private _inventarioService: InventarioService
  ) { 
    this.page_title = 'Reporte articulos rango de fecha';
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
    this.getArticulos()
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

  getArticulos(){
    // console.log('holaa');
    this._disfrazService.getArticulos().subscribe(
      response => {
        // console.log(response)
        // if(response.status == 'success'){          
          this.articulos = response;
          this.articulos.unshift({id:0,name:"Todos"})
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    if(this.seleccionado == 0){
      this._inventarioService.getReporteArticulosFechas(this.desde.replace('-','').replace('-',''),this.hasta.replace('-','').replace('-','')).subscribe(
        response => {
          console.log(response)
          this.articulosAlquiler = response.data;
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
    }else{
      this._inventarioService.getReporteArticuloFechas(this.desde.replace('-','').replace('-',''),this.hasta.replace('-','').replace('-',''), this.seleccionado).subscribe(
        response => {
          console.log(response)
          this.articulosAlquiler = response.data;
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
  }
}
