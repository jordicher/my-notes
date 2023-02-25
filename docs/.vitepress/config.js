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
        {
          text: "JavaScript Performance",
          link: "/javascript-performance/",
          activeMatch: "/javascript-performance/",
        },
      ],
    },
  ];
}
