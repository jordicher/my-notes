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

## Funciones

Las funciones son bloques de código que realizan una tarea específica. Las funciones pueden recibir parámetros y devolver valores.
Para definir una función, se debe usar la palabra clave `fn` seguida del nombre de la función.

Cada programa de Rust debe tener una función `main` que es el punto de entrada del programa.

```rust
fn main() {
    println!("Hola mundo");
}
```

## Macros

### todo!

El macro `todo!` es un marcador de posición para funciones que aún no se han implementado. Cuando se ejecuta, el macro `todo!` produce un error en tiempo de compilación.

```rust
fn main() {
    todo!("Implementar la función");
}
```

### println!

El macro `println!` es una función que imprime un mensaje en la consola.

```rust
fn main() {
    println!("Hola mundo");
}
```

#### Sustitución de valores para argumentos {}

El macro `println!` permite sustituir valores para los argumentos `{}`.

```rust
fn main() {
    println!("Hola {}", "Jordi");
}
```

## Variables

Las variables son contenedores para almacenar valores. Las variables se definen con la palabra clave `let` seguida del nombre de la variable y el tipo de dato.

```rust
// se puede crear vacía, para después asignárselo
let name;
name = "Jordi"; // Todas las variables tienen que terminar teniendo valor.

// se puede crear con valor
let name = "Jordi";

// se puede crear con valor y tipo

let name: String = "Jordi";
```

### Mutabilidad

Las variables se pueden definir como mutables o inmutables. Las variables mutables se pueden modificar después de su creación. Las variables inmutables no se pueden modificar después de su creación. **Por defecto las variables son inmutables.**

```rust
let name = "Jordi"; // inmutable

let mut num = 10; // mutable
num = 20;
```

### Propiedad reemplazada de variables

Cuando se define una variable con el mismo nombre que una variable existente, la variable existente se reemplaza por la nueva variable.

```rust
let name = "Jordi";
let name = "Juan"; // se reemplaza la variable name
```

