import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleButton') googleButton!: ElementRef;
  
  public formSubmited: boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || 'hola@live.com.mx' , [ Validators.required , Validators.email ] ],
    password: [ '12345' , Validators.required ],
    remember: [ false ]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
    this.googleSigIn();

  }

  googleSigIn(){

    google.accounts.id.initialize({
      client_id: "841311656061-tbu3ordbnu7l64ohembtbpo026qsnh3v.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleButton.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog

  }

  handleCredentialResponse( response: any ){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe(resp => {
      console.log(resp);

      this.ngZone.run( () => {
        
        this.router.navigateByUrl('/dashboard');
      } );
    })
  }

  login(){

    this.formSubmited = true;

    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {

      if( this.loginForm.get('remember')!.value ){
        localStorage.setItem('email' , this.loginForm.get('email')!.value);
      }
      else{
        localStorage.removeItem('email');
      }
      console.log(resp);
      this.router.navigateByUrl('/dashboard');
      
    } , (err) => {
      Swal.fire('Error' , err.error.msg , 'error');
    }); 

    // this.router.navigateByUrl('/dashboard')
    
  }

}
