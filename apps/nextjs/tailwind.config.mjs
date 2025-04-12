import basePreset from '@discord-bot/tailwind-preset';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [basePreset],
};

export default config;
