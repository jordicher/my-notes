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

## Scaffold

El widget Scaffold, es un widget que nos da una estructura básica de una aplicación. Tiene una AppBar, un body.

```dart
return Scaffold(
  appBar: AppBar(
    title: Text(widget.title),
  ),
  body: Center(
    child: Text('Hola'),
  )
);
```

### Bottom Navigation Bar

Para añadir una Bottom Navigation Bar, tenemos que usar el widget BottomNavigationBar, que recibe como parámetro un items, que es una lista de BottomNavigationBarItem, que es un objeto que tiene un icon, y un label.

Este widget tiene que ir dentro de un Scaffold, y tiene que ir en la propiedad bottomNavigationBar.
Scaffold lo podemos entender como el contenedor de la aplicación.

```dart
BottomNavigationBar(
  backgroundColor: Colors.white,
  items: [
    BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.search),
      label: 'Search',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      label: 'Profile',
    ),
  ],
)
```

Los iconos que usamos, son los que nos da Material UI por defecto. [Material Icons](https://material.io/resources/icons/?style=baseline). Obviamente podemos usar otros iconos.

#### Ejemplo

```dart
class _MyHomePageState extends State<MyHomePage> {
  var selectedPage = 0;

  @override
  Widget build(BuildContext context) {
    Widget currentWidgetPage = const Text("!!!");

    switch (selectedPage) {
      case 0:
        currentWidgetPage = const HelloWorld();
        break;
      case 1:
        currentWidgetPage = const OffersPage();
        break;
      case 2:
        currentWidgetPage = const Text("Order");
        break;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: currentWidgetPage,
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.white,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        currentIndex: selectedPage,
        onTap: (index) {
          setState(() {
            selectedPage = index;
          });
        },
      ),
    );
  }
}
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

Lo centra en el eje X e Y.

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

## Scroll

Flutter por defecto no tiene scroll, pero podemos añadirlo con el widget SingleChildScrollView, que recibe como parámetro un child, que es el widget que queremos que tenga scroll.

```dart
SingleChildScrollView(
  child: Text('Hola'),
)
```

Aunque también podemos usar el widget ListView, que es un widget que tiene scroll, y que recibe como parámetro un children, que es una lista de widgets.

```dart
ListView(
  children: [
    Text('Hola'),
    Text('Hola'),
    Text('Hola'),
  ],
)
```
