import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:any[] = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {titulo: 'Main' , url: '/'},
  //       {titulo: 'ProgressBar' , url: '/dashboard/progress'},
  //       {titulo: 'Graficas' , url: '/dashboard/grafica1'},
  //       {titulo: 'Promesas' , url: '/dashboard/promesas'},
  //       {titulo: 'Rxjs' , url: '/dashboard/rxjs'}
  //     ]
  //   },

  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios' , url: 'usuarios'},
  //       {titulo: 'Hospitales' , url: 'hospitales'},
  //       {titulo: 'Médicos' , url: 'medicos'}
  //     ]
  //   }
  // ]

  constructor() { }
}
