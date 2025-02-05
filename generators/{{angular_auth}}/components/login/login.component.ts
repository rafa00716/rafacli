import { Component, inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../../services/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);
  submiting = false;
  
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private injector: Injector) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.authService.currentUser()) {
      this.navigateApp();
    }

    if (this.authService.currentUser() === undefined) {
      this.authService.getProfile().subscribe({
        next: (profile) => {
          this.authService.currentUser.set(profile);
          setTimeout(() => {
            this.navigateApp();
          }, 3000);
        },
      })
    }
  }

  navigateApp(){
    this.router.navigate(['app'])
  }

  onSubmit() {
    this.submiting = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password })
      .then((profile)=>this.navigateApp())
      .catch(err=>this._snackBar.open('Logging failed'))
      .finally(()=>this.submiting = false);
    }
  }

  onForgotPassword() {
    this.router.navigate(['auth/reset-password'])
  }
}
