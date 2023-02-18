---
lang: es-ES
title: Flutter
description: Introducción a Flutter
---

# Flutter

## Introducción

Flutter es un framework, de alto rendimiento y de código abierto, creado por Google, que permite a los desarrolladores construir aplicaciones nativas para iOS y Android, así como aplicaciones web y de escritorio a partir de un único código base.

Flutter utiliza el lenguaje de programación Dart. Dart fue desarrollado por Google con el objetivo de sustituir a JavaScript, pero no tuvo el éxito esperado. Sin embargo, Dart es un lenguaje de programación moderno y fácil de aprender, que se utiliza en Flutter.

### Curva de aprendizaje

La curva de aprendizaje de Flutter es muy corta, ya que se basa en el conocimiento de los lenguajes de programación muy populares, y si tienes conocimientos de lenguajes orientados a objetos, como Javascript, se reduce la complejidad de aprenderlo. Además, la construcción de pantallas, utilizar el framework en si, es simple, porque vamos creando instancias, hijos de otras instancias y asi vamos a crear la UI de nuestra aplicación.

### Empezar con Flutter

Para empezar con Flutter, lo primero que debemos hacer es instalar su SDK. Para ello, debemos seguir los pasos que se indican en la [documentación oficial](https://flutter.dev/docs/get-started/install).

Tenemos que elegir el IDE que queremos utilizar, originalmente Flutter soporta tanto Android Studio como Visual Studio Code.

Una vez instalado el SDK, podemos crear un proyecto en el propio Visual Studio Code, o bien, podemos crearlo desde la terminal, con el comando `flutter create nombre_proyecto`.

Se crea un scaffolding con la estructura de carpetas y archivos necesarios para empezar a trabajar con Flutter.

### Estructura de un proyecto Flutter

La estructura de un proyecto Flutter es la siguiente:

```bash
├── android
├── ios
├── lib => El código mayormente lo escribiremos en esta carpeta.
├──── main.dart => Entrada de la aplicación.
├── linux
├── macos
├── test
├── web
├── windows
├── .gitignore
├── .metadata
├── analysis_options.yaml
├── flutter.iml
├── pubspec.lock
├── pubspec.yaml => Archivo de configuración de la aplicación. Que es como el package.json, donde se especifican las dependencias, el nombre de la aplicación, la versión, etc.
├── README.md
```

Las carpetas de `android`, `ios`, `linux`, `macos`, `windows` y `web` contienen los archivos necesarios para compilar la aplicación en cada uno de los sistemas operativos. Si se editan es para configurar la aplicación para cada uno de los sistemas operativos.
Por ejemplo en `android` se configura el `AndroidManifest.xml` para establecer los permisos de la aplicación, incluso ellos te permiten escribir código en `Kotlin`.

### Ejecutar la aplicación

Para ejecutar la aplicación, debemos ejecutar el comando `flutter run` en la terminal. Este te preguntara donde quieres ejecutar la aplicación.
Compilara la aplicación y la ejecutara en el dispositivo seleccionado.

La primera vez que se ejecuta la aplicación puede tardar un poco en ejecutarse.

Flutter tiene hot reload, es decir, que cuando se modifica el código, la aplicación se recarga automáticamente, sin necesidad de volver a compilar la aplicación.

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

#### Shortcuts

Flutter es muy verboso, para crear siempre un widget que tenga estado tenemos que crear una clase que extienda.
Tenemos mucho boilerplate.

Para evitar esto, podemos utilizar los shortcuts de Visual Studio Code.
Ejemplo, `st`. Esto nos permite seleccionar que tipo de widget queremos crear.
