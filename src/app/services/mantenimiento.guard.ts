import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class MantenimientoGuard implements CanActivate{
  constructor(
    private _router: Router,
    private _userService: UserService
  ){}

  canActivate(): boolean {
    if (!this._userService.isMantenimiento() && !this._userService.isAdmin()) {
      this._router.navigate(['/administracion']);
      return false;
    }
    return true;
  }

}
