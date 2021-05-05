import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class IdentityGuard implements CanActivate{
  constructor(
    private _router: Router,
    private _userService: UserService
  ){}

  // canActivate():boolean{
  //   let identity = this._userService.getIdentity();
  //   console.log(identity)
  //   if(identity){
  //     return true;
  //   }else{
  //     this._router.navigate(['/login']);
  //     return false;
  //   }
  // }

  canActivate(): boolean {
    if (!this._userService.isAuthenticated()) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
