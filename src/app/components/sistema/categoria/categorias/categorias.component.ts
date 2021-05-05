import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [CategoryService]
})
export class CategoriasComponent implements OnInit {

  public page_title: string;
  public categorias: [];
  public status: string;
  public message: string;
  public category: Category;

  constructor(
    private _categoriaService: CategoryService,
  ) { 
    this.page_title = 'Categorias';
    this.category = new Category(0,'');
    this.message = '';
  }

  ngOnInit(): void {
    this.getCategorias();    
  }

  getCategorias(){
    this._categoriaService.getCategorias().subscribe(
      response => {
        // if(response.status == 'success'){          
          this.categorias = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCategoria(id){
    this._categoriaService.deleteCategoria(id).subscribe(
      response => {
        // this.roles = response;
        this.getCategorias();
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    this._categoriaService.register(this.category).subscribe(
      response => {
        console.log(response);
        form.reset();
        this.status = 'success';    
        this.getCategorias();
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;        
      }      
    );      
  }

}


