import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrenciesPageRoutingModule } from './currencies-routing.module';

import { CurrenciesPage } from './currencies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrenciesPageRoutingModule
  ],
  declarations: [CurrenciesPage]
})
export class CurrenciesPageModule {}
