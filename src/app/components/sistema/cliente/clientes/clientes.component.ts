import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
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
export class ClientesComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();

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
    this.dtOptions = {
      searching: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      },
    };
  }

  ngOnInit(): void {
    this.getClientes();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        // if(response.status == 'success'){          
        this.clientes = response;
        this.rerender()
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
    this.validadorDeCedula(this.client.identity_card)
    this._userService.validarEmail(this.client.email).subscribe(
      response => {
        if (response.mx_found && response.format_valid && response.smtp_check) {
          if(this.validador){
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
        } else {
          this._service.alert('alerta', 'Email no existe');
        }
    });
  }

  public validador = false;
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
    if (!cedulaCorrecta) {
      this._service.alert('Alerta', 'Cedula incorrecta');
    }

  }

}
