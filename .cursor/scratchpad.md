# lol-assistant Project Scratchpad

## Antecedentes y Motivación

El objetivo es desarrollar un sistema que permita la ejecución de scripts personalizados **dentro del monorepo existente**. Estos scripts deben poder ejecutarse de forma local para tareas de desarrollo o mantenimiento, y algunos de ellos deben poder desplegarse como tareas programadas (cron jobs) en Vercel para ejecuciones periódicas automatizadas. Se busca una estructura flexible **que se integre con la estructura actual (`apps/`, `packages/`)**, facilitando tanto la ejecución local como el despliegue selectivo en Vercel.

## Desafíos Clave y Análisis

1.  **¿Integración en `packages/` o `apps/`?**

    - **Opción 1: Nuevo Paquete (`packages/cron-scripts`)**: Encapsula la lógica reutilizable. Fácil ejecución local (`pnpm --filter cron-scripts ...`). Requiere una forma de exponer endpoints HTTP para Vercel Crons.
    - **Opción 2: Endpoint HTTP directo (Vercel Serverless Functions)**: Crear archivos directamente en un directorio `api/` (en la raíz o en `apps/`) que Vercel despliega como funciones serverless. Estas funciones importarían la lógica del paquete.
    - **Recomendación: Híbrido Simplificado.**
      - Un paquete `packages/cron-scripts` que contenga la lógica central de todos los scripts (locales y cron).
      - Un directorio `api/crons/` (p. ej., en la raíz del monorepo o dentro de `apps/` si se prefiere organización) conteniendo Vercel Serverless Functions. Cada función (`.ts`) aquí importará y ejecutará una función específica del paquete `cron-scripts`, sirviendo como endpoint para los Vercel Crons.
    - **Ventajas:** Separación clara (lógica en `packages`, endpoints en `api`), reutilización, integración limpia, ejecución local directa de scripts, despliegue ligero en Vercel (sin necesidad de Next.js/Express solo para los crons).

2.  **Estructura para Ejecución Local:**

    - Dentro del nuevo paquete `packages/cron-scripts`, directorio `src/scripts/` con los archivos `.ts` de cada script.
    - Runner/dispatcher (`src/run.ts`) en `packages/cron-scripts` que toma el nombre del script como argumento y lo ejecuta.
    - Invocación vía `package.json`: `pnpm --filter cron-scripts run start <nombre-script>`.

3.  **Estructura para Despliegue en Vercel (Cron Jobs):**

    - Directorio `api/crons/` con archivos `.ts` (Vercel Serverless Functions), p. ej., `api/crons/update-champions.ts`.
    - Cada función importa la lógica necesaria de `packages/cron-scripts`.
    - En `vercel.json` (en la raíz) se definirán los cron jobs apuntando a estas funciones desplegadas (ej. `/api/crons/update-champions`).
    - Manejo de seguridad con Vercel Cron Job Secret.

## Desglose de Tareas de Alto Nivel

1.  **Verificar/Ajustar Configuración Monorepo:**
    - Asegurarse de que `pnpm-workspace.yaml` incluye `packages/*` y `apps/*` (y potencialmente `api/*` si se pone allí).
    - Verificar configuración base de TS.
    - _Criterio de Éxito:_ `pnpm install` funciona y reconoce workspaces.
2.  **Crear Paquete `packages/cron-scripts`:**
    - Inicializar paquete Node.js/TS en `packages/`.
    - Crear `src/index.ts`, `src/scripts/`, y script de ejemplo (`sample-script.ts`).
    - _Criterio de Éxito:_ Construcción (`pnpm --filter cron-scripts build`) y reconocimiento por `pnpm install`.
3.  **Crear Directorio y Función Base para API Crons:**
    - Crear directorio `api/crons/` (decidir si en raíz o `apps/`).
    - Crear una función serverless de ejemplo (`api/crons/sample-cron.ts`) que simplemente importe algo (o loguee) de `packages/cron-scripts` para verificar la conexión.
    - Asegurarse de que Vercel pueda reconocer/desplegar funciones desde esta ubicación (puede requerir ajustes en `vercel.json` si no está en la raíz).
    - _Criterio de Éxito:_ La estructura existe. La función de ejemplo puede (potencialmente) ser construida/detectada. `pnpm install` funciona.
