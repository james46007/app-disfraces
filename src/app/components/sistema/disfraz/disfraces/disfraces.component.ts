import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-disfraces',
  templateUrl: './disfraces.component.html',
  styleUrls: ['./disfraces.component.css'],
  providers: [DisfrazService]
})
export class DisfracesComponent implements OnInit {

  public page_title: string;
  public disfraces: [];
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

  constructor(
    private _userService: UserService,
    private _service: NotificationsService,
    private _disfrazService: DisfrazService,
  ) { 
    this.page_title = 'Disfraces';
    // this.categorias = new Category(0,'');
    this.message = '';
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getDisfraces();
  }

  getDisfraces(){
    this._disfrazService.getDisfraces().subscribe(
      response => {
        // if(response.status == 'success'){    
          console.log(response.total)      
          this.disfraces = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDisfraz(id){
    this._disfrazService.deleteDisfraz(id, this._userService.getToken()).subscribe(
      response => {
        // this.roles = response;
        if(response.code == 200){
          this.getDisfraces();
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
