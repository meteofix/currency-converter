import { Currency, Rates } from '../interfaces/interfaces';

export const API_URL = 'https://v6.exchangerate-api.com/v6';
export const API_KEY = '439b4a49537a2da811533fa5';

export const INITIAL_FIRST_COUNTER = 1;
export const INITIAL_SECOND_COUNTER = 0;
export const INITIAL_FIRST_CURRENCY_INDEX = 1;
export const INITIAL_SECOND_CURRENCY_INDEX = 0;

export const INITIAL_RATES: Rates = {
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

export const CURRENCIES: Currency[] = [
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
