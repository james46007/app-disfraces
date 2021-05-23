import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class CategoryService {
  public url: string;
  public identity: any;
  public token: string;
    
  constructor(
    public _http: HttpClient,
    public jwtHelper: JwtHelperService,
  ){
    this.url = global.url;
  }

  register(category,token): Observable<any>{
    let json = JSON.stringify(category);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.post(this.url + 'register/categoria',params,{headers: headers});
  }

  getCategorias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categorias',{headers: headers});
  }

  deleteCategoria(id, token):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.delete(this.url + 'borrar/categoria/' + id,{headers: headers});
  }

  update(categoria, token): Observable<any> {        
    let json = JSON.stringify(categoria);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.put(this.url + 'actulizar/categoria', params, { headers: headers });
  }

  getCategoria(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categoria/' + id,{headers: headers});
  }

  getDisfracesCategoria(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categoria/disfraces/' + id,{headers: headers});
  }
}