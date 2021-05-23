import { Component, OnInit } from '@angular/core';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categorias-add',
  templateUrl: './categorias-add.component.html',
  styleUrls: ['./categorias-add.component.css'],
  providers: [DisfrazService]
})
export class CategoriasAddComponent implements OnInit {

  public page_title: string;
  public categorias: [];
  public url: string;
  public disfrazId;
  public categoriasTotal: [];
  public categoriaID;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  }

  constructor(
    private _userService: UserService,
    private _service: NotificationsService,
    private _disfrazService: DisfrazService,
    private _route: ActivatedRoute,
  ) { 
    this.page_title = 'Disfraz Categorias';
    // this.categorias = new Category(0,'');
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
    if(this.categoriaID === undefined){
      this._service.alert('Alerta', 'Seleccione una categoria.');
      return;
    }
    this._disfrazService.addCategoria(this.disfrazId,this.categoriaID).subscribe(
      response => {
        if(response.code == 200){
          this._service.success('Éxito', response.message);
          this.CategoriaDisfraz();
        }else{
          this._service.alert('Alerta', response.message);
        }
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
        if(response.code == 200){
          this._service.success('Éxito', response.message);
          this.CategoriaDisfraz();
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
