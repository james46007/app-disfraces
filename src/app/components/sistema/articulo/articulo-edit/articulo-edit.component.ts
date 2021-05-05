import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-articulo-edit',
  templateUrl: './articulo-edit.component.html',
  styleUrls: ['./articulo-edit.component.css'],
  providers: [ ArticuloService]
})
export class ArticuloEditComponent implements OnInit {

  public articulo_id;
  public articulo: Article;
  public message;
  public status;
  public page_title;

  constructor(
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
          this.articulo = response.articulo;
          console.log(response.articulo)
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    this._articuloService.update(this.articulo).subscribe(
      response => {
        console.log(response)
        if(response.status == 'success'){
          this._router.navigate(['articulos']);
        }else{
          this.message = response.message;
          this.status = 'error';
        }
      },
      error => {
        console.log(error);        
      }
    );
  }

}
