---
lang: es-ES
title: Flutter
description: Flutter
---

# Flutter

En resumen:

- Declarative UI framework, esto significa que no se necesita escribir código para crear la interfaz de usuario, sino que se describe la interfaz de usuario y Flutter se encarga de crearla.

- Componentes componibles. Así que en realidad podemos crear componentes cuyo nombre que vamos a usar aquí es widgets, así que vamos a componer widgets que podemos reutilizar en diferentes partes de nuestra aplicación.

- Dependency Rendering, por lo que en realidad, sus widgets tenemos dependencias en variables, propiedades, estados, que definirán cómo se representan sus widgets.

- Todo en la interfaz de usuario se expresa en widgets. Y un widget es solo una clase Dart, que extenderíamos desde una superclase de widget.

- El mismo código se puede ejecutar en mobile: Android y iOS, web. Desktop: Windows, Linux, Mac. Dispositivos embebidos: Fuchsia OS. Plataforma web.

## Flutter vs React Native

Flutter está en el mismo grupo de React Native, Xamarin, etc. Pero Flutter es diferente a todos ellos.

- Lenguajes de programación: React Native utiliza JavaScript para el desarrollo de aplicaciones, mientras que Flutter utiliza Dart, un lenguaje de programación desarrollado por Google.

- Enfoque de renderizado: React Native utiliza un enfoque de renderizado basado en el Virtual DOM, mientras que Flutter utiliza un enfoque de renderizado basado en la composición de widgets y la API de Canvas.
  En React Native cuando creamos un botón en la interfaz de usuario, en realidad estamos creando un botón nativo, si creamos un botón en android estamos creando un botón nativo de android, si creamos un botón en iOS estamos creando un botón nativo de iOS...
  Renderiza en una vista nativa utilizando la plataforma subyacente (por ejemplo, UIView en iOS o View en Android).

  En Flutter no es asi, en Flutter renderizamos nuestro botón en un canvas, a un nivel muy bajo, que emula el estándar UI de cada plataforma. Entonces, en realidad, no estamos creando un botón nativo.

- Curva de aprendizaje: React Native puede ser más fácil de aprender para los desarrolladores que ya están familiarizados con JavaScript, mientras que Flutter puede requerir más tiempo de aprendizaje debido a su lenguaje de programación Dart y su enfoque de renderizado único.

- Rendimiento: Flutter puede tener un mejor rendimiento y una experiencia de usuario más suave en aplicaciones con gráficos intensivos, mientras que React Native puede ser más adecuado para aplicaciones con una interfaz de usuario más estática o basada en texto.

## Material | Cupertino

Flutter no utiliza ningún SDK, utiliza los widgets de la plataforma subyacente. Y tenemos dos widgets listos para usar, Material y Cupertino. Podemos resumir que Material es para Android y Cupertino es para iOS.

Podemos usar Cupertino para Android o la web, pero se veria raro. Lo usual es usar Material.

## Setup

### Empezar con Flutter

