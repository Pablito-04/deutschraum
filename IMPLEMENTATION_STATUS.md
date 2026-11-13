# Estado de implementación

Fecha: 13 de noviembre de 2026.

## Implementado y comprobado

- React, TypeScript estricto, Vite y navegación hash en ocho secciones; itinerario, sesión, estadísticas, ajustes y onboarding.
- Currículo propio de 20 unidades A0–A1 con objetivos y conexiones, 800 entradas léxicas, 60 lecturas/diálogos/mensajes y 120 preguntas. Sin unidades vacías ni entradas de relleno.
- 160 fuentes de frases, reutilizadas en 160 traducciones y 160 dictados/reconocimiento; 20 transformaciones adicionales y 173 actividades de orden de tres o más tokens. El recuento distingue fuentes de modos de práctica.
- Gramática en 20 lecciones, sonidos y pronunciación, 30 expresiones con registro y asociación, biblioteca musical y taller local de letras con huecos distribuidos, versos y reconstrucción.
- Corrección determinista por variantes y tokens, erratas conservadoras, protección de artículos, conjugaciones, finales y diéresis, diferencias en dictados y variantes de orden registradas.
- SRS con fechas reales, historial, tres modos, selección de palabras difíciles o por unidad, tarjetas personales editables y eliminables, consulta de palabras desde historias y soluciones.
- Progreso real, primeros intentos, errores, XP, tiempo aproximado, racha sin castigos, sesión configurable y reanudable, gráficos de actividad, aciertos y recuerdo.
- IndexedDB versionado para todos los datos y preferencias; copias JSON validadas con confirmación de reemplazo; migración aditiva de historial de escucha; actualización PWA que conserva datos.
- TTS solo con voces alemanas, carga asíncrona de voces, selección y velocidad; avisos honestos sin voz compatible. Lectura por frases y resaltado durante reproducción.
- PWA estática con caché de todo el curso, manifest e iconos, sin recursos principales remotos, ámbito y rutas compatibles con GitHub Pages bajo `/deutschraum/`.
- Diseño responsive, teclado, foco visible, etiquetas, modo oscuro y movimiento reducido. README y AGENTS documentan arquitectura, contenido, corrección, ampliación y despliegue.

## Verificación

- `npm run validate`: pasa, incluyendo IDs, referencias, cobertura, soluciones y metadatos.
- `npm test`: 36 pruebas unitarias pasan.
- `npm run build`: TypeScript y producción pasan; JavaScript ~497 kB / ~164 kB gzip, CSS ~45 kB / ~10 kB gzip.
- Playwright: batería completa de 32 recorridos pasó bajo la base `/deutschraum/`; las 20 unidades recorrieron lectura, práctica y prueba final. Se añadió una prueba adicional de consulta de vocabulario desde soluciones, comprobada junto con seis recorridos relacionados. El workflow ejecuta las 33 pruebas actuales antes de desplegar.
- Comprobadas recarga offline, escritura/persistencia, variantes, erratas, rechazo gramatical, SRS, edición/borrado de palabras personales, exportación/importación, letras, móvil y actualización del service worker sin borrar IndexedDB.
- Revisión visual en escritorio, 375 px y modo oscuro. En el navegador del Mac se detectaron nueve voces alemanas locales y se solicitó una frase TTS; la prueba automática cubre el aviso sin voz. No se certifica la calidad acústica de todas las voces/dispositivos.
- Los perfiles y datos de prueba son aislados y no se incorporan como progreso del usuario.

## Publicación

Repositorio elegido: `Pablito-04/deutschraum`. El usuario pidió finalmente que sea **público** para utilizar GitHub Pages gratuito. No convertirlo a privado sin una nueva instrucción y sin comprobar antes la compatibilidad del plan con Pages.

El workflow `.github/workflows/deploy.yml` valida, compila y publica cada push a main. La URL prevista es `https://pablito-04.github.io/deutschraum/`. El estado final del primer despliegue se registra al verificarlo; una URL prevista por sí sola no constituye publicación.

## Límites observados y siguientes verificaciones

- El contenido está desarrollado y revisado durante la implementación, pero no ha pasado una auditoría independiente de un profesor DaF ni una validación externa de cobertura MCER. No se afirma una certificación A1.
- Las lecturas son breves y la producción es cerrada. No se evalúan conversación libre, pronunciación ni cualquier variante alemana no registrada.
- El TTS offline depende del dispositivo. La instalación PWA y compatibilidad se han comprobado en Chromium; falta una matriz manual completa de Safari, Firefox, iOS y Android físicos.
- El tiempo registrado es una aproximación por actividad, no una medición de atención. El reconocimiento de vocabulario SRS es autodeclarado salvo en escritura. Comprender un texto no demuestra recuerdo individual de todas sus palabras.
- No hay sincronización entre dispositivos: usar exportación/importación. No se añaden automáticamente todas las palabras al SRS.
- Las letras importadas solo tienen herramientas mecánicas y coincidencias del diccionario, sin interpretación, traducción ni análisis generados.
- A2 no forma parte de esta versión; el tipo de nivel y los motores admiten ampliarlo con datos nuevos e IDs estables.
