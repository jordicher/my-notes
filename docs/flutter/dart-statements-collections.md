---
lang: es-ES
title: Dart - Control de flujo y colecciones
description: Control de flujo y colecciones en Dart
---

# Control de flujo y colecciones

## Control de flujo

Los if, boolean conditions, functions etc. son iguales que en otros lenguajes de programación.

```dart
void main() {
  var x = 1;
  if (x == 1) {
    print('x is 1'); <!-- sends a message to the console with a new line after -->
  }
  while (x < 5) {
    print(x);
    x++;
  }
  for (var i = 0; i < 5; i++) {
    print(i);
  }
  for (var i in [1, 2, 3]) { <!-- it is more similar to a foreach loop -->
    print(i);
  }
}
```

### Condicionales

If & else, nos permite ejecutar un bloque de código si se cumple una condición.
Se evalúa la condición (if) y si es verdadera se ejecuta el bloque de código, si es falsa (else) se ejecuta el bloque de código del else.

Ejemplo de if:

```dart
void main() {
  var x = 1;
  if (x == 1) {
    print('x is 1');
  }
}
```

Ejemplo de if/else:

```dart
void main() {
  var x = 2;
  if (x == 1) {
    print('x is 1');
  } else {
    print('x is not 1');
  }
}
```

Ejemplo de if/else if/else:
En este caso, si la condición del if no se cumple, se evalúa la condición del else if, y si no se cumple, se ejecuta el bloque de código del else.

```dart
void main() {
  var x = 2;
  if (x == 1) {
    print('x is 1');
  } else if (x == 2) {
    print('x is 2');
  } else {
    print('x is not 1 or 2');
  }
}
```

Hay la posibilidad de escribir un if/else en una sola línea, pero solo si el bloque de código es de una sola línea. Y no suele ser el estándar.

```dart
void main() {
  var x = 2;
  if (x == 1) print('x is 1');
  else print('x is not 1');
}
```

## Operadores

Tenemos tres tipos de operadores, prefix, infix y postfix.

### Operadores prefix

Los operadores prefix se colocan delante de la variable.
Se hace la operación y se asigna el valor a la variable.

```dart
void main() {
  var x = 1;
  var y = ++x; // y = 2, x = 2
  var z = --x; // z = 1, x = 1
}
```

### Operadores infix

Los operadores infix se colocan entre dos variables.

```dart
void main() {
  var x = 1;
  var y = 2;
  var z = x + y; // z = 3
  var a = x - y; // a = -1
  var b = x * y; // b = 2
  var c = x / y; // c = 0.5
  var d = x % y; // d = 1
}
```

Algunos de estos operadores infix se pueden usar en strings.

```dart
void main() {
  var x = 'hello';
  var y = 'world';
  var z = x + y; // z = 'helloworld'

  var text = 'hello' * 3; // text = 'hellohellohello'
}
```

### Operadores postfix

Los operadores postfix se colocan detrás de la variable.
Se asigna el valor a la variable y después se hace la operación.

```dart
void main() {
  var x = 1;
  var y = x++; // y = 1, x = 2
  var z = x--; // z = 2, x = 1
}
```

## Colecciones

### List

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

### Set

Los conjuntos son colecciones de elementos únicos, por lo que no pueden contener elementos duplicados no están ordenados. En Dart, los conjuntos se representan con la palabra clave `Set`.

```dart
var nums = {1, 2, 3};
const names = {'foo', 'bar', 'baz', 'foo'}; // error: foo is duplicated
Set<int> set = {1, 2, 3};
```

### Map

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
