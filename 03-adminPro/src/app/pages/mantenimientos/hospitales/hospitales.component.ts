import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy{

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs?: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService
  ) { }
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.cargandoHospitales();

    this.imgSubs = this.modalImagenService.banderaImagen.pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargandoHospitales()
    });
  }

  cargandoHospitales(){

    this.cargando = true;

    this.hospitalService.cargarHospitales().subscribe(resp => {

      this.hospitales = resp;
      this.hospitalesTemp = resp;
      this.cargando = false;
      console.log(resp);

    });
  }

  guardarCambios(hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital._id! , hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado' , hospital.nombre , 'success');
    });
  }

  eliminarHospital(hospital: Hospital){

    this.hospitalService.eliminarHospital(hospital._id!).subscribe(resp => {
      this.cargandoHospitales();
      Swal.fire('Eliminado' , hospital.nombre , 'success');
    });
  }

  async abrirModalSweetAlert(){

    const { value = '' } = await Swal.fire<string>({
      input: "text",
      title: "Crear Hospital",
      text: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: "Ingrese el nombre",
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });
    if (value!.trim().length > 0) {

      this.hospitalService.crearHospital(value!.trim())
      .subscribe( (resp : any) => {
        console.log(resp);
        this.hospitales.push(resp.msg);
        console.log(this.hospitales);
        
        
      } );

      Swal.fire(`Nuevo Hospital Creado` , value , 'success');
    }
  }

  abrirModal( hospital: Hospital ){
    this.modalImagenService.abrirModal('hospitales' , hospital._id! , hospital.img);
  }

  buscar(termino: string ){

    if(termino.length === 0){
      this.hospitales = this.hospitalesTemp;
      return;
    }

    this.busquedaService.buscar('hospitales' , termino).subscribe(
      (resp)  => {
        
        this.hospitales = resp as Hospital[];
        return;
        // if(this.esHospital(resp)){
        //   this.hospitales = resp;
        //   return;
        //}

      }
    );
    
  }

  //Para verificar si un valor devuelo es de algun tipo en especifico
  // esHospital(arr: Usuario[] | Hospital[] | undefined): arr is Hospital[]{

  //   return arr!.length > 0;
  // }


}
