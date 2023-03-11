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
