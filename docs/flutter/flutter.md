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

### Estructura de un proyecto Flutter

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
