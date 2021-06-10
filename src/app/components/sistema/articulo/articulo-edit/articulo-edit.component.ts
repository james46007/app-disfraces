import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Article } from 'src/app/models/article';
import { ArticuloService } from 'src/app/services/articulo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articulo-edit',
  templateUrl: './articulo-edit.component.html',
  styleUrls: ['./articulo-edit.component.css'],
  providers: [ ArticuloService]
})
export class ArticuloEditComponent implements OnInit {

  public articulo_id;
  public articulo: Article;
  public status;
  public page_title;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  }

  constructor(
    private _userService: UserService,
    private _service: NotificationsService,
    private _route: ActivatedRoute,
    private _articuloService: ArticuloService,
    private _router: Router,
  ) {
    this.articulo = new Article(0,'','',0);
    this.page_title = 'Actualizar articulo';
   }

   ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.articulo_id = +params['id'];
      this.getArticulo(this.articulo_id);
    });
  }

  getArticulo(id){
    this._articuloService.getArticulo(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          // this.articulo = response.articulo[0];
          this.articulo = response.data;
        // }
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
    this._articuloService.update(this.articulo, this._userService.getToken()).subscribe(
      response => {
        if(response.code == 200){
          this._service.success('Éxito', response.message);     
          this._router.navigate(['articulos']);
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
