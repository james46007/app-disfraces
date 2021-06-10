import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
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
  public roles: [];
  public token;
  public identity;
  public userId;

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
    this._userService.validarEmail(this.user.email).subscribe(
      response => {
        if (response.mx_found && response.format_valid && response.smtp_check) {
          this.user.name = this.user.name.toUpperCase();
          this.user.surname = this.user.surname.toUpperCase();
          // console.log(this.user)
          this._userService.update(this.token, this.user).subscribe(
            response => {
              if(response.code == 200){
                if(this.identity.sub == this.userId){
                  this.identity = this.user;
                  localStorage.setItem('identity', JSON.stringify(this.identity));
                }          
                this._router.navigate(['usuarios']);
                this._service.success('Éxito', response.message);
              }else{
                this._service.alert('Alerta', response.message);
              }
            },
            error => {
              console.log(<any>error);
            }
          );
        } else {
          this._service.alert('alerta', 'Email no existe');
        }
    });
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
