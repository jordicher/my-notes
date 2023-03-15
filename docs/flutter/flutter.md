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
