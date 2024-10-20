import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit , OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public imgSubs?: Subscription;


  constructor(private medicoService: MedicosService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService
  ) { }
  ngOnDestroy(): void {
    
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.banderaImagen.pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarMedicos()
    });
  }

  cargarMedicos(){

    this.cargando = true;

    this.medicoService.cargarMedicos().subscribe(
      resp => {
        this.cargando = false;
        this.medicos = resp;
        this.medicosTemp = resp;
        console.log(this.medicos);
        
      }
    );

  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos' , medico._id! , medico.img);
  }

  buscar(termino: string ){

    if(termino.length === 0){
      this.medicos = this.medicosTemp;
      return;
    }

    this.busquedaService.buscar('medicos' , termino).subscribe(
      (resp)  => {
        
        this.medicos = resp as Medico[];
        return;
        // if(this.esHospital(resp)){
        //   this.hospitales = resp;
        //   return;
        //}

      }
    );
    
  }

  borrarMedico(medico: Medico){

    return Swal.fire({
      title: "¿Borrar médico?",
      text: `Esta seguro de borrar al médico ${medico.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.eliminarMedico(medico._id!).subscribe( (resp: any) => {

          this.cargarMedicos();

          Swal.fire({
            title: "Médico eliminado",
            text: `${resp.msg}:\n${medico.nombre}`,
            icon: "success"
          });
        });



      }
    });
  }

}
