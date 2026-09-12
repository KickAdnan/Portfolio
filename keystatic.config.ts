import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    // GitHub mode: edit di admin langsung di-commit ke GitHub.
    // Butuh GitHub App + env: KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET.
    kind: 'github',
    repo: 'KickAdnan/portfolio',
  },
  collections: {
    works: collection({
      label: 'Works',
      slugField: 'title',
      path: 'src/content/works/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        headline: fields.text({ label: 'Headline (judul besar halaman case study)' }),
        category: fields.text({ label: 'Category' }),
        description: fields.text({ label: 'Short description', multiline: true }),
        thumbnail: fields.url({ label: 'Thumbnail URL (16:9, min 800x450)' }),
        metric: fields.text({ label: 'Metric badge (mis. +34% Efficiency)' }),
        metricColor: fields.select({
          label: 'Metric badge color',
          options: [
            { label: 'Emerald', value: 'emerald' },
            { label: 'Purple', value: 'purple' },
            { label: 'Teal', value: 'teal' },
            { label: 'Amber', value: 'amber' },
          ],
          defaultValue: 'emerald',
        }),
        badge: fields.text({ label: 'Secondary badge (mis. WCAG 2.1 AA)' }),
        role: fields.text({ label: 'Role' }),
        client: fields.text({ label: 'Client' }),
        duration: fields.text({ label: 'Duration' }),
        stack: fields.text({ label: 'Core stack' }),
        quote: fields.text({ label: 'Testimonial quote', multiline: true }),
        quoteAuthor: fields.text({ label: 'Testimonial author' }),
        quoteRole: fields.text({ label: 'Testimonial author role' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 99 }),
        content: fields.markdoc({ label: 'Case study content' }),
      },
    }),
    writing: collection({
      label: 'Writing',
      slugField: 'title',
      path: 'src/content/writing/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        readTime: fields.text({ label: 'Read time', defaultValue: '5 min read' }),
        description: fields.text({ label: 'Excerpt', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        tagColor: fields.select({
          label: 'Primary tag color',
          options: [
            { label: 'Amber', value: 'amber' },
            { label: 'Purple', value: 'purple' },
            { label: 'Sky', value: 'sky' },
            { label: 'Emerald', value: 'emerald' },
          ],
          defaultValue: 'amber',
        }),
        content: fields.markdoc({ label: 'Article content' }),
      },
    }),
  },
  // Singletons tanpa content field disimpan sebagai .yaml polos —
  // dibaca di sisi Astro lewat loader yamlSingleton (src/content.config.ts).
  singletons: {
    profile: singleton({
      label: 'Profile',
      path: 'src/content/settings/profile',
      schema: {
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role' }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        availabilityLabel: fields.text({ label: 'Availability badge text' }),
        tagline: fields.text({ label: 'Tagline (new line = new line)', multiline: true }),
        description: fields.text({ label: 'Short bio', multiline: true }),
        expertise: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Expertise' }
        ),
        authorRole: fields.text({ label: 'Author role (article page)' }),
        articleLocation: fields.text({ label: 'Article footer location' }),
      },
    }),
    experience: singleton({
      label: 'Experience page',
      path: 'src/content/settings/experience',
      schema: {
        heading: fields.text({ label: 'Heading' }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
        jobs: fields.array(
          fields.object({
            logo: fields.image({
              label: 'Company logo (square, min 80x80)',
              directory: 'public/images',
              publicPath: '/images/',
            }),
            role: fields.text({ label: 'Job title' }),
            company: fields.text({ label: 'Company' }),
            employmentType: fields.text({ label: 'Employment type' }),
            period: fields.text({ label: 'Period' }),
            current: fields.checkbox({ label: 'Current job (shows "Current" badge)', defaultValue: false }),
            description: fields.text({ label: 'Description', multiline: true }),
            highlights: fields.array(fields.text({ label: 'Highlight' }), { label: 'Highlights' }),
            tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
          }),
          { label: 'Jobs' }
        ),
      },
    }),
    'works-page': singleton({
      label: 'Works page',
      path: 'src/content/settings/works-page',
      schema: {
        headline: fields.text({ label: 'Headline (new line = new line)', multiline: true }),
        description: fields.text({ label: 'Description', multiline: true }),
        ctaTitle: fields.text({ label: 'CTA title' }),
        ctaSubtitle: fields.text({ label: 'CTA subtitle' }),
      },
    }),
    'writing-page': singleton({
      label: 'Writing page',
      path: 'src/content/settings/writing-page',
      schema: {
        heading: fields.text({ label: 'Heading' }),
        description: fields.text({ label: 'Description', multiline: true }),
      },
    }),
    // Playground hidden for now — uncomment to bring it back in the admin.
    // The YAML data (src/content/settings/playground.yaml) is kept untouched.
    // playground: singleton({
    //   label: 'Playground page',
    //   path: 'src/content/settings/playground',
    //   schema: {
    //     heading: fields.text({ label: 'Heading' }),
    //     description: fields.text({ label: 'Description', multiline: true }),
    //     demoTitle: fields.text({ label: 'Live demo title' }),
    //     demoDescription: fields.text({ label: 'Live demo description', multiline: true }),
    //     demoButton: fields.text({ label: 'Live demo button label' }),
    //     experiments: fields.array(
    //       fields.object({
    //         title: fields.text({ label: 'Title' }),
    //         description: fields.text({ label: 'Description', multiline: true }),
    //         icon: fields.select({
    //           label: 'Icon',
    //           options: [
    //             { label: 'Palette', value: 'palette' },
    //             { label: 'Bolt', value: 'bolt' },
    //           ],
    //           defaultValue: 'palette',
    //         }),
    //       }),
    //       { label: 'Experiments' }
    //     ),
    //   },
    // }),
    contacts: singleton({
      label: 'Contacts page',
      path: 'src/content/settings/contacts',
      schema: {
        heading: fields.text({ label: 'Heading' }),
        description: fields.text({ label: 'Description', multiline: true }),
        email: fields.text({ label: 'Email' }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL (leave empty to show a placeholder button)' }),
          }),
          { label: 'Social links' }
        ),
      },
    }),
  },
});
