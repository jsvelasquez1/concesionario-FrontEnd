import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Automovil } from '../models/automovil';

@Injectable({
  providedIn: 'root'
})
export class AutomovilService {
  selectedAutomovil: Automovil;
  automoviles!: Automovil[];

  readonly URL_API = "http://localhost:8080/automovil";
  constructor(private http: HttpClient) {
    this.selectedAutomovil = new Automovil();
   }
   getAutomoviles() {
    return this.http.get(this.URL_API);
   }
   postAutomovil(automovil: Automovil){
    return this.http.post(this.URL_API, automovil);
   }
   putAutomovil(automovil: Automovil){
    return this.http.put(this.URL_API + `/${automovil.id_automovil}`, automovil);
   }
   deleteAutomovil(id_automovil: string){
    return this.http.delete(this.URL_API + `/${id_automovil}`);
   }
}
