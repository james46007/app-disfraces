import { Component, OnInit, DoCheck } from '@angular/core';
import { CategoryService } from './services/category.service';
import { DisfrazService } from './services/disfraz.service';
import { global } from './services/global';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService, DisfrazService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'app-disfraces';
  url: any;
  identity: any;
  token: string;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
  ) {
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit(){
    
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
