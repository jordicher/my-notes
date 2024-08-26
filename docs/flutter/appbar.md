---
lang: es-ES
title: Appbar
description: Appbar en Flutter
---

# Appbar

El `AppBar` es un widget que se utiliza para mostrar un título, un menú de opciones y un botón de acción. El `AppBar` es un widget de nivel superior que se utiliza para proporcionar una interfaz de usuario coherente en la parte superior de la aplicación.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: Text('AppBar Example'),
      ),
    ),
  ));
}
```

En el ejemplo anterior, hemos creado un `AppBar` con un título. El `AppBar` se muestra en la parte superior de la pantalla. El título del `AppBar` es `AppBar Example`.

## Acciones

El `AppBar` puede contener acciones como botones, menús desplegables, etc. Las acciones se muestran en el lado derecho del `AppBar`.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: Text('AppBar Example'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              print('Search button clicked');
            },
          ),
          IconButton(
            icon: Icon(Icons.more_vert),
            onPressed: () {
              print('More button clicked');
            },
          ),
        ],
      ),
    ),
  ));
}
```

En el ejemplo anterior, hemos añadido dos botones de acción al `AppBar`. El primer botón es un botón de búsqueda y el segundo botón es un botón de menú.

## Menú de opciones

El `AppBar` también puede contener un menú de opciones. El menú de opciones se muestra como un icono de desbordamiento en el lado derecho del `AppBar`.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(
        title: Text('AppBar Example'),
        actions: <Widget>[
          PopupMenuButton<String>(
            onSelected: (String value) {
              print('Selected: $value');
            },
            itemBuilder: (BuildContext context) {
              return <PopupMenuEntry<String>>[
                PopupMenuItem<String>(
                  value: 'Settings',
                  child: Text('Settings'),
                ),
                PopupMenuItem<String>(
                  value: 'Help',
                  child: Text('Help'),
                ),
              ];
            },
          ),
        ],
      ),
    ),
  ));
}
```
