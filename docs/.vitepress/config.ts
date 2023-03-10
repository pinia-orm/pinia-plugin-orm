import { defineConfig } from 'vitepress'
import { version } from '../../package.json'
import {
  description,
  discord,
  editLink,
  font,
  github,
  name,
  releases,
  twitter,
} from './meta'

export default defineConfig({
  lang: 'en-US',
  title: name,
  description,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { property: 'og:title', content: name }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { name: 'twitter:title', content: name }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { href: font, rel: 'stylesheet' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
  ],
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    editLink: {
      pattern: editLink,
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'twitter', link: twitter },
      { icon: 'discord', link: discord },
      { icon: 'github', link: github },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Elone Hoo',
    },
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Model', link: '/model/' },
      { text: 'Relationships', link: '/relationships/' },
      { text: 'Repository', link: '/repository/' },
      { text: 'Nuxt', link: '/nuxt/' },
      { text: 'API', link: '/api/' },
      { text: 'Playground', link: 'https://playground-pinia-orm-org.vercel.app' },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes',
            link: releases,
          },
        ],
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Why this plugin',
              link: '/guide/why',
            },
            {
              text: 'Getting Started',
              link: '/guide/',
            },
            {
              text: 'Usage',
              link: '/guide/usage',
            },
            {
              text: 'Typescript',
              link: '/guide/typescript',
            },
          ],
        },
        {
          text: 'Model',
          items: [
            {
              text: 'Model Reference',
              link: '/model/',
            },
            {
              text: 'Accessors & Mutators',
              link: '/model/accessors-mutators',
            },
            {
              text: 'Casts',
              link: '/model/casts',
            },
            {
              text: 'Decorators',
              link: '/model/decorators',
            },
            {
              text: 'Lifecycle Hooks',
              link: '/model/lifecycle-hooks',
            },
            {
              text: 'Pinia Options',
              link: '/model/pinia-options',
            },
            {
              text: 'Single Table Inheritance',
              link: '/model/single-table-inheritance',
            },
          ],
        },
        {
          text: 'Relationships',
          items: [
            {
              text: 'Relationships Reference',
              link: '/relationships/',
            },
            {
              text: 'One To One',
              link: '/relationships/one-to-one',
            },
            {
              text: 'One To Many',
              link: '/relationships/one-to-many',
            },
            {
              text: 'Many To Many',
              link: '/relationships/many-to-many',
            },
          ],
        },
        {
          text: 'Repository',
          items: [
            {
              text: 'Repository Reference',
              link: '/repository/',
            },
            {
              text: 'Retrieving Data',
              link: '/repository/retrieving-data',
            },
            {
              text: 'Inserting Data',
              link: '/repository/inserting-data',
            },
            {
              text: 'Updating Data',
              link: '/repository/updating-data',
            },
            {
              text: 'Deleting Data',
              link: '/repository/deleting-data',
            },
          ],
        },
        {
          text: 'Nuxt',
          items: [
            {
              text: 'Nuxt Setup',
              link: '/nuxt/',
            },
          ],
        },
        {
          text: 'API',
          items: [
            {
              text: 'API Reference',
              link: '/api/',
            },
          ],
        },
      ],
    },
  },
})
