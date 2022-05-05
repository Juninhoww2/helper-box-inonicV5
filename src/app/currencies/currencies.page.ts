import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../../services/currencyApi.service';
import { Currency } from '../dtos/ICurrency';
import { SearchValues } from '../dtos/ISearchValues';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.page.html',
  styleUrls: ['./currencies.page.scss'],
})
export class CurrenciesPage implements OnInit {

  public currencies: Currency[] = [];
  public newCurrency: Currency[] = [];

  constructor(private currencyApi: CurrencyApiService) { }

  ngOnInit() {
    this.callLoadCurrencies();
    this.defaultValues();
  }

  // Chama o método da requisição da API de cotação de moedas

  async callLoadCurrencies() {
    await this.currencyApi.loadCurrencies()
      .then(response => {
        this.currencies = Object.keys(response)
          .map(e => response[e]);
      });
  }

  // Calcula quanto custa o real em moedas estrangeiras

  searchValues(brazilianRealValue: SearchValues) {

    const real = brazilianRealValue.brazilianRealValue;

    const bids = this.newCurrency.map(item => {
      console.log(item.bid);
      return (Number(item.bid) * Number(real)).toFixed(2);
    });

    // Gera os valores convertidos e adiciona em currencies
    this.currencies.map((item, index) => item.bid = bids[index]);
  }

  async defaultValues() {
    await this.currencyApi.loadCurrencies()
      .then(response => {
        this.newCurrency = Object.keys(response)
          .map(e => response[e]);
      });
  }



}
