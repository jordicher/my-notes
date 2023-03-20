---
lang: es-ES
title: Estados
description: Estados en Flutter
---

# Estados

## Stateless

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

## Stateful

Stateful son widgets que tienen estado, es decir, que cambian. Por ejemplo, un widget que muestra un contador, el contador cambia, por lo tanto, es un widget stateful.

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

El método `setState()` es el que se encarga de decirle a Flutter que la UI ha cambiado, y que tiene que volver a pintarla.

## build()

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
