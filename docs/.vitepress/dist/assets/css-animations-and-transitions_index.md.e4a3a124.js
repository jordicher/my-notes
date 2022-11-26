import {
  _ as o,
  o as i,
  a as p,
  c as e,
  F as C,
  p as D,
  b as y,
  d as a,
  e as t,
  f as c,
  r,
} from "./app.1fad655d.js";
const F = (s) => (D("data-v-71b63bff"), (s = s()), y(), s),
  h = F(() =>
    a(
      "section",
      null,
      [
        a("div", { class: "reset-complex-circle", style: { "--i": "0" } }),
        a("div", { class: "reset-complex-circle", style: { "--i": "1" } }),
        a("div", { class: "reset-complex-circle", style: { "--i": "2" } }),
      ],
      -1
    )
  ),
  _ = F(() =>
    a(
      "section",
      null,
      [a("button", { id: "resetComplexCircle" }, "Reset animation")],
      -1
    )
  ),
  v = {
    __name: "CssComplexChoreography",
    setup(s) {
      return (
        i(() => {
          document
            .querySelector("#resetComplexCircle")
            .addEventListener("click", () => {
              document
                .querySelectorAll(".reset-complex-circle")
                .forEach((n) => {
                  (n.style.animation = "none"),
                    n.offsetWidth,
                    (n.style.animation = null);
                });
            });
        }),
        (l, n) => (p(), e(C, null, [h, _], 64))
      );
    },
  },
  B = o(v, [["__scopeId", "data-v-71b63bff"]]);
const I = {},
  f = (s) => (D("data-v-08a6250e"), (s = s()), y(), s),
  k = f(() => a("div", { class: "circle" }, null, -1)),
  S = [k];
function q(s, l) {
  return p(), e("section", null, S);
}
const x = o(I, [
  ["render", q],
  ["__scopeId", "data-v-08a6250e"],
]);
const Y = {},
  G = (s) => (D("data-v-baade949"), (s = s()), y(), s),
  Z = G(() =>
    a("div", { class: "box" }, [a("div", { class: "action" }, "hover")], -1)
  ),
  E = [Z];
function j(s, l) {
  return p(), e("section", null, E);
}
const W = o(Y, [
  ["render", j],
  ["__scopeId", "data-v-baade949"],
]);
const A = (s) => (D("data-v-9d0b2e89"), (s = s()), y(), s),
  z = A(() =>
    a(
      "section",
      null,
      [
        a("div", { class: "reset-circle" }),
        a("div", { class: "reset-circle" }),
        a("div", { class: "reset-circle" }),
      ],
      -1
    )
  ),
  K = A(() =>
    a(
      "section",
      null,
      [a("button", { id: "resetCircle" }, "Reset animation")],
      -1
    )
  ),
  R = {
    __name: "CssSimpleChoreography",
    setup(s) {
      return (
        i(() => {
          document
            .querySelector("#resetCircle")
            .addEventListener("click", () => {
              document.querySelectorAll(".reset-circle").forEach((n) => {
                (n.style.animation = "none"),
                  n.offsetWidth,
                  (n.style.animation = null);
              });
            });
        }),
        (l, n) => (p(), e(C, null, [z, K], 64))
      );
    },
  },
  T = o(R, [["__scopeId", "data-v-9d0b2e89"]]);
