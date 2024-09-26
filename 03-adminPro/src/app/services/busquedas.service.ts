import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

  private url: string = environment.base_url;

  get token():string{

    const token = localStorage.getItem('token') || '';
    return token;
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  transformarUsuario(resultado: any[]): Usuario[]{
    console.log('holaa');
    
    return resultado.map( (user) => new Usuario(user.nombre , user.email , '' , user.role , user.google , user.img , user.uid)
    );
  }


  buscar(tipo: 'usuarios'|'medicos'|'hospitales' , termino: string){
    const url = `${this.url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>( url , this.headers )
    .pipe(
      map( (resp: any) => {
        
          switch (tipo) {
            case 'usuarios':
              
              return this.transformarUsuario(resp.busqueda);
            default:
              return;
          }
      
        }
      )
    );
  }


}
