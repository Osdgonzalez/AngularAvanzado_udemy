import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs!: Subscription;

  constructor() { 
    
    
    // this.retornaObservable().pipe(
    //   retry(2)//Volver a intentar ejecutar el observable
    // )
    // .subscribe( valor => {
    //   console.log('Subs: ' + valor);
      
    // },
    // err => console.warn(err),
    // () => console.log('Obs completado'));

    this.intervalSubs = this.retornaIntervalo().
        subscribe(console.log);

   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaObservable(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>( observer => {
      
      const intervalo = setInterval(() => {
        
        i++;
        //emitir un valor del observable
        observer.next(i);

        if(i == 4){

          clearInterval(intervalo); //Detener el interval
          observer.complete(); // Detener la ejecución del observable
        }

        if(i === 2){
          
          observer.error('contador llego al 2'); //Emitir error del observable
        }
        
      } , 1000);

    });

    return obs$;
  }

  retornaIntervalo(): Observable<number>{

    return interval(100).pipe(
      // take(10),
      map( valor => valor + 1 ),
      filter(valor => (valor % 2 === 0 ) ? true : false ),

    );
  }

}
