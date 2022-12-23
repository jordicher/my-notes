---
lang: "es-ES"
title: "JavaScript Performance"
description: "JavaScript Performance"
---

# JavaScript Performance

## Introducción

Los usuarios quieren que las aplicaciones web sean rápidas y que reaccionan de forma inmediata. Los usuarios esperan que las aplicaciones web se carguen en menos de 1
segundo, y que las animaciones se ejecuten en menos de 100 ms. Y si ya llegamos a los 10 segundos los usuarios abandonarán la aplicación web y buscarán una alternativa.

Hay muchas estadísticas que demuestran que las aplicaciones web lentas tienen un impacto negativo en la experiencia del usuario y en los ingresos de las empresas.

Esto se aplica a la mayoria de las plataformas, como curiosidad, la carga lenta se la permitimos a Gmail o plataformas que una vez dentro tenemos que estar bastante rato, y una vez cargadas son bastante rápidas.
Por el contrario, las webs como las de los periódicos tienen que ser extra rápidas, ya que cuando el usuario las consulta es para leer un par de titulares y salir.

### RAIL

RAIL es un modelo de referencia para medir la calidad de la experiencia del usuario en las aplicaciones web. RAIL es una abreviatura de las siguientes palabras: Response, Animation, Idle, Load.

#### Response

El usuario espera que la aplicación web responda de forma inmediata a sus acciones. En menos de 100 ms, la aplicación web debe responder a la interacción del usuario.

#### Animation

El usuario espera que las animaciones sean fluidas y suaves. En menos de 16 ms, la aplicación web debe ejecutar una animación.

#### Idle

El usuario espera que la aplicación web no se bloquee. La aplicación web debe ejecutar tareas de fondo y tareas de mantenimiento cuando el usuario no está interactuando con ella.

#### Load

El usuario espera que la aplicación web se cargue rápidamente. En menos de 1 segundo, la aplicación web debe mostrar el contenido principal.

### Percepción del usuario

"[Percepción del usuario de los retrasos en el rendimiento](https://web.dev/rail/)

**0 a 16 ms** Los usuarios son excepcionalmente buenos para rastrear el movimiento y no les gusta cuando las animaciones no son fluidas. Perciben que las animaciones son fluidas siempre que se rendericen 60 nuevos fotogramas por segundo. Eso es 16 ms por cada cuadro, incluido el tiempo que tarda el navegador en pintar el nuevo cuadro en la pantalla, dejando una aplicación de unos 10 ms para producir un cuadro.

**0 a 100 ms** Responde a las acciones del usuario dentro de esta ventana de tiempo y los usuarios sentirán que el resultado es inmediato. Un poco más y la conexión entre acción y reacción se rompe.

**100 hasta 1000 ms** Dentro de esta ventana, las cosas se sienten parte de una progresión natural y continua de tareas. Para la mayoría de los usuarios de la web, cargar páginas o cambiar de vista representa una tarea.

**1000 ms o más** Más allá de 1000 milisegundos (1 segundo), los usuarios pierden el enfoque en la tarea que están realizando.

**10000 ms o más** Más allá de los 10000 milisegundos (10 segundos), los usuarios se sienten frustrados y es probable que abandonen las tareas. Puede que vuelvan o no más tarde."

### Que optimizamos?

No tenemos que empezar a mejorar el performance de toda nuestra web como locos, intentando rascar ms. Lo que si que tenemos que hacer es tener en cuenta el performance en las partes que más importan al usuario.

Por ejemplo.

- Los diarios tienen que ser muy rápidos al mostrar los titulares.
- Twitter, Facebook... les interesa antes que nada mostrarte el primer tweet....

Así mismo, habra ciertas secciones de nuestra web, que no son tan importantes, por lo que podemos permitirnos que tarde un poco más en cargar.
Por ejemplo, podemos tener miles de peticiones a nuestra homepage, pero nadie va a vistiar los terminos y condiciones.

### Como medimos el performance?

No podemos analizar la performance siempre con el mismo dispositivo o con el último mobil/ordenador que ha salido al mercado.
Lo mismo con el internet, no podemos medir la performance con una conexión de 1 Gb/s, ya que no es lo que la mayoría de los usuarios tienen.

## JavaScript Performance

Podemos pagar para tener el servidor más rapido... pero si nuestra aplicación es client side, y el usuario tiene un móvil de hace 5 años, no vamos a poder hacer nada... No vamos a comprarle un móvil nuevo a cada usuario😅.

Cada vez enviamos más javascript al navegador, y cada vez es más complejo. Esto hace que el navegador tarde más en procesar el javascript. Asi como frameworks como React, que solo por el hecho de usarlo ya estas usando un montón de javascript.

