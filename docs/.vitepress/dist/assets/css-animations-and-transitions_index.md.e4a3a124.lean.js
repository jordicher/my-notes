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
  O = c("", 16),
  P = c("", 12),
  X = c("", 9),
  Q = c("", 6),
  $ = c("", 5),
  U = c("", 11);
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
