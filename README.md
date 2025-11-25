# DivisApp - Conversor de Monedas GTQ/USD

[![Ionic](https://img.shields.io/badge/Ionic-8.0.0-blue.svg)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-20.0.0-red.svg)](https://angular.io/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7.4.4-green.svg)](https://capacitorjs.com/)

Una aplicación móvil híbrida enterprise-grade para conversión de monedas Quetzales Guatemaltecos (GTQ) a Dólares Estadounidenses (USD), construida con Ionic Framework y Angular. Diseñada siguiendo las mejores prácticas de arquitectura escalable y patrones de desarrollo moderno.

## 🚀 Características Principales

- **Conversión en Tiempo Real**: Conversión precisa GTQ → USD con tasa fija configurable
- **Interfaz Nativa**: Experiencia móvil nativa en iOS y Android
- **Arquitectura Modular**: Estructura limpia con separación de responsabilidades
- **Componentes Reutilizables**: Biblioteca de componentes compartidos
- **Testing Completo**: Cobertura de tests unitarios y de integración
- **CI/CD Pipeline**: Despliegue automatizado para múltiples entornos
- **Monitoreo y Analytics**: Métricas de rendimiento y uso

## 📋 Requisitos del Sistema

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **Ionic CLI**: v7.0.0 o superior
- **Android Studio**: v2022.3+ (para desarrollo Android)
- **Xcode**: v14.0+ (para desarrollo iOS, macOS únicamente)

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/your-org/divisapp.git
cd divisapp
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Verificar Instalación

```bash
npm run lint
npm run test
```

### 4. Configurar Capacitor

```bash
npx cap sync
```

## 🏃‍♂️ Desarrollo

### Servidor de Desarrollo

```bash
npm start
# o
ionic serve
```

La aplicación estará disponible en `http://localhost:8100`

### Desarrollo con Live Reload en Dispositivo

```bash
# Para Android
ionic capacitor run android --livereload

# Para iOS
ionic capacitor run ios --livereload
```

### Comandos de Desarrollo

```bash
# Build para desarrollo
npm run build

# Testing
npm run test
npm run test:watch
npm run test:ci

# Linting
npm run lint
npm run lint:fix

# Pre-commit hooks
npm run prepare
```

## 🚀 Despliegue

### Entorno de Desarrollo

```bash
npm run build
npx cap sync android
npx cap run android
```

### Entorno de Staging

```bash
npm run build -- --configuration=staging
npx cap sync android
npx cap build android --prod
```

### Entorno de Producción

```bash
npm run build -- --prod
npx cap sync android
npx cap build android --prod --release
```

### Generación de APK de Producción

```bash
# Firmar y alinear APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk android/app/build/outputs/apk/release/divisapp.apk
```

## 📁 Estructura del Proyecto

```
divisapp/
├── src/
│   ├── app/
│   │   ├── core/           # Servicios core y lógica de negocio
│   │   ├── features/       # Páginas y módulos de características
│   │   ├── shared/         # Componentes y utilidades compartidas
│   │   └── app.routes.ts   # Configuración de rutas
│   ├── assets/             # Recursos estáticos
│   ├── environments/       # Configuración por entorno
│   └── theme/              # Variables de tema SCSS
├── android/                # Proyecto Android nativo
├── docs/                   # Documentación técnica
├── capacitor.config.ts     # Configuración Capacitor
└── ionic.config.json       # Configuración Ionic
```

## 🔧 Configuración

### Variables de Entorno

Crear archivos en `src/environments/`:

- `environment.ts` - Desarrollo
- `environment.staging.ts` - Staging
- `environment.prod.ts` - Producción

### Capacitor Plugins

Plugins configurados en `capacitor.config.ts`:
- StatusBar
- Haptics
- Keyboard

## 📊 Monitoreo y Analytics

La aplicación incluye integración con servicios de monitoreo para:
- Métricas de rendimiento
- Trazas de errores
- Analytics de uso
- Health checks

## 🤝 Contribución

Ver [Guía de Contribución](docs/contributing.md) para detalles sobre:
- Configuración del entorno de desarrollo
- Flujo de trabajo con Git
- Estándares de código
- Proceso de revisión de código

## 📚 Documentación

- [Arquitectura del Sistema](docs/architecture.md)
- [Guía de Despliegue](docs/deployment.md)
- [Convenciones de Código](docs/conventions.md)
- [Estrategias de Testing](docs/testing.md)
- [Guía de Contribución](docs/contributing.md)

---

*Construido con ❤️ usando Ionic Framework y Angular*