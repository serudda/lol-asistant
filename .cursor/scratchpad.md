# lol-assistant Project Scratchpad

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

## Project Structure Overview

## Project Status Board

## Executor Comments or Assistance Requests

## Lessons

- **Estrategia de Scraping:** Siempre investigar APIs JSON/GraphQL ocultas o internas antes de recurrir al scraping HTML (Cheerio/Puppeteer). La interacción API es mucho más robusta y menos propensa a romperse por cambios en la UI. Usar extensivamente las herramientas de desarrollador del navegador (pestaña Red).
