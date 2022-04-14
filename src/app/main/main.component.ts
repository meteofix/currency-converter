// eslint-disable-next-line import/named
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RatesService } from '../services/rates.service';
import { Currency, Rates } from '../interfaces/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private readonly ratesService: RatesService) {}

  rates: Rates = {};

  currencies: Currency[] = [
    {
      value: 'UAH',
      viewValue: 'Ukrainian Hryvnia ',
      logo: 'assets/images/flags/UAH.svg',
    },
    {
      value: 'USD',
      viewValue: 'US Dollar',
      logo: 'assets/images/flags/USD.svg',
    },
    {
      value: 'EUR',
      viewValue: 'Euro',
      logo: 'assets/images/flags/EUR.svg',
    },
  ];

  firstCounter = 1;

  secondCounter = 0;

  firstSelectedCurrency: Currency = this.currencies[1];

  secondSelectedCurrency: Currency = this.currencies[0];

  firstCurrencyControl = new FormControl(this.firstSelectedCurrency.value);

  secondCurrencyControl = new FormControl(this.secondSelectedCurrency.value);

  ngOnInit(): void {
    this.ratesService.rates$.subscribe((rates) => {
      this.rates = rates;
      this.setSecondCounter();
    });
  }

  setFirstCounter() {
    this.firstCounter = +this.calculateCurrency(
      this.secondCounter,
      this.secondSelectedCurrency.value,
      this.firstSelectedCurrency.value
    ).toFixed(2);
  }

  setSecondCounter() {
    this.secondCounter = +this.calculateCurrency(
      this.firstCounter,
      this.firstSelectedCurrency.value,
      this.secondSelectedCurrency.value
    ).toFixed(2);
  }

  setFirstSelectedCurrency() {
    this.firstSelectedCurrency = this.currencies.find(
      (item) => item.value === this.firstCurrencyControl.value
    ) as Currency;
  }

  setSecondSelectedCurrency() {
    this.secondSelectedCurrency = this.currencies.find(
      (item) => item.value === this.secondCurrencyControl.value
    ) as Currency;
  }

  switchHandler() {
    this.firstCounter = this.secondCounter;
    this.setSecondCounter();
  }

  calculateCurrency(count: number, base: string, target: string): number {
    return count * this.rates[base][target];
  }
}
