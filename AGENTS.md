# Deutschraum

Aplicación educativa estática React/TypeScript, interfaz española, alemán estándar, de A0 a A1. No incorporar IA, APIs, autenticación, backend, analítica remota ni recursos remotos obligatorios. GitHub Pages es el único destino de despliegue.

## Trabajo y arquitectura

- `src/content`: contenido declarativo propio; IDs estables, nunca regenerarlos al reordenar unidades.
- `src/correction`: comparación conservadora por tokens. En escritura validar las mayúsculas alemanas, especialmente sustantivos; la puntuación no objetivo es opcional. No confundir ambas políticas ni tratar una falta de mayúscula como errata aceptable. En selección pueden compararse tokens proporcionados sin distinguir la inicial de frase. No eliminar diacríticos ni aceptar cambios de artículo, persona, negación o terminación mediante similitud.
- `src/learning`: SRS, selección de sesión y métricas deterministas.
- `src/storage`: IndexedDB versionado; importar solo datos validados, confirmar reemplazos, conservar progreso en actualizaciones.
- `src/audio`: SpeechSynthesis; solo voz alemana, gestionar voiceschanged, no simular evaluación oral ni prometer TTS offline universal.
- `src/features`: ocho secciones más ajustes/estadísticas; motores compartidos en components.

## Pedagogía y contenido

Comprender → reconocer → reforzar → practicar → reencontrar. Exposición comprensible, traducción opcional, vocabulario con género/plural y ejemplos, producción cerrada con soluciones registradas. No contar reutilizaciones de una frase como contenido original adicional. MCER orienta objetivos, no certifica el curso.
Para añadir una unidad: definir objetivos, regla, ocho o más frases validadas con variantes explícitas, lecturas con traducciones y preguntas, vocabulario etiquetado y referencias previas. Añadir el ID a la secuencia. Para A2 añadir nivel y datos sin cambiar motores. Las ampliaciones no deben cambiar IDs existentes ni borrar la base. Incrementar versión IndexedDB solo con migración aditiva documentada.

## Verificación y convenciones

`npm ci`, `npm run check`, `npm run test:e2e`. `npm run validate` comprueba IDs, metadatos, soluciones, cobertura y referencias. Revisar manualmente naturalidad, restricciones léxicas y explicaciones; la validación estructural no sustituye una revisión lingüística independiente. Escribir pruebas para corrector, SRS, importaciones, persistencia y recorridos. No añadir pantallas, estadísticas o botones ficticios. Mantener rutas hash, base configurable, caché acotada al proyecto, foco visible, etiquetas, contraste, móvil y modo oscuro. Actualizar README e IMPLEMENTATION_STATUS con límites observados, sin declarar funciones no verificadas. No introducir dependencias grandes sin necesidad.
