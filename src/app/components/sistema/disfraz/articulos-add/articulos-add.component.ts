import { Component, OnInit } from '@angular/core';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-articulos-add',
  templateUrl: './articulos-add.component.html',
  styleUrls: ['./articulos-add.component.css'],
  providers: [DisfrazService]
})
export class ArticulosAddComponent implements OnInit {

  public page_title: string;
  public articulos: [];
  public status: string;
  public message: string;
  public url: string;
  public disfrazId;
  public articulosTotal: [];
  public articuloID;

  constructor(
    private _disfrazService: DisfrazService,
    private _route: ActivatedRoute,
  ) { 
    this.page_title = 'Disfraz articulos';
    // this.categorias = new Category(0,'');
    this.message = '';
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.disfrazId = params['id'];
      this.ArticuloDisfraz();
      this.ArticuloTotal();
    });    
  }

  ArticuloTotal(){
    // console.log('holaa');
    this._disfrazService.getArticulos().subscribe(
      response => {
        // console.log(response)
        // if(response.status == 'success'){          
          this.articulosTotal = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  ArticuloDisfraz(){
    this._disfrazService.getArticuloDisfraz(this.disfrazId).subscribe(
      response => {
        // console.log(response)
        // if(response.status == 'success'){          
          this.articulos = response.categorias;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarCategoria(){
    // console.log(this.categoriaID)
    this._disfrazService.addArticulo(this.disfrazId,this.articuloID).subscribe(
      response => {
        // console.log(response)
        if(response.status == 'success'){          
          // this.categoriasTotal = response;
          this.ArticuloDisfraz();
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

  deleteCategoriaDisfraz(id){
    this._disfrazService.deleteArticuloDisfraz(this.disfrazId,id).subscribe(
      response => {
        // this.roles = response;
        this.ArticuloDisfraz();
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
