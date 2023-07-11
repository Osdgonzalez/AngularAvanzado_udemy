import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {


  public linkTheme = document.querySelector('#theme');
  public selectors!: NodeListOf<Element>;

  constructor() { }

  ngOnInit(): void {
    this.selectors = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string){

    const url = `/assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href' , url);

    localStorage.setItem('theme' , url);

    this.checkCurrentTheme();
    
  }

  checkCurrentTheme(){

    this.selectors.forEach(value => {
      value.classList.remove('working');
      const btnTheme = value.getAttribute('data-theme');
      const btnThemeUrl = `/assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        value.classList.add('working');
        console.log('lo mismo');
        
      }
    });
  }

}
