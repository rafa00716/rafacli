import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { {{camelCaseSingular}}RoutingModule } from './{{kebabCaseSingular}}-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    {{camelCaseSingular}}RoutingModule
  ]
})
export class {{camelCaseSingular}}Module { }
