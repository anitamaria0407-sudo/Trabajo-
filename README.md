# Gestor de Trabajo — PWA

App para gestionar pedidos de impresión 3D y tareas de agencia de comunicación.

## Instalación local

```bash
npm install
npm run dev
```

## Deploy en Vercel (recomendado)

1. Subí esta carpeta a un repositorio en GitHub
2. Entrá a [vercel.com](https://vercel.com) → "New Project"
3. Importá el repositorio
4. Vercel detecta Vite automáticamente → click en **Deploy**
5. En ~1 minuto tenés tu URL

## Instalar como app en el celular

### Android (Chrome)
1. Abrí la URL de Vercel en Chrome
2. Tocá los 3 puntitos → "Añadir a pantalla de inicio"
3. Confirmá → ¡listo!

### iPhone (Safari)
1. Abrí la URL en Safari
2. Tocá el botón compartir (cuadrado con flecha)
3. "Añadir a pantalla de inicio"
4. Confirmá → ¡listo!

## Características
- ✅ Funciona offline (PWA con Service Worker)
- ✅ Datos guardados en el dispositivo (localStorage)
- ✅ Optimizada para móvil
- ✅ Pedidos 3D: material, color, estado, fecha de entrega
- ✅ Tareas de agencia: tipo, cliente, prioridad, estado
- ✅ Avance rápido de estado con un toque
