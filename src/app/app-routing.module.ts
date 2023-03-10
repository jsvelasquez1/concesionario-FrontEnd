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
import { LoginComponent } from './components/auth/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistroComponent } from './components/auth/registro.component';
import { AuthGuard as guard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'administrador',
    component: AdministradorComponent,
    canActivate: [guard], data:{expectedRol: ['admin']}
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [guard], data:{expectedRol: ['admin']} 
  },
  {
    path: 'vehiculo',
    component: VehiculoComponent,
    canActivate: [guard], data:{expectedRol: ['admin']}
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [guard], data:{expectedRol: ['admin']}
  },
  {
    path: 'empleado',
    component: EmpleadoComponent,
    canActivate: [guard], data:{expectedRol: ['admin']}
  },
  {
    path: 'proveedor',
    component: ProveedorComponent,
    canActivate: [guard], data:{expectedRol: ['admin']}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [guard], data:{expectedRol: ['user', 'admin']}
  },
  {
    path: 'registro',
    component: RegistroComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
