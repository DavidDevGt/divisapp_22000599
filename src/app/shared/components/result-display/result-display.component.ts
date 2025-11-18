import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, CommonModule],
})
export class ResultDisplayComponent {
  @Input() result: number = 0;
  @Input() label: string = '';

  constructor() { }
}
