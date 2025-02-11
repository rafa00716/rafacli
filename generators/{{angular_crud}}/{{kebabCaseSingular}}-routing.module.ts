import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { {{classCaseSingular}}ListComponent } from './{{kebabCaseSingular}}-list/{{kebabCaseSingular}}-list.component';
import { {{classCaseSingular}}OneComponent } from './{{kebabCaseSingular}}-one/{{kebabCaseSingular}}-one.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'prefix',
    redirectTo: 'list'
  },
  {
    path:'list',
    pathMatch: 'prefix',
    component: {{classCaseSingular}}ListComponent
  },
  {
    path: 'create',
    component: {{classCaseSingular}}OneComponent
  },
  {
    path: 'edit/:id',
    component: {{classCaseSingular}}OneComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class {{classCaseSingular}}RoutingModule { }
