---
lang: es-ES
title: Introducción a Dart
description: Conceptos básicos de Dart como palabras clave, tipos de datos, constantes, variables, funciones y sus argumentos y resultados
---

# Dart

Dart es un lenguaje de programación desarrollado por Google, open source y multiplataforma. Es un lenguaje orientado a objetos (por lo que todo es un objeto), con tipado estático y tipado fuerte. Dart fue pensado para substituir JavaScript en el desarrollo de aplicaciones web, pero no lo ha consiguido. En la actualidad, Dart es el lenguaje de programación oficial de Flutter, claro que se pueden hacer otras cosas con él, como server-code, scripting, AngularDart pero a día de hoy, Flutter es su principal uso.

Se puede probar Dart directamente en la web con [DartPad](https://dartpad.dev/).

Dart recuerda a otros lenguajes de programación como Java, C#, JavaScript, etc. Es un lenguaje que se puede aprender fácilmente.

Dart en el caso de compilar Javascript lo hará con código fuente, si requerimos una app de Windows, Linux... lo hará con bytecode. Y si nuestro objetivo es una app de Android o iOS, lo hará con código maquina.

El código fuente es el código escrito por los programadores en un lenguaje de alto nivel que es legible por los seres humanos. El bytecode es el código intermedio generado por el compilador y está diseñado para ser interpretado o compilado en código de máquina específico. El código de máquina es el código binario que se ejecuta directamente en el hardware de la computadora.

## Keywords

Las palabras clave son palabras reservadas que tienen un significado especial para el compilador. No se pueden usar como nombres de variables, nombres de funciones, nombres de clases, etc.

Ejemplo de palabras clave en Dart: "abstract", "as", "assert", "async", "await", "break", "case", "catch", "class", "const", "continue", "default", "deferred", "do", "dynamic", "else", "enum", "export", "extends", "extension", "external", "factory", "false", "final", "finally", "for", "Function", "get", "hide", "if", "implements", "import", "in", "interface", "is", "library", "mixin", "new", "null", "on", "operator", "part", "required", "rethrow", "return", "set", "show", "static", "super", "switch", "sync", "this", "throw", "true", "try", "typedef", "var", "void", "while", "with", "yield".

**Recursos:**

- [dart.dev](https://dart.dev/language/keywords)

## Tipos

Los tipos en el leguaje de programación es una propiedad de las variables que determina qué tipo de datos pueden contener.
Por ejemplo tu nombre es una cadena de caracteres, tu edad es un número entero, etc. Es una categarización de los datos.

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

**Recursos:**

- [dart.dev](https://dart.dev/guides/language/language-tour#built-in-types)

## Variables

### Inmutable

Las variables inmutables son aquellas cuyo valor no puede ser cambiado una vez que se ha asignado. En Dart, las variables inmutables se declaran con la palabra clave `final` o `const`.

```dart
final name = 'Bob';
final int age = 42;
const x = 42;
```

#### Tiempo de compilación vs Tiempo de ejecución

El tiempo de compilación es cuando el código se convierte en código de máquina. El tiempo de ejecución es cuando el código se ejecuta en el hardware de la computadora.

Asi que una constante es una variable cuyo valor se conoce en tiempo de compilación. Y no se puede cambiar.

```dart
const x = 42;
const date = new DateTime.now(); // Error: 'DateTime.now' can't be used as a const expression because it isn't a constant expression.
const arr = [1, 2, 3];
arr.add(4); // Error Unhandled exception:  Unsupported operation: Cannot add to an unmodifiable list)
```

Mientras que una variable final es una variable cuyo valor se conoce en tiempo de ejecución. Y se parece más a "const" de JavaScript.

```dart
final date = new DateTime.now();
final arr = [1, 2, 3];
arr.add(4); // OK
```

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

## Funciones

Las funciones son lo mismo que en JavaScript. Pero no requieren la palabra clave `function`. Las funciones són agrupaciones de código que se pueden reutilizar, que pueden recibir argumentos y que pueden devolver un valor.

Las funciones son objetos de primera clase en Dart. Esto significa que las funciones pueden ser asignadas a variables, pasadas como argumentos a otras funciones y devueltas por otras funciones.

```dart
void main() {
  var list = [1, 2, 3];
  list.forEach(printElement);
}

printElement(int element) {
  print(element);
}
```

Se puede decir que es lo que va a devolver la función.

```dart
int add(int a, int b) {
  return a + b;
}
```

### Argumentos

Se puede tipar los argumentos de una función.

```dart
int add(int a, int b) {
  return a + b;
}
```

Permite hacer un "destructuring" de los argumentos. Pero serán opcionales por defecto.

```dart
int add({int a, int b}) {
  return a + b;
}

add(b: 2, a: 1);
```

Por eso podemos usar `required` para que sean obligatorios.

```dart
int add({required int a, required int b}) {
  return a + b;
}
```

En el caso de los posibles valores opcionales o nulos.

```dart
int add({int? a, int? b}) {
  if (a != null && b != null) {
    return a + b;
  } else {
    return 0;
  }
}
```

Los argumentos de una función pueden tener valores predeterminados. Si no se proporciona un argumento, se usa el valor predeterminado.

```dart
int add(int a, [int b = 1]) {
  return a + b;
}
```

### Lambda y Arrow

Las funciones lambda son funciones anónimas que se pueden asignar a variables o pasar como argumentos a otras funciones.

En js sería:

```js
const add = function (a, b) {
  return a + b;
};
```

En Dart sería:

```dart
Function add = (int a, int b) { <!-- Function it is a type -->
  return a + b;
};

final add = (int a, int b) {
  return a + b;
};
```

Arrow function:

```dart
Function add = (int a, int b) => a + b;
```

Las arrow functions no pueden tener más de una expresión.

```dart
Function add = (int a, int b) => {
  a + b
}; // Error
```

## Formatear los strings

### Concatenación

La concatenación de cadenas es una forma de combinar dos o más cadenas. Para hacer esto, se usa el signo de más (+).

```dart
var name = 'Bob';
var age = 42;
var message = "The name is " + name + " and the age is " + age.toString();
```

### String interpolation

La interpolación de cadenas es una forma de insertar expresiones de Dart en cadenas. Para hacer esto, se usa el signo de dólar ($) seguido de la expresión.

```dart
var name = 'Bob';
var age = 42;
var message = "The name is $name and the age is $age";
```

## Basics

Toda aplicación Dart tiene un punto de entrada, el método `main()`. Este método es el que se ejecuta cuando se ejecuta la aplicación.

```dart
void main() {
  print('Hello, World!');
}
```

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
