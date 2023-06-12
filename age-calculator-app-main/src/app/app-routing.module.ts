import { Route, RouterModule } from '@angular/router';

import { AgeFormComponent } from './age-form/age-form.component';
import { NgModule } from '@angular/core';

const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./age-form/age-form.component').then(
        (mod) => mod.AgeFormComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
