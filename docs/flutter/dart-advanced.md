---
lang: es-ES
title: Dart avanzado
description: Extensiones, Future, async/await, Stream, Generators, Generics
---

# Dart avanzado

## Extensiones

Las extensiones son una forma de agregar funcionalidad a una clase existente. Es una forma de extender una clase sin tener que modificarla. Las extensiones son una forma de agregar métodos a una clase que no controlamos.

```dart
class Person {
  String name;
  String firstName;
  Person(this.name, this.firstName);
}

extension PersonExtension on Person {
  String get fullName => '$firstName $name';
}

void main() {
  Person person = Person('Foo', 'Bar');
  print(person.fullName); // Bar Foo
}
```

Otro ejemplo:

```dart
extension StringExtension on String {
  String capitalize() {
    return "${this[0].toUpperCase()}${this.substring(1)}";
  }
}

void main() {
  String name = 'foo';
  print(name.capitalize()); // Foo
}
```

## Future

Un `Future` es un objeto que representa un valor potencial, o error, que estará disponible en algún momento en el futuro. Cuando se crea un `Future`, se inicia un proceso asíncrono. El proceso puede producir un valor o un error. Cuando el proceso finaliza, el `Future` se completa con este valor o error.

```dart
Future<String> fetchUserOrder() {
  return Future.delayed(Duration(seconds: 2), () => 'Cafe');
}

void main() {
  print('Program started');
  fetchUserOrder().then((value) => print(value));
  print('Program ended');
}
```

```dart
Program started
Program ended
Cafe
```

## async/await

`async` y `await` son palabras clave que se usan para trabajar con `Future`. `async` se usa para marcar una función como asíncrona. `await` se usa para esperar a que se complete un `Future`.

```dart
Future<String> fetchUserOrder() {
  return Future.delayed(Duration(seconds: 2), () => 'Cafe');
}

Future<String> fetchUserOrder2() {
  return Future.delayed(Duration(seconds: 2), () => 'Tea');
}

Future<String> fetchUserOrder3() {
  return Future.delayed(Duration(seconds: 2), () => 'Juice');
}

Future<void> main() async {
  print('Program started');
  print(await fetchUserOrder());
  print(await fetchUserOrder2());
  print(await fetchUserOrder3());
  print('Program ended');
}
```

```dart
Program started
Cafe
Tea
Juice
Program ended
```

## Stream

Un `Stream` es una secuencia de eventos asíncronos. Los eventos pueden ser valores o errores. Puede escuchar eventos de un `Stream` usando el método `listen`.
Nunca se puede saber cuántos eventos se emitirán, ni cuándo se emitirán.

En javascript se parece a un `Observable`.

```dart
Stream<int> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    yield i;
  }
}

void main() {
  countStream(5).listen((event) {
    print(event);
  });
}
```

```dart
1
2
3
4
5
```

Podemos hacer que un `Stream` se emita solo una vez usando el método `first`:

```dart
Stream<int> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    yield i;
  }
}

void main() {
  countStream(5).first.then((value) => print(value));
}
```

```dart
1
```

También que se emita cada "x" tiempo:

```dart
Stream<int> countStream() {
 return Stream.periodic(const Duration(seconds: 1), (value) {
   return 55;
 });
}

void main() async {
 await for (final value in countStream()){
   print(value);
 }
  print("hi");
}
```

```dart
55
55
55
....
```

Nunca imprime "hi" porque el `Stream` nunca se completa.

## Generadores

Los generadores son funciones que producen una secuencia de valores dinámicamente. Se pueden usar para simplificar el código que usa iteradores.

La diferencia entre sync* y async* es que el primero es síncrono y el segundo asíncrono.

```dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++; // yield is like return
}

void main() {
  print(naturalsTo(5)); // (0, 1, 2, 3, 4)
}
```

Podemos pensar en un restaurante donde podemos tener 50 clientes, no estará la comida de todos los clientes al mismo tiempo, sino que sé irá preparando la comida de cada cliente a medida que se vaya pidiendo.

## Generics

Los genéricos son una forma de hacer que los tipos sean más reutilizables. Los genéricos nos permiten escribir código que se puede reutilizar en diferentes tipos en lugar de escribir el mismo código para cada tipo.

Por ejemplo para evitar:

```dart
class PairOfStrings {
  String first;
  String second;
  PairOfStrings(this.first, this.second);
}

class PairOfInts {
  int first;
  int second;
  PairOfInts(this.first, this.second);
}

void main() {
  PairOfStrings pairOfStrings = PairOfStrings('Foo', 'Bar');
  PairOfInts pairOfInts = PairOfInts(1, 2);
}
```

```dart
class Pair<A, B> {
  A first;
  B second;
  Pair(this.first, this.second);
}

void main() {
  Pair<String, String> names = Pair('Foo', 'Bar');
  Pair<int, int> ints = Pair(1, 2);
}
```
