import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-roles-usuario',
  templateUrl: './roles-usuario.component.html',
  styleUrls: ['./roles-usuario.component.css']
})
export class RolesUsuarioComponent implements OnInit {

  public page_title: string;
  public url: string;
  public rolesUsuario: [];
  public rolUsuarioId;
  public rolesTotal: [];
  public usuarioID;
  public rolID;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  }

  constructor(
    private _usuarioService: UserService,
    private _service: NotificationsService,
    private _route: ActivatedRoute,
  ) {
    this.page_title = 'Roles usuario';
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.usuarioID = params['usuario'];
      this.getRolesUsuario();
      this.getrolesTotal();
    });
  }

  getrolesTotal() {
    this._usuarioService.getRoles().subscribe(
      response => {
        this.rolesTotal = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getRolesUsuario() {
    this._usuarioService.getRolesUsuario(this.usuarioID).subscribe(
      response => {
        this.rolesUsuario = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarRol() {
    if(this.rolID === undefined){
      this._service.alert('Alerta', 'Seleccione un rol');
      return
    }
    this._usuarioService.addRol(this.usuarioID, this.rolID).subscribe(
      response => {
        if (response.code == 200) {
          this._service.success('Éxito', response.message);
          this.getRolesUsuario();
        } else {
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);

      }
    );
  }

  deleteCategoriaDisfraz(id) {
    this._usuarioService.deleteRolUsuario(this.usuarioID, id).subscribe(
      response => {
        if (response.code == 200) {
          this._service.success('Éxito', response.message);
          this.getRolesUsuario();
        } else {
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
