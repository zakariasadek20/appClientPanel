import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private ofAuth: AngularFireAuth,
    private route: Router,
    ){}

  canActivate():Observable<boolean> {
       
    return this.ofAuth.authState.pipe(map(auth => {
       if(!auth){
         this.route.navigate(['/login'])
         return false;
       }else{
         return true;
       }
    }))
    }
  
}
