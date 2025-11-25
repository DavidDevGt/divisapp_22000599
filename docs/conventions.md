# 📏 Convenciones de Código y Mejores Prácticas - DivisApp

Este documento establece las convenciones de código, estándares de desarrollo y mejores prácticas que deben seguirse en el proyecto DivisApp para mantener la calidad, consistencia y mantenibilidad del código.

## Filosofía de Desarrollo

DivisApp sigue los principios de **Clean Code**, **SOLID** y **Domain-Driven Design (DDD)**, adaptados para el desarrollo móvil híbrido con Ionic/Angular.

### Principios Fundamentales

1. **Legibilidad sobre Inteligencia**: Código fácil de leer y entender
2. **Mantenibilidad**: Código fácil de modificar y extender
3. **Testabilidad**: Código diseñado para testing automático
4. **Performance**: Optimizado para dispositivos móviles
5. **Seguridad**: Principios de seguridad integrados

## Estructura de Archivos y Nombres

### Convenciones de Nombres

```typescript
// ✅ Correcto
export class CurrencyConverterPage { }
export class Exchange { }
export class StatusBarService { }
export class InputNumberComponent { }

// ❌ Incorrecto
export class currencyconverterpage { }
export class exchange { }
export class statusbarservice { }
export class input-number-component { }
```

### Estructura de Carpetas

```
src/app/
├── core/                    # Servicios core, guards, interceptors
│   ├── services/           # Servicios de negocio
│   ├── guards/             # Route guards
│   └── interceptors/       # HTTP interceptors
├── features/               # Módulos de características
│   └── feature-name/       # Una carpeta por feature
│       ├── feature-name.page.ts
│       ├── feature-name.page.html
│       └── feature-name.page.scss
├── shared/                 # Componentes y utilidades compartidas
│   ├── components/         # Componentes reutilizables
│   ├── pipes/              # Pipes personalizados
│   └── directives/         # Directivas personalizadas
└── app.routes.ts           # Configuración de rutas principal
```

## TypeScript y Angular

### Configuración TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true
  }
}
```

### Componentes Standalone

```typescript
// ✅ Patrón recomendado
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.page.html',
  styleUrls: ['./currency-converter.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    InputNumberComponent,
    ResultDisplayComponent
  ],
  standalone: true
})
export class CurrencyConverterPage {
  // Implementación
}
```

### Servicios con Inyección de Dependencias

```typescript
// ✅ Servicio correctamente estructurado
@Injectable({
  providedIn: 'root'
})
export class Exchange {
  private readonly exchangeRate = 8.0;

  convertGTQToUSD(amount: number): number {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    return amount / this.exchangeRate;
  }

