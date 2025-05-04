# lol-assistant Project Scratchpad

## Background and Motivation

Este Side Project surge de la experiencia personal como jugador casual de League of Legends. La fase de selección de campeón, con su tiempo limitado, a menudo obliga a consultar de forma apresurada y simultánea múltiples fuentes web (Mobalytics, OP.GG, U.GG, etc.) para identificar los _counter picks_ más efectivos contra un campeón enemigo específico (por ejemplo, buscar _counters_ para Lee Sin en la jungla). Este proceso fragmentado y bajo presión puede llevar a tomar decisiones de selección subóptimas.

El objetivo principal de Lol Assistant es centralizar y simplificar esta búsqueda. Se propone desarrollar una aplicación (inicialmente como un Producto Mínimo Viable - MVP) que permita, a través de una interfaz simple como un _combobox_, buscar rápidamente un campeón enemigo y obtener una vista consolidada de sus _counter picks_ más relevantes. La aplicación presentará los porcentajes de _winrate_ de cada _counter_, obtenidos de diversas fuentes de datos confiables, y calculará un indicador agregado (como un promedio ponderado o una métrica propia) para ofrecer una recomendación clara y fundamentada, optimizando la toma de decisiones durante la selección de campeón.

Si bien el MVP se enfocará exclusivamente en la funcionalidad de _counter picks_, la visión a largo plazo es expandir Lol Assistant con características adicionales que aporten valor a los jugadores de League of Legends.

## Key Challenges and Analysis

## High-Level Task Breakdown

## Project Structure Overview

## Project Status Board

## Executor Comments or Assistance Requests

## Lessons

- **Estrategia de Scraping:** Siempre investigar APIs JSON/GraphQL ocultas o internas antes de recurrir al scraping HTML (Cheerio/Puppeteer). La interacción API es mucho más robusta y menos propensa a romperse por cambios en la UI. Usar extensivamente las herramientas de desarrollador del navegador (pestaña Red).
