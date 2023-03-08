export class Proveedor {

  constructor(id_proveedor= '', nombre='', direccion='', num_telefono=0){
    this.id_proveedor = id_proveedor;
    this.nombre = nombre;
    this.direccion = direccion;
    this.num_telefono = num_telefono;
}
id_proveedor: string;
nombre: string;
direccion: string;
num_telefono: number;
}
