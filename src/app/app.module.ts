import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { HomeComponent } from './home/home.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistroComponent } from './components/auth/registro.component';
import { LoginComponent } from './components/auth/login.component';
import { ToastrModule } from 'ngx-toastr';
import { interceptorProvider } from './services/prod-interceptor.service';
import { AuthGuard } from './services/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    VehiculoComponent,
    HomeComponent,
    AdministradorComponent, EmpleadoComponent,
    VentasComponent, ProveedorComponent, LoginComponent, UsuarioComponent, MenuComponent,RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard, 
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
