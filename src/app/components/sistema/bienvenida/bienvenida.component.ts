import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css'],
  providers: [UserService]
})
export class BienvenidaComponent implements OnInit {

  public identity;
  public token;

  constructor(
    private _userService: UserService,
  ) {
    this.identity = this._userService.getIdentity();
   }

  ngOnInit(): void {
  }

}
