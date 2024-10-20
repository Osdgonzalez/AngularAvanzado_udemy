import { Hospital } from "./hospital.model";

interface _UsuarioUser{
    _id: string,
    nombre: string,
    img?: string
}

export class Medico{
   constructor(

       public nombre: string,
       public _id?: string,
       public usuario?: _UsuarioUser,
       public hospital?: Hospital,
       public img?: string
   ){} 
}