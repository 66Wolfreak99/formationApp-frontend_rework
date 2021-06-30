import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading = true;
    const firstName = this.signupForm.get('firstName').value;
    const lastName = this.signupForm.get('lastName').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.auth.createNewUser(firstName, lastName,email, password).then(
      () => {
        this.router.navigate(['/projects'])
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
