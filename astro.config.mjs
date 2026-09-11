// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

// The Keystatic admin UI registers server-rendered routes (prerender: false).
// GitHub mode signs in via OAuth and commits straight to GitHub, so those
// routes must exist in production too — the Netlify adapter hosts them.
// Everything else stays statically prerendered.
// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  adapter: netlify(),
  output: 'static',
});
