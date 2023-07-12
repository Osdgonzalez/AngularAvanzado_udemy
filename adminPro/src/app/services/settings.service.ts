import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');


  constructor() { 
    const themeLs = localStorage.getItem('theme') || '/assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href' , themeLs);
    
  }

  changeTheme(theme: string){

    const url = `/assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href' , url);

    localStorage.setItem('theme' , url);

    this.checkCurrentTheme();
    
  }

  checkCurrentTheme(){

    const selectors = document.querySelectorAll('.selector');

    selectors.forEach(value => {
      value.classList.remove('working');
      const btnTheme = value.getAttribute('data-theme');
      const btnThemeUrl = `/assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        value.classList.add('working');
        
      }
    });
  }
}
