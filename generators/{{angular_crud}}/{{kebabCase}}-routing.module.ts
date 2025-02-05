import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { {{classCase}}ListComponent } from './{{kebabCase}}-list/{{kebabCase}}-list.component';
import { {{classCase}}OneComponent } from './{{kebabCase}}-one/{{kebabCase}}-one.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'prefix',
    redirectTo: 'list'
  },
  {
    path:'list',
    pathMatch: 'prefix',
    component: {{classCase}}ListComponent
  },
  {
    path: 'create',
    component: {{classCase}}OneComponent
  },
  {
    path: 'edit/:id',
    component: {{classCase}}OneComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class {{classCase}}RoutingModule { }
