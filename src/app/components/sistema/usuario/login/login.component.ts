import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public identity: any;
  public token: any;
  public message: string;
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
    private _router: Router,
    private _route: ActivatedRoute,
  ) { 
    this.page_title = 'Iniciar sesion';
    this.user = new User(1,'','','','',[]);
    this.message = '';
  }

  ngOnInit(): void {

    //se ejecuta siempre y cierra sesion solo cuando llega el parametro por el url
    this.logout();
  }

  onSubmit(form) {
    // console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        // Token
        if (response.status != 'error') {
          // this.status = 'success';
          this.token = response;
          // OBJETO USUARIO IDENTIFICADO
          this._userService.signup(this.user,true).subscribe(
            response => {
              this.identity = response;
              // Persisto datos usuario identificado
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              // Rediccionar a inicio
              this._router.navigate(['administracion']);
              this._service.success('Error', response.message);
            },
            error => {
              // this.status = 'error';
              // console.log(<any>error);
            }
          );

        } else {
          // this.status = 'error';
          // this.message = response.message;
          this._service.error('Error', response.message);
        }
      },
      error => {
        // this.status = 'error';
        // console.log(<any>error);
      }
    );
  }

  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['inicio']);
      }
    });
  }

}
