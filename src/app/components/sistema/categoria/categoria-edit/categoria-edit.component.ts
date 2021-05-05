import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['../categorias/categorias.component.css'],
  providers: [CategoryService]
})
export class CategoriaEditComponent implements OnInit {

  public categoria_id;
  public categoria: Category;
  public message;
  public status;
  public page_title;

  constructor(
    private _route: ActivatedRoute,
    private _categoriaService: CategoryService,
    private _router: Router,
  ) {
    this.categoria = new Category(0,'');
    this.page_title = 'Actualizar categoria';
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.categoria_id = +params['id'];
      this.getCategoria(this.categoria_id);
    });
  }

  getCategoria(id){
    this._categoriaService.getCategoria(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          this.categoria = response.categoria[0];
          console.log(response.categoria)
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    this._categoriaService.update(this.categoria).subscribe(
      response => {
        console.log(response)
        if(response.status == 'success'){
          this._router.navigate(['categorias']);
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