Ejemplo [tutorial de microsoft](https://learn.microsoft.com/es-es/training/modules/rust-create-program/2-variables)

```rust
// Declara la primera variable con el nombre "shadow_num"
let shadow_num = 10;

// Declara la segunda variable con el nombre "shadow_num"
let shadow_num = shadow_num + 5;

// Declara la tercera variable con el nombre "shadow_num"
let shadow_num = shadow_num * 2;

// Imprime el valor de la variable "shadow_num"
println!("El valor de la variable es: {}", shadow_num); // 30
```

## Tipado

En este apartado no se va a explicar que es el tipado, o que es un string, boolean... Solo se van a comentar los aspectos más importantes del tipado de Rust.

Rust es un lenguaje de programación fuertemente tipado. Esto significa que el compilador de Rust necesita saber el tipo de dato de cada variable. El compilador puede inferir el tipo de dato de una variable en la mayoría de los casos.

En caso de dar un tipo de dato incorrecto, el compilador de Rust nos mostrará un error.

```rust
//manera correcta
let num: u32 = 10;

//manera incorrecta
let num: u32 = "Jordi"; // error
```

### Texto

El tipo de dato `char` se usa para almacenar un carácter Unicode.

```rust
let letter = 'a';
let smiley_face = '😃';
```

Los strings son tipos de datos extramadamente complejos. Rust tiene dos tipos de datos para strings: `String` y `&str`.

`String` es un tipo de dato que se usa para crear strings. `String` es un tipo de dato que se puede modificar.

`&str` es un tipo de dato que se usa para referenciar strings. `&str` es un tipo de dato que no se puede modificar, es inmutable.

### Tuplas y structs

Las tuplas y los structs son tipos de datos que se usan para agrupar valores. Las tuplas y los structs son tipos de datos compuestos.

#### Tuplas

La tupla es un tipo de dato que se usa para agrupar valores de diferentes tipos. Las tuplas son tipos de datos inmutables.

```rust
let tupla = (1, "Jordi", true);
```

Para acceder a los valores de una tupla, se usa la notación de punto y el índice del valor.

```rust
let tupla = (1, "Jordi", true);
let num = tupla.0;
let name = tupla.1;
let is_active = tupla.2;
```

#### Structs

Los structs son tipos de datos que se usan para agrupar valores de diferentes tipos. Los structs son tipos de datos inmutables.

Para definir un struct, se usa la palabra clave `struct` seguida del nombre del struct capitalizado y los campos del struct.

Tenemos tres tipos de structs:

- Parecido a un objeto de js. Cada campo tiene un nombre y un tipo de dato.

```rust
struct User {
    name: String,
    age: u32,
    is_active: bool,
}
```

- Parecido a una tupla. Cada campo tiene un tipo de dato. Al igual que las tuplas, los structs de este tipo no tienen nombres para los campos, y se empieza por 0.

```rust
struct User(String, u32, bool);
```

- Structs de unidad. No tienen campos.

```rust
struct User;
```

Para crear un struct, se usa la palabra clave `let` seguida del nombre del struct y los valores de los campos.

```rust
struct User {
    name: String,
    age: u32,
    is_active: bool,
}

let user = User {
    name: String::from("Jordi"), // Convertir un string literal a String. Estamos creando de una cadena de texto a un String. "Se deben convertir de una referencia literal de cadena (&str) a un tipo String. Para realizar la conversión, se usa el método String::from(&str)"
    age: 30,
    is_active: true,
};
```

Para acceder a los valores de un struct, se usa la notación de punto y el nombre del campo.

```rust
let name = user.name;
```

### Enum

Los enums son tipos de datos que se usan para agrupar valores de diferentes tipos. Los enums son tipos de datos inmutables. Es parecido a lo que tendriamos en typescript.

```rust
enum User {
   // Parecido a un objeto de js. Cada campo tiene un nombre y un tipo de dato.
    Admin {
         name: String,
         age: u32,
         is_active: bool,
    },
    // Parecido a una tupla. Cada campo tiene un tipo de dato. Al igual que las tuplas, los structs de este tipo no tienen nombres para los campos, y se empieza por 0.
    Guest(String, u32, bool),
    // Structs de unidad. No tienen campos.
    Anonymous,
}
```

Si una función espera el enum User. Debe aceptar todos los tipos de datos que tiene el enum. No puede aceptar solo uno de los tipos de datos, por ejemplo, no puede aceptar solo Admin.

Para asignar un valor a un enum, se usa la palabra clave `let` seguida del nombre del enum y los valores de los campos.

```rust
let user_admin = User::Admin {
    name: String::from("Jordi"),
    age: 30,
    is_active: true,
};

let user_guest = User::Guest(String::from("Jordi"), 30, true);

let user_anonymous = User::Anonymous;
```

#### Definir un enum con Structs

```rust
struct Admin {
    name: String,
    age: u32,
    is_active: bool,
}

struct Guest(String, u32, bool);

struct Anonymous;

enum User {
    Admin(Admin),
    Guest(Guest),
    Anonymous(Anonymous),
}
```

#### Ejemplo

```rust
#[derive(Debug)] // Para poder imprimir el struct con el println. En el println se usa el {:#?}
struct Guest(String, u32, bool);

#[derive(Debug)]
struct Admin {
    name: String,
    age: u32,
    is_active: bool,
}

#[derive(Debug)]
enum User {
    UsGuest(Guest),
    UsAdmin(Admin),
    UsAnonymous(bool)
}


fn main() {
    let user_guest = User::UsGuest(Guest(String::from("Jordi"), 30, true));
    let user_admin = User::UsAdmin(Admin {
        name: String::from("Jordi"),
        age: 30,
        is_active: true,
    });
    let user_anonymous = User::UsAnonymous(true);

    println!("{:#?}", user_guest);
    println!("{:#?}", user_admin);
    println!("{:#?}", user_anonymous);
}
```

## Sangría del código

La sangría se usa para definir el alcance de las variables y las funciones. La sangría se define con 4 espacios. Además se usa el `;` para indicar el final de una sentencia. En caso de no usar el `;` pasamos a la siguiente línea.

## Condicionales

### if

El condicional `if` se usa para ejecutar un bloque de código si una condición es verdadera.

```rust
let num = 10;

if num > 5 {
    println!("El número es mayor que 5");
}
```

### if else

El condicional `if else` se usa para ejecutar un bloque de código si una condición es verdadera, y otro bloque de código si la condición es falsa.

```rust
let num = 10;

if num > 5 {
    println!("El número es mayor que 5");
} else {
    println!("El número es menor o igual que 5");
}
```

### if else if

El condicional `if else if` se usa para ejecutar un bloque de código si una condición es verdadera, y otro bloque de código si la condición es falsa. Además, se pueden encadenar múltiples condiciones.

```rust
let num = 10;

if num > 5 {
    println!("El número es mayor que 5");
} else if num == 5 {
    println!("El número es igual a 5");
} else {
    println!("El número es menor que 5");
}
```

## Operadores lógicos

### and

El operador lógico `and` se usa para comprobar si dos condiciones son verdaderas.

```rust
let num = 10;

if num > 5 && num < 20 {
    println!("El número es mayor que 5 y menor que 20");
}
```

### or

El operador lógico `or` se usa para comprobar si al menos una de dos condiciones es verdadera.

```rust
let num = 10;

if num < 5 || num > 20 {
    println!("El número es menor que 5 o mayor que 20");
}
```

## Bucles

### for

El bucle `for` se usa para iterar sobre una colección de elementos.

```rust
let numbers = [1, 2, 3, 4, 5];

for number in numbers.iter() {
    println!("{}", number);
}
```
