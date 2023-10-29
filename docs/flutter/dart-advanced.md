---
lang: es-ES
title: Dart avanzado
description: Colecciones en Dart
---

# Dart avanzado

## Null Safety

Aunque digamos que todo en Dart es un objeto, no es del todo cierto, el valor null no es un objeto.

Null safety es una característica de Dart que permite a los desarrolladores escribir código más seguro. Dart 2.12 es la primera versión de Dart que incluye Null safety. La variable no puede ser null a no ser que se especifique explícitamente.

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
```

`late` es una palabra clave que se usa para indicar que una variable se inicializará más tarde. Si no se inicializa, el compilador arrojará un error.

```dart
late String name;
print(name); // Error: LateInitializationError: Field 'name' has not been initialized.
```

`?` es una palabra clave que se usa para indicar que una variable puede ser nula. Podemos hacer llamadas seguras a las variables nulas.

```dart
String? name;
print(name); // null
print(name.length); // Error: The getter 'length' was called on null.
print(name?.length); // null  => Safe call
```

`!` es una palabra clave que se usa para indicar que una variable ya estamos seguros de que no es nula. Si la variable es nula, el compilador arrojará un error.

```dart
String? name;
name = 'Bob';
print(name!.length); // 3
```
