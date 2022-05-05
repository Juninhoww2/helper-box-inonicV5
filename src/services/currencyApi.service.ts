import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Currency {
    name: string;
    bid: string;
    ask: string;
}

@Injectable({
    providedIn: 'root',
})

export class CurrencyApiService {

    public currencies: any[];
    private currencyApiUrl = 'https://economia.awesomeapi.com.br/json/all/USD-BRL,EUR-BRL,GBP-BRL';


    constructor(private http: HttpClient) {
        this.currencies = [];
    }

    loadCurrencies() {
        return this.http.get<Currency[]>(this.currencyApiUrl).toPromise();
    }

}
