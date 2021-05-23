import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../usuarios/usuarios.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User = {
    id: null,
    name: null,
    surname: null,
    email: null,
    password: null,
  };
  public roles: [];
  public seleccionItems: string[];

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
    this.page_title = 'Registrar usuario';
    this.user = new User(1, '', '', '', '');
  }

  ngOnInit(): void {
    // this.getRoles();
    this.seleccionItems = new Array<string>();
  }

  onSubmit(form) {
    this._userService.validarEmail(this.user.email).subscribe(
      response => {
        if (response.mx_found && response.format_valid && response.smtp_check) {
          this.user.roles = this.seleccionItems;
          delete this.user.roles
          this._userService.register(this.user).subscribe(
            response => {
              if (response.code === 200) {
                form.reset();
                this._service.success('Exito', response.message);
              } else {
                this._service.alert('Exito', response.message);
              }
            },
            error => {
              this._service.error('Error', error.error.message);
            }
          );
        } else {
          this._service.alert('alerta', 'Email no existe');
        }
      }
    );
  }

  getRoles() {
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

  getRolId(e: any, id: string) {
    if (e.target.checked) {
      this.seleccionItems.push(id);
    } else {
      this.seleccionItems = this.seleccionItems.filter(m => m != id);
    }
  }



}
