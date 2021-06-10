import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Iva } from 'src/app/models/iva';
import { InventarioService } from 'src/app/services/inventario.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-iva-list',
  templateUrl: './iva-list.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [InventarioService]
})
export class IvaListComponent implements OnInit {

  public title;
  public newIva: Iva;
  public ivas: [];

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
    this.title = 'Iva';
    this.newIva = new Iva(0, null);
  }

  ngOnInit(): void {
    this.getIvas();
  }

  getIvas() {
    this._inventarioService.getIvas().subscribe(
      response => {
        this.ivas = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarIva() {
    if(!Number.isInteger(this.newIva.iva)){
      this._service.alert('Alerta', 'Ingrese un numero entero');
      return;
    }
    if(this.newIva.iva == 0){
      this._service.alert('Alerta', 'No puede ingrese cero');
      return;
    }
    this._inventarioService.setIva(this.newIva, this._userService.getToken()).subscribe(
      response => {
        if (response.code == 200) {
          this._service.success('Éxito', response.message);
          this.newIva = new Iva(0, null);
          this.getIvas();
        } else {
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  activarIva(idIva) {
    this._inventarioService.setIvas(idIva, this._userService.getToken()).subscribe(
      response => {
        // this.ivas = response;
        if(response.code == 200){
          this.getIvas();
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
