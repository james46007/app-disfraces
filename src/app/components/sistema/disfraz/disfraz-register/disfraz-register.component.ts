import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/global';
import { Disfraz } from '../../../../models/disfraz';
import { Router } from '@angular/router';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-disfraz-register',
  templateUrl: './disfraz-register.component.html',
  styleUrls: ['./disfraz-register.component.css'],
  providers: [DisfrazService]
})
export class DisfrazRegisterComponent implements OnInit {

  public disfraz: Disfraz;
  public page_title: string;
  public status: string;
  public message: string;
  public url: string;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  }

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "150",
    uploadAPI: {
      url: global.url + 'subir/foto/disfraz',

    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: true,
    attachPinText: 'Sube foto'
  };

  constructor(
    private _userService: UserService,
    private _service: NotificationsService,
    private _disfrazService: DisfrazService,
    private _router: Router,
  ) {
    this.page_title = 'Disfraces';
    this.disfraz = new Disfraz(0, '', '', '');
    this.message = '';
    this.url = global.url;
  }

  ngOnInit(): void {
  }

  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.disfraz.photo = data.image;
  }

  fotoProbador(datos) {
    let data = JSON.parse(datos.response);
    this.disfraz.photoCostume = data.image;
  }

  onSubmit(form) {
    this._disfrazService.register(this.disfraz, this._userService.getToken()).subscribe(
      response => {
        if (response.code == 200) {
          form.reset();
          this._router.navigate(['disfraces']);
          this._service.success('Éxito', response.message);
        } else {
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
