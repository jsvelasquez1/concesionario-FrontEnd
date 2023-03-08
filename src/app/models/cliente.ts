export class Cliente {
  constructor(id_cliente= '', nombre='', apellido='', cedula='', direccion='', telefono=0){
    this.id_cliente = id_cliente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.direccion = direccion;
    this.telefono = telefono;
}
id_cliente: string;
nombre: string;
apellido: string;
cedula: string;
direccion: string;
telefono: number;
}
