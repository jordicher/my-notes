---
lang: es-ES
title: Dart
description: Introducción a Dart
---

# Dart

Dart es un lenguaje de programación desarrollado por Google, open source y multiplataforma. Es un lenguaje orientado a objetos (por lo que todo es un objeto), con tipado estático y tipado fuerte. Dart fue pensado para substituir JavaScript en el desarrollo de aplicaciones web, pero no lo ha consiguido. En la actualidad, Dart es el lenguaje de programación oficial de Flutter, claro que se pueden hacer otras cosas con él, como server-code, scripting, AngularDart pero a día de hoy, Flutter es su principal uso.

Dart recuerda a otros lenguajes de programación como Java, C#, JavaScript, etc. Es un lenguaje que se puede aprender fácilmente.

Null safety es una característica de Dart que permite a los desarrolladores escribir código más seguro. Dart 2.12 es la primera versión de Dart que incluye Null safety. La variable no puede ser null a no ser que se especifique explícitamente.

```dart
int? aNullableInteger = null;
```

Dart en el caso de compilar Javascript lo hará con código fuente, si requerimos una app de Windows, Linux... lo hará con bytecode. Y si nuestro objetivo es una app de Android o iOS, lo hará con código maquina.

El código fuente es el código escrito por los programadores en un lenguaje de alto nivel que es legible por los seres humanos. El bytecode es el código intermedio generado por el compilador y está diseñado para ser interpretado o compilado en código de máquina específico. El código de máquina es el código binario que se ejecuta directamente en el hardware de la computadora.

Toda aplicación Dart tiene un punto de entrada, el método `main()`. Este método es el que se ejecuta cuando se ejecuta la aplicación.

```dart
void main() {
  print('Hello, World!');
}
```

## Basics

### Semicolons

En Dart, los puntos y comas son opcionales. Siempre que no escriba un punto y coma, el compilador asumirá que el siguiente token es una nueva declaración.

```dart
void main() {
  print('Hello, World!');
}
```

### Var

En Dart, las variables se declaran con la palabra clave `var`.

```dart
var x = 1;
var y = 2;
```

Aunque se parezca a JavaScript, Dart es un lenguaje de programación fuertemente tipado. Esto significa que las variables tienen un tipo explícito y no se pueden cambiar. Por ejemplo, si intenta asignar un valor de cadena a una variable de tipo num, el compilador lo rechazará.

```dart
var x = 1;
x = 'Hello'; // Error: A value of type 'String' can't be assigned to a variable of type 'num'.
```

### Conditions

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

### Nombres

Las mismas reglas que en JavaScript, no se pueden usar palabras reservadas, no se pueden usar caracteres especiales, no se pueden usar espacios, no se pueden usar números al principio, etc.

Funciones y variables deben ser en camelCase.

Clases deben ser en PascalCase.

### Public

En Dart, todo es público por defecto. Si desea que algo sea privado, debe agregar un guión bajo (\_) al principio de su nombre.

```dart
class Person {
  String name;
  int age;
  _Person(this.name, this.age);
}
```

## Variables y tipos

### Mutable

Inferencia de tipos es una característica de Dart que permite a los desarrolladores escribir código más conciso. El compilador puede deducir el tipo de una variable en tiempo de compilación. En ese caso utiliza la palabra clave `var` para declarar la variable.

```dart
var name = 'Bob';
var age = 42;
var x; <!-- type dynamic -->
```

Se puede especificar el tipo de una variable.

```dart
String name = 'Bob';
int age = 42;
```

Si no se especifica el tipo de una variable, el compilador la considera de tipo `dynamic`. Esto significa que la variable puede contener cualquier tipo de valor. Es una mala práctica usar `dynamic`.

```dart
dynamic name = 'Bob';
dynamic age = 42;
dynamic x; <!-- type dynamic -->
```

### Inmutable

Las variables inmutables son aquellas cuyo valor no puede ser cambiado una vez que se ha asignado. En Dart, las variables inmutables se declaran con la palabra clave `final` o `const`.

```dart
final name = 'Bob';
final int age = 42;
const x = 42;
```

### Tipos

Tipos de datos core en Dart:

- `String`: es un tipo de datos que representa una cadena de caracteres.
- `int`: es un tipo de datos que representa un número entero.
- `double`: es un tipo de datos que representa un número de punto flotante.
- `bool`: es un tipo de datos que representa un valor booleano.
- `dynamic`: es un tipo de datos que representa un valor dinámico.
- `num`: es un tipo de datos que representa un número. Puede ser un entero o un punto flotante.

```dart
String name = 'Bob';
int age = 42;
double height = 1.85;
bool isTrue = true;
dynamic x; <!-- type dynamic -->
num y = 42;

var message = "The name is $name and the age is $age. And a operation is ${height + 10}"; <!-- String interpolation -->
```

**Recordar que en Dart, todo es un objeto.** Asi que los tipos de datos core son objetos.

## Colecciones y Null Safety

### List

Las listas son colecciones ordenadas de elementos. En Dart, las listas se representan con la palabra clave `List`.

```dart
var list = [1, 2, 3];
List<int> list = [1, 2, 3];
```

### Set

Los conjuntos son colecciones de elementos únicos, por lo que no pueden contener elementos duplicados (da un warning) y no están ordenados. En Dart, los conjuntos se representan con la palabra clave `Set`.

```dart
var set = {1, 2, 3};
Set<int> set = {1, 2, 3};
```

### Map

Los mapas son colecciones de pares clave-valor. En Dart, los mapas se representan con la palabra clave `Map`.

```dart
var map = {1: 'one', 2: 'two', 3: 'three'};
Map<int, String> map = {1: 'one', 2: 'two', 3: 'three'};
Map<String, Object> user = {'name': 'Bob', 'age': 42};
```

Aunque digamos que todo en Dart es un objeto, no es del todo cierto, el valor null no es un objeto.

## Null Safety

Null safety es opcional en Dart. En Flutter ya esta activado por defecto.

No puedo hacer esto:

```dart
String name; // Error: String name; // Error: A value of type 'Null' can't be assigned to a variable of type 'String'.
int x = null; // Error: A value of type 'Null' can't be assigned to a variable of type 'int'.
```

Pero si puedo hacer esto:

```dart
late String name; // OK
String? name; // OK. It can be string or null.
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
