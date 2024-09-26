import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
    console.log(this.imgTemp);
    
    }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir , tipo , id).
    then((img) => {

        Swal.fire('Guardado' , 'Imagen de usuario actualizada con éxito' , 'success');
        this.cerrarModal();
        this.modalImagenService.banderaImagen.emit(img);
      }).catch(err => {
        Swal.fire('Error' , 'No se pudo actualizar la imagende perfil' , 'error');        
      })
  }

}
