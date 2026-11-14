# Deutschraum

Un espacio para aprender alemán estándar de Alemania desde cero. Interfaz y explicaciones en español; curso propio A0–A1 con exposición comprensible, ejercicios cerrados y repaso. Aplicación estática: sin IA durante el uso, sin cuentas, sin backend, sin servicios de corrección ni recursos remotos obligatorios.

## Abrir y desarrollar

Requiere Node.js 22.12 o posterior y npm. Desde esta carpeta:

```sh
npm ci
npm run dev
```

Abre la dirección Local que imprime Vite. También puedes ejecutar `Abrir Deutschraum.command` en macOS. Para revisar una compilación de producción:

```sh
npm run check
npm run preview
```

Abre `http://127.0.0.1:4173/`. No abras `dist/index.html` mediante `file://`: los módulos y la PWA necesitan HTTP o HTTPS. El servidor local sirve archivos; la aplicación no tiene backend.

## Qué incluye

- 20 unidades progresivas, cada una con objetivos, conexiones previas, regla, input, práctica y prueba final.
- 800 entradas léxicas, con categoría, ejemplo y traducción. Los sustantivos incluyen artículo, género y plural; los verbos incluyen formas relevantes.
- 60 textos originales bilingües (historias, diálogos y mensajes), con 120 preguntas de comprensión y metadatos de vocabulario y gramática.
- 160 frases base, reutilizadas con sentido en 160 traducciones, 160 dictados y reconocimiento auditivo. No son 480 frases distintas.
- 20 transformaciones adicionales (preguntas, persona, plural, negación, caso, modales, marco verbal y pasado).
- 173 actividades de orden de palabras con un mínimo de tres tokens, además de frases iniciales más cortas en la práctica guiada.
- 20 lecciones gramaticales con bloques visuales, errores frecuentes y ejercicio; 30 expresiones con contexto y asociación.
- Cuatro fichas de artistas con enlaces opcionales, y taller de letras aportadas por el usuario: huecos distribuidos, reconstrucción de versos, orden de palabras y diccionario exacto.

Las ocho secciones son Hoy, Inmersión, Vocabulario, Oído, Reformular, Gramática, Orden de palabras y Canciones. Hay además itinerario, sesiones, estadísticas y ajustes. Consulta [CONTENT_COVERAGE.md](CONTENT_COVERAGE.md) para la progresión y [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) para comprobaciones y límites.

## Aprender y guardar

La primera visita permite confirmar inicio A0, objetivo diario (10, 20 o 40 min), apariencia y voz alemana. Hoy propone una sesión determinista que prioriza tarjetas vencidas, errores recientes, comprensión y material nuevo. Puedes reorganizar o quitar actividades pendientes, estudiar libremente o retomar la sesión.

Cada unidad se consolida al comprender una de sus lecturas (todas sus preguntas correctas), acertar las ocho frases de práctica guiada y obtener al menos 80% al primer intento en una prueba de ocho actividades. Los reintentos se permiten y se registran por separado. El progreso A1 es una estimación de práctica dentro del curso, nunca una certificación.

Los XP nacen de respuestas reales: 10 por la primera respuesta acertada de una actividad identificada. Los fallos, reintentos, erratas y tiempos se guardan. El tiempo suma el transcurrido al responder, con un límite de 10 minutos por respuesta; es una aproximación y no un cronómetro de atención. Las métricas de comprensión auditiva se basan en resultados de ejercicios. Las historias escuchadas se marcan solo al terminar la reproducción completa. En los modos SRS de reconocimiento, el recuerdo lo declara el estudiante; la escritura se comprueba exactamente.

IndexedDB (`deutschraum`, versión 1, almacén `state`) conserva progreso, preferencias, borradores, sesión, tarjetas, letras y palabras personales. No se usa LocalStorage. Mantener el mismo dominio/origen conserva el progreso entre publicaciones. Cambiar de dominio, perfil de navegador o dispositivo requiere exportar e importar una copia JSON desde Ajustes. Una importación se valida íntegramente y requiere pulsar «Importar y reemplazar». Exporta una copia antes de restablecer datos. No hay sincronización remota.

El SRS usa cajas con intervalos de 1, 3, 7 y 16 días. Un fallo vuelve a caja 0 y reaparece tras 10 minutos. Cada revisión guarda su fecha y resultado. No se guardan automáticamente todas las palabras de las historias: tú eliges qué añadir.

## Corrección y audio

La puntuación es opcional: `Guten Morgen`, `Guten Morgen!` y `¡Guten Morgen!` se corrigen igual. Los signos aislados tampoco se marcan como palabras añadidas en un dictado.

Los bancos de construcción incluyen tres o cuatro distractores del nivel, además de las palabras necesarias para las variantes válidas. Incluso «Hola» requiere elegir entre cuatro opciones. Las preguntas de reconocimiento ofrecen cuatro frases distintas. Las opciones se mezclan entre rondas, pero se conservan al recargar un borrador.

El motor normaliza Unicode, espacios y puntuación opcional, sin borrar diéresis. En las respuestas escritas se exige la ortografía alemana: mayúsculas en sustantivos, nombres propios, inicio de frase y tratamiento formal Sie. Una falta de mayúscula se señala expresamente y no se acepta como errata menor. Por ejemplo, `Guten Morgen` es correcto sin exclamación; `Guten morgen` requiere corregir Morgen. La comparación sin distinguir mayúsculas se reserva a los botones de palabras ya proporcionadas, para poder reordenar el inicio de una frase sin editar los tokens. Solo acepta órdenes y variantes registrados. Las erratas se evalúan por palabra, con una sola edición conservadora en una palabra larga; protege términos gramaticales, finales flexivos y palabras existentes del diccionario. No confunde `der/die/das`, `ein/eine`, `hat/hast`, `nicht/nichts` ni `schon/schön`. Las sustituciones de vocales se rechazan. Las grafías de teclado solo se aceptan cuando se proporcionan explícitamente como variantes; no se transforma globalmente ß/ss ni ä/a. Una respuesta no registrada se describe como no reconocida.

