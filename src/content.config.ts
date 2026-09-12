import fs from 'node:fs';
import path from 'node:path';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import type { Loader } from 'astro/loaders';
import { load as loadYaml } from 'js-yaml';

// Keystatic singletons (tanpa content field) disimpan sebagai file .yaml polos,
// yang tidak dikenal loader bawaan Astro. Loader kecil ini membaca satu file
// .yaml dan mendaftarkannya sebagai koleksi satu entri — plus ikut di-watch
// supaya halaman hot-reload saat file diedit dari dashboard Keystatic.
function yamlSingleton(fileName: string, id: string): Loader {
  const filePath = path.resolve('src/content/settings', fileName);
  return {
    name: `yaml-singleton-${id}`,
    load({ store, watcher }) {
      const read = () => {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const data = loadYaml(raw) as Record<string, unknown>;
        store.set({ id, data });
      };
      read();
      watcher?.add(filePath);
      watcher?.on('change', (changed) => {
        if (changed === filePath) read();
      });
    },
  };
}

const works = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    headline: z.string().optional(),
    category: z.string(),
    description: z.string(),
    thumbnail: z.string().optional(),
    metric: z.string().optional(),
    metricColor: z.enum(['emerald', 'purple', 'teal', 'amber']).default('emerald'),
    badge: z.string().optional(),
    role: z.string().optional(),
    client: z.string().optional(),
    duration: z.string().optional(),
    stack: z.string().optional(),
    quote: z.string().optional(),
    quoteAuthor: z.string().optional(),
    quoteRole: z.string().optional(),
    order: z.number().default(99),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    readTime: z.string().default('5 min read'),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    tagColor: z.enum(['amber', 'purple', 'sky', 'emerald']).default('amber'),
  }),
});

// ---- Singletons (Keystatic "singletons", satu file .yaml per halaman) ----
const profile = defineCollection({
  loader: yamlSingleton('profile.yaml', 'profile'),
  schema: z.object({
    name: z.string().default('Adnan F. Muhammad'),
    role: z.string().default('UI/UX Designer'),
    avatar: z.string().default(''),
    availabilityLabel: z.string().default('Available for work'),
    tagline: z.string().default(''),
    description: z.string().default(''),
    expertise: z
      .array(
        z.object({
          label: z.string(),
        })
      )
      .default([]),
    authorRole: z.string().default('Product & UI Systems Designer'),
    articleLocation: z.string().default('Written from San Francisco, CA'),
  }),
});

const experience = defineCollection({
  loader: yamlSingleton('experience.yaml', 'experience'),
  schema: z.object({
    heading: z.string().default('Work Experience & History'),
    subtitle: z.string().default(''),
    jobs: z
      .array(
        z.object({
          logo: z.string().default(''),
          role: z.string(),
          company: z.string(),
          employmentType: z.string().default(''),
          period: z.string().default(''),
          current: z.boolean().default(false),
          description: z.string().default(''),
          highlights: z.array(z.string()).default([]),
          tags: z.array(z.string()).default([]),
        })
      )
      .default([]),
  }),
});

const worksPage = defineCollection({
  loader: yamlSingleton('works-page.yaml', 'works-page'),
  schema: z.object({
    headline: z.string().default(''),
    description: z.string().default(''),
    ctaTitle: z.string().default(''),
    ctaSubtitle: z.string().default(''),
  }),
});

const writingPage = defineCollection({
  loader: yamlSingleton('writing-page.yaml', 'writing-page'),
  schema: z.object({
    heading: z.string().default('Writing & Thoughts.'),
    description: z.string().default(''),
  }),
});

const playground = defineCollection({
  loader: yamlSingleton('playground.yaml', 'playground'),
  schema: z.object({
    heading: z.string().default('Playground.'),
    description: z.string().default(''),
    demoTitle: z.string().default(''),
    demoDescription: z.string().default(''),
    demoButton: z.string().default('Press and hold'),
    experiments: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().default(''),
          icon: z.enum(['palette', 'bolt']).default('palette'),
        })
      )
      .default([]),
  }),
});

const contacts = defineCollection({
  loader: yamlSingleton('contacts.yaml', 'contacts'),
  schema: z.object({
    heading: z.string().default("Let's talk."),
    description: z.string().default(''),
    email: z.string().default(''),
    socials: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().nullish(),
        })
      )
      .default([]),
  }),
});

export const collections = { works, writing, profile, experience, 'works-page': worksPage, 'writing-page': writingPage, playground, contacts };
