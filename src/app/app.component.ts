// eslint-disable-next-line import/named
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RatesService } from './services/rates.service';
import { FetchService } from './services/fetch.service';
import { Rates } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly ratesService: RatesService,
    private http: HttpClient,
    private fetchService: FetchService
  ) {}

  rates: Rates = {
    UAH: {
      UAH: 1,
      USD: 0,
      EUR: 0,
    },
    USD: {
      USD: 1,
      UAH: 0,
      EUR: 0,
    },
    EUR: {
      EUR: 1,
      UAH: 0,
      USD: 0,
    },
  };

  ngOnInit(): void {
    this.ratesService.rates$.subscribe((data) => console.log(data));
    this.fetchLatestRate('UAH');
    this.fetchPairRate('USD', 'EUR');
  }

  fetchLatestRate(base: string) {
    this.fetchService.fetchLatestRate(base).subscribe((response: any) => {
      this.setUAHRates(response);
      this.changeRates(this.rates);
      console.log('fetched');
    });
  }

  fetchPairRate(base: string, target: string) {
    this.fetchService.fetchPairRate(base, target).subscribe((response: any) => {
      this.setPairRates(response);
      this.changeRates(this.rates);
    });
  }

  setUAHRates(response: any) {
    this.rates['UAH']['USD'] = response.conversion_rates.USD;
    this.rates['UAH']['EUR'] = response.conversion_rates.EUR;
    this.rates['USD']['UAH'] = 1 / response.conversion_rates.USD;
    this.rates['EUR']['UAH'] = 1 / response.conversion_rates.EUR;
  }

  setPairRates(response: any) {
    this.rates['USD']['EUR'] = response.conversion_rate;
    this.rates['EUR']['USD'] = 1 / response.conversion_rate;
  }

  changeRates(rates: Rates) {
    this.ratesService.changeRates(rates);
  }
}
