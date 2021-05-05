import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['../usuarios/usuarios.component.css'],
  providers: [UserService],
})
export class UsuarioEditComponent implements OnInit {

  public seleccionItems: string[];
  public page_title: string;
  public user: User;
  public status: string;
  public roles: [];
  public token;
  public identity;
  public userId;
  public message;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    this.page_title = 'Actualizar';
    this.user = new User(0,'','','','',[]);
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.userId = +params['usuario'];
      this.getUsuario(this.userId);
      this.getRoles();
    });
    this.seleccionItems = new Array<string>();
  }

  onSubmit(form) {
    this.user.name.toUpperCase();
    this.user.surname.toUpperCase();
    this._userService.update(this.token, this.user).subscribe(
      response => {
        
        if (response && response.status == 'success') {
          this.status = 'success';
          if(this.identity.sub == this.userId){
            this.identity = this.user;
            localStorage.setItem('identity', JSON.stringify(this.identity));
          }          
          console.log(response)
          this._router.navigate(['usuarios']);
        } else {
          this.status = 'error';
          this.message = response.message;
          console.log(response)
        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);
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

  getRolId(e:any,id:string){
    if(e.target.checked){
      this.seleccionItems.push(id);
    }else{
      this.seleccionItems = this.seleccionItems.filter(m=>m!=id);
    }
  }

  getUsuario(id){    
    this._userService.getUsuario(id).subscribe(
      response => {
        // if(response.status == 'success'){
          this.user = response.user;
          // this.roles = response.roles;
          // rellenar objeto usuario
          this.user = new User(
            response.user[0].id,
            response.user[0].name,
            response.user[0].surname,
            response.user[0].email,
            '',
            response.roles,
          );
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

}
