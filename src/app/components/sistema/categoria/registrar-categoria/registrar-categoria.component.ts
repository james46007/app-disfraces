import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.css'],
  providers: [CategoryService]
})
export class RegistrarCategoriaComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public status: string;
  public message: string;

  constructor(
    private _categoriaService: CategoryService,
    private _router: Router,
  ) { 
    this.page_title = 'Categorias';
    this.category = new Category(0,'');
    this.message = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._categoriaService.register(this.category).subscribe(
      response => {
        console.log(response);
        form.reset();
        this.status = 'success';    
        this._router.navigate(['categorias']);
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;        
      }      
    );      
  }

}
