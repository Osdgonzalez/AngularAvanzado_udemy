import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

interface ApiResponse{
  hospitales: Hospital[],
  ok: boolean
}

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(){

    const url = `${base_url}/hospitales`;

    return this.http.get<ApiResponse>(url , this.headers).
    pipe(
      map((response: ApiResponse) => {
        return response.hospitales;
      })
    );

  }

  crearHospital(nombre: string){

    const url = `${base_url}/hospitales`;

    return this.http.post(url , {nombre} ,  this.headers);

  }

  actualizarHospital(_id: string , nombre: string){

    const url = `${base_url}/hospitales/${_id}`;

    return this.http.put(url , {nombre} ,  this.headers);

  }

  eliminarHospital(_id: string){

    console.log('servicio eliminar hospital' + _id);
    

    const url = `${base_url}/hospitales/${_id}`;

    return this.http.delete(url , this.headers);

  }
}
