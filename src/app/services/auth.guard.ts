import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  realRol!: string;

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'user';
    roles.forEach((rol: string) => {
      if (rol === 'ROLE_ADMIN'){
        this.realRol = 'admin';
      }
      console.log(rol);
    });

    if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1){
      if(this.realRol === "admin"){
        this.router.navigate(['/administrador']);
      }else{
        this.router.navigate(['/home']);
        
      }
      
      return false;
    }
    return true;
  }

    /*if(this.authService.loggeIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }*/
  }
