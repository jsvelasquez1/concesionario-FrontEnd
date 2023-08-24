import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ventas } from '../models/ventas';

import { Vehiculo } from "../models/vehiculo";
import { Cliente } from "../models/cliente";
import { Empleado } from "../models/empleado";

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  selectedVentas: Ventas;
  ventas!: Ventas[];

  readonly URL_API = "http://localhost:8080/api/venta";
  constructor(private http: HttpClient) {
    this.selectedVentas = new Ventas();
  }

  readonly URL_API_EMPLEADOS = "http://localhost:8080/api/empleado"; // URL para obtener empleados
  readonly URL_API_CLIENTES = "http://localhost:8080/api/cliente"; // URL para obtener clientes
  readonly URL_API_VEHICULOS = "http://localhost:8080/api/vehiculo"; // URL para obtener vehículos

  
  // Nueva función para obtener lista de empleados
  getListaEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API_EMPLEADOS);
  }

  // Nueva función para obtener lista de clientes
  getListaClientes() {
    return this.http.get<Cliente[]>(this.URL_API_CLIENTES);
  }

  // Nueva función para obtener lista de vehículos
  getListaVehiculos() {
    return this.http.get<Vehiculo[]>(this.URL_API_VEHICULOS);
  }

  getVentas() {
    return this.http.get<Ventas[]>(this.URL_API);
  }
  postVentas(ventas: Ventas) {
    return this.http.post(this.URL_API, ventas);
  }
  putVentas(ventas: Ventas) {
    return this.http.put(this.URL_API + `/${ventas.id_venta}`, ventas);
  }
  deleteVentas(id_venta: string) {
    return this.http.delete(this.URL_API + `/${id_venta}`);
  }
}
