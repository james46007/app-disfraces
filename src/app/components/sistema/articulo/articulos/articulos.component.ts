import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { Article } from 'src/app/models/article';
import { ArticuloService } from 'src/app/services/articulo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  providers: [ArticuloService]
})
export class ArticulosComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();

  public page_title: string;
  public articulos: Array<Article>;
  public articulo: Article;
  private token;

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
    private _userService: UserService,
    private _articuloService: ArticuloService,
  ) { 
    this.page_title = 'Articulos';
    this.articulo = new Article(null,null,null,null);
    this.token = this._userService.getToken();
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
        // if(response.status == 'success'){          
          this.articulos = response;
          this.rerender()
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteArticulo(id){
    this._articuloService.deleteArticulo(id, this._userService.getToken()).subscribe(
      response => {
        if(response.code == 200){
          this.getArticulos();
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    if(this.articulo.price == 0){
      this._service.alert('Alerta', "La precio no puede ser menor a cero");
      return
    }

    this._articuloService.register(this.articulo, this.token).subscribe(
      response => {        
        if(response.code == 200){
          this._service.success('Éxito', response.message);
          form.reset();  
          this.getArticulos();
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(<any>error);      
      }      
    );      
  }

}
