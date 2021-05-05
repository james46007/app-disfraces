import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-articulo-register',
  templateUrl: './articulo-register.component.html',
  styleUrls: ['./articulo-register.component.css'],
  providers: [ArticuloService]
})
export class ArticuloRegisterComponent implements OnInit {

  public page_title: string;
  public articulo: Article;
  public status: string;
  public message: string;

  constructor(
    private _articuloService: ArticuloService,
    private _router: Router,
  ) { 
    this.page_title = 'Articulo';
    this.articulo = new Article(0,'','',0);
    this.message = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._articuloService.register(this.articulo).subscribe(
      response => {
        console.log(response);
        form.reset();
        this.status = 'success';    
        this._router.navigate(['articulos']);
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;        
      }      
    );      
  }

}