4.  **Implementar Runner de Scripts Locales en `packages/cron-scripts`:**
    - Crear `src/run.ts` (import dinámico, ejecución).
    - Añadir script `start` en `package.json`.
    - _Criterio de Éxito:_ `pnpm --filter cron-scripts run start sample-script` funciona.
5.  **Implementar Endpoint API Serverless Específico:**
    - Modificar/crear la función serverless correspondiente (ej. `api/crons/sample-cron.ts`) para:
      - Validar la llamada (ej. método GET, secret `process.env.CRON_SECRET`).
      - Importar y ejecutar la función real de `packages/cron-scripts`.
      - Manejar errores y devolver respuesta JSON.
    - _Criterio de Éxito:_ Se puede invocar localmente (si Vercel CLI está configurado o mediante pruebas) o después del despliegue, y ejecuta el script de `packages`, devolviendo JSON.
6.  **Configurar Vercel Cron Job:**
    - Añadir configuración en `vercel.json` apuntando a la función serverless desplegada.
    - Configurar `CRON_SECRET` en Vercel.
    - Desplegar.
    - _Criterio de Éxito:_ Cron visible en Vercel, se ejecuta, logs OK.
7.  **Implementar Endpoints CRUD Campeones en `packages/api`:**
    - Definir rutas y handlers para `createChampion` (POST) y `updateChampion` (PUT/PATCH, por ID/key) en `packages/api`.
    - Incluir validación de payloads para ambos endpoints.
    - Conectar con `packages/db` para crear/actualizar registros.
    - _Criterio de Éxito:_ Ambos endpoints existen, son llamables, y realizan la operación correcta (crear o actualizar) en la BD.
8.  **Crear Script `updateChampionData` en `packages/cron-scripts`:**
    - Crear `src/scripts/updateChampionData.ts`.
    - El script debe obtener los datos de campeones (ej. API Riot).
    - Para cada campeón, verificar si existe en nuestra BD (quizás con un endpoint `getChampion` o una consulta directa si la lógica está en el script).
    - Llamar a `createChampion` si no existe, o a `updateChampion` si existe.
    - Manejar respuestas y errores.
    - _Criterio de Éxito:_ `pnpm --filter @lol-assistant/cron-scripts run start updateChampionData` ejecuta el script, sincroniza los datos llamando al endpoint apropiado (create o update) para cada campeón, y reporta el resultado.
9.  **Adaptar Script de Webscrapping (`getLatestPatchNote`)**
    - Adaptar `packages/cron-scripts/src/scripts/getLatestPatchNote.ts` para usar el modelo `PatchNote` de la BD (Supabase) y la lógica de guardado/actualización implementada en `packages/api` (si procede, o usar Supabase client directamente si es más simple).
    - Refinar la estructura interna siguiendo el ejemplo de `api/`, `common/`, `ai/` dentro del script.
    - _Criterio de Éxito:_ Script `getLatestPatchNote` ejecutable localmente (`pnpm script:run getLatestPatchNote`), obtiene, procesa (resume) y guarda correctamente el último parche en Supabase.
10. **Crear Endpoint para Cronjob (`check-patch-notes`)**
    - Implementar en `api/crons/check-patch-notes.ts`
    - Integrar con el script `getLatestPatchNote` (importar y ejecutar).
    - Añadir validación de secret.
    - _Criterio de Éxito:_ Endpoint desplegado accesible, ejecuta `getLatestPatchNote` y devuelve estado.
11. **Configurar Cronjob en Vercel (`check-patch-notes`)**
    - Añadir configuración en `vercel.json`.
    - Establecer frecuencia de ejecución.
    - Configurar `CRON_SECRET`.
    - _Criterio de Éxito:_ Cronjob configurado, programado y ejecutándose correctamente en Vercel.

### Nueva Tarea: Sincronizar Datos de Campeones desde DDragon

12. **Refactorizar Script `updateChampionStats.ts`:**
    - Mover a `packages/cron-scripts/src/scripts/`.
    - Reestructurar internamente con subdirectorios (`common/` para fetching/parsing DDragon, `api/` para interacción Supabase).
    - **Confirmar que el script acepta `patchVersion` y `championSlug` como parámetros.** (Aclaración del rol)
    - _Criterio de Éxito:_ Script reubicado, estructura interna modularizada, acepta `patchVersion` y `championSlug`. **(Completado)**

**Nuevo Enfoque: Script Orquestador `syncAllChampions.ts`**

