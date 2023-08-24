import { Vehiculo } from "./vehiculo";
import { Cliente } from "./cliente";
import { Empleado } from "./empleado";

export class Ventas {

  constructor(id_venta='', precio=0, fecha_compra: Date= new Date(), cliente_id='', vehiculo_id='', empleado_id=''){
    this.id_venta = id_venta;
    this.fecha_compra = fecha_compra;
    this.precio = precio;
    this.clienteId = cliente_id;
    this.vehiculoId = vehiculo_id;
    this.empleadoId = empleado_id;

}
id_venta: string;
precio: number ;
fecha_compra: Date;
clienteId: string;
vehiculoId: string;
empleadoId: string;
}

