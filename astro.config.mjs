// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import { dark } from '@clerk/ui/themes';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
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
        elements: {
          logoImage: {
            height: '52px',
            width: 'auto',
            maxWidth: '180px',
          },
          socialButtonsBlockButtonText: {
            color: '#EDEDED',
            fontWeight: '500',
          },
          socialButtonsBlockButtonArrow: {
            color: '#EDEDED',
          },
          userButtonPopoverActionButtonText: {
            color: '#EDEDED',
          },
          userButtonPopoverActionButtonIcon: {
            color: '#A1A1A1',
          },
          userButtonPopoverFooter: {
            color: '#6E6E6E',
          },
        },
      },
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});