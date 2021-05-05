import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/global';
import { Disfraz } from '../../../../models/disfraz';
import { Router } from '@angular/router';
import { DisfrazService } from 'src/app/services/disfraz.service';

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
    attachPinText: 'Sube foto'
  };

  constructor(
    private _userService: DisfrazService,
    private _router: Router,
  ) { 
    this.page_title = 'Disfraces';
    this.disfraz = new Disfraz(0,'','','');
    this.message = '';
    this.url = global.url;
  }

  ngOnInit(): void {
  }

  avatarUpload(datos){
    console.log('hola ingreso')
    let data = JSON.parse(datos.response);
    this.disfraz.photo = data.image;
  }

  fotoProbador(datos){
    console.log('hola ingreso 2')
    let data = JSON.parse(datos.response);
    this.disfraz.photoCostume = data.image;
  }

  onSubmit(form){
    console.log(this.disfraz)
    this._userService.register(this.disfraz).subscribe(
      response => {
        console.log(response);
        form.reset();
        this.status = 'success';    
        this._router.navigate(['disfraces']);
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;        
      }      
    );   
  }

}
