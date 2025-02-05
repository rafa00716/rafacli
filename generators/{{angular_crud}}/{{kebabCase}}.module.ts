import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { {{classCase}}RoutingModule } from './{{kebabCase}}-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    {{classCase}}RoutingModule
  ]
})
export class {{classCase}}Module { }
