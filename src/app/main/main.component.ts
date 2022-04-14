// eslint-disable-next-line import/named
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RatesService } from '../services/rates.service';
import { Currency, Rates } from '../interfaces/interfaces';
import {
  CURRENCIES,
  INITIAL_FIRST_COUNTER,
  INITIAL_FIRST_CURRENCY_INDEX,
  INITIAL_RATES,
  INITIAL_SECOND_COUNTER,
  INITIAL_SECOND_CURRENCY_INDEX,
} from '../services/consts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private readonly ratesService: RatesService) {}

  rates: Rates = INITIAL_RATES;

  currencies: Currency[] = CURRENCIES;

  firstCounter = INITIAL_FIRST_COUNTER;

  secondCounter = INITIAL_SECOND_COUNTER;

  firstSelectedCurrency: Currency =
    this.currencies[INITIAL_FIRST_CURRENCY_INDEX];

  secondSelectedCurrency: Currency =
    this.currencies[INITIAL_SECOND_CURRENCY_INDEX];

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
