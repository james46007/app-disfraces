import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disfraz } from 'src/app/models/disfraz';
import { DisfrazService } from 'src/app/services/disfraz.service';
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
  public status: string;
  public message: string;
  public url: string;
  public disfraz_id: string;

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
    private _disfrazService: DisfrazService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { 
    this.page_title = 'Disfraces';
    this.disfraz = new Disfraz(0,'','','');
    this.message = '';
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
          this.disfraz = response.disfraz[0];
          console.log(this.disfraz)
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
        this.status = 'error';
        this.message = error.error.message;        
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
        this.status = 'error';
        this.message = error.error.message;        
      }      
    );   
  }

  onSubmit(form){
    this._disfrazService.update(this.disfraz).subscribe(
      response => {
        // console.log(response);
        form.reset();
        this.status = 'success';    
        
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;        
      }      
    );   
    this._router.navigate(['disfraces']);
  }

}
