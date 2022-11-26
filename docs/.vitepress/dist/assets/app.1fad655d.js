function Oi(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let o = 0; o < s.length; o++) n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const Bi = () => {},
  Fi = Object.assign,
  Hi = Object.prototype.hasOwnProperty,
  Hn = (e, t) => Hi.call(e, t),
  ft = Array.isArray,
  Pn = (e) => pr(e) === "[object Map]",
  Ri = (e) => typeof e == "function",
  Di = (e) => typeof e == "string",
  Os = (e) => typeof e == "symbol",
  Rn = (e) => e !== null && typeof e == "object",
  ji = Object.prototype.toString,
  pr = (e) => ji.call(e),
  zi = (e) => pr(e).slice(8, -1),
  Bs = (e) =>
    Di(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Fs = (e, t) => !Object.is(e, t),
  Ui = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Ki = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Ae;
class Wi {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ae),
      !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Ae;
      try {
        return (Ae = this), t();
      } finally {
        Ae = n;
      }
    }
  }
  on() {
    Ae = this;
  }
  off() {
    Ae = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function qi(e, t = Ae) {
  t && t.active && t.effects.push(e);
}
function Gi() {
  return Ae;
}
function Yi(e) {
  Ae && Ae.cleanups.push(e);
}
const Hs = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  vr = (e) => (e.w & _t) > 0,
  mr = (e) => (e.n & _t) > 0,
  Qi = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= _t;
  },
  Ji = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const o = t[s];
        vr(o) && !mr(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~_t),
          (o.n &= ~_t);
      }
      t.length = n;
    }
  },
  bs = new WeakMap();
let Xt = 0,
  _t = 1;
const ys = 30;
let ze;
const Vt = Symbol(""),
  ws = Symbol("");
class Rs {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      qi(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ze,
      n = dt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ze),
        (ze = this),
        (dt = !0),
        (_t = 1 << ++Xt),
        Xt <= ys ? Qi(this) : yo(this),
        this.fn()
      );
    } finally {
      Xt <= ys && Ji(this),
        (_t = 1 << --Xt),
        (ze = this.parent),
        (dt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ze === this
      ? (this.deferStop = !0)
      : this.active &&
        (yo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function yo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let dt = !0;
const gr = [];
function qt() {
  gr.push(dt), (dt = !1);
}
function Gt() {
  const e = gr.pop();
  dt = e === void 0 ? !0 : e;
}
function Ne(e, t, n) {
  if (dt && ze) {
    let s = bs.get(e);
    s || bs.set(e, (s = new Map()));
    let o = s.get(n);
    o || s.set(n, (o = Hs())), br(o);
  }
}
function br(e, t) {
  let n = !1;
  Xt <= ys ? mr(e) || ((e.n |= _t), (n = !vr(e))) : (n = !e.has(ze)),
    n && (e.add(ze), ze.deps.push(e));
}
function ot(e, t, n, s, o, r) {
  const i = bs.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && ft(e)) {
    const c = Ki(s);
    i.forEach((f, h) => {
      (h === "length" || h >= c) && l.push(f);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        ft(e)
          ? Bs(n) && l.push(i.get("length"))
          : (l.push(i.get(Vt)), Pn(e) && l.push(i.get(ws)));
        break;
      case "delete":
        ft(e) || (l.push(i.get(Vt)), Pn(e) && l.push(i.get(ws)));
        break;
      case "set":
        Pn(e) && l.push(i.get(Vt));
        break;
    }
  if (l.length === 1) l[0] && $s(l[0]);
  else {
    const c = [];
    for (const f of l) f && c.push(...f);
    $s(Hs(c));
  }
}
function $s(e, t) {
  const n = ft(e) ? e : [...e];
  for (const s of n) s.computed && wo(s);
  for (const s of n) s.computed || wo(s);
}
function wo(e, t) {
  (e !== ze || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Xi = Oi("__proto__,__v_isRef,__isVue"),
  yr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Os)
  ),
  Zi = Ds(),
  el = Ds(!1, !0),
  tl = Ds(!0),
  $o = nl();
function nl() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = le(this);
        for (let r = 0, i = this.length; r < i; r++) Ne(s, "get", r + "");
        const o = s[t](...n);
        return o === -1 || o === !1 ? s[t](...n.map(le)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        qt();
        const s = le(this)[t].apply(this, n);
        return Gt(), s;
      };
    }),
    e
  );
}
function Ds(e = !1, t = !1) {
  return function (s, o, r) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && r === (e ? (t ? gl : kr) : t ? Pr : xr).get(s))
      return s;
    const i = ft(s);
    if (!e && i && Hn($o, o)) return Reflect.get($o, o, r);
    const l = Reflect.get(s, o, r);
    return (Os(o) ? yr.has(o) : Xi(o)) || (e || Ne(s, "get", o), t)
      ? l
      : xe(l)
      ? i && Bs(o)
        ? l
        : l.value
      : Rn(l)
      ? e
        ? Us(l)
        : jn(l)
      : l;
  };
}
const sl = wr(),
  ol = wr(!0);
