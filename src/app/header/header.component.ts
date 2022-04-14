// eslint-disable-next-line import/named
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RatesService } from '../services/rates.service';
import { Rates } from '../interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly ratesService: RatesService) {}

  @Output() updateRates = new EventEmitter();

  rates: Rates = {};

  ngOnInit(): void {
    this.ratesService.rates$.subscribe((rates) => {
      this.rates = rates;
    });
  }
}
