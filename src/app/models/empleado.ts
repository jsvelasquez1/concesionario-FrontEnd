export class Empleado {

  constructor(id_empleado= '', nombre='', apellido='', cargo='', salario='', fecha_contrato: Date= new Date()){
    this.id_empleado = id_empleado;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cargo = cargo;
    this.salario = salario;
    this.fecha_contrato = fecha_contrato;
}
id_empleado: string;
nombre: string;
apellido: string;
cargo: string;
salario: string;
fecha_contrato: Date;

}
