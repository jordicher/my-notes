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

#### Como modificar los estilos del Shadow DOM

No es para modificarlos de manera directa, pero hay estilos que son heredables por un iframe, y Shadow Dom se comporta como un iframe, en materia de la encapsulación. Por lo que puede heredar estilos como el `color` o el `font-family`. [Link al ejemplo](https://codi.link/PG15LWVsZW1lbnQ+CiAgICA8cD5QYXJhZ3JhcGggTGlnaHQgRE9NPC9wPgo8L215LWVsZW1lbnQ+Cg==|bXktZWxlbWVudCB7CiAgY29sb3I6IHJlZDsKICBmb250LWZhbWlseTogJ2NvdXJpZXInOwogIGZvbnQtd2VpZ2h0OiBib2xkZXI7Cn0KCm15LWVsZW1lbnQgcCB7CiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTsKfQo=|Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ZW1wbGF0ZSIpOwp0ZW1wbGF0ZS5pbm5lckhUTUwgPSBgCjxzbG90Pjwvc2xvdD4KPHA+UGFyYWdyYXBoIFNoYWRvdyBET008L3A+CmA7CgpjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7CiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogIm9wZW4iIH0pOwogICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7CiAgfQp9CgpjdXN0b21FbGVtZW50cy5kZWZpbmUoIm15LWVsZW1lbnQiLCBNeUVsZW1lbnQpOw==)

#### Recursos:
- [htmlwithsuperpowers](https://htmlwithsuperpowers.netlify.app/styling/inheritable.html)

##### CSS Custom Properties

También son un tipo de estilos heredables. [Link al ejemplo](https://codi.link/PG15LWVsZW1lbnQ+CiAgICA8cD5QYXJhZ3JhcGggTGlnaHQgRE9NPC9wPgo8L215LWVsZW1lbnQ+|Ym9keSB7CiAgLS1iZzogcmVkOwogIC0tdGV4dDogYmx1ZTsKfQ==|Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ZW1wbGF0ZSIpOwp0ZW1wbGF0ZS5pbm5lckhUTUwgPSBgCjxzdHlsZT4KICAgIHAgewogICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnKTsgLyogcmVkICovCiAgICAgICAgY29sb3I6IHZhcigtLXRleHQpOyAvKiBibHVlICovCiAgICB9Cjwvc3R5bGU+CjxwPlBhcmFncmFwaCBTaGFkb3cgRE9NPC9wPgo8c2xvdD48L3Nsb3Q+CmA7CgpjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7CiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogIm9wZW4iIH0pOwogICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7CiAgfQp9CgpjdXN0b21FbGVtZW50cy5kZWZpbmUoIm15LWVsZW1lbnQiLCBNeUVsZW1lbnQpOw==)

```html
<my-element>
    <p>Paragraph Light DOM</p>
</my-element>
```

```css
body {
  --bg: red;
  --text: blue;
}
```

```js
const template = document.createElement("template");
template.innerHTML = `
<style>
    p {
        background-color: var(--bg); /* red */
        color: var(--text); /* blue */
    }
</style>
<p>Paragraph Shadow DOM</p> /* background-color === red, color === blue */
<slot></slot>
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

##### Themes

Podemos crear un web Component que reciba atributos, un ejemplo de atributo, por buenas practicas lo han decidido llamarlo theme. Hay librerias que simplifican la creación de temas. Sin hacer uso de ellas, un ejemplo podria ser el siguiente.

[Link al ejemplo](https://codi.link/PG15LWVsZW1lbnQgdGhlbWU9ImRhcmsiPgogICAgPHA+UGFyYWdyYXBoIExpZ2h0IERPTTwvcD4KPC9teS1lbGVtZW50Pg==||Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ZW1wbGF0ZSIpOwogIHRlbXBsYXRlLmlubmVySFRNTCA9IGAKICA8c3R5bGU+PC9zdHlsZT4KICA8cD4gUGFyYWdyYXBoIFNoYWRvdyBEb20gPC9wPgogIDxzbG90Pjwvc2xvdD4KICBgOwoKICBjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7CiAgICAgIGNvbnN0cnVjdG9yKCkgewogICAgICAgICAgICBzdXBlcigpOwogICAgICAgICAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAib3BlbiIgfSk7CiAgICAgICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpOwogICAgICAgIH0KCiAgICAgICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7CiAgICAgICAgICAgIHJldHVybiBbInRoZW1lIl07CiAgICAgICAgfQoKICAgICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7CiAgICAgICAgICAgIGlmIChuYW1lID09PSAidGhlbWUiKSB7CiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09ICJkYXJrIikgewogICAgICAgICAgICAgICAgICAgIHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcigic3R5bGUiKS5pbm5lckhUTUwgPSBgCiAgICAgICAgICAgICAgICAgICAgOmhvc3QgeyAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYmx1ZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgIDpob3N0IHAgewogICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYDsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCJzdHlsZSIpLmlubmVySFRNTCA9IGAKICAgICAgICAgICAgICAgICAgICA6aG9zdCB7CiAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBncmVlbjsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgYDsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KCiAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoIm15LWVsZW1lbnQiLCBNeUVsZW1lbnQpOw==)
```js
const template = document.createElement('template');
template.innerHTML = `
  <style></style>
  <p> Paragraph Shadow Dom </p>
  <slot></slot>
  `;

class MyElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['theme'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'theme') {
      if (newValue === 'dark') {
        this._shadowRoot.querySelector('style').innerHTML = `
                    :host {                        
                        color: blue;
                    }
                     :host p {
                        background-color: red;                       
                    }
                    `;
      } else {
        this._shadowRoot.querySelector('style').innerHTML = `
                    :host {                 
                        color: green;
                    }
                    `;
      }
    }
  }
}

customElements.define('my-element', MyElement);

```

```html
<my-element theme="dark">
    <p>Paragraph Light DOM</p>
</my-element>

<my-element>
    <p>Paragraph Light DOM</p>
</my-element>
```

Se podria seguir añadiendo atributos de manera customizada por ejemplo, por decidir que icono se muestra en el componente, o que color tiene el componente, etc.

#### Nuevas features del DOM CSS

##### `:host`

El selector `:host` permite seleccionar el elemento host del shadow DOM. Esto es util para poder aplicar estilos al elemento host, solo funciona en el Shadow DOM. [Link al ejemplo](https://codi.link/PG15LWVsZW1lbnQ+ICAKICAgIDxwPlBhcmFncmFwaCBMaWdodCBET008L3A+CjwvbXktZWxlbWVudD4=|Omhvc3QgewogIGNvbG9yOiByZWQ7Cn0=|Y29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJ0ZW1wbGF0ZSIpOwp0ZW1wbGF0ZS5pbm5lckhUTUwgPSBgCjxzdHlsZT4KOmhvc3QgcCB7CiAgYmFja2dyb3VuZDogb3JhbmdlOwp9Cjwvc3R5bGU+CjxzbG90Pjwvc2xvdD4KPHA+UGFyYWdyYXBoIFNoYWRvdyBET008L3A+CmA7CgpjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7CiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogIm9wZW4iIH0pOwogICAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7CiAgfQp9CgpjdXN0b21FbGVtZW50cy5kZWZpbmUoIm15LWVsZW1lbnQiLCBNeUVsZW1lbnQpOwo=)
Esta soportado en todos los [navegadores relevantes](https://caniuse.com/?search=%3Ahost)

```html
<my-element>  
    <p>Paragraph Light DOM</p>
</my-element>
```

```css
:host { /* esto no hace nada */
  color: red;
}
```

```js
const template = document.createElement("template");
template.innerHTML = `
<style>
:host p {
  background: orange;
}
</style>
<slot></slot>
<p>Paragraph Shadow DOM</p>
`;

class MyElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("my-element", MyElement);
```

##### `:host-context()`

