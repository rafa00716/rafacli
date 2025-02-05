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
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
resetForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);
  submiting = false;
  
  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private injector: Injector) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void { }

  navigateAuth(){
    this.router.navigate(['auth'])
  }

  onSubmit() {
    this.submiting = true;
    if (this.resetForm.valid) {
      const { email } = this.resetForm.value;
      this.authService.resetPassword(email).subscribe({
        next: () =>{
          this._snackBar.open('Password reset successfull');
          this.navigateAuth();
        },
        error: (error) => {
          console.log({ error });
          this.submiting = false;
          this._snackBar.open('Password reset failed');
        }
      })
    }
  }

}
