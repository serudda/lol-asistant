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

## High-Level Task Breakdown

**Fase 1: Configuración Inicial y Estructura del Proyecto**

1.  **Inicializar Monorepo:** Configurar el proyecto usando Turborepo y PNPM workspaces.
2.  **Configurar Herramientas Base:** Establecer TypeScript, ESLint, Prettier, asegurando el uso de configuraciones compartidas desde `/tooling` según las convenciones del proyecto.
3.  **Definir Estructura Básica:** Crear los paquetes iniciales necesarios (ej. `apps/web`, `packages/api`, `packages/db`, `packages/cron-scripts`).

**Fase 2: Investigación y Adquisición de Datos**

1.  **Investigar Fuentes de Datos:** Analizar Mobalytics, OP.GG y U.GG para determinar la mejor estrategia de extracción de datos (API vs. Scraping). Priorizar la búsqueda de APIs (públicas u ocultas).
2.  **Implementar Fetchers de Datos:** Crear funciones o scripts (probablemente en `packages/cron-scripts` o `packages/api`) para obtener los datos de _counter picks_ y _winrates_ de cada una de las 3 fuentes.

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
3.  **Script - Actualizar Datos de Counters/Winrates:** Desarrollar el script principal (en `packages/cron-scripts`) que orqueste la ejecución de los _fetchers_ de la Fase 2 (Mobalytics, OP.GG, U.GG) y actualice los datos de _counter picks_ y _winrates_ en la base de datos. Este es el corazón de la actualización periódica.
4.  **Configurar Cron Jobs:** Configurar un servicio de Cron (ej. Vercel Cron Jobs) para ejecutar los scripts anteriores.
    - El script de _counters/winrates_ (Paso 3) debería ejecutarse con una frecuencia regular (ej. diaria o cada pocas horas) para mantener los datos frescos.
    - Los scripts de notas del parche y datos base de campeones (Pasos 1 y 2) podrían ejecutarse con menor frecuencia o activarse idealmente tras la detección de un nuevo parche (ciclo típico de ~15 días), o simplemente ejecutarse también de forma regular (ej. diaria) si la detección es compleja.

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

**[WIP] Implementar Script `ugg-get-counters` (LOL-35) - https://linear.app/lol-assistant/issue/LOL-35/add-ugg-script-to-get-counter-list**

- **1. Analizar Fuente de Datos U.GG:** Investigar la página de counters de U.GG (ej. `/champion/leesin/counters`) usando DevTools. Identificar si existe una API pública, endpoint interno (JSON/GraphQL) o si es necesario hacer scraping HTML. Documentar la estrategia elegida (URL, método, headers, estructura de respuesta).
- **2. Crear Estructura del Script:** Crear la carpeta `packages/cron-scripts/src/scripts/getChampionCounters/ugg` y la subcarpeta `common/`. Configurar la estructura base del fetcher (`getUGGCounters.ts`), DTOs y tipos, siguiendo el patrón de Mobalytics/OP.GG.
- **3. Implementar Lógica de Fetching:** Escribir el código para obtener y parsear los datos de counters de U.GG para un campeón, rol y rango dados. Manejar errores de red, validaciones estrictas y logs útiles. No asignar valores arbitrarios si faltan datos críticos.
- **4. Definir Tipos de Datos y DTOs:** Definir los tipos y DTOs alineados con el modelo común (`SourceCounter`). Asegurar que el parseo y la salida cumplen con la estructura esperada.
- **5. Añadir Logging y Manejo de Errores:** Implementar logs informativos (inicio, éxito, errores específicos) y manejo robusto de errores en fetching y parsing.
- **6. Integrar con el Entrypoint Multi-fuente:** Integrar el fetcher de U.GG en `getChampionCounters`, usando los enums internos y mappers para roles/rangos.
- _Criterio de Éxito:_ El script obtiene y normaliza datos de counters de U.GG para un campeón, rol y rango, los muestra estructurados en consola (según el tipo definido), y maneja errores básicos. El código es robusto, extensible y alineado con los fetchers de Mobalytics y OP.GG.

## Executor Comments or Assistance Requests

- OP.GG fetcher ahora es robusto, extensible y alineado con el resto del sistema. El mapeo de enums internos permite agregar nuevas fuentes sin fricción. Listo para revisión/merge.

## Lessons

- **Estrategia de Scraping:** Siempre investigar APIs JSON/GraphQL ocultas o internas antes de recurrir al scraping HTML (Cheerio/Puppeteer). La interacción API es mucho más robusta y menos propensa a romperse por cambios en la UI. Usar extensivamente las herramientas de desarrollador del navegador (pestaña Red).
