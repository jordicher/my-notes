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

Es muy frequente que los paquetes tengan por ejemplo eslint. Para evitar tener que instalarlo en cada paquete, podemos instalarlo de forma global. Para ello, debemos configurar el archivo `package.json` de la siguiente forma:

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

Al momento de querer interactuar con lint, en cada paquete, debemos añadir un comando, por ejemplo:

```json{3}
// packages/types/package.json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```
