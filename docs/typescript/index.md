---
lang: es-ES
title: TypeScript
description: Introducción a TypeScript
---

# TypeScript

TypeScript es un lenguaje de programación de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipado estático y objetos basados en clases.

## Ventajas de TypeScript

- **Tipado estático**. TypeScript añade tipado estático a JavaScript. El tipado estático permite detectar ciertas categorías de errores en tiempo de compilación. Por ejemplo, intentar asignar un `string` a una variable de tipo `number` dará un error en tiempo de compilación.

```ts
function sum(a: number, b: number) {
  return a + b;
}

sum(1, 2); // 3
sum("1", "2"); // Error: Argument of type '"1"' is not assignable to parameter of type 'number'.
```

Al tipar las variables, podemos saber los métodos y propiedades. De esta manera el IDE puede ayudarnos a programar.

## Desventajas de TypeScript

- **Curva de aprendizaje**. TypeScript añade una capa de complejidad a JavaScript. Aunque la sintaxis es muy similar, hay que aprender a usar los tipos, interfaces, clases, etc.

- **Requiere compilación**. TypeScript no se puede ejecutar directamente en el navegador. Primero hay que compilarlo a JavaScript. Esto añade un paso más al flujo de trabajo.

- **No se ejecutan las validaciones en runtime**. Las validaciones de tipos se hacen en tiempo de compilación. En tiempo de ejecución no hay validaciones de tipos.

## Visual Studio Code

Visual Studio Code es un editor de código fuente desarrollado por Microsoft para Windows, Linux y macOS.

Este editor por defecto, aunque estemos trabajando en un archivo `.js`, utiliza el motor de TypeScript para mostarnos los tooltips, mientras estamos programando.

## Instalación

Para instalar TypeScript, necesitamos tener instalado [Node.js](https://nodejs.org/es/).

```bash
npm install -g typescript
```

**tsconfig.json**

```json
{
  "compilerOptions": {
    "outDir": "./dist", // Carpeta donde se compilará el código
    "target": "ES6", // Versión de JavaScript a la que se compilará. Muy parecido a Babel
    "allowJs": true, // Permite convivir con JavaScript
    "lib": ["DOM", "DOM.Iterable", "ESNext"] // Librerías que queremos que estén disponibles
  },
  "include": ["./js/**/*"]
}
```

**Compilación**

```bash
tsc
```

El compilador de TS, tsc, no minifica el código... Para ello podemos usar Webpack.

En Webpack, podemos usar el plugin `ts-loader` para que compile TypeScript.

```js
resolve: {
  extensions: [".ts", ".js"],
},
module: {
  rules: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: "ts-loader",
        options: {
          transpileOnly: true, // Que al momento de hacer la build, no compruebe los tipos. Eso es útil cuando estamos pasando codigo de JS a TS
        },
      },
    }
  ]
}
```

## Tipos de datos

### Boolean

```ts
let isDone: boolean = false;
```

### Number

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### String

```ts
let color: string = "blue";
color = "red";
```

### Array

```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

### Tuple

```ts
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

### Enum

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

### Any

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

### Void

```ts
function warnUser(): void {
  console.log("This is my warning message");
}
```

### Null and Undefined

```ts
let u: undefined = undefined;
let n: null = null;
```

### Never

```ts
function error(message: string): never {
  throw new Error(message);
}
```

### Object

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
```

### Type assertions

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```

## Static Typing

El motor se encarga de comprobar en tiempo de desarrollo que los tipos de datos son correctos.

```ts
function sum(a: number, b: number) {
  return a + b;
}

sum(1, 2); // 3
sum("1", "2"); // Error: Argument of type '"1"' is not assignable to parameter of type 'number'.
```

TypeScript le asigna un tipo a cada variable, aunque no lo especifiquemos. Inferencia de tipos.

```ts
let a = 1; // number
let b = "1"; // string
let c = true; // boolean
```
