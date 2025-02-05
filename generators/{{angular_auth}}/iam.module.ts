import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IamRoutingModule } from './iam-routing.module';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IamRoutingModule
  ],
})
export class IamModule { }
