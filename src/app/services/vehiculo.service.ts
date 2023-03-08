import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  selectedVehiculo: Vehiculo;
  vehiculo!: Vehiculo[];

  readonly URL_API = "http://localhost:8080/vehiculo";
  constructor(private http: HttpClient) {
    this.selectedVehiculo = new Vehiculo();
  }

  getVehiculo() {
    return this.http.get(this.URL_API);
  }
  postVehiculo(vehiculo: Vehiculo) {
    return this.http.post(this.URL_API, vehiculo);
  }
  putVehiculo(vehiculo: Vehiculo) {
    return this.http.put(this.URL_API + `/${vehiculo.id_vehiculo}`, vehiculo);
  }
  deleteVehiculo(id_vehiculo: string) {
    return this.http.delete(this.URL_API + `/${id_vehiculo}`);
  }
}
