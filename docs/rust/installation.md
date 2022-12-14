# Primeros pasos con Rust

En este apartado se sigue el [tutorial de microsoft](https://learn.microsoft.com/es-es/training/paths/rust-first-steps/) con la guía de [Miguel Angel Duran](https://www.youtube.com/watch?v=WMeM7-JswKQ).

## Instalación de Rust

Para instalar Rust en Windows, Linux o Mac, podemos seguir la guia de instalación de la [web oficial](https://www.rust-lang.org/tools/install).

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Comprobación de la instalación

Para comprobar que la instalación ha sido correcta, podemos ejecutar el siguiente comando:

```bash
rustc --version
```

```bash
cargo --version
```

En ambos casos debería aparecer la versión de Rust/cargo instalada.

## Hola mundo

En un archivo llamado `main.rs` escribimos el siguiente código:

```rust
fn main() {
    println!("Hola mundo");
}
```

Para compilar el archivo, ejecutamos el siguiente comando:

```bash
rustc main.rs
```

El comando `rustc` compila el archivo `main.rs` y genera un ejecutable llamado `main`.

Para ejecutar el programa, ejecutamos el siguiente comando:

```bash
    ./main
```

### Creación de un proyecto con Cargo

Cargo es el sistema de gestión de paquetes de Rust. Cargo nos permite crear proyectos, gestionar dependencias, compilar y ejecutar el código.

Para crear un proyecto con Cargo, ejecutamos el siguiente comando:

```bash
cargo new hello_world
```

El comando `cargo new` crea un nuevo proyecto con el nombre `hello_world`. Dentro del directorio `hello_world` se crea un archivo `Cargo.toml` que contiene la información del proyecto (sería como el package.json) y un directorio `src` que contiene el código fuente del proyecto.

Para compilar y ejecutar el proyecto, ejecutamos el siguiente comando:

```bash
cargo run
```
