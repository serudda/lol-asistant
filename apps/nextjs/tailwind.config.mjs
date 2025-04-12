import baseConfig from '@lol-assistant/tailwind-config';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [baseConfig],
};

export default config;
