import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs?: Subscription;

  constructor(private usuarioServide: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuariosPaginacion();
    this.imgSubs = this.modalImagenService.banderaImagen.pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarUsuariosPaginacion()
    });
  }

  cargarUsuariosPaginacion(){

    this.cargando = true;
    this.usuarioServide.cargarUsuarios(this.desde).subscribe( ({total , obj}) => {
      
      this.totalUsuarios = total;
      this.usuarios = obj;
      this.usuariosTemp = obj;

      this.cargando = false;
    });
  }

  cambiarPagina( valor: number ){
    
    this.desde += valor

    if(this.desde < 0){
      this.desde = 0;
    }
    else if(this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }

    this.cargarUsuariosPaginacion();
  }

  buscar(termino: string){

    if(termino.length === 0){
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaService.buscar('usuarios' , termino).subscribe(
      (resp) => {

        this.usuarios = resp as Usuario[];
        return;
        // if(this.esUsuario(resp)){
        //   this.usuarios = resp!;
        //   return;
        // }
      }
    );
    
  }

  eliminarUsuario(usuario: Usuario){
    
    if(usuario.uid === this.usuarioServide.uid){
      return Swal.fire({
        title: 'Error',
        text: 'No puede eliminarse a si mismo',
        icon: 'error',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Regresar'
      });
    }

    return Swal.fire({
      title: "¿Borrar usuario?",
      text: `Esta seguro de borrar al usuario ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioServide.eliminarUsuario(usuario).subscribe( (resp: any) => {
          
          this.cargarUsuariosPaginacion();


          Swal.fire({
            title: "Usuario eliminado",
            text: `${resp.msj}. Usuario: ${usuario.nombre}`,
            icon: "success"
          });
        });



      }
    });
  }

  cambiarRol(usuario: Usuario){

    console.log('usuario rol actualizado: ' , usuario);
    

    this.usuarioServide.cambiarUsuario(usuario).subscribe(resp => {
      console.log(resp);
      
    });
  }

  abrirModal( usuario: Usuario ){
    this.modalImagenService.abrirModal('usuarios' , usuario.uid! , usuario.img);
  }

  // esUsuario(arr: Usuario[] | Hospital[] | undefined): arr is Usuario[]{

  //   return arr!.length > 0;
  // }


}
