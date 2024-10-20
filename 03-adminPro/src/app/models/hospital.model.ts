
interface _HospitalUser{
    _id: string,
    nombre: string,
    email: string
}

export class Hospital{

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser
    ){}
}