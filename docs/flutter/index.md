---
lang: es-ES
title: Flutter
description: Introducción a Flutter
---

# Flutter

Estos apuntes están basados:

- Curso de [Web Components](https://frontendmasters.com/courses/flutter) - Maximiliano Firtman
- Directos de [Miguel Ángel Durán](https://www.twitch.tv/midudev)

## Introducción

Flutter es un framework, de alto rendimiento y de código abierto, creado por Google, que permite a los desarrolladores construir aplicaciones nativas para iOS y Android, así como aplicaciones web y de escritorio a partir de un único código base.

Desde que tenemos sistemas operativos han aparecido formas de crear aplicaciones para ellos, como por ejemplo, Java para Android, Swift para iOS, C# para Windows, etc. Que pasa que mucha gente, quiere hacer aplicaciones para diferentes dispositivos, y aqui nacen las herramientas híbridas, como por ejemplo, React Native, Ionic, etc. Estas herramientas permiten crear aplicaciones para diferentes dispositivos, pero estas aplicaciones no son nativas, sino que son aplicaciones web que se ejecutan dentro de un contenedor, y que se comunican con el sistema operativo para acceder a las funcionalidades nativas del dispositivo.

Pero en Flutter encontramos una herramienta que nos permite crear aplicaciones nativas, es decir, a nivel de compilación, se compilan las aplicaciones para cada uno de los sistemas operativos, el rendimiento es mucho mejor.

Flutter utiliza el lenguaje de programación Dart. Dart fue desarrollado por Google con el objetivo de sustituir a JavaScript, pero no tuvo el éxito esperado. Sin embargo, Dart es un lenguaje de programación moderno y fácil de aprender, que se utiliza en Flutter.

### Curva de aprendizaje

La curva de aprendizaje de Flutter es muy corta, ya que se basa en el conocimiento de los lenguajes de programación muy populares, y si tienes conocimientos de lenguajes orientados a objetos, como Javascript, se reduce la complejidad de aprenderlo. Además, la construcción de pantallas, utilizar el framework en si, es simple, porque vamos creando instancias, hijos de otras instancias y asi vamos a crear la UI de nuestra aplicación.

## Sintáxis

La sintaxis de Dart es orientada a objetos. Si hemos trabajado con otros lenguajes de programación orientados a objetos, como Java o Javascript, no tendremos problemas para entender la sintaxis de Dart.

Tendremos un main.dart que será el punto de entrada de nuestra aplicación. En este archivo, tendremos que importar el paquete de Flutter, y ejecutar la función `runApp()`.

La función `runApp()` recibe como parámetro un widget, que es el widget raíz de nuestra aplicación.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}
```

## Widgets

Todo en Flutter es un widget, y los widgets se componen de otros widgets. Los widgets son como los componentes de React.

Hay dos tipos de widgets, Stateless y Stateful.
Stateless son widgets que no tienen estado, es decir, que no cambian. Por ejemplo, un widget que muestra un texto, no cambia, siempre muestra el mismo texto.
Stateful son widgets que tienen estado, es decir, que cambian. Por ejemplo, un widget que muestra un contador, el contador cambia, por lo tanto, es un widget stateful.

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

Cada widget tiene un método `build()`, que es el que se encarga de construir el widget y el que se a pintar en pantalla.

Nosotros podemos crear o utilizar widgets que ya existen. Por ejemplo, el widget `MaterialApp` es un widget que ya existe, y que nos permite crear una aplicación con el estilo Material Design.

Como nosotros vamos a configurar nuestros widgets, en el constructor de la clase, debemos pasarle los parámetros necesarios para configurar el widget. En este caso, title, un theme y un home.

Todo lo que nosotros hagamos sera crear o usar widgets que nos proporciona Flutter.

Nuestro home, es `MyHomePage`, que es un widget stateful, que se encarga de mostrar la pantalla principal de nuestra aplicación.

**En flutter por tema de optimización, la UI no esta bindeada a un estado, es decir, que si cambiamos el estado de la aplicación, no se va a reflejar en la UI, sino que tenemos que decirle a Flutter que la UI ha cambiado, y que tiene que volver a pintarla.** Esto es diferente a React/Vue... en flutter tendremos que llamarlo para decirle que se repinte porque hay datos nuevos.

```dart
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title; <!-- declaramos una variable  -->

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}
```

`super.key` sobretodo para testing/performance, puedes decirle buscame en pantalla un widget con este id. Es una forma de diferenciar widgets.

`@override` es un decorador que sobreescribir un método de la clase padre.

Si añadimos el prefijo `_` a la clase, estamos indicando que es una clase privada, es decir, que solo se puede utilizar dentro de este archivo.

```dart
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0; <!-- declaramos una variable  -->
  var _text = 'Hola mundo'; <!-- en dart se aconseja que sea tipado, pero tambien se puede utilizar var -->

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  ...
```

Al ser un StatefulWidget, usualmente escribiremos el código en la clase privada, `_MyHomePageState`.

### build()

El método `build()` es el que se encarga de construir el widget, y es el que se va a pintar en pantalla.

```dart
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

Como podemos ver el build, devuelve un `Scaffold`, que es un widget que ya existe en Flutter, y que nos permite crear una pantalla con AppBar, body, etc.
También tenemos otros widgets, como Center, AppBar, Column, Text, etc. Eso nos permiteria crear una apliación entera sin tener que crear nuestro propios widgets.

`floatingActionButton` es un widget que ya existe en Flutter, y que nos permite crear un botón flotante, que por defecto esta debajo a la derecha. Que tiene un callback `onPressed`, que se ejecuta cuando pulsamos el botón.

`setState()` es un método que nos proporciona Flutter, y que nos permite decirle a Flutter que estamos modificando el estado de la aplicación, y que una vez finalizado, tiene que volver a pintar la UI del widget, con los nuevos valores. Se va a refrescar en este caso MyHomePage, no refresca la aplicación entera.
Yo solo llamando a `setState()` va a repintar la UI, aunque en su interior no haya cambiado nada.

### Estilos

Una aplicación web que se vera por ejemplo en una pantalla de escritorio, va a tener un tamaño de pantalla diferente a una aplicación web que se vera en un móvil. Por lo tanto, necesitamos que nuestra aplicación se adapte a diferentes tamaños de pantalla.

Hay un componente que se llama `LayoutBuilder`, que nos permite crear un widget que se adapte a diferentes tamaños de pantalla.
Nos ofrece un callback `builder`, que recibe como parámetro un `BuildContext`, y un `BoxConstraints`, que nos permite saber el tamaño de la pantalla.

```dart
return LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      return _buildDesktop(context);
    } else {
      return _buildMobile(context);
    }
  },
);
```

Hay otros widgets como el `Column`, que tiene configuraciones para que se adapte a diferentes tamaños de pantalla.

#### Shortcuts

Flutter es muy verboso, para crear siempre un widget que tenga estado tenemos que crear una clase que extienda.
Tenemos mucho boilerplate.

Para evitar esto, podemos utilizar los shortcuts de Visual Studio Code.
Ejemplo, `st`. Esto nos permite seleccionar que tipo de widget queremos crear.
