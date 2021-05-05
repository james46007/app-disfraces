import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [UserService]
})
export class RolesComponent implements OnInit {

  public nuevoRol: string;
  public roles: [];
  public message: string;
  public status: string;
  public title: string;

  constructor(
    private _userService: UserService,
  ) { 
    this.title = 'Roles'
  }

  ngOnInit(): void {
    this.getrolesTotal();
  }

  getrolesTotal(){
    this._userService.getRoles().subscribe(
      response => {    
          this.roles = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarRol(){
    this._userService.agregarRol(this.nuevoRol).subscribe(
      response => {
        console.log(response)
        if(response.status == 'error'){
          this.message = response.message;
          this.status = response.status;
        }else{
          this.getrolesTotal();
          this.nuevoRol = '';
          this.message = response.message;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteRol(rolId){
    this._userService.borrarRol(rolId).subscribe(
      response => {
        this.getrolesTotal();
      },
      error => {
        console.log(error);
      }
    );
  }

}
