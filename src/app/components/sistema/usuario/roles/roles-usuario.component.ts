import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-roles-usuario',
  templateUrl: './roles-usuario.component.html',
  styleUrls: ['./roles-usuario.component.css']
})
export class RolesUsuarioComponent implements OnInit {

  public page_title: string;
  public status: string;
  public message: string;
  public url: string;
  public rolesUsuario: [];
  public rolUsuarioId;
  public rolesTotal: [];
  public usuarioID;
  public rolID;

  constructor(
    private _usuarioService: UserService,
    private _route: ActivatedRoute,
  ) { 
    this.page_title = 'Roles usuario';
    // this.categorias = new Category(0,'');
    this.message = '';
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.usuarioID = params['usuario'];
      this.getRolesUsuario();
      this.getrolesTotal();
    });   
  }

  getrolesTotal(){
    this._usuarioService.getRoles().subscribe(
      response => {    
          this.rolesTotal = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getRolesUsuario(){
    this._usuarioService.getRolesUsuario(this.usuarioID).subscribe(
      response => {     
        console.log(response)
          this.rolesUsuario = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarRol(){
    this._usuarioService.addRol(this.usuarioID,this.rolID).subscribe(
      response => {
        // console.log(response)
        if(response.status == 'success'){          
          // this.categoriasTotal = response;
          this.getRolesUsuario();
          this.status = response.status;
        }else{
          this.status = response.status;          
        }
        this.message = response.message;
      },
      error => {
        console.log(error);
        
      }
    );
  }

  deleteCategoriaDisfraz(id){
    this._usuarioService.deleteRolUsuario(this.usuarioID,id).subscribe(
      response => {
        // this.roles = response;
        this.getRolesUsuario();
      },
      error => {
        console.log(error);
      }
    );
  }

}
