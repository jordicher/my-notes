---
lang: es-ES
title: Flutter - Formularios
description: Formularios en Flutter
---

# Formularios

## Campos de texto

Los campos de texto son una parte fundamental de cualquier aplicación. Flutter nos proporciona un widget llamado `TextField` que nos permite capturar la entrada de texto del usuario.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('TextField Example'),
        ),
        body: Center(
          child: TextField(
            decoration: InputDecoration(
              hintText: 'Enter your name',
            ),
          ),
        ),
      ),
    );
  }
}
```

Ahora bien, si queremos capturar el valor del campo de texto, podemos hacer uso de un controlador.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  late final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _controler = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('TextField Example'),
        ),
        body: Center(
          child: TextField(
            controller: _controller,
            decoration: InputDecoration(
              hintText: 'Enter your name',
            ),
          ),
        ),
      ),
    );
  }
}
```

### initState y dispose

En el ejemplo anterior, hemos utilizado los métodos `initState` y `dispose` para inicializar y liberar el controlador del campo de texto.

initState, se llama cuando el widget es insertado en el árbol de widgets. Por otro lado, dispose, se llama cuando el widget es eliminado del árbol de widgets.

La idea de utilizar initState es vincular el controlador al campo de texto, mientras que dispose se utiliza para liberar los recursos asociados al controlador.

También en el TextField, hemos añadido el controlador `_controller` para capturar el valor del campo de texto.

### Hints

Los hints son textos que se muestran en un campo de texto cuando no hay ningún texto escrito en él. Flutter nos proporciona la clase `InputDecoration` que nos permite personalizar el aspecto del campo de texto.

Serian como los placeholders en HTML.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  late final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _controler = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('TextField Example'),
        ),
        body: Center(
          child: TextField(
            controller: _controller,
            decoration: InputDecoration(
              hintText: 'Enter your name',
            ),
          ),
        ),
      ),
    );
  }
}
```

### Password

Si queremos que el campo de texto sea de tipo contraseña, podemos hacer uso de las propiedades:

- `obscureText`, que oculta el texto escrito en el campo de texto.
- `enableSuggestions`, que deshabilita las sugerencias de texto.
- `autocorrect`, que deshabilita la corrección automática.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  late final TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _controler = TextEditingController();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('TextField Example'),
        ),
        body: Center(
          child: TextField(
            controller: _controller,
            decoration: InputDecoration(
              hintText: 'Enter your password',
            ),
            obscureText: true,
            enableSuggestions: false,
            autocorrect: false,
          ),
        ),
      ),
    );
  }
}
```
