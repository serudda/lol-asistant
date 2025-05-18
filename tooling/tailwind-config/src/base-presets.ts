import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': 'oklch(var(--color-primary-50) / <alpha-value>)',
          '100': 'oklch(var(--color-primary-100) / <alpha-value>)',
          '200': 'oklch(var(--color-primary-200) / <alpha-value>)',
          '300': 'oklch(var(--color-primary-300) / <alpha-value>)',
          '400': 'oklch(var(--color-primary-400) / <alpha-value>)',
          '500': 'oklch(var(--color-primary-500) / <alpha-value>)',
          '600': 'oklch(var(--color-primary-600) / <alpha-value>)',
          '700': 'oklch(var(--color-primary-700) / <alpha-value>)',
          '800': 'oklch(var(--color-primary-800) / <alpha-value>)',
          '900': 'oklch(var(--color-primary-900) / <alpha-value>)',
          '950': 'oklch(var(--color-primary-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        monoscape: ['Berkeley Mono', 'SFMono Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'],
      },
    },
  },
} satisfies Config;
