import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../usuarios/usuarios.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public message: string;
  public roles: [];
  public seleccionItems: string[];


  constructor(
    private _userService: UserService,
  ) {
    this.page_title = 'Registrar usuario';
    this.user = new User(1, '', '', '', '', []);
  }

  ngOnInit(): void {
    this.getRoles();
    this.seleccionItems = new Array<string>();
  }

  onSubmit(form) {
    this._userService.validarEmail(this.user.email).subscribe(
      response => {
        if (response.mx_found && response.format_valid) {
          this.user.roles = this.seleccionItems;
          this._userService.register(this.user).subscribe(
            response => {
              console.log(response);
              form.reset();
              this.status = 'success';
            },
            error => {
              // console.log(<any>error);
              this.status = 'error';
              this.message = error.error.message;
            }
          );
        } else {
          this.status = 'error';
          this.message = 'Email no existe';
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
