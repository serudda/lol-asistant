# lol-assistant Scratchpad

## Antecedentes y Motivación

El usuario quiere crear una página simple en el proyecto `apps/web`. Esta página servirá como interfaz para que los usuarios seleccionen un "Champ" usando un Combobox con búsqueda. El proyecto `apps/web` parece usar Vite, React, TypeScript y Tailwind CSS.

## Desafíos Clave y Análisis

- Necesitamos determinar la estructura de archivos específica dentro de `apps/web/src` para crear nuevas páginas/rutas. Asumiremos una estructura de componentes estándar de React.
- Necesitamos **primero revisar la librería local `/packages/ui`** para ver si existe un componente Combobox adecuado compatible con React y Tailwind CSS. Si existe, lo usaremos. Si no, propondremos **crear uno nuevo dentro de `/packages/ui`**.
- Necesitamos una fuente de datos para los campeones. Usaremos el modelo `Champion` de Prisma definido en `/packages/db` para crear datos estáticos iniciales.

## Desglose de Tareas de Alto Nivel

1.  **Configurar Estructura de Página:** Crear el archivo/componente para la nueva página (p. ej., `apps/web/src/pages/PickChampPage.tsx` o similar, dependiendo de la configuración de enrutamiento).
    - _Criterio:_ El archivo existe en la ruta correcta. El componente básico de la página se renderiza dentro de la estructura de enrutamiento de la aplicación.
2.  **Añadir Título:** Implementar el título "Pick a Champ" en la página con clases de Tailwind CSS apropiadas para texto grande.
    - _Criterio:_ El texto "Pick a Champ" es visible en la página y es notablemente más grande que el texto estándar (p. ej., usando `text-3xl` o `text-4xl`).
3.  **Integrar Componente Combobox:** Añadir un componente Combobox a la página. **Primero, investigar si existe un componente adecuado en `/packages/ui`**. Si no, **planificar la creación de un nuevo componente Combobox reutilizable en `/packages/ui`**. Implementar el Combobox en la página.
    - _Criterio:_ Un elemento UI de Combobox se renderiza en la página debajo del título. Requiere identificar/crear el componente primero.
4.  **Poblar Datos del Combobox:** Añadir una lista estática de campeones de ejemplo al Combobox, **basada en la estructura del modelo `Champion` de `/packages/db`** (p. ej., objetos con `id` y `name`).
    - _Criterio:_ El Combobox se puede abrir, y los campeones de ejemplo (con estructura similar al modelo `Champion`) se listan y se pueden buscar/seleccionar por nombre.

## Tablero de Estado del Proyecto

- [ ] **(Parcial)** Configurar Estructura de Página (Archivo creado, falta integración de rutas)
- [x] Añadir Título
- [x] Integrar Componente Combobox (investigar/crear en `/packages/ui`)
- [ ] Poblar Datos del Combobox (usando estructura de `Champion`)

## Comentarios o Solicitudes de Asistencia del Executor

- **Tarea 1:** Creado el archivo `apps/web/src/pages/PickChampPage.tsx`. No se encontró un sistema de enrutamiento. Se modificó `App.tsx` temporalmente para renderizar `PickChampPage` directamente.
- **Tarea 2:** Título "Pick a Champ" añadido a `PickChampPage.tsx` con estilos de Tailwind. Verificado.
- **Tarea 3:** Identificado y añadido `Combobox` desde `@lol-assistant/ui` a `PickChampPage.tsx`. Se añadió la dependencia `lucide-react`. Se ejecutó `pnpm install`. Pendiente de verificación visual del Combobox básico por el usuario.

## Lecciones

- El gestor de paquetes utilizado en este monorepo es `pnpm`. Usar `pnpm install` para instalar dependencias y gestionar workspaces.
- El paquete UI se llama `@lol-assistant/ui`.
