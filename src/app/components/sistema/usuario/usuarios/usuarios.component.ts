import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [ UserService]
})
export class UsuariosComponent implements OnInit {

  public title: string;
  public usuarios;
  public roles;

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
  ) { 
    this.title = 'Usuarios';
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.getRoles();
  }

  getUsuarios(){
    this._userService.getUsuarios().subscribe(
      response => {
        // if(response.status == 'success'){          
          this.usuarios = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  getRoles(){
    this._userService.getRoles().subscribe(
      response => {
        // if(response.status == 'success'){
          this.roles = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  getRolesUsuario(){
    this._userService.getRolesUsuario(3).subscribe(
      response => {
        // this.roles = response;

        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUsuario(id){
    this._userService.deleteUsuario(id).subscribe(
      response => {
        if(response.code){
          this.getUsuarios();
          this._service.success('Exito', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
