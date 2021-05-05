import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Alquiler } from 'src/app/models/alquiler';
import { ClienteService } from 'src/app/services/cliente.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { Factura } from 'src/app/models/factura';
import { Router } from '@angular/router';

// ****************
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['../usuario/usuarios/usuarios.component.css'],
  providers: [ClienteService, InventarioService]
})
export class AlquilerComponent implements OnInit {

  public page_title: string;
  public articulosDisponibles: [];
  public cliente: Cliente;
  // public listaAlquiler: Array<Alquiler>;
  public listaAlquiler = [];


  public alquiler: Alquiler;
  public maximoCantidad: number;
  public subTotal: number = 0;
  public total: number = 0;
  public iva;
  public setIva;
  public factura: Factura;
  public garantias: [];
  public advertencia;


  constructor(
    private _clienteService: ClienteService,
    private _inventarioService: InventarioService,
    private _router: Router,
  ) {
    this.page_title = 'Alquiler';
    this.cliente = new Cliente(null, '', '', '', '', '', '');
    this.alquiler = new Alquiler(null, null, null, null, null, 'ALQUILER', null, null, null, 1, null);
    this.factura = new Factura(null, null, null, null, null, null, null, null, null, 1);
  }

  ngOnInit(): void {
    this.getArticulosDisponibles();
    this.getGarantiasTotal();
    this.getIva();
  }

  getIva() {
    this._inventarioService.getIva().subscribe(
      response => {
        this.iva = response.iva;
        this.setIva = Math.round(this.iva * 100);
      },
      error => {
        console.log(error);
      }
    );
  }

