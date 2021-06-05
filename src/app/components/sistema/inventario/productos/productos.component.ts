import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Inventory } from 'src/app/models/inventory';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { Subject } from 'rxjs';
// import * as moment from 'moment';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [ DisfrazService, ArticuloService, InventarioService ]
})
export class ProductosComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  public page_title: string;
  public nuevoProducto: Inventory;
  public articulos: [];
  public disfraces: [];
  public inventario: [];

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
    private _articuloService: ArticuloService,
    private _inventarioService: InventarioService,
  ) { 
    this.page_title = 'Inventario'
    this.nuevoProducto = new Inventory(0,0,null,'AGREGAR',null,null,0,0,0,0,0,0,0,1);
    this.dtOptions = {
      searching: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      },
    };
  }

  ngOnInit(): void {
    this.getArticulos();
    this.getMomvimientoInventario();
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
    this._articuloService.getArticulos().subscribe(
      response => {       
          this.articulos = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getMomvimientoInventario(){
    this._inventarioService.getInventario().subscribe(
    // this._inventarioService.getMovimientoInventario().subscribe(
      response => {    
          this.inventario = response;
          this.rerender()
      },
      error => {
        console.log(error);
      }
    );
  }

  registrarProducto(form){
    let hoy = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    this.nuevoProducto.date = hoy;
    this._inventarioService.registrarProducto(this.nuevoProducto).subscribe(
      response => {    
          this.getMomvimientoInventario();
          form.resetForm();
          this._service.success('Exito', response.message);
          console.log(response)
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProducto(id){
    this._inventarioService.deleteProducto(id).subscribe(
      response => {
        this.getMomvimientoInventario();
      },
      error => {
        console.log(error);
      }
    );
  }

}
