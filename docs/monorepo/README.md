---
lang: es-ES
title: Monorepo
description: Introducción a Monorepo
---

# Monorepo

Monorepo = Un repositorio.

**Multiples paquetes que tienen interdependencias entre ellos, por lo que estan entrelazados, y que se gestionan desde un solo repositorio.**

Al gestionar los paquetes desde un solo repositiorio, podemos dividirlos y tratarlo como capas independientes, lo que aumenta la **encapsulación**. Por lo que dentro de un repositorio tenemos diferentes bibliotecas|componentes|paquetes|modulos|etc.

Además, al tener un solo repositorio, podemos tener un solo flujo de trabajo por lo que al hacer un commit, puede modificar varios paquetes, y el commit mantiene un **unico historial de cambios**. Esto nos permite tener un control de versiones mucho más sencillo.

## Workspaces

Los workspaces son una característica de npm que nos permite gestionar paquetes dentro de un mismo repositorio. Para ello, debemos definir los paquetes que queremos gestionar en el archivo `package.json`:

```json{6-8}
// package.json
{
  "name": "my-notes",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*" // * cualquier subdirectorio dentro de packages
  ]
}
```

## Convención de nombres

Para que los workspaces funcionen correctamente, debemos seguir una convención de nombres. Por ejemplo, si tenemos un paquete llamado `types`, el nombre del paquete en el `package.json` debe ser `@awesome/types`.
@awesome es el nombre del scope, y types es el nombre del paquete. Y el nombre del scope tiene que ser utilizado en los otros paquetes. De esta forma esta nomenclatura nos permite identificar que paquetes pertenecen al mismo repositorio.

```json{3}
 // packages/types/package.json
{
  "name": "@awesome/types",
  "version": "1.0.0",
  "main": "index.js",
  "devDependencies": {
    "typescript": "^4.0.3"
  }
}
```

## Dependencias

### Dependencias de los workspaces

En el caso de types/package.json, tiene una dependencia de typescript. Mientras que nuestro package.json de raiz no tiene ninguna dependencia.

Ahora bien, al momento de instalar las dependencias, npm instala las dependencias de los paquetes en el directorio raiz.

Ejemplo, con yarn, al hacer un yarn.

```
//yarn.lock
typescript@^4.0.3:
  version "4.8.4"
  resolved "https://registry.yarnpkg.com/typescript/-/typescript-4.8.4.tgz#c464abca159669597be5f96b8943500b238e60e6"
  integrity sha512-QCh+85mCy+h0IGff8r5XWzOVSbBO+KfeYrMQh7NJ58QujwcE22u+NUSmUxqF+un70P9GXKxa2HCNiTTMJknyjQ==
```

### Configuración de dependencias globales

Al package.json de raiz, solo tenemos que instalar las dependencias a nivel global que sirvan para la experiencia de desarollo, no debemos intalar dependencias que aporten funcionalidad.

Es muy frequente que los paquetes tengan por ejemplo eslint/babel/jest... Para evitar tener que instalarlo en cada paquete, podemos instalarlo de forma global. Para ello, debemos configurar el archivo `package.json` de la siguiente forma:

```json{10}
// package.json
{
  "name": "my-notes",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "eslint": "^8.5.0"
  }
}
```

Ahora bien, dentro de cada paquete puede tener sus propias reglas o no. En el caso de unas reglas globales, podemos configurar el archivo `.eslintrc.js` en la raiz. Mientras que la configuración de cada paquete se puede configurar en el archivo `.eslintrc.js` de cada paquete, para que extienda de la configuración general.

```
// packages/types/.eslintrc
{
  "extends": "../../.eslintrc"
}
```

Al momento de querer interactuar con lint/jest... en cada paquete, debemos añadir un comando, por ejemplo:

```json{4}
// packages/types/package.json
{
  "scripts": {
    "lint": "eslint .",
    "test": "jest"
  }
}
```

Esto nos permite ejecutar el comando `yarn lint` o `yarn jest` en cada paquete. Incluso lo podemos ejecutar en el directorio raiz, `yarn jest` y ejecutará todos los tests... de todos los paquetes. ¿Entonces porque lo tengo que añadir en cada paquete?, por convención, porque quizás dentro de un paquete la configuración o como se tienen que hacer los tests serán diferentes. Ejemplo, componentes con css, que tome capturas de pantalla, etc.

### Conflictos de dependencias

Al tener diferentes paquetes, puede ser que usemos dos dependencias iguales, una en la raiz, y otra en el paquete. Ejemplo jest.

```json{7}
// package.json
{
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "jest": "^27.4.5"
  }
}
```

```json{5}
// packages/types/package.json
{
  "name": "@awesome/types",
  "devDependencies": {
    "jest": "^26.4.5"
  }
}
```

En este caso, npm/yarn instalará la versión 26.4.5 en el paquete types, y la versión 27.4.5 en el directorio raiz. Es decir, de esta manera habrá una version local en el paquete types. Y otra version global en el directorio raiz.

## Lerna

Lerna nos soluciona un montón de problemas que tenemos al trabajar con workspaces. Por ejemplo, la instalación de dependencias, la ejecución de scripts, la publicación de paquetes, etc. Por ejemplo, un caso que se nos estaba dando en los puntos previos es que teniamos que ejecutar cada script en su paquete, por ejemplo `yarn lint` en el paquete types.
Con lerna podemos ejecutarlo en el directorio raiz, y lerna se encargará de ejecutarlo **en todos los paquetes**

