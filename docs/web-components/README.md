# WEB COMPONENTS

"Los Componentes Web son un paquete de diferentes tecnologías que te permiten crear elementos personalizados reutilizables — con su funcionalidad encapsulada apartada del resto del código — y utilizarlos en las aplicaciones web."
[mdn web docs](https://developer.mozilla.org/es/docs/Web/Web_Components)

Los componentes se han hecho famosos gracias a frameworks como React, Angular, Vue y Svelte aunque los components ya existían de antes. Podemos pensar con los web components como legos, como piezas que a medida que se van juntando se construye tú página web. Los web components son una tecnología que nos permite crear componentes reutilizables y encapsular su funcionalidad.

Los web components no están a la última, por lo que si quisiéramos utilizar, por ejemplo, la hidratación parcial, no los podríamos usar, por otro lado, tienen una base sólida y son usados en muchas compañías top, como GitHub, google, amazon, photoshop ... 

## Estandar Web
### `<template>`
El compañero de la template es el slot.
Primero, que es template, básicamente, puede poner HTML allí y el navegador lo analiza y dice, está bien, sé qué elementos son estos, pero no los representa en la página, una especie de elemento fantasma, como un fragment.

Las templates se ven así. Algo básico.
```html
  <template>
    <h1>Titulo</h1>
    <p>Parrafo</p>
   </template> 
``` 

Los slots sirven para pasar contenido a una template. Nosotros podemos tener múltiples slots y para diferenciarlos utilizar los names. 
```html
<template>
    <slot name="header"></slot>
    <h1>Titulo</h1>
    <slot name="footer"></slot>
</template> 
```
Slotchange event. Nos permite saber cuando un slot ha cambiado. 
```html
<template>
    <slot name="header" @slotchange="slotChange"></slot>
    <h1>Titulo</h1>
    <slot name="footer"></slot>
</template> 
```
```js
slotChange(event) {
console.log(event.target.assignedNodes());
}
```
   
### Custom Elements

`<my-element>`
La habilidad de crear tu propio interfaz de HTML. La única diferencia es el `-` en el nombre del elemento. Ya que reservaremos el uso del `_` para los componentes nativos.
    
```html
<my-element theme="dark">
    <p> Parrafo </p>
</my-element>
```

```js
class MyElement extends HTMLElement {
   static get observedAttributes() {
      return ['theme'];
   }

    constructor() {
        super();
    }
}
customElements.define("my-element", MyElement);
```

### Shadow DOM
Podemos pensar en la encapsulación. Es una forma de encapsular el DOM y CSS dentro de un componente. Esto nos permite pensar que nuestros estilos solo se quedan en el componente y no afectan a otros componentes, lo mismo con js, podemos encapsuar js dentro de un Shadow Dom.

Siempre el shadow Dom estara enclado a un elemento del DOM regular.

```html
<my-element>
    <p> Parrafo </p>
    <!-- Start Shadow DOM -->
    <slot></slot>
    <button>Close</button>
    <!-- End Shadow DOM -->
</my-element>
```

```js
class MyElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ 
            mode: 'open' | 'closed' // default: closed
            delegatesFocus: true | false // default: false
        });
    }
}
customElements.define("my-element", MyElement);
```

Los diferentes modos, `open` y closed, nos permiten acceder al shadow dom desde el js. Si es `closed`, no podemos acceder al shadow dom desde el js y nos devolvera null.

Código de ejemplo, extraido de [cybmeta](https://cybmeta.com/que-es-el-shadow-dom)
```html
<blockquote>Esta cita no se ve afectada por los estilos dentro del Shadow DOM.</blockquote>
<div class="shadow-host"></div>
<script>
    const myElement = document.querySelector(".shadow-host");
    const shadow = myElement.attachShadow({mode: 'open'});
    
    const quoteEl = document.createElement('blockquote');
    quoteEl.innerText = 'Haz el amor y no la guerra (John Lennon)';
    shadow.appendChild(quoteEl);
    
    const styles = document.createElement("style");
    styles.textContent = `
        blockquote {
            color: white;
            background: #000;
            padding: 10px;
            display: block;
            font-family: san-serif;
            font-size: 2rem;
        }
    `;
     shadow.appendChild(styles);
 </script>
 ``` 



#### Recursos:
- [cybmeta](https://cybmeta.com/que-es-el-shadow-dom)
- [htmlwithsuperpowers](https://htmlwithsuperpowers.netlify.app/get-started/shadow-dom.html#attaching-a-shadow-root)

### ES Modules
Los HTML imports ya no se usan. 
Los ES Modules para importar y exportar las variables.... lo que sea.

```js
import { MyElement } from './my-element.js';

export class MyElement extends HTMLElement {
   static get observedAttributes() {
      return ['theme'];
   }

    constructor() {
        super();
    }
}
```

#### Type module
El uso de funciones del `import` y `export` de módulos ES es que el uso de `<script type="module">` pone su código en la ruta rápida del navegador para la evaluación de scripts. Esto significa que el navegador puede analizar y ejecutar su código mucho más rápido que si lo hiciera en un script normal.




