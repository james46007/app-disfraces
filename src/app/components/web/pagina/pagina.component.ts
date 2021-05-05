import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css'],
  providers: [CategoryService]
})
export class PaginaComponent implements OnInit {

  public categorias;

  constructor(
    private _categoriaService: CategoryService,
  ) { 
    
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this._categoriaService.getCategorias().subscribe(
      response => {
        this.categorias = response
      },
      error => {
        console.log(error)
      }
    );
  }

  deletePost(id){

  }
  
}
