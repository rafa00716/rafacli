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
import { {{classCaseSingular}}Service } from '../{{kebabCaseSingular}}.service';
import { {{classCaseSingular}}Interface } from '../{{kebabCaseSingular}}.interface';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '../../../utils/date-format';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../../shared/shared.module';
import { compareSamePropertys } from '../../../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-{{kebabCaseSingular}}-one',
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
  templateUrl: './{{kebabCaseSingular}}-one.component.html',
  styleUrl: './{{kebabCaseSingular}}-one.component.scss',
})
export class {{classCaseSingular}}OneComponent implements OnInit {
  {{camelCaseSingular}}Form: FormGroup;
  {{camelCaseSingular}}Id: string | undefined;
  {{camelCaseSingular}}: {{classCaseSingular}}Interface | undefined;
  {{camelCaseSingular}}FormOriginal: Partial<{{classCaseSingular}}Interface> | undefined;
  submiting = false;
  error = null;
  private _snackBar = inject(MatSnackBar);
  entitySingularName = '{{camelCaseSingular}}';
  entityPluralName = '{{camelCasePlural}}';
  constructor(
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private {{camelCaseSingular}}Service: {{classCaseSingular}}Service,
  ) {
    const param = this.activateRouter.snapshot.paramMap.get('id');
    this.{{camelCaseSingular}}Id = param ?? undefined;
    this.{{camelCaseSingular}}Form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  loading() {
    return (!this.isNew() && !this.{{camelCaseSingular}});
  }

  isNew() {
    return !this.{{camelCaseSingular}}Id;
  }

  load{{classCaseSingular}}() {
    if (!this.{{camelCaseSingular}}Id) {
      return;
    }

    this.{{camelCaseSingular}}Service.getOne(this.{{camelCaseSingular}}Id).subscribe({
      next: ({{camelCaseSingular}}) => {
        this.{{camelCaseSingular}} = {{camelCaseSingular}};
        this.{{camelCaseSingular}}Form.patchValue({{camelCaseSingular}});
        this.{{camelCaseSingular}}FormOriginal = this.{{camelCaseSingular}}Form.value;
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
      !this.{{camelCaseSingular}}Form.invalid &&
      !compareSamePropertys(this.{{camelCaseSingular}}Form.value, this.{{camelCaseSingular}}FormOriginal)
    );
  }

  cancel() {
    this.router.navigate([`app/${this.entityPluralName}`]);
  }

  submit() {
    const value = this.{{camelCaseSingular}}Form.value;

    if (value.ci) {
      value.ci = value.ci.trim().replace(/\./g, "");
    }

    this.submiting = true;
    this.{{camelCaseSingular}}Form.disable();

    const action = this.isNew()
    ? this.{{camelCaseSingular}}Service.create(value)
    : this.{{camelCaseSingular}}Service.update(this.{{camelCaseSingular}}Id!, value);
    
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
      this.load{{classCaseSingular}}();
    }

  }
}
