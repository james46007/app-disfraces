import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  public title: string;
  identity: any;

  constructor() {
    this.title = 'LA CASA DE LOS DISFRACES';
   }

  ngOnInit(): void {
  }

  getAdmin(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    for(let i=0; i<identity.roles.length; i++){
      if(identity.roles[i].rol_id == 1){
        return true;
      }
    }
    return false;
  }

  getCajera(): boolean{
    let identity = JSON.parse(localStorage.getItem('identity'));
    for(let i=0; i<identity.roles.length; i++){
      if(identity.roles[i].rol_id == 2){
        return true;
      }
    }
    return false;
  }
  
  getMantenimiento(): boolean{
    let identity = JSON.parse(localStorage.getItem('identity'));
    for(let i=0; i<identity.roles.length; i++){
      if(identity.roles[i].rol_id == 3){
        return true;
      }
    }
    return false;
  }
}
