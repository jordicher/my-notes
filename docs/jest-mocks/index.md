---
lang: "es-ES"
title: "Jest Mocks"
description: "Diferencias entre los diferentes tipos de mocks en Jest"
---

# Mocks

Los mocks son una forma de simular el comportamiento de "x" en un entorno de pruebas, podemos capturar las llamadas a una función, los argumentos que se le pasan, modificar o obtener el valor de retorno, etc.

## Tipos de Mocks

### "jest.fn()". Mocks de Funciones. 

Los mocks de funciones son una forma de aislar las pruebas de las funciones externas.

#### Creando un mock de función

Para crear un mock de función, simplemente llama a `jest.fn()`:

```js
const myMock = jest.fn();
console.log(myMock()); // > undefined
console.log(myMock.mock.calls.length); // 1
```

También puedes pasar un valor de retorno al mock:

```js
const myMock = jest.fn(() => 'test');
console.log(myMock()); // > test
```

## "jest.mock()". Mocks de Módulos.

Los mocks de módulos son una forma de aislar las pruebas de los módulos externos.

### Creando un mock de módulo

Para crear un mock de módulo, simplemente llama a `jest.mock()`:

```js
jest.mock('moduleName');
```

## "jest.spyOn()". Mocks de Espías.

Los mocks de espías son una forma de aislar las pruebas de los métodos externos.

### Creando un mock de espía

Para crear un mock de espía, simplemente llama a `jest.spyOn()`:

```js
jest.spyOn(object, 'methodName');
```
