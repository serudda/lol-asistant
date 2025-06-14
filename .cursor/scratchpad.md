# League of Legends Assistant Project Scratchpad

## Background and Motivation

Este Side Project surge de la experiencia personal como jugador casual de League of Legends. La fase de selección de campeón, con su tiempo limitado, a menudo obliga a consultar de forma apresurada y simultánea múltiples fuentes web (Mobalytics, OP.GG, U.GG, etc.) para identificar los _counter picks_ más efectivos contra un campeón enemigo específico (por ejemplo, buscar _counters_ para Lee Sin en la jungla). Este proceso fragmentado y bajo presión puede llevar a tomar decisiones de selección subóptimas.

El objetivo principal de Lol Assistant es centralizar y simplificar esta búsqueda. Se propone desarrollar una aplicación (inicialmente como un Producto Mínimo Viable - MVP) que permita, a través de una interfaz simple como un _combobox_, buscar rápidamente un campeón enemigo y obtener una vista consolidada de sus _counter picks_ más relevantes. La aplicación presentará los porcentajes de _winrate_ de cada _counter_, obtenidos de diversas fuentes de datos confiables, y calculará un indicador agregado (como un promedio ponderado o una métrica propia) para ofrecer una recomendación clara y fundamentada, optimizando la toma de decisiones durante la selección de campeón.

Si bien el MVP se enfocará exclusivamente en la funcionalidad de _counter picks_, la visión a largo plazo es expandir Lol Assistant con características adicionales que aporten valor a los jugadores de League of Legends.

## Key Challenges and Analysis

