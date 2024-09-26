import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuaruios } from '../interfaces/cargar-usuarios.interface';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { }

  private url: string = environment.base_url;
  public usuario?: Usuario;

  get token():string{

    const token = localStorage.getItem('token') || '';
    return token;
  }

  get uid(): string{

    const uid = this.usuario?.uid || '';
    return uid;
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

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

  actualizarPerfil( data: {email: string , nombre: string , role: string} ){

    data = {
      ...data,
      role: this.usuario?.role || ''
    }

    return this.http.put(`${this.url}/usuarios/${this.uid}` , data , this.headers);
  }

  cambiarUsuario( usuario: Usuario ){

    return this.http.put(`${this.url}/usuarios/${usuario.uid}` , usuario , this.headers);
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
    

    return this.http.get(`${this.url}/login/renew` , { headers: { 'x-token': this.token } })
    .pipe(
      tap((resp: any) => {

        //Se crea un objeto de tipo usuario con la informacion del usuario que inicio sesion
        const { nombre , email , password , role , img = '' , google , uid } = resp.usuario;

        this.usuario = new Usuario(nombre , email , password , role , google , img , uid);

        console.log(resp);
        
        localStorage.setItem('token' , resp.token);
      }),
      map(resp => true),
      catchError( error => of(false) )
    );
  }

  cargarUsuarios( desde: number = 0 ){

    const url = `${this.url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuaruios>(url , this.headers).
      pipe(
        //delay(5000),
        map(resp => {
          console.log('resp cargar usuarios ' , resp.obj);
          //Fue necesario crear un objeto de instancia de clase(Usuario) para poder obtener url de la imagen
          const usuarios = resp.obj.map(user => 
              new Usuario(user.nombre , user.email, user.uid , '' , user.role , user.google , user.img ))

              console.log('usuarios cargar usuarios ' , resp.obj);
              console.log('usuarios cargar usuarios 2 ' , usuarios);
          return {
            total: resp.total,
            obj: usuarios
          }
        })
      );

  }

  eliminarUsuario(usuario: Usuario){
    const url = `${this.url}/usuarios/${usuario.uid}`;
    
    return this.http.delete(url , this.headers);
    
  }
}
