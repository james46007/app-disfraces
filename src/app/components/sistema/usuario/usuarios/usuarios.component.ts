import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [ UserService]
})
export class UsuariosComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();

  public title: string;
  public usuarios;
  public roles;

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
  ) { 
    this.title = 'Usuarios';
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
    this.getUsuarios();
    this.getRoles();
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

  getUsuarios(){
    this._userService.getUsuarios().subscribe(
      response => {
        // if(response.status == 'success'){          
          this.usuarios = response;
          this.rerender()
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  getRoles(){
    this._userService.getRoles().subscribe(
      response => {
        // if(response.status == 'success'){
          this.roles = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  getRolesUsuario(){
    this._userService.getRolesUsuario(3).subscribe(
      response => {
        // this.roles = response;

        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUsuario(id){
    this._userService.deleteUsuario(id).subscribe(
      response => {
        if(response.code){
          this.getUsuarios();
          this._service.success('Exito', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