Para empezar con Flutter, lo primero que debemos hacer es instalar su SDK. Para ello, debemos seguir los pasos que se indican en la [documentación oficial](https://flutter.dev/docs/get-started/install).

Tenemos que elegir el IDE que queremos utilizar, originalmente Flutter soporta tanto Android Studio como Visual Studio Code.

Flutter se basa en el SDK y se compila a partir de los SDK oficiales, esto significa que si queremos compilar una aplicación para Android, necesitamos tener instalado Android Studio o Android SDK, aunque Android Studio ya incluye el SDK. Si no queremos compilar en Android, no es necesario tener instalado Android Studio. Para compilar en ios requerimos de un Mac. Si tenemos un Mac y queremos compilar en ios, necesitamos instalar Xcode.

Una vez instalado el SDK, podemos crear un proyecto en el propio Visual Studio Code, o bien, podemos crearlo desde la terminal, con el comando `flutter create nombre_proyecto`.

Se crea un scaffolding con la estructura de carpetas y archivos necesarios para empezar a trabajar con Flutter.

En VSC se recomienda instalar la extensión de Flutter, que nos permite hacer muchas cosas, como por ejemplo, ejecutar la aplicación en un emulador o en un dispositivo físico.
Para crear una aplicación con la extensión. Podemos ir a la paleta de comandos y escribir `Flutter: New Project`.

### Ejecutar la aplicación

Para ejecutar la aplicación, debemos ejecutar el comando `flutter run` en la terminal. Este te preguntara donde quieres ejecutar la aplicación.
Compilara la aplicación y la ejecutara en el dispositivo seleccionado.

También podemos ejecutar la aplicación desde el IDE, en este caso, desde VSC. Para ello, en el footer de la aplicación, tenemos un botón que nos permite seleccionar el dispositivo donde queremos ejecutar la aplicación.

La primera vez que se ejecuta la aplicación puede tardar un poco en ejecutarse.
En caso de detectar que no esta funcionando correctamente, podemos ejecutar el comando `flutter doctor` para comprobar que todo esta correcto y en caso contrario nos indicara que pasos debemos seguir para solucionarlo.

[![Flutter doctor](./assets/flutter_doctor.png)]

Flutter tiene hot reload, es decir, que cuando se modifica el código, la aplicación se recarga automáticamente, sin necesidad de volver a compilar la aplicación.

## Estructura de un proyecto Flutter

La estructura de un proyecto Flutter es la siguiente:

![new project](./assets/new_project.png)

```bash
├── android
├── ios
├── lib => El código mayormente lo escribiremos en esta carpeta. Seria como la carpeta src.
├──── main.dart => Entrada de la aplicación.
├── linux
├── macos
├── test => Aquí se escriben los test unitarios.
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

Cada plataforma tiene sus propias particularidades y configuraciones, por lo que Flutter te proporciona una estructura de carpetas para cada plataforma objetivo.

Las carpetas de `android`, `ios`, `linux`, `macos`, `windows` y `web` contienen los archivos necesarios para compilar la aplicación en cada sistema operativo correspondiente. Al editar estos archivos, puedes configurar la aplicación para cada plataforma. Por ejemplo, en la carpeta "android", puedes editar el archivo AndroidManifest.xml para establecer los permisos de la aplicación, incluso puedes escribir código en Kotlin si lo deseas.

En resumen, estas carpetas son importantes porque te permiten compilar y personalizar tu aplicación para cada plataforma de destino, y así ofrecer una experiencia de usuario óptima para cada sistema operativo.

## Sintáxis

La sintaxis de Dart es orientada a objetos. Si hemos trabajado con otros lenguajes de programación orientados a objetos, como Java o Javascript, no tendremos problemas para entender la sintaxis de Dart.

Tendremos un main.dart que será el punto de entrada de nuestra aplicación.
Como ya sabemos, en dart se requiere de una función main para ejecutar la aplicación.

En este archivo, tendremos que importar el paquete de Flutter, y ejecutar la función `runApp()`.

La función `runApp()` recibe como parámetro un widget, que es el widget raíz de nuestra aplicación.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}
```

## Widgets

Todo en Flutter es un widget, y los widgets se componen de otros widgets. Los widgets son como los componentes de React...
Podemos decir que los widgets son lo que decide como renderizar el contenido en la pantalla.

Los widgets tienen que extender de una clase, como por ejemplo, StatelessWidget o StatefulWidget. Requieren tener una key, y un método build, que es el que se encarga de renderizar el widget.

```dart
class HelloWorld extends StatelessWidget {
  const HelloWorld({super.key});

  @override
  Widget build(BuildContext context) {
    return const Text('Hello World');
  }
}
```

## Estados

### Stateless

Stateless son widgets que no tienen estado, es decir, que no cambian. Por ejemplo, un widget que muestra un texto, no cambia, siempre muestra el mismo texto.

```dart
class Greet extends StatelessWidget {
  const Greet({super.key});

  @override
  Widget build(BuildContext context) {
    var name = "Jordi";
    return const Text('Hello $name'); // Esto dara error, ya que detecta que hay una variable, y por lo tanto no es constante
  }
}
```

Los stateless widgets no pueden cambiar su estado, por lo que no pueden tener variables que cambien. Por ejemplo, si queremos que el texto cambie, no podemos hacerlo con un stateless widget.
Ahora bien, el stateless widget si puede recibir parámetros, por ejemplo, el nombre de la persona a la que queremos saludar.

```dart
class Greet extends StatelessWidget {
  const Greet({super.key});

  @override
  Widget build(BuildContext context) {
    var name = "Jordi";
    return Column(
      children: [
        Text('Hello $name'),
        TextField(
          onChanged: (value) => name = value, // no pasa nada
        ),
      ],
    );
  }
}
```

### Stateful

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
