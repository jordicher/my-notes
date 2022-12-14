# Primeros pasos con Rust

En este apartado se sigue el [tutorial de microsoft](https://learn.microsoft.com/es-es/training/paths/rust-first-steps/) con la guía de [Miguel Angel Duran](https://www.youtube.com/watch?v=WMeM7-JswKQ).

## Administración de código con el sistema de módulos de Rust

Rust tiene un sistema de módulos que nos permite organizar el código en diferentes archivos.
El sistema se compone:

- Crates: Un crate es un paquete de código que se compila en una unidad. Un crate puede contener uno o más módulos. Lo podemos entender como un punto de entrada.

- Módulos: Un módulo es un bloque de código que agrupa funcionalidades relacionadas. Un módulo puede contener cero o más funciones, estructuras, enumeraciones, etc.

- Rutas: Una ruta puede ser un módulo, un crate o un archivo. Nos permite implementar que parte tiene que ser pública y que parte privada.

### Uso de crates y bibliotecas de Rust

La biblioteca estándar de Rust se llama `std`, que contiene código reutilizable para las definiciones de tipos más comunes, como `String`, `Vec`, `Option`, etc. Y de forma predeterminada esta biblioteca está disponible en todos los crates de Rust.

Hay miles de bibliotecas de Rust disponibles en [crates.io](https://crates.io/), el repositorio de paquetes de Rust.

Al momento de usar una biblioteca de Rust, se debe importar. Para importar una biblioteca de Rust, se debe usar la palabra clave `use` seguida de la ruta de la biblioteca.

```rust
use std::io;
```
