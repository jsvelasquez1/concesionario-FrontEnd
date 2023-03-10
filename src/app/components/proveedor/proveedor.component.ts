import { Component } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [ProveedorComponent]
})
export class ProveedorComponent {


  validador: boolean;

  constructor(public proveedorService: ProveedorService){
    this.validador = false;
  }

  ngOnInit(): void {
    this.getProveedor();
  }



  getProveedor(){
    this.proveedorService.getProveedor().subscribe((res) =>{
      this.proveedorService.proveedor = res as Proveedor[];
      console.log(res);
    })
  }

  createProveedor(form: NgForm) {
    if(form.value.id_proveedor){
      this.proveedorService.putProveedor(form.value).subscribe((res) =>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registro actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getProveedor();
      });
    }else{
      if(form.valid){
        if(form.valid){
          this.proveedorService.postProveedor(form.value).subscribe((res) =>{
            form.reset();
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Nuevo registro agregado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getProveedor();
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

  updateProveedor(proveedor:Proveedor){
    this.proveedorService.selectedProveedor = proveedor;
    this.proveedorService.putProveedor(proveedor);
  }

  deleteProveedor(id_proveedor: string){
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
        this.proveedorService.deleteProveedor(id_proveedor).subscribe((res) => {
          this.getProveedor();
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
