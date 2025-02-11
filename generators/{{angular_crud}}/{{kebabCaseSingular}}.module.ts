import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { {{classCaseSingular}}RoutingModule } from './{{kebabCaseSingular}}-routing.module';


@NgModule({
  declarations: [],
  imports: [CommonModule,{{classCaseSingular}}RoutingModule]
})
export class {{classCaseSingular}}Module { }
