# Introducción

Es un lenguaje de programación compilado, de sistema, multi-paradigma y de tipado estático. Además, es un lenguaje de programación concurrente, seguro, rápido y de bajo nivel.

Que sea de sistema significa que tiene un control más fino sobre el hardware, y que es multi-paradigma significa que soporta programación orientada a objetos, programación funcional y programación imperativa.

La programación concurrente es la ejecución de múltiples tareas al mismo tiempo, de bajo nivel significa que el lenguaje es más cercano al hardware, y el tipado estático significa que el compilador comprueba los tipos de datos en tiempo de compilación.

Rust es capaz de aprovechar los conceptos de alto nivel, como la iteración y las interfaces, y los conceptos de bajo nivel, como el control de memoria y la concurrencia, por lo que un alternativo de rust seria C++.

El creador de Rust es mozilla, y fue creado en el 2006. Rust es un lenguaje de programación de código abierto, y es mantenido por la fundación Mozilla y la comunidad.

## ¿Qué se puede hacer con Rust?

Está pensado para hacer drivers de hardware, sistemas operativos, navegadores, etc. Eso no quiere decir que no se pueda utilizar para otros fines.

- Comandos de línea.

- Herramientas para el desarrollo web. Por ejemplo, [nextjs, ha mejorado la velocidad de sus compilaciones gracias a swc, que es un compilador de javascript escrito en rust.](https://nextjs.org/blog/next-12#faster-builds-and-fast-refresh-with-rust-compiler)

- Networking. Hacer servicios web.

- Embebido. Para dispositivos de bajos recursos, como la Raspberry Pi.

## ¿Por qué Rust?

- "Rust es el futuro de la infraestructura de javascript" [Lee Robinson](https://leerob.io/blog/rust)

- Es el lenguaje más amado por los desarrolladores. [Stack Overflow Developer Survey 2021](https://insights.stackoverflow.com/survey/2021#technology-most-loved-dreaded-and-wanted)

- Tiene una gran comunidad. [Rust Community](https://www.rust-lang.org/community).

- Herramientas que nos facilitaran el trabajo, al momento de compilar, probar, documentar y compartir código. Un ejemplo seria Cargo, un gestor de dependencias y el encargado de la compilación. [Cargo](https://doc.rust-lang.org/cargo/).

- No está pensado para un sistema operativo en concreto, sino que es multiplataforma. Por lo que podríamos ver partes del kernel de linux escritas en rust...

## Typescript vs Rust

- Typescript es un lenguaje de programación de alto nivel, que compila a javascript. Rust es un lenguaje de programación de bajo nivel, que compila a código nativo.
- Especificando solo lectura versus mutación. En typescript, se debe especificar si una variable es solo lectura con `readonly`, pero podriamos llegar a mutarla, ejemplo, pasando la variable a una función que la muta. En rust, se debe especificar si una variable es mutable.
- Undefined/null vs Option. En typescript, se puede tener un valor `undefined` o `null`, en rust, se utiliza `Option`.
- Los errores en tiempo de ejecución, en muchas ocasiones tenemos errores en typescript que no se detectan hasta que se ejecuta el código. En rust, el compilador nos avisará de los errores en tiempo de compilación.

### Referencias

El contenido de esta sección se ha extraído de los siguientes recursos gratuitos:

- [Aprende Rust 🦀 desde cero, el lenguaje de programación de moda 🚀, Miguel Ángel Durán](https://www.youtube.com/watch?v=WMeM7-JswKQ)

- [Web oficial de Rust](https://www.rust-lang.org/)