### Instalación

Para instalar lerna, debemos ejecutar el siguiente comando:

```bash
yarn add -DW lerna
    or
volta install lerna
  or
npx lerna init
```

En la configuración de lerna, podemos configurar el directorio de los paquetes, por defecto es `packages/*`. Seria como el workspaces de npm.

```json
// lerna.json
{
  "packages": ["packages/*"]
}
```

npmClient: Por defecto es npm, pero podemos configurarlo para que use yarn.

```json
// lerna.json
{
  "npmClient": "yarn"
}
```

version: Por defecto es independent, que permite incrementar las versiones del paquete de forma independiente entre sí.
Pero podemos configurarlo para que todas las versiones sean iguales, si queremo unir automáticamente todas las versiones del paquete. Un problema con este enfoque es que un cambio importante en cualquier paquete dará como resultado que todos los paquetes tengan una nueva versión principal.

```json
// lerna.json
{
  "version": "0.0.1" || "independent"
}
```

useWorkspaces: Por defecto es true, que permite que lerna use el workspaces de npm. Si lo configuramos a false, lerna no usará el workspaces de npm, y tendremos que configurar lerna para que use el directorio de los paquetes.

```json
// lerna.json
{
  "useWorkspaces": true
}
```

### Comandos

Lerna nos permite ejecutar comandos, los más comunes son:

- lerna link - Conecta los paquetes entre sí, para que puedan importar entre sí. Por ejemplo, si tenemos un paquete types, y otro paquete utils, que importa types, lerna link nos permite que utils pueda importar types.
- lerna bootstrap - Instala las dependencias de todos los paquetes, y hace como un yarn link.
- lerna run `test` - Ejecuta un script `test` en todos los paquetes. Es como un forloop.
  - lerna run `build` --concurrency 2 --stream Ejecutará 2 simultaneamente, y mostrará el output en tiempo real. Porque hay paquetes que no tienen relación entre sí, y que no dependen de otros paquetes.
- lerna exec `test` - Ejecuta un script `test` en todos los paquetes. Es como el caso anterior, pero permite comandos arbitrarios, como crear una carpeta, ls, etc.
- lerna add `dependency` - Como yarn add, pero añade la dependencia a todos los paquetes.

#### Comandos para las versiones

- lerna changed - Muestra los paquetes que han cambiado.
- lerna list - Muestra los paquetes.
- lerna version - interface para incrementar las versiones de los paquetes.
  - lerna version --conventional-commits: no te pregunta, directamente hace lo que cree gracias a los commit conventions.

## Scripty

No es requerido, pero es una herramienta que nos permite ejecutar scripts. Nos ayuda a la gestión del monorepo, y en caso de querer modificar un script, no tenemos que modificarlo en todos los paquetes.

Instalación:

```bash
yarn add -DW scripty
    or
volta install scripty
```

Todos los script quedarían:

```json{4}
// package.json
{
  "scripts": {
    "test": "scripty"
  },
}
```

Se debe añadir el directorio de donde están los scripts, además podemos tener múltiples directorios, por ejemplo, un directorio para el workspace y otro para los paquetes.

```json{7}
// package.json
{
  "scripts": {
    "test": "scripty"
  },
  "scripty": {
    "path": "./scripts/workspace"
  }
}
```

Crear carpeta scripts en el directorio raíz, y crear un archivo por cada script que queramos ejecutar. Por ejemplo, test.js

```sh
// scripts/workspace/test.sh

#!/usr/bin/env bash
yarn lerna run test --stream
```

## Commits CommitLint

### Conventional Changelog

[Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) Genera un changelog basado en los commits. Es decir, si tenemos un commit que diga `feat: add new feature`, generará un changelog con la sección feat, y el mensaje `add new feature`.

Instalación:

```bash
yarn add -WD @commitlint/cli @commitlint/config-conventional @commitlint/config-lerna-scopes commitlint husky lerna-changelog
```

#### husky

Husky nos permite ejecutar scripts antes de hacer un commit, por ejemplo, ejecutar el linter, o el test. En este caso, ejecutaremos el commitlint, para que nos muestre un error si el commit no cumple con las reglas.

```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

#### commitlint

Commitlint nos permite configurar las reglas de los commits. En este caso, usaremos las reglas de conventional-changelog y lerna-scopes.

```js
// commitlint.config.js
module.exports = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes",
  ],
};
```

Los scopes son los paquetes, por ejemplo, si tenemos un paquete utils, y queremos hacer un commit, el scope sería utils.

```sh
git commit -m "feat(utils): add new feature"
```

#### Verdaccio

[Verdaccio](https://verdaccio.org/) es un servidor de paquetes privados. Nos permite publicar paquetes en un servidor local, y que otros desarrolladores puedan instalarlos.

Esto nos sirve sobretodo al principio, por no estar publicando paquetes en npm cuando estamos trasteando con los monorepos.

Instalación:

```bash
volta install verdaccio
yarn global add verdaccio
```

.npmrc para que npm use verdaccio:

```sh
# .npmrc
registry=http://localhost:4873/
```

También para descargar de ahí se le puede añadir el registry en el comando: npm i --registry http://localhost:4873 myPackage

También nos sirve como como un caché de sus paquetes NPM que funcionan sin conexión, ya que todo se ejecuta en localhost.
