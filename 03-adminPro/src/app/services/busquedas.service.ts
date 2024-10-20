import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  transformarHospital(resultado: any[]): Hospital[]{
    
    return resultado.map( (hospital) => new Hospital(hospital.nombre , hospital._id , hospital.img , hospital.usuario)
    );
  }

  transformarMedico(resultado: any[]): Medico[]{
    
    return resultado.map( (medico) => new Medico(medico.nombre , medico._id , medico.usuario , medico.hospital , medico.img)
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
              
            case 'hospitales':

              return this.transformarHospital(resp.busqueda);

            case 'medicos':

              return this.transformarMedico(resp.busqueda);
            default:
              return [];
          }
      
        }
      )
    );
  }





}
