# GUITAR FORGE

PWA de entrenamiento de guitarra eléctrica construida con HTML, CSS y JavaScript Vanilla.

## Publicar en GitHub Pages

1. Sube todos los archivos y carpetas conservando su estructura.
2. En GitHub abre **Settings → Pages**.
3. Selecciona la rama principal y la carpeta raíz (`/`).
4. Guarda y espera a que GitHub Pages publique la web.
5. Abre la URL mediante HTTPS. El Service Worker no funciona desde `file://`.

## Instalación

- **Android / Chrome:** menú ⋮ → Instalar aplicación / Añadir a pantalla de inicio.
- **iPhone / Safari:** Compartir → Añadir a pantalla de inicio.

## Offline

La primera visita requiere conexión para descargar los recursos. Después, el HTML, CSS, JS, manifest, icono SVG y fallback se guardan en caché. Las fuentes de Google son externas y pueden no estar disponibles offline; se utilizan fuentes de sistema como fallback.

## Contenido incluido

- Dashboard con métricas.
- Academia con ocho clases desarrolladas.
- Generador de calentamiento.
- Checklist diario persistente.
- Ejercicio con tablatura y diapasón SVG.
- Metrónomo con Web Audio API y Tap Tempo.
- Cronómetro y registro semanal.
- BPM tracker.
- Laboratorio de diapasón con escalas y selección de raíz.
- Perfil y copia de seguridad JSON.

## Datos

El progreso se guarda localmente en `localStorage` del navegador. No hay backend ni sincronización entre dispositivos. Exporta periódicamente una copia JSON desde Perfil.

## Personalización

Cambia `CACHE_NAME` en `sw.js` cuando publiques una actualización para forzar una nueva caché. Mantén sincronizada la versión de caché con los recursos publicados.
