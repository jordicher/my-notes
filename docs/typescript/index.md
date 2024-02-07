---
lang: es-ES
title: TypeScript
description: Introducción a TypeScript
---

# TypeScript

TypeScript es un lenguaje de programación de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipado estático y objetos basados en clases.

También es un compilador que traduce código TypeScript a JavaScript. El código TypeScript se compila a JavaScript, que es el código que se ejecuta en el navegador.

Podemos pensar que Typescript como un linter, que nos ayuda a detectar errores en tiempo de compilación.

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
    "declaration": true, // Genera los archivos de definición de tipos
    "allowJs": true, // Permite convivir con JavaScript
    "lib": ["DOM", "DOM.Iterable", "ESNext"] // Librerías que queremos que estén disponibles
  },
  "include": ["src"] // Carpeta donde se encuentra el código fuente
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

#### Destructuring

```ts
const myCar = [2002, "Ford", "Focus"];

const [year, make, model] = myCar;
```

El problema es que cada valor destructurado, lo entiende como string o number.

Por lo que tenemos que hacer un casting.

```ts
const myCar = [2002, "Ford", "Focus"];

const [year, make, model] = myCar as [number, string, string];
```

O bien podemos hacer un type alias.

```ts
type Car = [number, string, string];

const myCar = [2002, "Ford", "Focus"] as Car;

const [year, make, model] = myCar;
```

### Tuple

```ts
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

#### Readonly

```ts
let x: readonly [string, number] = ["hello", 10];
x[0] = "world"; // Error
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

#### Index Signatures

```ts
const x: { [key: string]: number } = {};
x.a = 1;
x["b"] = 2;
```

En objetos, podemos usar index signatures para definir propiedades dinámicas.

```ts
interface Person {
  name: string;
  age: number;
  [key: string]: any;
}

function printPerson(person: Person) {
  console.log(person.name, person.age);
}

printPerson({ name: "John", age: 30, address: "Main Street" });
```

En objetos complejos.

```ts
const phones: { [key: string]: { brand: string; model: string } } = {
  iPhone: { brand: "Apple", model: "iPhone 12" },
  Galaxy: { brand: "Samsung", model: "Galaxy S21" },
  Pixel: { brand: "Google", model: "Pixel 5" },
};
```

Cuando hacemos key: string, estamos diciendo que la key puede ser cualquier string. Pero podemos ser más específicos.
Ya que, si no acepta cualquier string, aunque no exista en el objeto, no dará error.

```ts
phones.iPhone; // { brand: 'Apple', model: 'iPhone 12' }
phones.android; // undefined, pero no da error
```

```ts
const phones: {
  [key in "iPhone" | "Galaxy" | "Pixel"]: { brand: string; model: string };
} = {
  iPhone: { brand: "Apple", model: "iPhone 12" },
  Galaxy: { brand: "Samsung", model: "Galaxy S21" },
  Pixel: { brand: "Google", model: "Pixel 5" },
};

phones.iPhone; // { brand: 'Apple', model: 'iPhone 12' }
phones.android; // Error
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

### Inferencia de tipos

TypeScript le asigna un tipo a cada variable, aunque no lo especifiquemos. Inferencia de tipos.

```ts
let a = 1; // number
let b = "1"; // string
let c = true; // boolean
```

### Tipos literales

```ts
let humidity = 79 as 79; // 79
let humidity = 79 as const; // 79
```

### Any y type casting

```ts
let a: any = 1;
let b = a as number;
let c = <number>a;
```

## Interfaces

Las interfaces son una forma poderosa de definir contratos tanto para tu proyecto, como para el código externo al mismo.

```ts
interface Person {
  name: string;
  age: number;
}

function printPerson(person: Person) {
  console.log(person.name, person.age);
}

printPerson({ name: "John", age: 30 });
```

### Propiedades opcionales

```ts
interface Person {
  name: string;
  age?: number;
}

function printPerson(person: Person) {
  console.log(person.name, person.age);
}

printPerson({ name: "John" });
```

### Anidadas

```ts
interface User {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

interface UserResponse {
  success: boolean;
  user: User;
}

function printUser(data: UserResponse) {
  console.log(data.user.name, data.user.address.city, data.success);
}

printUser({
  success: true,
  user: { name: "John", address: { street: "Main Street", city: "New York" } },
});
```

### Index Signatures

```ts
interface Person {
  name: string;
  age: number;
  [key: string]: any;
}

function printPerson(person: Person) {
  console.log(person.name, person.age);
}

printPerson({ name: "John", age: 30, address: "Main Street" });
```
