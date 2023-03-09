import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  selectedCliente: Cliente;
  cliente!: Cliente[];

  readonly URL_API = "http://localhost:8080/api/cliente";
  cliente$: any;
  constructor(private http: HttpClient) {
    this.selectedCliente = new Cliente();
  }

  getCliente() {
    return this.http.get(this.URL_API);
  }
  postCliente(cliente: Cliente) {
    return this.http.post(this.URL_API, cliente);
  }
  putCliente(cliente: Cliente) {
    return this.http.put(this.URL_API + `/${cliente.id_cliente}`, cliente);
  }
  deleteCliente(id_cliente: string) {
    return this.http.delete(this.URL_API + `/${id_cliente}`);
  }


}