const H = (s) => (D("data-v-35710de3"), (s = s()), y(), s),
  V = H(() => a("div", { class: "box" }, null, -1)),
  w = [V],
  J = {
    __name: "CssVariables",
    setup(s) {
      return (
        i(() => {
          const l = document.querySelector(".box");
          l.style.setProperty("--custom-red", "red"),
            l.style.setProperty("--height-size", "100px");
        }),
        (l, n) => (p(), e("section", null, w))
      );
    },
  },
  L = o(J, [["__scopeId", "data-v-35710de3"]]),
  N = {
    components: {
      CssComplexChoreography: B,
      CssKeyframes: x,
      CssTransitions: W,
      CssSimpleChoreography: T,
      CssVariables: L,
    },
  },
  os = JSON.parse(
    '{"title":"Animaciones y transiciones CSS","description":"Introducci\xF3n a animaciones y transiciones CSS","frontmatter":{"lang":"es-ES","title":"Animaciones y transiciones CSS","description":"Introducci\xF3n a animaciones y transiciones CSS"},"headers":[{"level":2,"title":"Fundamentos","slug":"fundamentos","link":"#fundamentos","children":[]},{"level":2,"title":"\xBFQu\xE9 animar?","slug":"\xBFque-animar","link":"#\xBFque-animar","children":[]},{"level":2,"title":"Transiciones","slug":"transiciones","link":"#transiciones","children":[]},{"level":2,"title":"Keyframes","slug":"keyframes","link":"#keyframes","children":[]},{"level":2,"title":"Choreography","slug":"choreography","link":"#choreography","children":[{"level":3,"title":"Complex Choreography","slug":"complex-choreography","link":"#complex-choreography","children":[]}]},{"level":2,"title":"Estados","slug":"estados","link":"#estados","children":[]}],"relativePath":"css-animations-and-transitions/index.md"}'
  ),
  O = c(
    `<h1 id="animaciones-y-transiciones-css" tabindex="-1">Animaciones y transiciones CSS <a class="header-anchor" href="#animaciones-y-transiciones-css" aria-hidden="true">#</a></h1><p>Las animaciones pueden ayudar a cumplir estos dos prop\xF3sitos:</p><ul><li>Gu\xEDa y clarificaci\xF3n: Queremos guiar al usuario a hacer cosas, y queremos que sepa qu\xE9 puede hacerlas y cu\xE1l es el resultado.</li><li>Estilo y marca: Al igual que su sitio web, puede una paleta de colores o una fuente personalizada, que se vincule a la marca. Se puede hacer lo mismo con las animaciones y transiciones.</li></ul><h2 id="fundamentos" tabindex="-1">Fundamentos <a class="header-anchor" href="#fundamentos" aria-hidden="true">#</a></h2><p><strong>Duraci\xF3n</strong>: Duraci\xF3n de la animaci\xF3n o transici\xF3n. Tenemos que hacer una diferencia con la duraci\xF3n infinita, en este punto no nos interesa si se ejecuta de forma infinita. Nos intersa el tiempo de la iteraci\xF3n de esa animaci\xF3n. Ejemplo, un spinner, puede estar de forma infinita, pero aqui contamos los segundos que tarda a dar una vuelta.</p><ul><li><strong>animation-duration</strong>: Duraci\xF3n de la animaci\xF3n.</li><li><strong>animation-itertion-count</strong>: N\xFAmero de veces que se ejecuta la animaci\xF3n. Si es infinito, se pone <code>infinite</code>.</li></ul><p><strong>Delay</strong>: Es el tiempo que transcurre antes de que comience una animaci\xF3n o una transici\xF3n. Cuando hace clic en algo que inicie una animaci\xF3n, puede haber un retraso antes de que comience la animaci\xF3n. <strong>El retraso solo sucede una vez! no se repite.</strong></p><ul><li><strong>animation-delay</strong>: Tiempo de espera antes de que comience la animaci\xF3n. Si se establece en 0s, la animaci\xF3n comienza inmediatamente. Si se establece en 2s, la animaci\xF3n comienza 2 segundos despu\xE9s de que se cargue la p\xE1gina.</li></ul><p><strong>Timing function/aceleraci\xF3n de la animaci\xF3n</strong>: C\xF3mo se acelera y desacelera con el tiempo. Entonces, si una animaci\xF3n dura un segundo y tiene una aceleraci\xF3n lineal, que mostraremos en un minuto, entonces tendr\xE1 la misma velocidad constante de principio a fin. Sin embargo, las animaciones podemos hacer que no sean lineales, con <code>cubic-bezier(x1,y1,x2,y2)</code>.</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">animation-timing-function</span><span style="color:#A6ACCD;">: cubic-bezier(0</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 0</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">5</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 1);</span></span>
<span class="line"></span></code></pre></div><p>Se recomiend que los valores y1 = 0 y y2 = 1. <code>cubic-bezier(0.5, 0, 0.5, 1)</code> La raz\xF3n es porque se vuelve mucho menos confuso averiguar los otros dos n\xFAmeros. Porque cuando haces eso, los otros dos n\xFAmeros simplemente se convierten en algo que puedes ajustar, y podr\xEDas describir la mayor\xEDa de las curvas as\xED. Y tambi\xE9n porque se parece m\xE1s al mundo real. Cuando algo comienza a moverse, comenzar\xE1 a una velocidad de cero.</p><p><strong>Variables</strong>: Las animaciones y transiciones CSS pueden usar variables CSS. Esto significa que podemos usar valores din\xE1micos en nuestras animaciones y transiciones. Por convenci\xF3n, las variables CSS se nombran en root.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">box</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">root</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  --border-size</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2px</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* -- indica que es una variable custom */</span></span>
<span class="line"><span style="color:#A6ACCD;">  --height-size</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">500px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--height-size</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--custom-red</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--border-size</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> solid black</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Tambi\xE9n se pueden a\xF1adir variables css con js. O asignar un valor a una clase en concreto</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> box </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.box</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">box</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--custom-red</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">red</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">box</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setProperty</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--height-size</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">100px</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,
    16
  ),
  P = c(
    `<p><a href="https://codi.link/PGRpdiBjbGFzcz0iYm94Ij4KCjwvZGl2PgoK%7COnJvb3R7CiAgLS1ib3JkZXItc2l6ZTogMnB4OwogIC0taGVpZ2h0LXNpemU6IDUwMHB4Owp9CgouYm94IHsKICB3aWR0aDogMzAwcHg7CiAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQtc2l6ZSkgOwogIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWN1c3RvbS1yZWQpIDsKICBib3JkZXI6IHZhcigtLWJvcmRlci1zaXplKSBzb2xpZCBibGFjazsKfQ==%7CY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpOwpib3guc3R5bGUuc2V0UHJvcGVydHkoJy0tY3VzdG9tLXJlZCcsICdyZWQnKTsKYm94LnN0eWxlLnNldFByb3BlcnR5KCctLWhlaWdodC1zaXplJywgJzEwMHB4Jyk7" target="_blank" rel="noreferrer">link al ejemplo</a></p><h2 id="\xBFque-animar" tabindex="-1">\xBFQu\xE9 animar? <a class="header-anchor" href="#\xBFque-animar" aria-hidden="true">#</a></h2><p>Al poner animaciones podemos afectar al rendimiento de la p\xE1gina. Por lo que hay que tener cuidado con lo que animamos. Por ejemplo, no animar el tama\xF1o de un elemento, porque eso puede afectar al layout de la p\xE1gina, y suponen un mont\xF3n de renderizaciones y cambios de posici\xF3n. Lo que si podemos animar es el color, la opacidad, etc.</p><p>Estos afectos de la performance los tiene en cuenta google, por lo que afecta al SEO de tu p\xE1gina</p><h2 id="transiciones" tabindex="-1">Transiciones <a class="header-anchor" href="#transiciones" aria-hidden="true">#</a></h2><p>Las transiciones son animaciones que se ejecutan cuando un estado cambia. Por ejemplo, cuando un elemento cambia de color, o cuando se hace un hover sobre un elemento.</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">transition</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> background-color </span><span style="color:#F78C6C;">1s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">hover</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>transition-property: Propiedad que queremos animar. Si no se especifica, se anima todas las propiedades. Si se especifica, se anima solo la propiedad indicada.</p><p>En este ejemplo, la animaci\xF3n se ejecuta unicamente en el background-color, y el cambio de la scale, sera instantaneo.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">box</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">transition-property</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> background-color</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">transition-duration</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">box</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">hover</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">scale</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><a href="https://codi.link/PGRpdiBjbGFzcz0iYm94Ij4KCjwvZGl2PgoK%7CLmJveCB7CiAgd2lkdGg6IDMwMHB4OwogIGhlaWdodDogMzAwcHg7CiAgYmFja2dyb3VuZC1jb2xvcjogcmVkOyAKICB0cmFuc2l0aW9uLXByb3BlcnR5OiBiYWNrZ3JvdW5kLWNvbG9yOwogICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAxczsKCn0KCi5ib3g6aG92ZXIgewogIGJhY2tncm91bmQtY29sb3I6IGJsdWU7CiAgdHJhbnNmb3JtOiBzY2FsZSgyKTsKfQ==%7C" target="_blank" rel="noreferrer">link al ejemplo</a></p>`,
    12
  ),
  X = c(
    `<p>Tambi\xE9n acepta m\xFAltiples propiedades separadas por comas, entonces le podemos dar a cada transici\xF3n una duraci\xF3n diferente.</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">transition-property</span><span style="color:#A6ACCD;">: </span><span style="color:#FFCB6B;">background-color</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> transform;</span></span>
<span class="line"><span style="color:#FFCB6B;">transition-duration</span><span style="color:#A6ACCD;">: 1s</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> 2s;</span></span>
<span class="line"></span></code></pre></div><h2 id="keyframes" tabindex="-1">Keyframes <a class="header-anchor" href="#keyframes" aria-hidden="true">#</a></h2><p>Las keyframes son un conjunto de reglas que definen el estado de un elemento en un momento determinado. Por ejemplo, en el 0% el elemento tiene un color rojo, en el 50% el color es azul, y en el 100% el color es verde.</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">my-animation</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">0%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">50%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">100%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> green</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Se tienen que hacer las animaciones lo m\xE1s naturales posibles, por ejemplo, en el caso de la posici\xF3n seguramente sea buena idea que vuelva a su posici\xF3n inicial. Tambi\xE9n no solo podemos utilizar valores de tanto por ciento, sino tambi\xE9n <code>from</code> y <code>to</code>.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">circle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">circle</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> move-like-a-square</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> red-to-blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-duration</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-iteration-count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> infinite</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">move-like-a-square</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">from</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">/* 0%, 100% */</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">translate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">25%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">translate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">50%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">translate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">75%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">translate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">red-to-blue</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">/* we can NOT add a tranform, conlfict with the other animation */</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><a href="https://codi.link/PGRpdiBjbGFzcz0iY2lyY2xlIj4KPC9kaXY+%7CLmNpcmNsZSB7CiAgICB3aWR0aDogNTBweDsKICAgIGhlaWdodDogNTBweDsKICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICAgIGFuaW1hdGlvbi1uYW1lOiBtb3ZlLWxpa2UtYS1zcXVhcmUsIHJlZC10by1ibHVlOwogICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyczsKICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlOwp9CgpAa2V5ZnJhbWVzIG1vdmUtbGlrZS1hLXNxdWFyZSB7CgogICAgZnJvbSwKICAgIHRvIHsgLyogMCUsIDEwMCUgKi8gICAgICAgIAogICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApOwogICAgfQoKICAgIDI1JSB7CiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNTBweCwgMCk7CiAgICB9CgogICAgNTAlIHsKICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSg1MHB4LCA1MHB4KTsKICAgIH0KCiAgICA3NSUgewogICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwcHgpOwogICAgfQp9CgpAa2V5ZnJhbWVzIHJlZC10by1ibHVlIHsKICAgIGZyb20gewogICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICAgIH0KCiAgICB0byB7CiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTsKICAgIH0KfQ==%7C" target="_blank" rel="noreferrer">link al ejemplo</a></p>`,
    9
  ),
  Q = c(
    `<h2 id="choreography" tabindex="-1">Choreography <a class="header-anchor" href="#choreography" aria-hidden="true">#</a></h2><p>Siempre hemos tratado a las animaciones de manera individual, pero podemos hacer que se ejecuten en un orden determinado. Asi que coreography es para coordinar diferentes animaciones entre si, para convertirla en una sola animaci\xF3n.</p><p>Se puede hacer de manera simple, con la propiedad <code>animation-delay</code> que nos permite dar un retraso a la animaci\xF3n.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">circle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">circle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">circle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">circle</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red-to-blue </span><span style="color:#F78C6C;">0.5s</span><span style="color:#A6ACCD;"> both</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">circle</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">nth-child</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-delay</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">circle</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">nth-child</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation-delay</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">red-to-blue</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><a href="https://codi.link/PGRpdiBjbGFzcz0iY2lyY2xlIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIj48L2Rpdj4KPGJ1dHRvbj4gUmVzdGFydCBhbmltYXRpb24gPC9idXR0b24+%7CLmNpcmNsZSB7CiAgd2lkdGg6IDUwcHg7CiAgaGVpZ2h0OiA1MHB4OwogIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICBib3JkZXItcmFkaXVzOiA1MCU7CiAgYW5pbWF0aW9uOiByZWQtdG8tYmx1ZSAwLjVzIGJvdGg7Cn0KCi5jaXJjbGU6bnRoLWNoaWxkKDIpIHsKICBhbmltYXRpb24tZGVsYXk6IDFzOwp9CgouY2lyY2xlOm50aC1jaGlsZCgzKSB7CiAgYW5pbWF0aW9uLWRlbGF5OiAyczsKfQoKQGtleWZyYW1lcyByZWQtdG8tYmx1ZSB7CiAgZnJvbSB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7CiAgfQoKICB0byB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlOwogIH0KfQo=%7CY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7CmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsKICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2lyY2xlJykuZm9yRWFjaCgoY2lyY2xlKSA9PiB7ICAgIAoKICAgIGNpcmNsZS5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7CiAgICAgY2lyY2xlLm9mZnNldFdpZHRoOyAgIAogICAgIGNpcmNsZS5zdHlsZS5hbmltYXRpb24gPSBudWxsOwogIAogIH0pOwp9KTs=" target="_blank" rel="noreferrer">Link al ejemplo</a></p>`,
    6
  ),
  $ = c(
    `<h3 id="complex-choreography" tabindex="-1">Complex Choreography <a class="header-anchor" href="#complex-choreography" aria-hidden="true">#</a></h3><p>Para poder de manera m\xE1s escalable, se pueden utilizar variables CSS para poder controlar el orden de las animaciones. Y utilizar stagger animations, para evitar sobrepongan las animaciones, de igual manera, a\xF1adir una variable a cada elemento para poder controlar el orden de las animaciones.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">circle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--i: 0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">circle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--i: 1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">circle</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">--i: 2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">circle</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  --duration</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  --stagger</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.5s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  --interval</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">calc</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--duration</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--stagger</span><span style="color:#89DDFF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">border-radius</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">50%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">animation</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red-to-blue </span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--duration</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">calc</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--interval</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">var</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">--i</span><span style="color:#89DDFF;">))</span><span style="color:#A6ACCD;"> both</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;">/* calc(var(--interval) * var(--i)) it&#39;s the delay */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">red-to-blue</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><a href="https://codi.link/PGRpdiBjbGFzcz0iY2lyY2xlIiBzdHlsZT0iLS1pOiAwIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIiBzdHlsZT0iLS1pOiAxIj48L2Rpdj4KPGRpdiBjbGFzcz0iY2lyY2xlIiBzdHlsZT0iLS1pOiAyIj48L2Rpdj4=%7CLmNpcmNsZSB7CiAgLS1kdXJhdGlvbjogMXM7CiAgLS1zdGFnZ2VyOiAwLjVzOwogIC0taW50ZXJ2YWw6IGNhbGModmFyKC0tZHVyYXRpb24pIC0gdmFyKC0tc3RhZ2dlcikpOwoKICB3aWR0aDogNTBweDsKICBoZWlnaHQ6IDUwcHg7CiAgYmFja2dyb3VuZC1jb2xvcjogcmVkOwogIGJvcmRlci1yYWRpdXM6IDUwJTsKICBhbmltYXRpb246IHJlZC10by1ibHVlIHZhcigtLWR1cmF0aW9uKSBjYWxjKHZhcigtLWludGVydmFsKSAqIHZhcigtLWkpKSBib3RoOwp9CgpAa2V5ZnJhbWVzIHJlZC10by1ibHVlIHsKICBmcm9tIHsKICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsKICB9CgogIHRvIHsKICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7CiAgfQp9%7C" target="_blank" rel="noreferrer">link al ejemplo</a></p>`,
    5
  ),
  U = c(
    `<h2 id="estados" tabindex="-1">Estados <a class="header-anchor" href="#estados" aria-hidden="true">#</a></h2><p>Al momento de hacer animaciones, es importante tener en cuenta los estados de los elementos.</p><p>Por ejemplo en un boton, puede tener hover, focus, active, disabled. Y algunos de ellos pueden ser simultaneos, por ejemplo, un boton puede tener hover y active al mismo tiempo.</p><p>Para la gestion de un estado, nos puede servir crear atributos personalizados.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-state</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">loading</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Click</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>Usualmente modificamos el estado de un elemento con javascript, por ejemplo, cuando se hace click en el boton, se cambia el estado a loading.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> button </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">button</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">click</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">button</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setAttribute</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data-state</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">success</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>Ahora bien, es un poco verboso y podemos hacerlo de una manera m\xE1s sencilla.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> button </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">button</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">click</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">button</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">dataset</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">state</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">success</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>A nivel de CSS, podemos utilizar el atributo personalizado para poder aplicar estilos.</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki"><code><span class="line"><span style="color:#FFCB6B;">button</span><span style="color:#89DDFF;">[</span><span style="color:#C792EA;">data-state</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">loading</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> blue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,
    11
  );
function M(s, l, n, ss, as, ns) {
  const d = r("css-variables"),
    u = r("css-transitions"),
    m = r("css-keyframes"),
    g = r("css-simple-choreography"),
    b = r("css-complex-choreography");
  return p(), e("div", null, [O, t(d), P, t(u), X, t(m), Q, t(g), $, t(b), U]);
}
const ps = o(N, [["render", M]]);
export { os as __pageData, ps as default };
