import { Component, OnInit } from '@angular/core';
import { Garantia } from 'src/app/models/garantia';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-estados',
  templateUrl: './garantias.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [ InventarioService ]
})
export class GarantiasComponent implements OnInit {

  public nuevoGarantia: Garantia;
  public garantias: [];
  public message: string;
  public status: string;
  public title: string;

  constructor(
    private _inventarioService: InventarioService,
  ) { 
    this.title = 'Garantias';
    this.nuevoGarantia = new Garantia(0,'');
  }

  ngOnInit(): void {
    this.getGarantiasTotal();
  }

  
  getGarantiasTotal(){
    this._inventarioService.getGarantias().subscribe(
      response => {    
          this.garantias = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarRol(){
    this._inventarioService.registrarEstado(this.nuevoGarantia).subscribe(
      response => {
        console.log(response)
        if(response.status == 'error'){
          this.message = response.message;
          this.status = response.status;
        }else{
          this.getGarantiasTotal();
          this.nuevoGarantia = new Garantia(0,'');
          this.message = response.message;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteRol(rolId){
    this._inventarioService.deleteEstado(rolId).subscribe(
      response => {
        this.getGarantiasTotal();
      },
      error => {
        console.log(error);
      }
    );
  }

}
