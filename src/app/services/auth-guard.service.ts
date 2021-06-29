import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate{

    constructor(private router: Router, private authService: AuthService){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot
        ): Observable<boolean>{
        return Observable.create(
            (observer) => {
                this.authService.isAuth$.subscribe(
                    (auth) => {
                      if (!auth){
                        this.router.navigate(['/login'])
                      }
                      observer.next(true)  
                    }
                )
            }
        )
    }

  }