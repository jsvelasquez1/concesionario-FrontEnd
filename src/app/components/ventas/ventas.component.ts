import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Ventas } from 'src/app/models/ventas';
import { VentasService } from 'src/app/services/ventas.service';

import { Vehiculo } from '../../models/vehiculo';
import { Cliente } from '../../models/cliente';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentasService],
})
export class VentasComponent {
  validador: boolean;

  constructor(public ventasService: VentasService) {
    this.validador = false;
  }

  listaEmpleados: Empleado[] = [];
  listaClientes: Cliente[] = [];
  listaVehiculos: Vehiculo[] = [];

  ngOnInit(): void {
    this.getVentas();

    this.ventasService.getListaEmpleados().subscribe(
      (empleados: Empleado[]) => {
        this.listaEmpleados = empleados;
      },
      (error) => {
        console.error(error);
      }
    );

    this.ventasService.getListaClientes().subscribe(
      (clientes: Cliente[]) => {
        this.listaClientes = clientes;
      },
      (error) => {
        console.error(error);
      }
    );

    this.ventasService.getListaVehiculos().subscribe(
      (vehiculos: Vehiculo[]) => {
        this.listaVehiculos = vehiculos;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getNombreEmpleado(empleadoId: string): string {
    const empleado = this.listaEmpleados.find(
      (e) => e.id_empleado === empleadoId
    );
    return empleado ? empleado.nombre : '';
  }

  getNombreCliente(clienteId: string): string {
    const cliente = this.listaClientes.find((c) => c.id_cliente === clienteId);
    return cliente ? cliente.nombre : '';
  }

  getNombreVehiculo(vehiculoId: string): string {
    const vehiculo = this.listaVehiculos.find(
      (v) => v.id_vehiculo === vehiculoId
    );
    return vehiculo ? vehiculo.modelo : '';
  }

  getVentas() {
    this.ventasService.getVentas().subscribe((res) => {
      this.ventasService.ventas = res as Ventas[];
      console.log(res);
    });
  }

  createVentas(form: NgForm) {
    if (form.value.id_ventas) {
      this.ventasService.selectedVentas.clienteId = form.value.cliente;
      this.ventasService.selectedVentas.empleadoId = form.value.empleado;
      this.ventasService.selectedVentas.vehiculoId = form.value.vehiculo;
      this.ventasService.putVentas(form.value).subscribe((res) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registro actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getVentas();
      });
    } else {
      if (form.valid) {
        if (form.valid) {
          this.ventasService.selectedVentas.clienteId = form.value.cliente;
          this.ventasService.selectedVentas.empleadoId = form.value.empleado;
          this.ventasService.selectedVentas.vehiculoId = form.value.vehiculo;
          console.log(form.value);
          this.ventasService.postVentas(form.value).subscribe((res) => {
            form.reset();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Nuevo registro agregado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getVentas();
          });
        } else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Cédula incorrecta',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Llene todos todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  updateVentas(ventas: Ventas) {
    this.ventasService.selectedVentas = ventas;
    this.ventasService.putVentas(ventas);
  }

  deleteVentas(id_ventas: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este registro se eliminará completamente',
      position: 'top',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventasService.deleteVentas(id_ventas).subscribe((res) => {
          this.getVentas();
          Swal.fire('Eliminado!', 'Registro eliminado', 'success');
        });
      }
    });
  }

  resetForm(form: NgForm) {
    form.reset();
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Formulario limpiado',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
