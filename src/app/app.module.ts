import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingProviders, routing } from './app.routing';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { DataTablesModule } from 'angular-datatables';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/sistema/usuario/login/login.component';
import { RegisterComponent } from './components/sistema/usuario/register/register.component';
import { MenuComponent } from './components/web/menu/menu.component';
import { PaginaComponent } from './components/web/pagina/pagina.component';
import { UsuariosComponent } from './components/sistema/usuario/usuarios/usuarios.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/web/footer/footer.component';
import { SidebarComponent } from './components/sistema/sidebar/sidebar.component';
import { BienvenidaComponent } from './components/sistema/bienvenida/bienvenida.component';
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CategoriasComponent } from './components/sistema/categoria/categorias/categorias.component';
import { UsuarioEditComponent } from './components/sistema/usuario/edit/usuario-edit.component';
import { RegistrarCategoriaComponent } from './components/sistema/categoria/registrar-categoria/registrar-categoria.component';
import { CategoriaEditComponent } from './components/sistema/categoria/categoria-edit/categoria-edit.component';
import { DisfracesComponent } from './components/sistema/disfraz/disfraces/disfraces.component';
import { DisfrazEditComponent } from './components/sistema/disfraz/disfraz-edit/disfraz-edit.component';
import { DisfrazRegisterComponent } from './components/sistema/disfraz/disfraz-register/disfraz-register.component';
import { ArticulosComponent } from './components/sistema/articulo/articulos/articulos.component';
import { ArticuloEditComponent } from './components/sistema/articulo/articulo-edit/articulo-edit.component';
import { ArticuloRegisterComponent } from './components/sistema/articulo/articulo-register/articulo-register.component';
import { CategoriasAddComponent } from './components/sistema/disfraz/categorias-add/categorias-add.component';
import { RolesUsuarioComponent } from './components/sistema/usuario/roles/roles-usuario.component';
import { RolesComponent } from './components/sistema/rol/roles/roles.component';
import { RolesAddComponent } from './components/sistema/rol/roles-add/roles-add.component';
import { RolesUpdateComponent } from './components/sistema/rol/roles-update/roles-update.component';
import { ProductosComponent } from './components/sistema/inventario/productos/productos.component';
import { GarantiasComponent } from './components/sistema/garantia/garantias/garantias.component';
import { DataTableProductosComponent } from './components/data-table/data-table-productos/data-table-productos.component';
import { ArticulosAddComponent } from './components/sistema/disfraz/articulos-add/articulos-add.component';
import { AlquilerComponent } from './components/sistema/alquiler/alquiler.component';
import { DevolucionComponent } from './components/sistema/devolucion/devolucion.component';
import { DisponibilidadComponent } from './components/sistema/disponibilidad/disponibilidad.component';
import { AdminGuard } from './services/admin.guard';
import { CajeraGuard } from './services/cajera.guard';
import { MantenimientoGuard } from './services/mantenimiento.guard';
import { ProbadorComponent } from './components/web/probador/probador.component';
import { DisfracesListComponent } from './components/web/disfraces-list/disfraces-list.component';
import { NosotrosComponent } from './components/web/nosotros/nosotros.component';
import { ContactoComponent } from './components/web/contacto/contacto.component';
import { ActualizarComponent } from './components/sistema/garantia/actualizar/actualizar.component';
import { ReporteClientesComponent } from './components/sistema/reporte-clientes/reporte-clientes.component';
import { IvaListComponent } from './components/sistema/iva/iva-list/iva-list.component';
import { ClientesComponent } from './components/sistema/cliente/clientes/clientes.component';
import { ClienteEditComponent } from './components/sistema/cliente/cliente-edit/cliente-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    PaginaComponent,
    UsuariosComponent,
    PageNotFoundComponent,
    FooterComponent,
    SidebarComponent,
    BienvenidaComponent,
    CategoriasComponent,
    UsuarioEditComponent,
    RegistrarCategoriaComponent,
    CategoriaEditComponent,
    DisfracesComponent,
    DisfrazEditComponent,
    DisfrazRegisterComponent,
    ArticulosComponent,
    ArticuloEditComponent,
    ArticuloRegisterComponent,
    CategoriasAddComponent,
    RolesUsuarioComponent,
    RolesComponent,
    RolesAddComponent,
    RolesUpdateComponent,
    ProductosComponent,
    GarantiasComponent,
    DataTableProductosComponent,
    ArticulosAddComponent,
    AlquilerComponent,
    DevolucionComponent,
    DisponibilidadComponent,
    ProbadorComponent,
    DisfracesListComponent,
    NosotrosComponent,
    ContactoComponent,
    ActualizarComponent,
    ReporteClientesComponent,
    IvaListComponent,
    ClientesComponent,
    ClienteEditComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    DataTablesModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    IdentityGuard,
    AdminGuard,
    CajeraGuard,
    MantenimientoGuard,
    UserService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
