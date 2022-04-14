import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Rates } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  rates$ = new Subject<Rates>();

  changeRates(rates: Rates) {
    this.rates$.next(rates);
  }
}
