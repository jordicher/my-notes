---
lang: es-ES
title: Flutter
description: Flutter UI
---

# Flutter UI

Casi todo en Flutter es un Widget. Asi que si yo quiero añadir padding a un widget, lo que hago es añadir el widget Padding, y dentro de ese widget, añado el widget que quiero que tenga padding.

```dart
Padding(
  padding: const EdgeInsets.all(10), <!-- Para poner solo al top, padding: const EdgeInsets.only(top: 40.0), -->
  child: Text('Hola'),
)
```

Pero no todo es un widget, por ejemplo en Text, podemos añadir un estilo, que es un objeto de tipo TextStyle, que es un objeto que tiene propiedades como color, fontSize, fontWeight, etc.

```dart
Text(
  'Hola',
  style: TextStyle(
    color: Colors.red,
    fontSize: 20,
    fontWeight: FontWeight.bold,
  ),
)
```
