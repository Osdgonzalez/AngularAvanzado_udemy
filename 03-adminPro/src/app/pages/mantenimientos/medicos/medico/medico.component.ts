import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicosService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['' , Validators.required],
      hospital: ['' , Validators.required]
    });
    
    this.activatedRoute.params.subscribe( ({id}) => {
      this.cargarMedicoPorId(id);

      
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe( hospitalId => {

      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId)!;

    } );
  }

  cargarHospitales(){
    
    this.hospitalService.cargarHospitales().subscribe(
      (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        
      }
    );

  }

  cargarMedicoPorId(idMedico: string){

    this.medicoService.cargarMedicoPorId(idMedico).
    pipe(
      delay(100)
    ).
    subscribe(medico => {

        const { nombre , hospital: {_id} } = medico;
      
        this.medicoSeleccionado = medico;
  
        this.medicoForm.setValue({ nombre , hospital: _id });
        return;
      

    }, (err) => {return this.router.navigateByUrl(`/dashboard/medicos`);});
  }

  guardarMedico(){


    if(this.medicoSeleccionado){


      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data).subscribe( (resp: any) => {

        console.log(resp);
        
        const { medico: {nombre , _id}} = resp;

        Swal.fire('Medico Actualizado' , `El médico ${nombre} se actualizó correctamente` , 'success');
        
      });
    }
    else{
      console.log('guardando medico!');
      
      this.medicoService.crearMedico(this.medicoForm.value).subscribe( (resp: any) => {
        
        const {nombre , _id} = resp.medicoDB;

        Swal.fire('Medico Creado' , `El médico ${nombre} se creo correctamente` , 'success');
        this.router.navigateByUrl(`/dashboard/medico/${_id}`);
        
      } );
    }

    
  }

}
