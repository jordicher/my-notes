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

**Timing function/aceleración de la animación**: Cómo se acelera y desacelera con el tiempo. Entonces, si una animación dura un segundo y tiene una aceleración lineal, que mostraremos en un minuto, entonces tendrá la misma velocidad constante de principio a fin. Sin embargo, las animaciones podemos hacer que no sean lineales, con `cubic-bezier()`.
```css
animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
```
"Una curva Cubic Bezier está definida por cuatro puntos P0, P1, P2 y P3. P0 y P3 son el inicio y el final de la curva y, en CSS, estos puntos son fijos ya que las coordenadas son proporciones. P0 es (0, 0) y representa el tiempo inicial y el estado inicial, P3 es (1, 1) y representa el tiempo final y el estado final."[w3schools.com](https://www.w3schools.com/cssref/func_cubic-bezier.asp)

