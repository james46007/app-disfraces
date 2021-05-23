import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ClienteService {
    public url: string;
    public identity: any;
    public token: string;

    constructor(
        public _http: HttpClient,
        public jwtHelper: JwtHelperService,
    ) {
        this.url = global.url;
    }

    getClientes():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'clientes/',{headers: headers});
      }

    clienteById(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'clienteById/' + id, { headers: headers });
    }

    buscarCliente(cedula): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'cliente/' + cedula, { headers: headers });
    }

    register(cliente,token): Observable<any> {
        let json = JSON.stringify(cliente);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'ingresar/cliente', params, { headers: headers });
    }

    updateCliente(cliente,token): Observable<any> {
        let json = JSON.stringify(cliente);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url + 'actualizar/cliente', params, { headers: headers });
    }

    deleteCliente(id,token): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.delete(this.url + 'borrar/cliente/' + id,{headers: headers});
    }


    //   deleteCategoria(id){
    //     let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //     return this._http.delete(this.url + 'borrar/categoria/' + id,{headers: headers});
    //   }

    //   update(categoria): Observable<any> {        
    //     let json = JSON.stringify(categoria);
    //     let params = 'json=' + json;
    //     let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //     return this._http.put(this.url + 'actulizar/categoria', params, { headers: headers });
    //   }
}