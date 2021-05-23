import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Garantia } from 'src/app/models/garantia';
import { InventarioService } from 'src/app/services/inventario.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-estados',
  templateUrl: './garantias.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [ InventarioService ]
})
export class GarantiasComponent implements OnInit {

  public nuevoGarantia: Garantia;
  public garantias: [];
  public title: string;

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
    private _inventarioService: InventarioService,
  ) { 
    this.title = 'Garantias';
    this.nuevoGarantia = new Garantia(0,'');
  }

  ngOnInit(): void {
    this.getGarantiasTotal();
  }

  
  getGarantiasTotal(){
    this._inventarioService.getGarantias().subscribe(
      response => {    
          this.garantias = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarRol(){
    this._inventarioService.registrarEstado(this.nuevoGarantia, this._userService.getToken()).subscribe(
      response => {
        if(response.code == 200){
          // form.reset();
          // this.getCategorias();
          this.getGarantiasTotal();
          this.nuevoGarantia = new Garantia(null,null);
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

  deleteRol(rolId){
    this._inventarioService.deleteEstado(rolId, this._userService.getToken()).subscribe(
      response => {
        if(response.code == 200){
          this._service.success('Éxito', response.message);
          this.getGarantiasTotal();          
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