El audio usa SpeechSynthesis y únicamente voces alemanas. Se atiende `voiceschanged`, se prefieren voces locales y se puede elegir voz/velocidad. Si no hay voz alemana, aparece un aviso. El TTS depende del sistema/navegador y puede necesitar conexión; no hay evaluación de pronunciación. Los enlaces musicales requieren conexión. No se incluyen letras comerciales ni se generan traducciones de textos importados.

## Offline y actualizaciones

La compilación genera `manifest.webmanifest` y `sw.js`, con una caché versionada que incluye todos los recursos estáticos del curso. El prefijo y el ámbito respetan la ruta base. El indicador «Curso guardado offline» aparece al activarse el service worker. Tras esa preparación, el curso escrito y sus ejercicios funcionan offline, incluidas recargas. La instalación se realiza desde el menú del navegador cuando lo permita. El modo de desarrollo no activa la caché para no servir versiones antiguas.

Una actualización queda en espera y muestra «Guardar y actualizar». Al aceptarla se termina el guardado antes de activar y recargar. Se eliminan únicamente cachés antiguas de esta aplicación/ruta; nunca se borra IndexedDB. Las migraciones de datos son aditivas: las copias antiguas sin historial de escucha reciben una lista vacía y conservan el resto.

## GitHub Pages: repositorio público

Repositorio elegido: `Pablito-04/deutschraum`, **público**, por indicación del usuario. El despliegue utiliza exclusivamente GitHub Pages y funciona con GitHub Free. El progreso personal no se publica: solo existe en IndexedDB en cada navegador. Si decides cambiar el repositorio a privado más adelante, comprueba antes que tu plan permita Pages en repositorios privados (Pro, Team o Enterprise).

1. Sube el proyecto a la rama `main` del repositorio (incluyendo el archivo `package-lock.json` y `.github/workflows/deploy.yml`).
2. Abre **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. En **Actions**, ejecuta **Validate and deploy GitHub Pages → Run workflow**; los siguientes pushes a `main` lo ejecutan automáticamente.
4. El workflow instala dependencias, valida contenido, ejecuta pruebas unitarias, compila, instala Chromium y ejecuta las pruebas de navegador antes de publicar.
5. La dirección esperada, una vez que GitHub confirme el despliegue, es `https://pablito-04.github.io/deutschraum/`. Una URL esperada no significa que ya esté publicada: comprueba el estado en Pages/Actions.

Vite obtiene el nombre desde `GITHUB_REPOSITORY` en Actions. Para un repositorio de proyecto usa `/nombre-repositorio/`; para un repositorio de usuario `usuario.github.io`, `/`. También puedes fijar una ruta para verificarla localmente:

```sh
VITE_BASE_PATH=/deutschraum/ npm run build
VITE_BASE_PATH=/deutschraum/ npm run preview
VITE_BASE_PATH=/deutschraum/ npm run test:e2e
```

Las rutas usan HashRouter (`/#/inmersion`), sin redirecciones de servidor. No se necesita dominio propio ni otro proveedor de hosting. No hay despliegues a Sites, Netlify o Cloudflare.

Referencias oficiales: [Vite y GitHub Pages](https://vite.dev/guide/static-deploy#github-pages), [disponibilidad y límites de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [visibilidad de sitios](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Comprobaciones y arquitectura

```sh
npm run validate
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run check` agrupa validación estructural, unitarias y compilación estricta. Playwright recorre las 20 unidades y funciones integradas en perfiles de prueba aislados; no rellena el progreso de los usuarios. La prueba de actualización usa un servidor estático temporal de test que no se distribuye como parte de la aplicación.

- `src/content/`: formatos tipados, currículo, frases, lecturas, diccionario, expresiones y formas documentadas de consulta.
- `src/correction/`: comparación y diferencias por palabra, independiente del contenido.
- `src/learning/`: SRS, estadísticas, sesión y huecos deterministas.
- `src/storage/`: IndexedDB, esquema y validación de copias.
- `src/audio/`: gestión de voces y reproducción.
- `src/components/`: motores y controles reutilizables.
- `src/features/`: secciones y recorridos; `src/app/`: contexto, rutas y PWA.
- `src/tests/`, `e2e/`, `scripts/`: pruebas y validadores.

Para añadir A2, añade unidades y contenido con nivel A2 e IDs nuevos. Los motores ya admiten ese nivel. No cambies IDs publicados ni reinicies el almacén para introducir contenido. Las convenciones completas están en [AGENTS.md](AGENTS.md).

## Fuentes pedagógicas y límites

Los objetivos se orientan por los [descriptores A1 del Consejo de Europa](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search) y los [ámbitos de preparación A1 de Goethe](https://www.goethe.de/de/spr/prf/ueb/pa1.html). El material del curso está redactado para Deutschraum, no copiado de exámenes. Las comprobaciones automáticas no sustituyen una revisión docente independiente. Se recomienda contrastar tu comprensión con materiales externos y situaciones reales; no se garantiza una certificación por terminar actividades.
