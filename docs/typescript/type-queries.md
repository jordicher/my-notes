---
lang: es-ES
title: TypeScript
description: Consultas de tipo
---

# Consultas de tipo

Las consultas de tipo son una forma de acceder a las propiedades de un tipo en TypeScript. Esto es útil para obtener el tipo de una propiedad, o para "extraer" el tipo de una propiedad de un objeto.

## Keyof

`keyof` es un operador que devuelve el tipo de todas las claves de un objeto. Por ejemplo:

```typescript
type Point = {
  x: number;
  y: number;
};

type PointKeys = keyof Point;

// PointKeys es "x" | "y"
```

En caso de que el tipo sea unión de tipos, `keyof` devolverá la unión de las claves de todos los tipos.

```typescript
type Point3D = Point & { z: number };

type Point3DKeys = keyof Point3D;

// Point3DKeys es "x" | "y" | "z"
```

Si tenemos un indice de tipo, `keyof` devolverá el tipo de las claves del indice.

```typescript
type Dictionary<T> = {
  [key: string]: T;
};

type DictionaryKeys = keyof Dictionary<number>;

// DictionaryKeys es string
```

## typeof

`typeof` es un operador que devuelve el tipo de una expresión. Por ejemplo:

```typescript
const point = { x: 0, y: 0 };

type Point = typeof point;

// Point es { x: number, y: number }
```

`typeof` también puede ser usado con clases y funciones.

```typescript
class Point {
  x = 0;
  y = 0;
}

type PointType = typeof Point;

// PointType es typeof Point

function add(a: number, b: number) {
  return a + b;
}

type AddType = ReturnType<typeof add>;

// AddType es number
```

## Consultas de tipo

Las consultas de tipo son una forma de acceder a las propiedades de un tipo. Por ejemplo:

```typescript
type Point = {
  x: number;
  y: number;
};

type X = Point["x"];

// X es number

interface Car {
  make: string;
  model: string;
  year: number;
  color: {
    red: string;
    green: string;
    blue: string;
  }
}

type CarMake = Car["make"]; // string

let car : Car["color"]: // Esta esperando un objeto con las propiedades red, green y blue
let carProperty : Car["color" | "year"]; // object | number
```

## Patrón de modulo

[Patrón de modulo](https://www.typescript-training.com/course/fundamentals-v4/09-type-queries/#use-case-the-type-registry-pattern) es un patrón de diseño que nos permite superponer tipos de manera efectiva a elementos ya exportados por un módulo.
