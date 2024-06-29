import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  public imgUrl: string | undefined = '';

  public usuario!: Usuario | undefined;

  constructor(private sideBarService: SidebarService,
              private usuarioService: UsuarioService) 
    {
      this.menuItems = this.sideBarService.menu;
      console.log(this.menuItems);
      
      // this.imgUrl = usuarioService.usuario?.imagenUrl;
      this.usuario = usuarioService.usuario;

   }

  ngOnInit(): void {
  }

}
