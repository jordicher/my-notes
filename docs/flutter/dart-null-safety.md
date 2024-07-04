---
lang: es-ES
title: Dart - Null Safety
description: Null Safety en Dart
---

# Null Safety

Es un concepto que se esta implementando en los lenguajes más modernos, ejemplo, Rust, Swift ...

[Null safety](https://dart.dev/null-safety) es una característica de Dart que permite a los desarrolladores escribir código más seguro. Dart 2.12 es la primera versión de Dart que incluye Null safety. La variable no puede ser null a no ser que se especifique explícitamente.

Null es el concepto de la ausencia de valor. Es como decir, ahora mismo no tengo un valor para esta variable, pero lo tendré en el futuro.

No puedo hacer esto:

```dart
String name; // Error: String name; // Error: A value of type 'Null' can't be assigned to a variable of type 'String'.
int x = null; // Error: A value of type 'Null' can't be assigned to a variable of type 'int'.
```

Pero si puedo hacer esto:

```dart
late String name; // OK
String? name; // OK. It can be string or null.
int? aNullableInteger = null; // OK

List<String>? names = ['Foo', 'Bar', 'Baz'];
names = null;
```

`late` es una palabra clave que se usa para indicar que una variable se inicializará más tarde. Si no se inicializa, el compilador arrojará un error.

```dart
late String name;
print(name); // Error: LateInitializationError: Field 'name' has not been initialized.
```

`late` es útil cuando no podemos inicializar una variable en el momento de la declaración.

```dart
late String name;
name = 'Bob';
print(name); // Bob
```

`?` es una palabra clave que se usa para indicar que una variable puede ser nula. Podemos hacer llamadas seguras a las variables nulas.

```dart
String? name;
print(name); // null
print(name.length); // Error: The getter 'length' was called on null.
print(name?.length); // null  => Safe call
```

Es importante destacar que `?` en listas importa donde se coloca.

```dart
List<String>? names = ['Foo', 'Bar', 'Baz'];
names = null; // OK
```

```dart
List<String?> names = ['Foo', 'Bar', null]; // The element type 'Null' can't be assigned to the list type 'String'
```

Si queremos decir que dentro de la lista puede haber valores nulos, debemos usar `?` en el tipo de la lista.

```dart
List<String?> names = ['Foo', 'Bar', null];
```

`!` es una palabra clave que se usa para indicar que una variable ya estamos seguros de que no es nula. Si la variable es nula, el compilador arrojará un error.

```dart
String? name;
name = 'Bob';
print(name!.length); // 3
```

## ??

`??` es un operador que se usa para indicar que si la variable es nula, se debe usar un valor predeterminado.

```dart
String? name;
print(name ?? 'Bob'); // Bob
```

## ??=

`??=` es un operador que se usa para indicar que si la variable es nula, se debe usar un valor predeterminado y asignarlo a la variable.

```dart
String? name;
name ??= 'Bob';
print(name); // Bob
```

## ?.

`?.` es un operador que se usa para indicar que si la variable es nula, no se debe llamar al método.

```dart
String? name;
print(name?.length); // null
```

Por lo contrario, si el valor no es nulo, se llama al método.

```dart
String? name = 'Bob';
print(name?.length); // 3
```
