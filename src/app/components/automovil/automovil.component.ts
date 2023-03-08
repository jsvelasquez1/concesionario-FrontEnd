import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Automovil } from 'src/app/models/automovil';
import { AutomovilService } from 'src/app/services/automovil.service';
@Component({
  selector: 'app-automovil',
  templateUrl: './automovil.component.html',
  styleUrls: ['./automovil.component.css'],
  providers: [AutomovilService]
})
export class AutomovilComponent {

  myForm!: FormGroup;

  constructor(public automovilService: AutomovilService, public fb: FormBuilder) { 
    this.myForm = fb.group({
      matricula: new FormControl('', Validators.compose([Validators.required])),
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAutomoviles();
  }

  getAutomoviles(){
    this.automovilService.getAutomoviles().subscribe((res) =>{
      this.automovilService.automoviles = res as Automovil[];
      console.log(res);
    });
  }

  createAutomovil(form: NgForm){
    if(form.value.id_automovil){
      this.automovilService.putAutomovil(form.value).subscribe((res) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registro actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAutomoviles();
      }); 
    }else{
      if(form.valid){
        this.automovilService.postAutomovil(form.value).subscribe((res) => {
          form.reset();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Nuevo registro agregado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getAutomoviles();
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

  updateAutomovil(automovil: Automovil){
    this.automovilService.selectedAutomovil = automovil;
    this.automovilService.putAutomovil(automovil);
  }

  deleteAutomovil(id_automovil: string){
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
        this.automovilService.deleteAutomovil(id_automovil).subscribe((res) => {
          this.getAutomoviles();
          Swal.fire('Eliminado!', 'Registro eliminado', 'success');
        });
      }
    });
  }

}
