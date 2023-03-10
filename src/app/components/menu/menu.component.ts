import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;


  constructor(private tokenService: TokenService) { }

  

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Cerraste sesión',
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload();
  }

}
