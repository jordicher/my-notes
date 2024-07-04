---
lang: es-ES
title: Colecciones
description: Colecciones en Dart
---

# Colecciones

## List

Las listas son colecciones ordenadas de elementos. En Dart, las listas se representan con la palabra clave `List`.

```dart
final nums = [1, 2, 3];
List<int> nums = [1, 2, 3];
```

Es importante saber que la lista empieza en el índice 0 no el 1.

```dart
void main() {
  final names = ["foo", "bar", "baz"];
  print(list[0]); // foo
  print(list[1]); // bar
  print(list[2]); // baz
}
```

Las listas son objetos, por lo que tienen propiedades y métodos.

```dart
void main() {
  final names = ["foo", "bar", "baz"];
  print(names.length); // 3
  print(names.isEmpty); // false
  print(names.isNotEmpty); // true
  print(names.first); // foo
  print(names.last); // baz
  print(names.reversed); // (baz, bar, foo)
  print(names.reversed.toList()); // [baz, bar, foo]
}
```

## Set

Los conjuntos son colecciones de elementos únicos, por lo que no pueden contener elementos duplicados no están ordenados. En Dart, los conjuntos se representan con la palabra clave `Set`.

```dart
var nums = {1, 2, 3};
const names = {'foo', 'bar', 'baz', 'foo'}; // error: foo is duplicated
Set<int> set = {1, 2, 3};
```

Los conjuntos no tienen índices, por lo que no se puede acceder a un elemento por su índice.

```dart
void main() {
  final names = {'foo', 'bar', 'baz'};
  print(names[0]); // error: The operator '[]' isn't defined for the class 'Set<String>'
  print(names.first); // foo
  print(names.last); // baz
}
```

Podemos añadir y eliminar elementos de un conjunto.

```dart
void main() {
  var names = {'foo', 'bar', 'baz'};
  names.add('qux');
  names.add('foo'); // no effect
  print(names); // {foo, bar, baz, qux}

  names.remove('bar');
  print(names); // {foo, baz, qux}
}
```

También podemos hacer operaciones de conjuntos como unión, intersección y diferencia.

```dart
void main() {
  var a = {1, 2, 3};
  var b = {3, 4, 5};

  print(a.union(b)); // {1, 2, 3, 4, 5}
  print(a.intersection(b)); // {3}
  print(a.difference(b)); // {1, 2}
}
```

## Map

Los mapas son colecciones de pares clave-valor. En Dart, los mapas se representan con la palabra clave `Map`.
Se puede reescibir un valor de una clave, pero no se puede duplicar una clave.

```dart
var map = {1: 'one', 2: 'two', 3: 'three'};
Map<int, String> map = {1: 'one', 2: 'two', 3: 'three'};
Map<String, Object> user = {'name': 'Bob', 'age': 42};

print(user['name']); // Bob
print(user['age']); // 42

user['name'] = 'Alice';
print(user['name']); // Alice
```
