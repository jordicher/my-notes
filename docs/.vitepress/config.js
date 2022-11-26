import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "es-ES",
  title: "Mis apuntes",
  description: "Mis apuntes de programación",

  navbar: false,
  themeConfig: {
    outline: [2, 3],
    outlineTitle: "En esta página",
  },
});