  getArticulosDisponibles() {
    this._inventarioService.getArticulosDisponibles().subscribe(
      response => {
        this.articulosDisponibles = response.articulosDisponibles;
        // console.log(this.articulosDisponibles)
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form) {
    this._clienteService.buscarCliente(this.cliente.identity_card).subscribe(
      response => {
        if (response.status == 'warning') {
          this.advertencia = response.message;
          let cedula = this.cliente.identity_card
          this.cliente = new Cliente(null, '', '', cedula, '', '', '');
        } else if (response.status == 'registrar') {
          this.advertencia = response.message;
          let cedula = this.cliente.identity_card
          this.cliente = new Cliente(null, '', '', cedula, '', '', '');
        } else {
          this.cliente = response.cliente;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteArticulo(id, articuloId) {

    // console.log(this.listaAlquiler)
    let resultado = this.listaAlquiler.find(item => item.id == articuloId);
    // console.log(id)
    this.subTotal -= resultado.total;
    this.total = (this.subTotal * this.iva) + this.subTotal;
    this.listaAlquiler.splice(id, 1);
  }

  agregar() {
    // Quita de la lista de articulos disponibles
    // for (let index = 0; index < this.articulosDisponibles.length; index++) {
    //   if (this.articulosDisponibles[index] == this.alquiler.id) {
    //     this.articulosDisponibles.splice(index, 1);
    //   }      
    // }
    // Agregar articulos
    this.alquiler.total = this.alquiler.salida * this.alquiler.sal_val_uni;
    this.subTotal += this.alquiler.total;
    this.listaAlquiler.push(this.alquiler);
    this.alquiler = { id: this.listaAlquiler.length, article_id: null, name: null, code: null, date: null, description: 'ALQUILER', estado: 1, sal_val_uni: null, salida: null, total: null, maximo: null };
    this.maximoCantidad = null;
    this.total = (this.subTotal * this.iva) + this.subTotal;

  }

  maximo(id) {
    if (id != null) {
      this._inventarioService.getArticuloDisponible(id).subscribe(
        response => {
          this.maximoCantidad = response.articulosDisponibles[0].existe;
          this.alquiler.name = response.articulosDisponibles[0].name;
          this.alquiler.code = response.articulosDisponibles[0].code;
          this.alquiler.sal_val_uni = response.articulosDisponibles[0].price;
          this.alquiler.maximo = this.maximoCantidad;
          // this.alquiler.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          let hoy = new Date();
          let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
          let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
          let fechaYHora = fecha + ' ' + hora;
          this.alquiler.date = fechaYHora;
        },
        error => {
          console.log(error);
        }
      );
    }


  }

  aumentarCantidad(id, articuloId) {
    let resultado = this.listaAlquiler.find(item => item.id == articuloId);
    if (resultado.salida <= resultado.maximo) {
      this.subTotal = this.subTotal - resultado.total;
      resultado.total = resultado.sal_val_uni * resultado.salida;
      this.subTotal = this.subTotal + resultado.total;
      this.total = (this.subTotal * this.iva) + this.subTotal;
    } else {
      resultado.salida = resultado.maximo;
      this.subTotal = this.subTotal - resultado.total;
      resultado.total = resultado.sal_val_uni * resultado.salida;
      this.subTotal = this.subTotal + resultado.total;
      this.total = (this.subTotal * this.iva) + this.subTotal;
    }

  }

  calcular(id, articuloId) {
    let resultado = this.listaAlquiler.find(item => item.id == articuloId);
    // console.log(id)
    this.subTotal = this.subTotal - resultado.total;
    // resultado.sal_val_uni = valor;
    resultado.total = resultado.sal_val_uni * resultado.salida;
    this.subTotal = this.subTotal + resultado.total;
    this.total = (this.subTotal * this.iva) + this.subTotal;
    // console.log(this.listaAlquiler)

  }


  pagar(form) {
    this.factura.customer_id = this.cliente.id;
    let hoy = new Date();
    let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fechaYHora = fecha + ' ' + hora;
    this.factura.date = fechaYHora;
    if (this.factura.guarantee_id == 1) {
      this.factura.garantia = "CÉDULA"
    }
    this.factura.discount = 0;
    this.factura.subtotal = this.subTotal;
    this.factura.iva = this.iva;
    this.factura.total = this.total;

    // console.log(this.factura)

    if (this.factura.customer_id == null) {
      this._clienteService.register(this.cliente).subscribe(
        response => {
          this.factura.customer_id = response.cliente.id;
          this._inventarioService.registrarFactura(this.factura).subscribe(
            response => {
              for (let i = 0; i < this.listaAlquiler.length; i++) {
                this._inventarioService.registrarAlquiler(this.listaAlquiler[i], response.factura.id).subscribe(
                  response => {
                    // console.log('felicidades guapo');
                  },
                  error => {
                    console.log(error);
                  }
                );
              }
              this.resetear();
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log(this.listaAlquiler)
      this._inventarioService.registrarFactura(this.factura).subscribe(
        response => {
          for (let i = 0; i < this.listaAlquiler.length; i++) {
            this._inventarioService.registrarAlquiler(this.listaAlquiler[i], response.factura.id).subscribe(
              response => {
                // console.log('felicidades guapo');
              },
              error => {
                console.log(error);
              }
            );
          }
          this.resetear();
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  getGarantiasTotal() {
    this._inventarioService.getGarantias().subscribe(
      response => {
        this.garantias = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  public validador;
  validadorDeCedula(cedula: String) {
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

  resetear() {
    this.cliente = new Cliente(null, null, null, null, null, null, null);
    this.alquiler = new Alquiler(null, null, null, null, null, 'ALQUILER', null, null, null, 1, null);
    this.factura = new Factura(null, null, null, null, null, null, null, null, null, 1);
    this.listaAlquiler = [];
    this.advertencia = null;
  }

  // verificar despues
  downloadPDF() {
    // html2canvas(document.getElementById('contenido'), {
    //   // Opciones
    //   allowTaint: true,
    //   useCORS: false,
    //   // Calidad del PDF
    //   scale: 1
    // }).then(function(canvas) {
    var doc = new jsPDF();
    doc.fromHTML(document.getElementById('contenido'), 5, 10);
    // doc.addImage(img,'PNG',7, 20, 195, 105);
    doc.save('postres.pdf');
    // });
  }

}
