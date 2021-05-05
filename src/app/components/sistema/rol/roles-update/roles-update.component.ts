import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-roles-update',
  templateUrl: './roles-update.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [UserService]
})
export class RolesUpdateComponent implements OnInit {

  public rol_id;
  public rol: Rol;
  public message;
  public status;
  public page_title;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router,
  ) {
    this.rol = new Rol(0,'');
    this.page_title = 'Actualizar rol';
   }

   ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.rol_id = +params['id'];
      this.getRol(this.rol_id);
    });
  }

  getRol(id){
    // console.log(id)
    this._userService.getRol(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          // this.articulo = response.articulo[0];
          this.rol = response.rol;
          // console.log(response.rol)
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    this._userService.updateRol(this.rol).subscribe(
      response => {
        // console.log(response)
        // if(response.status == 'success'){
          this._router.navigate(['roles']);
        // }else{
        //   this.message = response.message;
        //   this.status = 'error';
        // }
      },
      error => {
        this.message = error.error.message
        this.status = 'error';
      }
    );
  }

}
