import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../../../../models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit {

  public page_title: string;
  public clientes: [];
  public client: Cliente;
  private token;

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
    private _clienteService: ClienteService,
  ) {
    this.page_title = 'Clientes';
    this.client = new Cliente(null,null,null,null,null,null,null);
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        // if(response.status == 'success'){          
        this.clientes = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCliente(id) {
    this._clienteService.deleteCliente(id, this._userService.getToken()).subscribe(
      response => {
        // this.roles = response;
        if(response.code == 200){
          this.getClientes();
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form) {
    this._clienteService.register(this.client, this._userService.getToken()).subscribe(
      response => {
        if(response.code == 200){
          form.reset();
          this.getClientes();
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(<any>error);
        this._service.error('Error', error.error.message);
      }
    );
  }

}
