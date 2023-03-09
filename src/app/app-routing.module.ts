import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './components/administrador/administrador.component';
//components
import { ClienteComponent } from './components/cliente/cliente.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'administrador',
    component: AdministradorComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'vehiculo',
    component: VehiculoComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  },
  {
    path: 'empleado',
    component: EmpleadoComponent
  },
  {
    path: 'proveedor',
    component: ProveedorComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
