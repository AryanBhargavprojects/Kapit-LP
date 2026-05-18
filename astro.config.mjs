// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import { dark } from '@clerk/ui/themes';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    clerk({
      appearance: {
        theme: dark,
        variables: {
          colorPrimary: '#7C3AED',
          colorBackground: '#0A0A0A',
          colorInputBackground: '#111111',
          colorInputText: '#EDEDED',
          colorText: '#EDEDED',
          colorTextSecondary: '#A1A1A1',
          colorNeutral: '#262626',
          borderRadius: '0.5rem',
          fontFamily: 'Inter, sans-serif',
        },
        options: {
          logoImageUrl: '/kapit_logo.png',
        },
      },
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
