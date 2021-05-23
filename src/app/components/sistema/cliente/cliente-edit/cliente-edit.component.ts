import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Cliente } from 'src/app/models/cliente';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css'],
  providers:[ClienteService]
})
export class ClienteEditComponent implements OnInit {

  public cliente_id;
  public cliente: Cliente;
  public page_title;

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  }

  constructor(
    private _userService: UserService,
    private _service: NotificationsService,
    private _route: ActivatedRoute,
    private _clienteService: ClienteService,
    private _router: Router,
  ) {
    this.cliente = new Cliente(null,null,null,null,null,null,null);
    this.page_title = 'Actualizar cliente';
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.cliente_id = +params['id'];
      this.getCliente(this.cliente_id);
    });
  }

  getCliente(id){
    this._clienteService.clienteById(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          this.cliente = response.data;
          // console.log(response)
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form){
    let token = this._userService.getToken();
    this._clienteService.updateCliente(this.cliente, token).subscribe(
      response => {
        // console.log(response)
        if(response.code == 200){
          this._service.success('Éxito', response.message);     
          this._router.navigate(['clientes']);
        }else{
          // this.message = response.message;
          this._service.alert('Alerta', response.message);          
        }
      },
      error => {
        console.log(error);        
      }
    );
  }

}
