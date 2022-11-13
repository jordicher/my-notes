---
lang: es-ES
title: Animaciones y transiciones CSS
description: Introducción a animaciones y transiciones CSS
---

# Animaciones y transiciones CSS

Las animaciones pueden ayudar a cumplir estos dos propósitos:

- Guía y clarificación: Queremos guiar al usuario a hacer cosas, y queremos que sepa qué puede hacerlas y cuál es el resultado.
- Estilo y marca: Al igual que su sitio web, puede una paleta de colores o una fuente personalizada, que se vincule a la marca. Se puede hacer lo mismo con las animaciones y transiciones.

## Fundamentos

**Duración**: Duración de la animación o transición. Tenemos que hacer una diferencia con la duración infinita, en este punto no nos interesa si se ejecuta de forma infinita. Nos intersa el tiempo de la iteración de esa animación. Ejemplo, un spinner, puede estar de forma infinita, pero aqui contamos los segundos que tarda a dar una vuelta.

- **animation-duration**: Duración de la animación.
- **animation-itertion-count**: Número de veces que se ejecuta la animación. Si es infinito, se pone `infinite`.

**Delay**: Es el tiempo que transcurre antes de que comience una animación o una transición. Cuando hace clic en algo que inicie una animación, puede haber un retraso antes de que comience la animación. **El retraso solo sucede una vez! no se repite.**

- **animation-delay**: Tiempo de espera antes de que comience la animación. Si se establece en 0s, la animación comienza inmediatamente. Si se establece en 2s, la animación comienza 2 segundos después de que se cargue la página.

**Timing function/aceleración de la animación**: Cómo se acelera y desacelera con el tiempo. Entonces, si una animación dura un segundo y tiene una aceleración lineal, que mostraremos en un minuto, entonces tendrá la misma velocidad constante de principio a fin. Sin embargo, las animaciones podemos hacer que no sean lineales, con `cubic-bezier(x1,y1,x2,y2)`.

```css
animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
```

Se recomiend que los valores y1 = 0 y y2 = 1. `cubic-bezier(0.5, 0, 0.5, 1)` La razón es porque se vuelve mucho menos confuso averiguar los otros dos números. Porque cuando haces eso, los otros dos números simplemente se convierten en algo que puedes ajustar, y podrías describir la mayoría de las curvas así. Y también porque se parece más al mundo real. Cuando algo comienza a moverse, comenzará a una velocidad de cero.

**Variables**: Las animaciones y transiciones CSS pueden usar variables CSS. Esto significa que podemos usar valores dinámicos en nuestras animaciones y transiciones. Por convención, las variables CSS se nombran en root.

```html
<div class="box"></div>
```

```css
:root {
  --border-size: 2px; /* -- indica que es una variable custom */
  --height-size: 500px;
}

.box {
  width: 100px;
  height: var(--height-size);
  background-color: var(--custom-red);
  border: var(--border-size) solid black;
}
```

También se pueden añadir variables css con js. O asignar un valor a una clase en concreto

```js
const box = document.querySelector(".box");
box.style.setProperty("--custom-red", "red");
box.style.setProperty("--height-size", "100px");
```

<css-variables />

