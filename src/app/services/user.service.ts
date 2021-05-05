import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  public url: string;
  identity: any;
  token: string;
    
  constructor(
    public _http: HttpClient,
    public jwtHelper: JwtHelperService,
  ){
    this.url = global.url;
  }

  validarEmail(email): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(`/apiDemo/${email}`);
  }

  register(user): Observable<any>{
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'register',params,{headers: headers});
  }

  update(token, user): Observable<any> {    
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.put(this.url + 'user/update', params, { headers: headers });
  }

  signup(user, gettoken = null): Observable<any>{
    if (gettoken != null) {
      user.gettoken = 'true';
    }
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAdmin(): boolean{
    let identity = JSON.parse(localStorage.getItem('identity'));
    for(let i=0; i<identity.roles.length; i++){
      if(identity.roles[i].rol_id == 1){
        return true;
      }
    }
    return false;
  }

  public isCajera(): boolean{
    let identity = JSON.parse(localStorage.getItem('identity'));
    for(let i=0; i<identity.roles.length; i++){
      if(identity.roles[i].rol_id == 2){
        return true;
      }
    }
    return false;
  }
  
  public isMantenimiento(): boolean{
    let identity = JSON.parse(localStorage.getItem('identity'));
    for(let i=0; i<identity.roles.length; i++){
      if(identity.roles[i].rol_id == 3){
        return true;
      }
    }
    return false;
  }
  
  getUsuario(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'usuario/' + id,{headers: headers});
  }

  getUsuarios():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'usuarios',{headers: headers});
  }

  deleteUsuario(id){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'borrar/usuario/' + id,{headers: headers});
  }

  getRoles():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'roles',{headers: headers});
  }

  getRolesUsuario(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'roles/usuario/' + id,{headers: headers});
  }

  addRol(disfrazId,categoriaId): Observable<any>{
    // let json = JSON.stringify(categoria);
    // let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'agregar/rol/usuario/'+ disfrazId + '/'+ categoriaId,{headers: headers});
  }

  deleteRolUsuario(disfrazId,rolId){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'quitar/rol/usuario/' + disfrazId + '/'+ rolId,{headers: headers});
  }

  borrarRol(rolId){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'borrar/rol/' + rolId,{headers: headers});
  }

  agregarRol(nuevoRol): Observable<any>{
    // let json = JSON.stringify(categoria);
    // let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'agregar/rol/'+ nuevoRol,{headers: headers});
  }
  
  getRol(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'rol/' + id,{headers: headers});
  }

  updateRol(rol){
    let json = JSON.stringify(rol);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + 'rol/update', params, { headers: headers });
  }
}