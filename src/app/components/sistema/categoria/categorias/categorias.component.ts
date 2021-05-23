import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [CategoryService]
})
export class CategoriasComponent implements OnInit {

  public page_title: string;
  public categorias: [];
  public status: string;
  public message: string;
  public category: Category;
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
    private _categoriaService: CategoryService,
  ) {
    this.page_title = 'Categorias';
    this.category = new Category(0, '');
    this.message = '';
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this._categoriaService.getCategorias().subscribe(
      response => {
        // if(response.status == 'success'){          
        this.categorias = response;
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCategoria(id) {
    this._categoriaService.deleteCategoria(id, this._userService.getToken()).subscribe(
      response => {
        // this.roles = response;
        if(response.code == 200){
          this.getCategorias();
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
    this._categoriaService.register(this.category, this._userService.getToken()).subscribe(
      response => {
        if(response.code == 200){
          form.reset();
          this.getCategorias();
          this._service.success('Éxito', response.message);
        }else{
          this._service.alert('Alerta', response.message);
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
        this.message = error.error.message;
        this._service.error('Error', error.error.message);
      }
    );
  }

}


