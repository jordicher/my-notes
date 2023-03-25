import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "es-ES",
  title: "Apuntes jordicher",
  description: "Mis resumenes de programación",

  lastUpdated: true,

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
              link: "/flutter/dart.md",
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
          text: "Rust",
          link: "/rust/",
          activeMatch: "/rust/",
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
