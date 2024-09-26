import { environment } from "../../environments/environment";

const base_url = environment.base_url;


export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public uid: string,
        public password?: string,
        public role?: string,
        public google?: boolean,
        public img?: string
    ){}

    get imagenUrl() {
        
        if(!this.img){
            return `${ base_url }/upload/usuarios/no-image`;
        }
        //Para leer y retornar la imagen de una cuenta creada con Google
        else if( this.img?.includes('https') ){
            return this.img;
        }
        else if(this.img){
            return `${ base_url }/upload/usuarios/${ this.img }`;
        }
        else{
            return `${ base_url }/upload/usuarios/no-image`;
        }

    }
}