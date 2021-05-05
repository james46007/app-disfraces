import { Component, OnInit } from '@angular/core';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorias-add',
  templateUrl: './categorias-add.component.html',
  styleUrls: ['./categorias-add.component.css'],
  providers: [DisfrazService]
})
export class CategoriasAddComponent implements OnInit {

  public page_title: string;
  public categorias: [];
  public status: string;
  public message: string;
  public url: string;
  public disfrazId;
  public categoriasTotal: [];
  public categoriaID;

  constructor(
    private _disfrazService: DisfrazService,
    private _route: ActivatedRoute,
  ) { 
    this.page_title = 'Disfraz Categorias';
    // this.categorias = new Category(0,'');
    this.message = '';
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.disfrazId = params['id'];
      this.CategoriaDisfraz();
      this.CategoriaTotal();
    });    
  }

  agregarCategoria(){
    // console.log(this.categoriaID)
    this._disfrazService.addCategoria(this.disfrazId,this.categoriaID).subscribe(
      response => {
        // console.log(response)
        if(response.status == 'success'){          
          // this.categoriasTotal = response;
          this.CategoriaDisfraz();
          this.status = response.status;
        }else{
          this.status = response.status;          
        }
        this.message = response.message;
      },
      error => {
        console.log(error);
        
      }
    );
  }

  CategoriaTotal(){
    // console.log('holaa');
    this._disfrazService.getCategorias().subscribe(
      response => {
        // console.log(response)
        // if(response.status == 'success'){          
          this.categoriasTotal = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  CategoriaDisfraz(){
    this._disfrazService.getCategoriaDisfraz(this.disfrazId).subscribe(
      response => {
        // console.log(response)
        // if(response.status == 'success'){          
          this.categorias = response.categorias;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCategoriaDisfraz(id){
    this._disfrazService.deleteCategoriaDisfraz(this.disfrazId,id).subscribe(
      response => {
        // this.roles = response;
        this.CategoriaDisfraz();
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
