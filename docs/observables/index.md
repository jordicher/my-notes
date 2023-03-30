---
lang: es-ES
title: Observables
description: Observables en JavaScript
---

# Asincronía

La asincronía en JS parece complicada.

- Condiciones de carrera
- Memory leaks
- Errores de asincronía

Lanzar asincronía en concurrencia, para que se ejecute en paralelo. Ahora bien, ¿qué hacemos cuando una de las promesas se ha resuelto y la otra no? ¿Qué hacemos con el resultado? ¿Qué hacemos con el error? ¿Volvemos a los valores de inicio?

Diferencia entre un array y un evento. Ambos son colecciones de valores. Pero un array es una colección de valores que se resuelven en un momento determinado. Un evento es una colección de valores que se resuelven en un momento indeterminado.

Si los dos son colecciones, ¿por qué no los tratamos de la misma manera?

- En 1994 salió el libro "Design Patterns" de Erich Gamma, Richard Helm, Ralph Johnson y John Vlissides. En el libro se describen 23 patrones de diseño, que fueron usados como guía. En este no había una relación directa entre el iterador y el observer pattern.

Ambos patrones están relacionados, y entender su relación es clave para ser un experto en programación asíncrona.

## Iterator vs Observer pattern

### Iterator pattern

- Es un patrón de diseño que permite recorrer una colección de valores de forma secuencial.
- El patrón de iterador permite al consumidor solicitar información uno a uno del productor hasta que el productor diga que no hay más información o que se ha producido un error.

```js
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: undefined, done: true }
```

Tanto map, filter, flatMap, reduce, etc. son iteradores. Por lo que se pueden implementar con el patrón de diseño iterator.

### Observer pattern

- Produce iteraciones de valores en un momento indeterminado.
- Permite que un objeto notifique a otros objetos cuando cambia su estado.

```js
document.addEventListener("mousemove", () => {
  console.log("mouse moved");
});
```

Observable === Collection + Time

## Observables

Mover todas las APIs de asincronía a un solo patrón de diseño.

Como hacer una subscripción a un evento.

```js
// subscribe
const handler = () => {
  console.log("mouse moved");
};

document.addEventListener("mousemove", handler);

// unsubscribe
document.removeEventListener("mousemove", handler);
```

Como hacer una subscripción a un evento con observables.

```js
// subscribe
const subscription = fromEvent(document, "mousemove").subscribe(() => {
  console.log("mouse moved");
});

// unsubscribe
subscription.unsubscribe();

//forEach
const subscription = mouseMoves.forEach(() => {
  console.log("mouse moved");
});

// unsubscribe
subscription.dispose();
```

Observable.forEach expandido

```js
const subscription = mouseMoves.forEch({
  //next data
  next: () => {
    console.log("mouse moved");
  },
  //error (optional)
  error: () => {},
  //complete (optional)
  complete: () => {},
});
```

Hay tres manejadores de eventos para un Observable: onNext, onError y onCompleted. La función onNext se utiliza para recibir datos del Observable, y las funciones onError y onCompleted se utilizan para manejar errores y decirle al consumidor cuando no hay más datos.

La iteración terminara cuando se llame a la función onComplete o cuando se llame a la función onError.

### Observable Metaphor

Para explicar el patrón de programación Iterator,

Nos podemos imaginar repartiendo pastel a alguien que comienza a comer y repartirlo a otros mientras él le sigue dando más pastel hasta que se acaba el pastel.

Para explicar el patrón de programación Observer, nos podemos estar imaginando que arrojamos pastel a alguien, independientemente de si está listo para recibirlo o no, y cuando se acaba el pastel, le decimos que no hay más.

Estos patrones son solo otra forma de transmitir información de un punto a otro, y lo que diferencia a estos patrones es quién tiene el control: en el patrón Iterator, el consumidor tiene el control, mientras que en el patrón Observer, el productor tiene el control.

## Convirtiendo Eventos en Observables

```js
Observable.fromEvent = function (dom, eventName) {
  return {
    forEach: function (observer) {
      const handler = (e) => observer.next(e);
      dom.addEventListener(eventName, handler);

      return {
        dispose: () => dom.removeEventListener(eventName, handler),
      };
    },
  };
};
```

```js
var Observable = {};

Observable.fromEvent = (dom, eventName) => {
  return {
    forEach: (observer) => {
      var handler = (e) => observer.onNext(e);
      dom.addEventListener(eventName, handler);

      return {
        dispose: () => {
          dom.removeEventListener(eventName, handler);
        },
      };
    },
  };
};

var mouseMoves = Observable.fromEvent(document.body, "mousemove");

var subscription = mouseMoves.forEach({
  onNext: (event) => console.log(event),
  onError: (error) => console.log(error),
  onCompleted: () => console.log("done"),
});
```
