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

**Delay**: Es el tiempo que transcurre antes de que comience una animación o una transición. Cuando hace clic en algo que inicie una animación, puede haber un retraso antes de que comience la animación. **El retraso solo sucede una vez! no se repite.**

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
const box = document.querySelector('.box');
box.style.setProperty('--custom-red', 'red');
box.style.setProperty('--height-size', '100px');
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