Javascript es un lenguaje interpretado, pero en la práctica, los navegadores utilizan compiladores just-in-time (JIT) para convertir el código JavaScript en código máquina que pueda ejecutar la CPU. El JIT compilador analiza el código JavaScript y lo compila en código máquina en tiempo de ejecución. Esto sucede en la maquina del cliente, por lo que ellos estan pagando el coste y haciendo este trabajo por nosotros.

### Engine V8 de JavaScript

Cada navegador tiene su propio motor, por ejemplo Chrome tiene V8, Firefox tiene SpiderMonkey, Safari tiene Nitro, etc.

Si nos centramos en V8. El ciclo de javascript en V8 es el siguiente:

1. Subimos nuestro codigo a la nube.
2. El navegador descarga el codigo.
3. Parsing. Se convierte en un arbol de sintaxis abstracta (AST), que es una estructura de datos real que representa el código.
4. Interprete. El AST se compila en código máquina. Convierte el código JavaScript en bytes.
   4.1 Compilador de optimización, si detecta que hay codigo que se puede optimizar, lo pasa por aqui. Y lo devuelve como código máquina optimizado.
5. El código máquina se ejecuta en la CPU.

![Steps of v8](./assets/stepsv8.jpg)

Recursos para profundizar sobre el tema:

- [soymichel](https://soymichel.medium.com/entendiendo-el-engine-v8-de-javascript-7e3d11443df8)
- [khattakdev](https://dev.to/khattakdev/chrome-v8-engine-working-1lgi)

#### Parsing

Convertimos el codigo en un AST, que es una estructura de datos real que representa el código. En si, es un árbol de objetos. Cada nodo del árbol representa una parte del código.

Ejemplo de un AST: [AST Explorer](https://astexplorer.net/)

```js
let tips = ["learn languages"];

function printTips() {
  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip));
}
```

![AST](./assets/ast.jpg)

Este parsing es muy costoso y es lento. Podemos llegar a 1mb/s en mobiles.

Una forma de reducir el tiempo de parseo... es tener menos código... hacer el análisis que necesitamos a primera instancia, y luego ir añadiendo cosas. Si se puede hacer más tarde, hazlo más tarde.

Entonces en el motor v8, hay dos maneras de hacer el parsing:

- Eager Parsing: Se hace en el momento que se descarga el código. Es muy costoso, pero es necesario para que el código se ejecute.

- Lazy Parsing: Se hace cuando se necesita. Es más barato, pero no se puede ejecutar hasta que se haya parseado.

Y nosotros **no tenemos control sobre esto**... es algo que elige chrome por nosotros.

En si podemos pensar que la mejor opción es Lazy Parsing... que lo hace gracias a la simplificación del código, es decir, si ve codigo que se va a ejecutar, lo parsea, pero si ve una clase, una llamada fetch... no lo parsea hasta que se necesite.

Ejemplo extraido de [stevekinney](https://speakerdeck.com/stevekinney/web-performance?slide=87)

```js
// This will be eagerly parsed
const a = 1;
const b = 2;

// This will be lazily parsed, because it's not needed to run the code
function add(a, b) {
  return a + b;
}

// Go back and parse add()
add(a, b);
```

Ahora bien caemos en un problema... que es mejor, parsear todo el código una vez, o estar analizando que es lo que se necesita, para después parsearlo?

#### Compilador de optimización

Este compilador en principio.

- Optimización especulativa
  - Usamos un interprete porque el optimizador del código es lento de empezar Y el interprete es rápido. Pero no sabe nada sobre nuestro código, por lo que no es tan rápido como lo es Turbofan
  - No sabe que una función add, siempre va a recibir numeros, por lo que no puede optimizarla, por lo que el interprete se encarga de obtener feedback de como se esta usando la función.
- Clases ocultas para búsquedas dinámicas
- Incorporación de funciones

Javascript es díficil, dinámico y tiene muchas reglas, como por ejemplo, sumar strings es diferente a sumar numeros. Y el compilador de optimización en la mayoria de ocasiones no sabe que va a sumar, hasta que no se ejecuta esa parte del código.

El compilador de optimización, se encarga de analizar el código y ver que partes se pueden optimizar, y que partes no. Por ejemplo, si tenemos una función que siempre recibe numeros, intentara optimizarla.
Ahora bien, si detecta que la función no tiene un comportamiento predecible, no la optimizará. Por ejemplo, si el mismo argumento de una función recibe numeros, strings, undefinded, arrays...

### Optimización en node

Node nos permite encontrar código que no esta optimizado.

```bash
node --trace-opt index.js | grep myFunc
```

Recursos para profundizar sobre el tema:

- [Eugene Obrezkov](https://blog.ghaiklor.com/2016/05/16/tracing-de-optimizations-in-nodejs/)
