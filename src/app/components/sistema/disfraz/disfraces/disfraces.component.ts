import { Component, OnInit } from '@angular/core';
import { DisfrazService } from 'src/app/services/disfraz.service';
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

  constructor(
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
    this._disfrazService.deleteDisfraz(id).subscribe(
      response => {
        // this.roles = response;
        this.getDisfraces();
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
