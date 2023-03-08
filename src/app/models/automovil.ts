export class Automovil {
    constructor(id_automovil= '', matricula='', marca='', modelo='', color='', precio=''){
        this.id_automovil = id_automovil;
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.precio = precio;
    }
    id_automovil: string;
    matricula: string;
    marca: string;
    modelo: string;
    color: string;
    precio: string;
}
