// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// The Keystatic admin UI registers server-rendered routes (prerender: false).
// With `storage.kind: 'local'` it only ever works through the dev server anyway,
// so it is registered in development only — production builds stay fully static.
const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), ...(isDev ? [keystatic()] : [])],
  output: 'static',
});
