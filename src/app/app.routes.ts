import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'currency-converter',
    loadComponent: () => import('./features/currency-converter/currency-converter.page').then((m) => m.CurrencyConverterPage),
  },
  {
    path: '',
    redirectTo: 'currency-converter',
    pathMatch: 'full',
  },
];