13. **Crear Script Orquestador `syncAllChampions.ts`:**

    - Crear `packages/cron-scripts/src/scripts/syncAllChampions.ts`.
    - Este script aceptará `patchVersion` como argumento.
    - _Criterio de Éxito:_ El archivo existe y es ejecutable mediante `pnpm script:run syncAllChampions patchVersion=<version>`. **(Completado)**

14. **Implementar Obtención de Lista Maestra (en `syncAllChampions.ts`):**

    - Dentro de `syncAllChampions.ts` (o un helper que llame), implementar la lógica para obtener el archivo `champion.json` de DDragon para la `patchVersion` especificada.
    - Extraer la lista de `slugs` de campeones del objeto `data`.
    - Manejar errores si `champion.json` no se puede obtener (log + posiblemente detener el script si la lista es necesaria para continuar).
    - _Criterio de Éxito:_ `syncAllChampions.ts` puede obtener y loguear la lista de slugs para la versión dada. **(Completado)**

15. **Implementar Bucle de Procesamiento (en `syncAllChampions.ts`):**

    - Modificar `syncAllChampions.ts` para iterar sobre la lista de `slugs` obtenida (Tarea 14).
    - Para cada `slug`:
      - Importar y llamar a el script `updateChampionStats` para obtener y parsear los datos del campeón específico.
      - Implementar manejo de errores para esta iteración: si falla el fetch o parseo para un campeón, registrar el error (con `slug` y `version`) y **continuar con el siguiente campeón**.
    - _Criterio de Éxito:_ `syncAllChampions.ts` itera sobre todos los slugs, intenta obtener y parsear datos para cada uno, loguea progreso/errores individuales y continúa. **(Completado)**

16. **Implementar Lógica de Guardado Upsert con Prisma (Ya existe, integrar en `syncAllChampions.ts`):**

    - La función `saveChampion` (o similar usando Prisma `upsert`) existe en `updateChampionStats/api/`. Debe ser llamada desde el bucle de `syncAllChampions.ts`.
    - _Criterio de Éxito:_ La función `saveChampion` se llama correctamente dentro del bucle para los campeones procesados con éxito. **(Completado - Integrado en el bucle)**

17. **Integrar Guardado en Bucle y Logging Final (en `syncAllChampions.ts`):**

    - Dentro del bucle de `syncAllChampions.ts` (Tarea 15), después de parsear exitosamente un campeón, llamar a la función `saveChampion` (Tarea 16) con los datos parseados y `patchVersion`.
    - Añadir manejo de errores específico para la operación de guardado: si falla, registrar el error (con `slug`) y continuar con el siguiente campeón.
    - Al final de `syncAllChampions.ts`, añadir un resumen en los logs: número total de campeones intentados, número de éxitos (fetch, parse, save), número de fallos por categoría (fetch/parse, guardado).
    - _Criterio de Éxito:_ Script `syncAllChampions.ts` completo se ejecuta, procesa todos los campeones, intenta guardarlos/actualizarlos, maneja errores individuales, y reporta un resumen final. Verificación en BD. **(Completado)**

18. **(Opcional) Crear Endpoint y Cronjob Vercel para `syncAllChampions`:**
    - Si se desea automatizar, crear endpoint en `api/crons/sync-all-champions.ts`.
    - Este endpoint llamará a `syncAllChampions.ts`.
    - Configurar cronjob en `vercel.json`.
    - _Criterio de Éxito:_ Cronjob automatizado funciona para la sincronización completa. **(Pendiente - Opcional)**

## Tablero de Estado del Proyecto

- [x] Verificar/Ajustar Configuración Monorepo
- [x] Crear Paquete `packages/cron-scripts`
- [ ] Crear Directorio y Función Base para API Crons
- [x] Implementar Runner de Scripts Locales en `packages/cron-scripts`
- [ ] Implementar Endpoint API Serverless Específico (para `sample-cron`)
- [ ] Configurar Vercel Cron Job (para `sample-cron`)
- [x] Implementar Endpoints CRUD Campeones en `packages/api`
- [x] Crear Script `updateChampionData` en `packages/cron-scripts` (versión inicial, necesita refactor)
- [x] Crear Schema para Patch Notes
- [x] Implementar Endpoints Básicos de Patch Notes
- [x] Adaptar Script de Webscrapping (`getLatestPatchNote`)
- [ ] Crear Endpoint para Cronjob (`check-patch-notes`)
- [ ] Configurar Cronjob en Vercel (`check-patch-notes`)
- **Nueva Tarea: Sincronizar Datos de Campeones desde DDragon**
  - [x] Refactorizar Script `updateChampionStats.ts` (Tarea 12 - Rol aclarado)
  - [x] Crear Script Orquestador `syncAllChampions.ts` (Tarea 13)
  - [x] Implementar Obtención de Lista Maestra (en `syncAllChampions.ts`) (Tarea 14)
  - [x] Implementar Bucle de Procesamiento (en `syncAllChampions.ts`) (Tarea 15)
  - [x] Implementar Lógica de Guardado Upsert con Prisma (Tarea 16 - Integrado en el bucle)
  - [x] Integrar Guardado en Bucle y Logging Final (en `syncAllChampions.ts`) (Tarea 17)
  - [ ] (Opcional) Crear Endpoint y Cronjob Vercel (Tarea 18)

