# WEB COMPONENTS

"Los Componentes Web son un paquete de diferentes tecnologías que te permiten crear elementos personalizados reutilizables — con su funcionalidad encapsulada apartada del resto del código — y utilizarlos en las aplicaciones web."
[mdn web docs](https://developer.mozilla.org/es/docs/Web/Web_Components)

Los componentes se han hecho famosos gracias a frameworks como React, Angular, Vue y Svelte aunque los components ya existían de antes. Podemos pensar con los web components como legos, como piezas que a medida que se van juntando se construye tú página web. Los web components son una tecnología que nos permite crear componentes reutilizables y encapsular su funcionalidad.

Los web components no están a la última, por lo que si quisiéramos utilizar, por ejemplo, la hidratación parcial, no los podríamos usar, por otro lado, tienen una base sólida y son usados en muchas compañías top, como GitHub, google, amazon, photoshop ... 

#### En resumen
Los componentes web son pequeños paquetes de HTML, CSS y JavaScript. Los componentes web son un conjunto de estándares web. Está la plantilla de cuatro estándares web, `template`, Custom Elements, Shadow DOM e ES modules.

Como resultado, los Componentes Web:
- tienen una gran reutilización
- son faciles como html
- proveen mejores experiencias
- han mejorado progresivamente
- sin herramientas de construcción
- encapsulado

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

## Como usarlo
```html
<my-element theme="dark">
    <p> Parrafo </p>
</my-element>

<script src="../my-element.js" type="module"></script>
```

## DOM - CSS

### Light DOM & Shadow DOM
Si recordamos en el apartado de Shadow DOM, el shadow dom es un DOM encapsulado dentro de un elemento del DOM regular. 
Si queremos modificar los estilos de un Componente Web, unicamente podremos modificar los estilos de su Light Dom, y no del Shadow Dom.

Ejemplo, [link al ejemplo](https://codi.link/PG15LWVsZW1lbnQ+CiAgICA8cD5QYXJhZ3JhcGggTGlnaHQgRE9NPC9wPgo8L215LWVsZW1lbnQ+Cg==|cCB7CiAgY29sb3I6IHJlZDsKfQo=|Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ZW1wbGF0ZSIpOwp0ZW1wbGF0ZS5pbm5lckhUTUwgPSBgCjxzbG90Pjwvc2xvdD4KPHA+UGFyYWdyYXBoIFNoYWRvdyBET008L3A+CmA7CgpjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7CiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogIm9wZW4iIH0pOwogICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7CiAgfQp9CgpjdXN0b21FbGVtZW50cy5kZWZpbmUoIm15LWVsZW1lbnQiLCBNeUVsZW1lbnQpOw==)
```html
<my-element>
    <p>Paragraph Light DOM</p>
    <!-- Start Shadow DOM -->
    <slot></slot>
    <p>Paragraph Shadow DOM</p>
    <!-- End Shadow DOM -->
</my-element>
```

```js
const template = document.createElement("template");
template.innerHTML = `
<slot></slot>
<p>Paragraph Shadow DOM</p>
`;

class MyElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("my-element", MyElement);
```

```css
p {
  color: red;
}
```

El resultado final es que solo se pondrá rojo `<p>Paragraph Light DOM</p>`. Da igual lo selectivos que seamos con los selectores css, id, class, etc. No se podrá modificar el `<p>Paragraph Shadow DOM</p>`.
