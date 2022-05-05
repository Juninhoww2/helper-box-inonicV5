import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrenciesPage } from './currencies.page';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrenciesPageRoutingModule { }
