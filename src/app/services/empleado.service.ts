import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  selectedEmpleado: Empleado;
  empleado!: Empleado[];

  readonly URL_API = "http://localhost:8080/empleado";
  constructor(private http: HttpClient) {
    this.selectedEmpleado = new Empleado();
  }

  getEmpleado() {
    return this.http.get(this.URL_API);
  }
  postEmpleado(empleado: Empleado) {
    return this.http.post(this.URL_API, empleado);
  }
  putEmpleado(empleado: Empleado) {
    return this.http.put(this.URL_API + `/${empleado.id_empleado}`, empleado);
  }
  deleteEmpleado(id_empleado: string) {
    return this.http.delete(this.URL_API + `/${id_empleado}`);
  }
}
