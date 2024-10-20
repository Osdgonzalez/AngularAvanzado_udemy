import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs';

interface ApiResponse{
  medicos: Medico[],
  ok: boolean
}

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient) { }

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

  cargarMedicos(){

    const url = `${base_url}/medicos`;

    return this.http.get<ApiResponse>(url , this.headers).
    pipe(
      map((response: ApiResponse) => {
        console.log(response);
        
        return response.medicos;
      })
    );

  }

  cargarMedicoPorId(id : string){

    const url = `${base_url}/medicos/${id}`;

    return this.http.get<any>(url , this.headers).
    pipe(
      map((response: any) => {
        console.log(response);
        
        return response.medico;
      })
    );

  }

  crearMedico(medico: {nombre: string , hospital: string}){

    const url = `${base_url}/medicos`;

    return this.http.post(url , medico ,  this.headers);

  }

  actualizarMedico(medico: Medico){
    
    const url = `${base_url}/medicos/${medico._id}`;

    return this.http.put(url , medico ,  this.headers);

  }

  eliminarMedico(_id: string){
    

    const url = `${base_url}/medicos/${_id}`;

    return this.http.delete(url , this.headers);

  }

}
