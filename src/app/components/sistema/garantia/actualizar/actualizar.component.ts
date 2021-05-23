import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Garantia } from 'src/app/models/garantia';
import { InventarioService } from 'src/app/services/inventario.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [InventarioService]
})
export class ActualizarComponent implements OnInit {

  public garantia_id;
  public garantia: Garantia;
  public page_title;

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
    private _route: ActivatedRoute,
    private _inventarioService: InventarioService,
    private _router: Router,
  ) {
    this.garantia = new Garantia(0,'');
    this.page_title = 'Actualizar garantia';
   }

   ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.garantia_id = +params['id'];
      this.getGarantia(this.garantia_id);
    });
  }

  getGarantia(id){
    // console.log(id)
    this._inventarioService.getGarantiaId(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          // this.articulo = response.articulo[0];
          // console.log(response)
          this.garantia = response.data;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    this._inventarioService.actualizarGarantia(this.garantia, this._userService.getToken()).subscribe(
      response => {        
        if(response.code == 200){
          this._service.success('Éxito', response.message);     
          this._router.navigate(['garantias']);
        }else{
          // this.message = response.message;
          this._service.alert('Alerta', response.message);          
        }
      },
      error => {
        console.log(error)
      }
    );
  }

}
