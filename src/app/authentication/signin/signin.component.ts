import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private AuthenticationService: AuthenticationService,
    private router: Router

  ) { }

  ngOnInit(){
    this.initSigninForm();
  }


  initSigninForm(){
    this.signinForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitSigninForm(){
    const email = this.signinForm.get('email').value;
    const password= this.signinForm.get('password').value;
    this.AuthenticationService.signInUser(email, password).then(
      (data) => {

        this.router.navigate(['/admin', 'dashboard']);

      }
    ).catch(
      (error) => {
        window.alert(error);
      }
    );

    
  }




}
