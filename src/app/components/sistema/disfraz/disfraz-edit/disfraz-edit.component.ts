import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Disfraz } from 'src/app/models/disfraz';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-disfraz-edit',
  templateUrl: './disfraz-edit.component.html',
  styleUrls: ['./disfraz-edit.component.css'],
  providers: [DisfrazService]
})
export class DisfrazEditComponent implements OnInit {

  public disfraz: Disfraz;
  public page_title: string;
  public url: string;
  public disfraz_id: string;

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
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'subir/foto/disfraz',
      
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: true,
    attachPinText: 'Sube foto de disfraz'
  };

  constructor(
    private _userService: UserService,
    private _service: NotificationsService,
    private _disfrazService: DisfrazService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { 
    this.page_title = 'Disfraces';
    this.disfraz = new Disfraz(0,'','','');
    this.url = global.url;
    this.disfraz_id = '';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.disfraz_id = params['id'];
      console.log(this.disfraz_id)
      this.getDisfraz(this.disfraz_id);
    });
  }

  getDisfraz(id){
    this._disfrazService.getDisfraz(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          this.disfraz = response.data;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  avatarUpload(datos){
    let data = JSON.parse(datos.response);
    this.disfraz.photo = data.image;
    this._disfrazService.updateDisfraz(this.disfraz_id,this.disfraz).subscribe(
      response => {
        // console.log(response);
        // this.status = 'success';    
        // this._router.navigate(['disfraces']);
      },
      error => {
        console.log(<any>error);   
      }      
    );   
  }

  fotoProbador(datos){
    let data = JSON.parse(datos.response);
    this.disfraz.photoCostume = data.image;
    this._disfrazService.updateDisfrazProbador(this.disfraz_id,this.disfraz).subscribe(
      response => {
        // console.log(response);
        // this.status = 'success';    
        // this._router.navigate(['disfraces']);
      },
      error => {
        console.log(<any>error);   
      }      
    );   
  }

  onSubmit(form){
    this._disfrazService.update(this.disfraz, this._userService.getToken()).subscribe(
      response => {
        // console.log(response);
        if(response.code == 200){
          form.reset();
          this._router.navigate(['disfraces']);
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(<any>error);   
      }      
    );      
  }

}
