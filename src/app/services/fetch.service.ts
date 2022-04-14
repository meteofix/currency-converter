import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_KEY, API_URL } from './consts';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient) {}

  fetch(url: string) {
    return this.http.get(url);
  }

  fetchLatestRate(base: string) {
    const url = `${API_URL}/${API_KEY}/latest/${base}`;
    return this.fetch(url);
  }

  fetchPairRate(base: string, target: string) {
    const url = `${API_URL}/${API_KEY}/pair/${base}/${target}`;
    return this.fetch(url);
  }
}
