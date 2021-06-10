import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class InventarioService {
  public url: string;
  public identity: any;
  public token: string;

  constructor(
    public _http: HttpClient,
    public jwtHelper: JwtHelperService,
  ) {
    this.url = global.url;
  }

  // alquiler

  getArticulosDisponibles(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulos/disponibles', { headers: headers });
  }

  getArticuloDisponible(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulo/disponible/' + id, { headers: headers });
  }
  
  getVerificarArticulosDisponibles(alquiler): Observable<any> {
    let json = JSON.stringify(alquiler);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'verificar/articles/available/', params, { headers: headers });
  }

  registrarAlquiler(alquiler, clienteID): Observable<any> {
    let json = JSON.stringify(alquiler);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'alquilar/' + clienteID, params, { headers: headers });
  }

  // devoluciones
  buscarClienteAlquilado(cedula): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'devolucion/cliente/' + cedula, { headers: headers });
  }

  devolverArticulo(articulo): Observable<any> {
    let json = JSON.stringify(articulo);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'devolucion/articulo', params, { headers: headers });
  }

  quitarClienteAlquiler(cliente): Observable<any> {
    let json = JSON.stringify(cliente);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'devolucion/cliente/'+cliente, { headers: headers });
  }

  // disponibilidad

  articulosDevueltos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulos/devueltos', { headers: headers });
  }
  
  articuloDevuelto(article): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'articulos/devueltos/'+article, { headers: headers });
  }

  habilitar(articulo): Observable<any> {
    let json = JSON.stringify(articulo);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'habilitar/articulo', params, { headers: headers });
  }

  // factura

  registrarFactura(factura): Observable<any> {
    let json = JSON.stringify(factura);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'facturar', params, { headers: headers });
  }

  venta(factura): Observable<any> {
    let json = JSON.stringify(factura);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'venta', params, { headers: headers });
  }

  ventaArticulos(articulos, clienteID): Observable<any> {
    let json = JSON.stringify(articulos);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'ventaArticulos/' + clienteID, params, { headers: headers });
  }

  // garantias

  registrarEstado(garantia, token): Observable<any> {
    let json = JSON.stringify(garantia);
    // console.log(json)
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.post(this.url + 'register/garantia', params, { headers: headers });
  }

  actualizarGarantia(garantia, token): Observable<any> {
    let json = JSON.stringify(garantia);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.put(this.url + 'actualizar/garantia', params, { headers: headers });
  }

  getGarantiaId(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'garantia/'+id, { headers: headers });
  }

  getGarantias(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'garantias', { headers: headers });
  }

  deleteEstado(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.delete(this.url + 'borrar/garantia/' + id, { headers: headers });
  }

  // inventario

  registrarProducto(producto): Observable<any> {
    let json = JSON.stringify(producto);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'register/producto', params, { headers: headers });
  }

  getMovimientoInventario(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'productos', { headers: headers });
  }

  getInventario(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'ver/inventario', { headers: headers });
  }

  deleteProducto(productoId) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'borrar/producto/' + productoId, { headers: headers });
  }

  update(disfraz): Observable<any> {
    let json = JSON.stringify(disfraz);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + 'actulizar/disfraz', params, { headers: headers });
  }

  getDisfraz(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'disfraz/' + id, { headers: headers });
  }

  updateDisfraz(id, disfraz): Observable<any> {
    let json = JSON.stringify(disfraz);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.put(this.url + 'actualizar/foto/disfraz/' + id, params, { headers: headers });
  }

  getCategoriaDisfraz(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categorias/disfraz/' + id, { headers: headers });
  }

  addCategoria(disfrazId, categoriaId): Observable<any> {
    // let json = JSON.stringify(categoria);
    // let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.url + 'agregar/categoria/disfraz/' + disfrazId + '/' + categoriaId, { headers: headers });
  }

  deleteCategoriaDisfraz(disfrazId, categoriaId) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'quitar/categoria/disfraz/' + disfrazId + '/' + categoriaId, { headers: headers });
  }

  getCategorias(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'categorias', { headers: headers });
  }

  // Reportes
  getReporteClienteFechas(desde, hasta): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'reportes/clientes/' + desde + '/' + hasta, { headers: headers });
  }

  getReporteArticulosFechas(desde, hasta): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'reportes/articulos/' + desde + '/' + hasta, { headers: headers });
  }

  getReporteArticuloFechas(desde, hasta, articulo_id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'reportes/articulo/' + desde + '/' + hasta + '/' + articulo_id, { headers: headers });
  }

  // IVA
  getIva(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'iva', { headers: headers });
  }

  getIvas(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + 'ivas', { headers: headers });
  }

  setIva(nuevoIva, token): Observable<any> {
    let json = JSON.stringify(nuevoIva);
    let params = 'json=' + json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.post(this.url + 'nuevo/iva', params ,{ headers: headers });
  }

  setIvas(idIva, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);
    return this._http.post(this.url + 'activar/iva/'+idIva, { headers: headers });
  }

}