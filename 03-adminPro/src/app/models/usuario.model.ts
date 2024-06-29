import { environment } from "../../environments/environment";

const base_url = environment.base_url;


export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public role?: string,
        public google?: boolean,
        public img?: string,
        public uid?: string,
    ){}

    get imagenUrl() {
        
        //Para leer y retornar la imagen de una cuenta creada con Google
        if( this.img?.includes('https') ){
            return this.img;
        }


        if(this.img){
            return `${ base_url }/upload/usuarios/${ this.img }`;
        }
        else{
            return `${ base_url }/upload/usuarios/no-image`;
        }

    }
}