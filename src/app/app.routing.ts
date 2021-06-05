//import necesarios
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, CanActivate, ExtraOptions } from '@angular/router';


//importar componentes
import { LoginComponent } from './components/sistema/usuario/login/login.component';
import { RegisterComponent } from './components/sistema/usuario/register/register.component';
import { UsuariosComponent } from './components/sistema/usuario/usuarios/usuarios.component';
import { PaginaComponent } from './components/web/pagina/pagina.component';
import { IdentityGuard } from './services/identity.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BienvenidaComponent } from './components/sistema/bienvenida/bienvenida.component';
import { CategoriasComponent } from './components/sistema/categoria/categorias/categorias.component';
import { UsuarioEditComponent } from './components/sistema/usuario/edit/usuario-edit.component';
import { RegistrarCategoriaComponent } from './components/sistema/categoria/registrar-categoria/registrar-categoria.component';
import { CategoriaEditComponent } from './components/sistema/categoria/categoria-edit/categoria-edit.component';
import { DisfracesComponent } from './components/sistema/disfraz/disfraces/disfraces.component';
import { DisfrazRegisterComponent } from './components/sistema/disfraz/disfraz-register/disfraz-register.component';
import { DisfrazEditComponent } from './components/sistema/disfraz/disfraz-edit/disfraz-edit.component';
import { ArticulosComponent } from './components/sistema/articulo/articulos/articulos.component';
import { ArticuloRegisterComponent } from './components/sistema/articulo/articulo-register/articulo-register.component';
import { ArticuloEditComponent } from './components/sistema/articulo/articulo-edit/articulo-edit.component';
import { CategoriasAddComponent } from './components/sistema/disfraz/categorias-add/categorias-add.component';
import { RolesComponent } from './components/sistema/rol/roles/roles.component';
import { ProductosComponent } from './components/sistema/inventario/productos/productos.component';
import { GarantiasComponent } from './components/sistema/garantia/garantias/garantias.component';
import { RolesUpdateComponent } from './components/sistema/rol/roles-update/roles-update.component';
import { AlquilerComponent } from './components/sistema/alquiler/alquiler.component';
import { DevolucionComponent } from './components/sistema/devolucion/devolucion.component';
import { DisponibilidadComponent } from './components/sistema/disponibilidad/disponibilidad.component';
import { AdminGuard } from './services/admin.guard';
import { CajeraGuard } from './services/cajera.guard';
import { MantenimientoGuard } from './services/mantenimiento.guard';
import { DisfracesListComponent } from './components/web/disfraces-list/disfraces-list.component';
import { ProbadorComponent } from './components/web/probador/probador.component';
import { ActualizarComponent } from './components/sistema/garantia/actualizar/actualizar.component';
import { ReporteClientesComponent } from './components/sistema/reporte-clientes/reporte-clientes.component';
import { IvaListComponent } from './components/sistema/iva/iva-list/iva-list.component';
import { NosotrosComponent } from './components/web/nosotros/nosotros.component';
import { ContactoComponent } from './components/web/contacto/contacto.component';
import { ClientesComponent } from './components/sistema/cliente/clientes/clientes.component';
import { ClienteEditComponent } from './components/sistema/cliente/cliente-edit/cliente-edit.component';
import { ImprimirComponent } from './components/sistema/imprimir/imprimir.component';
import { ReporteArticulosComponent } from './components/sistema/reporte-articulos/reporte-articulos.component';


//definir las rutas
const appRoutes: Routes = [
    {path: '', component: PaginaComponent },
    {path: 'inicio', component: PaginaComponent },
    // usuarios
    {path: 'login', component: LoginComponent },
    {path: 'logout/:sure', component: LoginComponent },
    {path: 'administracion', component: BienvenidaComponent, canActivate: [IdentityGuard] },
    {path: 'registrar', component: RegisterComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'actualizar/:usuario', component: UsuarioEditComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'usuarios', component: UsuariosComponent, canActivate: [IdentityGuard,AdminGuard] },
    // categorias
    {path: 'categorias', component: CategoriasComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'registrar/categoria', component: RegistrarCategoriaComponent, canActivate: [IdentityGuard,AdminGuard] },    
    {path: 'actualizar/categoria/:id', component: CategoriaEditComponent, canActivate: [IdentityGuard,AdminGuard] },
    // disfraces
    {path: 'disfraces', component: DisfracesComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'registrar/disfraz', component: DisfrazRegisterComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'actualizar/disfraz/:id', component: DisfrazEditComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'categorias/disfraz/:id', component: CategoriasAddComponent, canActivate: [IdentityGuard,AdminGuard] },
    // articulos
    {path: 'articulos', component: ArticulosComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'registrar/articulo', component: ArticuloRegisterComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'actualizar/articulo/:id', component: ArticuloEditComponent, canActivate: [IdentityGuard,AdminGuard] },
    // roles
    {path: 'roles', component: RolesComponent, canActivate: [IdentityGuard] },
    // Garantia
    {path: 'garantias', component: GarantiasComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'actualizar/garantia/:id', component: ActualizarComponent, canActivate: [IdentityGuard,AdminGuard] },
    // Inventario
    {path: 'inventario', component: ProductosComponent, canActivate: [IdentityGuard,AdminGuard] },

    // Reportes
    {path: 'reporte/clientes', component: ReporteClientesComponent, canActivate: [IdentityGuard,AdminGuard] },
    {path: 'reporte/articulos', component: ReporteArticulosComponent, canActivate: [IdentityGuard,AdminGuard] },
    
    // alquiler
    {path: 'alquiler', component: AlquilerComponent, canActivate: [IdentityGuard,CajeraGuard] },
    {path: 'devolucion', component: DevolucionComponent, canActivate: [IdentityGuard,CajeraGuard] },
    {path: 'disponer', component: DisponibilidadComponent, canActivate: [IdentityGuard,MantenimientoGuard] },
    //Iva
    {path: 'iva', component: IvaListComponent, canActivate: [IdentityGuard,AdminGuard] },
    
    //CLIENTES
    {path: 'clientes', component: ClientesComponent, canActivate: [IdentityGuard,CajeraGuard] },
    {path: 'actualizar/cliente/:id', component: ClienteEditComponent, canActivate: [IdentityGuard,CajeraGuard] },
    
    // web disfraces
    {path: 'ver/disfraces/:categoriaId', component: DisfracesListComponent },
    {path: 'probar/disfraz/:disfrazId', component: ProbadorComponent },

    //Rutas de mover en pagina
    {path: 'nosotros', component: NosotrosComponent },
    {path: 'contacto', component: ContactoComponent },


    {path: 'pdf', component: ImprimirComponent },
    
    { path: '**', component: PageNotFoundComponent },
];

const routerOptions: ExtraOptions = {
    anchorScrolling: "enabled",
    scrollPositionRestoration: 'enabled'
}

//exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,routerOptions);