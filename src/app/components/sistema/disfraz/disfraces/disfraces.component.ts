import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { DisfrazService } from 'src/app/services/disfraz.service';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-disfraces',
  templateUrl: './disfraces.component.html',
  styleUrls: ['./disfraces.component.css'],
  providers: [DisfrazService]
})
export class DisfracesComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();

  public page_title: string;
  public disfraces: [];
  public status: string;
  public message: string;
  public url: string;

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
    private _disfrazService: DisfrazService,
  ) { 
    this.page_title = 'Disfraces';
    // this.categorias = new Category(0,'');
    this.message = '';
    this.url = global.url;
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
    this.getDisfraces();
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

  getDisfraces(){
    this._disfrazService.getDisfraces().subscribe(
      response => {
        // if(response.status == 'success'){    
          // console.log(response.total)      
          this.disfraces = response;
          this.rerender()
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteDisfraz(id){
    this._disfrazService.deleteDisfraz(id, this._userService.getToken()).subscribe(
      response => {
        // this.roles = response;
        if(response.code == 200){
          this.getDisfraces();
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
