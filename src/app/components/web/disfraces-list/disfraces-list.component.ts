import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-disfraces-list',
  templateUrl: './disfraces-list.component.html',
  styleUrls: ['./disfraces-list.component.css'],
  providers: [CategoryService]
})
export class DisfracesListComponent implements OnInit {

  public categoria_id;
  public disfraces;
  public categoria;
  public url: string;
  public articulos;
  public noImage = './assets/images/no-disponible.png';

  constructor(
    private _route: ActivatedRoute,
    private _categoriaService: CategoryService,
    private _disfrazService: DisfrazService,
    private _router: Router,
  ) {
    this.url = global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.categoria_id = +params['categoriaId'];
      this.disfracesCategoria(this.categoria_id);
    });
  }

  disfracesCategoria(id){
    this._categoriaService.getDisfracesCategoria(id).subscribe(
      response => {
        this.disfraces = response.disfraces;
        this.categoria = response.categoria[0].name;
      },
      error => {
        console.log(error)
      }
    );
  }

  prueba(id){
    this._disfrazService.getArticuloDisfraz(id).subscribe(
      response => {
        this.articulos = response.categorias        
      },
      error => {
        console.log(error)
      }
    );
  }

}
