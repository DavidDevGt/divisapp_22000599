import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  imports: [IonInput, IonItem, IonLabel],
})
export class InputNumberComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  onValueChange(event: any) {
    const val = parseFloat(event.detail.value) || 0;
    this.value = val;
    this.valueChange.emit(val);
  }
}
