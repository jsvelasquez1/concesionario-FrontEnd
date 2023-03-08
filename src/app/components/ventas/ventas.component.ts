import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Ventas } from 'src/app/models/ventas';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentasService]
})
export class VentasComponent {

  validador: boolean;

  constructor(public ventasService: VentasService){
    this.validador = false;
  }

  ngOnInit(): void {
    this.getVentas();
  }



  getVentas(){
    this.ventasService.getVentas().subscribe((res) =>{
      this.ventasService.ventas = res as Ventas[];
      console.log(res);
    })
  }

  createVentas(form: NgForm) {
    if(form.value.id_ventas){
      this.ventasService.putVentas(form.value).subscribe((res) =>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registro actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getVentas();
      });
    }else{
      if(form.valid){
        if(this.validador==true && form.valid){
          this.ventasService.postVentas(form.value).subscribe((res) =>{
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

  updateVentas(ventas:Ventas){
    this.ventasService.selectedVentas = ventas;
    this.ventasService.putVentas(ventas);
  }

  deleteVentas(id_ventas: string){
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