function wr(e = !1) {
  return function (n, s, o, r) {
    let i = n[s];
    if (jt(i) && xe(i) && !xe(o)) return !1;
    if (
      !e &&
      (!Sn(o) && !jt(o) && ((i = le(i)), (o = le(o))),
      !ft(n) && xe(i) && !xe(o))
    )
      return (i.value = o), !0;
    const l = ft(n) && Bs(s) ? Number(s) < n.length : Hn(n, s),
      c = Reflect.set(n, s, o, r);
    return (
      n === le(r) && (l ? Fs(o, i) && ot(n, "set", s, o) : ot(n, "add", s, o)),
      c
    );
  };
}
function rl(e, t) {
  const n = Hn(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && ot(e, "delete", t, void 0), s;
}
function il(e, t) {
  const n = Reflect.has(e, t);
  return (!Os(t) || !yr.has(t)) && Ne(e, "has", t), n;
}
function ll(e) {
  return Ne(e, "iterate", ft(e) ? "length" : Vt), Reflect.ownKeys(e);
}
const $r = { get: Zi, set: sl, deleteProperty: rl, has: il, ownKeys: ll },
  cl = {
    get: tl,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  al = Fi({}, $r, { get: el, set: ol }),
  js = (e) => e,
  Dn = (e) => Reflect.getPrototypeOf(e);
function pn(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = le(e),
    r = le(t);
  n || (t !== r && Ne(o, "get", t), Ne(o, "get", r));
  const { has: i } = Dn(o),
    l = s ? js : n ? Ws : rn;
  if (i.call(o, t)) return l(e.get(t));
  if (i.call(o, r)) return l(e.get(r));
  e !== o && e.get(t);
}
function vn(e, t = !1) {
  const n = this.__v_raw,
    s = le(n),
    o = le(e);
  return (
    t || (e !== o && Ne(s, "has", e), Ne(s, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function mn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ne(le(e), "iterate", Vt), Reflect.get(e, "size", e)
  );
}
function xo(e) {
  e = le(e);
  const t = le(this);
  return Dn(t).has.call(t, e) || (t.add(e), ot(t, "add", e, e)), this;
}
function Po(e, t) {
  t = le(t);
  const n = le(this),
    { has: s, get: o } = Dn(n);
  let r = s.call(n, e);
  r || ((e = le(e)), (r = s.call(n, e)));
  const i = o.call(n, e);
  return (
    n.set(e, t), r ? Fs(t, i) && ot(n, "set", e, t) : ot(n, "add", e, t), this
  );
}
function ko(e) {
  const t = le(this),
    { has: n, get: s } = Dn(t);
  let o = n.call(t, e);
  o || ((e = le(e)), (o = n.call(t, e))), s && s.call(t, e);
  const r = t.delete(e);
  return o && ot(t, "delete", e, void 0), r;
}
function Co() {
  const e = le(this),
    t = e.size !== 0,
    n = e.clear();
  return t && ot(e, "clear", void 0, void 0), n;
}
function gn(e, t) {
  return function (s, o) {
    const r = this,
      i = r.__v_raw,
      l = le(i),
      c = t ? js : e ? Ws : rn;
    return (
      !e && Ne(l, "iterate", Vt), i.forEach((f, h) => s.call(o, c(f), c(h), r))
    );
  };
}
function bn(e, t, n) {
  return function (...s) {
    const o = this.__v_raw,
      r = le(o),
      i = Pn(r),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      f = o[e](...s),
      h = n ? js : t ? Ws : rn;
    return (
      !t && Ne(r, "iterate", c ? ws : Vt),
      {
        next() {
          const { value: v, done: b } = f.next();
          return b
            ? { value: v, done: b }
            : { value: l ? [h(v[0]), h(v[1])] : h(v), done: b };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function it(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function ul() {
  const e = {
      get(r) {
        return pn(this, r);
      },
      get size() {
        return mn(this);
      },
      has: vn,
      add: xo,
      set: Po,
      delete: ko,
      clear: Co,
      forEach: gn(!1, !1),
    },
    t = {
      get(r) {
        return pn(this, r, !1, !0);
      },
      get size() {
        return mn(this);
      },
      has: vn,
      add: xo,
      set: Po,
      delete: ko,
      clear: Co,
      forEach: gn(!1, !0),
    },
    n = {
      get(r) {
        return pn(this, r, !0);
      },
      get size() {
        return mn(this, !0);
      },
      has(r) {
        return vn.call(this, r, !0);
      },
      add: it("add"),
      set: it("set"),
      delete: it("delete"),
      clear: it("clear"),
      forEach: gn(!0, !1),
    },
    s = {
      get(r) {
        return pn(this, r, !0, !0);
      },
      get size() {
        return mn(this, !0);
      },
      has(r) {
        return vn.call(this, r, !0);
      },
      add: it("add"),
      set: it("set"),
      delete: it("delete"),
      clear: it("clear"),
      forEach: gn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      (e[r] = bn(r, !1, !1)),
        (n[r] = bn(r, !0, !1)),
        (t[r] = bn(r, !1, !0)),
        (s[r] = bn(r, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [fl, dl, hl, _l] = ul();
function zs(e, t) {
  const n = t ? (e ? _l : hl) : e ? dl : fl;
  return (s, o, r) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? s
      : Reflect.get(Hn(n, o) && o in s ? n : s, o, r);
}
const pl = { get: zs(!1, !1) },
  vl = { get: zs(!1, !0) },
  ml = { get: zs(!0, !1) },
  xr = new WeakMap(),
  Pr = new WeakMap(),
  kr = new WeakMap(),
  gl = new WeakMap();
function bl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function yl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : bl(zi(e));
}
function jn(e) {
  return jt(e) ? e : Ks(e, !1, $r, pl, xr);
}
function wl(e) {
  return Ks(e, !1, al, vl, Pr);
}
function Us(e) {
  return Ks(e, !0, cl, ml, kr);
}
function Ks(e, t, n, s, o) {
  if (!Rn(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = o.get(e);
  if (r) return r;
  const i = yl(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : n);
  return o.set(e, l), l;
}
function Nt(e) {
  return jt(e) ? Nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function jt(e) {
  return !!(e && e.__v_isReadonly);
}
function Sn(e) {
  return !!(e && e.__v_isShallow);
}
function Cr(e) {
  return Nt(e) || jt(e);
}
function le(e) {
  const t = e && e.__v_raw;
  return t ? le(t) : e;
}
function Zt(e) {
  return Ui(e, "__v_skip", !0), e;
}
const rn = (e) => (Rn(e) ? jn(e) : e),
  Ws = (e) => (Rn(e) ? Us(e) : e);
function Sr(e) {
  dt && ze && ((e = le(e)), br(e.dep || (e.dep = Hs())));
}
function Vr(e, t) {
  (e = le(e)), e.dep && $s(e.dep);
}
function xe(e) {
  return !!(e && e.__v_isRef === !0);
}
function ve(e) {
  return Tr(e, !1);
}
function $l(e) {
  return Tr(e, !0);
}
function Tr(e, t) {
  return xe(e) ? e : new xl(e, t);
}
class xl {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : le(t)),
      (this._value = n ? t : rn(t));
  }
  get value() {
    return Sr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Sn(t) || jt(t);
    (t = n ? t : le(t)),
      Fs(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : rn(t)), Vr(this));
  }
}
function _(e) {
  return xe(e) ? e.value : e;
}
const Pl = {
  get: (e, t, n) => _(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return xe(o) && !xe(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Lr(e) {
  return Nt(e) ? e : new Proxy(e, Pl);
}
var Er;
class kl {
  constructor(t, n, s, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Er] = !1),
      (this._dirty = !0),
      (this.effect = new Rs(t, () => {
        this._dirty || ((this._dirty = !0), Vr(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = le(this);
    return (
      Sr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
Er = "__v_isReadonly";
function Cl(e, t, n = !1) {
  let s, o;
  const r = Ri(e);
  return (
    r ? ((s = e), (o = Bi)) : ((s = e.get), (o = e.set)),
    new kl(s, o, r || !o, n)
  );
}
function Sl(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let o = 0; o < s.length; o++) n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
function zn(e) {
  if (oe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        o = Se(s) ? El(s) : zn(s);
      if (o) for (const r in o) t[r] = o[r];
    }
    return t;
  } else {
    if (Se(e)) return e;
    if (ye(e)) return e;
  }
}
const Vl = /;(?![^(]*\))/g,
  Tl = /:([^]+)/,
  Ll = /\/\*.*?\*\//gs;
function El(e) {
  const t = {};
  return (
    e
      .replace(Ll, "")
      .split(Vl)
      .forEach((n) => {
        if (n) {
          const s = n.split(Tl);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function de(e) {
  let t = "";
  if (Se(e)) t = e;
  else if (oe(e))
    for (let n = 0; n < e.length; n++) {
      const s = de(e[n]);
      s && (t += s + " ");
    }
  else if (ye(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const ae = (e) =>
    Se(e)
      ? e
      : e == null
      ? ""
      : oe(e) || (ye(e) && (e.toString === Br || !Z(e.toString)))
      ? JSON.stringify(e, Mr, 2)
      : String(e),
  Mr = (e, t) =>
    t && t.__v_isRef
      ? Mr(e, t.value)
      : Ir(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, o]) => ((n[`${s} =>`] = o), n),
            {}
          ),
        }
      : Nr(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ye(t) && !oe(t) && !Fr(t)
      ? String(t)
      : t,
  me = {},
  Ot = [],
  Xe = () => {},
  Ml = () => !1,
  Al = /^on[^a-z]/,
  Un = (e) => Al.test(e),
  Ar = (e) => e.startsWith("onUpdate:"),
  Oe = Object.assign,
  qs = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Il = Object.prototype.hasOwnProperty,
  ce = (e, t) => Il.call(e, t),
  oe = Array.isArray,
  Ir = (e) => Gs(e) === "[object Map]",
  Nr = (e) => Gs(e) === "[object Set]",
  Z = (e) => typeof e == "function",
  Se = (e) => typeof e == "string",
  ye = (e) => e !== null && typeof e == "object",
  Or = (e) => ye(e) && Z(e.then) && Z(e.catch),
  Br = Object.prototype.toString,
  Gs = (e) => Br.call(e),
  Fr = (e) => Gs(e) === "[object Object]",
  en = Sl(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Kn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Nl = /-(\w)/g,
  et = Kn((e) => e.replace(Nl, (t, n) => (n ? n.toUpperCase() : ""))),
  Ol = /\B([A-Z])/g,
  Wn = Kn((e) => e.replace(Ol, "-$1").toLowerCase()),
  Ys = Kn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  cs = Kn((e) => (e ? `on${Ys(e)}` : "")),
  So = (e, t) => !Object.is(e, t),
  as = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  xs = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Bl = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Vo;
const Fl = () =>
  Vo ||
  (Vo =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function ht(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (r) {
    qn(r, t, n);
  }
  return o;
}
function He(e, t, n, s) {
  if (Z(e)) {
    const r = ht(e, t, n, s);
    return (
      r &&
        Or(r) &&
        r.catch((i) => {
          qn(i, t, n);
        }),
      r
    );
  }
  const o = [];
  for (let r = 0; r < e.length; r++) o.push(He(e[r], t, n, s));
  return o;
}
function qn(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy,
      l = n;
    for (; r; ) {
      const f = r.ec;
      if (f) {
        for (let h = 0; h < f.length; h++) if (f[h](e, i, l) === !1) return;
      }
      r = r.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      ht(c, null, 10, [e, i, l]);
      return;
    }
  }
  Hl(e, n, o, s);
}
function Hl(e, t, n, s = !0) {
  console.error(e);
}
let ln = !1,
  Ps = !1;
const $e = [];
let Je = 0;
const Bt = [];
let st = null,
  Pt = 0;
const Hr = Promise.resolve();
let Qs = null;
function Js(e) {
  const t = Qs || Hr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Rl(e) {
  let t = Je + 1,
    n = $e.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    cn($e[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function Xs(e) {
  (!$e.length || !$e.includes(e, ln && e.allowRecurse ? Je + 1 : Je)) &&
    (e.id == null ? $e.push(e) : $e.splice(Rl(e.id), 0, e), Rr());
}
function Rr() {
  !ln && !Ps && ((Ps = !0), (Qs = Hr.then(Dr)));
}
function Dl(e) {
  const t = $e.indexOf(e);
  t > Je && $e.splice(t, 1);
}
function jl(e) {
  oe(e)
    ? Bt.push(...e)
    : (!st || !st.includes(e, e.allowRecurse ? Pt + 1 : Pt)) && Bt.push(e),
    Rr();
}
function To(e, t = ln ? Je + 1 : 0) {
  for (; t < $e.length; t++) {
    const n = $e[t];
    n && n.pre && ($e.splice(t, 1), t--, n());
  }
}
function Vn(e) {
  if (Bt.length) {
    const t = [...new Set(Bt)];
    if (((Bt.length = 0), st)) {
      st.push(...t);
      return;
    }
    for (st = t, st.sort((n, s) => cn(n) - cn(s)), Pt = 0; Pt < st.length; Pt++)
      st[Pt]();
    (st = null), (Pt = 0);
  }
}
const cn = (e) => (e.id == null ? 1 / 0 : e.id),
  zl = (e, t) => {
    const n = cn(e) - cn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Dr(e) {
  (Ps = !1), (ln = !0), $e.sort(zl);
  const t = Xe;
  try {
    for (Je = 0; Je < $e.length; Je++) {
      const n = $e[Je];
      n && n.active !== !1 && ht(n, null, 14);
    }
  } finally {
    (Je = 0),
      ($e.length = 0),
      Vn(),
      (ln = !1),
      (Qs = null),
      ($e.length || Bt.length) && Dr();
  }
}
function Ul(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || me;
  let o = n;
  const r = t.startsWith("update:"),
    i = r && t.slice(7);
  if (i && i in s) {
    const h = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: v, trim: b } = s[h] || me;
    b && (o = n.map((P) => (Se(P) ? P.trim() : P))), v && (o = n.map(Bl));
  }
  let l,
    c = s[(l = cs(t))] || s[(l = cs(et(t)))];
  !c && r && (c = s[(l = cs(Wn(t)))]), c && He(c, e, 6, o);
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), He(f, e, 6, o);
  }
}
function jr(e, t, n = !1) {
  const s = t.emitsCache,
    o = s.get(e);
  if (o !== void 0) return o;
  const r = e.emits;
  let i = {},
    l = !1;
  if (!Z(e)) {
    const c = (f) => {
      const h = jr(f, t, !0);
      h && ((l = !0), Oe(i, h));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !r && !l
    ? (ye(e) && s.set(e, null), null)
    : (oe(r) ? r.forEach((c) => (i[c] = null)) : Oe(i, r),
      ye(e) && s.set(e, i),
      i);
}
function Gn(e, t) {
  return !e || !Un(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, Wn(t)) || ce(e, t));
}
let Pe = null,
  Yn = null;
function Tn(e) {
  const t = Pe;
  return (Pe = e), (Yn = (e && e.type.__scopeId) || null), t;
}
function We(e) {
  Yn = e;
}
function qe() {
  Yn = null;
}
function I(e, t = Pe, n) {
  if (!t || e._n) return e;
  const s = (...o) => {
    s._d && Ho(-1);
    const r = Tn(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Tn(r), s._d && Ho(1);
    }
    return i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function us(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: o,
    props: r,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: f,
    render: h,
    renderCache: v,
    data: b,
    setupState: P,
    ctx: U,
    inheritAttrs: F,
  } = e;
  let te, $;
  const L = Tn(e);
  try {
    if (n.shapeFlag & 4) {
      const W = o || s;
      (te = je(h.call(W, W, v, r, P, b, U))), ($ = c);
    } else {
      const W = t;
      (te = je(
        W.length > 1 ? W(r, { attrs: c, slots: l, emit: f }) : W(r, null)
      )),
        ($ = t.props ? c : Kl(c));
    }
  } catch (W) {
    (nn.length = 0), qn(W, e, 1), (te = V(Ie));
  }
  let A = te;
  if ($ && F !== !1) {
    const W = Object.keys($),
      { shapeFlag: J } = A;
    W.length && J & 7 && (i && W.some(Ar) && ($ = Wl($, i)), (A = pt(A, $)));
  }
  return (
    n.dirs && ((A = pt(A)), (A.dirs = A.dirs ? A.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (A.transition = n.transition),
    (te = A),
    Tn(L),
    te
  );
}
const Kl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Un(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Wl = (e, t) => {
    const n = {};
    for (const s in e) (!Ar(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function ql(e, t, n) {
  const { props: s, children: o, component: r } = e,
    { props: i, children: l, patchFlag: c } = t,
    f = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? Lo(s, i, f) : !!i;
    if (c & 8) {
      const h = t.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        const b = h[v];
        if (i[b] !== s[b] && !Gn(f, b)) return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? Lo(s, i, f)
        : !0
      : !!i;
  return !1;
}
function Lo(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (t[r] !== e[r] && !Gn(n, r)) return !0;
  }
  return !1;
}
function Gl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Yl = (e) => e.__isSuspense;
function zr(e, t) {
  t && t.pendingBranch
    ? oe(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : jl(e);
}
function Qn(e, t) {
  if (we) {
    let n = we.provides;
    const s = we.parent && we.parent.provides;
    s === n && (n = we.provides = Object.create(s)), (n[e] = t);
  }
}
function Ke(e, t, n = !1) {
  const s = we || Pe;
  if (s) {
    const o =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && Z(t) ? t.call(s.proxy) : t;
  }
}
function zt(e, t) {
  return Jn(e, null, t);
}
function Ur(e, t) {
  return Jn(e, null, { flush: "post" });
}
const yn = {};
function Ze(e, t, n) {
  return Jn(e, t, n);
}
function Jn(
  e,
  t,
  { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: i } = me
) {
  const l = we;
  let c,
    f = !1,
    h = !1;
  if (
    (xe(e)
      ? ((c = () => e.value), (f = Sn(e)))
      : Nt(e)
      ? ((c = () => e), (s = !0))
      : oe(e)
      ? ((h = !0),
        (f = e.some((A) => Nt(A) || Sn(A))),
        (c = () =>
          e.map((A) => {
            if (xe(A)) return A.value;
            if (Nt(A)) return It(A);
            if (Z(A)) return ht(A, l, 2);
          })))
      : Z(e)
      ? t
        ? (c = () => ht(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return v && v(), He(e, l, 3, [b]);
          })
      : (c = Xe),
    t && s)
  ) {
    const A = c;
    c = () => It(A());
  }
  let v,
    b = (A) => {
      v = $.onStop = () => {
        ht(A, l, 4);
      };
    },
    P;
  if (un)
    if (
      ((b = Xe),
      t ? n && He(t, l, 3, [c(), h ? [] : void 0, b]) : c(),
      o === "sync")
    ) {
      const A = Rc();
      P = A.__watcherHandles || (A.__watcherHandles = []);
    } else return Xe;
  let U = h ? new Array(e.length).fill(yn) : yn;
  const F = () => {
    if (!!$.active)
      if (t) {
        const A = $.run();
        (s || f || (h ? A.some((W, J) => So(W, U[J])) : So(A, U))) &&
          (v && v(),
          He(t, l, 3, [A, U === yn ? void 0 : h && U[0] === yn ? [] : U, b]),
          (U = A));
      } else $.run();
  };
  F.allowRecurse = !!t;
  let te;
  o === "sync"
    ? (te = F)
    : o === "post"
    ? (te = () => Te(F, l && l.suspense))
    : ((F.pre = !0), l && (F.id = l.uid), (te = () => Xs(F)));
  const $ = new Rs(c, te);
  t
    ? n
      ? F()
      : (U = $.run())
    : o === "post"
    ? Te($.run.bind($), l && l.suspense)
    : $.run();
  const L = () => {
    $.stop(), l && l.scope && qs(l.scope.effects, $);
  };
  return P && P.push(L), L;
}
function Ql(e, t, n) {
  const s = this.proxy,
    o = Se(e) ? (e.includes(".") ? Kr(s, e) : () => s[e]) : e.bind(s, s);
  let r;
  Z(t) ? (r = t) : ((r = t.handler), (n = t));
  const i = we;
  Kt(this);
  const l = Jn(o, r.bind(s), n);
  return i ? Kt(i) : Tt(), l;
}
function Kr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++) s = s[n[o]];
    return s;
  };
}
function It(e, t) {
  if (!ye(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), xe(e))) It(e.value, t);
  else if (oe(e)) for (let n = 0; n < e.length; n++) It(e[n], t);
  else if (Nr(e) || Ir(e))
    e.forEach((n) => {
      It(n, t);
    });
  else if (Fr(e)) for (const n in e) It(e[n], t);
  return e;
}
function Jl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Re(() => {
      e.isMounted = !0;
    }),
    Qr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Be = [Function, Array],
  Xl = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Be,
      onEnter: Be,
      onAfterEnter: Be,
      onEnterCancelled: Be,
      onBeforeLeave: Be,
      onLeave: Be,
      onAfterLeave: Be,
      onLeaveCancelled: Be,
      onBeforeAppear: Be,
      onAppear: Be,
      onAfterAppear: Be,
      onAppearCancelled: Be,
    },
    setup(e, { slots: t }) {
      const n = ro(),
        s = Jl();
      let o;
      return () => {
        const r = t.default && Gr(t.default(), !0);
        if (!r || !r.length) return;
        let i = r[0];
        if (r.length > 1) {
          for (const F of r)
            if (F.type !== Ie) {
              i = F;
              break;
            }
        }
        const l = le(e),
          { mode: c } = l;
        if (s.isLeaving) return fs(i);
        const f = Eo(i);
        if (!f) return fs(i);
        const h = ks(f, l, s, n);
        Cs(f, h);
        const v = n.subTree,
          b = v && Eo(v);
        let P = !1;
        const { getTransitionKey: U } = f.type;
        if (U) {
          const F = U();
          o === void 0 ? (o = F) : F !== o && ((o = F), (P = !0));
        }
        if (b && b.type !== Ie && (!kt(f, b) || P)) {
          const F = ks(b, l, s, n);
          if ((Cs(b, F), c === "out-in"))
            return (
              (s.isLeaving = !0),
              (F.afterLeave = () => {
                (s.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              fs(i)
            );
          c === "in-out" &&
            f.type !== Ie &&
            (F.delayLeave = (te, $, L) => {
              const A = qr(s, b);
              (A[String(b.key)] = b),
                (te._leaveCb = () => {
                  $(), (te._leaveCb = void 0), delete h.delayedLeave;
                }),
                (h.delayedLeave = L);
            });
        }
        return i;
      };
    },
  },
  Wr = Xl;
function qr(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function ks(e, t, n, s) {
  const {
      appear: o,
      mode: r,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: f,
      onEnterCancelled: h,
      onBeforeLeave: v,
      onLeave: b,
      onAfterLeave: P,
      onLeaveCancelled: U,
      onBeforeAppear: F,
      onAppear: te,
      onAfterAppear: $,
      onAppearCancelled: L,
    } = t,
    A = String(e.key),
    W = qr(n, e),
    J = (M, Q) => {
      M && He(M, s, 9, Q);
    },
    he = (M, Q) => {
      const Y = Q[1];
      J(M, Q),
        oe(M) ? M.every((re) => re.length <= 1) && Y() : M.length <= 1 && Y();
    },
    ne = {
      mode: r,
      persisted: i,
      beforeEnter(M) {
        let Q = l;
        if (!n.isMounted)
          if (o) Q = F || l;
          else return;
        M._leaveCb && M._leaveCb(!0);
        const Y = W[A];
        Y && kt(e, Y) && Y.el._leaveCb && Y.el._leaveCb(), J(Q, [M]);
      },
      enter(M) {
        let Q = c,
          Y = f,
          re = h;
        if (!n.isMounted)
          if (o) (Q = te || c), (Y = $ || f), (re = L || h);
          else return;
        let O = !1;
        const X = (M._enterCb = (R) => {
          O ||
            ((O = !0),
            R ? J(re, [M]) : J(Y, [M]),
            ne.delayedLeave && ne.delayedLeave(),
            (M._enterCb = void 0));
        });
        Q ? he(Q, [M, X]) : X();
      },
      leave(M, Q) {
        const Y = String(e.key);
        if ((M._enterCb && M._enterCb(!0), n.isUnmounting)) return Q();
        J(v, [M]);
        let re = !1;
        const O = (M._leaveCb = (X) => {
          re ||
            ((re = !0),
            Q(),
            X ? J(U, [M]) : J(P, [M]),
            (M._leaveCb = void 0),
            W[Y] === e && delete W[Y]);
        });
        (W[Y] = e), b ? he(b, [M, O]) : O();
      },
      clone(M) {
        return ks(M, t, n, s);
      },
    };
  return ne;
}
function fs(e) {
  if (Xn(e)) return (e = pt(e)), (e.children = null), e;
}
function Eo(e) {
  return Xn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Cs(e, t) {
  e.shapeFlag & 6 && e.component
    ? Cs(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Gr(e, t = !1, n) {
  let s = [],
    o = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === q
      ? (i.patchFlag & 128 && o++, (s = s.concat(Gr(i.children, t, l))))
      : (t || i.type !== Ie) && s.push(l != null ? pt(i, { key: l }) : i);
  }
  if (o > 1) for (let r = 0; r < s.length; r++) s[r].patchFlag = -2;
  return s;
}
function H(e) {
  return Z(e) ? { setup: e, name: e.name } : e;
}
const Ft = (e) => !!e.type.__asyncLoader,
  Xn = (e) => e.type.__isKeepAlive;
function Zl(e, t) {
  Yr(e, "a", t);
}
function ec(e, t) {
  Yr(e, "da", t);
}
function Yr(e, t, n = we) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((Zn(t, s, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      Xn(o.parent.vnode) && tc(s, t, n, o), (o = o.parent);
  }
}
function tc(e, t, n, s) {
  const o = Zn(t, e, s, !0);
  vt(() => {
    qs(s[t], o);
  }, n);
}
function Zn(e, t, n = we, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          qt(), Kt(n);
          const l = He(t, n, e, i);
          return Tt(), Gt(), l;
        });
    return s ? o.unshift(r) : o.push(r), r;
  }
}
const rt =
    (e) =>
    (t, n = we) =>
      (!un || e === "sp") && Zn(e, (...s) => t(...s), n),
  nc = rt("bm"),
  Re = rt("m"),
  sc = rt("bu"),
  Zs = rt("u"),
  Qr = rt("bum"),
  vt = rt("um"),
  oc = rt("sp"),
  rc = rt("rtg"),
  ic = rt("rtc");
function lc(e, t = we) {
  Zn("ec", e, t);
}
function Qe(e, t, n, s) {
  const o = e.dirs,
    r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const l = o[i];
    r && (l.oldValue = r[i].value);
    let c = l.dir[s];
    c && (qt(), He(c, n, 8, [e.el, l, e, t]), Gt());
  }
}
const eo = "components";
function Lt(e, t) {
  return Xr(eo, e, !0, t) || e;
}
const Jr = Symbol();
function to(e) {
  return Se(e) ? Xr(eo, e, !1) || e : e || Jr;
}
function Xr(e, t, n = !0, s = !1) {
  const o = Pe || we;
  if (o) {
    const r = o.type;
    if (e === eo) {
      const l = Bc(r, !1);
      if (l && (l === t || l === et(t) || l === Ys(et(t)))) return r;
    }
    const i = Mo(o[e] || r[e], t) || Mo(o.appContext[e], t);
    return !i && s ? r : i;
  }
}
function Mo(e, t) {
  return e && (e[t] || e[et(t)] || e[Ys(et(t))]);
}
function ke(e, t, n, s) {
  let o;
  const r = n && n[s];
  if (oe(e) || Se(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, r && r[i]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let i = 0; i < e; i++) o[i] = t(i + 1, i, void 0, r && r[i]);
  } else if (ye(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, l) => t(i, l, void 0, r && r[l]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const f = i[l];
        o[l] = t(e[f], f, l, r && r[l]);
      }
    }
  else o = [];
  return n && (n[s] = o), o;
}
function T(e, t, n = {}, s, o) {
  if (Pe.isCE || (Pe.parent && Ft(Pe.parent) && Pe.parent.isCE))
    return t !== "default" && (n.name = t), V("slot", n, s && s());
  let r = e[t];
  r && r._c && (r._d = !1), d();
  const i = r && Zr(r(n)),
    l = G(
      q,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (s ? s() : []),
      i && e._ === 1 ? 64 : -2
    );
  return (
    !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    r && r._c && (r._d = !0),
    l
  );
}
function Zr(e) {
  return e.some((t) =>
    Mn(t) ? !(t.type === Ie || (t.type === q && !Zr(t.children))) : !0
  )
    ? e
    : null;
}
const Ss = (e) => (e ? (ui(e) ? io(e) || e.proxy : Ss(e.parent)) : null),
  tn = Oe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ss(e.parent),
    $root: (e) => Ss(e.root),
    $emit: (e) => e.emit,
    $options: (e) => no(e),
    $forceUpdate: (e) => e.f || (e.f = () => Xs(e.update)),
    $nextTick: (e) => e.n || (e.n = Js.bind(e.proxy)),
    $watch: (e) => Ql.bind(e),
  }),
  ds = (e, t) => e !== me && !e.__isScriptSetup && ce(e, t),
  cc = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: o,
        props: r,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let f;
      if (t[0] !== "$") {
        const P = i[t];
        if (P !== void 0)
          switch (P) {
            case 1:
              return s[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return r[t];
          }
        else {
          if (ds(s, t)) return (i[t] = 1), s[t];
          if (o !== me && ce(o, t)) return (i[t] = 2), o[t];
          if ((f = e.propsOptions[0]) && ce(f, t)) return (i[t] = 3), r[t];
          if (n !== me && ce(n, t)) return (i[t] = 4), n[t];
          Vs && (i[t] = 0);
        }
      }
      const h = tn[t];
      let v, b;
      if (h) return t === "$attrs" && Ne(e, "get", t), h(e);
      if ((v = l.__cssModules) && (v = v[t])) return v;
      if (n !== me && ce(n, t)) return (i[t] = 4), n[t];
      if (((b = c.config.globalProperties), ce(b, t))) return b[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: o, ctx: r } = e;
      return ds(o, t)
        ? ((o[t] = n), !0)
        : s !== me && ce(s, t)
        ? ((s[t] = n), !0)
        : ce(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: o,
          propsOptions: r,
        },
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== me && ce(e, i)) ||
        ds(t, i) ||
        ((l = r[0]) && ce(l, i)) ||
        ce(s, i) ||
        ce(tn, i) ||
        ce(o.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ce(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Vs = !0;
function ac(e) {
  const t = no(e),
    n = e.proxy,
    s = e.ctx;
  (Vs = !1), t.beforeCreate && Ao(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: r,
    methods: i,
    watch: l,
    provide: c,
    inject: f,
    created: h,
    beforeMount: v,
    mounted: b,
    beforeUpdate: P,
    updated: U,
    activated: F,
    deactivated: te,
    beforeDestroy: $,
    beforeUnmount: L,
    destroyed: A,
    unmounted: W,
    render: J,
    renderTracked: he,
    renderTriggered: ne,
    errorCaptured: M,
    serverPrefetch: Q,
    expose: Y,
    inheritAttrs: re,
    components: O,
    directives: X,
    filters: R,
  } = t;
  if ((f && uc(f, s, null, e.appContext.config.unwrapInjectedRef), i))
    for (const ge in i) {
      const _e = i[ge];
      Z(_e) && (s[ge] = _e.bind(n));
    }
  if (o) {
    const ge = o.call(n, n);
    ye(ge) && (e.data = jn(ge));
  }
  if (((Vs = !0), r))
    for (const ge in r) {
      const _e = r[ge],
        gt = Z(_e) ? _e.bind(n, n) : Z(_e.get) ? _e.get.bind(n, n) : Xe,
        hn = !Z(_e) && Z(_e.set) ? _e.set.bind(n) : Xe,
        bt = se({ get: gt, set: hn });
      Object.defineProperty(s, ge, {
        enumerable: !0,
        configurable: !0,
        get: () => bt.value,
        set: (Ge) => (bt.value = Ge),
      });
    }
  if (l) for (const ge in l) ei(l[ge], s, n, ge);
  if (c) {
    const ge = Z(c) ? c.call(n) : c;
    Reflect.ownKeys(ge).forEach((_e) => {
      Qn(_e, ge[_e]);
    });
  }
  h && Ao(h, e, "c");
  function ue(ge, _e) {
    oe(_e) ? _e.forEach((gt) => ge(gt.bind(n))) : _e && ge(_e.bind(n));
  }
  if (
    (ue(nc, v),
    ue(Re, b),
    ue(sc, P),
    ue(Zs, U),
    ue(Zl, F),
    ue(ec, te),
    ue(lc, M),
    ue(ic, he),
    ue(rc, ne),
    ue(Qr, L),
    ue(vt, W),
    ue(oc, Q),
    oe(Y))
  )
    if (Y.length) {
      const ge = e.exposed || (e.exposed = {});
      Y.forEach((_e) => {
        Object.defineProperty(ge, _e, {
          get: () => n[_e],
          set: (gt) => (n[_e] = gt),
        });
      });
    } else e.exposed || (e.exposed = {});
  J && e.render === Xe && (e.render = J),
    re != null && (e.inheritAttrs = re),
    O && (e.components = O),
    X && (e.directives = X);
}
function uc(e, t, n = Xe, s = !1) {
  oe(e) && (e = Ts(e));
  for (const o in e) {
    const r = e[o];
    let i;
    ye(r)
      ? "default" in r
        ? (i = Ke(r.from || o, r.default, !0))
        : (i = Ke(r.from || o))
      : (i = Ke(r)),
      xe(i) && s
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (t[o] = i);
  }
}
function Ao(e, t, n) {
  He(oe(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ei(e, t, n, s) {
  const o = s.includes(".") ? Kr(n, s) : () => n[s];
  if (Se(e)) {
    const r = t[e];
    Z(r) && Ze(o, r);
  } else if (Z(e)) Ze(o, e.bind(n));
  else if (ye(e))
    if (oe(e)) e.forEach((r) => ei(r, t, n, s));
    else {
      const r = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
      Z(r) && Ze(o, r, e);
    }
}
function no(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: o,
      optionsCache: r,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = r.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !o.length && !n && !s
      ? (c = t)
      : ((c = {}), o.length && o.forEach((f) => Ln(c, f, i, !0)), Ln(c, t, i)),
    ye(t) && r.set(t, c),
    c
  );
}
function Ln(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && Ln(e, r, n, !0), o && o.forEach((i) => Ln(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = fc[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const fc = {
  data: Io,
  props: xt,
  emits: xt,
  methods: xt,
  computed: xt,
  beforeCreate: Ce,
  created: Ce,
  beforeMount: Ce,
  mounted: Ce,
  beforeUpdate: Ce,
  updated: Ce,
  beforeDestroy: Ce,
  beforeUnmount: Ce,
  destroyed: Ce,
  unmounted: Ce,
  activated: Ce,
  deactivated: Ce,
  errorCaptured: Ce,
  serverPrefetch: Ce,
  components: xt,
  directives: xt,
  watch: hc,
  provide: Io,
  inject: dc,
};
function Io(e, t) {
  return t
    ? e
      ? function () {
          return Oe(
            Z(e) ? e.call(this, this) : e,
            Z(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function dc(e, t) {
  return xt(Ts(e), Ts(t));
}
function Ts(e) {
  if (oe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function xt(e, t) {
  return e ? Oe(Oe(Object.create(null), e), t) : t;
}
function hc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Oe(Object.create(null), e);
  for (const s in t) n[s] = Ce(e[s], t[s]);
  return n;
}
function _c(e, t, n, s = !1) {
  const o = {},
    r = {};
  xs(r, es, 1), (e.propsDefaults = Object.create(null)), ti(e, t, o, r);
  for (const i in e.propsOptions[0]) i in o || (o[i] = void 0);
  n ? (e.props = s ? o : wl(o)) : e.type.props ? (e.props = o) : (e.props = r),
    (e.attrs = r);
}
function pc(e, t, n, s) {
  const {
      props: o,
      attrs: r,
      vnode: { patchFlag: i },
    } = e,
    l = le(o),
    [c] = e.propsOptions;
  let f = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const h = e.vnode.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        let b = h[v];
        if (Gn(e.emitsOptions, b)) continue;
        const P = t[b];
        if (c)
          if (ce(r, b)) P !== r[b] && ((r[b] = P), (f = !0));
          else {
            const U = et(b);
            o[U] = Ls(c, l, U, P, e, !1);
          }
        else P !== r[b] && ((r[b] = P), (f = !0));
      }
    }
  } else {
    ti(e, t, o, r) && (f = !0);
    let h;
    for (const v in l)
      (!t || (!ce(t, v) && ((h = Wn(v)) === v || !ce(t, h)))) &&
        (c
          ? n &&
            (n[v] !== void 0 || n[h] !== void 0) &&
            (o[v] = Ls(c, l, v, void 0, e, !0))
          : delete o[v]);
    if (r !== l)
      for (const v in r) (!t || (!ce(t, v) && !0)) && (delete r[v], (f = !0));
  }
  f && ot(e, "set", "$attrs");
}
function ti(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (en(c)) continue;
      const f = t[c];
      let h;
      o && ce(o, (h = et(c)))
        ? !r || !r.includes(h)
          ? (n[h] = f)
          : ((l || (l = {}))[h] = f)
        : Gn(e.emitsOptions, c) ||
          ((!(c in s) || f !== s[c]) && ((s[c] = f), (i = !0)));
    }
  if (r) {
    const c = le(n),
      f = l || me;
    for (let h = 0; h < r.length; h++) {
      const v = r[h];
      n[v] = Ls(o, c, v, f[v], e, !ce(f, v));
    }
  }
  return i;
}
function Ls(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const l = ce(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && Z(c)) {
        const { propsDefaults: f } = o;
        n in f ? (s = f[n]) : (Kt(o), (s = f[n] = c.call(null, t)), Tt());
      } else s = c;
    }
    i[0] &&
      (r && !l ? (s = !1) : i[1] && (s === "" || s === Wn(n)) && (s = !0));
  }
  return s;
}
function ni(e, t, n = !1) {
  const s = t.propsCache,
    o = s.get(e);
  if (o) return o;
  const r = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!Z(e)) {
    const h = (v) => {
      c = !0;
      const [b, P] = ni(v, t, !0);
      Oe(i, b), P && l.push(...P);
    };
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h);
  }
  if (!r && !c) return ye(e) && s.set(e, Ot), Ot;
  if (oe(r))
    for (let h = 0; h < r.length; h++) {
      const v = et(r[h]);
      No(v) && (i[v] = me);
    }
  else if (r)
    for (const h in r) {
      const v = et(h);
      if (No(v)) {
        const b = r[h],
          P = (i[v] = oe(b) || Z(b) ? { type: b } : Object.assign({}, b));
        if (P) {
          const U = Fo(Boolean, P.type),
            F = Fo(String, P.type);
          (P[0] = U > -1),
            (P[1] = F < 0 || U < F),
            (U > -1 || ce(P, "default")) && l.push(v);
        }
      }
    }
  const f = [i, l];
  return ye(e) && s.set(e, f), f;
}
function No(e) {
  return e[0] !== "$";
}
function Oo(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Bo(e, t) {
  return Oo(e) === Oo(t);
}
function Fo(e, t) {
  return oe(t) ? t.findIndex((n) => Bo(n, e)) : Z(t) && Bo(t, e) ? 0 : -1;
}
const si = (e) => e[0] === "_" || e === "$stable",
  so = (e) => (oe(e) ? e.map(je) : [je(e)]),
  vc = (e, t, n) => {
    if (t._n) return t;
    const s = I((...o) => so(t(...o)), n);
    return (s._c = !1), s;
  },
  oi = (e, t, n) => {
    const s = e._ctx;
    for (const o in e) {
      if (si(o)) continue;
      const r = e[o];
      if (Z(r)) t[o] = vc(o, r, s);
      else if (r != null) {
        const i = so(r);
        t[o] = () => i;
      }
    }
  },
  ri = (e, t) => {
    const n = so(t);
    e.slots.default = () => n;
  },
  mc = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = le(t)), xs(t, "_", n)) : oi(t, (e.slots = {}));
    } else (e.slots = {}), t && ri(e, t);
    xs(e.slots, es, 1);
  },
  gc = (e, t, n) => {
    const { vnode: s, slots: o } = e;
    let r = !0,
      i = me;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (r = !1)
          : (Oe(o, t), !n && l === 1 && delete o._)
        : ((r = !t.$stable), oi(t, o)),
        (i = t);
    } else t && (ri(e, t), (i = { default: 1 }));
    if (r) for (const l in o) !si(l) && !(l in i) && delete o[l];
  };
function ii() {
  return {
    app: null,
    config: {
      isNativeTag: Ml,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let bc = 0;
function yc(e, t) {
  return function (s, o = null) {
    Z(s) || (s = Object.assign({}, s)), o != null && !ye(o) && (o = null);
    const r = ii(),
      i = new Set();
    let l = !1;
    const c = (r.app = {
      _uid: bc++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: Dc,
      get config() {
        return r.config;
      },
      set config(f) {},
      use(f, ...h) {
        return (
          i.has(f) ||
            (f && Z(f.install)
              ? (i.add(f), f.install(c, ...h))
              : Z(f) && (i.add(f), f(c, ...h))),
          c
        );
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), c;
      },
      component(f, h) {
        return h ? ((r.components[f] = h), c) : r.components[f];
      },
      directive(f, h) {
        return h ? ((r.directives[f] = h), c) : r.directives[f];
      },
      mount(f, h, v) {
        if (!l) {
          const b = V(s, o);
          return (
            (b.appContext = r),
            h && t ? t(b, f) : e(b, f, v),
            (l = !0),
            (c._container = f),
            (f.__vue_app__ = c),
            io(b.component) || b.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(f, h) {
        return (r.provides[f] = h), c;
      },
    });
    return c;
  };
}
function En(e, t, n, s, o = !1) {
  if (oe(e)) {
    e.forEach((b, P) => En(b, t && (oe(t) ? t[P] : t), n, s, o));
    return;
  }
  if (Ft(s) && !o) return;
  const r = s.shapeFlag & 4 ? io(s.component) || s.component.proxy : s.el,
    i = o ? null : r,
    { i: l, r: c } = e,
    f = t && t.r,
    h = l.refs === me ? (l.refs = {}) : l.refs,
    v = l.setupState;
  if (
    (f != null &&
      f !== c &&
      (Se(f)
        ? ((h[f] = null), ce(v, f) && (v[f] = null))
        : xe(f) && (f.value = null)),
    Z(c))
  )
    ht(c, l, 12, [i, h]);
  else {
    const b = Se(c),
      P = xe(c);
    if (b || P) {
      const U = () => {
        if (e.f) {
          const F = b ? (ce(v, c) ? v[c] : h[c]) : c.value;
          o
            ? oe(F) && qs(F, r)
            : oe(F)
            ? F.includes(r) || F.push(r)
            : b
            ? ((h[c] = [r]), ce(v, c) && (v[c] = h[c]))
            : ((c.value = [r]), e.k && (h[e.k] = c.value));
        } else
          b
            ? ((h[c] = i), ce(v, c) && (v[c] = i))
            : P && ((c.value = i), e.k && (h[e.k] = i));
      };
      i ? ((U.id = -1), Te(U, n)) : U();
    }
  }
}
let lt = !1;
const wn = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  $n = (e) => e.nodeType === 8;
function wc(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        createText: o,
        nextSibling: r,
        parentNode: i,
        remove: l,
        insert: c,
        createComment: f,
      },
    } = e,
    h = ($, L) => {
      if (!L.hasChildNodes()) {
        n(null, $, L), Vn(), (L._vnode = $);
        return;
      }
      (lt = !1),
        v(L.firstChild, $, null, null, null),
        Vn(),
        (L._vnode = $),
        lt && console.error("Hydration completed but contains mismatches.");
    },
    v = ($, L, A, W, J, he = !1) => {
      const ne = $n($) && $.data === "[",
        M = () => F($, L, A, W, J, ne),
        { type: Q, ref: Y, shapeFlag: re, patchFlag: O } = L;
      let X = $.nodeType;
      (L.el = $), O === -2 && ((he = !1), (L.dynamicChildren = null));
      let R = null;
      switch (Q) {
        case Ut:
          X !== 3
            ? L.children === ""
              ? (c((L.el = o("")), i($), $), (R = $))
              : (R = M())
            : ($.data !== L.children && ((lt = !0), ($.data = L.children)),
              (R = r($)));
          break;
        case Ie:
          X !== 8 || ne ? (R = M()) : (R = r($));
          break;
        case Ht:
          if ((ne && (($ = r($)), (X = $.nodeType)), X === 1 || X === 3)) {
            R = $;
            const Ee = !L.children.length;
            for (let ue = 0; ue < L.staticCount; ue++)
              Ee && (L.children += R.nodeType === 1 ? R.outerHTML : R.data),
                ue === L.staticCount - 1 && (L.anchor = R),
                (R = r(R));
            return ne ? r(R) : R;
          } else M();
          break;
        case q:
          ne ? (R = U($, L, A, W, J, he)) : (R = M());
          break;
        default:
          if (re & 1)
            X !== 1 || L.type.toLowerCase() !== $.tagName.toLowerCase()
              ? (R = M())
              : (R = b($, L, A, W, J, he));
          else if (re & 6) {
            L.slotScopeIds = J;
            const Ee = i($);
            if (
              (t(L, Ee, null, A, W, wn(Ee), he),
              (R = ne ? te($) : r($)),
              R && $n(R) && R.data === "teleport end" && (R = r(R)),
              Ft(L))
            ) {
              let ue;
              ne
                ? ((ue = V(q)),
                  (ue.anchor = R ? R.previousSibling : Ee.lastChild))
                : (ue = $.nodeType === 3 ? Ve("") : V("div")),
                (ue.el = $),
                (L.component.subTree = ue);
            }
          } else
            re & 64
              ? X !== 8
                ? (R = M())
                : (R = L.type.hydrate($, L, A, W, J, he, e, P))
              : re & 128 &&
                (R = L.type.hydrate($, L, A, W, wn(i($)), J, he, e, v));
      }
      return Y != null && En(Y, null, W, L), R;
    },
    b = ($, L, A, W, J, he) => {
      he = he || !!L.dynamicChildren;
      const { type: ne, props: M, patchFlag: Q, shapeFlag: Y, dirs: re } = L,
        O = (ne === "input" && re) || ne === "option";
      if (O || Q !== -1) {
        if ((re && Qe(L, null, A, "created"), M))
          if (O || !he || Q & 48)
            for (const R in M)
              ((O && R.endsWith("value")) || (Un(R) && !en(R))) &&
                s($, R, null, M[R], !1, void 0, A);
          else M.onClick && s($, "onClick", null, M.onClick, !1, void 0, A);
        let X;
        if (
          ((X = M && M.onVnodeBeforeMount) && Fe(X, A, L),
          re && Qe(L, null, A, "beforeMount"),
          ((X = M && M.onVnodeMounted) || re) &&
            zr(() => {
              X && Fe(X, A, L), re && Qe(L, null, A, "mounted");
            }, W),
          Y & 16 && !(M && (M.innerHTML || M.textContent)))
        ) {
          let R = P($.firstChild, L, $, A, W, J, he);
          for (; R; ) {
            lt = !0;
            const Ee = R;
            (R = R.nextSibling), l(Ee);
          }
        } else
          Y & 8 &&
            $.textContent !== L.children &&
            ((lt = !0), ($.textContent = L.children));
      }
      return $.nextSibling;
    },
    P = ($, L, A, W, J, he, ne) => {
      ne = ne || !!L.dynamicChildren;
      const M = L.children,
        Q = M.length;
      for (let Y = 0; Y < Q; Y++) {
        const re = ne ? M[Y] : (M[Y] = je(M[Y]));
        if ($) $ = v($, re, W, J, he, ne);
        else {
          if (re.type === Ut && !re.children) continue;
          (lt = !0), n(null, re, A, null, W, J, wn(A), he);
        }
      }
      return $;
    },
    U = ($, L, A, W, J, he) => {
      const { slotScopeIds: ne } = L;
      ne && (J = J ? J.concat(ne) : ne);
      const M = i($),
        Q = P(r($), L, M, A, W, J, he);
      return Q && $n(Q) && Q.data === "]"
        ? r((L.anchor = Q))
        : ((lt = !0), c((L.anchor = f("]")), M, Q), Q);
    },
    F = ($, L, A, W, J, he) => {
      if (((lt = !0), (L.el = null), he)) {
        const Q = te($);
        for (;;) {
          const Y = r($);
          if (Y && Y !== Q) l(Y);
          else break;
        }
      }
      const ne = r($),
        M = i($);
      return l($), n(null, L, M, ne, A, W, wn(M), J), ne;
    },
    te = ($) => {
      let L = 0;
      for (; $; )
        if (
          (($ = r($)), $ && $n($) && ($.data === "[" && L++, $.data === "]"))
        ) {
          if (L === 0) return r($);
          L--;
        }
      return $;
    };
  return [h, v];
}
const Te = zr;
function $c(e) {
  return xc(e, wc);
}
function xc(e, t) {
  const n = Fl();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: o,
      patchProp: r,
      createElement: i,
      createText: l,
      createComment: c,
      setText: f,
      setElementText: h,
      parentNode: v,
      nextSibling: b,
      setScopeId: P = Xe,
      insertStaticContent: U,
    } = e,
    F = (
      a,
      u,
      p,
      w = null,
      y = null,
      C = null,
      E = !1,
      k = null,
      S = !!u.dynamicChildren
    ) => {
      if (a === u) return;
      a && !kt(a, u) && ((w = _n(a)), Ge(a, y, C, !0), (a = null)),
        u.patchFlag === -2 && ((S = !1), (u.dynamicChildren = null));
      const { type: x, ref: D, shapeFlag: B } = u;
      switch (x) {
        case Ut:
          te(a, u, p, w);
          break;
        case Ie:
          $(a, u, p, w);
          break;
        case Ht:
          a == null && L(u, p, w, E);
          break;
        case q:
          O(a, u, p, w, y, C, E, k, S);
          break;
        default:
          B & 1
            ? J(a, u, p, w, y, C, E, k, S)
            : B & 6
            ? X(a, u, p, w, y, C, E, k, S)
            : (B & 64 || B & 128) && x.process(a, u, p, w, y, C, E, k, S, Mt);
      }
      D != null && y && En(D, a && a.ref, C, u || a, !u);
    },
    te = (a, u, p, w) => {
      if (a == null) s((u.el = l(u.children)), p, w);
      else {
        const y = (u.el = a.el);
        u.children !== a.children && f(y, u.children);
      }
    },
    $ = (a, u, p, w) => {
      a == null ? s((u.el = c(u.children || "")), p, w) : (u.el = a.el);
    },
    L = (a, u, p, w) => {
      [a.el, a.anchor] = U(a.children, u, p, w, a.el, a.anchor);
    },
    A = ({ el: a, anchor: u }, p, w) => {
      let y;
      for (; a && a !== u; ) (y = b(a)), s(a, p, w), (a = y);
      s(u, p, w);
    },
    W = ({ el: a, anchor: u }) => {
      let p;
      for (; a && a !== u; ) (p = b(a)), o(a), (a = p);
      o(u);
    },
    J = (a, u, p, w, y, C, E, k, S) => {
      (E = E || u.type === "svg"),
        a == null ? he(u, p, w, y, C, E, k, S) : Q(a, u, y, C, E, k, S);
    },
    he = (a, u, p, w, y, C, E, k) => {
      let S, x;
      const { type: D, props: B, shapeFlag: j, transition: K, dirs: ee } = a;
      if (
        ((S = a.el = i(a.type, C, B && B.is, B)),
        j & 8
          ? h(S, a.children)
          : j & 16 &&
            M(a.children, S, null, w, y, C && D !== "foreignObject", E, k),
        ee && Qe(a, null, w, "created"),
        B)
      ) {
        for (const fe in B)
          fe !== "value" &&
            !en(fe) &&
            r(S, fe, null, B[fe], C, a.children, w, y, nt);
        "value" in B && r(S, "value", null, B.value),
          (x = B.onVnodeBeforeMount) && Fe(x, w, a);
      }
      ne(S, a, a.scopeId, E, w), ee && Qe(a, null, w, "beforeMount");
      const pe = (!y || (y && !y.pendingBranch)) && K && !K.persisted;
      pe && K.beforeEnter(S),
        s(S, u, p),
        ((x = B && B.onVnodeMounted) || pe || ee) &&
          Te(() => {
            x && Fe(x, w, a), pe && K.enter(S), ee && Qe(a, null, w, "mounted");
          }, y);
    },
    ne = (a, u, p, w, y) => {
      if ((p && P(a, p), w)) for (let C = 0; C < w.length; C++) P(a, w[C]);
      if (y) {
        let C = y.subTree;
        if (u === C) {
          const E = y.vnode;
          ne(a, E, E.scopeId, E.slotScopeIds, y.parent);
        }
      }
    },
    M = (a, u, p, w, y, C, E, k, S = 0) => {
      for (let x = S; x < a.length; x++) {
        const D = (a[x] = k ? ut(a[x]) : je(a[x]));
        F(null, D, u, p, w, y, C, E, k);
      }
    },
    Q = (a, u, p, w, y, C, E) => {
      const k = (u.el = a.el);
      let { patchFlag: S, dynamicChildren: x, dirs: D } = u;
      S |= a.patchFlag & 16;
      const B = a.props || me,
        j = u.props || me;
      let K;
      p && yt(p, !1),
        (K = j.onVnodeBeforeUpdate) && Fe(K, p, u, a),
        D && Qe(u, a, p, "beforeUpdate"),
        p && yt(p, !0);
      const ee = y && u.type !== "foreignObject";
      if (
        (x
          ? Y(a.dynamicChildren, x, k, p, w, ee, C)
          : E || _e(a, u, k, null, p, w, ee, C, !1),
        S > 0)
      ) {
        if (S & 16) re(k, u, B, j, p, w, y);
        else if (
          (S & 2 && B.class !== j.class && r(k, "class", null, j.class, y),
          S & 4 && r(k, "style", B.style, j.style, y),
          S & 8)
        ) {
          const pe = u.dynamicProps;
          for (let fe = 0; fe < pe.length; fe++) {
            const be = pe[fe],
              De = B[be],
              At = j[be];
            (At !== De || be === "value") &&
              r(k, be, De, At, y, a.children, p, w, nt);
          }
        }
        S & 1 && a.children !== u.children && h(k, u.children);
      } else !E && x == null && re(k, u, B, j, p, w, y);
      ((K = j.onVnodeUpdated) || D) &&
        Te(() => {
          K && Fe(K, p, u, a), D && Qe(u, a, p, "updated");
        }, w);
    },
    Y = (a, u, p, w, y, C, E) => {
      for (let k = 0; k < u.length; k++) {
        const S = a[k],
          x = u[k],
          D =
            S.el && (S.type === q || !kt(S, x) || S.shapeFlag & 70)
              ? v(S.el)
              : p;
        F(S, x, D, null, w, y, C, E, !0);
      }
    },
    re = (a, u, p, w, y, C, E) => {
      if (p !== w) {
        if (p !== me)
          for (const k in p)
            !en(k) && !(k in w) && r(a, k, p[k], null, E, u.children, y, C, nt);
        for (const k in w) {
          if (en(k)) continue;
          const S = w[k],
            x = p[k];
          S !== x && k !== "value" && r(a, k, x, S, E, u.children, y, C, nt);
        }
        "value" in w && r(a, "value", p.value, w.value);
      }
    },
    O = (a, u, p, w, y, C, E, k, S) => {
      const x = (u.el = a ? a.el : l("")),
        D = (u.anchor = a ? a.anchor : l(""));
      let { patchFlag: B, dynamicChildren: j, slotScopeIds: K } = u;
      K && (k = k ? k.concat(K) : K),
        a == null
          ? (s(x, p, w), s(D, p, w), M(u.children, p, D, y, C, E, k, S))
          : B > 0 && B & 64 && j && a.dynamicChildren
          ? (Y(a.dynamicChildren, j, p, y, C, E, k),
            (u.key != null || (y && u === y.subTree)) && li(a, u, !0))
          : _e(a, u, p, D, y, C, E, k, S);
    },
    X = (a, u, p, w, y, C, E, k, S) => {
      (u.slotScopeIds = k),
        a == null
          ? u.shapeFlag & 512
            ? y.ctx.activate(u, p, w, E, S)
            : R(u, p, w, y, C, E, S)
          : Ee(a, u, S);
    },
    R = (a, u, p, w, y, C, E) => {
      const k = (a.component = Mc(a, w, y));
      if ((Xn(a) && (k.ctx.renderer = Mt), Ac(k), k.asyncDep)) {
        if ((y && y.registerDep(k, ue), !a.el)) {
          const S = (k.subTree = V(Ie));
          $(null, S, u, p);
        }
        return;
      }
      ue(k, a, u, p, y, C, E);
    },
    Ee = (a, u, p) => {
      const w = (u.component = a.component);
      if (ql(a, u, p))
        if (w.asyncDep && !w.asyncResolved) {
          ge(w, u, p);
          return;
        } else (w.next = u), Dl(w.update), w.update();
      else (u.el = a.el), (w.vnode = u);
    },
    ue = (a, u, p, w, y, C, E) => {
      const k = () => {
          if (a.isMounted) {
            let { next: D, bu: B, u: j, parent: K, vnode: ee } = a,
              pe = D,
              fe;
            yt(a, !1),
              D ? ((D.el = ee.el), ge(a, D, E)) : (D = ee),
              B && as(B),
              (fe = D.props && D.props.onVnodeBeforeUpdate) && Fe(fe, K, D, ee),
              yt(a, !0);
            const be = us(a),
              De = a.subTree;
            (a.subTree = be),
              F(De, be, v(De.el), _n(De), a, y, C),
              (D.el = be.el),
              pe === null && Gl(a, be.el),
              j && Te(j, y),
              (fe = D.props && D.props.onVnodeUpdated) &&
                Te(() => Fe(fe, K, D, ee), y);
          } else {
            let D;
            const { el: B, props: j } = u,
              { bm: K, m: ee, parent: pe } = a,
              fe = Ft(u);
            if (
              (yt(a, !1),
              K && as(K),
              !fe && (D = j && j.onVnodeBeforeMount) && Fe(D, pe, u),
              yt(a, !0),
              B && ls)
            ) {
              const be = () => {
                (a.subTree = us(a)), ls(B, a.subTree, a, y, null);
              };
              fe
                ? u.type.__asyncLoader().then(() => !a.isUnmounted && be())
                : be();
            } else {
              const be = (a.subTree = us(a));
              F(null, be, p, w, a, y, C), (u.el = be.el);
            }
            if ((ee && Te(ee, y), !fe && (D = j && j.onVnodeMounted))) {
              const be = u;
              Te(() => Fe(D, pe, be), y);
            }
            (u.shapeFlag & 256 ||
              (pe && Ft(pe.vnode) && pe.vnode.shapeFlag & 256)) &&
              a.a &&
              Te(a.a, y),
              (a.isMounted = !0),
              (u = p = w = null);
          }
        },
        S = (a.effect = new Rs(k, () => Xs(x), a.scope)),
        x = (a.update = () => S.run());
      (x.id = a.uid), yt(a, !0), x();
    },
    ge = (a, u, p) => {
      u.component = a;
      const w = a.vnode.props;
      (a.vnode = u),
        (a.next = null),
        pc(a, u.props, w, p),
        gc(a, u.children, p),
        qt(),
        To(),
        Gt();
    },
    _e = (a, u, p, w, y, C, E, k, S = !1) => {
      const x = a && a.children,
        D = a ? a.shapeFlag : 0,
        B = u.children,
        { patchFlag: j, shapeFlag: K } = u;
      if (j > 0) {
        if (j & 128) {
          hn(x, B, p, w, y, C, E, k, S);
          return;
        } else if (j & 256) {
          gt(x, B, p, w, y, C, E, k, S);
          return;
        }
      }
      K & 8
        ? (D & 16 && nt(x, y, C), B !== x && h(p, B))
        : D & 16
        ? K & 16
          ? hn(x, B, p, w, y, C, E, k, S)
          : nt(x, y, C, !0)
        : (D & 8 && h(p, ""), K & 16 && M(B, p, w, y, C, E, k, S));
    },
    gt = (a, u, p, w, y, C, E, k, S) => {
      (a = a || Ot), (u = u || Ot);
      const x = a.length,
        D = u.length,
        B = Math.min(x, D);
      let j;
      for (j = 0; j < B; j++) {
        const K = (u[j] = S ? ut(u[j]) : je(u[j]));
        F(a[j], K, p, null, y, C, E, k, S);
      }
      x > D ? nt(a, y, C, !0, !1, B) : M(u, p, w, y, C, E, k, S, B);
    },
    hn = (a, u, p, w, y, C, E, k, S) => {
      let x = 0;
      const D = u.length;
      let B = a.length - 1,
        j = D - 1;
      for (; x <= B && x <= j; ) {
        const K = a[x],
          ee = (u[x] = S ? ut(u[x]) : je(u[x]));
        if (kt(K, ee)) F(K, ee, p, null, y, C, E, k, S);
        else break;
        x++;
      }
      for (; x <= B && x <= j; ) {
        const K = a[B],
          ee = (u[j] = S ? ut(u[j]) : je(u[j]));
        if (kt(K, ee)) F(K, ee, p, null, y, C, E, k, S);
        else break;
        B--, j--;
      }
      if (x > B) {
        if (x <= j) {
          const K = j + 1,
            ee = K < D ? u[K].el : w;
          for (; x <= j; )
            F(null, (u[x] = S ? ut(u[x]) : je(u[x])), p, ee, y, C, E, k, S),
              x++;
        }
      } else if (x > j) for (; x <= B; ) Ge(a[x], y, C, !0), x++;
      else {
        const K = x,
          ee = x,
          pe = new Map();
        for (x = ee; x <= j; x++) {
          const Me = (u[x] = S ? ut(u[x]) : je(u[x]));
          Me.key != null && pe.set(Me.key, x);
        }
        let fe,
          be = 0;
        const De = j - ee + 1;
        let At = !1,
          mo = 0;
        const Qt = new Array(De);
        for (x = 0; x < De; x++) Qt[x] = 0;
        for (x = K; x <= B; x++) {
          const Me = a[x];
          if (be >= De) {
            Ge(Me, y, C, !0);
            continue;
          }
          let Ye;
          if (Me.key != null) Ye = pe.get(Me.key);
          else
            for (fe = ee; fe <= j; fe++)
              if (Qt[fe - ee] === 0 && kt(Me, u[fe])) {
                Ye = fe;
                break;
              }
          Ye === void 0
            ? Ge(Me, y, C, !0)
            : ((Qt[Ye - ee] = x + 1),
              Ye >= mo ? (mo = Ye) : (At = !0),
              F(Me, u[Ye], p, null, y, C, E, k, S),
              be++);
        }
        const go = At ? Pc(Qt) : Ot;
        for (fe = go.length - 1, x = De - 1; x >= 0; x--) {
          const Me = ee + x,
            Ye = u[Me],
            bo = Me + 1 < D ? u[Me + 1].el : w;
          Qt[x] === 0
            ? F(null, Ye, p, bo, y, C, E, k, S)
            : At && (fe < 0 || x !== go[fe] ? bt(Ye, p, bo, 2) : fe--);
        }
      }
    },
    bt = (a, u, p, w, y = null) => {
      const { el: C, type: E, transition: k, children: S, shapeFlag: x } = a;
      if (x & 6) {
        bt(a.component.subTree, u, p, w);
        return;
      }
      if (x & 128) {
        a.suspense.move(u, p, w);
        return;
      }
      if (x & 64) {
        E.move(a, u, p, Mt);
        return;
      }
      if (E === q) {
        s(C, u, p);
        for (let B = 0; B < S.length; B++) bt(S[B], u, p, w);
        s(a.anchor, u, p);
        return;
      }
      if (E === Ht) {
        A(a, u, p);
        return;
      }
      if (w !== 2 && x & 1 && k)
        if (w === 0) k.beforeEnter(C), s(C, u, p), Te(() => k.enter(C), y);
        else {
          const { leave: B, delayLeave: j, afterLeave: K } = k,
            ee = () => s(C, u, p),
            pe = () => {
              B(C, () => {
                ee(), K && K();
              });
            };
          j ? j(C, ee, pe) : pe();
        }
      else s(C, u, p);
    },
    Ge = (a, u, p, w = !1, y = !1) => {
      const {
        type: C,
        props: E,
        ref: k,
        children: S,
        dynamicChildren: x,
        shapeFlag: D,
        patchFlag: B,
        dirs: j,
      } = a;
      if ((k != null && En(k, null, p, a, !0), D & 256)) {
        u.ctx.deactivate(a);
        return;
      }
      const K = D & 1 && j,
        ee = !Ft(a);
      let pe;
      if ((ee && (pe = E && E.onVnodeBeforeUnmount) && Fe(pe, u, a), D & 6))
        Ni(a.component, p, w);
      else {
        if (D & 128) {
          a.suspense.unmount(p, w);
          return;
        }
        K && Qe(a, null, u, "beforeUnmount"),
          D & 64
            ? a.type.remove(a, u, p, y, Mt, w)
            : x && (C !== q || (B > 0 && B & 64))
            ? nt(x, u, p, !1, !0)
            : ((C === q && B & 384) || (!y && D & 16)) && nt(S, u, p),
          w && po(a);
      }
      ((ee && (pe = E && E.onVnodeUnmounted)) || K) &&
        Te(() => {
          pe && Fe(pe, u, a), K && Qe(a, null, u, "unmounted");
        }, p);
    },
    po = (a) => {
      const { type: u, el: p, anchor: w, transition: y } = a;
      if (u === q) {
        Ii(p, w);
        return;
      }
      if (u === Ht) {
        W(a);
        return;
      }
      const C = () => {
        o(p), y && !y.persisted && y.afterLeave && y.afterLeave();
      };
      if (a.shapeFlag & 1 && y && !y.persisted) {
        const { leave: E, delayLeave: k } = y,
          S = () => E(p, C);
        k ? k(a.el, C, S) : S();
      } else C();
    },
    Ii = (a, u) => {
      let p;
      for (; a !== u; ) (p = b(a)), o(a), (a = p);
      o(u);
    },
    Ni = (a, u, p) => {
      const { bum: w, scope: y, update: C, subTree: E, um: k } = a;
      w && as(w),
        y.stop(),
        C && ((C.active = !1), Ge(E, a, u, p)),
        k && Te(k, u),
        Te(() => {
          a.isUnmounted = !0;
        }, u),
        u &&
          u.pendingBranch &&
          !u.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === u.pendingId &&
          (u.deps--, u.deps === 0 && u.resolve());
    },
    nt = (a, u, p, w = !1, y = !1, C = 0) => {
      for (let E = C; E < a.length; E++) Ge(a[E], u, p, w, y);
    },
    _n = (a) =>
      a.shapeFlag & 6
        ? _n(a.component.subTree)
        : a.shapeFlag & 128
        ? a.suspense.next()
        : b(a.anchor || a.el),
    vo = (a, u, p) => {
      a == null
        ? u._vnode && Ge(u._vnode, null, null, !0)
        : F(u._vnode || null, a, u, null, null, null, p),
        To(),
        Vn(),
        (u._vnode = a);
    },
    Mt = {
      p: F,
      um: Ge,
      m: bt,
      r: po,
      mt: R,
      mc: M,
      pc: _e,
      pbc: Y,
      n: _n,
      o: e,
    };
  let is, ls;
  return (
    t && ([is, ls] = t(Mt)), { render: vo, hydrate: is, createApp: yc(vo, is) }
  );
}
function yt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function li(e, t, n = !1) {
  const s = e.children,
    o = t.children;
  if (oe(s) && oe(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let l = o[r];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = o[r] = ut(o[r])), (l.el = i.el)),
        n || li(i, l)),
        l.type === Ut && (l.el = i.el);
    }
}
function Pc(e) {
  const t = e.slice(),
    n = [0];
  let s, o, r, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const f = e[s];
    if (f !== 0) {
      if (((o = n[n.length - 1]), e[o] < f)) {
        (t[s] = o), n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        (l = (r + i) >> 1), e[n[l]] < f ? (r = l + 1) : (i = l);
      f < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), (n[r] = s));
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; ) (n[r] = i), (i = t[i]);
  return n;
}
const kc = (e) => e.__isTeleport,
  q = Symbol(void 0),
  Ut = Symbol(void 0),
  Ie = Symbol(void 0),
  Ht = Symbol(void 0),
  nn = [];
let Ue = null;
function d(e = !1) {
  nn.push((Ue = e ? null : []));
}
function Cc() {
  nn.pop(), (Ue = nn[nn.length - 1] || null);
}
let an = 1;
function Ho(e) {
  an += e;
}
function ci(e) {
  return (
    (e.dynamicChildren = an > 0 ? Ue || Ot : null),
    Cc(),
    an > 0 && Ue && Ue.push(e),
    e
  );
}
function m(e, t, n, s, o, r) {
  return ci(g(e, t, n, s, o, r, !0));
}
function G(e, t, n, s, o) {
  return ci(V(e, t, n, s, o, !0));
}
function Mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function kt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const es = "__vInternal",
  ai = ({ key: e }) => (e != null ? e : null),
  kn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? Se(e) || xe(e) || Z(e)
        ? { i: Pe, r: e, k: t, f: !!n }
        : e
      : null;
function g(
  e,
  t = null,
  n = null,
  s = 0,
  o = null,
  r = e === q ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ai(t),
    ref: t && kn(t),
    scopeId: Yn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe,
  };
  return (
    l
      ? (oo(c, n), r & 128 && e.normalize(c))
      : n && (c.shapeFlag |= Se(n) ? 8 : 16),
    an > 0 &&
      !i &&
      Ue &&
      (c.patchFlag > 0 || r & 6) &&
      c.patchFlag !== 32 &&
      Ue.push(c),
    c
  );
}
const V = Sc;
function Sc(e, t = null, n = null, s = 0, o = null, r = !1) {
  if (((!e || e === Jr) && (e = Ie), Mn(e))) {
    const l = pt(e, t, !0);
    return (
      n && oo(l, n),
      an > 0 &&
        !r &&
        Ue &&
        (l.shapeFlag & 6 ? (Ue[Ue.indexOf(e)] = l) : Ue.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Fc(e) && (e = e.__vccOpts), t)) {
    t = Vc(t);
    let { class: l, style: c } = t;
    l && !Se(l) && (t.class = de(l)),
      ye(c) && (Cr(c) && !oe(c) && (c = Oe({}, c)), (t.style = zn(c)));
  }
  const i = Se(e) ? 1 : Yl(e) ? 128 : kc(e) ? 64 : ye(e) ? 4 : Z(e) ? 2 : 0;
  return g(e, t, n, s, o, i, r, !0);
}
function Vc(e) {
  return e ? (Cr(e) || es in e ? Oe({}, e) : e) : null;
}
function pt(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: r, children: i } = e,
    l = t ? Cn(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ai(l),
    ref:
      t && t.ref
        ? n && o
          ? oe(o)
            ? o.concat(kn(t))
            : [o, kn(t)]
          : kn(t)
        : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== q ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && pt(e.ssContent),
    ssFallback: e.ssFallback && pt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
  };
}
function Ve(e = " ", t = 0) {
  return V(Ut, null, e, t);
}
function Tc(e, t) {
  const n = V(Ht, null, e);
  return (n.staticCount = t), n;
}
function z(e = "", t = !1) {
  return t ? (d(), G(Ie, null, e)) : V(Ie, null, e);
}
function je(e) {
  return e == null || typeof e == "boolean"
    ? V(Ie)
    : oe(e)
    ? V(q, null, e.slice())
    : typeof e == "object"
    ? ut(e)
    : V(Ut, null, String(e));
}
function ut(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : pt(e);
}
function oo(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (oe(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), oo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(es in t)
        ? (t._ctx = Pe)
        : o === 3 &&
          Pe &&
          (Pe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Z(t)
      ? ((t = { default: t, _ctx: Pe }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Ve(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Cn(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = de([t.class, s.class]));
      else if (o === "style") t.style = zn([t.style, s.style]);
      else if (Un(o)) {
        const r = t[o],
          i = s[o];
        i &&
          r !== i &&
          !(oe(r) && r.includes(i)) &&
          (t[o] = r ? [].concat(r, i) : i);
      } else o !== "" && (t[o] = s[o]);
  }
  return t;
}
function Fe(e, t, n, s = null) {
  He(e, t, 7, [n, s]);
}
const Lc = ii();
let Ec = 0;
function Mc(e, t, n) {
  const s = e.type,
    o = (t ? t.appContext : e.appContext) || Lc,
    r = {
      uid: Ec++,
      vnode: e,
      type: s,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Wi(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ni(s, o),
      emitsOptions: jr(s, o),
      emit: null,
      emitted: null,
      propsDefaults: me,
      inheritAttrs: s.inheritAttrs,
      ctx: me,
      data: me,
      props: me,
      attrs: me,
      slots: me,
      refs: me,
      setupState: me,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = Ul.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let we = null;
const ro = () => we || Pe,
  Kt = (e) => {
    (we = e), e.scope.on();
  },
  Tt = () => {
    we && we.scope.off(), (we = null);
  };
function ui(e) {
  return e.vnode.shapeFlag & 4;
}
let un = !1;
function Ac(e, t = !1) {
  un = t;
  const { props: n, children: s } = e.vnode,
    o = ui(e);
  _c(e, n, o, t), mc(e, s);
  const r = o ? Ic(e, t) : void 0;
  return (un = !1), r;
}
function Ic(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Zt(new Proxy(e.ctx, cc)));
  const { setup: s } = n;
  if (s) {
    const o = (e.setupContext = s.length > 1 ? Oc(e) : null);
    Kt(e), qt();
    const r = ht(s, e, 0, [e.props, o]);
    if ((Gt(), Tt(), Or(r))) {
      if ((r.then(Tt, Tt), t))
        return r
          .then((i) => {
            Ro(e, i, t);
          })
          .catch((i) => {
            qn(i, e, 0);
          });
      e.asyncDep = r;
    } else Ro(e, r, t);
  } else fi(e, t);
}
function Ro(e, t, n) {
  Z(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ye(t) && (e.setupState = Lr(t)),
    fi(e, n);
}
let Do;
function fi(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Do && !s.render) {
      const o = s.template || no(e).template;
      if (o) {
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = s,
          f = Oe(Oe({ isCustomElement: r, delimiters: l }, i), c);
        s.render = Do(o, f);
      }
    }
    e.render = s.render || Xe;
  }
  Kt(e), qt(), ac(e), Gt(), Tt();
}
function Nc(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Ne(e, "get", "$attrs"), t[n];
    },
  });
}
function Oc(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = Nc(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function io(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Lr(Zt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in tn) return tn[n](e);
        },
        has(t, n) {
          return n in t || n in tn;
        },
      }))
    );
}
function Bc(e, t = !0) {
  return Z(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Fc(e) {
  return Z(e) && "__vccOpts" in e;
}
const se = (e, t) => Cl(e, t, un);
function An(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? ye(t) && !oe(t)
      ? Mn(t)
        ? V(e, null, [t])
        : V(e, t)
      : V(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Mn(n) && (n = [n]),
      V(e, t, n));
}
const Hc = Symbol(""),
  Rc = () => Ke(Hc),
  Dc = "3.2.45";
function jc(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let o = 0; o < s.length; o++) n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const zc =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Uc = jc(zc);
function di(e) {
  return !!e || e === "";
}
const Kc = /^on[^a-z]/,
  Wc = (e) => Kc.test(e),
  qc = (e) => e.startsWith("onUpdate:"),
  lo = Object.assign,
  ts = Array.isArray,
  Gc = (e) => typeof e == "function",
  In = (e) => typeof e == "string",
  Yc = (e) => e !== null && typeof e == "object",
  hi = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Qc = /\B([A-Z])/g,
  _i = hi((e) => e.replace(Qc, "-$1").toLowerCase()),
  Jc = hi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Xc = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Zc = "http://www.w3.org/2000/svg",
  Ct = typeof document < "u" ? document : null,
  jo = Ct && Ct.createElement("template"),
  ea = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const o = t
        ? Ct.createElementNS(Zc, e)
        : Ct.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          o.setAttribute("multiple", s.multiple),
        o
      );
    },
    createText: (e) => Ct.createTextNode(e),
    createComment: (e) => Ct.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ct.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, o, r) {
      const i = n ? n.previousSibling : t.lastChild;
      if (o && (o === r || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === r || !(o = o.nextSibling));

        );
      else {
        jo.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = jo.content;
        if (s) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function ta(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function na(e, t, n) {
  const s = e.style,
    o = In(n);
  if (n && !o) {
    for (const r in n) Es(s, r, n[r]);
    if (t && !In(t)) for (const r in t) n[r] == null && Es(s, r, "");
  } else {
    const r = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = r);
  }
}
const zo = /\s*!important$/;
function Es(e, t, n) {
  if (ts(n)) n.forEach((s) => Es(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = sa(e, t);
    zo.test(n)
      ? e.setProperty(_i(s), n.replace(zo, ""), "important")
      : (e[s] = n);
  }
}
const Uo = ["Webkit", "Moz", "ms"],
  hs = {};
function sa(e, t) {
  const n = hs[t];
  if (n) return n;
  let s = et(t);
  if (s !== "filter" && s in e) return (hs[t] = s);
  s = Jc(s);
  for (let o = 0; o < Uo.length; o++) {
    const r = Uo[o] + s;
    if (r in e) return (hs[t] = r);
  }
  return t;
}
const Ko = "http://www.w3.org/1999/xlink";
function oa(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ko, t.slice(6, t.length))
      : e.setAttributeNS(Ko, t, n);
  else {
    const r = Uc(t);
    n == null || (r && !di(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? "" : n);
  }
}
function ra(e, t, n, s, o, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, o, r), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const c = n == null ? "" : n;
    (e.value !== c || e.tagName === "OPTION") && (e.value = c),
      n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = di(n))
      : n == null && c === "string"
      ? ((n = ""), (l = !0))
      : c === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function ia(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function la(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function ca(e, t, n, s, o = null) {
  const r = e._vei || (e._vei = {}),
    i = r[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = aa(t);
    if (s) {
      const f = (r[t] = da(s, o));
      ia(e, l, f, c);
    } else i && (la(e, l, i, c), (r[t] = void 0));
  }
}
const Wo = /(?:Once|Passive|Capture)$/;
function aa(e) {
  let t;
  if (Wo.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Wo)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : _i(e.slice(2)), t];
}
let _s = 0;
const ua = Promise.resolve(),
  fa = () => _s || (ua.then(() => (_s = 0)), (_s = Date.now()));
function da(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    He(ha(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = fa()), n;
}
function ha(e, t) {
  if (ts(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (o) => !o._stopped && s && s(o))
    );
  } else return t;
}
const qo = /^on[a-z]/,
  _a = (e, t, n, s, o = !1, r, i, l, c) => {
    t === "class"
      ? ta(e, s, o)
      : t === "style"
      ? na(e, n, s)
      : Wc(t)
      ? qc(t) || ca(e, t, n, s, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : pa(e, t, s, o)
        )
      ? ra(e, t, s, r, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        oa(e, t, s, o));
  };
function pa(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && qo.test(t) && Gc(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (qo.test(t) && In(n))
    ? !1
    : t in e;
}
function va(e) {
  const t = ro();
  if (!t) return;
  const n = (t.ut = (o = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
      ).forEach((r) => As(r, o));
    }),
    s = () => {
      const o = e(t.proxy);
      Ms(t.subTree, o), n(o);
    };
  Ur(s),
    Re(() => {
      const o = new MutationObserver(s);
      o.observe(t.subTree.el.parentNode, { childList: !0 }),
        vt(() => o.disconnect());
    });
}
function Ms(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          Ms(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) As(e.el, t);
  else if (e.type === q) e.children.forEach((n) => Ms(n, t));
  else if (e.type === Ht) {
    let { el: n, anchor: s } = e;
    for (; n && (As(n, t), n !== s); ) n = n.nextSibling;
  }
}
function As(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t) n.setProperty(`--${s}`, t[s]);
  }
}
const ct = "transition",
  Jt = "animation",
  ns = (e, { slots: t }) => An(Wr, ma(e), t);
ns.displayName = "Transition";
const pi = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
ns.props = lo({}, Wr.props, pi);
const wt = (e, t = []) => {
    ts(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Go = (e) => (e ? (ts(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function ma(e) {
  const t = {};
  for (const O in e) O in pi || (t[O] = e[O]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: s,
      duration: o,
      enterFromClass: r = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = r,
      appearActiveClass: f = i,
      appearToClass: h = l,
      leaveFromClass: v = `${n}-leave-from`,
      leaveActiveClass: b = `${n}-leave-active`,
      leaveToClass: P = `${n}-leave-to`,
    } = e,
    U = ga(o),
    F = U && U[0],
    te = U && U[1],
    {
      onBeforeEnter: $,
      onEnter: L,
      onEnterCancelled: A,
      onLeave: W,
      onLeaveCancelled: J,
      onBeforeAppear: he = $,
      onAppear: ne = L,
      onAppearCancelled: M = A,
    } = t,
    Q = (O, X, R) => {
      $t(O, X ? h : l), $t(O, X ? f : i), R && R();
    },
    Y = (O, X) => {
      (O._isLeaving = !1), $t(O, v), $t(O, P), $t(O, b), X && X();
    },
    re = (O) => (X, R) => {
      const Ee = O ? ne : L,
        ue = () => Q(X, O, R);
      wt(Ee, [X, ue]),
        Yo(() => {
          $t(X, O ? c : r), at(X, O ? h : l), Go(Ee) || Qo(X, s, F, ue);
        });
    };
  return lo(t, {
    onBeforeEnter(O) {
      wt($, [O]), at(O, r), at(O, i);
    },
    onBeforeAppear(O) {
      wt(he, [O]), at(O, c), at(O, f);
    },
    onEnter: re(!1),
    onAppear: re(!0),
    onLeave(O, X) {
      O._isLeaving = !0;
      const R = () => Y(O, X);
      at(O, v),
        wa(),
        at(O, b),
        Yo(() => {
          !O._isLeaving || ($t(O, v), at(O, P), Go(W) || Qo(O, s, te, R));
        }),
        wt(W, [O, R]);
    },
    onEnterCancelled(O) {
      Q(O, !1), wt(A, [O]);
    },
    onAppearCancelled(O) {
      Q(O, !0), wt(M, [O]);
    },
    onLeaveCancelled(O) {
      Y(O), wt(J, [O]);
    },
  });
}
function ga(e) {
  if (e == null) return null;
  if (Yc(e)) return [ps(e.enter), ps(e.leave)];
  {
    const t = ps(e);
    return [t, t];
  }
}
function ps(e) {
  return Xc(e);
}
function at(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function $t(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Yo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ba = 0;
function Qo(e, t, n, s) {
  const o = (e._endId = ++ba),
    r = () => {
      o === e._endId && s();
    };
  if (n) return setTimeout(r, n);
  const { type: i, timeout: l, propCount: c } = ya(e, t);
  if (!i) return s();
  const f = i + "end";
  let h = 0;
  const v = () => {
      e.removeEventListener(f, b), r();
    },
    b = (P) => {
      P.target === e && ++h >= c && v();
    };
  setTimeout(() => {
    h < c && v();
  }, l + 1),
    e.addEventListener(f, b);
}
function ya(e, t) {
  const n = window.getComputedStyle(e),
    s = (U) => (n[U] || "").split(", "),
    o = s(`${ct}Delay`),
    r = s(`${ct}Duration`),
    i = Jo(o, r),
    l = s(`${Jt}Delay`),
    c = s(`${Jt}Duration`),
    f = Jo(l, c);
  let h = null,
    v = 0,
    b = 0;
  t === ct
    ? i > 0 && ((h = ct), (v = i), (b = r.length))
    : t === Jt
    ? f > 0 && ((h = Jt), (v = f), (b = c.length))
    : ((v = Math.max(i, f)),
      (h = v > 0 ? (i > f ? ct : Jt) : null),
      (b = h ? (h === ct ? r.length : c.length) : 0));
  const P =
    h === ct && /\b(transform|all)(,|$)/.test(s(`${ct}Property`).toString());
  return { type: h, timeout: v, propCount: b, hasTransform: P };
}
function Jo(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => Xo(n) + Xo(e[s])));
}
function Xo(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function wa() {
  return document.body.offsetHeight;
}
const $a = ["ctrl", "shift", "alt", "meta"],
  xa = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => $a.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Pa =
    (e, t) =>
    (n, ...s) => {
      for (let o = 0; o < t.length; o++) {
        const r = xa[t[o]];
        if (r && r(n, t)) return;
      }
      return e(n, ...s);
    },
  ka = lo({ patchProp: _a }, ea);
let vs,
  Zo = !1;
function Ca() {
  return (vs = Zo ? vs : $c(ka)), (Zo = !0), vs;
}
const Sa = (...e) => {
  const t = Ca().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const o = Va(s);
      if (o) return n(o, !0, o instanceof SVGElement);
    }),
    t
  );
};
function Va(e) {
  return In(e) ? document.querySelector(e) : e;
}
const N = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, o] of t) n[s] = o;
    return n;
  },
  Ta = "modulepreload",
  La = function (e) {
    return "/" + e;
  },
  er = {},
  Ea = function (t, n, s) {
    if (!n || n.length === 0) return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(
      n.map((r) => {
        if (((r = La(r)), r in er)) return;
        er[r] = !0;
        const i = r.endsWith(".css"),
          l = i ? '[rel="stylesheet"]' : "";
        if (!!s)
          for (let h = o.length - 1; h >= 0; h--) {
            const v = o[h];
            if (v.href === r && (!i || v.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${r}"]${l}`)) return;
        const f = document.createElement("link");
        if (
          ((f.rel = i ? "stylesheet" : Ta),
          i || ((f.as = "script"), (f.crossOrigin = "")),
          (f.href = r),
          document.head.appendChild(f),
          i)
        )
          return new Promise((h, v) => {
            f.addEventListener("load", h),
              f.addEventListener("error", () =>
                v(new Error(`Unable to preload CSS for ${r}`))
              );
          });
      })
    ).then(() => t());
  };
const Ma = H({
  __name: "VPBadge",
  props: { text: null, type: null },
  setup(e) {
    return (t, n) => {
      var s;
      return (
        d(),
        m(
          "span",
          { class: de(["VPBadge", (s = e.type) != null ? s : "tip"]) },
          [T(t.$slots, "default", {}, () => [Ve(ae(e.text), 1)], !0)],
          2
        )
      );
    };
  },
});
const Aa = N(Ma, [["__scopeId", "data-v-8d21f6c9"]]),
  Ia = JSON.parse(
    '{"lang":"es-ES","title":"Mis apuntes","description":"Mis apuntes de programaci\xF3n","base":"/","head":[],"appearance":true,"themeConfig":{"outline":[2,3],"outlineTitle":"En esta p\xE1gina"},"locales":{},"langs":{},"scrollOffset":90,"cleanUrls":"disabled"}'
  ),
  ss = /^[a-z]+:/i,
  tr = "vitepress-theme-appearance",
  Le = typeof window < "u",
  vi = {
    relativePath: "",
    title: "404",
    description: "Not Found",
    headers: [],
    frontmatter: { sidebar: !1, layout: "page" },
    lastUpdated: 0,
  };
function Na(e, t) {
  t.sort((n, s) => {
    const o = s.split("/").length - n.split("/").length;
    return o !== 0 ? o : s.length - n.length;
  });
  for (const n of t) if (e.startsWith(n)) return n;
}
function nr(e, t) {
  const n = Na(t, Object.keys(e));
  return n ? e[n] : void 0;
}
function Oa(e) {
  const { locales: t } = e.themeConfig || {},
    n = e.locales;
  return t && n
    ? Object.keys(t).reduce(
        (s, o) => ((s[o] = { label: t[o].label, lang: n[o].lang }), s),
        {}
      )
    : {};
}
function Ba(e, t) {
  t = Ha(e, t);
  const n = nr(e.locales || {}, t),
    s = nr(e.themeConfig.locales || {}, t);
  return Object.assign({}, e, n, {
    themeConfig: Object.assign({}, e.themeConfig, s, { locales: {} }),
    lang: (n || e).lang,
    locales: {},
    langs: Oa(e),
  });
}
function mi(e, t) {
  var r;
  const n = t.title || e.title,
    s = (r = t.titleTemplate) != null ? r : e.titleTemplate;
  if (typeof s == "string" && s.includes(":title"))
    return s.replace(/:title/g, n);
  const o = Fa(e.title, s);
  return `${n}${o}`;
}
function Fa(e, t) {
  return t === !1
    ? ""
    : t === !0 || t === void 0
    ? ` | ${e}`
    : e === t
    ? ""
    : ` | ${t}`;
}
function Ha(e, t) {
  if (!Le) return t;
  const n = e.base,
    s = n.endsWith("/") ? n.slice(0, -1) : n;
  return t.slice(s.length);
}
function Ra(e, t) {
  const [n, s] = t;
  if (n !== "meta") return !1;
  const o = Object.entries(s)[0];
  return o == null ? !1 : e.some(([r, i]) => r === n && i[o[0]] === o[1]);
}
function Da(e, t) {
  return [...e.filter((n) => !Ra(t, n)), ...t];
}
const ja = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  za = /^[a-z]:/i;
function sr(e) {
  const t = za.exec(e),
    n = t ? t[0] : "";
  return (
    n +
    e
      .slice(n.length)
      .replace(ja, "_")
      .replace(/(^|\/)_+(?=[^/]*$)/, "$1")
  );
}
function Ua(e, t) {
  return `${e}${t}`.replace(/\/+/g, "/");
}
function fn(e) {
  return ss.test(e) ? e : Ua(Wt.value.base, e);
}
function gi(e) {
  let t = e.replace(/\.html$/, "");
  if (((t = decodeURIComponent(t)), t.endsWith("/") && (t += "index"), Le)) {
    const n = "/";
    t = sr(t.slice(n.length).replace(/\//g, "_") || "index") + ".md";
    const s = __VP_HASH_MAP__[t.toLowerCase()];
    t = `${n}assets/${t}.${s}.js`;
  } else t = `./${sr(t.slice(1).replace(/\//g, "_"))}.md.js`;
  return t;
}
const bi = Symbol(),
  Wt = $l(Ia);
function Ka(e) {
  const t = se(() => Ba(Wt.value, e.path));
  return {
    site: t,
    theme: se(() => t.value.themeConfig),
    page: se(() => e.data),
    frontmatter: se(() => e.data.frontmatter),
    lang: se(() => t.value.lang),
    localePath: se(() => {
      const { langs: n, lang: s } = t.value,
        o = Object.keys(n).find((r) => n[r].lang === s);
      return fn(o || "/");
    }),
    title: se(() => mi(t.value, e.data)),
    description: se(() => e.data.description || t.value.description),
    isDark: ve(!1),
  };
}
function ie() {
  const e = Ke(bi);
  if (!e) throw new Error("vitepress data not properly injected in app");
  return e;
}
const yi = Symbol(),
  or = "http://a.com",
  Wa = () => ({ path: "/", component: null, data: vi });
function qa(e, t) {
  const n = jn(Wa()),
    s = { route: n, go: o };
  async function o(l = Le ? location.href : "/") {
    var f, h;
    await ((f = s.onBeforeRouteChange) == null ? void 0 : f.call(s, l));
    const c = new URL(l, or);
    Wt.value.cleanUrls === "disabled" &&
      !c.pathname.endsWith("/") &&
      !c.pathname.endsWith(".html") &&
      ((c.pathname += ".html"), (l = c.pathname + c.search + c.hash)),
      Le &&
        (history.replaceState(
          { scrollPosition: window.scrollY },
          document.title
        ),
        history.pushState(null, "", l)),
      await i(l),
      await ((h = s.onAfterRouteChanged) == null ? void 0 : h.call(s, l));
  }
  let r = null;
  async function i(l, c = 0, f = !1) {
    const h = new URL(l, or),
      v = (r = h.pathname);
    try {
      let b = await e(v);
      if (r === v) {
        r = null;
        const { default: P, __pageData: U } = b;
        if (!P) throw new Error(`Invalid route component: ${P}`);
        (n.path = Le ? v : fn(v)),
          (n.component = Zt(P)),
          (n.data = Zt(U)),
          Le &&
            Js(() => {
              if (h.hash && !c) {
                let F = null;
                try {
                  F = document.querySelector(decodeURIComponent(h.hash));
                } catch (te) {
                  console.warn(te);
                }
                if (F) {
                  rr(F, h.hash);
                  return;
                }
              }
              window.scrollTo(0, c);
            });
      }
    } catch (b) {
      if (
        (!/fetch/.test(b.message) &&
          !/^\/404(\.html|\/)?$/.test(l) &&
          console.error(b),
        !f)
      )
        try {
          const P = await fetch(Wt.value.base + "hashmap.json");
          (window.__VP_HASH_MAP__ = await P.json()), await i(l, c, !0);
          return;
        } catch {}
      r === v &&
        ((r = null),
        (n.path = Le ? v : fn(v)),
        (n.component = t ? Zt(t) : null),
        (n.data = vi));
    }
  }
  return (
    Le &&
      (window.addEventListener(
        "click",
        (l) => {
          if (l.target.closest("button")) return;
          const f = l.target.closest("a");
          if (f && !f.closest(".vp-raw") && !f.download) {
            const {
                href: h,
                origin: v,
                pathname: b,
                hash: P,
                search: U,
                target: F,
              } = f,
              te = window.location,
              $ = b.match(/\.\w+$/);
            !l.ctrlKey &&
              !l.shiftKey &&
              !l.altKey &&
              !l.metaKey &&
              F !== "_blank" &&
              v === te.origin &&
              !($ && $[0] !== ".html") &&
              (l.preventDefault(),
              b === te.pathname && U === te.search
                ? P &&
                  P !== te.hash &&
                  (history.pushState(null, "", P),
                  window.dispatchEvent(new Event("hashchange")),
                  rr(f, P, f.classList.contains("header-anchor")))
                : o(h));
          }
        },
        { capture: !0 }
      ),
      window.addEventListener("popstate", (l) => {
        i(location.href, (l.state && l.state.scrollPosition) || 0);
      }),
      window.addEventListener("hashchange", (l) => {
        l.preventDefault();
      })),
    s
  );
}
function Ga() {
  const e = Ke(yi);
  if (!e) throw new Error("useRouter() is called without provider.");
  return e;
}
function mt() {
  return Ga().route;
}
function rr(e, t, n = !1) {
  let s = null;
  try {
    s = e.classList.contains("header-anchor")
      ? e
      : document.querySelector(decodeURIComponent(t));
  } catch (o) {
    console.warn(o);
  }
  if (s) {
    let o = Wt.value.scrollOffset;
    typeof o == "string" &&
      (o = document.querySelector(o).getBoundingClientRect().bottom + 24);
    const r = parseInt(window.getComputedStyle(s).paddingTop, 10),
      i = window.scrollY + s.getBoundingClientRect().top - o + r;
    !n || Math.abs(i - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, i)
      : window.scrollTo({ left: 0, top: i, behavior: "smooth" });
  }
}
const Ya = H({
    name: "VitePressContent",
    props: { onContentUpdated: Function },
    setup(e) {
      const t = mt();
      return (
        Zs(() => {
          var n;
          (n = e.onContentUpdated) == null || n.call(e);
        }),
        () =>
          An("div", { style: { position: "relative" } }, [
            t.component ? An(t.component) : null,
          ])
      );
    },
  }),
  wi = /#.*$/,
  Qa = /(index)?\.(md|html)$/,
  Ja = typeof window < "u",
  Xa = ve(Ja ? location.hash : "");
function Za(e) {
  return ss.test(e);
}
function eu(e, t) {
  let n,
    s = !1;
  return () => {
    n && clearTimeout(n),
      s
        ? (n = setTimeout(e, t))
        : (e(),
          (s = !0),
          setTimeout(() => {
            s = !1;
          }, t));
  };
}
function Yt(e, t, n = !1) {
  if (t === void 0) return !1;
  if (((e = lr(`/${e}`)), n)) return new RegExp(t).test(e);
  if (lr(t) !== e) return !1;
  const s = t.match(wi);
  return s ? Xa.value === s[0] : !0;
}
function ir(e) {
  return /^\//.test(e) ? e : `/${e}`;
}
function lr(e) {
  return decodeURI(e).replace(wi, "").replace(Qa, "");
}
function Nn(e) {
  if (Za(e)) return e;
  const { site: t } = ie(),
    { pathname: n, search: s, hash: o } = new URL(e, "http://example.com"),
    r =
      n.endsWith("/") || n.endsWith(".html")
        ? e
        : `${n.replace(
            /(\.md)?$/,
            t.value.cleanUrls === "disabled" ? ".html" : ""
          )}${s}${o}`;
  return fn(r);
}
function $i(e, t) {
  if (Array.isArray(e)) return e;
  if (e == null) return [];
  t = ir(t);
  const n = Object.keys(e)
    .sort((s, o) => o.split("/").length - s.split("/").length)
    .find((s) => t.startsWith(ir(s)));
  return n ? e[n] : [];
}
function tu(e) {
  const t = [];
  function n(s) {
    for (const o of s)
      o.link && t.push({ ...o, link: o.link }), "items" in o && n(o.items);
  }
  for (const s of e) n(s.items);
  return t;
}
function tt() {
  const e = mt(),
    { theme: t, frontmatter: n } = ie(),
    s = ve(!1),
    o = se(() => {
      const h = t.value.sidebar,
        v = e.data.relativePath;
      return h ? $i(h, v) : [];
    }),
    r = se(
      () =>
        n.value.sidebar !== !1 &&
        o.value.length > 0 &&
        n.value.layout !== "home"
    ),
    i = se(() => n.value.layout !== "home" && n.value.aside !== !1);
  function l() {
    s.value = !0;
  }
  function c() {
    s.value = !1;
  }
  function f() {
    s.value ? c() : l();
  }
  return {
    isOpen: s,
    sidebar: o,
    hasSidebar: r,
    hasAside: i,
    open: l,
    close: c,
    toggle: f,
  };
}
function nu(e, t) {
  let n;
  zt(() => {
    n = e.value ? document.activeElement : void 0;
  }),
    Re(() => {
      window.addEventListener("keyup", s);
    }),
    vt(() => {
      window.removeEventListener("keyup", s);
    });
  function s(o) {
    o.key === "Escape" && e.value && (t(), n == null || n.focus());
  }
}
const su = H({
  __name: "VPSkipLink",
  setup(e) {
    const t = mt(),
      n = ve();
    Ze(
      () => t.path,
      () => n.value.focus()
    );
    function s({ target: o }) {
      const r = document.querySelector(o.hash);
      if (r) {
        const i = () => {
          r.removeAttribute("tabindex"), r.removeEventListener("blur", i);
        };
        r.setAttribute("tabindex", "-1"),
          r.addEventListener("blur", i),
          r.focus(),
          window.scrollTo(0, 0);
      }
    }
    return (o, r) => (
      d(),
      m(
        q,
        null,
        [
          g(
            "span",
            { ref_key: "backToTop", ref: n, tabindex: "-1" },
            null,
            512
          ),
          g(
            "a",
            {
              href: "#VPContent",
              class: "VPSkipLink visually-hidden",
              onClick: s,
            },
            " Skip to content "
          ),
        ],
        64
      )
    );
  },
});
const ou = N(su, [["__scopeId", "data-v-151f2593"]]),
  ru = { key: 0, class: "VPBackdrop" },
  iu = H({
    __name: "VPBackdrop",
    props: { show: { type: Boolean } },
    setup(e) {
      return (t, n) => (
        d(),
        G(
          ns,
          { name: "fade" },
          { default: I(() => [e.show ? (d(), m("div", ru)) : z("", !0)]), _: 1 }
        )
      );
    },
  });
const lu = N(iu, [["__scopeId", "data-v-0164f098"]]);
function cu() {
  const e = ve(!1);
  function t() {
    (e.value = !0), window.addEventListener("resize", o);
  }
  function n() {
    (e.value = !1), window.removeEventListener("resize", o);
  }
  function s() {
    e.value ? n() : t();
  }
  function o() {
    window.outerWidth >= 768 && n();
  }
  const r = mt();
  return (
    Ze(() => r.path, n),
    { isScreenOpen: e, openScreen: t, closeScreen: n, toggleScreen: s }
  );
}
const au = ["src", "alt"],
  uu = { inheritAttrs: !1 },
  fu = H({
    ...uu,
    __name: "VPImage",
    props: { image: null, alt: null },
    setup(e) {
      return (t, n) => {
        var o;
        const s = Lt("VPImage", !0);
        return e.image
          ? (d(),
            m(
              q,
              { key: 0 },
              [
                typeof e.image == "string" || "src" in e.image
                  ? (d(),
                    m(
                      "img",
                      Cn(
                        { key: 0, class: "VPImage" },
                        typeof e.image == "string"
                          ? t.$attrs
                          : { ...e.image, ...t.$attrs },
                        {
                          src: _(fn)(
                            typeof e.image == "string" ? e.image : e.image.src
                          ),
                          alt:
                            (o = e.alt) != null
                              ? o
                              : typeof e.image == "string"
                              ? ""
                              : e.image.alt || "",
                        }
                      ),
                      null,
                      16,
                      au
                    ))
                  : (d(),
                    m(
                      q,
                      { key: 1 },
                      [
                        V(
                          s,
                          Cn(
                            {
                              class: "dark",
                              image: e.image.dark,
                              alt:
                                typeof e.image.dark == "string"
                                  ? e.image.alt
                                  : e.image.dark.alt || e.image.alt,
                            },
                            t.$attrs
                          ),
                          null,
                          16,
                          ["image", "alt"]
                        ),
                        V(
                          s,
                          Cn(
                            {
                              class: "light",
                              image: e.image.light,
                              alt:
                                typeof e.image.light == "string"
                                  ? e.image.alt
                                  : e.image.light.alt || e.image.alt,
                            },
                            t.$attrs
                          ),
                          null,
                          16,
                          ["image", "alt"]
                        ),
                      ],
                      64
                    )),
              ],
              64
            ))
          : z("", !0);
      };
    },
  });
const xi = N(fu, [["__scopeId", "data-v-b7ac6bd3"]]),
  du = ["href"],
  hu = H({
    __name: "VPNavBarTitle",
    setup(e) {
      const { site: t, theme: n } = ie(),
        { hasSidebar: s } = tt();
      return (o, r) => (
        d(),
        m(
          "div",
          { class: de(["VPNavBarTitle", { "has-sidebar": _(s) }]) },
          [
            g(
              "a",
              { class: "title", href: _(t).base },
              [
                T(o.$slots, "nav-bar-title-before", {}, void 0, !0),
                V(xi, { class: "logo", image: _(n).logo }, null, 8, ["image"]),
                _(n).siteTitle
                  ? (d(), m(q, { key: 0 }, [Ve(ae(_(n).siteTitle), 1)], 64))
                  : _(n).siteTitle === void 0
                  ? (d(), m(q, { key: 1 }, [Ve(ae(_(t).title), 1)], 64))
                  : z("", !0),
                T(o.$slots, "nav-bar-title-after", {}, void 0, !0),
              ],
              8,
              du
            ),
          ],
          2
        )
      );
    },
  });
const _u = N(hu, [["__scopeId", "data-v-d5925166"]]);
const pu = { key: 0, class: "VPNavBarSearch" },
  vu = {
    type: "button",
    class: "DocSearch DocSearch-Button",
    "aria-label": "Search",
  },
  mu = { class: "DocSearch-Button-Container" },
  gu = g(
    "svg",
    {
      class: "DocSearch-Search-Icon",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
    },
    [
      g("path", {
        d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",
        stroke: "currentColor",
        fill: "none",
        "fill-rule": "evenodd",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      }),
    ],
    -1
  ),
  bu = { class: "DocSearch-Button-Placeholder" },
  yu = g(
    "span",
    { class: "DocSearch-Button-Keys" },
    [
      g("kbd", { class: "DocSearch-Button-Key" }),
      g("kbd", { class: "DocSearch-Button-Key" }, "K"),
    ],
    -1
  ),
  wu = H({
    __name: "VPNavBarSearch",
    setup(e) {
      va((i) => ({ "5943dbe8": o.value }));
      const t = () => null,
        { theme: n } = ie(),
        s = ve(!1),
        o = ve("'Meta'");
      Re(() => {
        if (!n.value.algolia) return;
        o.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
          ? "'\u2318'"
          : "'Ctrl'";
        const i = (c) => {
            c.key === "k" &&
              (c.ctrlKey || c.metaKey) &&
              (c.preventDefault(), r(), l());
          },
          l = () => {
            window.removeEventListener("keydown", i);
          };
        window.addEventListener("keydown", i), vt(l);
      });
      function r() {
        s.value || (s.value = !0);
      }
      return (i, l) => {
        var c;
        return _(n).algolia
          ? (d(),
            m("div", pu, [
              s.value
                ? (d(), G(_(t), { key: 0 }))
                : (d(),
                  m("div", { key: 1, id: "docsearch", onClick: r }, [
                    g("button", vu, [
                      g("span", mu, [
                        gu,
                        g(
                          "span",
                          bu,
                          ae(
                            ((c = _(n).algolia) == null
                              ? void 0
                              : c.buttonText) || "Search"
                          ),
                          1
                        ),
                      ]),
                      yu,
                    ]),
                  ])),
            ]))
          : z("", !0);
      };
    },
  });
const $u = {},
  xu = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
  },
  Pu = g("path", { d: "M0 0h24v24H0V0z", fill: "none" }, null, -1),
  ku = g(
    "path",
    { d: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" },
    null,
    -1
  ),
  Cu = [Pu, ku];
function Su(e, t) {
  return d(), m("svg", xu, Cu);
}
const Vu = N($u, [["render", Su]]),
  Tu = H({
    __name: "VPLink",
    props: { href: null, noIcon: { type: Boolean } },
    setup(e) {
      const t = e,
        n = se(() => t.href && ss.test(t.href));
      return (s, o) => (
        d(),
        G(
          to(e.href ? "a" : "span"),
          {
            class: de(["VPLink", { link: e.href }]),
            href: e.href ? _(Nn)(e.href) : void 0,
            target: _(n) ? "_blank" : void 0,
            rel: _(n) ? "noreferrer" : void 0,
          },
          {
            default: I(() => [
              T(s.$slots, "default", {}, void 0, !0),
              _(n) && !e.noIcon
                ? (d(), G(Vu, { key: 0, class: "icon" }))
                : z("", !0),
            ]),
            _: 3,
          },
          8,
          ["class", "href", "target", "rel"]
        )
      );
    },
  });
const Et = N(Tu, [["__scopeId", "data-v-3c355974"]]),
  Lu = H({
    __name: "VPNavBarMenuLink",
    props: { item: null },
    setup(e) {
      const { page: t } = ie();
      return (n, s) => (
        d(),
        G(
          Et,
          {
            class: de({
              VPNavBarMenuLink: !0,
              active: _(Yt)(
                _(t).relativePath,
                e.item.activeMatch || e.item.link,
                !!e.item.activeMatch
              ),
            }),
            href: e.item.link,
            noIcon: !0,
          },
          { default: I(() => [Ve(ae(e.item.text), 1)]), _: 1 },
          8,
          ["class", "href"]
        )
      );
    },
  });
const Eu = N(Lu, [["__scopeId", "data-v-47a2263e"]]),
  co = ve();
let Pi = !1,
  ms = 0;
function Mu(e) {
  const t = ve(!1);
  if (typeof window < "u") {
    !Pi && Au(), ms++;
    const n = Ze(co, (s) => {
      var o, r, i;
      s === e.el.value || ((o = e.el.value) == null ? void 0 : o.contains(s))
        ? ((t.value = !0), (r = e.onFocus) == null || r.call(e))
        : ((t.value = !1), (i = e.onBlur) == null || i.call(e));
    });
    vt(() => {
      n(), ms--, ms || Iu();
    });
  }
  return Us(t);
}
function Au() {
  document.addEventListener("focusin", ki),
    (Pi = !0),
    (co.value = document.activeElement);
}
function Iu() {
  document.removeEventListener("focusin", ki);
}
function ki() {
  co.value = document.activeElement;
}
const Nu = {},
  Ou = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Bu = g(
    "path",
    {
      d: "M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z",
    },
    null,
    -1
  ),
  Fu = [Bu];
function Hu(e, t) {
  return d(), m("svg", Ou, Fu);
}
const Ci = N(Nu, [["render", Hu]]),
  Ru = {},
  Du = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  ju = g("circle", { cx: "12", cy: "12", r: "2" }, null, -1),
  zu = g("circle", { cx: "19", cy: "12", r: "2" }, null, -1),
  Uu = g("circle", { cx: "5", cy: "12", r: "2" }, null, -1),
  Ku = [ju, zu, Uu];
function Wu(e, t) {
  return d(), m("svg", Du, Ku);
}
const qu = N(Ru, [["render", Wu]]),
  Gu = { class: "VPMenuLink" },
  Yu = H({
    __name: "VPMenuLink",
    props: { item: null },
    setup(e) {
      const { page: t } = ie();
      return (n, s) => (
        d(),
        m("div", Gu, [
          V(
            Et,
            {
              class: de({
                active: _(Yt)(
                  _(t).relativePath,
                  e.item.activeMatch || e.item.link
                ),
              }),
              href: e.item.link,
            },
            { default: I(() => [Ve(ae(e.item.text), 1)]), _: 1 },
            8,
            ["class", "href"]
          ),
        ])
      );
    },
  });
const os = N(Yu, [["__scopeId", "data-v-e8e0fb1d"]]),
  Qu = { class: "VPMenuGroup" },
  Ju = { key: 0, class: "title" },
  Xu = H({
    __name: "VPMenuGroup",
    props: { text: null, items: null },
    setup(e) {
      return (t, n) => (
        d(),
        m("div", Qu, [
          e.text ? (d(), m("p", Ju, ae(e.text), 1)) : z("", !0),
          (d(!0),
          m(
            q,
            null,
            ke(
              e.items,
              (s) => (
                d(),
                m(
                  q,
                  null,
                  [
                    "link" in s
                      ? (d(), G(os, { key: 0, item: s }, null, 8, ["item"]))
                      : z("", !0),
                  ],
                  64
                )
              )
            ),
            256
          )),
        ])
      );
    },
  });
const Zu = N(Xu, [["__scopeId", "data-v-9ca52130"]]),
  ef = { class: "VPMenu" },
  tf = { key: 0, class: "items" },
  nf = H({
    __name: "VPMenu",
    props: { items: null },
    setup(e) {
      return (t, n) => (
        d(),
        m("div", ef, [
          e.items
            ? (d(),
              m("div", tf, [
                (d(!0),
                m(
                  q,
                  null,
                  ke(
                    e.items,
                    (s) => (
                      d(),
                      m(
                        q,
                        { key: s.text },
                        [
                          "link" in s
                            ? (d(),
                              G(os, { key: 0, item: s }, null, 8, ["item"]))
                            : (d(),
                              G(
                                Zu,
                                { key: 1, text: s.text, items: s.items },
                                null,
                                8,
                                ["text", "items"]
                              )),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]))
            : z("", !0),
          T(t.$slots, "default", {}, void 0, !0),
        ])
      );
    },
  });
const sf = N(nf, [["__scopeId", "data-v-1c5d0cfc"]]),
  of = ["aria-expanded", "aria-label"],
  rf = { key: 0, class: "text" },
  lf = { class: "menu" },
  cf = H({
    __name: "VPFlyout",
    props: { icon: null, button: null, label: null, items: null },
    setup(e) {
      const t = ve(!1),
        n = ve();
      Mu({ el: n, onBlur: s });
      function s() {
        t.value = !1;
      }
      return (o, r) => (
        d(),
        m(
          "div",
          {
            class: "VPFlyout",
            ref_key: "el",
            ref: n,
            onMouseenter: r[1] || (r[1] = (i) => (t.value = !0)),
            onMouseleave: r[2] || (r[2] = (i) => (t.value = !1)),
          },
          [
            g(
              "button",
              {
                type: "button",
                class: "button",
                "aria-haspopup": "true",
                "aria-expanded": t.value,
                "aria-label": e.label,
                onClick: r[0] || (r[0] = (i) => (t.value = !t.value)),
              },
              [
                e.button || e.icon
                  ? (d(),
                    m("span", rf, [
                      e.icon
                        ? (d(), G(to(e.icon), { key: 0, class: "option-icon" }))
                        : z("", !0),
                      Ve(" " + ae(e.button) + " ", 1),
                      V(Ci, { class: "text-icon" }),
                    ]))
                  : (d(), G(qu, { key: 1, class: "icon" })),
              ],
              8,
              of
            ),
            g("div", lf, [
              V(
                sf,
                { items: e.items },
                {
                  default: I(() => [T(o.$slots, "default", {}, void 0, !0)]),
                  _: 3,
                },
                8,
                ["items"]
              ),
            ]),
          ],
          544
        )
      );
    },
  });
const ao = N(cf, [["__scopeId", "data-v-6ffb57d3"]]),
  af = H({
    __name: "VPNavBarMenuGroup",
    props: { item: null },
    setup(e) {
      const { page: t } = ie();
      return (n, s) => (
        d(),
        G(
          ao,
          {
            class: de({
              VPNavBarMenuGroup: !0,
              active: _(Yt)(
                _(t).relativePath,
                e.item.activeMatch,
                !!e.item.activeMatch
              ),
            }),
            button: e.item.text,
            items: e.item.items,
          },
          null,
          8,
          ["class", "button", "items"]
        )
      );
    },
  }),
  uf = (e) => (We("data-v-f83db6ba"), (e = e()), qe(), e),
  ff = {
    key: 0,
    "aria-labelledby": "main-nav-aria-label",
    class: "VPNavBarMenu",
  },
  df = uf(() =>
    g(
      "span",
      { id: "main-nav-aria-label", class: "visually-hidden" },
      "Main Navigation",
      -1
    )
  ),
  hf = H({
    __name: "VPNavBarMenu",
    setup(e) {
      const { theme: t } = ie();
      return (n, s) =>
        _(t).nav
          ? (d(),
            m("nav", ff, [
              df,
              (d(!0),
              m(
                q,
                null,
                ke(
                  _(t).nav,
                  (o) => (
                    d(),
                    m(
                      q,
                      { key: o.text },
                      [
                        "link" in o
                          ? (d(), G(Eu, { key: 0, item: o }, null, 8, ["item"]))
                          : (d(),
                            G(af, { key: 1, item: o }, null, 8, ["item"])),
                      ],
                      64
                    )
                  )
                ),
                128
              )),
            ]))
          : z("", !0);
    },
  });
const _f = N(hf, [["__scopeId", "data-v-f83db6ba"]]),
  pf = {},
  vf = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  mf = g("path", { d: "M0 0h24v24H0z", fill: "none" }, null, -1),
  gf = g(
    "path",
    {
      d: " M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z ",
      class: "css-c4d79v",
    },
    null,
    -1
  ),
  bf = [mf, gf];
function yf(e, t) {
  return d(), m("svg", vf, bf);
}
const Si = N(pf, [["render", yf]]),
  wf = { class: "items" },
  $f = { class: "title" },
  xf = H({
    __name: "VPNavBarTranslations",
    setup(e) {
      const { theme: t } = ie();
      return (n, s) =>
        _(t).localeLinks
          ? (d(),
            G(
              ao,
              { key: 0, class: "VPNavBarTranslations", icon: Si },
              {
                default: I(() => [
                  g("div", wf, [
                    g("p", $f, ae(_(t).localeLinks.text), 1),
                    (d(!0),
                    m(
                      q,
                      null,
                      ke(
                        _(t).localeLinks.items,
                        (o) => (
                          d(),
                          G(os, { key: o.link, item: o }, null, 8, ["item"])
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
                _: 1,
              }
            ))
          : z("", !0);
    },
  });
const Pf = N(xf, [["__scopeId", "data-v-db824e91"]]);
const kf = {},
  Cf = { class: "VPSwitch", type: "button", role: "switch" },
  Sf = { class: "check" },
  Vf = { key: 0, class: "icon" };
function Tf(e, t) {
  return (
    d(),
    m("button", Cf, [
      g("span", Sf, [
        e.$slots.default
          ? (d(), m("span", Vf, [T(e.$slots, "default", {}, void 0, !0)]))
          : z("", !0),
      ]),
    ])
  );
}
const Lf = N(kf, [
    ["render", Tf],
    ["__scopeId", "data-v-eba7420e"],
  ]),
  Ef = {},
  Mf = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Af = Tc(
    '<path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path><path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path><path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path><path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path><path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path><path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path><path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path><path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path><path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>',
    9
  ),
  If = [Af];
function Nf(e, t) {
  return d(), m("svg", Mf, If);
}
const Of = N(Ef, [["render", Nf]]),
  Bf = {},
  Ff = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Hf = g(
    "path",
    {
      d: "M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z",
    },
    null,
    -1
  ),
  Rf = [Hf];
function Df(e, t) {
  return d(), m("svg", Ff, Rf);
}
const jf = N(Bf, [["render", Df]]),
  zf = H({
    __name: "VPSwitchAppearance",
    setup(e) {
      const { site: t, isDark: n } = ie(),
        s = ve(!1),
        o = typeof localStorage < "u" ? r() : () => {};
      Re(() => {
        s.value = document.documentElement.classList.contains("dark");
      });
      function r() {
        const i = window.matchMedia("(prefers-color-scheme: dark)"),
          l = document.documentElement.classList;
        let c = localStorage.getItem(tr),
          f =
            (t.value.appearance === "dark" && c == null) ||
            (c === "auto" || c == null ? i.matches : c === "dark");
        i.onchange = (b) => {
          c === "auto" && v((f = b.matches));
        };
        function h() {
          v((f = !f)),
            (c = f
              ? i.matches
                ? "auto"
                : "dark"
              : i.matches
              ? "light"
              : "auto"),
            localStorage.setItem(tr, c);
        }
        function v(b) {
          const P = document.createElement("style");
          (P.type = "text/css"),
            P.appendChild(
              document.createTextNode(`:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`)
            ),
            document.head.appendChild(P),
            (s.value = b),
            l[b ? "add" : "remove"]("dark"),
            window.getComputedStyle(P).opacity,
            document.head.removeChild(P);
        }
        return h;
      }
      return (
        Ze(s, (i) => {
          n.value = i;
        }),
        (i, l) => (
          d(),
          G(
            Lf,
            {
              class: "VPSwitchAppearance",
              "aria-label": "toggle dark mode",
              "aria-checked": s.value,
              onClick: _(o),
            },
            {
              default: I(() => [
                V(Of, { class: "sun" }),
                V(jf, { class: "moon" }),
              ]),
              _: 1,
            },
            8,
            ["aria-checked", "onClick"]
          )
        )
      );
    },
  });
const uo = N(zf, [["__scopeId", "data-v-481098f9"]]),
  Uf = { key: 0, class: "VPNavBarAppearance" },
  Kf = H({
    __name: "VPNavBarAppearance",
    setup(e) {
      const { site: t } = ie();
      return (n, s) =>
        _(t).appearance ? (d(), m("div", Uf, [V(uo)])) : z("", !0);
    },
  });
const Wf = N(Kf, [["__scopeId", "data-v-a3e7452b"]]),
  qf = {
    discord:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
    facebook:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    github:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    instagram:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
    linkedin:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    slack:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
    twitter:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
    youtube:
      '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  },
  Gf = ["href", "innerHTML"],
  Yf = H({
    __name: "VPSocialLink",
    props: { icon: null, link: null },
    setup(e) {
      const t = e,
        n = se(() => (typeof t.icon == "object" ? t.icon.svg : qf[t.icon]));
      return (s, o) => (
        d(),
        m(
          "a",
          {
            class: "VPSocialLink",
            href: e.link,
            target: "_blank",
            rel: "noopener",
            innerHTML: _(n),
          },
          null,
          8,
          Gf
        )
      );
    },
  });
const Qf = N(Yf, [["__scopeId", "data-v-e57698f6"]]),
  Jf = { class: "VPSocialLinks" },
  Xf = H({
    __name: "VPSocialLinks",
    props: { links: null },
    setup(e) {
      return (t, n) => (
        d(),
        m("div", Jf, [
          (d(!0),
          m(
            q,
            null,
            ke(
              e.links,
              ({ link: s, icon: o }) => (
                d(),
                G(Qf, { key: s, icon: o, link: s }, null, 8, ["icon", "link"])
              )
            ),
            128
          )),
        ])
      );
    },
  });
const fo = N(Xf, [["__scopeId", "data-v-f6988cfb"]]),
  Zf = H({
    __name: "VPNavBarSocialLinks",
    setup(e) {
      const { theme: t } = ie();
      return (n, s) =>
        _(t).socialLinks
          ? (d(),
            G(
              fo,
              { key: 0, class: "VPNavBarSocialLinks", links: _(t).socialLinks },
              null,
              8,
              ["links"]
            ))
          : z("", !0);
    },
  });
const ed = N(Zf, [["__scopeId", "data-v-738bef5a"]]),
  td = (e) => (We("data-v-e4361c82"), (e = e()), qe(), e),
  nd = { key: 0, class: "group" },
  sd = { class: "trans-title" },
  od = { key: 1, class: "group" },
  rd = { class: "item appearance" },
  id = td(() => g("p", { class: "label" }, "Appearance", -1)),
  ld = { class: "appearance-action" },
  cd = { key: 2, class: "group" },
  ad = { class: "item social-links" },
  ud = H({
    __name: "VPNavBarExtra",
    setup(e) {
      const { site: t, theme: n } = ie(),
        s = se(
          () => n.value.localeLinks || t.value.appearance || n.value.socialLinks
        );
      return (o, r) =>
        _(s)
          ? (d(),
            G(
              ao,
              { key: 0, class: "VPNavBarExtra", label: "extra navigation" },
              {
                default: I(() => [
                  _(n).localeLinks
                    ? (d(),
                      m("div", nd, [
                        g("p", sd, ae(_(n).localeLinks.text), 1),
                        (d(!0),
                        m(
                          q,
                          null,
                          ke(
                            _(n).localeLinks.items,
                            (i) => (
                              d(),
                              G(os, { key: i.link, item: i }, null, 8, ["item"])
                            )
                          ),
                          128
                        )),
                      ]))
                    : z("", !0),
                  _(t).appearance
                    ? (d(),
                      m("div", od, [g("div", rd, [id, g("div", ld, [V(uo)])])]))
                    : z("", !0),
                  _(n).socialLinks
                    ? (d(),
                      m("div", cd, [
                        g("div", ad, [
                          V(
                            fo,
                            {
                              class: "social-links-list",
                              links: _(n).socialLinks,
                            },
                            null,
                            8,
                            ["links"]
                          ),
                        ]),
                      ]))
                    : z("", !0),
                ]),
                _: 1,
              }
            ))
          : z("", !0);
    },
  });
const fd = N(ud, [["__scopeId", "data-v-e4361c82"]]),
  dd = (e) => (We("data-v-e5dd9c1c"), (e = e()), qe(), e),
  hd = ["aria-expanded"],
  _d = dd(() =>
    g(
      "span",
      { class: "container" },
      [
        g("span", { class: "top" }),
        g("span", { class: "middle" }),
        g("span", { class: "bottom" }),
      ],
      -1
    )
  ),
  pd = [_d],
  vd = H({
    __name: "VPNavBarHamburger",
    props: { active: { type: Boolean } },
    emits: ["click"],
    setup(e) {
      return (t, n) => (
        d(),
        m(
          "button",
          {
            type: "button",
            class: de(["VPNavBarHamburger", { active: e.active }]),
            "aria-label": "mobile navigation",
            "aria-expanded": e.active,
            "aria-controls": "VPNavScreen",
            onClick: n[0] || (n[0] = (s) => t.$emit("click")),
          },
          pd,
          10,
          hd
        )
      );
    },
  });
const md = N(vd, [["__scopeId", "data-v-e5dd9c1c"]]),
  gd = { class: "container" },
  bd = { class: "content" },
  yd = H({
    __name: "VPNavBar",
    props: { isScreenOpen: { type: Boolean } },
    emits: ["toggle-screen"],
    setup(e) {
      const { hasSidebar: t } = tt();
      return (n, s) => (
        d(),
        m(
          "div",
          { class: de(["VPNavBar", { "has-sidebar": _(t) }]) },
          [
            g("div", gd, [
              V(_u, null, {
                "nav-bar-title-before": I(() => [
                  T(n.$slots, "nav-bar-title-before", {}, void 0, !0),
                ]),
                "nav-bar-title-after": I(() => [
                  T(n.$slots, "nav-bar-title-after", {}, void 0, !0),
                ]),
                _: 3,
              }),
              g("div", bd, [
                T(n.$slots, "nav-bar-content-before", {}, void 0, !0),
                V(wu, { class: "search" }),
                V(_f, { class: "menu" }),
                V(Pf, { class: "translations" }),
                V(Wf, { class: "appearance" }),
                V(ed, { class: "social-links" }),
                V(fd, { class: "extra" }),
                T(n.$slots, "nav-bar-content-after", {}, void 0, !0),
                V(
                  md,
                  {
                    class: "hamburger",
                    active: e.isScreenOpen,
                    onClick: s[0] || (s[0] = (o) => n.$emit("toggle-screen")),
                  },
                  null,
                  8,
                  ["active"]
                ),
              ]),
            ]),
          ],
          2
        )
      );
    },
  });
const wd = N(yd, [["__scopeId", "data-v-6f1d18b5"]]);
function $d(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  } else return Array.from(e);
}
var ho = !1;
if (typeof window < "u") {
  var cr = {
    get passive() {
      ho = !0;
    },
  };
  window.addEventListener("testPassive", null, cr),
    window.removeEventListener("testPassive", null, cr);
}
var On =
    typeof window < "u" &&
    window.navigator &&
    window.navigator.platform &&
    (/iP(ad|hone|od)/.test(window.navigator.platform) ||
      (window.navigator.platform === "MacIntel" &&
        window.navigator.maxTouchPoints > 1)),
  Rt = [],
  Bn = !1,
  _o = -1,
  sn = void 0,
  St = void 0,
  on = void 0,
  Vi = function (t) {
    return Rt.some(function (n) {
      return !!(n.options.allowTouchMove && n.options.allowTouchMove(t));
    });
  },
  Fn = function (t) {
    var n = t || window.event;
    return Vi(n.target) || n.touches.length > 1
      ? !0
      : (n.preventDefault && n.preventDefault(), !1);
  },
  xd = function (t) {
    if (on === void 0) {
      var n = !!t && t.reserveScrollBarGap === !0,
        s = window.innerWidth - document.documentElement.clientWidth;
      if (n && s > 0) {
        var o = parseInt(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("padding-right"),
          10
        );
        (on = document.body.style.paddingRight),
          (document.body.style.paddingRight = o + s + "px");
      }
    }
    sn === void 0 &&
      ((sn = document.body.style.overflow),
      (document.body.style.overflow = "hidden"));
  },
  Pd = function () {
    on !== void 0 && ((document.body.style.paddingRight = on), (on = void 0)),
      sn !== void 0 && ((document.body.style.overflow = sn), (sn = void 0));
  },
  kd = function () {
    return window.requestAnimationFrame(function () {
      if (St === void 0) {
        St = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
        };
        var t = window,
          n = t.scrollY,
          s = t.scrollX,
          o = t.innerHeight;
        (document.body.style.position = "fixed"),
          (document.body.style.top = -n),
          (document.body.style.left = -s),
          setTimeout(function () {
            return window.requestAnimationFrame(function () {
              var r = o - window.innerHeight;
              r && n >= o && (document.body.style.top = -(n + r));
            });
          }, 300);
      }
    });
  },
  Cd = function () {
    if (St !== void 0) {
      var t = -parseInt(document.body.style.top, 10),
        n = -parseInt(document.body.style.left, 10);
      (document.body.style.position = St.position),
        (document.body.style.top = St.top),
        (document.body.style.left = St.left),
        window.scrollTo(n, t),
        (St = void 0);
    }
  },
  Sd = function (t) {
    return t ? t.scrollHeight - t.scrollTop <= t.clientHeight : !1;
  },
  Vd = function (t, n) {
    var s = t.targetTouches[0].clientY - _o;
    return Vi(t.target)
      ? !1
      : (n && n.scrollTop === 0 && s > 0) || (Sd(n) && s < 0)
      ? Fn(t)
      : (t.stopPropagation(), !0);
  },
  Ti = function (t, n) {
    if (!t) {
      console.error(
        "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices."
      );
      return;
    }
    if (
      !Rt.some(function (o) {
        return o.targetElement === t;
      })
    ) {
      var s = { targetElement: t, options: n || {} };
      (Rt = [].concat($d(Rt), [s])),
        On ? kd() : xd(n),
        On &&
          ((t.ontouchstart = function (o) {
            o.targetTouches.length === 1 && (_o = o.targetTouches[0].clientY);
          }),
          (t.ontouchmove = function (o) {
            o.targetTouches.length === 1 && Vd(o, t);
          }),
          Bn ||
            (document.addEventListener(
              "touchmove",
              Fn,
              ho ? { passive: !1 } : void 0
            ),
            (Bn = !0)));
    }
  },
  Li = function () {
    On &&
      (Rt.forEach(function (t) {
        (t.targetElement.ontouchstart = null),
          (t.targetElement.ontouchmove = null);
      }),
      Bn &&
        (document.removeEventListener(
          "touchmove",
          Fn,
          ho ? { passive: !1 } : void 0
        ),
        (Bn = !1)),
      (_o = -1)),
      On ? Cd() : Pd(),
      (Rt = []);
  };
const Td = H({
  __name: "VPNavScreenMenuLink",
  props: { text: null, link: null },
  setup(e) {
    const t = Ke("close-screen");
    return (n, s) => (
      d(),
      G(
        Et,
        { class: "VPNavScreenMenuLink", href: e.link, onClick: _(t) },
        { default: I(() => [Ve(ae(e.text), 1)]), _: 1 },
        8,
        ["href", "onClick"]
      )
    );
  },
});
const Ld = N(Td, [["__scopeId", "data-v-b7098508"]]),
  Ed = {},
  Md = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  Ad = g(
    "path",
    {
      d: "M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z",
    },
    null,
    -1
  ),
  Id = [Ad];
function Nd(e, t) {
  return d(), m("svg", Md, Id);
}
const Od = N(Ed, [["render", Nd]]),
  Bd = H({
    __name: "VPNavScreenMenuGroupLink",
    props: { text: null, link: null },
    setup(e) {
      const t = Ke("close-screen");
      return (n, s) => (
        d(),
        G(
          Et,
          { class: "VPNavScreenMenuGroupLink", href: e.link, onClick: _(t) },
          { default: I(() => [Ve(ae(e.text), 1)]), _: 1 },
          8,
          ["href", "onClick"]
        )
      );
    },
  });
const Ei = N(Bd, [["__scopeId", "data-v-7f173864"]]),
  Fd = { class: "VPNavScreenMenuGroupSection" },
  Hd = { key: 0, class: "title" },
  Rd = H({
    __name: "VPNavScreenMenuGroupSection",
    props: { text: null, items: null },
    setup(e) {
      return (t, n) => (
        d(),
        m("div", Fd, [
          e.text ? (d(), m("p", Hd, ae(e.text), 1)) : z("", !0),
          (d(!0),
          m(
            q,
            null,
            ke(
              e.items,
              (s) => (
                d(),
                G(Ei, { key: s.text, text: s.text, link: s.link }, null, 8, [
                  "text",
                  "link",
                ])
              )
            ),
            128
          )),
        ])
      );
    },
  });
const Dd = N(Rd, [["__scopeId", "data-v-7478538b"]]),
  jd = ["aria-controls", "aria-expanded"],
  zd = { class: "button-text" },
  Ud = ["id"],
  Kd = { key: 1, class: "group" },
  Wd = H({
    __name: "VPNavScreenMenuGroup",
    props: { text: null, items: null },
    setup(e) {
      const t = e,
        n = ve(!1),
        s = se(
          () => `NavScreenGroup-${t.text.replace(" ", "-").toLowerCase()}`
        );
      function o() {
        n.value = !n.value;
      }
      return (r, i) => (
        d(),
        m(
          "div",
          { class: de(["VPNavScreenMenuGroup", { open: n.value }]) },
          [
            g(
              "button",
              {
                class: "button",
                "aria-controls": _(s),
                "aria-expanded": n.value,
                onClick: o,
              },
              [g("span", zd, ae(e.text), 1), V(Od, { class: "button-icon" })],
              8,
              jd
            ),
            g(
              "div",
              { id: _(s), class: "items" },
              [
                (d(!0),
                m(
                  q,
                  null,
                  ke(
                    e.items,
                    (l) => (
                      d(),
                      m(
                        q,
                        { key: l.text },
                        [
                          "link" in l
                            ? (d(),
                              m("div", { key: l.text, class: "item" }, [
                                V(Ei, { text: l.text, link: l.link }, null, 8, [
                                  "text",
                                  "link",
                                ]),
                              ]))
                            : (d(),
                              m("div", Kd, [
                                V(
                                  Dd,
                                  { text: l.text, items: l.items },
                                  null,
                                  8,
                                  ["text", "items"]
                                ),
                              ])),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ],
              8,
              Ud
            ),
          ],
          2
        )
      );
    },
  });
const qd = N(Wd, [["__scopeId", "data-v-5bc84358"]]),
  Gd = { key: 0, class: "VPNavScreenMenu" },
  Yd = H({
    __name: "VPNavScreenMenu",
    setup(e) {
      const { theme: t } = ie();
      return (n, s) =>
        _(t).nav
          ? (d(),
            m("nav", Gd, [
              (d(!0),
              m(
                q,
                null,
                ke(
                  _(t).nav,
                  (o) => (
                    d(),
                    m(
                      q,
                      { key: o.text },
                      [
                        "link" in o
                          ? (d(),
                            G(
                              Ld,
                              { key: 0, text: o.text, link: o.link },
                              null,
                              8,
                              ["text", "link"]
                            ))
                          : (d(),
                            G(
                              qd,
                              { key: 1, text: o.text || "", items: o.items },
                              null,
                              8,
                              ["text", "items"]
                            )),
                      ],
                      64
                    )
                  )
                ),
                128
              )),
            ]))
          : z("", !0);
    },
  }),
  Qd = (e) => (We("data-v-7bc19822"), (e = e()), qe(), e),
  Jd = { key: 0, class: "VPNavScreenAppearance" },
  Xd = Qd(() => g("p", { class: "text" }, "Appearance", -1)),
  Zd = H({
    __name: "VPNavScreenAppearance",
    setup(e) {
      const { site: t } = ie();
      return (n, s) =>
        _(t).appearance ? (d(), m("div", Jd, [Xd, V(uo)])) : z("", !0);
    },
  });
const eh = N(Zd, [["__scopeId", "data-v-7bc19822"]]),
  th = { class: "list" },
  nh = ["href"],
  sh = H({
    __name: "VPNavScreenTranslations",
    setup(e) {
      const { theme: t } = ie(),
        n = ve(!1);
      function s() {
        n.value = !n.value;
      }
      return (o, r) =>
        _(t).localeLinks
          ? (d(),
            m(
              "div",
              {
                key: 0,
                class: de(["VPNavScreenTranslations", { open: n.value }]),
              },
              [
                g("button", { class: "title", onClick: s }, [
                  V(Si, { class: "icon lang" }),
                  Ve(" " + ae(_(t).localeLinks.text) + " ", 1),
                  V(Ci, { class: "icon chevron" }),
                ]),
                g("ul", th, [
                  (d(!0),
                  m(
                    q,
                    null,
                    ke(
                      _(t).localeLinks.items,
                      (i) => (
                        d(),
                        m("li", { key: i.link, class: "item" }, [
                          g(
                            "a",
                            { class: "link", href: i.link },
                            ae(i.text),
                            9,
                            nh
                          ),
                        ])
                      )
                    ),
                    128
                  )),
                ]),
              ],
              2
            ))
          : z("", !0);
    },
  });
const oh = N(sh, [["__scopeId", "data-v-6bfcad30"]]),
  rh = H({
    __name: "VPNavScreenSocialLinks",
    setup(e) {
      const { theme: t } = ie();
      return (n, s) =>
        _(t).socialLinks
          ? (d(),
            G(
              fo,
              {
                key: 0,
                class: "VPNavScreenSocialLinks",
                links: _(t).socialLinks,
              },
              null,
              8,
              ["links"]
            ))
          : z("", !0);
    },
  }),
  ih = { class: "container" },
  lh = H({
    __name: "VPNavScreen",
    props: { open: { type: Boolean } },
    setup(e) {
      const t = ve(null);
      function n() {
        Ti(t.value, { reserveScrollBarGap: !0 });
      }
      function s() {
        Li();
      }
      return (o, r) => (
        d(),
        G(
          ns,
          { name: "fade", onEnter: n, onAfterLeave: s },
          {
            default: I(() => [
              e.open
                ? (d(),
                  m(
                    "div",
                    { key: 0, class: "VPNavScreen", ref_key: "screen", ref: t },
                    [
                      g("div", ih, [
                        T(
                          o.$slots,
                          "nav-screen-content-before",
                          {},
                          void 0,
                          !0
                        ),
                        V(Yd, { class: "menu" }),
                        V(oh, { class: "translations" }),
                        V(eh, { class: "appearance" }),
                        V(rh, { class: "social-links" }),
                        T(o.$slots, "nav-screen-content-after", {}, void 0, !0),
                      ]),
                    ],
                    512
                  ))
                : z("", !0),
            ]),
            _: 3,
          }
        )
      );
    },
  });
const ch = N(lh, [["__scopeId", "data-v-4a289eba"]]),
  ah = H({
    __name: "VPNav",
    setup(e) {
      const { isScreenOpen: t, closeScreen: n, toggleScreen: s } = cu(),
        { hasSidebar: o } = tt();
      return (
        Qn("close-screen", n),
        (r, i) => (
          d(),
          m(
            "header",
            { class: de(["VPNav", { "no-sidebar": !_(o) }]) },
            [
              V(
                wd,
                { "is-screen-open": _(t), onToggleScreen: _(s) },
                {
                  "nav-bar-title-before": I(() => [
                    T(r.$slots, "nav-bar-title-before", {}, void 0, !0),
                  ]),
                  "nav-bar-title-after": I(() => [
                    T(r.$slots, "nav-bar-title-after", {}, void 0, !0),
                  ]),
                  "nav-bar-content-before": I(() => [
                    T(r.$slots, "nav-bar-content-before", {}, void 0, !0),
                  ]),
                  "nav-bar-content-after": I(() => [
                    T(r.$slots, "nav-bar-content-after", {}, void 0, !0),
                  ]),
                  _: 3,
                },
                8,
                ["is-screen-open", "onToggleScreen"]
              ),
              V(
                ch,
                { open: _(t) },
                {
                  "nav-screen-content-before": I(() => [
                    T(r.$slots, "nav-screen-content-before", {}, void 0, !0),
                  ]),
                  "nav-screen-content-after": I(() => [
                    T(r.$slots, "nav-screen-content-after", {}, void 0, !0),
                  ]),
                  _: 3,
                },
                8,
                ["open"]
              ),
            ],
            2
          )
        )
      );
    },
  });
const uh = N(ah, [["__scopeId", "data-v-a50780ff"]]),
  fh = {},
  dh = {
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    focusable: "false",
    viewBox: "0 0 24 24",
  },
  hh = g(
    "path",
    {
      d: "M17,11H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,11,17,11z",
    },
    null,
    -1
  ),
  _h = g(
    "path",
    { d: "M21,7H3C2.4,7,2,6.6,2,6s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,7,21,7z" },
    null,
    -1
  ),
  ph = g(
    "path",
    {
      d: "M21,15H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S21.6,15,21,15z",
    },
    null,
    -1
  ),
  vh = g(
    "path",
    {
      d: "M17,19H3c-0.6,0-1-0.4-1-1s0.4-1,1-1h14c0.6,0,1,0.4,1,1S17.6,19,17,19z",
    },
    null,
    -1
  ),
  mh = [hh, _h, ph, vh];
function gh(e, t) {
  return d(), m("svg", dh, mh);
}
const bh = N(fh, [["render", gh]]),
  yh = (e) => (We("data-v-b6162a8b"), (e = e()), qe(), e),
  wh = { key: 0, class: "VPLocalNav" },
  $h = ["aria-expanded"],
  xh = yh(() => g("span", { class: "menu-text" }, "Menu", -1)),
  Ph = H({
    __name: "VPLocalNav",
    props: { open: { type: Boolean } },
    emits: ["open-menu"],
    setup(e) {
      const { hasSidebar: t } = tt();
      function n() {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      return (s, o) =>
        _(t)
          ? (d(),
            m("div", wh, [
              g(
                "button",
                {
                  class: "menu",
                  "aria-expanded": e.open,
                  "aria-controls": "VPSidebarNav",
                  onClick: o[0] || (o[0] = (r) => s.$emit("open-menu")),
                },
                [V(bh, { class: "menu-icon" }), xh],
                8,
                $h
              ),
              g(
                "a",
                { class: "top-link", href: "#", onClick: n },
                " Return to top "
              ),
            ]))
          : z("", !0);
    },
  });
const kh = N(Ph, [["__scopeId", "data-v-b6162a8b"]]),
  Ch = {},
  Sh = {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  },
  Vh = g(
    "path",
    {
      d: "M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2z M20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z",
    },
    null,
    -1
  ),
  Th = g(
    "path",
    {
      d: "M16,11h-3V8c0-0.6-0.4-1-1-1s-1,0.4-1,1v3H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h3v3c0,0.6,0.4,1,1,1s1-0.4,1-1v-3h3c0.6,0,1-0.4,1-1S16.6,11,16,11z",
    },
    null,
    -1
  ),
  Lh = [Vh, Th];
function Eh(e, t) {
  return d(), m("svg", Sh, Lh);
}
const Mh = N(Ch, [["render", Eh]]),
  Ah = {},
  Ih = {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    viewBox: "0 0 24 24",
  },
  Nh = g(
    "path",
    {
      d: "M19,2H5C3.3,2,2,3.3,2,5v14c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V5C22,3.3,20.7,2,19,2zM20,19c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V19z",
    },
    null,
    -1
  ),
  Oh = g(
    "path",
    {
      d: "M16,11H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S16.6,11,16,11z",
    },
    null,
    -1
  ),
  Bh = [Nh, Oh];
function Fh(e, t) {
  return d(), m("svg", Ih, Bh);
}
const Hh = N(Ah, [["render", Fh]]),
  Rh = ["innerHTML"],
  Dh = H({
    __name: "VPSidebarLink",
    props: { item: null, depth: { default: 1 } },
    setup(e) {
      const { page: t, frontmatter: n } = ie(),
        s = se(() => n.value.sidebarDepth || 1 / 0),
        o = Ke("close-sidebar");
      return (r, i) => {
        const l = Lt("VPSidebarLink", !0);
        return (
          d(),
          m(
            q,
            null,
            [
              V(
                Et,
                {
                  class: de([
                    "link",
                    { active: _(Yt)(_(t).relativePath, e.item.link) },
                  ]),
                  style: zn({ paddingLeft: 16 * (e.depth - 1) + "px" }),
                  href: e.item.link,
                  onClick: _(o),
                },
                {
                  default: I(() => [
                    g(
                      "span",
                      {
                        innerHTML: e.item.text,
                        class: de(["link-text", { light: e.depth > 1 }]),
                      },
                      null,
                      10,
                      Rh
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["class", "style", "href", "onClick"]
              ),
              "items" in e.item && e.depth < _(s)
                ? (d(!0),
                  m(
                    q,
                    { key: 0 },
                    ke(
                      e.item.items,
                      (c) => (
                        d(),
                        G(
                          l,
                          { key: c.link, item: c, depth: e.depth + 1 },
                          null,
                          8,
                          ["item", "depth"]
                        )
                      )
                    ),
                    128
                  ))
                : z("", !0),
            ],
            64
          )
        );
      };
    },
  });
const jh = N(Dh, [["__scopeId", "data-v-36b976d1"]]),
  zh = ["role"],
  Uh = ["innerHTML"],
  Kh = { class: "action" },
  Wh = { class: "items" },
  qh = H({
    __name: "VPSidebarGroup",
    props: {
      text: null,
      items: null,
      collapsible: { type: Boolean },
      collapsed: { type: Boolean },
    },
    setup(e) {
      const t = e,
        n = ve(!1);
      zt(() => {
        n.value = !!(t.collapsible && t.collapsed);
      });
      const { page: s } = ie();
      zt(() => {
        t.items.some((r) => Yt(s.value.relativePath, r.link)) && (n.value = !1);
      });
      function o() {
        t.collapsible && (n.value = !n.value);
      }
      return (r, i) => (
        d(),
        m(
          "section",
          {
            class: de([
              "VPSidebarGroup",
              { collapsible: e.collapsible, collapsed: n.value },
            ]),
          },
          [
            e.text
              ? (d(),
                m(
                  "div",
                  {
                    key: 0,
                    class: "title",
                    role: e.collapsible ? "button" : void 0,
                    onClick: o,
                  },
                  [
                    g(
                      "h2",
                      { innerHTML: e.text, class: "title-text" },
                      null,
                      8,
                      Uh
                    ),
                    g("div", Kh, [
                      V(Hh, { class: "icon minus" }),
                      V(Mh, { class: "icon plus" }),
                    ]),
                  ],
                  8,
                  zh
                ))
              : z("", !0),
            g("div", Wh, [
              (d(!0),
              m(
                q,
                null,
                ke(
                  e.items,
                  (l) => (
                    d(), G(jh, { key: l.link, item: l }, null, 8, ["item"])
                  )
                ),
                128
              )),
            ]),
          ],
          2
        )
      );
    },
  });
const Gh = N(qh, [["__scopeId", "data-v-6e45c352"]]),
  Yh = (e) => (We("data-v-a186aa16"), (e = e()), qe(), e),
  Qh = {
    class: "nav",
    id: "VPSidebarNav",
    "aria-labelledby": "sidebar-aria-label",
    tabindex: "-1",
  },
  Jh = Yh(() =>
    g(
      "span",
      { class: "visually-hidden", id: "sidebar-aria-label" },
      " Sidebar Navigation ",
      -1
    )
  ),
  Xh = H({
    __name: "VPSidebar",
    props: { open: { type: Boolean } },
    setup(e) {
      const t = e,
        { sidebar: n, hasSidebar: s } = tt();
      let o = ve(null);
      function r() {
        Ti(o.value, { reserveScrollBarGap: !0 });
      }
      function i() {
        Li();
      }
      return (
        Ur(async () => {
          var l;
          t.open ? (r(), (l = o.value) == null || l.focus()) : i();
        }),
        (l, c) =>
          _(s)
            ? (d(),
              m(
                "aside",
                {
                  key: 0,
                  class: de(["VPSidebar", { open: e.open }]),
                  ref_key: "navEl",
                  ref: o,
                  onClick: c[0] || (c[0] = Pa(() => {}, ["stop"])),
                },
                [
                  g("nav", Qh, [
                    Jh,
                    T(l.$slots, "sidebar-nav-before", {}, void 0, !0),
                    (d(!0),
                    m(
                      q,
                      null,
                      ke(
                        _(n),
                        (f) => (
                          d(),
                          m("div", { key: f.text, class: "group" }, [
                            V(
                              Gh,
                              {
                                text: f.text,
                                items: f.items,
                                collapsible: f.collapsible,
                                collapsed: f.collapsed,
                              },
                              null,
                              8,
                              ["text", "items", "collapsible", "collapsed"]
                            ),
                          ])
                        )
                      ),
                      128
                    )),
                    T(l.$slots, "sidebar-nav-after", {}, void 0, !0),
                  ]),
                ],
                2
              ))
            : z("", !0)
      );
    },
  });
const Zh = N(Xh, [["__scopeId", "data-v-a186aa16"]]),
  e1 = {},
  t1 = { class: "VPPage" };
function n1(e, t) {
  const n = Lt("Content");
  return d(), m("div", t1, [V(n)]);
}
const s1 = N(e1, [["render", n1]]),
  o1 = H({
    __name: "VPButton",
    props: { tag: null, size: null, theme: null, text: null, href: null },
    setup(e) {
      const t = e,
        n = se(() => {
          var r, i;
          return [
            (r = t.size) != null ? r : "medium",
            (i = t.theme) != null ? i : "brand",
          ];
        }),
        s = se(() => t.href && ss.test(t.href)),
        o = se(() => (t.tag ? t.tag : t.href ? "a" : "button"));
      return (r, i) => (
        d(),
        G(
          to(_(o)),
          {
            class: de(["VPButton", _(n)]),
            href: e.href ? _(Nn)(e.href) : void 0,
            target: _(s) ? "_blank" : void 0,
            rel: _(s) ? "noreferrer" : void 0,
          },
          { default: I(() => [Ve(ae(e.text), 1)]), _: 1 },
          8,
          ["class", "href", "target", "rel"]
        )
      );
    },
  });
const r1 = N(o1, [["__scopeId", "data-v-53dbb8eb"]]),
  i1 = (e) => (We("data-v-0a0d4301"), (e = e()), qe(), e),
  l1 = { class: "container" },
  c1 = { class: "main" },
  a1 = { key: 0, class: "name" },
  u1 = { class: "clip" },
  f1 = { key: 1, class: "text" },
  d1 = { key: 2, class: "tagline" },
  h1 = { key: 3, class: "actions" },
  _1 = { key: 0, class: "image" },
  p1 = { class: "image-container" },
  v1 = i1(() => g("div", { class: "image-bg" }, null, -1)),
  m1 = H({
    __name: "VPHero",
    props: {
      name: null,
      text: null,
      tagline: null,
      image: null,
      actions: null,
    },
    setup(e) {
      return (t, n) => (
        d(),
        m(
          "div",
          { class: de(["VPHero", { "has-image": e.image }]) },
          [
            g("div", l1, [
              g("div", c1, [
                e.name
                  ? (d(), m("h1", a1, [g("span", u1, ae(e.name), 1)]))
                  : z("", !0),
                e.text ? (d(), m("p", f1, ae(e.text), 1)) : z("", !0),
                e.tagline ? (d(), m("p", d1, ae(e.tagline), 1)) : z("", !0),
                e.actions
                  ? (d(),
                    m("div", h1, [
                      (d(!0),
                      m(
                        q,
                        null,
                        ke(
                          e.actions,
                          (s) => (
                            d(),
                            m("div", { key: s.link, class: "action" }, [
                              V(
                                r1,
                                {
                                  tag: "a",
                                  size: "medium",
                                  theme: s.theme,
                                  text: s.text,
                                  href: s.link,
                                },
                                null,
                                8,
                                ["theme", "text", "href"]
                              ),
                            ])
                          )
                        ),
                        128
                      )),
                    ]))
                  : z("", !0),
              ]),
              e.image
                ? (d(),
                  m("div", _1, [
                    g("div", p1, [
                      v1,
                      V(xi, { class: "image-src", image: e.image }, null, 8, [
                        "image",
                      ]),
                    ]),
                  ]))
                : z("", !0),
            ]),
          ],
          2
        )
      );
    },
  });
const g1 = N(m1, [["__scopeId", "data-v-0a0d4301"]]),
  b1 = H({
    __name: "VPHomeHero",
    setup(e) {
      const { frontmatter: t } = ie();
      return (n, s) =>
        _(t).hero
          ? (d(),
            G(
              g1,
              {
                key: 0,
                class: "VPHomeHero",
                name: _(t).hero.name,
                text: _(t).hero.text,
                tagline: _(t).hero.tagline,
                image: _(t).hero.image,
                actions: _(t).hero.actions,
              },
              null,
              8,
              ["name", "text", "tagline", "image", "actions"]
            ))
          : z("", !0);
    },
  }),
  y1 = {},
  w1 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  $1 = g(
    "path",
    {
      d: "M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z",
    },
    null,
    -1
  ),
  x1 = [$1];
function P1(e, t) {
  return d(), m("svg", w1, x1);
}
const k1 = N(y1, [["render", P1]]),
  C1 = { class: "box" },
  S1 = { key: 0, class: "icon" },
  V1 = { class: "title" },
  T1 = { class: "details" },
  L1 = { key: 1, class: "link-text" },
  E1 = { class: "link-text-value" },
  M1 = H({
    __name: "VPFeature",
    props: {
      icon: null,
      title: null,
      details: null,
      link: null,
      linkText: null,
    },
    setup(e) {
      return (t, n) => (
        d(),
        G(
          Et,
          { class: "VPFeature", href: e.link, "no-icon": !0 },
          {
            default: I(() => [
              g("article", C1, [
                e.icon ? (d(), m("div", S1, ae(e.icon), 1)) : z("", !0),
                g("h2", V1, ae(e.title), 1),
                g("p", T1, ae(e.details), 1),
                e.linkText
                  ? (d(),
                    m("div", L1, [
                      g("p", E1, [
                        Ve(ae(e.linkText) + " ", 1),
                        V(k1, { class: "link-text-icon" }),
                      ]),
                    ]))
                  : z("", !0),
              ]),
            ]),
            _: 1,
          },
          8,
          ["href"]
        )
      );
    },
  });
const A1 = N(M1, [["__scopeId", "data-v-b8147458"]]),
  I1 = { key: 0, class: "VPFeatures" },
  N1 = { class: "container" },
  O1 = { class: "items" },
  B1 = H({
    __name: "VPFeatures",
    props: { features: null },
    setup(e) {
      const t = e,
        n = se(() => {
          const s = t.features.length;
          if (s) {
            if (s === 2) return "grid-2";
            if (s === 3) return "grid-3";
            if (s % 3 === 0) return "grid-6";
            if (s % 2 === 0) return "grid-4";
          } else return;
        });
      return (s, o) =>
        e.features
          ? (d(),
            m("div", I1, [
              g("div", N1, [
                g("div", O1, [
                  (d(!0),
                  m(
                    q,
                    null,
                    ke(
                      e.features,
                      (r) => (
                        d(),
                        m(
                          "div",
                          { key: r.title, class: de(["item", [_(n)]]) },
                          [
                            V(
                              A1,
                              {
                                icon: r.icon,
                                title: r.title,
                                details: r.details,
                                link: r.link,
                                "link-text": r.linkText,
                              },
                              null,
                              8,
                              ["icon", "title", "details", "link", "link-text"]
                            ),
                          ],
                          2
                        )
                      )
                    ),
                    128
                  )),
                ]),
              ]),
            ]))
          : z("", !0);
    },
  });
const F1 = N(B1, [["__scopeId", "data-v-69662dc1"]]),
  H1 = H({
    __name: "VPHomeFeatures",
    setup(e) {
      const { frontmatter: t } = ie();
      return (n, s) =>
        _(t).features
          ? (d(),
            G(
              F1,
              { key: 0, class: "VPHomeFeatures", features: _(t).features },
              null,
              8,
              ["features"]
            ))
          : z("", !0);
    },
  }),
  R1 = { class: "VPHome" },
  D1 = H({
    __name: "VPHome",
    setup(e) {
      return (t, n) => {
        const s = Lt("Content");
        return (
          d(),
          m("div", R1, [
            T(t.$slots, "home-hero-before", {}, void 0, !0),
            V(b1),
            T(t.$slots, "home-hero-after", {}, void 0, !0),
            T(t.$slots, "home-features-before", {}, void 0, !0),
            V(H1),
            T(t.$slots, "home-features-after", {}, void 0, !0),
            V(s),
          ])
        );
      };
    },
  });
const j1 = N(D1, [["__scopeId", "data-v-1db23833"]]);
var ar;
const dn = typeof window < "u";
dn &&
  ((ar = window == null ? void 0 : window.navigator) == null
    ? void 0
    : ar.userAgent) &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);
function z1(e) {
  return e;
}
function U1(e) {
  return Gi() ? (Yi(e), !0) : !1;
}
function K1(e) {
  return typeof e == "function" ? se(e) : ve(e);
}
function W1(e, t = !0) {
  ro() ? Re(e) : t ? e() : Js(e);
}
const q1 = dn ? window : void 0;
dn && window.document;
dn && window.navigator;
dn && window.location;
function G1(e, t = !1) {
  const n = ve(),
    s = () => (n.value = Boolean(e()));
  return s(), W1(s, t), n;
}
function ur(e, t = {}) {
  const { window: n = q1 } = t,
    s = G1(() => n && "matchMedia" in n && typeof n.matchMedia == "function");
  let o;
  const r = ve(!1),
    i = () => {
      !o ||
        ("removeEventListener" in o
          ? o.removeEventListener("change", l)
          : o.removeListener(l));
    },
    l = () => {
      !s.value ||
        (i(),
        (o = n.matchMedia(K1(e).value)),
        (r.value = o.matches),
        "addEventListener" in o
          ? o.addEventListener("change", l)
          : o.addListener(l));
    };
  return zt(l), U1(() => i()), r;
}
const Is =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  Ns = "__vueuse_ssr_handlers__";
Is[Ns] = Is[Ns] || {};
Is[Ns];
var fr;
(function (e) {
  (e.UP = "UP"),
    (e.RIGHT = "RIGHT"),
    (e.DOWN = "DOWN"),
    (e.LEFT = "LEFT"),
    (e.NONE = "NONE");
})(fr || (fr = {}));
var Y1 = Object.defineProperty,
  dr = Object.getOwnPropertySymbols,
  Q1 = Object.prototype.hasOwnProperty,
  J1 = Object.prototype.propertyIsEnumerable,
  hr = (e, t, n) =>
    t in e
      ? Y1(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  X1 = (e, t) => {
    for (var n in t || (t = {})) Q1.call(t, n) && hr(e, n, t[n]);
    if (dr) for (var n of dr(t)) J1.call(t, n) && hr(e, n, t[n]);
    return e;
  };
const Z1 = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
X1({ linear: z1 }, Z1);
function e0() {
  const { hasSidebar: e } = tt(),
    t = ur("(min-width: 960px)"),
    n = ur("(min-width: 1280px)");
  return {
    isAsideEnabled: se(() =>
      !n.value && !t.value ? !1 : e.value ? n.value : t.value
    ),
  };
}
const t0 = 71;
function n0(e) {
  if (e === !1) return [];
  let t = [];
  return (
    document.querySelectorAll("h2, h3, h4, h5, h6").forEach((n) => {
      n.textContent &&
        n.id &&
        t.push({
          level: Number(n.tagName[1]),
          title: n.innerText.replace(/\s+#\s*$/, ""),
          link: `#${n.id}`,
        });
    }),
    s0(t, e)
  );
}
function s0(e, t = 2) {
  return o0(e, typeof t == "number" ? [t, t] : t === "deep" ? [2, 6] : t);
}
function o0(e, t) {
  const n = [];
  return (
    (e = e.map((s) => ({ ...s }))),
    e.forEach((s, o) => {
      s.level >= t[0] && s.level <= t[1] && r0(o, e, t) && n.push(s);
    }),
    n
  );
}
function r0(e, t, n) {
  if (e === 0) return !0;
  const s = t[e];
  for (let o = e - 1; o >= 0; o--) {
    const r = t[o];
    if (r.level < s.level && r.level >= n[0] && r.level <= n[1])
      return r.children == null && (r.children = []), r.children.push(s), !1;
  }
  return !0;
}
function i0(e, t) {
  const { isAsideEnabled: n } = e0(),
    s = eu(r, 100);
  let o = null;
  Re(() => {
    requestAnimationFrame(r), window.addEventListener("scroll", s);
  }),
    Zs(() => {
      i(location.hash);
    }),
    vt(() => {
      window.removeEventListener("scroll", s);
    });
  function r() {
    if (!n.value) return;
    const l = [].slice.call(e.value.querySelectorAll(".outline-link")),
      c = [].slice
        .call(document.querySelectorAll(".content .header-anchor"))
        .filter((P) =>
          l.some((U) => U.hash === P.hash && P.offsetParent !== null)
        ),
      f = window.scrollY,
      h = window.innerHeight,
      v = document.body.offsetHeight,
      b = Math.abs(f + h - v) < 1;
    if (c.length && b) {
      i(c[c.length - 1].hash);
      return;
    }
    for (let P = 0; P < c.length; P++) {
      const U = c[P],
        F = c[P + 1],
        [te, $] = l0(P, U, F);
      if (te) {
        i($);
        return;
      }
    }
  }
  function i(l) {
    o && o.classList.remove("active"),
      l !== null &&
        (o = e.value.querySelector(`a[href="${decodeURIComponent(l)}"]`));
    const c = o;
    c
      ? (c.classList.add("active"),
        (t.value.style.top = c.offsetTop + 33 + "px"),
        (t.value.style.opacity = "1"))
      : ((t.value.style.top = "33px"), (t.value.style.opacity = "0"));
  }
}
function _r(e) {
  return e.parentElement.offsetTop - t0;
}
function l0(e, t, n) {
  const s = window.scrollY;
  return e === 0 && s === 0
    ? [!0, null]
    : s < _r(t)
    ? [!1, null]
    : !n || s < _r(n)
    ? [!0, t.hash]
    : [!1, null];
}
const c0 = ["href"],
  a0 = H({
    __name: "VPDocAsideOutlineItem",
    props: { headers: null, onClick: null, root: { type: Boolean } },
    setup(e) {
      return (t, n) => {
        const s = Lt("VPDocAsideOutlineItem", !0);
        return (
          d(),
          m(
            "ul",
            { class: de(e.root ? "root" : "nested") },
            [
              (d(!0),
              m(
                q,
                null,
                ke(
                  e.headers,
                  ({ children: o, link: r, title: i }) => (
                    d(),
                    m("li", null, [
                      g(
                        "a",
                        {
                          class: "outline-link",
                          href: r,
                          onClick:
                            n[0] ||
                            (n[0] = (...l) => e.onClick && e.onClick(...l)),
                        },
                        ae(i),
                        9,
                        c0
                      ),
                      o != null && o.length
                        ? (d(),
                          G(
                            s,
                            { key: 0, headers: o, onClick: e.onClick },
                            null,
                            8,
                            ["headers", "onClick"]
                          ))
                        : z("", !0),
                    ])
                  )
                ),
                256
              )),
            ],
            2
          )
        );
      };
    },
  });
const u0 = N(a0, [["__scopeId", "data-v-1188541a"]]),
  f0 = (e) => (We("data-v-2865c0b0"), (e = e()), qe(), e),
  d0 = { class: "content" },
  h0 = { class: "outline-title" },
  _0 = { "aria-labelledby": "doc-outline-aria-label" },
  p0 = f0(() =>
    g(
      "span",
      { class: "visually-hidden", id: "doc-outline-aria-label" },
      " Table of Contents for current page ",
      -1
    )
  ),
  v0 = H({
    __name: "VPDocAsideOutline",
    setup(e) {
      const { frontmatter: t, theme: n } = ie(),
        s = se(() => {
          var h;
          return (h = t.value.outline) != null ? h : n.value.outline;
        }),
        o = Ke("onContentUpdated");
      o.value = () => {
        r.value = n0(s.value);
      };
      const r = ve([]),
        i = se(() => r.value.length > 0),
        l = ve(),
        c = ve();
      i0(l, c);
      function f({ target: h }) {
        const v = "#" + h.href.split("#")[1],
          b = document.querySelector(decodeURIComponent(v));
        b == null || b.focus();
      }
      return (h, v) => (
        d(),
        m(
          "div",
          {
            class: de(["VPDocAsideOutline", { "has-outline": _(i) }]),
            ref_key: "container",
            ref: l,
          },
          [
            g("div", d0, [
              g(
                "div",
                { class: "outline-marker", ref_key: "marker", ref: c },
                null,
                512
              ),
              g("div", h0, ae(_(n).outlineTitle || "On this page"), 1),
              g("nav", _0, [
                p0,
                V(u0, { headers: r.value, root: !0, onClick: f }, null, 8, [
                  "headers",
                ]),
              ]),
            ]),
          ],
          2
        )
      );
    },
  });
const m0 = N(v0, [["__scopeId", "data-v-2865c0b0"]]),
  g0 = { class: "VPDocAsideCarbonAds" },
  b0 = H({
    __name: "VPDocAsideCarbonAds",
    setup(e) {
      const t = () => null;
      return (n, s) => (d(), m("div", g0, [V(_(t))]));
    },
  }),
  y0 = (e) => (We("data-v-afc4c1a1"), (e = e()), qe(), e),
  w0 = { class: "VPDocAside" },
  $0 = y0(() => g("div", { class: "spacer" }, null, -1)),
  x0 = H({
    __name: "VPDocAside",
    setup(e) {
      const { theme: t } = ie();
      return (n, s) => (
        d(),
        m("div", w0, [
          T(n.$slots, "aside-top", {}, void 0, !0),
          T(n.$slots, "aside-outline-before", {}, void 0, !0),
          V(m0),
          T(n.$slots, "aside-outline-after", {}, void 0, !0),
          $0,
          T(n.$slots, "aside-ads-before", {}, void 0, !0),
          _(t).carbonAds ? (d(), G(b0, { key: 0 })) : z("", !0),
          T(n.$slots, "aside-ads-after", {}, void 0, !0),
          T(n.$slots, "aside-bottom", {}, void 0, !0),
        ])
      );
    },
  });
const P0 = N(x0, [["__scopeId", "data-v-afc4c1a1"]]);
function k0() {
  const { theme: e, page: t } = ie();
  return se(() => {
    const { text: n = "Edit this page", pattern: s } = e.value.editLink || {},
      { relativePath: o } = t.value;
    return { url: s.replace(/:path/g, o), text: n };
  });
}
function C0() {
  const { page: e, theme: t, frontmatter: n } = ie();
  return se(() => {
    const s = $i(t.value.sidebar, e.value.relativePath),
      o = tu(s),
      r = o.findIndex((i) => Yt(e.value.relativePath, i.link));
    return {
      prev: n.value.prev ? { ...o[r - 1], text: n.value.prev } : o[r - 1],
      next: n.value.next ? { ...o[r + 1], text: n.value.next } : o[r + 1],
    };
  });
}
const S0 = {},
  V0 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
  T0 = g(
    "path",
    {
      d: "M18,23H4c-1.7,0-3-1.3-3-3V6c0-1.7,1.3-3,3-3h7c0.6,0,1,0.4,1,1s-0.4,1-1,1H4C3.4,5,3,5.4,3,6v14c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-7c0-0.6,0.4-1,1-1s1,0.4,1,1v7C21,21.7,19.7,23,18,23z",
    },
    null,
    -1
  ),
  L0 = g(
    "path",
    {
      d: "M8,17c-0.3,0-0.5-0.1-0.7-0.3C7,16.5,6.9,16.1,7,15.8l1-4c0-0.2,0.1-0.3,0.3-0.5l9.5-9.5c1.2-1.2,3.2-1.2,4.4,0c1.2,1.2,1.2,3.2,0,4.4l-9.5,9.5c-0.1,0.1-0.3,0.2-0.5,0.3l-4,1C8.2,17,8.1,17,8,17zM9.9,12.5l-0.5,2.1l2.1-0.5l9.3-9.3c0.4-0.4,0.4-1.1,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l0,0L9.9,12.5z M18.5,2.5L18.5,2.5L18.5,2.5z",
    },
    null,
    -1
  ),
  E0 = [T0, L0];
function M0(e, t) {
  return d(), m("svg", V0, E0);
}
const A0 = N(S0, [["render", M0]]),
  I0 = { class: "VPLastUpdated" },
  N0 = ["datetime"],
  O0 = H({
    __name: "VPDocFooterLastUpdated",
    setup(e) {
      const { theme: t, page: n } = ie(),
        s = se(() => new Date(n.value.lastUpdated)),
        o = se(() => s.value.toISOString()),
        r = ve("");
      return (
        Re(() => {
          zt(() => {
            r.value = s.value.toLocaleString(window.navigator.language);
          });
        }),
        (i, l) => {
          var c;
          return (
            d(),
            m("p", I0, [
              Ve(
                ae((c = _(t).lastUpdatedText) != null ? c : "Last updated") +
                  ": ",
                1
              ),
              g("time", { datetime: _(o) }, ae(r.value), 9, N0),
            ])
          );
        }
      );
    },
  });
const B0 = N(O0, [["__scopeId", "data-v-18fe8fc2"]]),
  F0 = { key: 0, class: "VPDocFooter" },
  H0 = { key: 0, class: "edit-info" },
  R0 = { key: 0, class: "edit-link" },
  D0 = { key: 1, class: "last-updated" },
  j0 = { key: 1, class: "prev-next" },
  z0 = { class: "pager" },
  U0 = ["href"],
  K0 = ["innerHTML"],
  W0 = ["innerHTML"],
  q0 = ["href"],
  G0 = ["innerHTML"],
  Y0 = ["innerHTML"],
  Q0 = H({
    __name: "VPDocFooter",
    setup(e) {
      const { theme: t, page: n, frontmatter: s } = ie(),
        o = k0(),
        r = C0(),
        i = se(() => t.value.editLink && s.value.editLink !== !1),
        l = se(() => n.value.lastUpdated && s.value.lastUpdated !== !1),
        c = se(() => i.value || l.value || r.value.prev || r.value.next);
      return (f, h) => {
        var v, b, P, U;
        return _(c)
          ? (d(),
            m("footer", F0, [
              _(i) || _(l)
                ? (d(),
                  m("div", H0, [
                    _(i)
                      ? (d(),
                        m("div", R0, [
                          V(
                            Et,
                            {
                              class: "edit-link-button",
                              href: _(o).url,
                              "no-icon": !0,
                            },
                            {
                              default: I(() => [
                                V(A0, { class: "edit-link-icon" }),
                                Ve(" " + ae(_(o).text), 1),
                              ]),
                              _: 1,
                            },
                            8,
                            ["href"]
                          ),
                        ]))
                      : z("", !0),
                    _(l) ? (d(), m("div", D0, [V(B0)])) : z("", !0),
                  ]))
                : z("", !0),
              _(r).prev || _(r).next
                ? (d(),
                  m("div", j0, [
                    g("div", z0, [
                      _(r).prev
                        ? (d(),
                          m(
                            "a",
                            {
                              key: 0,
                              class: "pager-link prev",
                              href: _(Nn)(_(r).prev.link),
                            },
                            [
                              g(
                                "span",
                                {
                                  class: "desc",
                                  innerHTML:
                                    (b =
                                      (v = _(t).docFooter) == null
                                        ? void 0
                                        : v.prev) != null
                                      ? b
                                      : "Previous page",
                                },
                                null,
                                8,
                                K0
                              ),
                              g(
                                "span",
                                { class: "title", innerHTML: _(r).prev.text },
                                null,
                                8,
                                W0
                              ),
                            ],
                            8,
                            U0
                          ))
                        : z("", !0),
                    ]),
                    g(
                      "div",
                      { class: de(["pager", { "has-prev": _(r).prev }]) },
                      [
                        _(r).next
                          ? (d(),
                            m(
                              "a",
                              {
                                key: 0,
                                class: "pager-link next",
                                href: _(Nn)(_(r).next.link),
                              },
                              [
                                g(
                                  "span",
                                  {
                                    class: "desc",
                                    innerHTML:
                                      (U =
                                        (P = _(t).docFooter) == null
                                          ? void 0
                                          : P.next) != null
                                        ? U
                                        : "Next page",
                                  },
                                  null,
                                  8,
                                  G0
                                ),
                                g(
                                  "span",
                                  { class: "title", innerHTML: _(r).next.text },
                                  null,
                                  8,
                                  Y0
                                ),
                              ],
                              8,
                              q0
                            ))
                          : z("", !0),
                      ],
                      2
                    ),
                  ]))
                : z("", !0),
            ]))
          : z("", !0);
      };
    },
  });
const J0 = N(Q0, [["__scopeId", "data-v-21f75714"]]),
  X0 = (e) => (We("data-v-cfb513e0"), (e = e()), qe(), e),
  Z0 = { class: "container" },
  e_ = { key: 0, class: "aside" },
  t_ = X0(() => g("div", { class: "aside-curtain" }, null, -1)),
  n_ = { class: "aside-container" },
  s_ = { class: "aside-content" },
  o_ = { class: "content" },
  r_ = { class: "content-container" },
  i_ = { class: "main" },
  l_ = H({
    __name: "VPDoc",
    setup(e) {
      const t = mt(),
        { hasSidebar: n, hasAside: s } = tt(),
        o = se(() => t.path.replace(/[./]+/g, "_").replace(/_html$/, "")),
        r = ve();
      return (
        Qn("onContentUpdated", r),
        (i, l) => {
          const c = Lt("Content");
          return (
            d(),
            m(
              "div",
              {
                class: de([
                  "VPDoc",
                  { "has-sidebar": _(n), "has-aside": _(s) },
                ]),
              },
              [
                g("div", Z0, [
                  _(s)
                    ? (d(),
                      m("div", e_, [
                        t_,
                        g("div", n_, [
                          g("div", s_, [
                            V(P0, null, {
                              "aside-top": I(() => [
                                T(i.$slots, "aside-top", {}, void 0, !0),
                              ]),
                              "aside-bottom": I(() => [
                                T(i.$slots, "aside-bottom", {}, void 0, !0),
                              ]),
                              "aside-outline-before": I(() => [
                                T(
                                  i.$slots,
                                  "aside-outline-before",
                                  {},
                                  void 0,
                                  !0
                                ),
                              ]),
                              "aside-outline-after": I(() => [
                                T(
                                  i.$slots,
                                  "aside-outline-after",
                                  {},
                                  void 0,
                                  !0
                                ),
                              ]),
                              "aside-ads-before": I(() => [
                                T(i.$slots, "aside-ads-before", {}, void 0, !0),
                              ]),
                              "aside-ads-after": I(() => [
                                T(i.$slots, "aside-ads-after", {}, void 0, !0),
                              ]),
                              _: 3,
                            }),
                          ]),
                        ]),
                      ]))
                    : z("", !0),
                  g("div", o_, [
                    g("div", r_, [
                      T(i.$slots, "doc-before", {}, void 0, !0),
                      g("main", i_, [
                        V(
                          c,
                          {
                            class: de(["vp-doc", _(o)]),
                            onContentUpdated: r.value,
                          },
                          null,
                          8,
                          ["class", "onContentUpdated"]
                        ),
                      ]),
                      T(i.$slots, "doc-footer-before", {}, void 0, !0),
                      V(J0),
                      T(i.$slots, "doc-after", {}, void 0, !0),
                    ]),
                  ]),
                ]),
              ],
              2
            )
          );
        }
      );
    },
  });
const c_ = N(l_, [["__scopeId", "data-v-cfb513e0"]]),
  a_ = H({
    __name: "VPContent",
    setup(e) {
      const t = mt(),
        { frontmatter: n } = ie(),
        { hasSidebar: s } = tt(),
        o = Ke("NotFound");
      return (r, i) => (
        d(),
        m(
          "div",
          {
            class: de([
              "VPContent",
              { "has-sidebar": _(s), "is-home": _(n).layout === "home" },
            ]),
            id: "VPContent",
          },
          [
            _(t).component === _(o)
              ? (d(), G(_(o), { key: 0 }))
              : _(n).layout === "page"
              ? (d(), G(s1, { key: 1 }))
              : _(n).layout === "home"
              ? (d(),
                G(
                  j1,
                  { key: 2 },
                  {
                    "home-hero-before": I(() => [
                      T(r.$slots, "home-hero-before", {}, void 0, !0),
                    ]),
                    "home-hero-after": I(() => [
                      T(r.$slots, "home-hero-after", {}, void 0, !0),
                    ]),
                    "home-features-before": I(() => [
                      T(r.$slots, "home-features-before", {}, void 0, !0),
                    ]),
                    "home-features-after": I(() => [
                      T(r.$slots, "home-features-after", {}, void 0, !0),
                    ]),
                    _: 3,
                  }
                ))
              : (d(),
                G(
                  c_,
                  { key: 3 },
                  {
                    "doc-footer-before": I(() => [
                      T(r.$slots, "doc-footer-before", {}, void 0, !0),
                    ]),
                    "doc-before": I(() => [
                      T(r.$slots, "doc-before", {}, void 0, !0),
                    ]),
                    "doc-after": I(() => [
                      T(r.$slots, "doc-after", {}, void 0, !0),
                    ]),
                    "aside-top": I(() => [
                      T(r.$slots, "aside-top", {}, void 0, !0),
                    ]),
                    "aside-outline-before": I(() => [
                      T(r.$slots, "aside-outline-before", {}, void 0, !0),
                    ]),
                    "aside-outline-after": I(() => [
                      T(r.$slots, "aside-outline-after", {}, void 0, !0),
                    ]),
                    "aside-ads-before": I(() => [
                      T(r.$slots, "aside-ads-before", {}, void 0, !0),
                    ]),
                    "aside-ads-after": I(() => [
                      T(r.$slots, "aside-ads-after", {}, void 0, !0),
                    ]),
                    "aside-bottom": I(() => [
                      T(r.$slots, "aside-bottom", {}, void 0, !0),
                    ]),
                    _: 3,
                  }
                )),
          ],
          2
        )
      );
    },
  });
const u_ = N(a_, [["__scopeId", "data-v-d981fe29"]]),
  f_ = { class: "container" },
  d_ = ["innerHTML"],
  h_ = ["innerHTML"],
  __ = H({
    __name: "VPFooter",
    setup(e) {
      const { theme: t } = ie(),
        { hasSidebar: n } = tt();
      return (s, o) =>
        _(t).footer
          ? (d(),
            m(
              "footer",
              { key: 0, class: de(["VPFooter", { "has-sidebar": _(n) }]) },
              [
                g("div", f_, [
                  _(t).footer.message
                    ? (d(),
                      m(
                        "p",
                        {
                          key: 0,
                          class: "message",
                          innerHTML: _(t).footer.message,
                        },
                        null,
                        8,
                        d_
                      ))
                    : z("", !0),
                  _(t).footer.copyright
                    ? (d(),
                      m(
                        "p",
                        {
                          key: 1,
                          class: "copyright",
                          innerHTML: _(t).footer.copyright,
                        },
                        null,
                        8,
                        h_
                      ))
                    : z("", !0),
                ]),
              ],
              2
            ))
          : z("", !0);
    },
  });
const p_ = N(__, [["__scopeId", "data-v-9f24cc86"]]),
  v_ = { key: 0, class: "Layout" },
  m_ = H({
    __name: "Layout",
    setup(e) {
      const { isOpen: t, open: n, close: s } = tt(),
        o = mt();
      Ze(() => o.path, s), nu(t, s), Qn("close-sidebar", s);
      const { frontmatter: r } = ie();
      return (i, l) => {
        const c = Lt("Content");
        return _(r).layout !== !1
          ? (d(),
            m("div", v_, [
              T(i.$slots, "layout-top", {}, void 0, !0),
              V(ou),
              V(lu, { class: "backdrop", show: _(t), onClick: _(s) }, null, 8, [
                "show",
                "onClick",
              ]),
              V(uh, null, {
                "nav-bar-title-before": I(() => [
                  T(i.$slots, "nav-bar-title-before", {}, void 0, !0),
                ]),
                "nav-bar-title-after": I(() => [
                  T(i.$slots, "nav-bar-title-after", {}, void 0, !0),
                ]),
                "nav-bar-content-before": I(() => [
                  T(i.$slots, "nav-bar-content-before", {}, void 0, !0),
                ]),
                "nav-bar-content-after": I(() => [
                  T(i.$slots, "nav-bar-content-after", {}, void 0, !0),
                ]),
                "nav-screen-content-before": I(() => [
                  T(i.$slots, "nav-screen-content-before", {}, void 0, !0),
                ]),
                "nav-screen-content-after": I(() => [
                  T(i.$slots, "nav-screen-content-after", {}, void 0, !0),
                ]),
                _: 3,
              }),
              V(kh, { open: _(t), onOpenMenu: _(n) }, null, 8, [
                "open",
                "onOpenMenu",
              ]),
              V(
                Zh,
                { open: _(t) },
                {
                  "sidebar-nav-before": I(() => [
                    T(i.$slots, "sidebar-nav-before", {}, void 0, !0),
                  ]),
                  "sidebar-nav-after": I(() => [
                    T(i.$slots, "sidebar-nav-after", {}, void 0, !0),
                  ]),
                  _: 3,
                },
                8,
                ["open"]
              ),
              V(u_, null, {
                "home-hero-before": I(() => [
                  T(i.$slots, "home-hero-before", {}, void 0, !0),
                ]),
                "home-hero-after": I(() => [
                  T(i.$slots, "home-hero-after", {}, void 0, !0),
                ]),
                "home-features-before": I(() => [
                  T(i.$slots, "home-features-before", {}, void 0, !0),
                ]),
                "home-features-after": I(() => [
                  T(i.$slots, "home-features-after", {}, void 0, !0),
                ]),
                "doc-footer-before": I(() => [
                  T(i.$slots, "doc-footer-before", {}, void 0, !0),
                ]),
                "doc-before": I(() => [
                  T(i.$slots, "doc-before", {}, void 0, !0),
                ]),
                "doc-after": I(() => [
                  T(i.$slots, "doc-after", {}, void 0, !0),
                ]),
                "aside-top": I(() => [
                  T(i.$slots, "aside-top", {}, void 0, !0),
                ]),
                "aside-bottom": I(() => [
                  T(i.$slots, "aside-bottom", {}, void 0, !0),
                ]),
                "aside-outline-before": I(() => [
                  T(i.$slots, "aside-outline-before", {}, void 0, !0),
                ]),
                "aside-outline-after": I(() => [
                  T(i.$slots, "aside-outline-after", {}, void 0, !0),
                ]),
                "aside-ads-before": I(() => [
                  T(i.$slots, "aside-ads-before", {}, void 0, !0),
                ]),
                "aside-ads-after": I(() => [
                  T(i.$slots, "aside-ads-after", {}, void 0, !0),
                ]),
                _: 3,
              }),
              V(p_),
              T(i.$slots, "layout-bottom", {}, void 0, !0),
            ]))
          : (d(), G(c, { key: 1 }));
      };
    },
  });
const g_ = N(m_, [["__scopeId", "data-v-f44a984a"]]),
  rs = (e) => (We("data-v-95656537"), (e = e()), qe(), e),
  b_ = { class: "NotFound" },
  y_ = rs(() => g("p", { class: "code" }, "404", -1)),
  w_ = rs(() => g("h1", { class: "title" }, "PAGE NOT FOUND", -1)),
  $_ = rs(() => g("div", { class: "divider" }, null, -1)),
  x_ = rs(() =>
    g(
      "blockquote",
      { class: "quote" },
      " But if you don't change your direction, and if you keep looking, you may end up where you are heading. ",
      -1
    )
  ),
  P_ = { class: "action" },
  k_ = ["href"],
  C_ = H({
    __name: "NotFound",
    setup(e) {
      const { site: t } = ie();
      return (n, s) => (
        d(),
        m("div", b_, [
          y_,
          w_,
          $_,
          x_,
          g("div", P_, [
            g(
              "a",
              { class: "link", href: _(t).base, "aria-label": "go to home" },
              " Take me home ",
              8,
              k_
            ),
          ]),
        ])
      );
    },
  });
const S_ = N(C_, [["__scopeId", "data-v-95656537"]]);
const Dt = {
  Layout: g_,
  NotFound: S_,
  enhanceApp: ({ app: e }) => {
    e.component("Badge", Aa);
  },
};
function V_(e, t) {
  let n = [],
    s = !0;
  const o = (r) => {
    if (s) {
      s = !1;
      return;
    }
    n.forEach((i) => document.head.removeChild(i)),
      (n = []),
      r.forEach((i) => {
        const l = T_(i);
        document.head.appendChild(l), n.push(l);
      });
  };
  zt(() => {
    const r = e.data,
      i = t.value,
      l = r && r.description,
      c = (r && r.frontmatter.head) || [];
    (document.title = mi(i, r)),
      document
        .querySelector("meta[name=description]")
        .setAttribute("content", l || i.description),
      o(Da(i.head, E_(c)));
  });
}
function T_([e, t, n]) {
  const s = document.createElement(e);
  for (const o in t) s.setAttribute(o, t[o]);
  return n && (s.innerHTML = n), s;
}
function L_(e) {
  return e[0] === "meta" && e[1] && e[1].name === "description";
}
function E_(e) {
  return e.filter((t) => !L_(t));
}
const gs = new Set(),
  Mi = () => document.createElement("link"),
  M_ = (e) => {
    const t = Mi();
    (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
  },
  A_ = (e) => {
    const t = new XMLHttpRequest();
    t.open("GET", e, (t.withCredentials = !0)), t.send();
  };
let xn;
const I_ =
  Le &&
  (xn = Mi()) &&
  xn.relList &&
  xn.relList.supports &&
  xn.relList.supports("prefetch")
    ? M_
    : A_;
function N_() {
  if (!Le || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((r) => {
        r.forEach((i) => {
          if (i.isIntersecting) {
            const l = i.target;
            n.unobserve(l);
            const { pathname: c } = l;
            if (!gs.has(c)) {
              gs.add(c);
              const f = gi(c);
              I_(f);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll("#app a").forEach((r) => {
          const { target: i, hostname: l, pathname: c } = r,
            f = c.match(/\.\w+$/);
          (f && f[0] !== ".html") ||
            (i !== "_blank" &&
              l === location.hostname &&
              (c !== location.pathname ? n.observe(r) : gs.add(c)));
        });
      });
  };
  Re(s);
  const o = mt();
  Ze(() => o.path, s),
    vt(() => {
      n && n.disconnect();
    });
}
const O_ = H({
  setup(e, { slots: t }) {
    const n = ve(!1);
    return (
      Re(() => {
        n.value = !0;
      }),
      () => (n.value && t.default ? t.default() : null)
    );
  },
});
function B_() {
  if (Le) {
    const e = new Map();
    window.addEventListener("click", (t) => {
      var s;
      const n = t.target;
      if (n.matches('div[class*="language-"] > button.copy')) {
        const o = n.parentElement,
          r =
            (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling;
        if (!o || !r) return;
        const i = /language-(shellscript|shell|bash|sh|zsh)/.test(
          o.classList.toString()
        );
        let { innerText: l = "" } = r;
        i && (l = l.replace(/^ *(\$|>) /gm, "").trim()),
          F_(l).then(() => {
            n.classList.add("copied"), clearTimeout(e.get(n));
            const c = setTimeout(() => {
              n.classList.remove("copied"), n.blur(), e.delete(n);
            }, 2e3);
            e.set(n, c);
          });
      }
    });
  }
}
async function F_(e) {
  try {
    return navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea"),
      n = document.activeElement;
    (t.value = e),
      t.setAttribute("readonly", ""),
      (t.style.contain = "strict"),
      (t.style.position = "absolute"),
      (t.style.left = "-9999px"),
      (t.style.fontSize = "12pt");
    const s = document.getSelection(),
      o = s ? s.rangeCount > 0 && s.getRangeAt(0) : null;
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand("copy"),
      document.body.removeChild(t),
      o && (s.removeAllRanges(), s.addRange(o)),
      n && n.focus();
  }
}
const Ai = Dt.NotFound || (() => "404 Not Found"),
  H_ = H({
    name: "VitePressApp",
    setup() {
      const { site: e } = ie();
      return (
        Re(() => {
          Ze(
            () => e.value.lang,
            (t) => {
              document.documentElement.lang = t;
            },
            { immediate: !0 }
          );
        }),
        N_(),
        B_(),
        Dt.setup && Dt.setup(),
        () => An(Dt.Layout)
      );
    },
  });
function R_() {
  const e = j_(),
    t = D_();
  t.provide(yi, e);
  const n = Ka(e.route);
  return (
    t.provide(bi, n),
    t.provide("NotFound", Ai),
    t.component("Content", Ya),
    t.component("ClientOnly", O_),
    Object.defineProperty(t.config.globalProperties, "$frontmatter", {
      get() {
        return n.frontmatter.value;
      },
    }),
    Dt.enhanceApp && Dt.enhanceApp({ app: t, router: e, siteData: Wt }),
    { app: t, router: e, data: n }
  );
}
function D_() {
  return Sa(H_);
}
function j_() {
  let e = Le,
    t;
  return qa((n) => {
    let s = gi(n);
    return (
      e && (t = s),
      (e || t === s) && (s = s.replace(/\.js$/, ".lean.js")),
      Le && (e = !1),
      Ea(() => import(s), [])
    );
  }, Ai);
}
if (Le) {
  const { app: e, router: t, data: n } = R_();
  t.go().then(() => {
    V_(t.route, n.site), e.mount("#app");
  });
}
export {
  q as F,
  N as _,
  d as a,
  qe as b,
  m as c,
  R_ as createApp,
  g as d,
  V as e,
  Tc as f,
  Re as o,
  We as p,
  Lt as r,
};
