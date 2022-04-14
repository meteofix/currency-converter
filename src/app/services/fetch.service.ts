import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient) {}

  fetch(url: string) {
    return this.http.get(url);
  }

  fetchLatestRate(base: string) {
    const url = `https://v6.exchange_rate-api.com/v6/439b4a49537a2da811533fa5/latest/${base}`;
    return this.fetch(url);
  }

  fetchPairRate(base: string, target: string) {
    const url = `https://v6.exchange_rate-api.com/v6/439b4a49537a2da811533fa5/pair/${base}/${target}`;
    return this.fetch(url);
  }
}
