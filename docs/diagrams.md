# 📊 Diagramas y Flujos de Datos - DivisApp

Esta sección contiene diagramas detallados de navegación, comunicación entre servicios y flujos de datos de la aplicación DivisApp.

## Diagrama de Navegación

```mermaid
stateDiagram-v2
    [*] --> Home
    Home --> CurrencyConverter: User clicks convert
    CurrencyConverter --> CurrencyConverter: Convert currency
    CurrencyConverter --> Home: Back navigation

    note right of CurrencyConverter
        Main feature page with:
        - Amount input
        - Convert button
        - Result display
        - Clear functionality
    end note
```

## Flujo de Conversión de Moneda

```mermaid
flowchart TD
    A[User enters amount] --> B{Validate input}
    B -->|Invalid| C[Show error message]
    B -->|Valid| D[Call ExchangeService.convertGTQToUSD()]
    D --> E{Conversion successful?}
    E -->|No| F[Handle error<br/>Show user message]
    E -->|Yes| G[Update UI with result]
    G --> H[Display converted amount]
    H --> I[Enable copy to clipboard]

    C --> A
    F --> A
```

## Comunicación entre Servicios

```mermaid
sequenceDiagram
    participant U as User
    participant P as CurrencyConverterPage
    participant E as Exchange
    participant S as StatusBarService
    participant C as Capacitor

    U->>P: Enter amount & click convert
    P->>E: convertGTQToUSD(amount)
    E-->>P: convertedAmount
    P->>P: Update UI

    Note over P,S: Status bar management
    P->>S: Initialize on app start
    S->>C: setStatusBarStyle()
    C-->>S: Status updated

    U->>P: Click copy result
    P->>P: navigator.clipboard.writeText()
```

## Arquitectura de Datos

```mermaid
classDiagram
    class CurrencyConversion {
        +number amount
        +string fromCurrency
        +string toCurrency
        +number result
        +Date timestamp
    }

    class ExchangeRate {
        +number rate
        +string from
        +string to
        +Date lastUpdated
    }

    class ConversionResult {
        +number originalAmount
        +number convertedAmount
        +string currency
        +boolean success
        +string errorMessage?
    }

    CurrencyConverterPage ..> ExchangeService
    ExchangeService ..> CurrencyConversion
    ExchangeService ..> ExchangeRate
    CurrencyConverterPage ..> ConversionResult
```

## Flujo de Inicialización de la App

```mermaid
flowchart TD
    A[App Start] --> B[Bootstrap Angular]
    B --> C[Initialize Ionic]
    C --> D[Load App Component]
    D --> E[Configure Routes]
    E --> F[Initialize StatusBarService]
    F --> G[Set Status Bar Style]
    G --> H[Load CurrencyConverterPage]
    H --> I[Initialize ExchangeService]
    I --> J[App Ready]

    K[User Interaction] --> H
```

## Diagrama de Estados de la UI

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Converting: User clicks convert
    Converting --> Success: Conversion successful
    Converting --> Error: Conversion failed

    Success --> Idle: User clears or enters new amount
    Error --> Idle: User clears or enters new amount

    Idle --> Idle: User changes amount

    note right of Converting
        Show loading indicator
        Disable convert button
    end note

    note right of Success
        Display converted amount
        Enable copy button
    end note

    note right of Error
        Show error message
        Hide result display
    end note
```

## Flujo de Error Handling

```mermaid
flowchart TD
    A[Error Occurs] --> B{Error Type}
    B -->|Validation Error| C[Show inline validation message]
    B -->|Service Error| D[Log error to console]
    B -->|Network Error| E[Show retry option]
    B -->|Unexpected Error| F[Show generic error message]

    C --> G[Allow user correction]
    D --> H[Continue app execution]
    E --> I[Retry operation]
    F --> J[Reset to safe state]

    I --> K{Success?}
    K -->|Yes| L[Continue normal flow]
    K -->|No| E

    G --> A
    H --> A
    J --> A
    L --> A
