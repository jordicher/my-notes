import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "es-ES",
  title: "Apuntes jordicher",
  description: "Mis resumenes de programación",
  head: [
    [
      "script",
      {
        async: "true",
        src: "https://cdn.splitbee.io/sb.js",
      },
    ],
  ],

  lastUpdated: true,
  sitemap: {
    hostname: "https://my-notes.cherto.es/",
  },

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/rust/": [
        {
          text: "Rust",
          items: [
            {
              text: "Introducción",
              link: "/rust/",
            },
            {
              text: "Instalación",
              link: "/rust/installation.md",
            },
            {
              text: "Estructura",
              link: "/rust/structure.md",
            },
          ],
        },
      ],
      "/flutter/": [
        {
          text: "Flutter",
          items: [
            {
              text: "Introducción",
              link: "/flutter/",
            },
            {
              text: "Dart",
              items: [
                {
                  text: "Introducción",
                  link: "/flutter/dart-intro.md",
                },
                {
                  text: "Control de Flujo y colecciones",
                  link: "/flutter/dart-statements-collections.md",
                },
                {
                  text: "Null Safety",
                  link: "/flutter/dart-null-safety.md",
                },
                {
                  text: "Enumeraciones, clases y objetos",
                  link: "/flutter/dart-enum-class-object.md",
                },
                {
                  text: "Avanzado",
                  link: "/flutter/dart-advanced.md",
                },
              ],
            },
            {
              text: "Flutter",
              items: [
                {
                  text: "Primeros pasos",
                  link: "/flutter/flutter.md",
                },
                {
                  text: "Estados",
                  link: "/flutter/states.md",
                },
                {
                  text: "UI",
                  link: "/flutter/ui.md",
                },
                {
                  text: "Modelo de datos",
                  link: "/flutter/data-model.md",
                },
              ],
            },
          ],
        },
      ],
      "/typescript/": [
        {
          text: "TypeScript",
          items: [
            {
              text: "Introducción",
              link: "/typescript/",
            },
            {
              text: "Type Queries",
              link: "/typescript/type-queries.md",
            },
          ],
        },
      ],
    },

    outline: [2, 4],
    outlineTitle: "En esta página",

    socialLinks: [
      { icon: "github", link: "https://github.com/jordicher/my-notes" },
    ],
  },
});

function nav() {
  return [
    {
      text: "Temas",
      items: [
        {
          text: "Monorepo",
          link: "/monorepo/index.md",
          activeMatch: "/monorepo/",
        },
        {
          text: "JavaScript Performance",
          link: "/javascript-performance/",
          activeMatch: "/javascript-performance/",
        },
        {
          text: "Web Components",
          link: "/web-components/index.md",
          activeMatch: "/web-components/",
        },
        {
          text: "Flutter",
          link: "/flutter/",
          activeMatch: "/flutter/",
        },
        {
          text: "Rust",
          link: "/rust/",
          activeMatch: "/rust/",
        },
        {
          text: "TypeScript",
          link: "/typescript/",
          activeMatch: "/typescript/",
        },
        {
          text: "Vue Unit Testing",
          link: "/vue-unit-testing/index.md",
          activeMatch: "/vue-unit-testing/",
        },
      ],
    },
  ];
}
