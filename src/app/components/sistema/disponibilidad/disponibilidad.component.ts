import { Component, OnInit } from '@angular/core';
import { Disponible } from 'src/app/models/disponible';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['../usuario/usuarios/usuarios.component.css'],
  providers: [InventarioService]
})
export class DisponibilidadComponent implements OnInit {

  public page_title: string;
  public articulosDevueltos: [];
  public articuloDevolver: Disponible;

  constructor(
    private _inventarioService: InventarioService,
  ) {
    this.page_title = "Mantenimiento";
    this.articuloDevolver = new Disponible(null,null,null,'DISPONIBLE',null,null,null,null);
   }

  ngOnInit(): void {
    this.getArticulosDevueltos();
  }

  getArticulosDevueltos(){
    this._inventarioService.articulosDevueltos().subscribe(
      response => {
        this.articulosDevueltos = response.articulos;
        console.log(this.articulosDevueltos)
      },
      error => {
        console.log(error)
      }
    );
  }

  setArticulo(item){
    if(item != null){
      this._inventarioService.articuloDevuelto(item).subscribe(
        response => {
          this.articuloDevolver = response.articulo;
          let hoy = new Date();
          let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
          let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
          let fechaYHora = fecha + ' ' + hora;
          this.articuloDevolver.date = fechaYHora;
          this.articuloDevolver.description = 'DISPONIBLE';
          // console.log(this.articuloDevolver)
        },
        error => {
          console.log(error)
        }
      );
    }
  }

  habilitar(form){    
    console.log(this.articuloDevolver)
    this._inventarioService.habilitar(this.articuloDevolver).subscribe(
      response => {
        form.reset();
        this.articuloDevolver = new Disponible(null,null,null,'DISPONIBLE',null,null,null,null);
        this.getArticulosDevueltos();
      },
      error => {
        console.log(error);
      }
    );
    
  }

}
