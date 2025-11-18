import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Exchange {
  private readonly exchangeRate: number = 8; // 8 GTQ = 1 USD

  constructor() { }

  convertGTQToUSD(amountGTQ: number): number {
    if (amountGTQ < 0) {
      throw new Error('Amount cannot be negative');
    }
    return amountGTQ / this.exchangeRate;
  }

  getExchangeRate(): number {
    return this.exchangeRate;
  }
}
