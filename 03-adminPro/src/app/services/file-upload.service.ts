import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private url: string = environment.base_url;

  constructor() { }

  async actualizarFoto( archivo: File , 
                        tipo: 'usuarios' | 'medicos' | 'hospitales',
                        id: string ){

    try {

      const url = `${this.url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen' , archivo);

      const resp = await fetch(url , {
        method: 'PUT',
        headers: { 'x-token' : localStorage.getItem('token') || ''},
        body: formData
      });

      const data = await resp.json();

      if(data.ok){
        console.log(data);
        
        return data.nombreArchivo;
      }
      else{
        console.log(data.msg);
        return false
        
      }

      // console.log(data);
      // return true;
      
      
    } catch (error) {
      
      console.log(error);
      return false;
      
    }

  }
}
