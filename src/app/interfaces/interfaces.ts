export interface Currency {
  value: string;
  viewValue: string;
  logo: string;
}

export interface Rates {
  [base: string]: { [target: string]: number };
}
