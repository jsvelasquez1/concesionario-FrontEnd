import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css'],
  providers: [VehiculoService]
})
export class VehiculoComponent {


  myForm!: FormGroup;

  constructor(public vehiculoService: VehiculoService, public fb: FormBuilder) {
    this.myForm = fb.group({
      matricula: new FormControl('', Validators.compose([Validators.required])),
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getVehiculoes();
  }

  getVehiculoes(){
    this.vehiculoService.getVehiculo().subscribe((res) =>{
      this.vehiculoService.vehiculo = res as Vehiculo[];
      // console.log(res);
    });
  }

  createVehiculo(form: NgForm){
    if(form.value.id_vehiculo){
      this.vehiculoService.putVehiculo(form.value).subscribe((res) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registro actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getVehiculoes();
      });
    }else{
      if(form.valid){
        this.vehiculoService.postVehiculo(form.value).subscribe((res) => {
          form.reset();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Nuevo registro agregado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getVehiculoes();
        });
      }else{
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

  updateVehiculo(vehiculo: Vehiculo){
    this.vehiculoService.selectedVehiculo = vehiculo;
    this.vehiculoService.putVehiculo(vehiculo);
  }

  deleteVehiculo(id_vehiculo: string){
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
        this.vehiculoService.deleteVehiculo(id_vehiculo).subscribe((res) => {
          this.getVehiculoes();
          Swal.fire('Eliminado!', 'Registro eliminado', 'success');
        });
      }
    });
  }


}
