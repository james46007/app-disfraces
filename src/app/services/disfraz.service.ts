import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class DisfrazService {
  public url: string;
  public identity: any;
  public token: string;
    
  constructor(
    public _http: HttpClient,
    public jwtHelper: JwtHelperService,
  ){
    this.url = global.url;
  }

  register(disfraz, token): Observable<any>{
    let json = JSON.stringify(disfraz);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.post(this.url + 'register/disfraz',params,{headers: headers});
  }

  getDisfraces():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'disfraces',{headers: headers});
  }

  deleteDisfraz(id, token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.delete(this.url + 'borrar/disfraz/' + id,{headers: headers});
  }

  update(disfraz,token): Observable<any> {        
    let json = JSON.stringify(disfraz);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.put(this.url + 'actulizar/disfraz', params, { headers: headers });
  }

  getDisfraz(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'disfraz/' + id,{headers: headers});
  }

  updateDisfraz(id,disfraz): Observable<any> {        
    let json = JSON.stringify(disfraz);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + 'actualizar/foto/disfraz', params, { headers: headers });
  }

  updateDisfrazProbador(id,disfraz): Observable<any> {        
    let json = JSON.stringify(disfraz);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + 'actualizar/foto/disfraz/probador', params, { headers: headers });
  }

  getCategoriaDisfraz(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categorias/disfraz/' + id,{headers: headers});
  }

  addCategoria(disfrazId,categoriaId): Observable<any>{
    // let json = JSON.stringify(categoria);
    // let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'agregar/categoria/disfraz/'+ disfrazId + '/'+ categoriaId,{headers: headers});
  }

  deleteCategoriaDisfraz(disfrazId,categoriaId):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'quitar/categoria/disfraz/' + disfrazId + '/'+ categoriaId,{headers: headers});
  }

  getCategorias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categorias',{headers: headers});
  }

  // *******************************************************

  getArticulos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulos',{headers: headers});
  }

  getArticuloDisfraz(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulos/disfraz/' + id,{headers: headers});
  }

  addArticulo(disfrazId,articuloId): Observable<any>{
    // let json = JSON.stringify(categoria);
    // let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'agregar/articulo/disfraz/'+ disfrazId + '/'+ articuloId,{headers: headers});
  }

  deleteArticuloDisfraz(disfrazId,articuloId): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'quitar/articulo/disfraz/' + disfrazId + '/'+ articuloId,{headers: headers});
  }

}