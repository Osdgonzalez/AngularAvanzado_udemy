import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise( (resolve , reject) => {

    //   if (false) {
    //     resolve('Hola mundo desde resolve');
        
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });

    // promesa.then((msj) => {
    //   console.log(msj);
      
    // }).catch( (error) => console.log('Error: ' , error) )

    // console.log('Fin del mundo');
    
    this.getUsuarios().then(users => console.log(users));
  }


  getUsuarios(){


    return new Promise( resolve => {
        fetch('https://reqres.in/api/users?page=2').
        then(res => res.json()).
        then(body => resolve(body.data));
      } 
    );


  }

  

  

}
