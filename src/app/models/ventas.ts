export class Ventas {

  constructor(id_ventas= '', precio=0, fecha_compra: Date= new Date()){
    this.id_ventas = id_ventas;
    this.fecha_compra = fecha_compra;
    this.precio = precio;

}
id_ventas: string;
precio: number ;
fecha_compra: Date;


}