1.  **Obtención de Datos (Data Acquisition):**

    - Identificar fuentes de datos fiables y actualizadas para los _counter picks_ y _winrates_. Inicialmente, nos centraremos en las siguientes tres fuentes principales:
      - Mobalytics ([https://mobalytics.gg/](https://mobalytics.gg/))
      - OP.GG ([https://op.gg/](https://op.gg/))
      - U.GG ([https://u.gg/](https://u.gg/))
    - Evaluar si estas fuentes ofrecen APIs públicas o si será necesario recurrir a técnicas de _web scraping_. El scraping presenta desafíos como fragilidad ante cambios en las webs, posibles bloqueos y necesidad de mantenimiento constante. Investigar APIs ocultas/internas será prioritario antes de optar por scraping (ver sección _Lessons_).
    - Gestionar la posible inconsistencia o variaciones en los datos entre diferentes fuentes.

2.  **Consolidación y Ponderación de Datos:**

    - Definir la lógica para agregar los datos de las múltiples fuentes. ¿Cómo calcular el "indicador agregado"? (Ej: promedio simple, ponderado -¿con qué pesos?-, métrica propia).
    - De ser necesario, establecer criterios claros para determinar qué constituye un "counter pick efectivo". O simplemente con el ponderado ya seria lo suficientemente confiable?.

3.  **Actualización de Datos:**

    - El metajuego de League of Legends cambia constantemente. Se necesitará un mecanismo para mantener los datos actualizados (probablemente _cron jobs_). Definir la frecuencia y el proceso de actualización es clave. Una buena opción podria ser los Cron Jobs de Vercel.

4.  **Experiencia de Usuario (UX) en Tiempo Real:**

    - La aplicación debe ser extremadamente rápida y fácil de usar durante la breve fase de selección de campeón. El rendimiento y la claridad de la interfaz son cruciales.

5.  **Escalabilidad y Rendimiento de la Adquisición de Datos (MVP Strategy):**

    - El enfoque actual de scraping secuencial para todas las combinaciones de campeones (aprox. 160+), roles (hasta 5 por campeón), rank tiers (aprox. 7-10 significativos) y fuentes de datos (3 iniciales) presenta un desafío de escalabilidad. Esto resulta en `Campeones * Roles * Tiers * Fuentes` instancias de scraping.
    - Un proceso tan exhaustivo puede tomar días en lugar de horas, excediendo la ventana de actualización semanal deseada de 5-8 horas.
    - **Estrategia MVP:** Para lograr un MVP funcional rápidamente y gestionar la carga de trabajo, se enfoca la adquisición de datos en dos niveles de Elo representativos: uno para "Low Elo" (ej. `BRONZE`) y uno para "High Elo" (ej. `PLATINUM`). El usuario final interactuará con estas categorías abstractas ("Low Elo", "High Elo") sin necesidad de conocer los tiers específicos subyacentes.
    - Se mantienen las estrategias de paralelización y manejo de errores, pero aplicadas a un conjunto de datos mucho menor.

6.  **Filtrado de Combinaciones Inválidas por las Fuentes:**
    - Se ha observado que algunas fuentes de datos (ej. Mobalytics, OP.GG) directamente no proveen información o bloquean el acceso para combinaciones de campeón/rol extremadamente infrecuentes o consideradas inviables (ej. Ahri Jungla).
    - Este comportamiento de las fuentes puede ser utilizado a nuestro favor para omitir proactivamente el intento de scraping para dichas combinaciones, reduciendo el número total de peticiones y el tiempo de procesamiento.
    - Es necesario identificar si este filtrado es consistente entre fuentes o si alguna fuente podría aún tener datos para estas combinaciones raras.

## High-Level Task Breakdown

**Fase 1: Configuración Inicial y Estructura del Proyecto**

1.  **Inicializar Monorepo:** Configurar el proyecto usando Turborepo y PNPM workspaces.
2.  **Configurar Herramientas Base:** Establecer TypeScript, ESLint, Prettier, asegurando el uso de configuraciones compartidas desde `/tooling` según las convenciones del proyecto.
3.  **Definir Estructura Básica:** Crear los paquetes iniciales necesarios (ej. `apps/web`, `packages/api`, `packages/db`, `packages/cron-scripts`).

**Fase 2: Investigación y Adquisición de Datos**

1.  **Investigar Fuentes de Datos:** Analizar Mobalytics, OP.GG y U.GG para determinar la mejor estrategia de extracción de datos (API vs. Scraping). Priorizar la búsqueda de APIs (públicas u ocultas).

    - Confirmar hallazgos: Mobalytics (API pública disponible), U.GG (requiere scraping), OP.GG (requiere scraping).

2.  **Definir Estrategia de Adquisición para MVP (Dos Tiers Representativos):**
    - Seleccionar un (1) `RankTier` específico de Prisma para representar "Low Elo" (ej. `BRONZE`).
    - Seleccionar un (1) `RankTier` específico de Prisma para representar "High Elo" (ej. `PLATINUM`).
    - La adquisición de datos mediante `orchestrateMatchupStats` se configurará para obtener datos _exclusivamente_ para estas dos combinaciones de tier para todos los campeones y roles seleccionados.
    - El modelo de datos `ChampionMatchup` no cambia y seguirá almacenando el `RankTier` específico (`BRONZE` o `PLATINUM`).
    - Considerar la posibilidad de que algunas fuentes (ej. Mobalytics, OP.GG) ya filtren/bloqueen combinaciones campeón/rol muy infrecuentes (ej. Ahri Jungla). Si es posible identificar un patrón o lista de estas combinaciones no soportadas por las fuentes mayoritarias, se podrían omitir proactivamente para ahorrar recursos, siempre y cuando no comprometa la exhaustividad de datos válidos de otras fuentes.
    - _Criterio de Éxito:_ Documento de estrategia que defina los dos `RankTier` seleccionados para representar "Low Elo" y "High Elo". El script orquestador está configurado para procesar solo estos dos tiers. Se mantiene la ventana de tiempo de 5-8 horas para la actualización (ahora más factible).
3.  **Diseñar e Implementar Arquitectura de Scraping Paralelizado (Enfocada en MVP):**
    - Investigar y seleccionar un mecanismo para ejecutar tareas de scraping en paralelo (ej. job queues como BullMQ con workers en Node.js, ejecución concurrente de funciones serverless si aplica al stack).
    - Implementar workers de scraping para cada fuente de datos (Mobalytics, OP.GG, U.GG) capaces de procesar una combinación específica (campeón, rol, tier) de forma aislada.
    - Configurar un gestor de colas (si se usa esa aproximación) para distribuir las tareas de scraping a los workers.
    - Limitar el número de workers concurrentes _por fuente de datos específica_ para evitar sobrecargar sus servidores (ej. configurable, N workers para U.GG, M para OP.GG).
    - _Criterio de Éxito:_ Capacidad de ejecutar N tareas de scraping concurrentemente, con pruebas preliminares que demuestren una reducción significativa del tiempo total estimado en comparación con un enfoque secuencial, y con límites de concurrencia por fuente implementados.
4.  **Implementar Gestión Avanzada de Rate Limiting, Reintentos y Errores:**
    - Para cada fuente, implementar mecanismos robustos de backoff exponencial y un número configurable de reintentos en caso de errores HTTP (429, 5xx) o fallos de parsing.
    - Considerar el uso de proxies rotativos si es estrictamente necesario y las políticas de las fuentes lo permiten (evaluar coste/beneficio y legalidad).
    - Añadir delays configurables y realistas entre peticiones por worker para cada fuente, para no sobrecargar los servidores de origen y simular un comportamiento más humano.
    - Manejo detallado de errores para identificar selectores rotos o cambios inesperados en la estructura HTML.
    - _Criterio de Éxito:_ El sistema de scraping puede manejar errores transitorios y límites de tasa de forma robusta, reintentando automáticamente y registrando fallos persistentes sin detener todo el proceso. Las configuraciones de delay y reintentos son ajustables.
5.  **Implementar Fetchers de Datos:** Crear funciones o scripts (probablemente en `packages/cron-scripts` o `packages/api`) para obtener los datos de _counter picks_ y _winrates_ de cada una de las 3 fuentes, utilizando la arquitectura paralela y las estrategias de manejo de errores definidas.

**Fase 3: Almacenamiento y Procesamiento de Datos**

1.  **Configurar Base de Datos:** Inicializar Prisma en `packages/db` y definir los modelos necesarios (ej. Campeón, CounterPick, FuenteDeDatos).
2.  **Implementar Lógica de Almacenamiento:** Crear funciones para guardar los datos obtenidos en la Fase 2 en la base de datos.
3.  **Implementar Lógica de Consolidación:** Desarrollar la función que tome los datos de las 3 fuentes desde la BD y calcule el indicador agregado/ponderado para los _counter picks_.

**Fase 4: Desarrollo del Backend (API)**

1.  **Crear API Endpoint:** Desarrollar un endpoint (ej. `/api/counters/[championName]`) que reciba un nombre de campeón y devuelva la lista consolidada de _counter picks_ con sus métricas, usando la lógica de la Fase 3. (Podría vivir en `apps/web/pages/api`, `apps/nextjs/app/api` o directamente en `api/` si usamos Vercel Serverless Functions).

**Fase 5: Desarrollo del Frontend (UI/UX)**

1.  **Diseñar Interfaz Básica:** Crear la estructura visual de la aplicación web en `apps/web` (o `apps/nextjs`).
2.  **Implementar Componente de Búsqueda:** Desarrollar el _combobox_ o campo de entrada para buscar campeones.
3.  **Implementar Vista de Resultados:** Mostrar la lista de _counter picks_ devuelta por la API, incluyendo _winrates_ y el indicador agregado.
4.  **Conectar Frontend con Backend:** Integrar la UI con el endpoint de la API creado en la Fase 4.

**Fase 6: Automatización y Mantenimiento de Datos**

1.  **Script - Obtener Notas del Parche:** Desarrollar un script para obtener información sobre los nuevos parches de League of Legends (identificar fuente: ¿API de Riot, web oficial?). Almacenar información relevante en la BD si es necesario para referencia o para disparar otras actualizaciones.
2.  **Script - Actualizar Datos Base de Campeones:** Crear/adaptar un script para actualizar la información fundamental de los campeones (estadísticas base, habilidades, etc.) si la aplicación lo requiere, posiblemente usando datos oficiales (ej. Riot Data Dragon) o basándose en las notas del parche.
3.  **Script - Orquestar Actualización de Datos de Counters/Winrates (Enfocado en MVP):**
    - Desarrollar/modificar el script principal (`orchestrateMatchupStats.ts`) que:
      - Genere combinaciones (campeón, rol) para los _dos tiers representativos_ definidos en la Fase 2.2.
      - Envíe estas combinaciones como tareas a la cola de scraping (implementada en la Fase 2.3).
    - Este script será el corazón de la actualización periódica de datos de counters.
    - _Criterio de Éxito:_ El script puede iniciar, gestionar y completar el proceso de scraping y guardado para todas las combinaciones prioritarias de forma automatizada, dentro de la ventana de tiempo objetivo una vez optimizado.
4.  **Configurar Cron Jobs:** Configurar un servicio de Cron (ej. Vercel Cron Jobs, GitHub Actions, o un scheduler en el propio servidor) para ejecutar los scripts anteriores.
    - El script de _counters/winrates_ (Paso 3) debería ejecutarse con una frecuencia regular (ej. al menos una vez por semana, o idealmente tras cada parche mayor) para mantener los datos frescos.
    - Los scripts de notas del parche y datos base de campeones (Pasos 1 y 2) podrían ejecutarse con menor frecuencia o activarse idealmente tras la detección de un nuevo parche.
    - Considerar programar los cron jobs más intensivos (como la actualización de counters) durante horas de bajo tráfico para los servidores de las fuentes de datos, si es factible y detectable.
5.  **Monitoreo y Alertas del Proceso de Actualización de Datos:**
    - Implementar logging detallado para todo el proceso de scraping y guardado, incluyendo:
      - Tiempo de inicio y fin del proceso general.
      - Número de combinaciones procesadas, exitosas y fallidas.
      - Tiempos por fuente de datos y por worker (si aplica).
      - Errores específicos encontrados y reintentos realizados.
    - Configurar alertas (e.g., email, Discord/Slack Webhooks) si el proceso de actualización falla completamente, o si excede significativamente el tiempo esperado (ej. > 8 horas).
    - Considerar un dashboard básico (puede ser tan simple como logs estructurados enviados a un servicio de logging) para supervisar la salud y rendimiento del proceso.
    - _Criterio de Éxito:_ Un sistema de logs y alertas que permita supervisar la salud y rendimiento del proceso de actualización de datos, y que notifique proactivamente en caso de problemas críticos o degradación del rendimiento.

**Fase 7: Pruebas y Despliegue**

1.  **Implementar Pruebas:** Escribir pruebas unitarias y/o de integración (siguiendo TDD) para las partes críticas (lógica de datos, API).
2.  **Configurar Despliegue:** Preparar la configuración para desplegar la aplicación (ej. Vercel).
3.  **Desplegar MVP:** Poner en producción la versión inicial de la aplicación.

## Project Structure Overview

Este proyecto utiliza una arquitectura monorepo gestionada con Turborepo y PNPM Workspaces para organizar el código de manera eficiente. La estructura principal se divide en aplicaciones (`apps`), paquetes compartidos (`packages`) y configuraciones globales (`tooling`).

Puntos Clave y Directorios Principales:

- **`/tooling`**: Directorio **CRUCIAL** donde se centralizan todas las configuraciones compartidas del proyecto (TypeScript, ESLint, Prettier, Tailwind CSS, etc.). **Antes de crear cualquier archivo de configuración en un paquete o aplicación, se debe verificar si ya existe una configuración base en `/tooling` para extenderla o reutilizarla.** El objetivo es minimizar la duplicidad de configuraciones.

- **`/packages/api`**: Contiene toda la lógica del backend y los endpoints de la API.

  - Se comunica con la base de datos utilizando **Prisma** y **tRPC**.
  - La infraestructura de base de datos se apoya en **Supabase**.
  - **Convención:** Antes de crear un nuevo endpoint, verificar si ya existe uno similar. Al agregar nuevos, seguir la estructura modular: `controller`, `router`, `schemas`.

- **`/packages/db`**: Define el esquema de la base de datos y contiene toda la configuración de **Prisma**.

  - Aquí se encuentra `schema.prisma` y cualquier migración o script relacionado con la base de datos. Es la fuente de verdad para la estructura de datos.

- **`/packages/ui`**: Nuestra librería de componentes de UI compartidos (UI Kit).

  - Contiene componentes base reutilizables en todo el proyecto (ej. `Button`, `TextInput`, `Modal`, `Combobox`).
  - **Convención:** Agregar aquí solo componentes genéricos y reutilizables. Componentes específicos de una aplicación deben vivir dentro de la carpeta de componentes de esa aplicación.

- **`/packages/cron-scripts`**: Centraliza todos los scripts diseñados para ejecutarse periódicamente o bajo demanda.

  - Incluye tareas como _web scraping_, llamadas a APIs externas, procesamiento de datos, etc.
  - Estos scripts son los candidatos a ser desplegados como Cron Jobs en plataformas como Vercel.

- **`/apps/web`**: La aplicación web principal orientada al usuario final.
  - Implementa la interfaz con la que interactúan los usuarios (ej. el _combobox_ para buscar campeones).
  - Contendrá funcionalidades como visualización de datos, autenticación de usuarios, gestión de perfiles (como el Champion Pool), etc.
  - Utilizará componentes de `/packages/ui` y se comunicará con `/packages/api` para obtener y enviar datos.

## Project Status Board

**[DONE] Implementar Script `opgg-get-counters` (LOL-33) - https://linear.app/lol-assistant/issue/LOL-33/add-opgg-get-counters-script** - Scraping robusto de counters desde OP.GG usando Cheerio. - Estructura de carpetas y DTOs alineada con Mobalytics. - Mapeo bidireccional de roles y rangos (enums internos + mappers por fuente). - Integración con entrypoint multi-fuente (`getChampionCounters`), permitiendo fácil extensión a nuevas fuentes. - _Criterio de Éxito:_ El script obtiene y normaliza datos de counters de OP.GG, con validación estricta y logs útiles. Listo para PR y revisión.

**[DONE] Implementar Script `ugg-get-counters` (LOL-35) - https://linear.app/lol-assistant/issue/LOL-35/add-ugg-script-to-get-counter-list** - Parsing y normalización de slugs y datos de counters de U.GG robusto y alineado con OP.GG. (DONE) - _Criterio de Éxito:_ El script obtiene y normaliza datos de counters de U.GG para un campeón, rol y rango, los muestra estructurados en consola (según el tipo definido), y maneja errores básicos. El código es robusto, extensible y alineado con los fetchers de Mobalytics y OP.GG.

**[DONE] Persist counter matchups in DB for each source (LOL-40) - https://linear.app/lol-assistant/issue/LOL-37/persist-counter-matchups-in-db-for-each-source**

- 1. **[DONE] Implementar Endpoints API para `Source` y `SourceMatchupStat`:**
  - Crear/actualizar schemas (Zod) en `packages/api/src/schemas/` para `Source` y `SourceMatchupStat` (CRUD básico para `Source`, `create` para `SourceMatchupStat` esperando IDs de dependencias).
  - Implementar controllers en `packages/api/src/controllers/` para `Source` (CRUD) y `SourceMatchupStat` (`createSourceMatchupStatHandler` que toma IDs y datos directos para `SourceMatchupStat`).
  - Configurar routers en `packages/api/src/router/` y agregarlos a `appRouter`.
  - _Nota:_ La lógica compleja de buscar/crear entidades dependientes (`Champion`, `PatchNote`, `ChampionMatchup`) NO reside en estos handlers directos.
- 2. **Definir DTOs de Persistencia en `cron-scripts`:**

  - Crear DTOs específicos en `packages/cron-scripts/src/scripts/getChampionCounters/[source]/common/dtos.ts`.
  - Estos DTOs transformarán los datos del fetcher de cada fuente en la estructura que esperan las funciones `save<Source>Matchups` (incluyendo la preparación de datos para las dependencias).

- 3. **Crear Funciones de Guardado por Fuente en `cron-scripts` (con lógica de dependencias):**

  - Implementar `saveMobalyticsMatchups(rawData, ...)` en `.../mobalytics/saveMobalyticsMatchups.ts`.
  - Implementar `saveOpggMatchups(rawData, ...)` en `.../opgg/saveOpggMatchups.ts`.
  - Implementar `saveUggMatchups(rawData, ...)` en `.../ugg/saveUggMatchups.ts`.
  - **Lógica Clave:** Estas funciones serán responsables de:
    - Usar los DTOs para parsear `rawData`.
    - Orquestar la creación/búsqueda de `Champion` (base y oponente), `PatchNote` y `ChampionMatchup` (posiblemente usando un nuevo servicio compartido en `packages/api/src/services/` o lógica directa con Prisma).
    - Una vez obtenidos/creados los IDs de las dependencias, llamar al endpoint `sourceMatchupStat.create` (implementado en el paso 1) para guardar el `SourceMatchupStat`.

- 4. **Modificar `packages/cron-scripts/src/scripts/getChampionCounters.ts`:**
  - Llamar a `save<Source>Matchups(...)` después de cada `get<Source>Counters(...)`.
- _Criterios de Éxito:_ Después de ejecutar `getChampionCounters.ts` para un campeón, rol, rango y parche:
  - La base de datos contiene los `Champion`, `PatchNote`, `Source` y `ChampionMatchup` necesarios.
  - Existen registros `SourceMatchupStat` para cada fuente con los datos correctos, vinculados a las entidades anteriores.
  - Ejecuciones posteriores actualizan/crean `SourceMatchupStat` según corresponda, sin duplicar `ChampionMatchup` para el mismo campeón base, oponente, rol y parche.
  - Todos los tests unitarios pasan.

**[DONE] Integrar OP.GG counters -> ChampionMatchup + SourceMatchupStat (LOL-50)** - Refactor `createChampionMatchup` y `saveSourceMatchupStats` utilidades listas. - En `getChampionCounters.ts`: - Crear championMatchup por cada oponente de OP.GG. - Construir `entries` y llamar `saveSourceMatchupStats` una única vez. - _Success Criteria:_ Ejecutar `getChampionCounters` para Volibear jungle patch14.x crea ChampionMatchup y SourceMatchupStat records para todos los oponentes de OP.GG sin hardcodes ni duplicados.

**[DONE] Feature: Obtener y Mostrar Counters al Seleccionar Campeón en Combobox - https://linear.app/lol-assistant/issue/LOL-38/get-counter-list-on-combobox-click**

- (API) Definir Schemas (Zod) en `packages/api` para la petición y respuesta de counters de un campeón (input: `championId` o `championKey`; output: lista de `CounterChampionStat` con `championName`, `winRate`, `matchesPlayed`, `aggregatedScore`, etc.).
- (API) Implementar tRPC router, controller y schema en `packages/api` para el endpoint `championMatchup.getCounters`. Este servicio consulta la BD (`ChampionMatchup`, `SourceMatchupStat`) y devuelve los counters.
- (API) Definir y propagar códigos de error específicos (`CHAMPION_NOT_FOUND`, `NO_COUNTER_DATA`, `NO_COUNTERS`) para el endpoint.
- (Frontend) Modificar el componente Combobox de selección de campeones para que, al seleccionar un campeón, se capture el identificador del mismo.
- (Frontend) Implementar la lógica para invocar el nuevo endpoint tRPC `championMatchup.getCounters` desde el cliente cuando se selecciona un campeón.
- (Frontend) Desarrollar/actualizar el componente o sección de la UI que mostrará la lista de campeones counter devuelta por la API, incluyendo sus estadísticas.
- (Frontend) Manejar los estados de carga y error durante la petición y visualización de los datos de counters.

- _Criterio de Éxito:_ Al seleccionar un campeón en el Combobox, se realiza una petición al backend que devuelve la lista de sus counter picks con estadísticas relevantes (ej. winrate, partidas, score agregado). Esta lista se muestra correctamente en la interfaz de usuario. Los errores (campeón sin datos, error de servidor) se manejan y se informa al usuario adecuadamente.

**[DONE] Implement simple concurrency utility in cron-scripts - internal** - Crear `src/utils/concurrency.ts` con función `mapWithConcurrency` sin dependencias externas. - Soportar límite de concurrencia configurable y manejo de errores sin detener otros trabajos. - _Criterio de Éxito:_ Puedo importar `mapWithConcurrency` y procesar un array de 20 promesas con concurrencia 3, completando en ~n/3 tiempo sin errores de tipos.

**[DONE] Ajustar penalización de score para matchups con solo una fuente - interno**

- Analizar la distribución de `totalMatches` para los matchups de cada campeón (usar mediana como umbral inicial).
- Modificar la función de cálculo de score ponderado:
  - Si el matchup tiene solo una fuente y `totalMatches` < mediana, aplicar penalización (ej. multiplicar por 0.7).
  - Si tiene solo una fuente pero `totalMatches` >= mediana, no penalizar.
  - Testear el ranking con datos reales para verificar que la penalización funciona como esperado.
  - Documentar la lógica en el código y en la sección "Lessons" del scratchpad.
  - _Criterio de Éxito:_ Los matchups con solo una fuente y pocos matches bajan en el ranking; los de una sola fuente pero con muchos matches no son penalizados injustamente.

**[PENDING] Optimizar scraping: solo procesar combinaciones Champion/Role donde el rol sea main para ese campeón**

- Modificar el modelo Champion en schema.prisma para agregar el campo main_roles LoLChampionRole[].
- Poblar el campo main_roles para los campeones existentes (puede ser manual, script, o import desde fuente externa). (Definir subtareas).
- Modificar el script orchestrateMatchupStats.ts para que solo genere tareas de scraping para combinaciones donde el rol esté en main_roles del campeón.
- Documentar la lógica de decisión de main roles (umbral, fuente, etc.) en el código y en la sección "Lessons" del scratchpad.
- _Criterio de Éxito:_ El scraping ignora combinaciones irrelevantes (ej. Caitlyn jungla), el tiempo total de scraping se reduce significativamente, y la BD no se llena de datos basura de roles no jugados.

**[PENDING] Poblar mainRoles de Champion usando League of Graphs**

- Escribir un script que recorra todos los champions y scrapee la tabla de roles de League of Graphs.
- Parsear el pickrate ("Popularity") de cada rol para cada champion.
- Definir y aplicar el threshold de popularidad (>5%) para decidir los main roles.
- Actualizar el campo mainRoles en la base de datos para cada champion.
- Loggear y revisar manualmente los casos edge (campeones con roles flexibles o sin roles claros).
- _Criterio de Éxito:_ Todos los champions tienen su campo mainRoles poblado de acuerdo a la popularidad real de sus roles en League of Graphs.

**[DONE] Deploy and schedule getLatestPatchNote.ts as a Vercel Cron Job**

- Preparar el script para ejecución serverless: revisar dependencias, asegurar que puede correr como endpoint en Vercel (sin estado local, export adecuado).
- Crear endpoint serverless en /api/crons/getLatestPatchNote.ts: adaptar el script y exportar handler compatible con Vercel.
- Configurar el cron job en Vercel: definir el schedule (ej. cada 2-3 días), crear el cron job en el dashboard apuntando al endpoint.
- Testear el cron job en entorno de staging/producción: forzar ejecución manual, verificar guardado correcto y ausencia de duplicados.
- (Opcional) Añadir notificación/alerta si se detecta un nuevo parche (webhook, email, log especial).
- Documentar el proceso y la configuración en README o sección de cron jobs.
- _Criterio de Éxito:_ El cron job ejecuta el script al menos una vez por semana (idealmente cada 2-3 días), detecta y guarda nuevos parches en <48h tras su publicación, no crea duplicados, logs/notificaciones claros, y la configuración es reproducible y documentada.

**[DONE] Implementar arquitectura de Job Queue (BullMQ) para scraping batch de counters de campeones**

- Agregar dependencias de BullMQ e ioredis en `packages/cron-scripts`. Documentar la necesidad de un servidor Redis (local, Docker o cloud).
- Diseñar el modelo de Job: definir el payload mínimo (campeón, patchVersion, roles, tiers, etc.) y decidir si el job es por campeón, batch pequeño o combinación.
- Crear el script de enqueue (`enqueue-champions.ts`): obtener la lista de campeones (DB o hardcode), encolar un job por campeón/batch, permitir parámetros para patchVersion, roles, tiers.
- Crear el worker (`worker.ts`): consumir jobs de la cola y ejecutar `orchestrateMatchupStats.ts` para el campeón/batch, manejar logs, errores y reintentos automáticos, permitir concurrencia configurable.
- Permitir ejecución distribuida: documentar cómo lanzar múltiples instancias de worker en distintas máquinas (requieren acceso a Redis).
- (Opcional) Integrar dashboard de monitoreo (Arena o BullMQ UI) y documentar acceso.
- Documentar cómo automatizar el enqueue con cron (ejemplo de cron semanal).
- Configurar reintentos automáticos y (opcional) alertas para jobs fallidos tras todos los reintentos.
- Documentar la arquitectura, uso, escalado y monitoreo en el README de cron-scripts.
- _Criterio de Éxito:_ El sistema permite lanzar el scraping de los 170 campeones sin intervención manual, escalando a varios workers/máquinas, con reintentos automáticos, monitoreo de progreso y fácil extensión a nuevos batch jobs.

## Executor Comments or Assistance Requests

- OP.GG fetcher ahora es robusto, extensible y alineado con el resto del sistema. El mapeo de enums internos permite agregar nuevas fuentes sin fricción. Listo para revisión/merge.
- **Task LOL-35 (U.GG):** Necesito ayuda con el primer paso: investigar la fuente de datos de U.GG (API interna o scraping) para obtener los datos de counters. Por favor, proporciona la URL, método, headers (si aplica) y estructura de la respuesta encontrada. -> Scraping HTML confirmado.
- **Progress (08-May):** Started implementation of sub-task 1 – created tRPC endpoint (`sourceMatchupStat.create`) with schema, controller, service (`upsertSourceMatchupStat`) and router; added to root router. Next: DTO definitions per source + save functions.
- **Progress (09-May):** User has implemented direct API endpoints for `Source` (CRUD) and `SourceMatchupStat` (`create` taking IDs). This completes a revised version of sub-task 1. The logic for resolving/creating dependencies (`Champion`, `PatchNote`, `ChampionMatchup`) is now planned to be handled within the `save<Source>Matchups` functions in `cron-scripts`.

## Lessons

- **Consistencia entre fuentes:** Mantener la misma estructura de función y DTOs entre los fetchers de diferentes fuentes (OP.GG, U.GG, etc.) facilita el mantenimiento y la extensión del sistema.
- **Validación y logs:** Siempre validar la existencia de los datos extraídos (nombre, winrate, matches) y loguear advertencias o errores para debugging rápido.
- **Robustez ante cambios:** Si el selector o estructura HTML cambia y no se encuentra la sección esperada, lanzar un error explícito y loguear el HTML problemático para facilitar el diagnóstico.
