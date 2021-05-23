import { Component, OnInit } from '@angular/core';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-articulos-add',
  templateUrl: './articulos-add.component.html',
  styleUrls: ['./articulos-add.component.css'],
  providers: [DisfrazService]
})
export class ArticulosAddComponent implements OnInit {

  public page_title: string;
  public articulos: [];
  public url: string;
  public disfrazId;
  public articulosTotal: [];
  public articuloID;

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
    this.page_title = 'Disfraz articulos';
    // this.categorias = new Category(0,'');
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
    if(this.articuloID === undefined){
      this._service.alert('Alerta', 'Seleccione una articulo.');
      return;
    }
    this._disfrazService.addArticulo(this.disfrazId,this.articuloID).subscribe(
      response => {
        if(response.code == 200){
          this.ArticuloDisfraz();
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
        
      }
    );
  }

  deleteArticuloDisfraz(id){
    this._disfrazService.deleteArticuloDisfraz(this.disfrazId,id).subscribe(
      response => {
        // this.roles = response;
        if(response.code == 200){
          this.ArticuloDisfraz();
          this._service.success('Éxito', response.message);
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
