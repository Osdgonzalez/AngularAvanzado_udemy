import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public imgUrl: string | undefined = '';

  public usuario!: Usuario | undefined;

  constructor(private usuarioService: UsuarioService) { 
    this.imgUrl = usuarioService.usuario?.imagenUrl;

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
