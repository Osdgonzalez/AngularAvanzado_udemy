import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private fb: FormBuilder, 
               private usuarioService: UsuarioService,
               private router: Router ) { }

  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['Oscar' , Validators.required],
    email: ['test100@gmail.com' , [ Validators.required , Validators.email ]],
    password: ['12345' , Validators.required],
    password2: ['12345' , Validators.required],
    terminos: [false , [Validators.required , Validators.requiredTrue]],

  } , {
    //Si se crea una vlaidacion aqui, dicha validacion debe regresar una funcion obligatoriamente
    validators: this.passwordIguales( 'password' , 'password2' )
  });

  ngOnInit(): void {
  }

  crearUsuario(){

    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid ){
      return;
    }

    //Realizar posteo
    this.usuarioService.crearUsuario( this.registerForm.value ).subscribe((resp) => {
      console.log(resp);
      this.router.navigateByUrl('/dashboard')
      
    } , (err) => {

      Swal.fire('Error' , err.error.msg , 'error');
      
    });
    
    
  }

  //Validaciones
  campoNoValido( campo: string ): boolean{

    if( this.registerForm.get(campo)?.invalid && this.formSubmitted ){
      return true;
    }
    else{
      return false;
    }

  }

  aceptarTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( pass1 === pass2 ){;
      
      return false;
    }
    else{;
      
      return true;
    }
  }

  passwordIguales( pass1Name: string , pass2Name: string){

    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
  
      if( (pass1Control?.value !== pass2Control?.value) && this.formSubmitted ){
        pass2Control?.setErrors({ NoSonIguales: true });
      }
      else{
        pass2Control?.setErrors(null);
      }
    }
  }



  //Fin Validaciones

}
