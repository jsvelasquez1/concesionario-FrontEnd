import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadoComponent {

  validador: boolean;

  constructor(public empleadoService: EmpleadoService){
    this.validador = false;
  }

  ngOnInit(): void {
    this.getEmpleado();
  }



  getEmpleado(){
    this.empleadoService.getEmpleado().subscribe((res) =>{
      this.empleadoService.empleado = res as Empleado[];
      console.log(res);
    })
  }

  createEmpleado(form: NgForm) {
    if(form.value.id_empleado){
      this.empleadoService.putEmpleado(form.value).subscribe((res) =>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registro actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getEmpleado();
      });
    }else{
      if(form.valid){
        if(form.valid){
          this.empleadoService.postEmpleado(form.value).subscribe((res) =>{
            form.reset();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Nuevo registro agregado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getEmpleado();
          });
        }else {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Cédula incorrecta',
            showConfirmButton: false,
            timer: 1500,
          });
        }
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

  updateEmpleado(empleado:Empleado){
    this.empleadoService.selectedEmpleado = empleado;
    this.empleadoService.putEmpleado(empleado);
  }

  deleteEmpleado(id_empleado: string){
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
        this.empleadoService.deleteEmpleado(id_empleado).subscribe((res) => {
          this.getEmpleado();
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

  validadorDeCedula(form: NgForm){
    let cedulaCorrecta = false;
    if (form.value.cedula.length == 10) {
      let tercerDigito = parseInt(form.value.cedula.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(form.value.cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < form.value.cedula.length - 1; i++) {
          digito = parseInt(form.value.cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += parseInt((digito % 10) + '') + parseInt(digito / 10 + '');
          //      console.log(suma+" suma"+coefValCedula[i]);
        }

        suma = Math.round(suma);

        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);

        if (
          Math.round(suma % 10) == 0 &&
          Math.round(suma % 10) == verificador
        ) {
          cedulaCorrecta = true;
        } else if (10 - Math.round(suma % 10) == verificador) {
          cedulaCorrecta = true;
        } else {
          cedulaCorrecta = false;
        }
      } else {
        cedulaCorrecta = false;
      }
    } else {
      cedulaCorrecta = false;
    }
    this.validador = cedulaCorrecta;
  }

}
