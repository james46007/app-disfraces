import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['../categorias/categorias.component.css'],
  providers: [CategoryService]
})
export class CategoriaEditComponent implements OnInit {

  public categoria_id;
  public categoria: Category;
  public message;
  public status;
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
    private _categoriaService: CategoryService,
    private _router: Router,
  ) {
    this.categoria = new Category(0,'');
    this.page_title = 'Actualizar categoria';
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.categoria_id = +params['id'];
      this.getCategoria(this.categoria_id);
    });
  }

  getCategoria(id){
    this._categoriaService.getCategoria(id).subscribe(
      response => {
        // if(response.status == 'success'){          
          this.categoria = response.data;
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
    this._categoriaService.update(this.categoria, token).subscribe(
      response => {
        // console.log(response)
        if(response.code == 200){
          this._service.success('Éxito', response.message);     
          this._router.navigate(['categorias']);
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
