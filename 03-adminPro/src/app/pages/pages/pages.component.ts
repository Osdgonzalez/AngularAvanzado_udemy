import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { SidebarService } from 'src/app/services/sidebar.service';

declare function customInitFunction():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService, 
              private sideBarService: SidebarService
  ) { }

  ngOnInit(): void {
    customInitFunction();
    this.sideBarService.cargarMenu();
  }

}
