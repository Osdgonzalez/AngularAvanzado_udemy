import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { }

  private url: string = environment.base_url;

  logout(){
    localStorage.removeItem('token');
    // this.router.navigateByUrl('/login');

    google.accounts.id.revoke('0skr159@gmail.com' , () => {
      
      this.ngZone.run(() => {

        this.router.navigateByUrl('/login');
      });
    })
  }


  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${this.url}/usuarios` , formData)
                    .pipe(
                      tap((resp: any) => {
                        localStorage.setItem('token' , resp.token);
                      })
                    );                      
    
  }

  login( formData: LoginForm){
    return this.http.post(`${this.url}/login` , formData)
                    .pipe(
                      tap((resp: any) => {
                        localStorage.setItem('token' , resp.token);
                      })
                    );
  }

  loginGoogle(tokenGoogle: any){

    return this.http.post(`${this.url}/login/google` , { token: tokenGoogle })
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token' , resp.token);
      })
    );

  }

  verificarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.url}/login/renew` , { headers: { 'x-token': token } })
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token' , resp.token);
      }),
      map(resp => true),
      catchError( error => of(false) )
    );
  }
}
