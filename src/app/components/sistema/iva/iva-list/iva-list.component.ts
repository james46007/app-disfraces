import { Component, OnInit } from '@angular/core';
import { Iva } from 'src/app/models/iva';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-iva-list',
  templateUrl: './iva-list.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [InventarioService]
})
export class IvaListComponent implements OnInit {

  public title;
  public newIva: Iva;
  public ivas: [];

  constructor(
    private _inventarioService: InventarioService,
  ) {
    this.title = 'Iva';
    this.newIva = new Iva(0,null);
   }

  ngOnInit(): void {
    this.getIvas();
  }

  getIvas() {
    this._inventarioService.getIvas().subscribe(
      response => {
        this.ivas = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarIva(){
    this._inventarioService.setIva(this.newIva.iva).subscribe(
      response => {
        this.newIva = new Iva(0,null);
        this.getIvas();
      },
      error => {
        console.log(error);
      }
    );
  }

  activarIva(idIva){
    this._inventarioService.setIvas(idIva).subscribe(
      response => {
        // this.ivas = response;
        this.getIvas();
      },
      error => {
        console.log(error);
      }
    );
  }

}