## Comentarios o Solicitudes de Asistencia del Executor

- **Tarea 1:** Verificado `pnpm-workspace.yaml`. Incluye `packages/*` y `apps/*`. Ejecutado `pnpm install` con éxito. Configuración del monorepo lista para los nuevos paquetes/directorios.
- **Tarea 2:** Creado paquete `packages/cron-scripts` con estructura base (package.json, tsconfig.json). Añadido script de ejemplo `sample-script.ts` e implementado `index.ts` para exportación. Corregidas dependencias para usar las mismas versiones del monorepo existente. Actualizado `tsconfig.json` para extender de `@lol-assistant/typescript-config/internal-package.json` y usar la misma configuración de módulos que otros paquetes (`moduleResolution: "Bundler"`). Compilación exitosa con `pnpm --filter @lol-assistant/cron-scripts run build`.
- **Tarea 4:** Implementado y probado el runner de scripts locales. Corregidos problemas de resolución de módulos para `ts-node` utilizando `--experimental-specifier-resolution=node`. Verificado el funcionamiento con `pnpm --filter @lol-assistant/cron-scripts run start sample-script` y la capacidad de pasar parámetros como `timestamp=true message="Prueba personalizada"`.
- **Tarea 7 y 8:** Implementados endpoints CRUD para campeones y script de actualización. El script `updateChampion` permite actualizar campos específicos de un campeón sin sobrescribir valores existentes no proporcionados. Verificado el funcionamiento con `pnpm script:run updateChampion id="<champion-id>" name="New Name"`.
- **Tarea 9:**
  - Creado schema de validación en `packages/api/src/schemas/patchNote.schema.ts`
  - Implementado controlador en `packages/api/src/controllers/patchNote.controller.ts`
  - Implementados endpoints básicos:
    - Create Patch Note
    - Get Latest Patch Note (usando campo date para ordenamiento)
  - ⏳ Pendientes:
    - Crear endpoint para cronjob
    - Configurar cronjob en Vercel
- **Tarea 10:** Refactorizado `updateChampionStats.ts`.
  - ✅ Movida lógica de DDragon a `common/getChampionRawData.ts` y `common/parseChampionRawData.ts`.
  - ✅ Criterio de Éxito: Script reubicado, estructura modularizada, acepta `patchVersion`.
- **Tarea 11:**
  - ✅ Actualizado schema de champion para incluir `lastPatchVersion`
  - ✅ Mejorado controlador de champion con:
    - ✅ Validación de duplicados (nombre/slug)
    - ✅ Manejo explícito de `lastPatchVersion`
    - ✅ Mejor manejo de errores
  - ✅ Implementada lógica de upsert para actualizaciones
  - ✅ Verificado funcionamiento con pruebas locales
- **Tarea 13:** Creado script `packages/cron-scripts/src/scripts/syncAllChampions.ts`. Exportada y utilizada la función `parseArgs` desde `run.ts` para manejar el argumento `patchVersion`. Script ejecutable a través de `pnpm script:run syncAllChampions patchVersion=<version>`.
- **Tarea 14-17:** Implementado script `syncAllChampions.ts` completo:
  - ✅ Obtención de lista de campeones desde DDragon
  - ✅ Bucle de procesamiento con reintentos (3 intentos por campeón)
  - ✅ Manejo de errores individuales sin detener el proceso
  - ✅ Logging detallado de progreso y resultados
  - ✅ Resumen final con estadísticas de éxito/fallo
  - ✅ Verificado funcionamiento con pruebas locales
