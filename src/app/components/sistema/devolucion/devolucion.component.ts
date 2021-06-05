import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { element } from 'protractor';
import { Cliente } from 'src/app/models/cliente';
import { Devolucion } from 'src/app/models/devoluciones';
import { Factura } from 'src/app/models/factura';
import { ClienteService } from 'src/app/services/cliente.service';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['../usuario/usuarios/usuarios.component.css'],
  providers: [ClienteService, InventarioService]
})
export class DevolucionComponent implements OnInit {

  public page_title: string;
  public validador;
  // public devolucion: Devolucion;
  public listaAlquiler: Devolucion[];
  public garantia: string;
  public cliente: Cliente;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  }

  // ****************ç
  public setIva;
  public subTotal;
  public iva;
  public total;
  public factura: Factura;
  public idFactura;


  constructor(
    private _service: NotificationsService,
    private _inventarioService: InventarioService,
  ) {
    this.page_title = 'Devoluciones';
    this.cliente = new Cliente(null, null, null, null, null, null, null);
    // this.devolucion = new Devolucion(null, null, null, null, null, null, null, null, null, null);
    this.factura = new Factura(null, null, null, null, "VENTA", 0, null, null, null, 1);
    let hoy = new Date();
    let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fechaYHora = fecha + ' ' + hora;
    this.factura.date = fechaYHora;
  }

  ngOnInit(): void {
    this.getIva();
  }

  devolver() {
    let hoy = new Date();
    let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fechaYHora = fecha + ' ' + hora;

    this.idFactura = 0;
    if (this.factura.total > 0) {
      this._inventarioService.venta(this.factura).subscribe(
        response => {
          this.idFactura = response.factura.id;
          this.listaAlquiler.forEach((element) => {
            element.date = fechaYHora;
            element.description = 'DEVOLUCION';
            element.estado = 1;
            this._inventarioService.devolverArticulo(element).subscribe(
              response => {
                console.log(response.producto)
              },
              error => {
                console.log(error);
              }
            );
      
            if (element.quantity - element.entrada > 0) {
              this._inventarioService.ventaArticulos(element, this.idFactura).subscribe(
                response => {
                  console.log(response.message)
                },
                error => {
                  console.log(error);
                }
              );
            }
      
          });
          this._inventarioService.quitarClienteAlquiler(this.listaAlquiler[0].id).subscribe(
            response => {
              console.log(response.message)
              this._service.success('Exito', response.message);
            },
            error => {
              console.log(error);
            }
          );
          this.resetear();
        },
        error => {
          console.log(error)
        }
      );
    }else{
      this.listaAlquiler.forEach((element) => {
        element.date = fechaYHora;
        element.description = 'DEVOLUCION';
        element.estado = 1;
        this._inventarioService.devolverArticulo(element).subscribe(
          response => {
            console.log(response.producto)
          },
          error => {
            console.log(error);
          }
        );  
      });
      this._inventarioService.quitarClienteAlquiler(this.listaAlquiler[0].id).subscribe(
        response => {
          console.log(response.message)
          this._service.success('Exito', response.message);
        },
        error => {
          console.log(error);
        }
      );
      this.resetear();
    }  
      
  }

  onSubmit(form) {
    if (this.validador == true) {
      this._inventarioService.buscarClienteAlquilado(this.cliente.identity_card).subscribe(
        response => {
          if (response.code == 200) {
            this._service.success('Exito', response.message);
            this.cliente = response.cliente;
            this.factura.customer_id = response.cliente.id
            this.factura.guarantee_id = response.alquiler[0].guarantee_id
            this.listaAlquiler = response.alquiler;
            this.garantia = response.garantia;
            console.log(response)
          } else {
            this._service.alert('Alerta', response.message);
            let cedula = this.cliente.identity_card;
            this.cliente = new Cliente(null, null, null, cedula, null, null, null);
            this.factura = new Factura(null, null, null, null, "VENTA", 0, null, null, null, 1);
            this.listaAlquiler = [];
            this.garantia = null;
            this.getIva()
          }

          // console.log(this.listaAlquiler);
        },
        error => {
          console.log(error.error.message);
        }
      );
    } else {
      this._service.alert('Alerta', 'Cedula invalida');
      this.resetear();
    }

  }

  devolverArticulo(indice, idArticulo) {
    this.factura.subtotal = 0;
    for (let index = 0; index < this.listaAlquiler.length; index++) {
      this.factura.subtotal += Math.round(((this.listaAlquiler[index].quantity - this.listaAlquiler[index].entrada) * this.listaAlquiler[index].exi_val_uni) * 100) / 100;
    }
    if (this.factura.subtotal != 0) {
      if (typeof (this.garantia) !== 'number') {
        let resul = this.factura.iva * this.factura.subtotal + this.factura.subtotal
        this.factura.total = Math.round(resul * 100) / 100;
      } else {
        let resul = this.factura.iva * this.factura.subtotal + this.factura.subtotal - Number(this.garantia);
        this.factura.total = Math.round(resul * 100) / 100;
      }
    } else {
      this.factura.total = 0;
    }
  }

  getIva() {
    this._inventarioService.getIva().subscribe(
      response => {
        this.factura.iva = response.data;
        this.setIva = Math.round(this.factura.iva * 100);
      },
      error => {
        console.log(error);
      }
    );
  }

  resetear() {
    this.listaAlquiler = [];
    this.cliente = new Cliente(null, null, null, null, null, null, null);
    this.factura = new Factura(null, null, null, null, "VENTA", 0, null, null, null, 1);
    let hoy = new Date();
    let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fechaYHora = fecha + ' ' + hora;
    this.factura.date = fechaYHora;
    this.garantia = '';
  }


  validadorDeCedula(cedula) {
    let cedulaCorrecta = false;
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < (cedula.length - 1); i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
        }
        suma = Math.round(suma);
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);
        if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
          cedulaCorrecta = true;
        } else if ((10 - (Math.round(suma % 10))) == verificador) {
          cedulaCorrecta = true;
        } else {
          cedulaCorrecta = false;
        }
      } else {
        cedulaCorrecta = false;
      }
    } else {
      cedulaCorrecta = false;
    }
    this.validador = cedulaCorrecta;

  }

}
