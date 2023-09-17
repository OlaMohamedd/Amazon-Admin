import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/Services/login-auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginAuthService: LoginAuthService,
    private router:Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required , Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.loginAuthService.login(email, password).subscribe({
        next: (success) => {
          if (success) {
            console.log('Sign-in successful');
            this.router.navigate(['/dashboard']);
          } else {
            console.log('Invalid email or password');
            alert('Invalid email or password');
          }
        },
        error: (error) => {
          console.log('An error occurred during sign-in:', error);
        }
      });
    }
  }
}