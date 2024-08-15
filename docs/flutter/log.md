---
lang: es-ES
title: Log Flutter
description: Usa log en vez de print en Flutter
---

# Log

En Flutter, en lugar de usar `print` para imprimir mensajes en la consola, se recomienda usar `log`. Del paquete `dart:developer`.

```dart
import 'dart:developer';

void main() {
  log('Hello, World!');
}
```

`log` es una función que se puede utilizar para imprimir mensajes en la consola. La función `log` toma un mensaje como argumento y lo imprime en la consola. La función `log` también toma un segundo argumento opcional llamado `name`, que se puede utilizar para especificar un nombre para el mensaje. Por ejemplo:

```dart
import 'dart:developer';

void main() {
  log('Hello, World!', name: 'MyApp');
}
```

En el ejemplo anterior, hemos utilizado la función `log` para imprimir un mensaje en la consola con el nombre `MyApp`. El mensaje impreso en la consola se verá así:

```
[
  {
    "name": "MyApp",
    "value": "Hello, World!"
  }
]
```

## Imports, recomendación

Al estar importando una libreria que contiene diferentes funciones, pero que a la hora de la verdad solo vamos a utilizar una, es recomendable importar solo la función que vamos a utilizar. Por ejemplo, en lugar de importar todo el paquete `dart:developer`, podemos importar solo la función `log` de la siguiente manera:

```dart
import 'dart:developer' show log;
```

De esta manera, solo importamos la función `log` y no importamos todas las demás funciones del paquete `dart:developer`. Esto puede ayudar a reducir el tamaño de la aplicación y a mejorar el rendimiento.

Ahora bién, podriamos pensar que log, podria provocar confusión, y no sabemos de que paquete proviene, por lo que podemos importarla de la siguiente manera:

```dart
import 'dart:developer' as devtools show log;
```

Se usaria de la siguiente manera:

```dart
void main() {
  devtools.log('Hello, World!');
}
```
