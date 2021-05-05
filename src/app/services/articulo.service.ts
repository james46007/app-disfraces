import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ArticuloService {
  public url: string;
  public identity: any;
  public token: string;
    
  constructor(
    public _http: HttpClient,
    public jwtHelper: JwtHelperService,
  ){
    this.url = global.url;
  }

  register(category): Observable<any>{
    let json = JSON.stringify(category);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'register/articulo',params,{headers: headers});
  }

  getArticulos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulos',{headers: headers});
  }

  deleteArticulo(id){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'borrar/articulo/' + id,{headers: headers});
  }

  update(categoria): Observable<any> {        
    let json = JSON.stringify(categoria);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + 'actulizar/articulo', params, { headers: headers });
  }

  getArticulo(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulo/' + id,{headers: headers});
  }
}