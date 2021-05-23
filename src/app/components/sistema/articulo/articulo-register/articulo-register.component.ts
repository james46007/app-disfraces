import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticuloService } from 'src/app/services/articulo.service';
import { UserService } from 'src/app/services/user.service';

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
  private token;

  constructor(
    private _userService: UserService,
    private _articuloService: ArticuloService,
    private _router: Router,    
  ) { 
    this.page_title = 'Articulo';
    this.articulo = new Article(0,'','',0);
    this.message = '';
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._articuloService.register(this.articulo, this.token).subscribe(
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