[link al ejemplo](https://codi.link/PGRpdiBjbGFzcz0iYm94Ij4KCjwvZGl2PgoK|OnJvb3R7CiAgLS1ib3JkZXItc2l6ZTogMnB4OwogIC0taGVpZ2h0LXNpemU6IDUwMHB4Owp9CgouYm94IHsKICB3aWR0aDogMzAwcHg7CiAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQtc2l6ZSkgOwogIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWN1c3RvbS1yZWQpIDsKICBib3JkZXI6IHZhcigtLWJvcmRlci1zaXplKSBzb2xpZCBibGFjazsKfQ==|Y29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpOwpib3guc3R5bGUuc2V0UHJvcGVydHkoJy0tY3VzdG9tLXJlZCcsICdyZWQnKTsKYm94LnN0eWxlLnNldFByb3BlcnR5KCctLWhlaWdodC1zaXplJywgJzEwMHB4Jyk7)

## ¿Qué animar?

Al poner animaciones podemos afectar al rendimiento de la página. Por lo que hay que tener cuidado con lo que animamos. Por ejemplo, no animar el tamaño de un elemento, porque eso puede afectar al layout de la página, y suponen un montón de renderizaciones y cambios de posición. Lo que si podemos animar es el color, la opacidad, etc.

Estos afectos de la performance los tiene en cuenta google, por lo que afecta al SEO de tu página

## Transiciones

Las transiciones son animaciones que se ejecutan cuando un estado cambia. Por ejemplo, cuando un elemento cambia de color, o cuando se hace un hover sobre un elemento.

```css
.box {
  background-color: red;
  transition: background-color 1s;
}

.box:hover {
  background-color: blue;
}
```

transition-property: Propiedad que queremos animar. Si no se especifica, se anima todas las propiedades. Si se especifica, se anima solo la propiedad indicada.

En este ejemplo, la animación se ejecuta unicamente en el background-color, y el cambio de la scale, sera instantaneo.

```html
<div class="box"></div>
```

```css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition-property: background-color;
  transition-duration: 1s;
}

.box:hover {
  background-color: blue;
  transform: scale(2);
}
```

[link al ejemplo](https://codi.link/PGRpdiBjbGFzcz0iYm94Ij4KCjwvZGl2PgoK|LmJveCB7CiAgd2lkdGg6IDMwMHB4OwogIGhlaWdodDogMzAwcHg7CiAgYmFja2dyb3VuZC1jb2xvcjogcmVkOyAKICB0cmFuc2l0aW9uLXByb3BlcnR5OiBiYWNrZ3JvdW5kLWNvbG9yOwogICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsKCn0KCi5ib3g6aG92ZXIgewogIGJhY2tncm91bmQtY29sb3I6IGJsdWU7CiAgdHJhbnNmb3JtOiBzY2FsZSgyKTsKfQ==|)

<css-transitions />

También acepta múltiples propiedades separadas por comas, entonces le podemos dar a cada transición una duración diferente.

```css
transition-property: background-color, transform;
transition-duration: 1s, 2s;
```

## Keyframes

Las keyframes son un conjunto de reglas que definen el estado de un elemento en un momento determinado. Por ejemplo, en el 0% el elemento tiene un color rojo, en el 50% el color es azul, y en el 100% el color es verde.

```css
@keyframes my-animation {
  0% {
    background-color: red;
  }
  50% {
    background-color: blue;
  }
  100% {
    background-color: green;
  }
}
```

Se tienen que hacer las animaciones lo más naturales posibles, por ejemplo, en el caso de la posición seguramente sea buena idea que vuelva a su posición inicial. También no solo podemos utilizar valores de tanto por ciento, sino también `from` y `to`.

```html
<div class="circle"></div>
```

```css
.circle {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  animation-name: move-like-a-square, red-to-blue;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes move-like-a-square {
  from,
  to {
    /* 0%, 100% */
    transform: translate(0, 0);
  }

  25% {
    transform: translate(50px, 0);
  }

  50% {
    transform: translate(50px, 50px);
  }

  75% {
    transform: translate(0, 50px);
  }
}

@keyframes red-to-blue {
  from {
    background-color: red;
    /* we can NOT add a tranform, conlfict with the other animation */
  }

  to {
    background-color: blue;
  }
}
```

[link al ejemplo](https://codi.link/PGRpdiBjbGFzcz0iY2lyY2xlIj4KPC9kaXY+|LmNpcmNsZSB7CiAgICB3aWR0aDogNTBweDsKICAgIGhlaWdodDogNTBweDsKICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICAgIGFuaW1hdGlvbi1uYW1lOiBtb3ZlLWxpa2UtYS1zcXVhcmUsIHJlZC10by1ibHVlOwogICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyczsKICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlOwp9CgpAa2V5ZnJhbWVzIG1vdmUtbGlrZS1hLXNxdWFyZSB7CgogICAgZnJvbSwKICAgIHRvIHsgLyogMCUsIDEwMCUgKi8gICAgICAgIAogICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApOwogICAgfQoKICAgIDI1JSB7CiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNTBweCwgMCk7CiAgICB9CgogICAgNTAlIHsKICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSg1MHB4LCA1MHB4KTsKICAgIH0KCiAgICA3NSUgewogICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwcHgpOwogICAgfQp9CgpAa2V5ZnJhbWVzIHJlZC10by1ibHVlIHsKICAgIGZyb20gewogICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICAgIH0KCiAgICB0byB7CiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTsKICAgIH0KfQ==|)
<css-keyframes />

## Choreography

Siempre hemos tratado a las animaciones de manera individual, pero podemos hacer que se ejecuten en un orden determinado.
Asi que coreography es para coordinar diferentes animaciones entre si, para convertirla en una sola animación.

Se puede hacer de manera simple, con la propiedad `animation-delay` que nos permite dar un retraso a la animación.

```html
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
```

```css
.circle {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  animation: red-to-blue 0.5s both;
}

.circle:nth-child(2) {
  animation-delay: 1s;
}

.circle:nth-child(3) {
  animation-delay: 2s;
}

@keyframes red-to-blue {
  from {
    background-color: red;
  }

  to {
    background-color: blue;
  }
}
```

[Link al ejemplo](https://codi.link/PGRpdiBjbGFzcz0iY2lyY2xlIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIj48L2Rpdj4KPGJ1dHRvbj4gUmVzdGFydCBhbmltYXRpb24gPC9idXR0b24+|LmNpcmNsZSB7CiAgd2lkdGg6IDUwcHg7CiAgaGVpZ2h0OiA1MHB4OwogIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICBib3JkZXItcmFkaXVzOiA1MCU7CiAgYW5pbWF0aW9uOiByZWQtdG8tYmx1ZSAwLjVzIGJvdGg7Cn0KCi5jaXJjbGU6bnRoLWNoaWxkKDIpIHsKICBhbmltYXRpb24tZGVsYXk6IDFzOwp9CgouY2lyY2xlOm50aC1jaGlsZCgzKSB7CiAgYW5pbWF0aW9uLWRlbGF5OiAyczsKfQoKQGtleWZyYW1lcyByZWQtdG8tYmx1ZSB7CiAgZnJvbSB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7CiAgfQoKICB0byB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlOwogIH0KfQo=|Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7CmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsKICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2lyY2xlJykuZm9yRWFjaCgoY2lyY2xlKSA9PiB7ICAgIAoKICAgIGNpcmNsZS5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7CiAgICAgY2lyY2xlLm9mZnNldFdpZHRoOyAgIAogICAgIGNpcmNsZS5zdHlsZS5hbmltYXRpb24gPSBudWxsOwogIAogIH0pOwp9KTs=)

<css-simple-choreography />

### Complex Choreography

Para poder de manera más escalable, se pueden utilizar variables CSS para poder controlar el orden de las animaciones.
Y utilizar stagger animations, para evitar sobrepongan las animaciones, de igual manera, añadir una variable a cada elemento para poder controlar el orden de las animaciones.

```html
<div class="circle" style="--i: 0"></div>
<div class="circle" style="--i: 1"></div>
<div class="circle" style="--i: 2"></div>
```

```css
.circle {
  --duration: 1s;
  --stagger: 0.5s;
  --interval: calc(var(--duration) - var(--stagger));

  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  animation: red-to-blue var(--duration) calc(var(--interval) * var(--i)) both; /* calc(var(--interval) * var(--i)) it's the delay */
}

@keyframes red-to-blue {
  from {
    background-color: red;
  }

  to {
    background-color: blue;
  }
}
```

[link al ejemplo](https://codi.link/PGRpdiBjbGFzcz0iY2lyY2xlIiBzdHlsZT0iLS1pOiAwIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIiBzdHlsZT0iLS1pOiAxIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIiBzdHlsZT0iLS1pOiAyIj48L2Rpdj4=|LmNpcmNsZSB7CiAgLS1kdXJhdGlvbjogMXM7CiAgLS1zdGFnZ2VyOiAwLjVzOwogIC0taW50ZXJ2YWw6IGNhbGModmFyKC0tZHVyYXRpb24pIC0gdmFyKC0tc3RhZ2dlcikpOwoKICB3aWR0aDogNTBweDsKICBoZWlnaHQ6IDUwcHg7CiAgYmFja2dyb3VuZC1jb2xvcjogcmVkOwogIGJvcmRlci1yYWRpdXM6IDUwJTsKICBhbmltYXRpb246IHJlZC10by1ibHVlIHZhcigtLWR1cmF0aW9uKSBjYWxjKHZhcigtLWludGVydmFsKSAqIHZhcigtLWkpKSBib3RoOwp9CgpAa2V5ZnJhbWVzIHJlZC10by1ibHVlIHsKICBmcm9tIHsKICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICB9CgogIHRvIHsKICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7CiAgfQp9|)

<css-complex-choreography />