```

## Diagrama de Dependencias

```mermaid
graph TD
    subgraph "Pages"
        A[CurrencyConverterPage]
    end

    subgraph "Services"
        B[ExchangeService]
        C[StatusBarService]
    end

    subgraph "Components"
        D[InputNumberComponent]
        E[ResultDisplayComponent]
    end

    subgraph "External"
        F[Capacitor Plugins]
        G[Clipboard API]
        H[Local Storage]
    end

    A --> B
    A --> C
    A --> D
    A --> E

    B --> H
    C --> F
    E --> G
```

## Flujo de Build y Despliegue

```mermaid
flowchart TD
    A[Code Changes] --> B[Git Push]
    B --> C[CI/CD Trigger]
    C --> D[Install Dependencies]
    D --> E[Run Linting]
    E --> F[Run Unit Tests]
    F --> G[Build Application]
    G --> H{Success?}

    H -->|No| I[Fail Build<br/>Send Notification]
    H -->|Yes| J[Generate Artifacts]
    J --> K[Deploy to Staging]
    K --> L[Run E2E Tests]
    L --> M{E2E Pass?}

    M -->|No| N[Rollback Staging]
    M -->|Yes| O[Deploy to Production]
    O --> P[Health Checks]
    P --> Q{Healthy?}

    Q -->|No| R[Rollback Production]
    Q -->|Yes| S[Update Monitoring]
```

## Diagrama de Monitoreo

```mermaid
graph TD
    subgraph "Application Metrics"
        A[User Interactions]
        B[Conversion Events]
        C[Error Events]
        D[Performance Metrics]
    end

    subgraph "Monitoring Tools"
        E[Analytics Service]
        F[Error Tracking]
        G[Performance Monitoring]
        H[Health Checks]
    end

    subgraph "Alerts"
        I[Email Notifications]
        J[Slack Alerts]
        K[Dashboard Updates]
    end

    A --> E
    B --> E
    C --> F
    D --> G
    H --> H

    E --> I
    F --> J
    G --> K
    H --> I
```

## Arquitectura de Seguridad

```mermaid
flowchart TD
    A[User Input] --> B[Input Validation]
    B --> C[Sanitization]
    C --> D[Business Logic]
    D --> E[Output Encoding]

    F[External APIs] --> G[Authentication]
    G --> H[Authorization]
    H --> I[Rate Limiting]
    I --> J[Data Processing]

    K[Local Storage] --> L[Encryption]
    L --> M[Secure Storage]

    N[Network Requests] --> O[HTTPS Only]
    O --> P[Certificate Validation]
    P --> Q[Data Transmission]

    B --> R{Valid?}
    R -->|No| S[Reject Input]
    R -->|Yes| D

    G --> T{Authorized?}
    T -->|No| U[Access Denied]
    T -->|Yes| I
```

## Diagrama de Escalabilidad

```mermaid
graph TD
    subgraph "Current Architecture"
        A[Monolithic App]
        B[Local Conversion]
        C[Static Exchange Rate]
    end

    subgraph "Future Scalability"
        D[Microservices]
        E[External API Integration]
        F[Dynamic Exchange Rates]
        G[Offline Support]
        H[Multi-currency]
    end

    subgraph "Infrastructure"
        I[CDN]
        J[Load Balancer]
        K[Database]
        L[Cache Layer]
        M[Message Queue]
    end

    A --> D
    B --> E
    C --> F

    D --> I
    E --> J
    F --> K
    G --> L
    H --> M
```

## Flujo de Usuario Completo

```mermaid
journey
    title User Journey - Currency Conversion
    section App Launch
      Open app: 5: User
      Load interface: 5: System
    section Currency Input
      Enter amount: 5: User
      Validate input: 3: System
    section Conversion
      Click convert: 5: User
      Process conversion: 2: System
      Display result: 4: System
    section Result Interaction
      View result: 5: User
      Copy to clipboard: 3: User, System
    section Error Handling
      Handle errors: 2: System
      Show messages: 3: System
```

Estos diagramas proporcionan una visión completa de cómo funciona DivisApp a nivel técnico, desde la navegación del usuario hasta la comunicación interna entre componentes y servicios.