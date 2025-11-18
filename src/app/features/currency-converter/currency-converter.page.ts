import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Exchange } from '../../core/services/exchange';
import { InputNumberComponent } from '../../shared/components/input-number/input-number.component';
import { ResultDisplayComponent } from '../../shared/components/result-display/result-display.component';

@Component({
  selector: 'app-currency-converter',
  templateUrl: 'currency-converter.page.html',
  styleUrls: ['currency-converter.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    CommonModule,
    InputNumberComponent,
    ResultDisplayComponent
  ],
})
export class CurrencyConverterPage {
  amountGTQ: number = 0;
  convertedAmount: number | null = null;

  constructor(private exchangeService: Exchange) { }

  onAmountChange(value: number) {
    this.amountGTQ = value;
  }

  convert() {
    try {
      this.convertedAmount = this.exchangeService.convertGTQToUSD(this.amountGTQ);
    } catch (error) {
      console.error('Error converting currency:', error);
      this.convertedAmount = null;
    }
  }

  clear() {
    this.amountGTQ = 0;
    this.convertedAmount = null;
  }
}