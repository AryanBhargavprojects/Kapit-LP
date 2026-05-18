// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [clerk(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
