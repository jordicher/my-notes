---
lang: es-ES
title: Flutter - Future
description: Future en Flutter
---

# Future

Un `Future` es un objeto que representa un valor potencial, o error, que estará disponible en algún momento en el futuro. Cuando se crea un `Future`, se inicia un proceso asíncrono. El proceso puede producir un valor o un error. Cuando el proceso finaliza, el `Future` se completa con este valor o error.

```dart
Future<String> fetchUserOrder() {
  return Future.delayed(Duration(seconds: 2), () => 'Cafe');
}

void main() {
  print('Program started');
  fetchUserOrder().then((value) => print(value));
  print('Program ended');
}
```

## FutureBuilder

`FutureBuilder` es un widget que construye su interfaz de usuario en función de un `Future`. `FutureBuilder` es útil cuando se necesita esperar a que se complete un `Future` para construir la interfaz de usuario.

```dart
import 'package:flutter/material.dart';

Future<String> fetchUserOrder() {
  return Future.delayed(Duration(seconds: 2), () => 'Cafe');
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('FutureBuilder Example'),
        ),
        body: Center(
          child: FutureBuilder<String>(
            future: fetchUserOrder(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return CircularProgressIndicator();
              } else if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              } else {
                return Text('User order: ${snapshot.data}');
              }
            },
          ),
        ),
      ),
    );
  }
}
```