  getExchangeRate(): number {
    return this.exchangeRate;
  }
}
```

## Estilos SCSS

### Arquitectura de Estilos

```scss
// ✅ Estructura recomendada
.currency-converter-page {
  // Estilos de página

  .converter-form {
    // Estilos de formulario

    .input-group {
      // Estilos de grupo de entrada
    }
  }

  .result-section {
    // Estilos de sección de resultado
  }
}
```

### Variables y Tema

```scss
// src/theme/variables.scss
:root {
  --ion-color-primary: #3880ff;
  --ion-color-secondary: #3dc2ff;
  --ion-color-success: #2dd36f;
  --ion-color-warning: #ffc409;
  --ion-color-danger: #eb445a;

  // Variables personalizadas
  --app-border-radius: 8px;
  --app-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Responsive Design

```scss
// ✅ Breakpoints consistentes
@media (min-width: 576px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 992px) { /* lg */ }
@media (min-width: 1200px) { /* xl */ }
```

## Testing

### Estrategia de Testing

```typescript
// ✅ Test completo
describe('Exchange', () => {
  let service: Exchange;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Exchange);
  });

  it('should convert GTQ to USD correctly', () => {
    const result = service.convertGTQToUSD(16);
    expect(result).toBe(2);
  });

  it('should throw error for negative amount', () => {
    expect(() => service.convertGTQToUSD(-1)).toThrow('Amount cannot be negative');
  });

  it('should return correct exchange rate', () => {
    expect(service.getExchangeRate()).toBe(8);
  });
});
```

### Cobertura de Tests

- **Unit Tests**: >90% cobertura
- **Integration Tests**: Componentes críticos
- **E2E Tests**: Flujos principales (opcional)

## Linting y Code Quality

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "@angular-eslint/recommended",
    "@angular-eslint/template/process-inline-templates"
  ],
  "rules": {
    "@angular-eslint/component-selector": [
      "error",
      {
        "type": "element",
        "prefix": "app",
        "style": "kebab-case"
      }
    ],
    "@angular-eslint/directive-selector": [
      "error",
      {
        "type": "attribute",
        "prefix": "app",
        "style": "camelCase"
      }
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test:ci",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## Gestión de Estado

### Patrón de Estado Local

```typescript
// ✅ Component state management
export class CurrencyConverterPage {
  amount: number = 0;
  convertedAmount: number | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  convert() {
    this.isLoading = true;
    this.error = null;

    try {
      this.convertedAmount = this.exchange.convertGTQToUSD(this.amount);
    } catch (err) {
      this.error = 'Error converting currency';
    } finally {
      this.isLoading = false;
    }
  }
}
```

### RxJS Patterns

```typescript
// ✅ Reactive programming
export class Exchange {
  private exchangeRate$ = new BehaviorSubject<number>(8.0);

  getExchangeRate$(): Observable<number> {
    return this.exchangeRate$.asObservable();
  }

  updateExchangeRate(rate: number): void {
    this.exchangeRate$.next(rate);
  }
}
```

## Manejo de Errores

### Estrategia Global de Errores

```typescript
// ✅ Error handling service
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  handleError(error: any): void {
    console.error('Application Error:', error);

    // Log to monitoring service
    this.monitoringService.logError(error);

    // Show user-friendly message
    this.toastService.showError('An error occurred. Please try again.');
  }
}
```

### Error Boundaries

```typescript
// ✅ Error boundary component
@Component({
  selector: 'app-error-boundary',
  template: `
    <ng-container *ngIf="!hasError; else errorTemplate">
      <ng-content></ng-content>
    </ng-container>
    <ng-template #errorTemplate>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Something went wrong</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Please refresh the page or contact support.</p>
          <ion-button (click)="retry()">Retry</ion-button>
        </ion-card-content>
      </ion-card>
    </ng-template>
  `
})
export class ErrorBoundaryComponent {
  hasError = false;

  @ContentChild(TemplateRef) content: TemplateRef<any>;

  retry(): void {
    this.hasError = false;
  }
}
```

## Performance

### Lazy Loading

```typescript
// ✅ Lazy loading de rutas
export const routes: Routes = [
  {
    path: 'currency-converter',
    loadComponent: () => import('./features/currency-converter/currency-converter.page')
      .then(m => m.CurrencyConverterPage)
  }
];
```

### Change Detection Strategy

```typescript
// ✅ OnPush change detection
@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultDisplayComponent {
  @Input() result: number;
}
```

### Bundle Optimization

```json
// angular.json - production build
{
  "optimization": true,
  "buildOptimizer": true,
  "aot": true,
  "extractLicenses": true,
  "vendorChunk": false,
  "namedChunks": false
}
```

## Seguridad

### Input Validation

```typescript
// ✅ Input sanitization
export class InputNumberComponent {
  @Output() valueChange = new EventEmitter<number>();

  onValueChange(event: any) {
    const value = parseFloat(event.detail?.value) || 0;
    const sanitizedValue = Math.max(0, Math.min(1000000, value)); // Range validation
    this.valueChange.emit(sanitizedValue);
  }
}
```

### Content Security Policy

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.divisapp.com;
">
```

## Git y Versionado

### Conventional Commits

```bash
# ✅ Correct commit format
git commit -m "feat: add currency conversion validation"
git commit -m "fix: handle negative amounts in converter"
git commit -m "docs: update deployment guide"
git commit -m "refactor: extract common validation logic"
```

### Branching Strategy (Git Flow)

```bash
# Feature branches
git checkout -b feature/add-exchange-rate-api

# Bug fixes
git checkout -b bugfix/fix-conversion-precision

# Releases
git checkout -b release/v1.2.0
```

### Versionado Semántico

- **MAJOR**: Cambios incompatibles
- **MINOR**: Nuevas funcionalidades compatibles
- **PATCH**: Corrección de bugs

## Documentación

### JSDoc Comments

```typescript
/**
 * Converts Guatemalan Quetzales to US Dollars
 * @param amountGTQ - Amount in GTQ to convert
 * @returns Amount in USD
 * @throws Error when amount is negative
 */
convertGTQToUSD(amountGTQ: number): number {
  // Implementation
}
```

### README y Documentación

- README.md actualizado con cada release
- Documentación técnica en `/docs`
- Comentarios en código para lógica compleja

## Conclusiones

Siguiendo estas convenciones, DivisApp mantiene:

✅ **Consistencia**: Estándares uniformes en todo el proyecto

✅ **Mantenibilidad**: Código fácil de entender y modificar

✅ **Calidad**: Testing y linting automatizados

✅ **Performance**: Optimizaciones para móviles

✅ **Seguridad**: Principios de seguridad integrados

✅ **Escalabilidad**: Arquitectura preparada para crecimiento

Estas convenciones deben revisarse y actualizarse regularmente para incorporar nuevas mejores prácticas y tecnologías.