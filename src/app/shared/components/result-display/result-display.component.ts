import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon, CommonModule],
})
export class ResultDisplayComponent {
  @Input() result: number = 0;
  @Input() label: string = '';

  constructor() { }

  copyResult() {
    const text = `${this.result.toFixed(2)} USD`;
    navigator.clipboard.writeText(text).then(() => {
      // Opcional: mostrar toast de éxito
      console.log('Resultado copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar:', err);
    });
  }
}
