import { Component, inject, Injector, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent implements OnInit {

  createPasswordForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);
  submiting = false;
  token!: string | null;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public authService: AuthService,
    private injector: Injector
  ) {
    this.createPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.token = this.activateRouter.snapshot.paramMap.get('token');
    if (!this.token) {
      this.router.navigate(['auth']);
    }
  }

  navigateAuth() {
    this.router.navigate(['auth']);
  }

  onSubmit() {
    this.submiting = true;
    if (this.createPasswordForm.valid) {
      const { email, password } = this.createPasswordForm.value;
      const token = this.token;
      if (!token) {
        this.router.navigate(['auth']);
        return;
      }
  
      this.authService.createPassword({ email, password, token }).subscribe({
        next: () =>{
          this._snackBar.open('Password created successfull');
          this.navigateAuth();
        },
        error: (error) => {
          console.log({ error });
          this._snackBar.open('Password create failed');
          this.submiting = false
        }
      })
    }
  }
}
