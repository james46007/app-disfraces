import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  providers: [ArticuloService]
})
export class ArticulosComponent implements OnInit {

  public page_title: string;
  public articulos: Array<Article>;
  public status: string;
  public status2: string;
  public message: string;
  public message2: string;
  public articulo: Article;

  constructor(
    private _articuloService: ArticuloService,
  ) { 
    this.page_title = 'Articulos';
    this.articulo = new Article(null,null,null,null);
    this.message = '';
    this.message2 = '';
  }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos(){
    this.message = '';
    this.message2 = '';
    this._articuloService.getArticulos().subscribe(
      response => {
        // if(response.status == 'success'){          
          this.articulos = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteArticulo(id){
    this.message = '';
    this._articuloService.deleteArticulo(id).subscribe(
      response => {
        this.getArticulos();
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    this._articuloService.register(this.articulo).subscribe(
      response => {
        console.log(response);
        form.reset();
        this.status = 'success';    
        this.getArticulos();
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;        
      }      
    );      
  }

}
