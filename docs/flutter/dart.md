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
