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

## Assets

Podemos crear una carpeta assets/images... en la raiz del proyecto. Es importante no poner la carpeta assets dentro de la carpeta lib, esta queda reservada para el código.

Tenemos que añadir la carpeta assets en el pubspec.yaml

```yaml
# To add assets to your application, add an assets section, like this:
# assets:
#   - images/a_dot_burr.jpeg
#   - images/a_dot_ham.jpeg

# Para añadir toda la carpeta
assets:
  - images/

# Podemos seleccionar solo algunos archivos
assets:
  - images/a_dot_burr.jpeg
  - images/a_dot_ham.jpeg
```

Diferentes resoluciones de pantalla, por lo que tenemos que tener en cuenta que las imagenes que usamos, tengan diferentes resoluciones.
Para eso tenemos que crear una carpeta por cada resolución, y dentro de cada carpeta, las imagenes que queremos usar, con el mismo nombre.

Las carpetas tienen que tener el siguiente nombre: `2.0x`, `3.0x`, `4.0x`. Entonces seleccionara la imagen que corresponda a la resolución de la pantalla.

Ahora bien, si no añadimos una imagen para una resolución, Flutter va a usar la única que tenemos.

Para usar la imagen, como titulo de la AppBar, por ejemplo, tenemos que usar el widget Image.asset, que recibe como parámetro el path de la imagen.

```dart
return Scaffold(
  appBar: AppBar(
    title: Image.asset(
      'images/logo.png',
      fit: BoxFit.cover,
    ),
  ),
  body: const HelloWorld(),
);
```

**Al añadir una imagen, tenemos que reiniciar la aplicación.**. Al modificar algo externo a la carpeta lib, tenemos que reiniciar la aplicación.

## Theme color

El color por defecto es azul. `primarySwatch: Colors.blue,`.
Lo podemos cambiar, pero Material Design nos da una paleta de colores, que podemos usar. Estan optimizados para tener contraste. [Material Palette](https://www.materialpalette.com/). [Material Color Tool](https://m2.material.io/design/color/the-color-system.html#color-theme-creation)

````dart

```dart
return MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.red,
  ),
  home: const MyHomePage(title: 'Flutter Demo Home Page'),
);
````

Por nuestra parte, podemos crear y usar nuestros colores. Pero Material UI, nos da paletas para usar, diseñada por profesionales.

## Center

Para centrar un widget, podemos usar el widget Center, que recibe como parámetro un child, que es el widget que queremos centrar.

```dart
Center(
  child: Text('Hola'),
)
```

## Theme.of

Para usar el theme, podemos usar el widget Theme.of, que recibe como parámetro un BuildContext, y devuelve un ThemeData.

Por ejemplo para hacer un titulo grande.

```dart
Text(
  'Hola',
  style: Theme.of(context).textTheme.headlineLarge,
)
```
