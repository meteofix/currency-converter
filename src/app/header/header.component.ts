// eslint-disable-next-line import/named
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RatesService } from '../services/rates.service';
import { Rates } from '../interfaces/interfaces';
import { INITIAL_RATES } from '../services/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly ratesService: RatesService) {}

  @Output() updateRates = new EventEmitter();

  rates: Rates = INITIAL_RATES;

  ngOnInit(): void {
    this.ratesService.rates$.subscribe((rates) => {
      this.rates = rates;
    });
  }
}
