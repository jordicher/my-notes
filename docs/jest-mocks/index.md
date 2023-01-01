---
lang: "es-ES"
title: "Jest Mocks"
description: "Diferencias entre los diferentes tipos de mocks en Jest"
---

# Mocks

Los mocks son una forma de simular el comportamiento de "x" en un entorno de pruebas, podemos capturar las llamadas a una función, los argumentos que se le pasan, modificar o obtener el valor de retorno, etc.

## Tipos de Mocks

### "jest.mock()". Mocks de Módulos.

Los mocks de módulos son una forma de aislar las pruebas de los módulos externos.

##### Creando un mock de módulo

Para crear un mock de módulo, `jest.mock()`:

```js
// my-module.js
function myFunction() {
  return "hello world";
}

module.exports = {
  myFunction,
};

// my-module.spec.js
const { myFunction } = require("./my-module");
jest.mock("./my-module");
```

### "jest.fn()". Mocks de Funciones.

Los mocks de funciones son una forma de aislar las pruebas de las funciones externas.

#### Creando un mock de función

Para crear un mock de función, `jest.fn()`:

```js
const myMock = jest.fn();
console.log(myMock()); // > undefined
console.log(myMock.mock.calls.length); // 1
```

También puedes pasar un valor de retorno al mock:

```js
const myMock = jest.fn(() => "test");
console.log(myMock()); // > test
```

#### Ejemplo de uso

```js
// my-module.js
function myFunction() {
  return "hello world";
}

module.exports = {
  myFunction,
};

// my-module.spec.js
const { myFunction } = require("./my-module");
jest.mock("./my-module");

test("myFunction()", async () => {
  const myMock = jest.fn(() => "test");

  myFunction.mockImplementation(myMock);
  const result = myFunction();

  expect(result).toEqual("test");
  expect(myMock.mock.calls.length).toEqual(1);
});

test("myFunction2()", async () => {
  const result = myFunction();

  expect(result).toEqual("test"); // pass
  expect(myMock.mock.calls.length).toEqual(1);
});
```

En el ejemplo anterior, se puede ver que un mock realizado en el primer test, afecta al segundo test. Por lo que es necesario restaurar los mocks antes de cada test.

### "jest.spyOn()". Mocks de Espías.

Los mocks de espías son una forma de aislar las pruebas de los métodos externos.

#### Creando un mock de espía

Para crear un mock de espía, `jest.spyOn()`:

```js
jest.spyOn(object, "methodName");
```
