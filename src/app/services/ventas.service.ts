import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Ventas } from '../models/ventas';

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

  getVentas() {
    return this.http.get(this.URL_API);
  }
  postVentas(ventas: Ventas) {
    return this.http.post(this.URL_API, ventas);
  }
  putVentas(ventas: Ventas) {
    return this.http.put(this.URL_API + `/${ventas.id_ventas}`, ventas);
  }
  deleteVentas(id_ventas: string) {
    return this.http.delete(this.URL_API + `/${id_ventas}`);
  }
}
