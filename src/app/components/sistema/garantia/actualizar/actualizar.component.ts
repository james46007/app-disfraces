import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Garantia } from 'src/app/models/garantia';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['../../usuario/usuarios/usuarios.component.css'],
  providers: [InventarioService]
})
export class ActualizarComponent implements OnInit {

  public garantia_id;
  public garantia: Garantia;
  public message;
  public status;
  public page_title;

  constructor(
    private _route: ActivatedRoute,
    private _inventarioService: InventarioService,
    private _router: Router,
  ) {
    this.garantia = new Garantia(0,'');
    this.page_title = 'Actualizar garantia';
   }

   ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.garantia_id = +params['id'];
      this.getGarantia(this.garantia_id);
    });
  }

  getGarantia(id){
    // console.log(id)
    this._inventarioService.getGarantiaId(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          // this.articulo = response.articulo[0];
          // console.log(response)
          this.garantia = response.garantia;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    this._inventarioService.actualizarGarantia(this.garantia).subscribe(
      response => {
        this._router.navigate(['garantias']);
      },
      error => {
        this.message = error.error.message
        this.status = 'error';
      }
    );
  }

}
