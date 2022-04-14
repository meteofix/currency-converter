// eslint-disable-next-line import/named
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RatesService } from './services/rates.service';
import { FetchService } from './services/fetch.service';
import { Rates } from './interfaces/interfaces';
import { INITIAL_RATES } from './services/consts';

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

  rates: Rates = INITIAL_RATES;

  error: any;

  ngOnInit(): void {
    this.ratesService.rates$.subscribe({
      error: (err) => {
        console.error('ratesService() returned an error-card:', err);
      },
    });
    this.fetchLatestRate('UAH');
    this.fetchPairRate('USD', 'EUR');
  }

  fetchLatestRate(base: string) {
    this.fetchService.fetchLatestRate(base).subscribe({
      next: (response: any) => {
        this.setUAHRates(response);
        this.changeRates(this.rates);
      },
      error: (err) => {
        this.error = err;
        console.error('fetchLatestRate() returned an error-card:', err);
      },
    });
  }

  fetchPairRate(base: string, target: string) {
    this.fetchService.fetchPairRate(base, target).subscribe({
      next: (response: any) => {
        this.setPairRates(response);
        this.changeRates(this.rates);
      },
      error: (err) => {
        this.error = err;
        console.error('fetchPairRate() returned an error-card:', err);
      },
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
