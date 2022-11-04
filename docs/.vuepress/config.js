import { defineUserConfig } from 'vuepress';

import registerComponentsPlugin from '@vuepress/plugin-register-components';

import { getDirname, path } from '@vuepress/utils';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  lang: 'es-ES',
  title: 'Mis apuntes',
  description: 'Mis apuntes de programación',
  plugins: [
    registerComponentsPlugin({
      components: {        
        CssVariables: path.resolve(__dirname, 'components/css-animations-and-transitions/CssVariables.vue'),
        CssTransitions: path.resolve(__dirname, 'components/css-animations-and-transitions/CssTransitions.vue'),
        CssKeyframes: path.resolve(__dirname, 'components/css-animations-and-transitions/CssKeyframes.vue'),
        CssSimpleChoreography: path.resolve(__dirname, 'components/css-animations-and-transitions/CssSimpleChoreography.vue'),
        CssComplexChoreography: path.resolve(__dirname, 'components/css-animations-and-transitions/CssComplexChoreography.vue'),
      },
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
});
