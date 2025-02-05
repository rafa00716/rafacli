import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { {{classCase}}Service } from '../{{kebabCase}}.service';
import { {{classCase}}Interface } from '../{{kebabCase}}.interface';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '../../../utils/date-format';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { forkJoin } from 'rxjs';
import { DatalayerService } from '../../../services/datalayer.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { compareSamePropertys } from '../../../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-{{kebabCase}}-one',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
  templateUrl: './{{kebabCase}}-one.component.html',
  styleUrl: './{{kebabCase}}-one.component.scss',
})
export class {{classCase}}OneComponent implements OnInit {
  {{camelCase}}Form: FormGroup;
  {{camelCase}}Id: string | undefined;
  {{camelCase}}: {{classCase}}Interface | undefined;
  {{camelCase}}FormOriginal: Partial<{{classCase}}Interface> | undefined;
  submiting = false;
  error = null;
  private _snackBar = inject(MatSnackBar);
  constructor(
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private {{camelCase}}Service: {{classCase}}Service,
    private datalayerService: DatalayerService
  ) {
    const param = this.activateRouter.snapshot.paramMap.get('id');

    this.{{camelCase}}Form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
    });

    if (param) {
      this.{{camelCase}}Id = param;
      this.load{{classCase}}();
    }
  }

  loading() {
    return !this.cities || !this.services || (!this.isNew() && !this.{{camelCase}});
  }

  isNew() {
    return !this.{{camelCase}}Id;
  }

  load{{classCase}}() {
    if (!this.{{camelCase}}Id) {
      return;
    }

    this.{{camelCase}}Service.getOne(this.{{camelCase}}Id).subscribe({
      next: ({{camelCase}}) => {
        this.{{camelCase}} = {{camelCase}};
        this.{{camelCase}}Form.patchValue({...{{camelCase}}, cityId: {{camelCase}}.city.id});
        this.{{camelCase}}FormOriginal = this.{{camelCase}}Form.value;
      },
      error: (error) => {
        this.error = error;
        console.log({ error });
      },
    });
  }

  loadPreData() { }

  enableButtonSave() {
    return (
      !this.submiting &&
      !this.{{camelCase}}Form.invalid &&
      !compareSamePropertys(this.{{camelCase}}Form.value, this.{{camelCase}}FormOriginal)
    );
  }

  cancel() {
    this.router.navigate(['app/{{kebabCase}}']);
  }

  submit() {
    const value = this.{{camelCase}}Form.value;

    if (value.ci) {
      value.ci = value.ci.trim().replace(/\./g, "");
    }

    this.submiting = true;
    this.{{camelCase}}Form.disable();

    const action = this.isNew()
    ? this.{{camelCase}}Service.create(value)
    : this.{{camelCase}}Service.update(this.{{camelCase}}Id!, value);
    
    action.subscribe({
      next: (resp) => {
        this.submiting = false;
        this.cancel();
      },
      error: () => {
        this.submiting = false;
        this._snackBar.open('Create Fail','Cerrar');
      },
    });
  }

  ngOnInit(): void {
    this.loadPreData();

    if (!this.isNew()) {
      this.{{camelCase}}Form.controls['serviceId'].disable();
    }
  }
}
