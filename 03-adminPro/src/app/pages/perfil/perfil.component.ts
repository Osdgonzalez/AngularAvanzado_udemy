import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, 
              private userService: UsuarioService , 
              private fileUploadService: FileUploadService) { 

    this.usuario = userService.usuario!;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre , Validators.required],
      email: [this.usuario.email , [Validators.required , Validators.email]],
    });

  }

  actualizarPerfil(){
    this.userService.actualizarPerfil(this.perfilForm.value).
    subscribe( () => {

      /*Aunque se modifique el usuario local (perfil.component) tambien modifica al usuario que esta en Usuario.service
        Esto es posible gracias a la propiedad singleton que manejan los servicios de angular*/
      const { nombre , email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado' , 'Los cambios fueron guardados con éxito' , 'success');
    },
    (err) => {
      
      Swal.fire('Error' , err.error.msg , 'error');
      console.log(err);
      
    });
    
  }

  cambiarImagen(file: File){

    this.imagenSubir = file;

    if( !file ){ 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log( reader.result );
      
    }
    return true;
  }

  subirImagen(){

    this.fileUploadService.actualizarFoto(this.imagenSubir , 'usuarios' , this.usuario.uid!).
    then((img) => {

        this.usuario.img = img;
        Swal.fire('Guardado' , 'Imagen de usuario actualizada con éxito' , 'success');
      }).catch(err => {
        Swal.fire('Error' , 'No se pudo actualizar la imagende perfil' , 'error');        
      })
  }

}
