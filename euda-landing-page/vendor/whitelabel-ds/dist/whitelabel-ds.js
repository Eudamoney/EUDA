import a from "react";
import "react-dom";
const r = {}, z1 = typeof window < "u" ? window.WhitelabelDS = window.WhitelabelDS || {} : {};
z1.__errors = z1.__errors || [];
try {
  typeof document < "u" && document.documentElement && !document.documentElement.hasAttribute("data-ds-v2") && document.documentElement.setAttribute("data-ds-v2", "");
} catch {
}
function G1(t, e) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || e;
  } catch {
    return e;
  }
}
function la(t, e) {
  const h = G1(t, e);
  return h.slice(-2) === "ms" ? parseFloat(h) : h.slice(-1) === "s" ? parseFloat(h) * 1e3 : parseFloat(h) || parseFloat(e);
}
function Ka() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function na(t) {
  const e = getComputedStyle(t);
  return { opacity: e.opacity, translate: e.translate || "none", scale: e.scale || "none", filter: e.filter || "none" };
}
function Ua(t, e) {
  if (e) return e;
  const h = t.className && t.className.baseVal === void 0 ? String(t.className) : "";
  return /ds-drawer/.test(h) ? /--left/.test(h) ? "slide-left" : "slide" : /ds-dialog/.test(h) && window.matchMedia && window.matchMedia("(max-width: 560px)").matches ? "sheet" : "pop";
}
function Q1(t) {
  return parseFloat(t) || 0;
}
function va(t, e) {
  if (e = e || {}, !t)
    return e.onDone && e.onDone(), Promise.resolve();
  if (t.__afiClose) return t.__afiClose.promise;
  if (Ka())
    return e.onDone && e.onDone(), Promise.resolve();
  const h = Ua(t, e.kind), d = e.duration || (h === "fold" ? la("--mo-dur-fold", "450ms") : la("--mo-dur-exit", "300ms")), c = G1(h === "fold" ? "--mo-ease-in-out" : "--mo-ease-exit", "cubic-bezier(.7,0,.15,1)"), l = { duration: d, easing: c, fill: "forwards" }, n = { el: t, anims: [], done: !1, kind: h };
  t.setAttribute("data-motion-js", ""), t.setAttribute("data-state", "closing");
  const p = t.tagName === "DIALOG" && !/ds-drawer/.test(t.className) && t.querySelector('[class*="__panel"],.ds-dialog') || t, M = na(p);
  p.getAnimations().forEach((s) => s.cancel());
  let i;
  if (h === "fold") {
    const s = getComputedStyle(t), v = t.offsetHeight, m = e.gap > 0 ? e.gap : 0, y = { height: "0px", marginTop: m ? -m + "px" : "0px", marginBottom: "0px", paddingTop: "0px", paddingBottom: "0px", borderTopWidth: "0px", borderBottomWidth: "0px", opacity: 0, filter: "blur(8px)", translate: "0 -16px", overflow: "hidden" };
    i = [{ height: v + "px", marginTop: s.marginTop, marginBottom: s.marginBottom, paddingTop: s.paddingTop, paddingBottom: s.paddingBottom, borderTopWidth: s.borderTopWidth, borderBottomWidth: s.borderBottomWidth, opacity: 1, filter: "blur(0px)", translate: "0 0", overflow: "hidden" }, y];
  } else {
    const s = Q1(G1("--dimension-1", "4px")), v = Q1(G1("--dimension-14", "56px")), m = Q1(G1("--motion-reveal-blur-light", "4px")) / 2, y = h === "sheet" ? { opacity: 1, translate: "0 100%", scale: "none", filter: "none" } : h === "slide" ? { opacity: 0, translate: v + "px 0", scale: "none", filter: "none" } : h === "slide-left" ? { opacity: 0, translate: -v + "px 0", scale: "none", filter: "none" } : h === "fade" ? { opacity: 0, translate: M.translate, scale: M.scale, filter: M.filter } : { opacity: 0, translate: "0 " + -s + "px", scale: ".98", filter: "blur(" + m + "px)" };
    i = [M, y];
  }
  if (n.anims.push(p.animate(i, l)), (e.also || []).forEach((s) => {
    if (!s) return;
    const v = na(s);
    s.getAnimations().forEach((g) => g.cancel());
    const m = Q1(G1("--dimension-1", "4px")), y = Q1(G1("--motion-reveal-blur-light", "4px")) / 2;
    n.anims.push(s.animate([v, { opacity: 0, translate: "0 " + -m + "px", scale: ".98", filter: "blur(" + y + "px)" }], l));
  }), t.tagName === "DIALOG")
    try {
      n.anims.push(t.animate([{ opacity: 1 }, { opacity: 0 }], { duration: d, easing: c, fill: "forwards", pseudoElement: "::backdrop" }));
    } catch {
    }
  const o = () => {
    if (n.done) return;
    n.done = !0, clearTimeout(n.timer);
    const s = () => {
      t.__afiClose === n && (n.anims.forEach((v) => {
        try {
          v.cancel();
        } catch {
        }
      }), t.removeAttribute("data-state"), t.removeAttribute("data-motion-js"), delete t.__afiClose);
    };
    try {
      e.onDone && e.onDone();
    } finally {
      requestAnimationFrame(() => requestAnimationFrame(s));
    }
    n.resolve();
  };
  return n.promise = new Promise((s) => {
    n.resolve = s;
  }), n.timer = setTimeout(o, d + 120), n.anims[0].onfinish = o, t.__afiClose = n, n.promise;
}
function ya(t) {
  const e = t && t.__afiClose;
  return !e || e.done ? Promise.resolve() : (clearTimeout(e.timer), e.reversing = !0, new Promise((h) => {
    const d = () => {
      if (t.__afiClose !== e) return h();
      e.anims.forEach((c) => {
        try {
          c.cancel();
        } catch {
        }
      }), t.removeAttribute("data-state"), t.removeAttribute("data-motion-js"), delete t.__afiClose, h();
    };
    e.anims.forEach((c) => {
      c.onfinish = null, c.reverse();
    }), e.anims[0].onfinish = d, e.timer = setTimeout(d, 600);
  }));
}
function Ga(t, e, h) {
  const [d, c] = a.useState(!!t), l = a.useRef(!0);
  return a.useEffect(() => {
    if (l.current) {
      l.current = !1;
      return;
    }
    if (t) {
      d ? e.current && ya(e.current) : c(!0);
      return;
    }
    d && va(e.current, { kind: h && h.kind, also: h && h.also && h.also.map((n) => n.current), onDone: () => c(!1) });
  }, [t]), { mounted: t || d, closing: !t && d };
}
Object.assign(r, { closeWithMotion: va, openWithMotion: ya, usePresence: Ga });
function i2() {
  return i2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, i2.apply(null, arguments);
}
function Xa({
  children: t,
  className: e = "",
  ...h
}) {
  return /* @__PURE__ */ a.createElement("div", i2({
    className: ["ds-legend-group", e].filter(Boolean).join(" ")
  }, h), t);
}
Object.assign(r, { LegendGroup: Xa });
function s2() {
  return s2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, s2.apply(null, arguments);
}
function Qa({
  label: t,
  color: e = "var(--chart-primary-primary)",
  type: h = "swatch",
  dashed: d = !1,
  value: c,
  pattern: l,
  className: n = "",
  ...p
}) {
  return /* @__PURE__ */ a.createElement("span", s2({
    className: ["ds-legend-item", n].filter(Boolean).join(" ")
  }, p), h === "line" ? /* @__PURE__ */ a.createElement("span", {
    className: ["ds-legend-item__line", d && "ds-legend-item__line--dashed"].filter(Boolean).join(" "),
    style: {
      background: d ? `repeating-linear-gradient(90deg, ${e} 0 6px, transparent 6px 10px)` : e
    }
  }) : h === "pattern" ? /* @__PURE__ */ a.createElement("span", {
    className: "ds-legend-item__swatch",
    style: {
      background: `repeating-linear-gradient(45deg, ${e} 0 2px, transparent 2px 4px)`,
      border: "1px solid " + e
    }
  }) : /* @__PURE__ */ a.createElement("span", {
    className: ["ds-legend-item__swatch", l != null && "ds-pat ds-pat--" + l].filter(Boolean).join(" "),
    style: l != null ? { "--pc": e } : {
      background: e
    }
  }), /* @__PURE__ */ a.createElement("span", null, t), c != null && /* @__PURE__ */ a.createElement("strong", {
    style: {
      color: "var(--content-primary)",
      fontWeight: "var(--font-weight-medium)"
    }
  }, c));
}
Object.assign(r, { LegendItem: Qa });
function o2() {
  return o2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, o2.apply(null, arguments);
}
function Ja(t) {
  return /* @__PURE__ */ a.createElement(r.LegendItem, o2({}, t, {
    type: "line"
  }));
}
Object.assign(r, { LegendItemLine: Ja });
function M2() {
  return M2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, M2.apply(null, arguments);
}
function a0(t) {
  return /* @__PURE__ */ a.createElement(r.LegendItem, M2({}, t, {
    type: "pattern"
  }));
}
Object.assign(r, { LegendItemPattern: a0 });
function m2() {
  return m2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, m2.apply(null, arguments);
}
function t0(t) {
  return /* @__PURE__ */ a.createElement(r.LegendItem, m2({}, t, {
    type: "swatch"
  }));
}
Object.assign(r, { LegendItemSwatch: t0 });
const e0 = ["var(--chart-primary-primary)", "var(--chart-primary-secondary)", "var(--color-neutral-600)", "var(--brand-accent)", "var(--color-neutral-500)"], h0 = ["var(--chart-monochrome-strong)", "var(--chart-monochrome-medium)", "var(--chart-monochrome-soft)", "var(--chart-monochrome-faint)"], d0 = ["var(--chart-positive-default)", "var(--chart-negative-default)"], xa = ["var(--color-primary-700)", "color-mix(in srgb, var(--color-primary-700) 52%, var(--brand-accent))", "color-mix(in srgb, var(--brand-accent) 90%, var(--color-primary-700))", "var(--chart-primary-secondary)", "color-mix(in srgb, var(--chart-primary-secondary) 46%, var(--color-neutral-0))"], r0 = xa.concat(["var(--color-neutral-700)", "var(--color-neutral-600)", "var(--color-neutral-500)", "var(--color-neutral-400)", "var(--color-neutral-300)"]), c0 = (t) => t === "ramp" ? xa : t === "ramp10" ? r0 : t === "monochrome" ? h0 : t === "positive-negative" ? d0 : e0, pa = "ds-chart-patterns", u2 = /* @__PURE__ */ (() => {
  let t = null;
  const e = /* @__PURE__ */ new Set(), h = () => {
    try {
      const d = window.localStorage.getItem(pa);
      if (d === "1") return !0;
      if (d === "0") return !1;
    } catch {
    }
    return !!(window.matchMedia && window.matchMedia("(prefers-contrast: more)").matches);
  };
  return { get() {
    return t === null && (t = h()), t;
  }, set(d) {
    t = !!d;
    try {
      window.localStorage.setItem(pa, t ? "1" : "0");
    } catch {
    }
    e.forEach((c) => c());
  }, sub(d) {
    return e.add(d), () => e.delete(d);
  } };
})(), l0 = (t) => u2.set(t), n0 = (t) => {
  const e = a.useSyncExternalStore(u2.sub, u2.get, () => !1);
  return t === void 0 || t === "auto" ? e : !!t;
}, p0 = (t, e, h) => {
  const d = t ?? (typeof e == "string" ? e : void 0), c = d ?? h;
  return c === "distinct" ? "primary" : c;
};
Object.assign(r, { chartPalette: c0, chartLook: p0, setChartPatterns: l0, useChartPatterns: n0 });
function v2() {
  return v2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, v2.apply(null, arguments);
}
function fa({
  data: t = [],
  style: e,
  look: h,
  downloads: d = !1,
  size: c = "md",
  height: l,
  showAxis: n = !0,
  title: p,
  unit: M,
  formatValue: i,
  description: o,
  dataTable: s = !1,
  dataLabel: v,
  graphLabel: m = "Chart",
  tableLabel: y = "Table",
  rowLabel: g = "Category",
  maxLabels: u,
  showValues: f = !1,
  single: L = !0,
  highlight: z = "max",
  glance: E = "auto",
  expand: _ = !0,
  expandLabel: B = "Expand",
  closeLabel: $ = "Close",
  interactive: A = !1,
  chartLabel: w,
  detail: H,
  panel: T = "auto",
  panelHint: C = "Press to see the breakdown",
  panelLabel: P = "Breakdown",
  prevLabel: q = "Previous",
  nextLabel: h1 = "Next",
  closePanelLabel: e1 = "Close breakdown",
  selectedIndex: _1,
  onSelect: o1,
  className: p1 = "",
  ...m1
}) {
  const d1 = r.chartLook(h, e, "primary"), [r1, E1] = a.useState(() => E !== "off" && !!(window.matchMedia && window.matchMedia("(max-width: 560px)").matches));
  a.useEffect(() => {
    if (E === "off" || !window.matchMedia) return;
    const N = window.matchMedia("(max-width: 560px)"), n1 = () => E1(N.matches);
    return N.addEventListener && N.addEventListener("change", n1), () => N.removeEventListener && N.removeEventListener("change", n1);
  }, [E]);
  const [V, R] = a.useState(!1), [F, l1] = a.useState("chart"), [O, j] = a.useState(null), [v1, G] = a.useState(null), f1 = _1 !== void 0, I = f1 ? _1 : v1, Y = (N) => {
    f1 || G(N), o1 && o1(N);
  }, i1 = a.useRef(null), s1 = "bc" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), y1 = E === "always" || E === "auto" && r1, M1 = y1 ? t.slice(-6) : t, C1 = (N) => i ? i(N) : typeof N == "number" ? N.toLocaleString("en-US") : N, P1 = (() => {
    const N = y1 ? 3 : u || 0;
    return !N || M1.length <= N || N < 2 ? null : new Set(Array.from({ length: N }, (n1, B1) => Math.round(B1 * (M1.length - 1) / (N - 1))));
  })(), N1 = y1 ? 64 : l || {
    sm: 120,
    md: 180,
    lg: 240
  }[c], K = r.chartPalette(d1), g1 = A && !y1, Q = g1 && !!H && T !== "off", u1 = M1.length, V1 = Q && I != null && I < u1 ? I : null, a1 = O ?? V1, b1 = (N) => {
    const n1 = i1.current;
    if (!n1 || u1 < 1) return null;
    const B1 = n1.getBoundingClientRect();
    return Math.max(0, Math.min(u1 - 1, Math.floor((N.clientX - B1.left) / (B1.width || 1) * u1)));
  }, t1 = (N) => {
    const n1 = (B1) => {
      N.preventDefault();
      const c2 = Q && I != null ? I : O ?? u1 - 1, X1 = Math.max(0, Math.min(u1 - 1, c2 + B1));
      j(X1), Q && I != null && Y(X1);
    };
    if (N.key === "ArrowRight") n1(1);
    else if (N.key === "ArrowLeft") n1(-1);
    else if (N.key === "Home")
      N.preventDefault(), j(0), Q && I != null && Y(0);
    else if (N.key === "End")
      N.preventDefault(), j(u1 - 1), Q && I != null && Y(u1 - 1);
    else if ((N.key === "Enter" || N.key === " ") && Q) {
      N.preventDefault();
      const B1 = O ?? u1 - 1;
      Y(I === B1 ? null : B1);
    } else N.key === "Escape" && (Q && I != null ? Y(null) : j(null));
  }, L1 = M1.reduce((N, n1, B1) => n1.value > M1[N].value ? B1 : N, 0), S1 = g1 && a1 != null ? a1 : z === "max" ? L1 : z, Z1 = (N) => {
    const n1 = "color-mix(in srgb, " + K[0] + " 28%, var(--background-surface))";
    return V1 != null ? N === V1 ? K[0] : N === O ? "color-mix(in srgb, " + K[0] + " 58%, var(--background-surface))" : n1 : S1 == null || (S1 === "last" ? N === M1.length - 1 : S1 === N) ? K[0] : n1;
  }, A1 = M1.reduce((N, n1) => N + (Number(n1.value) || 0), 0), W1 = Math.max(1, ...M1.map((N) => N.value)), q1 = o ? { ...m1, "aria-describedby": s1 + "-d" } : m1, x1 = g1 && a1 != null && a1 !== V1 && M1[a1] ? a.createElement("div", { className: `ds-chart__tip ds-chart__tip--${(a1 + 0.5) / u1 > 0.66 ? "end" : (a1 + 0.5) / u1 < 0.34 ? "start" : "center"}`, style: { left: (a1 + 0.5) / u1 * 100 + "%" }, role: "status", "aria-live": "polite" }, a.createElement("span", { className: "ds-chart__tip-title" }, M1[a1].label), a.createElement("span", { className: "ds-chart__tip-row" }, a.createElement("span", { className: "ds-chart__tip-key" }, M || "Value"), a.createElement("strong", null, C1(M1[a1].value))), Q ? a.createElement("span", { className: "ds-chart__tip-hint" }, C) : null) : null, $1 = /* @__PURE__ */ a.createElement("div", v2({
    className: ["ds-chart", p1].filter(Boolean).join(" ")
  }, q1), /* @__PURE__ */ a.createElement("div", {
    ref: i1,
    ...g1 ? { className: "ds-chart__bars", tabIndex: 0, role: "group", "aria-label": w || "Bar chart. Use the arrow keys to move through the values.", onPointerMove: (N) => j(b1(N)), onPointerDown: (N) => j(b1(N)), onPointerLeave: (N) => {
      N.pointerType !== "touch" && j(null);
    }, onFocus: () => j((N) => N ?? u1 - 1), onBlur: () => j(null), onKeyDown: t1, onClick: Q ? () => {
      const N = O;
      N != null && Y(I === N ? null : N);
    } : void 0 } : {},
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--layout-gap-compact)",
      height: N1,
      borderBottom: n ? "1px solid var(--chart-axis-primary)" : "none"
    }
  }, M1.map((N, n1) => /* @__PURE__ */ a.createElement("div", {
    key: n1,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: "100%"
    }
  }, f && /* @__PURE__ */ a.createElement("span", {
    className: "ds-chart__bar-value"
  }, C1(N.value)), /* @__PURE__ */ a.createElement("div", {
    title: g1 ? void 0 : `${N.label}: ${N.value}`,
    style: {
      opacity: g1 && !L && a1 != null && a1 !== n1 ? 0.45 : 1,
      height: `${N.value / W1 * 100}%`,
      background: N.color || (L ? Z1(n1) : K[n1 % K.length]),
      borderRadius: "var(--radius-xs) var(--radius-xs) 0 0"
    }
  })))), n && /* @__PURE__ */ a.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--layout-gap-compact)",
      marginTop: "var(--dimension-1)"
    }
  }, M1.map((N, n1) => /* @__PURE__ */ a.createElement("span", {
    key: n1,
    style: {
      flex: 1,
      textAlign: "center",
      fontSize: "var(--type-caption-size)",
      color: "var(--chart-labels-primary)"
    }
  }, P1 && !P1.has(n1) ? "" : N.label))), x1), H1 = M1.length ? M1[M1.length - 1] : null, O1 = y1 && H1 ? a.createElement("div", { className: "ds-chart-glance" }, a.createElement("strong", null, C1(H1.value)), a.createElement("span", null, [H1.label, M].filter(Boolean).join(" · "))) : null, b = M && !y1 ? a.createElement("div", { className: "ds-chart__unit" }, M) : null, W = y1 && _ ? a.createElement(r.Button, { variant: "ghost", size: "sm", iconEnd: a.createElement(r.Icon, { name: "maximize-2", size: "sm" }), onClick: () => R(!0), className: "ds-chart-expand" }, B) : null, c1 = o ? a.createElement("p", { id: s1 + "-d", className: "ds-visually-hidden" }, o) : null, X = s && t.length ? a.createElement(r.ChartDataTable, { columns: [{ key: "l", label: g, kind: "text" }, { key: "v", label: M || "Value", kind: "numeric" }], rows: t.map((N, n1) => ({ id: n1, l: N.label, v: C1(N.value) })) }) : null, k = s && t.length ? a.createElement(r.ChartViewSwitch, { view: F, onChange: l1, graphLabel: m, tableLabel: y }) : null, D = d && t.length ? { name: p || M || "data", head: [g, M || "Value"], rows: t.map((N) => [N.label, N.value]) } : null, J = D ? a.createElement(r.ChartOptions, { csv: D }) : null, w1 = k || J ? a.createElement("div", { className: "ds-chart__top" }, b || a.createElement("span", null), a.createElement("span", { className: "ds-chart__top-end" }, k, J)) : b;
  let j1 = null;
  if (Q && I != null && I < u1) {
    const N = H(I) || {}, n1 = N.rows || [{ label: M || "Value", value: C1(M1[I].value) }].concat(A1 > 0 ? [{ label: "Of total", value: Math.round(Number(M1[I].value) / A1 * 100) + " %" }] : []);
    j1 = a.createElement(r.ChartSidePanel, { title: N.title != null ? N.title : M1[I].label, subtitle: N.subtitle, rows: n1, total: N.total, onPrev: () => {
      Y(I - 1), j(I - 1);
    }, onNext: () => {
      Y(I + 1), j(I + 1);
    }, onClose: () => {
      Y(null), i1.current && i1.current.focus();
    }, prevDisabled: I <= 0, nextDisabled: I >= u1 - 1, panelLabel: P, prevLabel: q, nextLabel: h1, closeLabel: e1, maxHeight: Math.max(N1 + 56, 280) });
  }
  const U1 = Q ? a.createElement("div", { className: "ds-chart-split-host" }, a.createElement("div", { className: "ds-chart-split" }, a.createElement("div", { className: "ds-chart-split__chart" }, $1), j1)) : $1, T1 = V ? a.createElement(r.ChartFull, { title: p, closeLabel: $, onClose: () => R(!1), render: () => a.createElement(fa, { data: t, style: d1, size: "lg", showAxis: n, unit: M, formatValue: i, description: o, showValues: !0, single: L, highlight: z, glance: "off" }) }) : null;
  return a.createElement(a.Fragment, null, w1, O1, F === "table" && X ? X : U1, W, c1, T1);
}
function i0(t) {
  return t && t.series ? a.createElement(z1.StackedBarChart, t) : a.createElement(fa, t);
}
Object.assign(r, { BarChart: i0 });
function y2() {
  return y2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, y2.apply(null, arguments);
}
function ga({
  data: t = [],
  style: e,
  look: h,
  downloads: d,
  edge: c,
  patterns: l,
  groupBelow: n = 5,
  otherLabel: p = "Other",
  interactive: M = !1,
  size: i = "md",
  centerLabel: o,
  centerValue: s,
  legend: v = !1,
  title: m,
  unit: y,
  formatValue: g,
  showValues: u = !1,
  description: f,
  dataTable: L = !1,
  dataLabel: z,
  graphLabel: E = "Chart",
  tableLabel: _ = "Table",
  rowLabel: B = "Category",
  glance: $ = "auto",
  expand: A = !0,
  expandLabel: w = "Expand",
  closeLabel: H = "Close",
  className: T = "",
  ...C
}) {
  const P = /* @__PURE__ */ ((k) => k === "primary" ? "ramp" : k)(r.chartLook(h, e, "ramp")), [q, h1] = a.useState(() => $ !== "off" && !!(window.matchMedia && window.matchMedia("(max-width: 560px)").matches));
  a.useEffect(() => {
    if ($ === "off" || !window.matchMedia) return;
    const k = window.matchMedia("(max-width: 560px)"), D = () => h1(k.matches);
    return k.addEventListener && k.addEventListener("change", D), () => k.removeEventListener && k.removeEventListener("change", D);
  }, [$]);
  const [e1, _1] = a.useState(!1), [o1, p1] = a.useState("chart"), [m1, d1] = a.useState(null), r1 = r.useChartPatterns(l), E1 = "dc" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), V = $ === "always" || $ === "auto" && q, R = (k) => g ? g(k) : typeof k == "number" ? k.toLocaleString("en-US") : k, F = t.reduce((k, D) => k + D.value, 0) || 1, l1 = t.find((k) => k.label === p), O = n > 0 ? t.filter((k) => k.label !== p && k.value / F * 100 < n) : [], j = O.length >= 2 || O.length >= 1 && !!l1, v1 = j ? t.filter((k) => !O.includes(k) && k.label !== p) : [], G = P === "ramp" ? 9 : 99, f1 = v1.length > G ? v1.slice().sort((k, D) => D.value - k.value).slice(G) : [], I = O.concat(f1), Y = j ? v1.filter((k) => !f1.includes(k)).concat([{ label: p, value: I.reduce((k, D) => k + D.value, 0) + (l1 ? l1.value : 0), isOther: !0, members: I.concat(l1 ? [l1] : []) }]) : t, i1 = Y.reduce((k, D) => k + D.value, 0) || 1, s1 = (k) => Math.round(k / i1 * 100) + " %", y1 = Y.length ? Y.reduce((k, D) => D.value > k.value ? D : k) : null, M1 = V ? 96 : i === "sm" ? 120 : 180, C1 = r.chartPalette(P === "ramp" ? "ramp10" : P), P1 = (k, D) => k.color || (k.isOther && P === "ramp" ? D <= 4 ? C1[4] : C1[D] : C1[D % C1.length]), N1 = j || Y.length === 5 || Y.length === 10, K = P === "ramp" && Y.length > 5 && !V, g1 = K && r1, Q = (k) => g1 && k >= 5 ? (k - 5) % 5 : null, u1 = c === void 0 ? P === "ramp" && !t.some((k) => k.color) : c, V1 = Y.reduce((k, D) => k + D.value, 0) || 1, a1 = M && !V, b1 = (k) => {
    const D = k.currentTarget.getBoundingClientRect(), J = k.clientX - (D.left + D.width / 2), w1 = k.clientY - (D.top + D.height / 2), j1 = Math.sqrt(J * J + w1 * w1) / (D.width / 2);
    if (j1 < 0.4 || j1 > 1.02) return null;
    let U1 = Math.atan2(w1, J) * 180 / Math.PI + 90;
    U1 < 0 && (U1 += 360);
    let T1 = 0;
    for (let N = 0; N < Y.length; N++)
      if (T1 += Y[N].value / V1 * 360, U1 <= T1) return N;
    return Y.length - 1;
  }, t1 = (k) => {
    k.key === "ArrowRight" || k.key === "ArrowDown" ? (k.preventDefault(), d1((D) => D == null ? 0 : Math.min(Y.length - 1, D + 1))) : k.key === "ArrowLeft" || k.key === "ArrowUp" ? (k.preventDefault(), d1((D) => D == null ? Y.length - 1 : Math.max(0, D - 1))) : k.key === "Escape" && d1(null);
  }, L1 = 40, S1 = 2 * Math.PI * L1;
  let Z1 = 0;
  const A1 = f ? { ...C, "aria-describedby": E1 + "-d" } : C, W1 = /* @__PURE__ */ a.createElement("div", y2({
    className: ["ds-chart", T].filter(Boolean).join(" "),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--layout-gap-comfortable)"
    }
  }, A1), /* @__PURE__ */ a.createElement("div", {
    ...a1 ? { tabIndex: 0, role: "group", "aria-label": "Donut chart. Use the arrow keys to move through the parts.", onPointerMove: (k) => d1(b1(k)), onPointerLeave: () => d1(null), onBlur: () => d1(null), onKeyDown: t1, className: "ds-chart__donut" } : {},
    style: {
      position: "relative",
      width: M1,
      height: M1,
      flex: "none"
    }
  }, /* @__PURE__ */ a.createElement("svg", {
    viewBox: "0 0 100 100",
    width: M1,
    height: M1,
    style: {
      transform: "rotate(-90deg)"
    }
  }, g1 ? a.createElement("defs", null, Y.map((k, D) => {
    const J = Q(D);
    if (J == null) return null;
    const w1 = P1(k, D), j1 = J === 0 ? a.createElement("rect", { width: 1.2, height: 4, fill: "#fff", opacity: ".9" }) : J === 1 ? a.createElement("rect", { width: 4, height: 1.3, fill: "#fff", opacity: ".9" }) : J === 2 ? a.createElement("circle", { cx: 2, cy: 2, r: 0.8, fill: "#fff", opacity: ".95" }) : J === 3 ? a.createElement(a.Fragment, null, a.createElement("rect", { width: 1, height: 4, fill: "#fff", opacity: ".9" }), a.createElement("rect", { width: 4, height: 1, fill: "#fff", opacity: ".9" })) : a.createElement("rect", { width: 1.3, height: 4, fill: "#fff", opacity: ".9" });
    return a.createElement("pattern", { key: D, id: `${E1}-p${D}`, patternUnits: "userSpaceOnUse", width: 4, height: 4, patternTransform: J === 0 || J === 3 ? "rotate(45)" : void 0 }, a.createElement("rect", { width: 4, height: 4, fill: w1 }), j1);
  })) : null, Y.map((k, D) => {
    const J = k.value / V1 * S1, w1 = /* @__PURE__ */ a.createElement("circle", {
      key: D,
      cx: "50",
      cy: "50",
      r: L1,
      fill: "none",
      stroke: Q(D) != null ? `url(#${E1}-p${D})` : P1(k, D),
      opacity: a1 && m1 != null && m1 !== D ? 0.4 : 1,
      strokeWidth: "16",
      strokeDasharray: `${J} ${S1 - J}`,
      strokeDashoffset: -Z1
    }), j1 = u1 && N1 && D === Y.length - 1 && Y.length > 1 ? /* @__PURE__ */ a.createElement("circle", { key: "e" + D, cx: "50", cy: "50", r: L1, fill: "none", stroke: "color-mix(in srgb, var(--color-primary-700) 40%, var(--background-surface))", opacity: a1 && m1 != null && m1 !== D ? 0.4 : 1, strokeWidth: "17", strokeDasharray: `${J} ${S1 - J}`, strokeDashoffset: -Z1 }) : null;
    return Z1 += J, j1 ? /* @__PURE__ */ a.createElement(a.Fragment, { key: D }, j1, a.cloneElement(w1, { key: "s" + D })) : w1;
  })), (s || o) && !V && /* @__PURE__ */ a.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, s && /* @__PURE__ */ a.createElement("span", {
    style: {
      fontSize: "var(--type-h3-size)",
      fontWeight: "var(--type-h3-weight)",
      fontVariantNumeric: "tabular-nums"
    }
  }, s), o && /* @__PURE__ */ a.createElement("span", {
    style: {
      fontSize: "var(--type-help-size)",
      color: "var(--content-secondary)"
    }
  }, o))), v && !V && /* @__PURE__ */ a.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--gap-control-sm)"
    }
  }, Y.map((k, D) => /* @__PURE__ */ a.createElement("div", { key: D, className: ["ds-chart__legend-row", a1 && m1 != null && (m1 === D ? "is-on" : "is-muted")].filter(Boolean).join(" "), onPointerEnter: a1 ? () => d1(D) : void 0, onPointerLeave: a1 ? () => d1(null) : void 0 }, /* @__PURE__ */ a.createElement(r.LegendItem, {
    label: u || a1 && m1 === D ? `${k.label}: ${R(k.value)} (${s1(k.value)})` : k.label,
    color: P1(k, D),
    pattern: Q(D) != null ? Q(D) : void 0
  }), k.members ? a.createElement("span", { className: "ds-chart__legend-sub" }, k.members.map((J) => J.label + " " + s1(J.value)).join(", ")) : null)))), q1 = V && y1 ? a.createElement("div", { className: "ds-chart-glance" }, a.createElement("strong", null, s1(y1.value)), a.createElement("span", null, [y1.label, y].filter(Boolean).join(" · "))) : null, x1 = V && A ? a.createElement(r.Button, { variant: "ghost", size: "sm", iconEnd: a.createElement(r.Icon, { name: "maximize-2", size: "sm" }), onClick: () => _1(!0), className: "ds-chart-expand" }, w) : null, $1 = f ? a.createElement("p", { id: E1 + "-d", className: "ds-visually-hidden" }, f) : null, H1 = L && t.length ? a.createElement(r.ChartDataTable, { columns: [{ key: "l", label: B, kind: "text" }, { key: "v", label: y || "Value", kind: "numeric" }, { key: "p", label: "%", kind: "numeric" }], rows: t.map((k, D) => ({ id: D, l: k.label, v: R(k.value), p: s1(k.value) })) }) : null, O1 = L && t.length ? a.createElement(r.ChartViewSwitch, { view: o1, onChange: p1, graphLabel: E, tableLabel: _ }) : null, b = (d ?? K) && t.length ? { name: m || y || "data", head: [B, y || "Value", "%"], rows: t.map((k) => [k.label, k.value, s1(k.value)]) } : null, W = K || b ? a.createElement(r.ChartOptions, { patterns: r1, onPatterns: r.setChartPatterns, csv: b }) : null, c1 = O1 || W ? a.createElement("div", { className: "ds-chart__top" }, a.createElement("span", null), a.createElement("span", { className: "ds-chart__top-end" }, O1, W)) : null, X = e1 ? a.createElement(r.ChartFull, { title: m, closeLabel: H, rotate: !1, onClose: () => _1(!1), render: () => a.createElement(ga, { data: t, groupBelow: n, otherLabel: p, style: P, size: "md", centerValue: s, centerLabel: o, legend: !0, showValues: !0, formatValue: g, unit: y, description: f, glance: "off" }) }) : null;
  return a.createElement(a.Fragment, null, c1, q1, o1 === "table" && H1 ? H1 : W1, x1, $1, X);
}
Object.assign(r, { DonutChart: ga });
function x2() {
  return x2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, x2.apply(null, arguments);
}
const s0 = (t, e, h, d, c) => t.map((l, n) => `${n === 0 ? "M" : "L"}${n / Math.max(1, t.length - 1) * e} ${h - (l - d) / (c - d || 1) * h}`).join(" ");
function ba({ title: t, closeLabel: e, onClose: h, render: d, rotate: c = !0 }) {
  const l = () => window.matchMedia("(orientation: portrait)"), [n, p] = a.useState(() => l().matches), M = a.useRef(null);
  a.useEffect(() => {
    const o = l(), s = () => p(o.matches);
    o.addEventListener && o.addEventListener("change", s);
    const v = (y) => {
      y.key === "Escape" && h();
    };
    document.addEventListener("keydown", v);
    const m = document.body.style.overflow;
    return document.body.style.overflow = "hidden", M.current && M.current.focus(), () => {
      o.removeEventListener && o.removeEventListener("change", s), document.removeEventListener("keydown", v), document.body.style.overflow = m;
    };
  }, []);
  const i = a.createElement(
    "div",
    { className: "ds-chart-full", role: "dialog", "aria-modal": "true", "aria-label": t || "Chart" },
    a.createElement(
      "div",
      { className: "ds-chart-full__inner", "data-rotated": c && n ? "true" : void 0 },
      a.createElement(
        "div",
        { className: "ds-chart-full__head" },
        a.createElement("strong", { className: "ds-chart-full__title" }, t),
        a.createElement(r.Button, { ref: M, variant: "ghost", size: "sm", iconEnd: a.createElement(r.Icon, { name: "x", size: "sm" }), onClick: h }, e)
      ),
      a.createElement("div", { className: "ds-chart-full__body" }, d(n))
    )
  );
  return window.ReactDOM && window.ReactDOM.createPortal ? window.ReactDOM.createPortal(i, document.body) : i;
}
const o0 = (t, e) => t.length > e && e > 1 ? Array.from({ length: e }, (h, d) => t[Math.round(d * (t.length - 1) / (e - 1))]) : t;
function wa({
  series: t = [],
  labels: e = [],
  style: h,
  look: d,
  downloads: c = !1,
  highlight: l,
  size: n = "md",
  area: p = !1,
  grid: M = !1,
  interactive: i = !1,
  formatValue: o,
  chartLabel: s,
  title: v,
  unit: m,
  yAxis: y = !1,
  maxLabels: g,
  description: u,
  dataTable: f = !1,
  dataLabel: L,
  graphLabel: z = "Chart",
  tableLabel: E = "Table",
  rowLabel: _ = "Period",
  formatTick: B,
  tickUnit: $,
  glance: A = "auto",
  expand: w = !0,
  expandLabel: H = "Expand",
  closeLabel: T = "Close",
  endLabels: C = "auto",
  endValues: P = !0,
  formatEnd: q,
  panel: h1 = "auto",
  detail: e1,
  panelHint: _1 = "Press to see the breakdown",
  panelLabel: o1 = "Breakdown",
  prevLabel: p1 = "Previous",
  nextLabel: m1 = "Next",
  closePanelLabel: d1 = "Close breakdown",
  selectedIndex: r1,
  onSelect: E1,
  _rot: V = !1,
  className: R = "",
  ...F
}) {
  const l1 = r.chartLook(d, h, "primary"), [O, j] = a.useState(() => A !== "off" && !!(window.matchMedia && window.matchMedia("(max-width: 560px)").matches));
  a.useEffect(() => {
    if (A === "off" || !window.matchMedia) return;
    const x = window.matchMedia("(max-width: 560px)"), S = () => j(x.matches);
    return x.addEventListener && x.addEventListener("change", S), () => x.removeEventListener && x.removeEventListener("change", S);
  }, [A]);
  const [v1, G] = a.useState(!1), f1 = A === "always" || A === "auto" && O, I = f1 ? t.slice(0, 2) : t, Y = "lc" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), [i1, s1] = a.useState(null), [y1, M1] = a.useState("chart"), [C1, P1] = a.useState(null), N1 = r1 !== void 0, K = N1 ? r1 : C1, g1 = (x) => {
    N1 || P1(x), E1 && E1(x);
  }, Q = a.useRef(null), u1 = a.useRef(null), V1 = a.useRef(null), [a1, b1] = a.useState(null);
  a.useLayoutEffect(() => {
    const x = V1.current && V1.current.parentElement;
    if (!x) return;
    const S = () => b1(x.clientWidth);
    S();
    const Z = window.ResizeObserver ? new ResizeObserver(S) : null;
    return Z && Z.observe(x), () => {
      Z && Z.disconnect();
    };
  }, []);
  const t1 = {
    xs: 64,
    sm: 120,
    md: 180,
    lg: 240
  }[f1 ? "xs" : n] || 180, L1 = 600, S1 = r.chartPalette(l1), Z1 = I.flatMap((x) => x.values), A1 = Math.min(...Z1, 0), W1 = Math.max(...Z1, 1), q1 = y && !f1 && A1 >= 0 ? (() => {
    const x = W1 / 3, S = Math.pow(10, Math.floor(Math.log10(x)));
    return 3 * [1, 2, 5, 10].find((U) => U * S >= x - 1e-9) * S;
  })() : W1, x1 = I.reduce((x, S) => Math.max(x, S.values.length), 0), $1 = (x) => x1 > 1 ? x / (x1 - 1) * 100 : 0, H1 = (x) => (1 - (x - A1) / (q1 - A1 || 1)) * 100, O1 = (x) => o ? o(x) : typeof x == "number" ? x.toLocaleString("en-US") : x, b = (x, S) => x.color || (x.reference ? "var(--content-primary)" : S1[I.slice(0, S).filter((Z) => !Z.reference).length % S1.length]), [W, c1] = a.useState(null), X = l == null ? null : typeof l == "number" ? l : I.findIndex((x) => x.name === l), k = (x) => {
    const S = W ?? (X != null && X >= 0 ? X : null);
    return S != null && S !== x;
  }, D = "var(--color-neutral-400)", J = i && !f1 && h1 !== "off" && (h1 === "always" || I.length > 3), w1 = J && K != null && K < x1 ? K : i1, j1 = !f1 && (C === !0 || C === "auto" && I.length >= 2), U1 = a1 != null && a1 < 560, T1 = j1 && !U1, N = a1 != null ? Math.max(2, Math.floor((a1 - (y ? 76 : 0) - (T1 ? 220 : 0)) / 64)) : 0, n1 = ["circle", "triangle", "square", "diamond", "cross"], B1 = (() => {
    if (!T1) return [];
    const x = I.map((Z, U) => ({ i: U, y: Z.values.length ? H1(Z.values[Z.values.length - 1]) / 100 * t1 : null })).filter((Z) => Z.y != null).sort((Z, U) => Z.y - U.y);
    for (let Z = 1; Z < x.length; Z++) x[Z].y - x[Z - 1].y < (P ? 20 : 16) && (x[Z].y = x[Z - 1].y + (P ? 20 : 16));
    const S = x.length ? x[x.length - 1].y - t1 : 0;
    return S > 0 && x.forEach((Z) => {
      Z.y -= S;
    }), x;
  })(), c2 = T1 ? a.createElement("div", { className: "ds-chart__ends", "aria-hidden": "true", style: { blockSize: t1 } }, I.map((x, S) => {
    if (!x.values.length) return null;
    const Z = B1.find((k1) => k1.i === S), U = "ds-chart__end--" + n1[S % n1.length];
    return a.createElement(
      a.Fragment,
      { key: S },
      a.createElement("span", { className: "ds-chart__end " + U, style: { top: H1(x.values[x.values.length - 1]) + "%", color: k(S) ? D : b(x, S) } }),
      Z && Math.abs(Z.y - H1(x.values[x.values.length - 1]) / 100 * t1) > 3 ? a.createElement("svg", { className: "ds-chart__lead", width: 8, height: Math.abs(Z.y - H1(x.values[x.values.length - 1]) / 100 * t1) + 2, viewBox: `0 0 8 ${Math.abs(Z.y - H1(x.values[x.values.length - 1]) / 100 * t1) + 2}`, style: { top: Math.min(Z.y, H1(x.values[x.values.length - 1]) / 100 * t1) - 1, color: b(x, S) } }, a.createElement("path", { d: Z.y > H1(x.values[x.values.length - 1]) / 100 * t1 ? `M0 1 L8 ${Math.abs(Z.y - H1(x.values[x.values.length - 1]) / 100 * t1) + 1}` : `M0 ${Math.abs(Z.y - H1(x.values[x.values.length - 1]) / 100 * t1) + 1} L8 1`, stroke: "currentColor", strokeWidth: 1, fill: "none" })) : null,
      a.createElement("span", { className: "ds-chart__end-label" + (P ? " ds-chart__end-label--value" : ""), style: { top: (Z ? Z.y : 0) + "px", opacity: k(S) ? 0.5 : 1 }, onPointerEnter: i ? () => c1(S) : void 0, onPointerLeave: i ? () => c1(null) : void 0 }, P ? a.createElement("span", { className: "ds-chart__end-text" }, a.createElement("span", { className: "ds-chart__end-name" }, x.name || `Serie ${S + 1}`), a.createElement("strong", null, (q || O1)(x.values[x.values.length - 1]))) : x.name || `Serie ${S + 1}`)
    );
  })) : null, X1 = (x) => {
    const S = Math.max(0, Math.min(x1 - 1, (K ?? x1 - 1) + x));
    g1(S), s1(S);
  }, l2 = (x) => {
    const S = u1.current;
    if (!S || x1 < 1) return null;
    const Z = S.getBoundingClientRect(), U = V ? (x.clientY - Z.top) / (Z.height || 1) : (x.clientX - Z.left) / (Z.width || 1);
    return Math.max(0, Math.min(x1 - 1, Math.round(U * (x1 - 1))));
  }, qa = (x) => {
    const S = (Z) => {
      x.preventDefault();
      const U = J && K != null ? K : i1 ?? x1 - 1, k1 = Math.max(0, Math.min(x1 - 1, U + Z));
      s1(k1), J && K != null && g1(k1);
    };
    if (x.key === "ArrowRight") S(1);
    else if (x.key === "ArrowLeft") S(-1);
    else if (x.key === "Home")
      x.preventDefault(), s1(0), J && K != null && g1(0);
    else if (x.key === "End")
      x.preventDefault(), s1(x1 - 1), J && K != null && g1(x1 - 1);
    else if ((x.key === "Enter" || x.key === " ") && J) {
      x.preventDefault();
      const Z = i1 ?? x1 - 1;
      g1(K === Z ? null : Z);
    } else x.key === "Escape" && (J && K != null ? g1(null) : s1(null));
  }, Da = w1 == null ? "" : $1(w1) > 50 ? "end" : "start", Za = u ? { ...F, "aria-describedby": Y + "-d" } : F, K2 = /* @__PURE__ */ a.createElement("div", x2({
    ref: V1,
    className: ["ds-chart", i && "ds-chart--interactive", T1 && "ds-chart--ends", T1 && P && "ds-chart--ends-values", R].filter(Boolean).join(" ")
  }, Za), /* @__PURE__ */ a.createElement("div", {
    className: "ds-chart__plot",
    ref: u1
  }, /* @__PURE__ */ a.createElement("svg", {
    viewBox: `0 0 ${L1} ${t1}`,
    width: "100%",
    height: t1,
    preserveAspectRatio: "none",
    style: {
      overflow: "visible",
      display: "block"
    },
    "aria-hidden": i ? "true" : void 0
  }, M && !f1 && n !== "xs" && [0, 1 / 3, 2 / 3, 1].map((x) => /* @__PURE__ */ a.createElement("line", {
    key: x,
    x1: "0",
    x2: L1,
    y1: t1 * x,
    y2: t1 * x,
    stroke: "var(--chart-grid-primary)",
    strokeWidth: "1",
    vectorEffect: "non-scaling-stroke"
  })), I.map((x, S) => {
    const Z = b(x, S), U = s0(x.values, L1, t1, A1, q1);
    return /* @__PURE__ */ a.createElement("g", {
      key: S
    }, p === "gradient" && !x.dashed && /* @__PURE__ */ a.createElement("defs", null, /* @__PURE__ */ a.createElement("linearGradient", {
      id: Y + "-" + S,
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /* @__PURE__ */ a.createElement("stop", {
      offset: "0%",
      stopColor: Z,
      stopOpacity: "0.32"
    }), /* @__PURE__ */ a.createElement("stop", {
      offset: "100%",
      stopColor: Z,
      stopOpacity: "0"
    }))), p === "gradient" && !x.dashed && /* @__PURE__ */ a.createElement("path", {
      d: `${U} L${L1} ${t1} L0 ${t1} Z`,
      fill: `url(#${Y}-${S})`
    }), p === !0 && !x.dashed && /* @__PURE__ */ a.createElement("path", {
      d: `${U} L${L1} ${t1} L0 ${t1} Z`,
      fill: Z,
      opacity: "0.12"
    }), /* @__PURE__ */ a.createElement("path", {
      d: U,
      fill: "none",
      stroke: k(S) ? D : Z,
      strokeWidth: "2",
      strokeLinejoin: "round",
      strokeLinecap: x.dashed && !x.reference ? "butt" : "round",
      vectorEffect: "non-scaling-stroke",
      strokeDasharray: x.reference ? "1 5" : x.dashed ? "6 4" : void 0
    }));
  }), /* @__PURE__ */ a.createElement("line", {
    x1: "0",
    x2: L1,
    y1: t1,
    y2: t1,
    stroke: "var(--chart-axis-primary)",
    strokeWidth: "1",
    vectorEffect: "non-scaling-stroke"
  })), i && x1 > 0 && /* @__PURE__ */ a.createElement("div", {
    className: "ds-chart__hit",
    ref: Q,
    onClick: J ? (x) => {
      const S = i1 ?? l2(x);
      S != null && g1(K === S ? null : S);
    } : void 0,
    tabIndex: 0,
    role: "group",
    "aria-label": s || "Chart. Use the arrow keys to move through the values.",
    onPointerMove: (x) => s1(l2(x)),
    onPointerDown: (x) => s1(l2(x)),
    onPointerLeave: (x) => {
      x.pointerType !== "touch" && s1(null);
    },
    onFocus: () => s1((x) => x ?? x1 - 1),
    onBlur: () => s1(null),
    onKeyDown: qa
  }), i && w1 != null && /* @__PURE__ */ a.createElement(a.Fragment, null, /* @__PURE__ */ a.createElement("span", {
    className: "ds-chart__guide",
    style: {
      left: $1(w1) + "%"
    },
    "aria-hidden": "true"
  }), I.map((x, S) => x.values[w1] == null ? null : /* @__PURE__ */ a.createElement("span", {
    key: S,
    className: "ds-chart__point",
    style: {
      left: $1(w1) + "%",
      top: H1(x.values[w1]) + "%",
      color: k(S) ? D : b(x, S)
    },
    "aria-hidden": "true"
  })), J && K != null ? null : /* @__PURE__ */ a.createElement("div", {
    className: `ds-chart__tip ds-chart__tip--${Da}`,
    style: {
      left: $1(w1) + "%"
    },
    role: "status",
    "aria-live": "polite"
  }, e[w1] != null && /* @__PURE__ */ a.createElement("span", {
    className: "ds-chart__tip-title"
  }, e[w1]), J ? a.createElement("span", { className: "ds-chart__tip-hint" }, _1) : I.map((x, S) => x.values[w1] == null ? null : /* @__PURE__ */ a.createElement("span", {
    key: S,
    className: "ds-chart__tip-row"
  }, /* @__PURE__ */ a.createElement("span", {
    className: "ds-chart__tip-key"
  }, /* @__PURE__ */ a.createElement("span", {
    className: ["ds-chart__tip-mk", (x.dashed || x.reference) && "ds-chart__tip-mk--dash"].filter(Boolean).join(" "),
    style: {
      color: b(x, S)
    },
    "aria-hidden": "true"
  }), x.name || `Serie ${S + 1}`), /* @__PURE__ */ a.createElement("strong", null, O1(x.values[w1]))))))), c2, e.length > 0 && /* @__PURE__ */ a.createElement("div", {
    className: "ds-chart__axis",
    "aria-hidden": i ? "true" : void 0
  }, o0(e, f1 ? 3 : g || (N && N < e.length ? N : 0)).map((x, S) => /* @__PURE__ */ a.createElement("span", {
    key: S,
    className: "ds-chart__axis-label"
  }, x)))), U2 = I[0] && I[0].values.length ? I[0].values[I[0].values.length - 1] : null, G2 = B || ((x) => typeof x == "number" ? Math.round(x).toLocaleString("en-US") : x), X2 = y && !f1 ? a.createElement("div", { className: "ds-chart__yaxis", style: { blockSize: t1 }, "aria-hidden": "true" }, [q1, A1 + (q1 - A1) * 2 / 3, A1 + (q1 - A1) / 3, A1].map((x, S) => a.createElement("span", { key: S, className: "ds-chart__axis-label" }, $ ? G2(x) + " " + $ : G2(x)))) : null, Q2 = m && !f1 ? a.createElement("div", { className: "ds-chart__unit" }, m) : null, J2 = j1 && U1 && I.length > 1 ? a.createElement(r.LegendGroup, { style: { marginBlockStart: "var(--dimension-3)" } }, I.map((x, S) => a.createElement("span", { key: S, onPointerEnter: i ? () => c1(S) : void 0, onPointerLeave: i ? () => c1(null) : void 0, style: { opacity: k(S) ? 0.5 : 1 } }, a.createElement(r.LegendItem, { type: "line", label: x.name || `Serie ${S + 1}`, color: b(x, S), dashed: !!(x.dashed || x.reference) })))) : null, aa = X2 ? a.createElement("div", { className: "ds-chart-yrow" }, X2, K2) : K2, ta = J2 ? a.createElement(a.Fragment, null, aa, J2) : aa;
  let ea = null;
  if (J && K != null && K < x1) {
    const x = e1 ? e1(K) || {} : {}, S = x.rows || I.map((k1, a2) => ({ label: k1.name || `Serie ${a2 + 1}`, value: k1.values[K] == null ? "—" : O1(k1.values[K]), color: b(k1, a2), dashed: k1.dashed || k1.reference })), Z = x.title != null ? x.title : e[K], U = a.createElement;
    ea = U(
      "aside",
      { className: "ds-chart-panel", role: "region", "aria-label": o1 + (typeof Z == "string" ? ": " + Z : ""), style: { maxBlockSize: Math.max(t1 + 56, 280) } },
      U(
        "div",
        { className: "ds-chart-panel__head" },
        U("div", { className: "ds-chart-panel__titles" }, U("strong", { className: "ds-chart-panel__title" }, Z), x.subtitle != null && U("span", { className: "ds-chart-panel__sub" }, x.subtitle)),
        U(
          "div",
          { className: "ds-chart-panel__ctl" },
          U(r.IconButton, { size: "sm", label: p1, disabled: K <= 0, onClick: () => X1(-1) }, U(r.Icon, { name: "chevron-left", size: "sm" })),
          U(r.IconButton, { size: "sm", label: m1, disabled: K >= x1 - 1, onClick: () => X1(1) }, U(r.Icon, { name: "chevron-right", size: "sm" })),
          U(r.IconButton, { size: "sm", label: d1, onClick: () => {
            g1(null), Q.current && Q.current.focus();
          } }, U(r.Icon, { name: "x", size: "sm" }))
        )
      ),
      U("div", { className: "ds-chart-panel__body", "aria-live": "polite" }, S.map((k1, a2) => U(
        "div",
        { key: a2, className: "ds-chart-panel__row" },
        U("span", { className: "ds-chart-panel__key" }, U("span", { className: ["ds-chart__tip-mk", k1.dashed && "ds-chart__tip-mk--dash"].filter(Boolean).join(" "), style: { color: k1.color }, "aria-hidden": "true" }), k1.label),
        U("strong", null, k1.value)
      ))),
      x.total && U("div", { className: "ds-chart-panel__foot" }, U("span", null, x.total.label), U("strong", null, x.total.value))
    );
  }
  const Ta = J ? a.createElement("div", { className: "ds-chart-split-host" }, a.createElement("div", { className: "ds-chart-split" }, a.createElement("div", { className: "ds-chart-split__chart" }, ta), ea)) : ta, Ra = f1 && U2 != null ? a.createElement("div", { className: "ds-chart-glance" }, a.createElement("strong", null, O1(U2)), m && a.createElement("span", null, m)) : null, Ia = f1 && w ? a.createElement(r.Button, { variant: "ghost", size: "sm", iconEnd: a.createElement(r.Icon, { name: "maximize-2", size: "sm" }), onClick: () => G(!0), className: "ds-chart-expand" }, H) : null, Fa = u ? a.createElement("p", { id: Y + "-d", className: "ds-visually-hidden" }, u) : null, ha = f && e.length ? a.createElement(Va, { columns: [{ key: "_l", label: _, kind: "text" }].concat(I.map((x, S) => ({ key: "s" + S, label: x.name || `Serie ${S + 1}`, kind: "numeric" }))), rows: e.map((x, S) => {
    const Z = { id: S, _l: x };
    return I.forEach((U, k1) => {
      Z["s" + k1] = U.values[S] == null ? "—" : O1(U.values[S]);
    }), Z;
  }) }) : null, da = f && e.length ? a.createElement(Ha, { view: y1, onChange: M1, graphLabel: z, tableLabel: E }) : null, ra = c && e.length ? { name: v || m || "data", head: [_].concat(I.map((x, S) => x.name || `Serie ${S + 1}`)), rows: e.map((x, S) => [x].concat(I.map((Z) => Z.values[S] == null ? "" : Z.values[S]))) } : null, ca = ra ? a.createElement(Ea, { csv: ra }) : null, Wa = da || ca ? a.createElement("div", { className: "ds-chart__top" }, Q2 || a.createElement("span", null), a.createElement("span", { className: "ds-chart__top-end" }, da, ca)) : Q2, Ya = v1 ? a.createElement(ba, { title: v, closeLabel: T, onClose: () => G(!1), render: (x) => a.createElement(
    a.Fragment,
    null,
    a.createElement(wa, { series: t, labels: e, style: l1, size: "lg", area: p, interactive: !0, formatValue: o, chartLabel: s, yAxis: !0, unit: m, description: u, glance: "off", panel: "off", _rot: x }),
    /* where the end names do not fit (a phone), the Expand view carries a legend so a line is never identified by colour and shape alone */
    t.length > 1 && (x || window.innerWidth <= 560) ? a.createElement(r.LegendGroup, { style: { marginBlockStart: "var(--dimension-3)" } }, t.map((S, Z) => a.createElement(r.LegendItem, { key: Z, type: "line", label: S.name || `Serie ${Z + 1}`, color: S.color || (S.reference ? "var(--content-primary)" : r.chartPalette(l1)[t.slice(0, Z).filter((U) => !U.reference).length % r.chartPalette(l1).length]), dashed: !!(S.dashed || S.reference) }))) : null
  ) }) : null;
  return a.createElement(a.Fragment, null, Wa, Ra, y1 === "table" && ha ? ha : Ta, Ia, Fa, Ya);
}
function _a(t, e, h) {
  const d = (l) => {
    const n = String(typeof l == "number" ? l : l ?? "");
    return /[",\n]/.test(n) ? '"' + n.replace(/"/g, '""') + '"' : n;
  }, c = "\uFEFF" + [t].concat(e).map((l) => l.map(d).join(",")).join(`\r
`);
  try {
    const l = URL.createObjectURL(new Blob([c], { type: "text/csv;charset=utf-8" })), n = document.createElement("a");
    n.href = l, n.download = (h || "data") + ".csv", document.body.appendChild(n), n.click(), n.remove(), setTimeout(() => URL.revokeObjectURL(l), 1e3);
  } catch {
  }
}
function Ea({ patterns: t, onPatterns: e, csv: h, csvLabel: d = "Download data (CSV)", label: c = "Chart options", patternsLabel: l = "Patterns" }) {
  const n = a.createElement, p = r.useChartPatterns(t), M = e || r.setChartPatterns, i = [];
  return h && i.push(n(r.MenuItem, { key: "csv", label: d, icon: n(r.Icon, { name: "download", size: "sm" }), onClick: () => _a(h.head, h.rows, h.name) })), i.push(n(r.MenuItem, { key: "pat", label: l, icon: n(r.Icon, { name: "contrast", size: "sm" }), role: "menuitemcheckbox", "aria-checked": p ? "true" : "false", onClick: () => M(!p), trailing: n("span", { className: ["ds-toggle-v2__track", p && "ds-toggle-v2__track--on"].filter(Boolean).join(" "), "aria-hidden": "true" }, n("span", { className: "ds-toggle-v2__thumb" })) })), n(r.MenuDropdown, { align: "end", className: "ds-chart__options", trigger: n(r.IconButton, { size: "sm", variant: "ghost", label: c }, n(r.Icon, { name: "ellipsis", size: "sm" })) }, ...i);
}
function Ha({ view: t, onChange: e, graphLabel: h = "Chart", tableLabel: d = "Table" }) {
  return a.createElement("div", { className: "ds-chart__switch" }, a.createElement(r.SegmentedControl, { options: [{ value: "chart", label: h }, { value: "table", label: d }], value: t, onChange: e, "aria-label": h + " / " + d }));
}
function Va({ columns: t, rows: e }) {
  return a.createElement("div", { className: "ds-chart__tablewrap" }, a.createElement(r.Table, { columns: t, rows: e, density: "compact", hoverable: !1 }));
}
function M0({ title: t, subtitle: e, rows: h = [], total: d, activeRow: c, onRowHover: l, onPrev: n, onNext: p, onClose: M, prevDisabled: i, nextDisabled: o, panelLabel: s, prevLabel: v, nextLabel: m, closeLabel: y, maxHeight: g }) {
  const u = a.createElement;
  return u(
    "aside",
    { className: "ds-chart-panel", role: "region", "aria-label": s + (typeof t == "string" ? ": " + t : ""), style: { maxBlockSize: g } },
    u(
      "div",
      { className: "ds-chart-panel__head" },
      u("div", { className: "ds-chart-panel__titles" }, u("strong", { className: "ds-chart-panel__title" }, t), e != null && u("span", { className: "ds-chart-panel__sub" }, e)),
      u(
        "div",
        { className: "ds-chart-panel__ctl" },
        u(r.IconButton, { size: "sm", label: v, disabled: i, onClick: n }, u(r.Icon, { name: "chevron-left", size: "sm" })),
        u(r.IconButton, { size: "sm", label: m, disabled: o, onClick: p }, u(r.Icon, { name: "chevron-right", size: "sm" })),
        M && u(r.IconButton, { size: "sm", label: y, onClick: M }, u(r.Icon, { name: "x", size: "sm" }))
      )
    ),
    u("div", { className: "ds-chart-panel__body", "aria-live": "polite" }, h.map((f, L) => u(
      "div",
      { key: L, className: ["ds-chart-panel__row", c != null && (L === c ? "is-on" : "is-muted")].filter(Boolean).join(" "), onPointerEnter: l ? () => l(L) : void 0, onPointerLeave: l ? () => l(null) : void 0 },
      u("span", { className: "ds-chart-panel__key" }, f.color && u("span", { className: "ds-chart__tip-mk ds-chart__tip-mk--box" + (f.pat != null ? " ds-pat ds-pat--" + f.pat : ""), style: f.pat != null ? { "--pc": f.color } : { color: f.color }, "aria-hidden": "true" }), f.sub ? u("span", { className: "ds-chart-panel__keytext" }, f.label, u("span", { className: "ds-chart-panel__rowsub" }, f.sub)) : f.label),
      u("strong", null, f.value)
    ))),
    d && u("div", { className: "ds-chart-panel__foot" }, u("span", null, d.label), u("strong", null, d.value))
  );
}
Object.assign(r, { LineChart: wa, ChartFull: ba, ChartViewSwitch: Ha, ChartOptions: Ea, ChartDataTable: Va, ChartSidePanel: M0, chartCsvDownload: _a });
function f2() {
  return f2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, f2.apply(null, arguments);
}
function m0({ data: t = [], series: e = [], groupBelow: h = 5, otherLabel: d = "Other", edge: c, patterns: l, downloads: n, style: p, look: M, colors: i, height: o = 180, interactive: s = !1, panel: v = "auto", panelHint: m = "Press to see the breakdown", panelLabel: y = "Breakdown", prevLabel: g = "Previous", nextLabel: u = "Next", closePanelLabel: f = "Close breakdown", formatValue: L, unit: z, chartLabel: E, selectedIndex: _, onSelect: B, className: $ = "", ...A }) {
  const w = /* @__PURE__ */ ((b) => b === "primary" ? "ramp" : b)(r.chartLook(M, p, "ramp")), H = a.createElement, T = r.useChartPatterns(l), C = t.reduce((b, W) => b + e.reduce((c1, X) => c1 + (W[X] || 0), 0), 0) || 1, P = (b) => t.reduce((W, c1) => W + (c1[b] || 0), 0), q = h > 0 ? e.filter((b) => b !== d && P(b) / C * 100 < h) : [], h1 = e.includes(d), e1 = q.length >= 2 || q.length >= 1 && h1, _1 = e1 ? e.filter((b) => !q.includes(b) && b !== d) : [], o1 = !i && w === "ramp" ? 9 : 99, p1 = _1.length > o1 ? _1.slice().sort((b, W) => P(W) - P(b)).slice(o1) : [], m1 = q.concat(p1), d1 = e1 ? _1.filter((b) => !p1.includes(b)).concat([d]) : e, r1 = e1 ? t.map((b) => Object.assign({}, b, { [d]: m1.reduce((W, c1) => W + (b[c1] || 0), 0) + (h1 && b[d] || 0) })) : t, E1 = e1 ? m1 : [], V = i || r.chartPalette(w === "ramp" ? "ramp10" : w), R = (b) => e1 && b === d1.length - 1 && !i && w === "ramp" ? b <= 4 ? V[4] : V[b] : V[b % V.length], F = e1 || d1.length === 5 || d1.length === 10, l1 = !i && w === "ramp" && d1.length > 5, O = l1 && T, j = (b) => O && b >= 5 ? (b - 5) % 5 : null, v1 = c === void 0 ? w === "ramp" && !i : c, G = r1.map((b) => d1.reduce((W, c1) => W + (b[c1] || 0), 0)), f1 = Math.max(1, ...G), I = (b) => L ? L(b) : typeof b == "number" ? b.toLocaleString("en-US") : b, [Y, i1] = a.useState(null), [s1, y1] = a.useState(null), [M1, C1] = a.useState(null), P1 = _ !== void 0, N1 = P1 ? _ : M1, K = (b) => {
    P1 || C1(b), B && B(b);
  }, g1 = a.useRef(null), Q = r1.length, u1 = d1.length, V1 = s && v !== "off", a1 = V1 && N1 != null && N1 < Q, b1 = Y ?? (a1 ? N1 : null), t1 = V1 ? Y ?? (a1 ? N1 : Q - 1) : null, L1 = (b) => {
    const W = b.target && b.target.closest ? b.target.closest("[data-seg]") : null;
    return W ? +W.getAttribute("data-seg") : null;
  }, S1 = (b) => {
    const W = g1.current;
    if (!W || Q < 1) return null;
    const c1 = W.getBoundingClientRect();
    return Math.max(0, Math.min(Q - 1, Math.floor((b.clientX - c1.left) / (c1.width || 1) * Q)));
  }, Z1 = (b) => {
    const W = a1 ? N1 : Y ?? Q - 1, c1 = (X) => {
      b.preventDefault();
      const k = Math.max(0, Math.min(Q - 1, W + X));
      i1(k), a1 && K(k);
    };
    if (b.key === "ArrowRight") c1(1);
    else if (b.key === "ArrowLeft") c1(-1);
    else if (b.key === "ArrowUp")
      b.preventDefault(), i1((X) => X ?? W), y1((X) => X == null ? 0 : Math.min(u1 - 1, X + 1));
    else if (b.key === "ArrowDown")
      b.preventDefault(), i1((X) => X ?? W), y1((X) => X == null ? u1 - 1 : Math.max(0, X - 1));
    else if (b.key === "Home")
      b.preventDefault(), i1(0), a1 && K(0);
    else if (b.key === "End")
      b.preventDefault(), i1(Q - 1), a1 && K(Q - 1);
    else if ((b.key === "Enter" || b.key === " ") && V1) {
      b.preventDefault();
      const X = Y ?? Q - 1;
      K(N1 === X ? null : X);
    } else b.key === "Escape" && (a1 ? K(null) : s1 != null ? y1(null) : i1(null));
  }, A1 = (b) => d1.map((W, c1) => ({ label: W, value: I(r1[b][W] || 0) + (z ? " " + z : ""), color: R(c1), pat: j(c1) != null ? j(c1) : void 0, sub: e1 && c1 === d1.length - 1 && E1.length ? E1.join(", ") : void 0, share: G[b] ? Math.round((r1[b][W] || 0) / G[b] * 100) + " %" : "" })).reverse(), W1 = () => s1 == null ? null : u1 - 1 - s1, q1 = s && !V1 && b1 != null && r1[b1] ? H(
    "div",
    { className: `ds-chart__tip ds-chart__tip--${(b1 + 0.5) / Q > 0.66 ? "end" : (b1 + 0.5) / Q < 0.34 ? "start" : "center"}`, style: { left: (b1 + 0.5) / Q * 100 + "%" }, role: "status", "aria-live": "polite" },
    H("span", { className: "ds-chart__tip-title" }, r1[b1].label),
    A1(b1).map((b, W) => H("span", { key: W, className: ["ds-chart__tip-row", s1 != null && (W === W1() ? "is-on" : "is-muted")].filter(Boolean).join(" ") }, H("span", { className: "ds-chart__tip-key" }, H("span", { className: "ds-chart__tip-mk ds-chart__tip-mk--box", style: { color: b.color }, "aria-hidden": "true" }), b.label), H("strong", null, b.value))),
    H("span", { className: "ds-chart__tip-row ds-chart__tip-row--total" }, H("span", { className: "ds-chart__tip-key" }, "Total"), H("strong", null, I(G[b1]) + (z ? " " + z : ""))),
    V1 && H("span", { className: "ds-chart__tip-hint" }, m)
  ) : null, x1 = H(
    "div",
    f2({ className: ["ds-chart", s && "ds-chart--interactive", $].filter(Boolean).join(" ") }, A),
    H(
      "div",
      { ref: g1, ...s ? { className: "ds-chart__bars", tabIndex: 0, role: "group", "aria-label": E || "Stacked bar chart. Use the arrow keys to move through the values.", onPointerMove: (b) => {
        i1(S1(b)), y1(L1(b));
      }, onPointerDown: (b) => {
        i1(S1(b)), y1(L1(b));
      }, onPointerLeave: (b) => {
        b.pointerType !== "touch" && (i1(null), y1(null));
      }, onFocus: () => i1((b) => b ?? Q - 1), onBlur: () => {
        i1(null), y1(null);
      }, onKeyDown: Z1, onClick: V1 ? () => {
        Y != null && K(N1 === Y ? null : Y);
      } : void 0 } : {}, style: { display: "flex", alignItems: "flex-end", gap: "var(--layout-gap-compact)", height: o, borderBottom: "1px solid var(--chart-axis-primary)" } },
      r1.map((b, W) => H(
        "div",
        { key: W, style: { flex: 1, display: "flex", flexDirection: "column-reverse", height: `${G[W] / f1 * 100}%`, borderRadius: "var(--radius-xs) var(--radius-xs) 0 0", overflow: "hidden", opacity: s && b1 != null && b1 !== W ? 0.55 : 1, filter: s && b1 != null && b1 !== W ? "grayscale(1)" : void 0 } },
        d1.map((c1, X) => H("div", { key: c1, "data-seg": X, className: j(X) != null ? "ds-pat ds-pat--" + j(X) : void 0, title: s ? void 0 : `${c1}: ${b[c1]}`, style: { height: `${(b[c1] || 0) / G[W] * 100}%`, ...j(X) != null ? { "--pc": R(X) } : { background: R(X) }, boxShadow: v1 && F && X === u1 - 1 ? "inset 0 1px 0 0 color-mix(in srgb, var(--color-primary-700) 40%, var(--background-surface)), inset 1px 0 0 0 color-mix(in srgb, var(--color-primary-700) 40%, var(--background-surface)), inset -1px 0 0 0 color-mix(in srgb, var(--color-primary-700) 40%, var(--background-surface))" : void 0, opacity: s && b1 === W && s1 != null && s1 !== X ? 0.6 : 1, filter: s && b1 === W && s1 != null && s1 !== X ? "grayscale(1)" : void 0 } }))
      ))
    ),
    H("div", { style: { display: "flex", gap: "var(--layout-gap-compact)", marginTop: "var(--dimension-1)" } }, r1.map((b, W) => H("span", { key: W, style: { flex: 1, textAlign: "center", fontSize: "var(--type-help-size)", color: "var(--chart-labels-primary)", fontWeight: (b1 != null ? b1 === W : a1 && N1 === W) ? 600 : void 0 } }, b.label))),
    q1
  ), $1 = (n ?? l1) && r1.length ? { name: z || "data", head: ["Period"].concat(d1), rows: r1.map((b) => [b.label].concat(d1.map((W) => b[W] == null ? "" : b[W]))) } : null, H1 = l1 || $1 ? H("div", { className: "ds-chart__top" }, H("span", null), H(r.ChartOptions, { patterns: T, onPatterns: r.setChartPatterns, csv: $1 })) : null;
  if (!V1) return H(a.Fragment, null, H1, x1);
  const O1 = H(r.ChartSidePanel, { title: r1[t1].label, subtitle: z, rows: A1(t1).map((b) => ({ label: b.label, value: b.value + (b.share ? "  ·  " + b.share : ""), color: b.color, sub: b.sub, pat: b.pat })), total: { label: "Total", value: I(G[t1]) + (z ? " " + z : "") }, activeRow: W1(), onRowHover: (b) => y1(b == null ? null : u1 - 1 - b), onPrev: () => {
    K(t1 - 1), i1(null);
  }, onNext: () => {
    K(t1 + 1), i1(null);
  }, onClose: a1 ? () => {
    K(null), g1.current && g1.current.focus();
  } : void 0, prevDisabled: t1 <= 0, nextDisabled: t1 >= Q - 1, panelLabel: y, prevLabel: g, nextLabel: u, closeLabel: f, maxHeight: Math.max(o + 56, 280) });
  return H(a.Fragment, null, H1, H("div", { className: "ds-chart-split-host" }, H("div", { className: "ds-chart-split" }, H("div", { className: "ds-chart-split__chart" }, x1), O1)));
}
Object.assign(r, { StackedBarChart: m0 });
function u0({ size: t = "sm", className: e = "", ...h }) {
  return a.createElement("span", { className: ["ds-spinner", t !== "sm" && `ds-spinner--${t}`, e].filter(Boolean).join(" "), "aria-hidden": "true", ...h });
}
Object.assign(r, { Spinner: u0 });
const v0 = a.forwardRef(function({ as: e, className: h, ...d }, c) {
  const l = ["ds-plain-btn", h].filter(Boolean).join(" ");
  return e === "a" ? a.createElement("a", { ref: c, className: l, ...d }) : a.createElement("button", { ref: c, type: "button", className: l, ...d });
});
Object.assign(r, { PlainButton: v0 });
function y0({ box: t, variant: e = "underline", animate: h = !1, className: d = "", style: c, ...l }) {
  return a.createElement("span", { className: ["ds-slide-indicator", "ds-slide-indicator--" + e, h && "ds-slide-indicator--animated", d].filter(Boolean).join(" "), style: { transform: `translateX(${t.left}px)`, width: t.width, ...c }, ...l });
}
Object.assign(r, { SlideIndicator: y0 });
function x0({ className: t = "", children: e, ...h }) {
  return a.createElement("span", { className: ["ds-separator", t].filter(Boolean).join(" "), ...h }, e);
}
Object.assign(r, { Separator: x0 });
function f0({ tone: t = "inverse", className: e = "", children: h, ...d }) {
  return a.createElement("span", { className: ["ds-pill", "ds-pill--" + t, e].filter(Boolean).join(" "), ...d }, h);
}
Object.assign(r, { Pill: f0 });
function g0({ color: t, className: e = "", style: h, ...d }) {
  return a.createElement("span", { className: ["ds-dot", e].filter(Boolean).join(" "), style: { background: t, ...h }, "aria-hidden": "true", ...d });
}
Object.assign(r, { Dot: g0 });
function b0({ d: t, from: e, to: h, gid: d, tone: c = "primary" }) {
  return a.createElement(
    "svg",
    { className: "ds-sparkline ds-sparkline--" + c, viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true", focusable: "false" },
    a.createElement("defs", null, a.createElement(
      "linearGradient",
      { id: d, x1: "0", y1: "0", x2: "0", y2: "1" },
      a.createElement("stop", { offset: "0%", className: "ds-sparkline__stop ds-sparkline__stop--top" }),
      a.createElement("stop", { offset: "100%", className: "ds-sparkline__stop ds-sparkline__stop--bottom" })
    )),
    a.createElement("path", { d: `${t} L${h} 100 L${e} 100 Z`, fill: `url(#${d})` }),
    a.createElement("path", { className: "ds-sparkline__line", d: t, vectorEffect: "non-scaling-stroke" })
  );
}
Object.assign(r, { Sparkline: b0 });
function w0({ pct: t, label: e, arcClass: h = "" }) {
  const c = 2 * Math.PI * 42;
  return a.createElement(
    "div",
    { className: "ds-progress-ring", role: "img", "aria-label": e || t + " %" },
    a.createElement(
      "svg",
      { viewBox: "0 0 100 100", "aria-hidden": "true" },
      a.createElement("circle", { className: "ds-progress-ring__track", cx: 50, cy: 50, r: 42 }),
      a.createElement("circle", { className: ["ds-progress-ring__arc", h].filter(Boolean).join(" "), cx: 50, cy: 50, r: 42, strokeDasharray: c.toFixed(1), strokeDashoffset: (c * (1 - t / 100)).toFixed(1), style: { opacity: t > 0 ? 1 : 0, "--ring-c": c.toFixed(1) }, transform: "rotate(-90 50 50)" })
    ),
    a.createElement("b", { className: "ds-progress-ring__value" }, a.createElement("span", null, t, " %"))
  );
}
Object.assign(r, { ProgressRing: w0 });
const _0 = a.forwardRef(function({ align: e = "start", width: h, title: d, titleId: c, onClose: l, closeLabel: n = "Close", description: p, footer: M, bare: i = !1, className: o = "", style: s, children: v, ...m }, y) {
  return a.createElement(
    "div",
    { ref: y, role: "dialog", "aria-modal": "false", className: ["ds-popover__panel", "ds-popover__panel--" + e, o].filter(Boolean).join(" "), style: h ? { inlineSize: h, ...s } : s, ...m },
    a.createElement(
      "div",
      { className: "ds-popover__head" },
      d && a.createElement("span", { id: c, className: "ds-popover__title" }, d),
      a.createElement(r.PlainButton, { type: "button", className: "ds-popover__close", "aria-label": n, onClick: l }, a.createElement(r.Icon, { name: "x", size: "sm" }))
    ),
    p && a.createElement("p", { className: "ds-popover__description" }, p),
    i ? v : v && a.createElement("div", { className: "ds-popover__body" }, v),
    M && a.createElement("div", { className: "ds-popover__footer" }, M)
  );
});
Object.assign(r, { PopoverPanel: _0 });
function E0({ variant: t = "primary", size: e = "md", full: h = !1, loading: d = !1, disabled: c = !1, iconStart: l, iconEnd: n, edge: p, tone: M, effect: i, children: o, className: s = "", ...v }) {
  if (i === "orb" || i === "slide") {
    const y = { size: e, loading: d, disabled: c, className: s, ...v };
    return l !== void 0 && (y.iconStart = l), n !== void 0 && (y.iconEnd = n), a.createElement(i === "orb" ? z1.OrbButton : z1.SlideButton, y, o);
  }
  if (/\bds-(orb|slide|ripple)-btn\b/.test(s)) {
    const y = ["ds-btn", `ds-btn--${t}`, `ds-btn--${e}`, h && "ds-btn--full", d && "ds-btn--loading", s].filter(Boolean).join(" ");
    return a.createElement(
      "button",
      { type: "button", className: y, disabled: c || d, "aria-busy": d || void 0, ...v },
      d ? a.createElement(r.Spinner, null) : l ? a.createElement("span", { className: "ds-btn__icon" }, l) : null,
      o != null && a.createElement("span", null, o),
      n && !d ? a.createElement("span", { className: "ds-btn__icon" }, n) : null
    );
  }
  const m = ["btn-v2", `btn-v2--${t}`, `btn-v2--${e}`, h && "btn-v2--full", d && "btn-v2--loading", p && `btn-v2--edge-${p}`, s].filter(Boolean).join(" ");
  return a.createElement(
    "button",
    { type: "button", className: m, disabled: c || d, "aria-busy": d || void 0, "data-tone": M || void 0, ...v },
    a.createElement("span", { className: "btn-v2__icon" }, d ? a.createElement(r.Spinner, { size: e === "xs" ? "xs" : "sm" }) : l),
    o != null && a.createElement("span", { className: "btn-v2__label" }, o),
    a.createElement("span", { className: "btn-v2__icon" }, d ? null : n),
    d && a.createElement("span", { className: "btn-v2__sr-only" }, "Loading")
  );
}
Object.assign(r, { Button: E0 });
function g2() {
  return g2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, g2.apply(null, arguments);
}
function H0({
  type: t = "solid",
  orientation: e = "horizontal",
  fixed: h = !1,
  className: d = "",
  ...c
}) {
  const l = ["ds-divider", t !== "solid" && `ds-divider--${t}`, e === "vertical" && "ds-divider--vertical", h && "ds-divider--fixed", d].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement("hr", g2({
    className: l
  }, c));
}
Object.assign(r, { Divider: H0 });
function b2() {
  return b2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, b2.apply(null, arguments);
}
const ka = { "a-arrow-down": '<path d="m14 12 4 4 4-4"/><path d="M18 16V7"/><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M3.304 13h6.392"/>', "a-arrow-up": '<path d="m14 11 4-4 4 4"/><path d="M18 16V7"/><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M3.304 13h6.392"/>', "a-large-small": '<path d="m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16"/><path d="M15.697 14h5.606"/><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M3.304 13h6.392"/>', accessibility: '<circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>', "activity-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M17 12h-2l-2 5-2-10-2 5H7"/>', activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>', "air-vent": '<path d="M18 17.5a2.5 2.5 0 1 1-4 2.03V12"/><path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 8h12"/><path d="M6.6 15.572A2 2 0 1 0 10 17v-5"/>', airplay: '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"/><path d="m12 15 5 6H7Z"/>', "alarm-check": '<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="m9 13 2 2 4-4"/>', "alarm-clock-check": '<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="m9 13 2 2 4-4"/>', "alarm-clock-minus": '<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="M9 13h6"/>', "alarm-clock-off": '<path d="M6.87 6.87a8 8 0 1 0 11.26 11.26"/><path d="M19.9 14.25a8 8 0 0 0-9.15-9.15"/><path d="m22 6-3-3"/><path d="M6.26 18.67 4 21"/><path d="m2 2 20 20"/><path d="M4 4 2 6"/>', "alarm-clock-plus": '<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="M12 10v6"/><path d="M9 13h6"/>', "alarm-clock": '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/>', "alarm-minus": '<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="M9 13h6"/>', "alarm-plus": '<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/><path d="M12 10v6"/><path d="M9 13h6"/>', "alarm-smoke": '<path d="M11 21c0-2.5 2-2.5 2-5"/><path d="M16 21c0-2.5 2-2.5 2-5"/><path d="m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8"/><path d="M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z"/><path d="M6 21c0-2.5 2-2.5 2-5"/>', album: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><polyline points="11 3 11 11 14 8 17 11 17 3"/>', "alert-circle": '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>', "alert-octagon": '<path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/>', "alert-triangle": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>', "align-center-horizontal": '<path d="M2 12h20"/><path d="M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"/><path d="M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/><path d="M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1"/><path d="M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"/>', "align-center-vertical": '<path d="M12 2v20"/><path d="M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4"/><path d="M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"/><path d="M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1"/><path d="M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"/>', "align-center": '<path d="M21 5H3"/><path d="M17 12H7"/><path d="M19 19H5"/>', "align-end-horizontal": '<rect width="6" height="16" x="4" y="2" rx="2"/><rect width="6" height="9" x="14" y="9" rx="2"/><path d="M22 22H2"/>', "align-end-vertical": '<rect width="16" height="6" x="2" y="4" rx="2"/><rect width="9" height="6" x="9" y="14" rx="2"/><path d="M22 22V2"/>', "align-horizontal-distribute-center": '<rect width="6" height="14" x="4" y="5" rx="2"/><rect width="6" height="10" x="14" y="7" rx="2"/><path d="M17 22v-5"/><path d="M17 7V2"/><path d="M7 22v-3"/><path d="M7 5V2"/>', "align-horizontal-distribute-end": '<rect width="6" height="14" x="4" y="5" rx="2"/><rect width="6" height="10" x="14" y="7" rx="2"/><path d="M10 2v20"/><path d="M20 2v20"/>', "align-horizontal-distribute-start": '<rect width="6" height="14" x="4" y="5" rx="2"/><rect width="6" height="10" x="14" y="7" rx="2"/><path d="M4 2v20"/><path d="M14 2v20"/>', "align-horizontal-justify-center": '<rect width="6" height="14" x="2" y="5" rx="2"/><rect width="6" height="10" x="16" y="7" rx="2"/><path d="M12 2v20"/>', "align-horizontal-justify-end": '<rect width="6" height="14" x="2" y="5" rx="2"/><rect width="6" height="10" x="12" y="7" rx="2"/><path d="M22 2v20"/>', "align-horizontal-justify-start": '<rect width="6" height="14" x="6" y="5" rx="2"/><rect width="6" height="10" x="16" y="7" rx="2"/><path d="M2 2v20"/>', "align-horizontal-space-around": '<rect width="6" height="10" x="9" y="7" rx="2"/><path d="M4 22V2"/><path d="M20 22V2"/>', "align-horizontal-space-between": '<rect width="6" height="14" x="3" y="5" rx="2"/><rect width="6" height="10" x="15" y="7" rx="2"/><path d="M3 2v20"/><path d="M21 2v20"/>', "align-justify": '<path d="M3 5h18"/><path d="M3 12h18"/><path d="M3 19h18"/>', "align-left": '<path d="M21 5H3"/><path d="M15 12H3"/><path d="M17 19H3"/>', "align-right": '<path d="M21 5H3"/><path d="M21 12H9"/><path d="M21 19H7"/>', "align-start-horizontal": '<rect width="6" height="16" x="4" y="6" rx="2"/><rect width="6" height="9" x="14" y="6" rx="2"/><path d="M22 2H2"/>', "align-start-vertical": '<rect width="9" height="6" x="6" y="14" rx="2"/><rect width="16" height="6" x="6" y="4" rx="2"/><path d="M2 2v20"/>', "align-vertical-distribute-center": '<path d="M22 17h-3"/><path d="M22 7h-5"/><path d="M5 17H2"/><path d="M7 7H2"/><rect x="5" y="14" width="14" height="6" rx="2"/><rect x="7" y="4" width="10" height="6" rx="2"/>', "align-vertical-distribute-end": '<rect width="14" height="6" x="5" y="14" rx="2"/><rect width="10" height="6" x="7" y="4" rx="2"/><path d="M2 20h20"/><path d="M2 10h20"/>', "align-vertical-distribute-start": '<rect width="14" height="6" x="5" y="14" rx="2"/><rect width="10" height="6" x="7" y="4" rx="2"/><path d="M2 14h20"/><path d="M2 4h20"/>', "align-vertical-justify-center": '<rect width="14" height="6" x="5" y="16" rx="2"/><rect width="10" height="6" x="7" y="2" rx="2"/><path d="M2 12h20"/>', "align-vertical-justify-end": '<rect width="14" height="6" x="5" y="12" rx="2"/><rect width="10" height="6" x="7" y="2" rx="2"/><path d="M2 22h20"/>', "align-vertical-justify-start": '<rect width="14" height="6" x="5" y="16" rx="2"/><rect width="10" height="6" x="7" y="6" rx="2"/><path d="M2 2h20"/>', "align-vertical-space-around": '<rect width="10" height="6" x="7" y="9" rx="2"/><path d="M22 20H2"/><path d="M22 4H2"/>', "align-vertical-space-between": '<rect width="14" height="6" x="5" y="15" rx="2"/><rect width="10" height="6" x="7" y="3" rx="2"/><path d="M2 21h20"/><path d="M2 3h20"/>', ambulance: '<path d="M10 10H6"/><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><pathd="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M8 8v4"/><path d="M9 18h6"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>', ampersand: '<path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"/><path d="M16 12h3"/>', ampersands: '<path d="M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"/><path d="M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"/>', amphora: '<path d="M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8"/><path d="M10 5H8a2 2 0 0 0 0 4h.68"/><path d="M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8"/><path d="M14 5h2a2 2 0 0 1 0 4h-.68"/><path d="M18 22H6"/><path d="M9 2h6"/>', anchor: '<path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/>', angry: '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><path d="M7.5 8 10 9"/><path d="m14 9 2.5-1"/><path d="M9 10h.01"/><path d="M15 10h.01"/>', annoyed: '<circle cx="12" cy="12" r="10"/><path d="M8 15h8"/><path d="M8 9h2"/><path d="M14 9h2"/>', antenna: '<path d="M2 12 7 2"/><path d="m7 12 5-10"/><path d="m12 12 5-10"/><path d="m17 12 5-10"/><path d="M4.5 7h15"/><path d="M12 16v6"/>', anvil: '<path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4"/><path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z"/><path d="M9 12v5"/><path d="M15 12v5"/><path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1"/>', aperture: '<circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94"/><path d="M9.69 8h11.48"/><path d="m7.38 12 5.74-9.94"/><path d="M9.69 16 3.95 6.06"/><path d="M14.31 16H2.83"/><path d="m16.62 12-5.74 9.94"/>', "app-window-mac": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/>', "app-window": '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/>', apple: '<path d="M12 6.528V3a1 1 0 0 1 1-1h0"/><path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"/>', "archive-restore": '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h2"/><path d="M20 8v11a2 2 0 0 1-2 2h-2"/><path d="m9 15 3-3 3 3"/><path d="M12 12v9"/>', "archive-x": '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="m9.5 17 5-5"/><path d="m9.5 12 5 5"/>', archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>', "area-chart": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>', armchair: '<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M5 18v2"/><path d="M19 18v2"/>', "arrow-big-down-dash": '<path d="M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"/><path d="M9 4h6"/>', "arrow-big-down": '<path d="M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"/>', "arrow-big-left-dash": '<path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"/><path d="M20 9v6"/>', "arrow-big-left": '<path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"/>', "arrow-big-right-dash": '<path d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/><path d="M4 9v6"/>', "arrow-big-right": '<path d="M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/>', "arrow-big-up-dash": '<path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/><path d="M9 20h6"/>', "arrow-big-up": '<path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>', "arrow-down-0-1": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><rect x="15" y="4" width="4" height="6" ry="2"/><path d="M17 20v-6h-2"/><path d="M15 20h4"/>', "arrow-down-01": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><rect x="15" y="4" width="4" height="6" ry="2"/><path d="M17 20v-6h-2"/><path d="M15 20h4"/>', "arrow-down-1-0": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M17 10V4h-2"/><path d="M15 10h4"/><rect x="15" y="14" width="4" height="6" ry="2"/>', "arrow-down-10": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M17 10V4h-2"/><path d="M15 10h4"/><rect x="15" y="14" width="4" height="6" ry="2"/>', "arrow-down-a-z": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/>', "arrow-down-az": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/>', "arrow-down-circle": '<circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/>', "arrow-down-from-line": '<path d="M19 3H5"/><path d="M12 21V7"/><path d="m6 15 6 6 6-6"/>', "arrow-down-left-from-circle": '<path d="M2 12a10 10 0 1 1 10 10"/><path d="m2 22 10-10"/><path d="M8 22H2v-6"/>', "arrow-down-left-from-square": '<path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"/><path d="m3 21 9-9"/><path d="M9 21H3v-6"/>', "arrow-down-left-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 8-8 8"/><path d="M16 16H8V8"/>', "arrow-down-left": '<path d="M17 7 7 17"/><path d="M17 17H7V7"/>', "arrow-down-narrow-wide": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h4"/><path d="M11 8h7"/><path d="M11 12h10"/>', "arrow-down-right-from-circle": '<path d="M12 22a10 10 0 1 1 10-10"/><path d="M22 22 12 12"/><path d="M22 16v6h-6"/>', "arrow-down-right-from-square": '<path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="m21 21-9-9"/><path d="M21 15v6h-6"/>', "arrow-down-right-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m8 8 8 8"/><path d="M16 8v8H8"/>', "arrow-down-right": '<path d="m7 7 10 10"/><path d="M17 7v10H7"/>', "arrow-down-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/>', "arrow-down-to-dot": '<path d="M12 2v14"/><path d="m19 9-7 7-7-7"/><circle cx="12" cy="21" r="1"/>', "arrow-down-to-line": '<path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>', "arrow-down-up": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>', "arrow-down-wide-narrow": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/>', "arrow-down-z-a": '<path d="m3 16 4 4 4-4"/><path d="M7 4v16"/><path d="M15 4h5l-5 6h5"/><path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"/><path d="M20 18h-5"/>', "arrow-down-za": '<path d="m3 16 4 4 4-4"/><path d="M7 4v16"/><path d="M15 4h5l-5 6h5"/><path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"/><path d="M20 18h-5"/>', "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>', "arrow-left-circle": '<circle cx="12" cy="12" r="10"/><path d="m12 8-4 4 4 4"/><path d="M16 12H8"/>', "arrow-left-from-line": '<path d="m9 6-6 6 6 6"/><path d="M3 12h14"/><path d="M21 19V5"/>', "arrow-left-right": '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>', "arrow-left-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m12 8-4 4 4 4"/><path d="M16 12H8"/>', "arrow-left-to-line": '<path d="M3 19V5"/><path d="m13 6-6 6 6 6"/><path d="M7 12h14"/>', "arrow-left": '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>', "arrow-right-circle": '<circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/>', "arrow-right-from-line": '<path d="M3 5v14"/><path d="M21 12H7"/><path d="m15 18 6-6-6-6"/>', "arrow-right-left": '<path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/>', "arrow-right-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="m12 16 4-4-4-4"/>', "arrow-right-to-line": '<path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/>', "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', "arrow-forward": '<path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/>', "arrow-up-0-1": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><rect x="15" y="4" width="4" height="6" ry="2"/><path d="M17 20v-6h-2"/><path d="M15 20h4"/>', "arrow-up-01": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><rect x="15" y="4" width="4" height="6" ry="2"/><path d="M17 20v-6h-2"/><path d="M15 20h4"/>', "arrow-up-1-0": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M17 10V4h-2"/><path d="M15 10h4"/><rect x="15" y="14" width="4" height="6" ry="2"/>', "arrow-up-10": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M17 10V4h-2"/><path d="M15 10h4"/><rect x="15" y="14" width="4" height="6" ry="2"/>', "arrow-up-a-z": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/>', "arrow-up-az": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M20 8h-5"/><path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10"/><path d="M15 14h5l-5 6h5"/>', "arrow-up-circle": '<circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>', "arrow-up-down": '<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>', "arrow-up-from-dot": '<path d="m5 9 7-7 7 7"/><path d="M12 16V2"/><circle cx="12" cy="21" r="1"/>', "arrow-up-from-line": '<path d="m18 9-6-6-6 6"/><path d="M12 3v14"/><path d="M5 21h14"/>', "arrow-up-left-from-circle": '<path d="M2 8V2h6"/><path d="m2 2 10 10"/><path d="M12 2A10 10 0 1 1 2 12"/>', "arrow-up-left-from-square": '<path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"/><path d="m3 3 9 9"/><path d="M3 9V3h6"/>', "arrow-up-left-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 16V8h8"/><path d="M16 16 8 8"/>', "arrow-up-left": '<path d="M7 17V7h10"/><path d="M17 17 7 7"/>', "arrow-up-narrow-wide": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/>', "arrow-up-right-from-circle": '<path d="M22 12A10 10 0 1 1 12 2"/><path d="M22 2 12 12"/><path d="M16 2h6v6"/>', "arrow-up-right-from-square": '<path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/>', "arrow-up-right-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 8h8v8"/><path d="m8 16 8-8"/>', "arrow-up-right": '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>', "arrow-up-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>', "arrow-up-to-line": '<path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/>', "arrow-up-wide-narrow": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h10"/><path d="M11 16h7"/><path d="M11 20h4"/>', "arrow-up-z-a": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M15 4h5l-5 6h5"/><path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"/><path d="M20 18h-5"/>', "arrow-up-za": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M15 4h5l-5 6h5"/><path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"/><path d="M20 18h-5"/>', "arrow-up": '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>', "arrows-up-from-line": '<path d="m4 6 3-3 3 3"/><path d="M7 17V3"/><path d="m14 6 3-3 3 3"/><path d="M17 17V3"/><path d="M4 21h16"/>', "asterisk-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8.5 14 7-4"/><path d="m8.5 10 7 4"/>', asterisk: '<path d="M12 6v12"/><path d="M17.196 9 6.804 15"/><path d="m6.804 9 10.392 6"/>', "at-sign": '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>', atom: '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>', "audio-lines": '<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>', "audio-waveform": '<path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"/>', award: '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>', axe: '<path d="m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9"/><path d="M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z"/>', "axis-3-d": '<path d="M13.5 10.5 15 9"/><path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="M4.293 19.707 6 18"/><path d="m9 15 1.5-1.5"/>', "axis-3d": '<path d="M13.5 10.5 15 9"/><path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="M4.293 19.707 6 18"/><path d="m9 15 1.5-1.5"/>', baby: '<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>', backpack: '<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M8 10h8"/><path d="M8 18h8"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>', "badge-alert": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>', "badge-cent": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M12 7v10"/><path d="M15.4 10a4 4 0 1 0 0 4"/>', "badge-check": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>', "badge-dollar-sign": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>', "badge-euro": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M7 12h5"/><path d="M15 9.4a4 4 0 1 0 0 5.2"/>', "badge-help": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>', "badge-indian-rupee": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="m13 17-5-1h1a4 4 0 0 0 0-8"/>', "badge-info": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/>', "badge-japanese-yen": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 8 3 3v7"/><path d="m12 11 3-3"/><path d="M9 12h6"/><path d="M9 16h6"/>', "badge-minus": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="8" x2="16" y1="12" y2="12"/>', "badge-percent": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/>', "badge-plus": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/>', "badge-pound-sterling": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M8 12h4"/><path d="M10 16V9.5a2.5 2.5 0 0 1 5 0"/><path d="M8 16h7"/>', "badge-question-mark": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>', "badge-russian-ruble": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M9 16h5"/><path d="M9 12h5a2 2 0 1 0 0-4h-3v9"/>', "badge-swiss-franc": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M11 17V8h4"/><path d="M11 12h3"/><path d="M9 16h4"/>', "badge-turkish-lira": '<path d="M11 7v10a5 5 0 0 0 5-5"/><path d="m15 8-6 3"/><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76"/>', "badge-x": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/>', badge: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>', "baggage-claim": '<path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"/><path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"/><rect width="13" height="8" x="8" y="6" rx="1"/><circle cx="18" cy="20" r="2"/><circle cx="9" cy="20" r="2"/>', ban: '<path d="M4.929 4.929 19.07 19.071"/><circle cx="12" cy="12" r="10"/>', banana: '<path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"/><path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"/>', bandage: '<path d="M10 10.01h.01"/><path d="M10 14.01h.01"/><path d="M14 10.01h.01"/><path d="M14 14.01h.01"/><path d="M18 6v11.5"/><path d="M6 6v12"/><rect x="2" y="6" width="20" height="12" rx="2"/>', "banknote-arrow-down": '<path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m16 19 3 3 3-3"/><path d="M18 12h.01"/><path d="M19 16v6"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/>', "banknote-arrow-up": '<path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M18 12h.01"/><path d="M19 22v-6"/><path d="m22 19-3-3-3 3"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/>', "banknote-x": '<path d="M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m17 17 5 5"/><path d="M18 12h.01"/><path d="m22 17-5 5"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/>', banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>', "bar-chart-2": '<path d="M5 21v-6"/><path d="M12 21V3"/><path d="M19 21V9"/>', "bar-chart-3": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>', "bar-chart-4": '<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>', "bar-chart-big": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="15" y="5" width="4" height="12" rx="1"/><rect x="7" y="8" width="4" height="9" rx="1"/>', "bar-chart-horizontal-big": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="13" width="9" height="4" rx="1"/><rect x="7" y="5" width="12" height="4" rx="1"/>', "bar-chart-horizontal": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>', "bar-chart": '<path d="M5 21v-6"/><path d="M12 21V9"/><path d="M19 21V3"/>', barcode: '<path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/>', barrel: '<path d="M10 3a41 41 0 0 0 0 18"/><path d="M14 3a41 41 0 0 1 0 18"/><path d="M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z"/><path d="M3.84 17h16.32"/><path d="M3.84 7h16.32"/>', baseline: '<path d="M4 20h16"/><path d="m6 16 6-12 6 12"/><path d="M8 12h8"/>', bath: '<path d="M10 4 8 6"/><path d="M17 19v2"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>', "battery-charging": '<path d="m11 7-3 5h4l-3 5"/><path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935"/><path d="M22 14v-4"/><path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936"/>', "battery-full": '<path d="M10 10v4"/><path d="M14 10v4"/><path d="M22 14v-4"/><path d="M6 10v4"/><rect x="2" y="6" width="16" height="12" rx="2"/>', "battery-low": '<path d="M22 14v-4"/><path d="M6 14v-4"/><rect x="2" y="6" width="16" height="12" rx="2"/>', "battery-medium": '<path d="M10 14v-4"/><path d="M22 14v-4"/><path d="M6 14v-4"/><rect x="2" y="6" width="16" height="12" rx="2"/>', "battery-plus": '<path d="M10 9v6"/><path d="M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605"/><path d="M22 14v-4"/><path d="M7 12h6"/><path d="M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606"/>', "battery-warning": '<path d="M10 17h.01"/><path d="M10 7v6"/><path d="M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/><path d="M22 14v-4"/><path d="M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/>', battery: '<path d="M 22 14 L 22 10"/><rect x="2" y="6" width="16" height="12" rx="2"/>', beaker: '<path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/>', "bean-off": '<path d="M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1"/><path d="M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66"/><path d="M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04"/><line x1="2" x2="22" y1="2" y2="22"/>', bean: '<path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"/><path d="M5.341 10.62a4 4 0 1 0 5.279-5.28"/>', "bed-double": '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>', "bed-single": '<path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M3 18h18"/>', bed: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>', beef: '<path d="M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3"/><path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"/><circle cx="12.5" cy="8.5" r="2.5"/>', "beer-off": '<path d="M13 13v5"/><path d="M17 11.47V8"/><path d="M17 11h1a3 3 0 0 1 2.745 4.211"/><path d="m2 2 20 20"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"/><path d="M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268"/><path d="M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"/><path d="M9 14.6V18"/>', beer: '<path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>', "bell-dot": '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665"/><circle cx="18" cy="8" r="3"/>', "bell-electric": '<path d="M18.518 17.347A7 7 0 0 1 14 19"/><path d="M18.8 4A11 11 0 0 1 20 9"/><path d="M9 9h.01"/><circle cx="20" cy="16" r="2"/><circle cx="9" cy="9" r="7"/><rect x="4" y="16" width="10" height="6" rx="2"/>', "bell-minus": '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M15 8h6"/><path d="M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12"/>', "bell-off": '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742"/><path d="m2 2 20 20"/><path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05"/>', "bell-plus": '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M15 8h6"/><path d="M18 5v6"/><path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332"/>', "bell-ring": '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M22 8c0-2.3-.8-4.3-2-6"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/>', bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>', "between-horizonal-end": '<rect width="13" height="7" x="3" y="3" rx="1"/><path d="m22 15-3-3 3-3"/><rect width="13" height="7" x="3" y="14" rx="1"/>', "between-horizonal-start": '<rect width="13" height="7" x="8" y="3" rx="1"/><path d="m2 9 3 3-3 3"/><rect width="13" height="7" x="8" y="14" rx="1"/>', "between-horizontal-end": '<rect width="13" height="7" x="3" y="3" rx="1"/><path d="m22 15-3-3 3-3"/><rect width="13" height="7" x="3" y="14" rx="1"/>', "between-horizontal-start": '<rect width="13" height="7" x="8" y="3" rx="1"/><path d="m2 9 3 3-3 3"/><rect width="13" height="7" x="8" y="14" rx="1"/>', "between-vertical-end": '<rect width="7" height="13" x="3" y="3" rx="1"/><path d="m9 22 3-3 3 3"/><rect width="7" height="13" x="14" y="3" rx="1"/>', "between-vertical-start": '<rect width="7" height="13" x="3" y="8" rx="1"/><path d="m15 2-3 3-3-3"/><rect width="7" height="13" x="14" y="8" rx="1"/>', "biceps-flexed": '<path d="M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"/><path d="M15 14a5 5 0 0 0-7.584 2"/><path d="M9.964 6.825C8.019 7.977 9.5 13 8 15"/>', bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>', binary: '<rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/>', binoculars: '<path d="M10 10h4"/><path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/><path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"/><path d="M 22 16 L 2 16"/><path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"/><path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/>', biohazard: '<circle cx="12" cy="11.9" r="2"/><path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"/><path d="m8.9 10.1 1.4.8"/><path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"/><path d="m15.1 10.1-1.4.8"/><path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"/><path d="M12 13.9v1.6"/><path d="M13.5 5.4c-1-.2-2-.2-3 0"/><path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5"/><path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5"/>', bird: '<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/>', bitcoin: '<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/>', blend: '<circle cx="9" cy="9" r="7"/><circle cx="15" cy="15" r="7"/>', blinds: '<path d="M3 3h18"/><path d="M20 7H8"/><path d="M20 11H8"/><path d="M10 19h10"/><path d="M8 15h12"/><path d="M4 3v14"/><circle cx="4" cy="19" r="2"/>', blocks: '<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/>', "bluetooth-connected": '<path d="m7 7 10 10-5 5V2l5 5L7 17"/><line x1="18" x2="21" y1="12" y2="12"/><line x1="3" x2="6" y1="12" y2="12"/>', "bluetooth-off": '<path d="m17 17-5 5V12l-5 5"/><path d="m2 2 20 20"/><path d="M14.5 9.5 17 7l-5-5v4.5"/>', "bluetooth-searching": '<path d="m7 7 10 10-5 5V2l5 5L7 17"/><path d="M20.83 14.83a4 4 0 0 0 0-5.66"/><path d="M18 12h.01"/>', bluetooth: '<path d="m7 7 10 10-5 5V2l5 5L7 17"/>', bold: '<path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/>', bolt: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/>', bomb: '<circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95"/><path d="m22 2-1.5 1.5"/>', bone: '<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/>', "book-a": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m8 13 4-7 4 7"/><path d="M9.1 11h5.7"/>', "book-alert": '<path d="M12 13h.01"/><path d="M12 6v3"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>', "book-audio": '<path d="M12 6v7"/><path d="M16 8v3"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 8v3"/>', "book-check": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/>', "book-copy": '<path d="M5 7a2 2 0 0 0-2 2v11"/><path d="M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21"/><path d="M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10"/>', "book-dashed": '<path d="M12 17h1.5"/><path d="M12 22h1.5"/><path d="M12 2h1.5"/><path d="M17.5 22H19a1 1 0 0 0 1-1"/><path d="M17.5 2H19a1 1 0 0 1 1 1v1.5"/><path d="M20 14v3h-2.5"/><path d="M20 8.5V10"/><path d="M4 10V8.5"/><path d="M4 19.5V14"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8"/><path d="M8 22H6.5a1 1 0 0 1 0-5H8"/>', "book-down": '<path d="M12 13V7"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 10 3 3 3-3"/>', "book-headphones": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 12v-2a4 4 0 0 1 8 0v2"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/>', "book-heart": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/>', "book-image": '<path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="10" cy="8" r="2"/>', "book-key": '<path d="m19 3 1 1"/><path d="m20 2-4.5 4.5"/><path d="M20 7.898V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h7.844"/><circle cx="14" cy="8" r="2"/>', "book-lock": '<path d="M18 6V4a2 2 0 1 0-4 0v2"/><path d="M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10"/><rect x="12" y="6" width="8" height="5" rx="1"/>', "book-marked": '<path d="M10 2v8l3-3 3 3V2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>', "book-minus": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M9 10h6"/>', "book-open-check": '<path d="M12 21V7"/><path d="m16 12 2 2 4-4"/><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/>', "book-open-text": '<path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/>', "book-open": '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>', "book-plus": '<path d="M12 7v6"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M9 10h6"/>', "book-template": '<path d="M12 17h1.5"/><path d="M12 22h1.5"/><path d="M12 2h1.5"/><path d="M17.5 22H19a1 1 0 0 0 1-1"/><path d="M17.5 2H19a1 1 0 0 1 1 1v1.5"/><path d="M20 14v3h-2.5"/><path d="M20 8.5V10"/><path d="M4 10V8.5"/><path d="M4 19.5V14"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8"/><path d="M8 22H6.5a1 1 0 0 1 0-5H8"/>', "book-text": '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/>', "book-type": '<path d="M10 13h4"/><path d="M12 6v7"/><path d="M16 8V6H8v2"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>', "book-up-2": '<path d="M12 13V7"/><path d="M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2"/><path d="m9 10 3-3 3 3"/><path d="m9 5 3-3 3 3"/>', "book-up": '<path d="M12 13V7"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9 10 3-3 3 3"/>', "book-user": '<path d="M15 13a3 3 0 1 0-6 0"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/>', "book-x": '<path d="m14.5 7-5 5"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="m9.5 7 5 5"/>', book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>', "bookmark-check": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/><path d="m9 10 2 2 4-4"/>', "bookmark-minus": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="15" x2="9" y1="10" y2="10"/>', "bookmark-plus": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/>', "bookmark-x": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/><path d="m14.5 7.5-5 5"/><path d="m9.5 7.5 5 5"/>', bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>', "boom-box": '<path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M8 8v1"/><path d="M12 8v1"/><path d="M16 8v1"/><rect width="20" height="12" x="2" y="9" rx="2"/><circle cx="8" cy="15" r="2"/><circle cx="16" cy="15" r="2"/>', "bot-message-square": '<path d="M12 6V2H8"/><path d="M15 11v2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M9 11v2"/>', "bot-off": '<path d="M13.67 8H18a2 2 0 0 1 2 2v4.33"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M22 22 2 2"/><path d="M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586"/><path d="M9 13v2"/><path d="M9.67 4H12v2.33"/>', bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>', "bottle-wine": '<path d="M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z"/><path d="M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4"/>', "bow-arrow": '<path d="M17 3h4v4"/><path d="M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17"/><path d="M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05"/><path d="M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z"/><path d="M9.707 14.293 21 3"/>', "box-select": '<path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/>', box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>', boxes: '<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>', braces: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>', brackets: '<path d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3"/><path d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"/>', "brain-circuit": '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/>', "brain-cog": '<path d="m10.852 14.772-.383.923"/><path d="m10.852 9.228-.383-.923"/><path d="m13.148 14.772.382.924"/><path d="m13.531 8.305-.383.923"/><path d="m14.772 10.852.923-.383"/><path d="m14.772 13.148.923.383"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771"/><path d="M17.998 5.125a4 4 0 0 1 2.525 5.771"/><path d="M19.505 10.294a4 4 0 0 1-1.5 7.706"/><path d="M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516"/><path d="M4.5 10.291A4 4 0 0 0 6 18"/><path d="M6.002 5.125a3 3 0 0 0 .4 1.375"/><path d="m9.228 10.852-.923-.383"/><path d="m9.228 13.148-.923.383"/><circle cx="12" cy="12" r="3"/>', brain: '<path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>', "brick-wall-fire": '<path d="M16 3v2.107"/><path d="M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9"/><path d="M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938"/><path d="M3 15h5.253"/><path d="M3 9h8.228"/><path d="M8 15v6"/><path d="M8 3v6"/>', "brick-wall-shield": '<path d="M12 9v1.258"/><path d="M16 3v5.46"/><path d="M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75"/><path d="M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"/><path d="M3 15h7"/><path d="M3 9h12.142"/><path d="M8 15v6"/><path d="M8 3v6"/>', "brick-wall": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 9v6"/><path d="M16 15v6"/><path d="M16 3v6"/><path d="M3 15h18"/><path d="M3 9h18"/><path d="M8 15v6"/><path d="M8 3v6"/>', "briefcase-business": '<path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/>', "briefcase-conveyor-belt": '<path d="M10 20v2"/><path d="M14 20v2"/><path d="M18 20v2"/><path d="M21 20H3"/><path d="M6 20v2"/><path d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"/><rect x="4" y="6" width="16" height="10" rx="2"/>', "briefcase-medical": '<path d="M12 11v4"/><path d="M14 13h-4"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M18 6v14"/><path d="M6 6v14"/><rect width="20" height="14" x="2" y="6" rx="2"/>', briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>', "bring-to-front": '<rect x="8" y="8" width="8" height="8" rx="2"/><path d="M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"/><path d="M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2"/>', "brush-cleaning": '<path d="m16 22-1-4"/><path d="M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1"/><path d="M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z"/><path d="m8 22 1-4"/>', brush: '<path d="m11 10 3 3"/><path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z"/><path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"/>', bubbles: '<path d="M7.2 14.8a2 2 0 0 1 2 2"/><circle cx="18.5" cy="8.5" r="3.5"/><circle cx="7.5" cy="16.5" r="5.5"/><circle cx="7.5" cy="4.5" r="2.5"/>', "bug-off": '<path d="M12 20v-8"/><path d="M14.12 3.88 16 2"/><path d="M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2"/><path d="M18 12.34V11a4 4 0 0 0-4-4h-1.3"/><path d="m2 2 20 20"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M22 13h-3.34"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M6 13H2"/><path d="M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13"/>', "bug-play": '<path d="M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97"/><path d="M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"/><path d="M14.12 3.88 16 2"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M3 5a4 4 0 0 0 3.55 3.97"/><path d="M6 13H2"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"/>', bug: '<path d="M12 20v-9"/><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"/><path d="M14.12 3.88 16 2"/><path d="M21 21a4 4 0 0 0-3.81-4"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M22 13h-4"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M3 5a4 4 0 0 0 3.55 3.97"/><path d="M6 13H2"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"/>', "building-2": '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>', building: '<path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M12 6h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/><path d="M8 6h.01"/><path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><rect x="4" y="2" width="16" height="20" rx="2"/>', "bus-front": '<path d="M4 6 2 7"/><path d="M10 6h4"/><path d="m22 7-2-1"/><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M8 15h.01"/><path d="M16 15h.01"/><path d="M6 19v2"/><path d="M18 21v-2"/>', bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>', "cable-car": '<path d="M10 3h.01"/><path d="M14 2h.01"/><path d="m2 9 20-5"/><path d="M12 12V6.5"/><rect width="16" height="10" x="4" y="12" rx="3"/><path d="M9 12v5"/><path d="M15 12v5"/><path d="M4 17h16"/>', cable: '<path d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z"/><path d="M17 21v-2"/><path d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10"/><path d="M21 21v-2"/><path d="M3 5V3"/><path d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z"/><path d="M7 5V3"/>', "cake-slice": '<path d="M16 13H3"/><path d="M16 17H3"/><path d="m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6"/><circle cx="9" cy="7" r="2"/>', cake: '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>', calculator: '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>', "calendar-1": '<path d="M11 14h1v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/>', "calendar-arrow-down": '<path d="m14 18 4 4 4-4"/><path d="M16 2v4"/><path d="M18 14v8"/><path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343"/><path d="M3 10h18"/><path d="M8 2v4"/>', "calendar-arrow-up": '<path d="m14 18 4-4 4 4"/><path d="M16 2v4"/><path d="M18 22v-8"/><path d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9"/><path d="M3 10h18"/><path d="M8 2v4"/>', "calendar-check-2": '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="m16 20 2 2 4-4"/>', "calendar-check": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>', "calendar-clock": '<path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/>', "calendar-cog": '<path d="m15.228 16.852-.923-.383"/><path d="m15.228 19.148-.923.383"/><path d="M16 2v4"/><path d="m16.47 14.305.382.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><path d="M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="M3 10h18"/><path d="M8 2v4"/><circle cx="18" cy="18" r="3"/>', "calendar-days": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>', "calendar-fold": '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"/><path d="M3 10h18"/><path d="M15 22v-4a2 2 0 0 1 2-2h4"/>', "calendar-heart": '<path d="M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125"/><path d="M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 2v4"/>', "calendar-minus-2": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/>', "calendar-minus": '<path d="M16 19h6"/><path d="M16 2v4"/><path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5"/><path d="M3 10h18"/><path d="M8 2v4"/>', "calendar-off": '<path d="M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"/><path d="M21 15.5V6a2 2 0 0 0-2-2H9.5"/><path d="M16 2v4"/><path d="M3 10h7"/><path d="M21 10h-5.5"/><path d="m2 2 20 20"/>', "calendar-plus-2": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M10 16h4"/><path d="M12 14v4"/>', "calendar-plus": '<path d="M16 19h6"/><path d="M16 2v4"/><path d="M19 16v6"/><path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5"/><path d="M3 10h18"/><path d="M8 2v4"/>', "calendar-range": '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M17 14h-6"/><path d="M13 18H7"/><path d="M7 14h.01"/><path d="M17 18h.01"/>', "calendar-search": '<path d="M16 2v4"/><path d="M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25"/><path d="m22 22-1.875-1.875"/><path d="M3 10h18"/><path d="M8 2v4"/><circle cx="18" cy="18" r="3"/>', "calendar-sync": '<path d="M11 10v4h4"/><path d="m11 14 1.535-1.605a5 5 0 0 1 8 1.5"/><path d="M16 2v4"/><path d="m21 18-1.535 1.605a5 5 0 0 1-8-1.5"/><path d="M21 22v-4h-4"/><path d="M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3"/><path d="M3 10h4"/><path d="M8 2v4"/>', "calendar-x-2": '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="m17 22 5-5"/><path d="m17 17 5 5"/>', "calendar-x": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m14 14-4 4"/><path d="m10 14 4 4"/>', calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>', "camera-off": '<path d="M14.564 14.558a3 3 0 1 1-4.122-4.121"/><path d="m2 2 20 20"/><path d="M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175"/><path d="M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344"/>', camera: '<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>', "candlestick-chart": '<path d="M9 5v4"/><rect width="4" height="6" x="7" y="9" rx="1"/><path d="M9 15v2"/><path d="M17 3v2"/><rect width="4" height="8" x="15" y="5" rx="1"/><path d="M17 13v3"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/>', "candy-cane": '<path d="M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z"/><path d="M17.75 7 15 2.1"/><path d="M10.9 4.8 13 9"/><path d="m7.9 9.7 2 4.4"/><path d="M4.9 14.7 7 18.9"/>', "candy-off": '<path d="M10 10v7.9"/><path d="M11.802 6.145a5 5 0 0 1 6.053 6.053"/><path d="M14 6.1v2.243"/><path d="m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965"/><path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"/><path d="m2 2 20 20"/><path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"/>', candy: '<path d="M10 7v10.9"/><path d="M14 6.1V17"/><path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"/><path d="M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07"/><path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"/>', cannabis: '<path d="M12 22v-4"/><path d="M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"/>', "captions-off": '<path d="M10.5 5H19a2 2 0 0 1 2 2v8.5"/><path d="M17 11h-.5"/><path d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2"/><path d="m2 2 20 20"/><path d="M7 11h4"/><path d="M7 15h2.5"/>', captions: '<rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>', "car-front": '<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/>', "car-taxi-front": '<path d="M10 2h4"/><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/>', car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>', caravan: '<path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2"/><path d="M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2"/><path d="M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9"/><circle cx="8" cy="19" r="2"/>', "card-sim": '<path d="M12 14v4"/><path d="M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M8 14h8"/><rect x="8" y="10" width="8" height="8" rx="1"/>', carrot: '<path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"/><path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z"/><path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z"/>', "case-lower": '<path d="M10 9v7"/><path d="M14 6v10"/><circle cx="17.5" cy="12.5" r="3.5"/><circle cx="6.5" cy="12.5" r="3.5"/>', "case-sensitive": '<path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/>', "case-upper": '<path d="M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5"/><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M3.304 13h6.392"/>', "cassette-tape": '<rect width="20" height="16" x="2" y="4" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M8 12h8"/><circle cx="16" cy="10" r="2"/><path d="m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3"/>', cast: '<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M2 12a9 9 0 0 1 8 8"/><path d="M2 16a5 5 0 0 1 4 4"/><line x1="2" x2="2.01" y1="20" y2="20"/>', castle: '<path d="M10 5V3"/><path d="M14 5V3"/><path d="M15 21v-3a3 3 0 0 0-6 0v3"/><path d="M18 3v8"/><path d="M18 5H6"/><path d="M22 11H2"/><path d="M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9"/><path d="M6 3v8"/>', cat: '<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>', cctv: '<path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"/><path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"/><path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"/><path d="M2 21v-4"/><path d="M7 9h.01"/>', "chart-area": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/>', "chart-bar-big": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="13" width="9" height="4" rx="1"/><rect x="7" y="5" width="12" height="4" rx="1"/>', "chart-bar-decreasing": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11h8"/><path d="M7 16h3"/><path d="M7 6h12"/>', "chart-bar-increasing": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11h8"/><path d="M7 16h12"/><path d="M7 6h3"/>', "chart-bar-stacked": '<path d="M11 13v4"/><path d="M15 5v4"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="7" y="13" width="9" height="4" rx="1"/><rect x="7" y="5" width="12" height="4" rx="1"/>', "chart-bar": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16h8"/><path d="M7 11h12"/><path d="M7 6h3"/>', "chart-candlestick": '<path d="M9 5v4"/><rect width="4" height="6" x="7" y="9" rx="1"/><path d="M9 15v2"/><path d="M17 3v2"/><rect width="4" height="8" x="15" y="5" rx="1"/><path d="M17 13v3"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/>', "chart-column-big": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="15" y="5" width="4" height="12" rx="1"/><rect x="7" y="8" width="4" height="9" rx="1"/>', "chart-column-decreasing": '<path d="M13 17V9"/><path d="M18 17v-3"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17V5"/>', "chart-column-increasing": '<path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/>', "chart-column-stacked": '<path d="M11 13H7"/><path d="M19 9h-4"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><rect x="15" y="5" width="4" height="12" rx="1"/><rect x="7" y="8" width="4" height="9" rx="1"/>', "chart-column": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>', "chart-gantt": '<path d="M10 6h8"/><path d="M12 16h6"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 11h7"/>', "chart-line": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>', "chart-network": '<path d="m13.11 7.664 1.78 2.672"/><path d="m14.162 12.788-3.324 1.424"/><path d="m20 4-6.06 1.515"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="9" cy="15" r="2"/>', "chart-no-axes-column-decreasing": '<path d="M5 21V3"/><path d="M12 21V9"/><path d="M19 21v-6"/>', "chart-no-axes-column-increasing": '<path d="M5 21v-6"/><path d="M12 21V9"/><path d="M19 21V3"/>', "chart-no-axes-column": '<path d="M5 21v-6"/><path d="M12 21V3"/><path d="M19 21V9"/>', "chart-no-axes-combined": '<path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/>', "chart-no-axes-gantt": '<path d="M6 5h12"/><path d="M4 12h10"/><path d="M12 19h8"/>', "chart-pie": '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>', "chart-scatter": '<circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="18.5" cy="5.5" r=".5" fill="currentColor"/><circle cx="11.5" cy="11.5" r=".5" fill="currentColor"/><circle cx="7.5" cy="16.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="14.5" r=".5" fill="currentColor"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/>', "chart-spline": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"/>', "check-check": '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>', "check-circle-2": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', "check-circle": '<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>', "check-line": '<path d="M20 4L9 15"/><path d="M21 19L3 19"/><path d="M9 15L4 10"/>', "check-square-2": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>', "check-square": '<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>', check: '<path d="M20 6 9 17l-5-5"/>', "chef-hat": '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>', cherry: '<path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"/><path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"/>', "chevron-down-circle": '<circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/>', "chevron-down-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 10-4 4-4-4"/>', "chevron-down": '<path d="m6 9 6 6 6-6"/>', "chevron-first": '<path d="m17 18-6-6 6-6"/><path d="M7 6v12"/>', "chevron-last": '<path d="m7 18 6-6-6-6"/><path d="M17 6v12"/>', "chevron-left-circle": '<circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/>', "chevron-left-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m14 16-4-4 4-4"/>', "chevron-left": '<path d="m15 18-6-6 6-6"/>', "chevron-right-circle": '<circle cx="12" cy="12" r="10"/><path d="m10 8 4 4-4 4"/>', "chevron-right-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m10 8 4 4-4 4"/>', "chevron-right": '<path d="m9 18 6-6-6-6"/>', "chevron-up-circle": '<circle cx="12" cy="12" r="10"/><path d="m8 14 4-4 4 4"/>', "chevron-up-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m8 14 4-4 4 4"/>', "chevron-up": '<path d="m18 15-6-6-6 6"/>', "chevrons-down-up": '<path d="m7 20 5-5 5 5"/><path d="m7 4 5 5 5-5"/>', "chevrons-down": '<path d="m7 6 5 5 5-5"/><path d="m7 13 5 5 5-5"/>', "chevrons-left-right-ellipsis": '<path d="M12 12h.01"/><path d="M16 12h.01"/><path d="m17 7 5 5-5 5"/><path d="m7 7-5 5 5 5"/><path d="M8 12h.01"/>', "chevrons-left-right": '<path d="m9 7-5 5 5 5"/><path d="m15 7 5 5-5 5"/>', "chevrons-left": '<path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>', "chevrons-right-left": '<path d="m20 17-5-5 5-5"/><path d="m4 17 5-5-5-5"/>', "chevrons-right": '<path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/>', "chevrons-up-down": '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>', "chevrons-up": '<path d="m17 11-5-5-5 5"/><path d="m17 18-5-5-5 5"/>', chrome: '<path d="M10.88 21.94 15.46 14"/><path d="M21.17 8H12"/><path d="M3.95 6.06 8.54 14"/><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>', chromium: '<path d="M10.88 21.94 15.46 14"/><path d="M21.17 8H12"/><path d="M3.95 6.06 8.54 14"/><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>', church: '<path d="M10 9h4"/><path d="M12 7v5"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9"/><path d="M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14"/>', "cigarette-off": '<path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13"/><path d="M18 8c0-2.5-2-2.5-2-5"/><path d="m2 2 20 20"/><path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866"/><path d="M22 8c0-2.5-2-2.5-2-5"/><path d="M7 12v4"/>', cigarette: '<path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14"/><path d="M18 8c0-2.5-2-2.5-2-5"/><path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M22 8c0-2.5-2-2.5-2-5"/><path d="M7 12v4"/>', "circle-alert": '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>', "circle-arrow-down": '<circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/>', "circle-arrow-left": '<circle cx="12" cy="12" r="10"/><path d="m12 8-4 4 4 4"/><path d="M16 12H8"/>', "circle-arrow-out-down-left": '<path d="M2 12a10 10 0 1 1 10 10"/><path d="m2 22 10-10"/><path d="M8 22H2v-6"/>', "circle-arrow-out-down-right": '<path d="M12 22a10 10 0 1 1 10-10"/><path d="M22 22 12 12"/><path d="M22 16v6h-6"/>', "circle-arrow-out-up-left": '<path d="M2 8V2h6"/><path d="m2 2 10 10"/><path d="M12 2A10 10 0 1 1 2 12"/>', "circle-arrow-out-up-right": '<path d="M22 12A10 10 0 1 1 12 2"/><path d="M22 2 12 12"/><path d="M16 2h6v6"/>', "circle-arrow-right": '<circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/>', "circle-arrow-up": '<circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>', "circle-check-big": '<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>', "circle-check": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>', "circle-chevron-down": '<circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/>', "circle-chevron-left": '<circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/>', "circle-chevron-right": '<circle cx="12" cy="12" r="10"/><path d="m10 8 4 4-4 4"/>', "circle-chevron-up": '<circle cx="12" cy="12" r="10"/><path d="m8 14 4-4 4 4"/>', "circle-dashed": '<path d="M10.1 2.182a10 10 0 0 1 3.8 0"/><path d="M13.9 21.818a10 10 0 0 1-3.8 0"/><path d="M17.609 3.721a10 10 0 0 1 2.69 2.7"/><path d="M2.182 13.9a10 10 0 0 1 0-3.8"/><path d="M20.279 17.609a10 10 0 0 1-2.7 2.69"/><path d="M21.818 10.1a10 10 0 0 1 0 3.8"/><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"/><path d="M6.391 20.279a10 10 0 0 1-2.69-2.7"/>', "circle-divide": '<line x1="8" x2="16" y1="12" y2="12"/><line x1="12" x2="12" y1="16" y2="16"/><line x1="12" x2="12" y1="8" y2="8"/><circle cx="12" cy="12" r="10"/>', "circle-dollar-sign": '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>', "circle-dot-dashed": '<path d="M10.1 2.18a9.93 9.93 0 0 1 3.8 0"/><path d="M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7"/><path d="M21.82 10.1a9.93 9.93 0 0 1 0 3.8"/><path d="M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69"/><path d="M13.9 21.82a9.94 9.94 0 0 1-3.8 0"/><path d="M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7"/><path d="M2.18 13.9a9.93 9.93 0 0 1 0-3.8"/><path d="M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69"/><circle cx="12" cy="12" r="1"/>', "circle-dot": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/>', "circle-ellipsis": '<circle cx="12" cy="12" r="10"/><path d="M17 12h.01"/><path d="M12 12h.01"/><path d="M7 12h.01"/>', "circle-equal": '<path d="M7 10h10"/><path d="M7 14h10"/><circle cx="12" cy="12" r="10"/>', "circle-fading-arrow-up": '<path d="M12 2a10 10 0 0 1 7.38 16.75"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/><path d="M2.5 8.875a10 10 0 0 0-.5 3"/><path d="M2.83 16a10 10 0 0 0 2.43 3.4"/><path d="M4.636 5.235a10 10 0 0 1 .891-.857"/><path d="M8.644 21.42a10 10 0 0 0 7.631-.38"/>', "circle-fading-plus": '<path d="M12 2a10 10 0 0 1 7.38 16.75"/><path d="M12 8v8"/><path d="M16 12H8"/><path d="M2.5 8.875a10 10 0 0 0-.5 3"/><path d="M2.83 16a10 10 0 0 0 2.43 3.4"/><path d="M4.636 5.235a10 10 0 0 1 .891-.857"/><path d="M8.644 21.42a10 10 0 0 0 7.631-.38"/>', "circle-gauge": '<path d="M15.6 2.7a10 10 0 1 0 5.7 5.7"/><circle cx="12" cy="12" r="2"/><path d="M13.4 10.6 19 5"/>', "circle-help": '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', "circle-minus": '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>', "circle-off": '<path d="m2 2 20 20"/><path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"/><path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"/>', "circle-parking-off": '<path d="M12.656 7H13a3 3 0 0 1 2.984 3.307"/><path d="M13 13H9"/><path d="M19.071 19.071A1 1 0 0 1 4.93 4.93"/><path d="m2 2 20 20"/><path d="M8.357 2.687a10 10 0 0 1 12.956 12.956"/><path d="M9 17V9"/>', "circle-parking": '<circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>', "circle-pause": '<circle cx="12" cy="12" r="10"/><line x1="10" x2="10" y1="15" y2="9"/><line x1="14" x2="14" y1="15" y2="9"/>', "circle-percent": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/>', "circle-play": '<path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/><circle cx="12" cy="12" r="10"/>', "circle-plus": '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>', "circle-pound-sterling": '<path d="M10 16V9.5a1 1 0 0 1 5 0"/><path d="M8 12h4"/><path d="M8 16h7"/><circle cx="12" cy="12" r="10"/>', "circle-power": '<path d="M12 7v4"/><path d="M7.998 9.003a5 5 0 1 0 8-.005"/><circle cx="12" cy="12" r="10"/>', "circle-question-mark": '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', "circle-slash-2": '<path d="M22 2 2 22"/><circle cx="12" cy="12" r="10"/>', "circle-slash": '<circle cx="12" cy="12" r="10"/><line x1="9" x2="15" y1="15" y2="9"/>', "circle-slashed": '<path d="M22 2 2 22"/><circle cx="12" cy="12" r="10"/>', "circle-small": '<circle cx="12" cy="12" r="6"/>', "circle-star": '<path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><circle cx="12" cy="12" r="10"/>', "circle-stop": '<circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6" rx="1"/>', "circle-user-round": '<path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>', "circle-user": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>', "circle-x": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>', circle: '<circle cx="12" cy="12" r="10"/>', "circuit-board": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M11 9h4a2 2 0 0 0 2-2V3"/><circle cx="9" cy="9" r="2"/><path d="M7 21v-4a2 2 0 0 1 2-2h4"/><circle cx="15" cy="15" r="2"/>', citrus: '<path d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"/><path d="M19.65 15.66A8 8 0 0 1 8.35 4.34"/><path d="m14 10-5.5 5.5"/><path d="M14 17.85V10H6.15"/>', clapperboard: '<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.4 3.1 4"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>', "clipboard-check": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>', "clipboard-clock": '<path d="M16 14v2.2l1.6 1"/><path d="M16 4h2a2 2 0 0 1 2 2v.832"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"/><circle cx="16" cy="16" r="6"/><rect x="8" y="2" width="8" height="4" rx="1"/>', "clipboard-copy": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M16 4h2a2 2 0 0 1 2 2v4"/><path d="M21 14H11"/><path d="m15 10-4 4 4 4"/>', "clipboard-edit": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"/><path d="M4 13.5V6a2 2 0 0 1 2-2h2"/><path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "clipboard-list": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>', "clipboard-minus": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/>', "clipboard-paste": '<path d="M11 14h10"/><path d="M16 4h2a2 2 0 0 1 2 2v1.344"/><path d="m17 18 4-4-4-4"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"/><rect x="8" y="2" width="8" height="4" rx="1"/>', "clipboard-pen-line": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5"/><path d="M16 4h2a2 2 0 0 1 1.73 1"/><path d="M8 18h1"/><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "clipboard-pen": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"/><path d="M4 13.5V6a2 2 0 0 1 2-2h2"/><path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "clipboard-plus": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M12 17v-6"/>', "clipboard-signature": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5"/><path d="M16 4h2a2 2 0 0 1 1.73 1"/><path d="M8 18h1"/><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "clipboard-type": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12v-1h6v1"/><path d="M11 17h2"/><path d="M12 11v6"/>', "clipboard-x": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m15 11-6 6"/><path d="m9 11 6 6"/>', clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>', "clock-1": '<path d="M12 6v6l2-4"/><circle cx="12" cy="12" r="10"/>', "clock-10": '<path d="M12 6v6l-4-2"/><circle cx="12" cy="12" r="10"/>', "clock-11": '<path d="M12 6v6l-2-4"/><circle cx="12" cy="12" r="10"/>', "clock-12": '<path d="M12 6v6"/><circle cx="12" cy="12" r="10"/>', "clock-2": '<path d="M12 6v6l4-2"/><circle cx="12" cy="12" r="10"/>', "clock-3": '<path d="M12 6v6h4"/><circle cx="12" cy="12" r="10"/>', "clock-4": '<path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/>', "clock-5": '<path d="M12 6v6l2 4"/><circle cx="12" cy="12" r="10"/>', "clock-6": '<path d="M12 6v10"/><circle cx="12" cy="12" r="10"/>', "clock-7": '<path d="M12 6v6l-2 4"/><circle cx="12" cy="12" r="10"/>', "clock-8": '<path d="M12 6v6l-4 2"/><circle cx="12" cy="12" r="10"/>', "clock-9": '<path d="M12 6v6H8"/><circle cx="12" cy="12" r="10"/>', "clock-alert": '<path d="M12 6v6l4 2"/><path d="M20 12v5"/><path d="M20 21h.01"/><path d="M21.25 8.2A10 10 0 1 0 16 21.16"/>', "clock-arrow-down": '<path d="M12 6v6l2 1"/><path d="M12.337 21.994a10 10 0 1 1 9.588-8.767"/><path d="m14 18 4 4 4-4"/><path d="M18 14v8"/>', "clock-arrow-up": '<path d="M12 6v6l1.56.78"/><path d="M13.227 21.925a10 10 0 1 1 8.767-9.588"/><path d="m14 18 4-4 4 4"/><path d="M18 22v-8"/>', "clock-fading": '<path d="M12 2a10 10 0 0 1 7.38 16.75"/><path d="M12 6v6l4 2"/><path d="M2.5 8.875a10 10 0 0 0-.5 3"/><path d="M2.83 16a10 10 0 0 0 2.43 3.4"/><path d="M4.636 5.235a10 10 0 0 1 .891-.857"/><path d="M8.644 21.42a10 10 0 0 0 7.631-.38"/>', "clock-plus": '<path d="M12 6v6l3.644 1.822"/><path d="M16 19h6"/><path d="M19 16v6"/><path d="M21.92 13.267a10 10 0 1 0-8.653 8.653"/>', clock: '<path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/>', "closed-caption": '<path d="M10 9.17a3 3 0 1 0 0 5.66"/><path d="M17 9.17a3 3 0 1 0 0 5.66"/><rect x="2" y="5" width="20" height="14" rx="2"/>', "cloud-alert": '<path d="M12 12v4"/><path d="M12 20h.01"/><path d="M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708"/>', "cloud-check": '<path d="m17 15-5.5 5.5L9 18"/><path d="M5 17.743A7 7 0 1 1 15.71 10h1.79a4.5 4.5 0 0 1 1.5 8.742"/>', "cloud-cog": '<path d="m10.852 19.772-.383.924"/><path d="m13.148 14.228.383-.923"/><path d="M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923"/><path d="m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544"/><path d="m14.772 15.852.923-.383"/><path d="m14.772 18.148.923.383"/><path d="M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2"/><path d="m9.228 15.852-.923-.383"/><path d="m9.228 18.148-.923.383"/>', "cloud-download": '<path d="M12 13v8l-4-4"/><path d="m12 21 4-4"/><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"/>', "cloud-drizzle": '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M16 19v1"/><path d="M16 14v1"/><path d="M12 21v1"/><path d="M12 16v1"/>', "cloud-fog": '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 17H7"/><path d="M17 21H9"/>', "cloud-hail": '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v2"/><path d="M8 14v2"/><path d="M16 20h.01"/><path d="M8 20h.01"/><path d="M12 16v2"/><path d="M12 22h.01"/>', "cloud-lightning": '<path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/>', "cloud-moon-rain": '<path d="M11 20v2"/><path d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"/><path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"/><path d="M7 19v2"/>', "cloud-moon": '<path d="M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z"/><path d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"/>', "cloud-off": '<path d="m2 2 20 20"/><path d="M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193"/><path d="M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07"/>', "cloud-rain-wind": '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m9.2 22 3-7"/><path d="m9 13-3 7"/><path d="m17 13-3 7"/>', "cloud-rain": '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/>', "cloud-snow": '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 15h.01"/><path d="M8 19h.01"/><path d="M12 17h.01"/><path d="M12 21h.01"/><path d="M16 15h.01"/><path d="M16 19h.01"/>', "cloud-sun-rain": '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"/><path d="M11 20v2"/><path d="M7 19v2"/>', "cloud-sun": '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>', "cloud-upload": '<path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/>', cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>', cloudy: '<path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/>', clover: '<path d="M16.17 7.83 2 22"/><path d="M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"/><path d="m7.83 7.83 8.34 8.34"/>', club: '<path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z"/><path d="M12 17.66L12 22"/>', "code-2": '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>', "code-square": '<path d="m10 9-3 3 3 3"/><path d="m14 15 3-3-3-3"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "code-xml": '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>', code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>', codepen: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" x2="12" y1="22" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="2 15.5 12 8.5 22 15.5"/><line x1="12" x2="12" y1="2" y2="8.5"/>', codesandbox: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" x2="12" y1="22.08" y2="12"/>', coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>', cog: '<path d="M11 10.27 7 3.34"/><path d="m11 13.73-4 6.93"/><path d="M12 22v-2"/><path d="M12 2v2"/><path d="M14 12h8"/><path d="m17 20.66-1-1.73"/><path d="m17 3.34-1 1.73"/><path d="M2 12h2"/><path d="m20.66 17-1.73-1"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m3.34 7 1.73 1"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="8"/>', coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>', "columns-2": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/>', "columns-3-cog": '<path d="M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/><path d="m14.3 19.6 1-.4"/><path d="M15 3v7.5"/><path d="m15.2 16.9-.9-.3"/><path d="m16.6 21.7.3-.9"/><path d="m16.8 15.3-.4-1"/><path d="m19.1 15.2.3-.9"/><path d="m19.6 21.7-.4-1"/><path d="m20.7 16.8 1-.4"/><path d="m21.7 19.4-.9-.3"/><path d="M9 3v18"/><circle cx="18" cy="18" r="3"/>', "columns-3": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>', "columns-4": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7.5 3v18"/><path d="M12 3v18"/><path d="M16.5 3v18"/>', "columns-settings": '<path d="M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/><path d="m14.3 19.6 1-.4"/><path d="M15 3v7.5"/><path d="m15.2 16.9-.9-.3"/><path d="m16.6 21.7.3-.9"/><path d="m16.8 15.3-.4-1"/><path d="m19.1 15.2.3-.9"/><path d="m19.6 21.7-.4-1"/><path d="m20.7 16.8 1-.4"/><path d="m21.7 19.4-.9-.3"/><path d="M9 3v18"/><circle cx="18" cy="18" r="3"/>', columns: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/>', combine: '<path d="M10 18H5a3 3 0 0 1-3-3v-1"/><path d="M14 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/><path d="M20 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/><path d="m7 21 3-3-3-3"/><rect x="14" y="14" width="8" height="8" rx="2"/><rect x="2" y="2" width="8" height="8" rx="2"/>', command: '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>', compass: '<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>', component: '<path d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"/><path d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"/><path d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"/><path d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"/>', computer: '<rect width="14" height="8" x="5" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h2"/><path d="M12 18h6"/>', "concierge-bell": '<path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z"/><path d="M20 16a8 8 0 1 0-16 0"/><path d="M12 4v4"/><path d="M10 4h4"/>', cone: '<path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98"/><ellipse cx="12" cy="19" rx="9" ry="3"/>', construction: '<rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/><path d="M10 14 2.3 6.3"/><path d="m14 6 7.7 7.7"/><path d="m8 6 8 8"/>', "contact-2": '<path d="M16 2v2"/><path d="M17.915 22a6 6 0 0 0-12 0"/><path d="M8 2v2"/><circle cx="12" cy="12" r="4"/><rect x="3" y="4" width="18" height="18" rx="2"/>', "contact-round": '<path d="M16 2v2"/><path d="M17.915 22a6 6 0 0 0-12 0"/><path d="M8 2v2"/><circle cx="12" cy="12" r="4"/><rect x="3" y="4" width="18" height="18" rx="2"/>', contact: '<path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="3"/><rect x="3" y="4" width="18" height="18" rx="2"/>', container: '<path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.8v-8.1"/><path d="M18 17.5V9.4"/>', contrast: '<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>', cookie: '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/>', "cooking-pot": '<path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/>', "copy-check": '<path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>', "copy-minus": '<line x1="12" x2="18" y1="15" y2="15"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>', "copy-plus": '<line x1="15" x2="15" y1="12" y2="18"/><line x1="12" x2="18" y1="15" y2="15"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>', "copy-slash": '<line x1="12" x2="18" y1="18" y2="12"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>', "copy-x": '<line x1="12" x2="18" y1="12" y2="18"/><line x1="12" x2="18" y1="18" y2="12"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>', copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>', copyleft: '<circle cx="12" cy="12" r="10"/><path d="M9.17 14.83a4 4 0 1 0 0-5.66"/>', copyright: '<circle cx="12" cy="12" r="10"/><path d="M14.83 14.83a4 4 0 1 1 0-5.66"/>', "corner-down-left": '<path d="M20 4v7a4 4 0 0 1-4 4H4"/><path d="m9 10-5 5 5 5"/>', "corner-down-right": '<path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>', "corner-left-down": '<path d="m14 15-5 5-5-5"/><path d="M20 4h-7a4 4 0 0 0-4 4v12"/>', "corner-left-up": '<path d="M14 9 9 4 4 9"/><path d="M20 20h-7a4 4 0 0 1-4-4V4"/>', "corner-right-down": '<path d="m10 15 5 5 5-5"/><path d="M4 4h7a4 4 0 0 1 4 4v12"/>', "corner-right-up": '<path d="m10 9 5-5 5 5"/><path d="M4 20h7a4 4 0 0 0 4-4V4"/>', "corner-up-left": '<path d="M20 20v-7a4 4 0 0 0-4-4H4"/><path d="M9 14 4 9l5-5"/>', "corner-up-right": '<path d="m15 14 5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>', cpu: '<path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>', "creative-commons": '<circle cx="12" cy="12" r="10"/><path d="M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"/><path d="M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"/>', "credit-card": '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>', croissant: '<path d="M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487"/><path d="M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132"/><path d="M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42"/><path d="M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14"/><path d="M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676"/>', crop: '<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>', cross: '<path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"/>', crosshair: '<circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>', crown: '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>', cuboid: '<path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"/><path d="M10 22v-8L2.25 9.15"/><path d="m10 14 11.77-6.87"/>', "cup-soda": '<path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/><path d="M5 8h14"/><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/><path d="m12 8 1-6h2"/>', "curly-braces": '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>', currency: '<circle cx="12" cy="12" r="8"/><line x1="3" x2="6" y1="3" y2="6"/><line x1="21" x2="18" y1="3" y2="6"/><line x1="3" x2="6" y1="21" y2="18"/><line x1="21" x2="18" y1="21" y2="18"/>', cylinder: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/>', dam: '<path d="M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M2 6h4"/><path d="M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z"/>', "database-backup": '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 12a9 3 0 0 0 5 2.69"/><path d="M21 9.3V5"/><path d="M3 5v14a9 3 0 0 0 6.47 2.88"/><path d="M12 12v4h4"/><path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"/>', "database-zap": '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 15 21.84"/><path d="M21 5V8"/><path d="M21 12L18 17H22L19 22"/><path d="M3 12A9 3 0 0 0 14.59 14.87"/>', database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>', "decimals-arrow-left": '<path d="m13 21-3-3 3-3"/><path d="M20 18H10"/><path d="M3 11h.01"/><rect x="6" y="3" width="5" height="8" rx="2.5"/>', "decimals-arrow-right": '<path d="M10 18h10"/><path d="m17 21 3-3-3-3"/><path d="M3 11h.01"/><rect x="15" y="3" width="5" height="8" rx="2.5"/><rect x="6" y="3" width="5" height="8" rx="2.5"/>', delete: '<path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/><path d="m12 9 6 6"/><path d="m18 9-6 6"/>', dessert: '<path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826"/><path d="M20.804 14.869a9 9 0 0 1-17.608 0"/><circle cx="12" cy="4" r="2"/>', diameter: '<circle cx="19" cy="19" r="2"/><circle cx="5" cy="5" r="2"/><path d="M6.48 3.66a10 10 0 0 1 13.86 13.86"/><path d="m6.41 6.41 11.18 11.18"/><path d="M3.66 6.48a10 10 0 0 0 13.86 13.86"/>', "diamond-minus": '<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/><path d="M8 12h8"/>', "diamond-percent": '<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"/><path d="M9.2 9.2h.01"/><path d="m14.5 9.5-5 5"/><path d="M14.7 14.8h.01"/>', "diamond-plus": '<path d="M12 8v8"/><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/><path d="M8 12h8"/>', diamond: '<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/>', "dice-1": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M12 12h.01"/>', "dice-2": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M15 9h.01"/><path d="M9 15h.01"/>', "dice-3": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M12 12h.01"/><path d="M8 16h.01"/>', "dice-4": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M8 8h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/>', "dice-5": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M8 8h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/><path d="M12 12h.01"/>', "dice-6": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M16 12h.01"/><path d="M16 16h.01"/><path d="M8 8h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/>', dices: '<rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/>', diff: '<path d="M12 3v14"/><path d="M5 10h14"/><path d="M5 21h14"/>', "disc-2": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 12h.01"/>', "disc-3": '<circle cx="12" cy="12" r="10"/><path d="M6 12c0-1.7.7-3.2 1.8-4.2"/><circle cx="12" cy="12" r="2"/><path d="M18 12c0 1.7-.7 3.2-1.8 4.2"/>', "disc-album": '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="5"/><path d="M12 12h.01"/>', disc: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/>', "divide-circle": '<line x1="8" x2="16" y1="12" y2="12"/><line x1="12" x2="12" y1="16" y2="16"/><line x1="12" x2="12" y1="8" y2="8"/><circle cx="12" cy="12" r="10"/>', "divide-square": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="12" x2="12" y1="16" y2="16"/><line x1="12" x2="12" y1="8" y2="8"/>', divide: '<circle cx="12" cy="6" r="1"/><line x1="5" x2="19" y1="12" y2="12"/><circle cx="12" cy="18" r="1"/>', "dna-off": '<path d="M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8"/><path d="m17 6-2.891-2.891"/><path d="M2 15c3.333-3 6.667-3 10-3"/><path d="m2 2 20 20"/><path d="m20 9 .891.891"/><path d="M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1"/><path d="M3.109 14.109 4 15"/><path d="m6.5 12.5 1 1"/><path d="m7 18 2.891 2.891"/><path d="M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16"/>', dna: '<path d="m10 16 1.5 1.5"/><path d="m14 8-1.5-1.5"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m16.5 10.5 1 1"/><path d="m17 6-2.891-2.891"/><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="m20 9 .891.891"/><path d="M3.109 14.109 4 15"/><path d="m6.5 12.5 1 1"/><path d="m7 18 2.891 2.891"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>', dock: '<path d="M2 8h20"/><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 16h12"/>', dog: '<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>', "dollar-sign": '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', donut: '<path d="M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"/><circle cx="12" cy="12" r="3"/>', "door-closed-locked": '<path d="M10 12h.01"/><path d="M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h8"/><path d="M20 17v-2a2 2 0 1 0-4 0v2"/><rect x="14" y="17" width="8" height="5" rx="1"/>', "door-closed": '<path d="M10 12h.01"/><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/>', "door-open": '<path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/>', "dot-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="1"/>', dot: '<circle cx="12.1" cy="12.1" r="1"/>', "download-cloud": '<path d="M12 13v8l-4-4"/><path d="m12 21 4-4"/><path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"/>', download: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>', "drafting-compass": '<path d="m12.99 6.74 1.93 3.44"/><path d="M19.136 12a10 10 0 0 1-14.271 0"/><path d="m21 21-2.16-3.84"/><path d="m3 21 8.02-14.26"/><circle cx="12" cy="5" r="2"/>', drama: '<path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/>', dribbble: '<circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/>', drill: '<path d="M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z"/><path d="M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8"/><path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3"/><path d="M18 6h4"/><path d="m5 10-2 8"/><path d="m7 18 2-8"/>', drone: '<path d="M10 10 7 7"/><path d="m10 14-3 3"/><path d="m14 10 3-3"/><path d="m14 14 3 3"/><path d="M14.205 4.139a4 4 0 1 1 5.439 5.863"/><path d="M19.637 14a4 4 0 1 1-5.432 5.868"/><path d="M4.367 10a4 4 0 1 1 5.438-5.862"/><path d="M9.795 19.862a4 4 0 1 1-5.429-5.873"/><rect x="10" y="8" width="4" height="8" rx="1"/>', "droplet-off": '<path d="M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586"/><path d="m2 2 20 20"/><path d="M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208"/>', droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>', droplets: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>', drum: '<path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M7 13.4v7.9"/><path d="M12 14v8"/><path d="M17 13.4v7.9"/><path d="M2 9v8a10 5 0 0 0 20 0V9"/>', drumstick: '<path d="M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23"/><path d="m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59"/>', dumbbell: '<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>', "ear-off": '<path d="M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46"/><path d="M6 8.5c0-.75.13-1.47.36-2.14"/><path d="M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76"/><path d="M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18"/><line x1="2" x2="22" y1="2" y2="22"/>', ear: '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>', "earth-lock": '<path d="M7 3.34V5a3 3 0 0 0 3 3"/><path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M12 2a10 10 0 1 0 9.54 13"/><path d="M20 6V4a2 2 0 1 0-4 0v2"/><rect width="8" height="5" x="14" y="6" rx="1"/>', earth: '<path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/>', eclipse: '<circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/>', "edit-2": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>', "edit-3": '<path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>', edit: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>', "egg-fried": '<circle cx="11.5" cy="12.5" r="3.5"/><path d="M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"/>', "egg-off": '<path d="m2 2 20 20"/><path d="M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19"/><path d="M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568"/>', egg: '<path d="M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12"/>', "ellipsis-vertical": '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>', ellipsis: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>', "equal-approximately": '<path d="M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"/><path d="M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"/>', "equal-not": '<line x1="5" x2="19" y1="9" y2="9"/><line x1="5" x2="19" y1="15" y2="15"/><line x1="19" x2="5" y1="5" y2="19"/>', "equal-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 10h10"/><path d="M7 14h10"/>', equal: '<line x1="5" x2="19" y1="9" y2="9"/><line x1="5" x2="19" y1="15" y2="15"/>', eraser: '<path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/>', "ethernet-port": '<path d="m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z"/><path d="M6 8v1"/><path d="M10 8v1"/><path d="M14 8v1"/><path d="M18 8v1"/>', euro: '<path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>', "ev-charger": '<path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 7h11"/><path d="m9 11-2 3h3l-2 3"/>', expand: '<path d="m15 15 6 6"/><path d="m15 9 6-6"/><path d="M21 16v5h-5"/><path d="M21 8V3h-5"/><path d="M3 16v5h5"/><path d="m3 21 6-6"/><path d="M3 8V3h5"/><path d="M9 9 3 3"/>', "external-link": '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', "eye-closed": '<path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/>', "eye-off": '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>', eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>', facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>', factory: '<path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/>', fan: '<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/>', "fast-forward": '<path d="M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z"/><path d="M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z"/>', feather: '<path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/>', fence: '<path d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/><path d="M6 8h4"/><path d="M6 18h4"/><path d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/><path d="M14 8h4"/><path d="M14 18h4"/><path d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"/>', "ferris-wheel": '<circle cx="12" cy="12" r="2"/><path d="M12 2v4"/><path d="m6.8 15-3.5 2"/><path d="m20.7 7-3.5 2"/><path d="M6.8 9 3.3 7"/><path d="m20.7 17-3.5-2"/><path d="m9 22 3-8 3 8"/><path d="M8 22h8"/><path d="M18 18.7a9 9 0 1 0-12 0"/>', figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>', "file-archive": '<path d="M10 12v-1"/><path d="M10 18v-2"/><path d="M10 7V6"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01"/><circle cx="10" cy="20" r="2"/>', "file-audio-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="3" cy="17" r="1"/><path d="M2 17v-3a4 4 0 0 1 8 0v3"/><circle cx="9" cy="17" r="1"/>', "file-audio": '<path d="M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0"/>', "file-axis-3-d": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m8 18 4-4"/><path d="M8 10v8h8"/>', "file-axis-3d": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m8 18 4-4"/><path d="M8 10v8h8"/>', "file-badge-2": '<path d="m13.69 12.479 1.29 4.88a.5.5 0 0 1-.697.591l-1.844-.849a1 1 0 0 0-.88.001l-1.846.85a.5.5 0 0 1-.693-.593l1.29-4.88"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="12" cy="10" r="3"/>', "file-badge": '<path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.072"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m6.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.88.001l-1.846.85a.5.5 0 0 1-.693-.593l1.29-4.88"/><circle cx="5" cy="14" r="3"/>', "file-bar-chart-2": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 18v-1"/><path d="M12 18v-6"/><path d="M16 18v-3"/>', "file-bar-chart": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 18v-2"/><path d="M12 18v-4"/><path d="M16 18v-6"/>', "file-box": '<path d="M14.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 13.1a2 2 0 0 0-1 1.76v3.24a2 2 0 0 0 .97 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01Z"/><path d="M7 17v5"/><path d="M11.7 14.2 7 17l-4.7-2.8"/>', "file-chart-column-increasing": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 18v-2"/><path d="M12 18v-4"/><path d="M16 18v-6"/>', "file-chart-column": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 18v-1"/><path d="M12 18v-6"/><path d="M16 18v-3"/>', "file-chart-line": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m16 13-3.5 3.5-2-2L8 17"/>', "file-chart-pie": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5"/><path d="M4.017 11.512a6 6 0 1 0 8.466 8.475"/><path d="M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"/>', "file-check-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3 15 2 2 4-4"/>', "file-check": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/>', "file-clock": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M8 14v2.2l1.6 1"/><circle cx="8" cy="16" r="6"/>', "file-code-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m5 12-3 3 3 3"/><path d="m9 18 3-3-3-3"/>', "file-code": '<path d="M10 12.5 8 15l2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>', "file-cog-2": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m2.305 15.53.923-.382"/><path d="m3.228 12.852-.924-.383"/><path d="M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5"/><path d="m4.852 11.228-.383-.923"/><path d="m4.852 16.772-.383.924"/><path d="m7.148 11.228.383-.923"/><path d="m7.53 17.696-.382-.924"/><path d="m8.772 12.852.923-.383"/><path d="m8.772 15.148.923.383"/><circle cx="6" cy="14" r="3"/>', "file-cog": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m2.305 15.53.923-.382"/><path d="m3.228 12.852-.924-.383"/><path d="M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5"/><path d="m4.852 11.228-.383-.923"/><path d="m4.852 16.772-.383.924"/><path d="m7.148 11.228.383-.923"/><path d="m7.53 17.696-.382-.924"/><path d="m8.772 12.852.923-.383"/><path d="m8.772 15.148.923.383"/><circle cx="6" cy="14" r="3"/>', "file-diff": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M9 10h6"/><path d="M12 13V7"/><path d="M9 17h6"/>', "file-digit": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="4" height="6" x="2" y="12" rx="2"/><path d="M10 12h2v6"/><path d="M10 18h4"/>', "file-down": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/>', "file-edit": '<path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "file-heart": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2.62 13.8A2.25 2.25 0 1 1 6 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M4 6.005V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-1.9-1.376"/>', "file-image": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"/>', "file-input": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/>', "file-json-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/>', "file-json": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/>', "file-key-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v6"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="4" cy="16" r="2"/><path d="m10 10-4.5 4.5"/><path d="m9 11 1 1"/>', "file-key": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><circle cx="10" cy="16" r="2"/><path d="m16 10-4.5 4.5"/><path d="m15 11 1 1"/>', "file-line-chart": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m16 13-3.5 3.5-2-2L8 17"/>', "file-lock-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="8" height="5" x="2" y="13" rx="1"/><path d="M8 13v-2a2 2 0 1 0-4 0v2"/>', "file-lock": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><rect width="8" height="6" x="8" y="12" rx="1"/><path d="M10 12v-2a2 2 0 1 1 4 0v2"/>', "file-minus-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 15h6"/>', "file-minus": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/>', "file-music": '<path d="M10.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v8.4"/><path d="M8 18v-7.7L16 9v7"/><circle cx="14" cy="16" r="2"/><circle cx="6" cy="18" r="2"/>', "file-output": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2"/><path d="M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6"/><path d="m5 11-3 3"/><path d="m5 17-3-3h10"/>', "file-pen-line": '<path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><path d="M8 18h1"/>', "file-pen": '<path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "file-pie-chart": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5"/><path d="M4.017 11.512a6 6 0 1 0 8.466 8.475"/><path d="M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"/>', "file-play": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z"/>', "file-plus-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 15h6"/><path d="M6 12v6"/>', "file-plus": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M12 18v-6"/>', "file-question-mark": '<path d="M12 17h.01"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/>', "file-question": '<path d="M12 17h.01"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/>', "file-scan": '<path d="M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 14a2 2 0 0 0-2 2"/><path d="M20 14a2 2 0 0 1 2 2"/><path d="M20 22a2 2 0 0 0 2-2"/><path d="M16 22a2 2 0 0 1-2-2"/>', "file-search-2": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3 15 18"/>', "file-search": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="m9 18-1.5-1.5"/><circle cx="5" cy="14" r="3"/>', "file-signature": '<path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><path d="M8 18h1"/>', "file-sliders": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 12h8"/><path d="M10 11v2"/><path d="M8 17h8"/><path d="M14 16v2"/>', "file-spreadsheet": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>', "file-stack": '<path d="M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1"/><path d="M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1"/><path d="M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"/>', "file-symlink": '<path d="m10 18 3-3-3-3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"/>', "file-terminal": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m8 16 2-2-2-2"/><path d="M12 18h4"/>', "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>', "file-type-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2 13v-1h6v1"/><path d="M5 12v6"/><path d="M4 18h2"/>', "file-type": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13v-1h6v1"/><path d="M12 12v6"/><path d="M11 18h2"/>', "file-up": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/>', "file-user": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 18a3 3 0 1 0-6 0"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="12" cy="13" r="2"/>', "file-video-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="8" height="6" x="2" y="12" rx="1"/><path d="m10 13.843 3.033-1.755a.645.645 0 0 1 .967.56v4.704a.645.645 0 0 1-.967.56L10 16.157"/>', "file-video-camera": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><rect width="8" height="6" x="2" y="12" rx="1"/><path d="m10 13.843 3.033-1.755a.645.645 0 0 1 .967.56v4.704a.645.645 0 0 1-.967.56L10 16.157"/>', "file-video": '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z"/>', "file-volume-2": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 15h.01"/><path d="M11.5 13.5a2.5 2.5 0 0 1 0 3"/><path d="M15 12a5 5 0 0 1 0 6"/>', "file-volume": '<path d="M11 11a5 5 0 0 1 0 6"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 6.765V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-.93-.23"/><path d="M7 10.51a.5.5 0 0 0-.826-.38l-1.893 1.628A1 1 0 0 1 3.63 12H2.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.129a1 1 0 0 1 .652.242l1.893 1.63a.5.5 0 0 0 .826-.38z"/>', "file-warning": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>', "file-x-2": '<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m8 12.5-5 5"/><path d="m3 12.5 5 5"/>', "file-x": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m14.5 12.5-5 5"/><path d="m9.5 12.5 5 5"/>', file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>', files: '<path d="M15 2a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 21 8v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M15 2v4a2 2 0 0 0 2 2h4"/><path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"/>', film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>', "filter-x": '<path d="M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473"/><path d="m16.5 3.5 5 5"/><path d="m21.5 3.5-5 5"/>', filter: '<path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"/>', fingerprint: '<path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>', "fire-extinguisher": '<path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"/><path d="M9 18h8"/><path d="M18 3h-3"/><path d="M11 3a6 6 0 0 0-6 6v11"/><path d="M5 13h4"/><path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/>', "fish-off": '<path d="M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"/>', "fish-symbol": '<path d="M2 16s9-15 20-4C11 23 2 8 2 8"/>', fish: '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/>', "flag-off": '<path d="M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/><path d="m2 2 20 20"/><path d="M4 22V4"/><path d="M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347"/>', "flag-triangle-left": '<path d="M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5"/>', "flag-triangle-right": '<path d="M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5"/>', flag: '<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>', "flame-kindling": '<path d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"/><path d="m5 22 14-4"/><path d="m5 18 14 4"/>', flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>', "flashlight-off": '<path d="M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4"/><path d="M7 2h11v4c0 2-2 2-2 4v1"/><line x1="11" x2="18" y1="6" y2="6"/><line x1="2" x2="22" y1="2" y2="22"/>', flashlight: '<path d="M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"/><line x1="6" x2="18" y1="6" y2="6"/><line x1="12" x2="12" y1="12" y2="12"/>', "flask-conical-off": '<path d="M10 2v2.343"/><path d="M14 2v6.343"/><path d="m2 2 20 20"/><path d="M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563"/><path d="M6.453 15H15"/><path d="M8.5 2h7"/>', "flask-conical": '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>', "flask-round": '<path d="M10 2v6.292a7 7 0 1 0 4 0V2"/><path d="M5 15h14"/><path d="M8.5 2h7"/>', "flip-horizontal-2": '<path d="m3 7 5 5-5 5V7"/><path d="m21 7-5 5 5 5V7"/><path d="M12 20v2"/><path d="M12 14v2"/><path d="M12 8v2"/><path d="M12 2v2"/>', "flip-horizontal": '<path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"/><path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/><path d="M12 20v2"/><path d="M12 14v2"/><path d="M12 8v2"/><path d="M12 2v2"/>', "flip-vertical-2": '<path d="m17 3-5 5-5-5h10"/><path d="m17 21-5-5-5 5h10"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/>', "flip-vertical": '<path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"/><path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/>', "flower-2": '<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>', flower: '<circle cx="12" cy="12" r="3"/><path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/><path d="M12 7.5V9"/><path d="M7.5 12H9"/><path d="M16.5 12H15"/><path d="M12 16.5V15"/><path d="m8 8 1.88 1.88"/><path d="M14.12 9.88 16 8"/><path d="m8 16 1.88-1.88"/><path d="M14.12 14.12 16 16"/>', focus: '<circle cx="12" cy="12" r="3"/><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>', "fold-horizontal": '<path d="M2 12h6"/><path d="M22 12h-6"/><path d="M12 2v2"/><path d="M12 8v2"/><path d="M12 14v2"/><path d="M12 20v2"/><path d="m19 9-3 3 3 3"/><path d="m5 15 3-3-3-3"/>', "fold-vertical": '<path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3-3-3 3"/><path d="m15 5-3 3-3-3"/>', "folder-archive": '<circle cx="15" cy="19" r="2"/><path d="M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"/><path d="M15 11v-1"/><path d="M15 17v-2"/>', "folder-check": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m9 13 2 2 4-4"/>', "folder-clock": '<path d="M16 14v2.2l1.6 1"/><path d="M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"/><circle cx="16" cy="16" r="6"/>', "folder-closed": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M2 10h20"/>', "folder-code": '<path d="M10 10.5 8 13l2 2.5"/><path d="m14 10.5 2 2.5-2 2.5"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>', "folder-cog-2": '<path d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"/><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="18" cy="18" r="3"/>', "folder-cog": '<path d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"/><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="18" cy="18" r="3"/>', "folder-dot": '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><circle cx="12" cy="13" r="1"/>', "folder-down": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 10v6"/><path d="m15 13-3 3-3-3"/>', "folder-edit": '<path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"/><path d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "folder-git-2": '<path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/><circle cx="13" cy="12" r="2"/><path d="M18 19c-2.8 0-5-2.2-5-5v8"/><circle cx="20" cy="19" r="2"/>', "folder-git": '<circle cx="12" cy="13" r="2"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M14 13h3"/><path d="M7 13h3"/>', "folder-heart": '<path d="M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417"/><path d="M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/>', "folder-input": '<path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"/><path d="M2 13h10"/><path d="m9 16 3-3-3-3"/>', "folder-kanban": '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/>', "folder-key": '<circle cx="16" cy="20" r="2"/><path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2"/><path d="m22 14-4.5 4.5"/><path d="m21 15 1 1"/>', "folder-lock": '<rect width="8" height="5" x="14" y="17" rx="1"/><path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5"/><path d="M20 17v-2a2 2 0 1 0-4 0v2"/>', "folder-minus": '<path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>', "folder-open-dot": '<path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/><circle cx="14" cy="15" r="1"/>', "folder-open": '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>', "folder-output": '<path d="M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5"/><path d="M2 13h10"/><path d="m5 10-3 3 3 3"/>', "folder-pen": '<path d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"/><path d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "folder-plus": '<path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>', "folder-root": '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><circle cx="12" cy="13" r="2"/><path d="M12 15v5"/>', "folder-search-2": '<circle cx="11.5" cy="12.5" r="2.5"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M13.3 14.3 15 16"/>', "folder-search": '<path d="M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1"/><path d="m21 21-1.9-1.9"/><circle cx="17" cy="17" r="3"/>', "folder-symlink": '<path d="M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"/><path d="m8 16 3-3-3-3"/>', "folder-sync": '<path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5"/><path d="M12 10v4h4"/><path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5"/><path d="M22 22v-4h-4"/><path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5"/>', "folder-tree": '<path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M3 5a2 2 0 0 0 2 2h3"/><path d="M3 3v13a2 2 0 0 0 2 2h3"/>', "folder-up": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="M12 10v6"/><path d="m9 13 3-3 3 3"/>', "folder-x": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m9.5 10.5 5 5"/><path d="m14.5 10.5-5 5"/>', folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>', folders: '<path d="M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z"/><path d="M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1"/>', footprints: '<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/>', "fork-knife-crossed": '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>', "fork-knife": '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>', forklift: '<path d="M12 12H5a2 2 0 0 0-2 2v5"/><circle cx="13" cy="19" r="2"/><circle cx="5" cy="19" r="2"/><path d="M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5"/>', "form-input": '<rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/>', forward: '<path d="m15 17 5-5-5-5"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/>', frame: '<line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/>', framer: '<path d="M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7"/>', frown: '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>', fuel: '<path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"/><path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"/><path d="M2 21h13"/><path d="M3 9h11"/>', fullscreen: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="8" x="7" y="8" rx="1"/>', "function-square": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"/><path d="M9 11.2h5.7"/>', "funnel-plus": '<path d="M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348"/><path d="M16 6h6"/><path d="M19 3v6"/>', "funnel-x": '<path d="M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473"/><path d="m16.5 3.5 5 5"/><path d="m21.5 3.5-5 5"/>', funnel: '<path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"/>', "gallery-horizontal-end": '<path d="M2 7v10"/><path d="M6 5v14"/><rect width="12" height="18" x="10" y="3" rx="2"/>', "gallery-horizontal": '<path d="M2 3v18"/><rect width="12" height="18" x="6" y="3" rx="2"/><path d="M22 3v18"/>', "gallery-thumbnails": '<rect width="18" height="14" x="3" y="3" rx="2"/><path d="M4 21h1"/><path d="M9 21h1"/><path d="M14 21h1"/><path d="M19 21h1"/>', "gallery-vertical-end": '<path d="M7 2h10"/><path d="M5 6h14"/><rect width="18" height="12" x="3" y="10" rx="2"/>', "gallery-vertical": '<path d="M3 2h18"/><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M3 22h18"/>', "gamepad-2": '<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>', gamepad: '<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>', "gantt-chart-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 8h7"/><path d="M8 12h6"/><path d="M11 16h5"/>', "gantt-chart": '<path d="M6 5h12"/><path d="M4 12h10"/><path d="M12 19h8"/>', "gauge-circle": '<path d="M15.6 2.7a10 10 0 1 0 5.7 5.7"/><circle cx="12" cy="12" r="2"/><path d="M13.4 10.6 19 5"/>', gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>', gavel: '<path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381"/><path d="m16 16 6-6"/><path d="m21.5 10.5-8-8"/><path d="m8 8 6-6"/><path d="m8.5 7.5 8 8"/>', gem: '<path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/>', "georgian-lari": '<path d="M11.5 21a7.5 7.5 0 1 1 7.35-9"/><path d="M13 12V3"/><path d="M4 21h16"/><path d="M9 12V3"/>', ghost: '<path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>', gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>', "git-branch-plus": '<path d="M6 3v12"/><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M15 6a9 9 0 0 0-9 9"/><path d="M18 15v6"/><path d="M21 18h-6"/>', "git-branch": '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>', "git-commit-horizontal": '<circle cx="12" cy="12" r="3"/><line x1="3" x2="9" y1="12" y2="12"/><line x1="15" x2="21" y1="12" y2="12"/>', "git-commit-vertical": '<path d="M12 3v6"/><circle cx="12" cy="12" r="3"/><path d="M12 15v6"/>', "git-commit": '<circle cx="12" cy="12" r="3"/><line x1="3" x2="9" y1="12" y2="12"/><line x1="15" x2="21" y1="12" y2="12"/>', "git-compare-arrows": '<circle cx="5" cy="6" r="3"/><path d="M12 6h5a2 2 0 0 1 2 2v7"/><path d="m15 9-3-3 3-3"/><circle cx="19" cy="18" r="3"/><path d="M12 18H7a2 2 0 0 1-2-2V9"/><path d="m9 15 3 3-3 3"/>', "git-compare": '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/>', "git-fork": '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>', "git-graph": '<circle cx="5" cy="6" r="3"/><path d="M5 9v6"/><circle cx="5" cy="18" r="3"/><path d="M12 3v18"/><circle cx="19" cy="6" r="3"/><path d="M16 15.7A9 9 0 0 0 19 9"/>', "git-merge": '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>', "git-pull-request-arrow": '<circle cx="5" cy="6" r="3"/><path d="M5 9v12"/><circle cx="19" cy="18" r="3"/><path d="m15 9-3-3 3-3"/><path d="M12 6h5a2 2 0 0 1 2 2v7"/>', "git-pull-request-closed": '<circle cx="6" cy="6" r="3"/><path d="M6 9v12"/><path d="m21 3-6 6"/><path d="m21 9-6-6"/><path d="M18 11.5V15"/><circle cx="18" cy="18" r="3"/>', "git-pull-request-create-arrow": '<circle cx="5" cy="6" r="3"/><path d="M5 9v12"/><path d="m15 9-3-3 3-3"/><path d="M12 6h5a2 2 0 0 1 2 2v3"/><path d="M19 15v6"/><path d="M22 18h-6"/>', "git-pull-request-create": '<circle cx="6" cy="6" r="3"/><path d="M6 9v12"/><path d="M13 6h3a2 2 0 0 1 2 2v3"/><path d="M18 15v6"/><path d="M21 18h-6"/>', "git-pull-request-draft": '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 6V5"/><path d="M18 11v-1"/><line x1="6" x2="6" y1="9" y2="21"/>', "git-pull-request": '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/>', github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>', gitlab: '<path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"/>', "glass-water": '<path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z"/><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"/>', glasses: '<circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/>', "globe-2": '<path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/>', "globe-lock": '<path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"/><path d="M2 12h8.5"/><path d="M20 6V4a2 2 0 1 0-4 0v2"/><rect width="8" height="5" x="14" y="6" rx="1"/>', globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', goal: '<path d="M12 13V2l8 4-8 4"/><path d="M20.561 10.222a9 9 0 1 1-12.55-5.29"/><path d="M8.002 9.997a5 5 0 1 0 8.9 2.02"/>', gpu: '<path d="M2 21V3"/><path d="M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26"/><path d="M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3"/><circle cx="16" cy="11" r="2"/><circle cx="8" cy="11" r="2"/>', grab: '<path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/><path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5"/><path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"/>', "graduation-cap": '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>', grape: '<path d="M22 5V2l-5.89 5.89"/><circle cx="16.6" cy="15.89" r="3"/><circle cx="8.11" cy="7.4" r="3"/><circle cx="12.35" cy="11.65" r="3"/><circle cx="13.91" cy="5.85" r="3"/><circle cx="18.15" cy="10.09" r="3"/><circle cx="6.56" cy="13.2" r="3"/><circle cx="10.8" cy="17.44" r="3"/><circle cx="5" cy="19" r="3"/>', "grid-2-x-2-check": '<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="m16 19 2 2 4-4"/>', "grid-2-x-2-plus": '<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="M16 19h6"/><path d="M19 22v-6"/>', "grid-2-x-2-x": '<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="m16 16 5 5"/><path d="m16 21 5-5"/>', "grid-2-x-2": '<path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "grid-2x2-check": '<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="m16 19 2 2 4-4"/>', "grid-2x2-plus": '<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="M16 19h6"/><path d="M19 22v-6"/>', "grid-2x2-x": '<path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="m16 16 5 5"/><path d="m16 21 5-5"/>', "grid-2x2": '<path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "grid-3-x-3": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>', "grid-3x2": '<path d="M15 3v18"/><path d="M3 12h18"/><path d="M9 3v18"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "grid-3x3": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>', grid: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>', "grip-horizontal": '<circle cx="12" cy="9" r="1"/><circle cx="19" cy="9" r="1"/><circle cx="5" cy="9" r="1"/><circle cx="12" cy="15" r="1"/><circle cx="19" cy="15" r="1"/><circle cx="5" cy="15" r="1"/>', "grip-vertical": '<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>', grip: '<circle cx="12" cy="5" r="1"/><circle cx="19" cy="5" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="19" cy="19" r="1"/><circle cx="5" cy="19" r="1"/>', group: '<path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><rect width="7" height="5" x="7" y="7" rx="1"/><rect width="7" height="5" x="10" y="12" rx="1"/>', guitar: '<path d="m11.9 12.1 4.514-4.514"/><path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z"/><path d="m6 16 2 2"/><path d="M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z"/>', ham: '<path d="M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856"/><path d="M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288"/><path d="M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"/><path d="m8.5 16.5-1-1"/>', hamburger: '<path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25"/><path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2"/><path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0"/><path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"/>', hammer: '<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>', "hand-coins": '<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/>', "hand-fist": '<path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0"/><path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5"/><path d="M9 5A2 2 0 1 0 5 5V10"/><path d="M9 7V4A2 2 0 1 1 13 4V7.268"/>', "hand-grab": '<path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/><path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5"/><path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"/>', "hand-heart": '<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"/><path d="m2 15 6 6"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"/>', "hand-helping": '<path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"/><path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 13 6 6"/>', "hand-metal": '<path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"/><path d="M14 11V9a2 2 0 1 0-4 0v2"/><path d="M10 10.5V5a2 2 0 1 0-4 0v9"/><path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"/>', "hand-platter": '<path d="M12 3V2"/><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/><path d="M2 14h12a2 2 0 0 1 0 4h-2"/><path d="M4 10h16"/><path d="M5 10a7 7 0 0 1 14 0"/><path d="M5 14v6a1 1 0 0 1-1 1H2"/>', hand: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>', handbag: '<path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"/><path d="M8 11V6a4 4 0 0 1 8 0v5"/>', handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>', "hard-drive-download": '<path d="M12 2v8"/><path d="m16 6-4 4-4-4"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h.01"/><path d="M10 18h.01"/>', "hard-drive-upload": '<path d="m16 6-4-4-4 4"/><path d="M12 2v8"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h.01"/><path d="M10 18h.01"/>', "hard-drive": '<line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/>', "hard-hat": '<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>', hash: '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>', "hat-glasses": '<path d="M14 18a2 2 0 0 0-4 0"/><path d="m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11"/><path d="M2 11h20"/><circle cx="17" cy="18" r="3"/><circle cx="7" cy="18" r="3"/>', haze: '<path d="m5.2 6.2 1.4 1.4"/><path d="M2 13h2"/><path d="M20 13h2"/><path d="m17.4 7.6 1.4-1.4"/><path d="M22 17H2"/><path d="M22 21H2"/><path d="M16 13a4 4 0 0 0-8 0"/><path d="M12 5V2.5"/>', "hdmi-port": '<path d="M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z"/><path d="M7.5 12h9"/>', "heading-1": '<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/>', "heading-2": '<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/>', "heading-3": '<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"/><path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"/>', "heading-4": '<path d="M12 18V6"/><path d="M17 10v3a1 1 0 0 0 1 1h3"/><path d="M21 10v8"/><path d="M4 12h8"/><path d="M4 18V6"/>', "heading-5": '<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M17 13v-3h4"/><path d="M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17"/>', "heading-6": '<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><circle cx="19" cy="16" r="2"/><path d="M20 10c-2 2-3 3.5-3 6"/>', heading: '<path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/>', "headphone-off": '<path d="M21 14h-1.343"/><path d="M9.128 3.47A9 9 0 0 1 21 12v3.343"/><path d="m2 2 20 20"/><path d="M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3"/><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364"/>', headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>', headset: '<path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/>', "heart-crack": '<path d="M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15"/><path d="M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z"/>', "heart-handshake": '<path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/>', "heart-minus": '<path d="m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572"/><path d="M15 15h6"/>', "heart-off": '<path d="M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655"/><path d="m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761"/><path d="m2 2 20 20"/>', "heart-plus": '<path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"/><path d="M15 15h6"/><path d="M18 12v6"/>', "heart-pulse": '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>', heart: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>', heater: '<path d="M11 8c2-3-2-3 0-6"/><path d="M15.5 8c2-3-2-3 0-6"/><path d="M6 10h.01"/><path d="M6 14h.01"/><path d="M10 16v-4"/><path d="M14 16v-4"/><path d="M18 16v-4"/><path d="M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"/><path d="M5 20v2"/><path d="M19 20v2"/>', "help-circle": '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', "helping-hand": '<path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"/><path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 13 6 6"/>', hexagon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>', highlighter: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>', history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>', home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', "hop-off": '<path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27"/><path d="M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28"/><path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26"/><path d="M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25"/><path d="M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75"/><path d="M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24"/><path d="M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28"/><path d="M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05"/><path d="m2 2 20 20"/>', hop: '<path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18"/><path d="M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88"/><path d="M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36"/><path d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87"/><path d="M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08"/><path d="M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57"/><path d="M4.93 4.93 3 3a.7.7 0 0 1 0-1"/><path d="M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"/>', hospital: '<path d="M12 7v4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M14 9h-4"/><path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/>', hotel: '<path d="M10 22v-6.57"/><path d="M12 11h.01"/><path d="M12 7h.01"/><path d="M14 15.43V22"/><path d="M15 16a5 5 0 0 0-6 0"/><path d="M16 11h.01"/><path d="M16 7h.01"/><path d="M8 11h.01"/><path d="M8 7h.01"/><rect x="4" y="2" width="16" height="20" rx="2"/>', hourglass: '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>', "house-heart": '<path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', "house-plug": '<path d="M10 12V8.964"/><path d="M14 12V8.964"/><path d="M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z"/><path d="M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2"/>', "house-plus": '<path d="M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35"/><path d="M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8"/><path d="M15 18h6"/><path d="M18 15v6"/>', "house-wifi": '<path d="M9.5 13.866a4 4 0 0 1 5 .01"/><path d="M12 17h.01"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 10.754a8 8 0 0 1 10 0"/>', house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', "ice-cream-2": '<path d="M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0"/><path d="M12.14 11a3.5 3.5 0 1 1 6.71 0"/><path d="M15.5 6.5a3.5 3.5 0 1 0-7 0"/>', "ice-cream-bowl": '<path d="M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0"/><path d="M12.14 11a3.5 3.5 0 1 1 6.71 0"/><path d="M15.5 6.5a3.5 3.5 0 1 0-7 0"/>', "ice-cream-cone": '<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"/><path d="M17 7A5 5 0 0 0 7 7"/><path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"/>', "ice-cream": '<path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"/><path d="M17 7A5 5 0 0 0 7 7"/><path d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"/>', "id-card-lanyard": '<path d="M13.5 8h-3"/><path d="m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3"/><path d="M16.899 22A5 5 0 0 0 7.1 22"/><path d="m9 2 3 6"/><circle cx="12" cy="15" r="3"/>', "id-card": '<path d="M16 10h2"/><path d="M16 14h2"/><path d="M6.17 15a3 3 0 0 1 5.66 0"/><circle cx="9" cy="11" r="2"/><rect x="2" y="5" width="20" height="14" rx="2"/>', "image-down": '<path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19 3 3v-5.5"/><path d="m17 22 3-3"/><circle cx="9" cy="9" r="2"/>', "image-minus": '<path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><line x1="16" x2="22" y1="5" y2="5"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>', "image-off": '<line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" x2="6" y1="13.5" y2="21"/><line x1="18" x2="21" y1="12" y2="15"/><path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"/><path d="M21 15V5a2 2 0 0 0-2-2H9"/>', "image-play": '<path d="M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"/><path d="M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="m6 21 5-5"/><circle cx="9" cy="9" r="2"/>', "image-plus": '<path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/>', "image-up": '<path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/>', "image-upscale": '<path d="M16 3h5v5"/><path d="M17 21h2a2 2 0 0 0 2-2"/><path d="M21 12v3"/><path d="m21 3-5 5"/><path d="M3 7V5a2 2 0 0 1 2-2"/><path d="m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19"/><path d="M9 3h3"/><rect x="3" y="11" width="10" height="10" rx="1"/>', image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>', images: '<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>', import: '<path d="M12 3v12"/><path d="m8 11 4 4 4-4"/><path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"/>', inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>', "indent-decrease": '<path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m7 8-4 4 4 4"/>', "indent-increase": '<path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m3 8 4 4-4 4"/>', indent: '<path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m3 8 4 4-4 4"/>', "indian-rupee": '<path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/>', infinity: '<path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"/>', info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>', inspect: '<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>', "inspection-panel": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/>', instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>', italic: '<line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/>', "iteration-ccw": '<path d="m16 14 4 4-4 4"/><path d="M20 10a8 8 0 1 0-8 8h8"/>', "iteration-cw": '<path d="M4 10a8 8 0 1 1 8 8H4"/><path d="m8 22-4-4 4-4"/>', "japanese-yen": '<path d="M12 9.5V21m0-11.5L6 3m6 6.5L18 3"/><path d="M6 15h12"/><path d="M6 11h12"/>', joystick: '<path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z"/><path d="M6 15v-2"/><path d="M12 15V9"/><circle cx="12" cy="6" r="3"/>', "kanban-square-dashed": '<path d="M8 7v7"/><path d="M12 7v4"/><path d="M16 7v9"/><path d="M5 3a2 2 0 0 0-2 2"/><path d="M9 3h1"/><path d="M14 3h1"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 9v1"/><path d="M21 14v1"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M14 21h1"/><path d="M9 21h1"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M3 14v1"/><path d="M3 9v1"/>', "kanban-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 7v7"/><path d="M12 7v4"/><path d="M16 7v9"/>', kanban: '<path d="M5 3v14"/><path d="M12 3v8"/><path d="M19 3v18"/>', kayak: '<path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z"/><path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61"/><path d="m6.707 6.707 10.586 10.586"/><path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z"/>', "key-round": '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>', "key-square": '<path d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z"/><path d="m14 7 3 3"/><path d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814"/>', key: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>', "keyboard-music": '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h4"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M2 12h20"/><path d="M6 12v4"/><path d="M10 12v4"/><path d="M14 12v4"/><path d="M18 12v4"/>', "keyboard-off": '<path d="M 20 4 A2 2 0 0 1 22 6"/><path d="M 22 6 L 22 16.41"/><path d="M 7 16 L 16 16"/><path d="M 9.69 4 L 20 4"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="m2 2 20 20"/><path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/><path d="M6 8h.01"/><path d="M8 12h.01"/>', keyboard: '<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>', "lamp-ceiling": '<path d="M12 2v5"/><path d="M14.829 15.998a3 3 0 1 1-5.658 0"/><path d="M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z"/>', "lamp-desk": '<path d="M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z"/><path d="m14.207 4.793-3.414 3.414"/><path d="M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18"/>', "lamp-floor": '<path d="M12 10v12"/><path d="M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z"/><path d="M9 22h6"/>', "lamp-wall-down": '<path d="M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z"/><path d="M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M8 6h4a2 2 0 0 1 2 2v5"/>', "lamp-wall-up": '<path d="M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z"/><path d="M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/><path d="M8 18h4a2 2 0 0 0 2-2v-5"/>', lamp: '<path d="M12 12v6"/><path d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"/><path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>', "land-plot": '<path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/>', landmark: '<path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>', languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>', "laptop-2": '<rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/>', "laptop-minimal-check": '<path d="M2 20h20"/><path d="m9 10 2 2 4-4"/><rect x="3" y="4" width="18" height="12" rx="2"/>', "laptop-minimal": '<rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" x2="22" y1="20" y2="20"/>', laptop: '<path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/>', "lasso-select": '<path d="M7 22a5 5 0 0 1-2-4"/><path d="M7 16.93c.96.43 1.96.74 2.99.91"/><path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"/><path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"/>', lasso: '<path d="M3.704 14.467A10 8 0 0 1 2 10a10 8 0 0 1 20 0 10 8 0 0 1-10 8 10 8 0 0 1-5.181-1.158"/><path d="M7 22a5 5 0 0 1-2-3.994"/><circle cx="5" cy="16" r="2"/>', laugh: '<circle cx="12" cy="12" r="10"/><path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>', "layers-2": '<path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"/><path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"/>', "layers-3": '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>', layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>', "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>', "layout-grid": '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>', "layout-list": '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/>', "layout-panel-left": '<rect width="7" height="18" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/>', "layout-panel-top": '<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/>', "layout-template": '<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/>', layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>', leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>', "leafy-green": '<path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"/><path d="M2 22 17 7"/>', lectern: '<path d="M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3"/><path d="M18 6V3a1 1 0 0 0-1-1h-3"/><rect width="8" height="12" x="8" y="10" rx="1"/>', "letter-text": '<path d="M15 5h6"/><path d="M15 12h6"/><path d="M3 19h18"/><path d="m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12"/><path d="M3.92 10h6.16"/>', "library-big": '<rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/>', "library-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7v10"/><path d="M11 7v10"/><path d="m15 7 2 10"/>', library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>', "life-buoy": '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>', ligature: '<path d="M14 12h2v8"/><path d="M14 20h4"/><path d="M6 12h4"/><path d="M6 20h4"/><path d="M8 20V8a4 4 0 0 1 7.464-2"/>', "lightbulb-off": '<path d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5"/><path d="m2 2 20 20"/><path d="M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>', lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>', "line-chart": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>', "line-squiggle": '<path d="M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2"/>', "link-2-off": '<path d="M9 17H7A5 5 0 0 1 7 7"/><path d="M15 7h2a5 5 0 0 1 4 8"/><line x1="8" x2="12" y1="12" y2="12"/><line x1="2" x2="22" y1="2" y2="22"/>', "link-2": '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>', link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>', linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>', "list-check": '<path d="M16 5H3"/><path d="M16 12H3"/><path d="M11 19H3"/><path d="m15 18 2 2 4-4"/>', "list-checks": '<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/>', "list-chevrons-down-up": '<path d="M3 5h8"/><path d="M3 12h8"/><path d="M3 19h8"/><path d="m15 5 3 3 3-3"/><path d="m15 19 3-3 3 3"/>', "list-chevrons-up-down": '<path d="M3 5h8"/><path d="M3 12h8"/><path d="M3 19h8"/><path d="m15 8 3-3 3 3"/><path d="m15 16 3 3 3-3"/>', "list-collapse": '<path d="M10 5h11"/><path d="M10 12h11"/><path d="M10 19h11"/><path d="m3 10 3-3-3-3"/><path d="m3 20 3-3-3-3"/>', "list-end": '<path d="M16 5H3"/><path d="M16 12H3"/><path d="M9 19H3"/><path d="m16 16-3 3 3 3"/><path d="M21 5v12a2 2 0 0 1-2 2h-6"/>', "list-filter-plus": '<path d="M12 5H2"/><path d="M6 12h12"/><path d="M9 19h6"/><path d="M16 5h6"/><path d="M19 8V2"/>', "list-filter": '<path d="M2 5h20"/><path d="M6 12h12"/><path d="M9 19h6"/>', "list-indent-decrease": '<path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m7 8-4 4 4 4"/>', "list-indent-increase": '<path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m3 8 4 4-4 4"/>', "list-minus": '<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M21 12h-6"/>', "list-music": '<path d="M16 5H3"/><path d="M11 12H3"/><path d="M11 19H3"/><path d="M21 16V5"/><circle cx="18" cy="16" r="3"/>', "list-ordered": '<path d="M11 5h10"/><path d="M11 12h10"/><path d="M11 19h10"/><path d="M4 4h1v5"/><path d="M4 9h2"/><path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"/>', "list-plus": '<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="M18 9v6"/><path d="M21 12h-6"/>', "list-restart": '<path d="M21 5H3"/><path d="M7 12H3"/><path d="M7 19H3"/><path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"/><path d="M11 10v4h4"/>', "list-start": '<path d="M3 5h6"/><path d="M3 12h13"/><path d="M3 19h13"/><path d="m16 8-3-3 3-3"/><path d="M21 19V7a2 2 0 0 0-2-2h-6"/>', "list-todo": '<path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/>', "list-tree": '<path d="M8 5h13"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="M3 10a2 2 0 0 0 2 2h3"/><path d="M3 5v12a2 2 0 0 0 2 2h3"/>', "list-video": '<path d="M21 5H3"/><path d="M10 12H3"/><path d="M10 19H3"/><path d="M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"/>', "list-x": '<path d="M16 5H3"/><path d="M11 12H3"/><path d="M16 19H3"/><path d="m15.5 9.5 5 5"/><path d="m20.5 9.5-5 5"/>', list: '<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>', "loader-2": '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>', "loader-circle": '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>', "loader-pinwheel": '<path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0"/><path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"/><path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"/><circle cx="12" cy="12" r="10"/>', loader: '<path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>', "locate-fixed": '<line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>', "locate-off": '<path d="M12 19v3"/><path d="M12 2v3"/><path d="M18.89 13.24a7 7 0 0 0-8.13-8.13"/><path d="M19 12h3"/><path d="M2 12h3"/><path d="m2 2 20 20"/><path d="M7.05 7.05a7 7 0 0 0 9.9 9.9"/>', locate: '<line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/>', "location-edit": '<path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="10" r="3"/>', "lock-keyhole-open": '<circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/>', "lock-keyhole": '<circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/>', "lock-open": '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>', lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', "log-in": '<path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>', "log-out": '<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>', logs: '<path d="M3 5h1"/><path d="M3 12h1"/><path d="M3 19h1"/><path d="M8 5h1"/><path d="M8 12h1"/><path d="M8 19h1"/><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/>', lollipop: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0"/>', luggage: '<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>', "m-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 16V8l4 4 4-4v8"/>', magnet: '<path d="m12 15 4 4"/><path d="M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z"/><path d="m5 8 4 4"/>', "mail-check": '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/>', "mail-minus": '<path d="M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M16 19h6"/>', "mail-open": '<path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>', "mail-plus": '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M19 16v6"/><path d="M16 19h6"/>', "mail-question-mark": '<path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"/><path d="M20 22v.01"/>', "mail-question": '<path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"/><path d="M20 22v.01"/>', "mail-search": '<path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><circle cx="18" cy="18" r="3"/><path d="m22 22-1.5-1.5"/>', "mail-warning": '<path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M20 14v4"/><path d="M20 22v.01"/>', "mail-x": '<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m17 17 4 4"/><path d="m21 17-4 4"/>', mail: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>', mailbox: '<path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><polyline points="15,9 18,9 18,11"/><path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2"/><line x1="6" x2="7" y1="10" y2="10"/>', mails: '<path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/>', "map-minus": '<path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14"/><path d="M15 5.764V14"/><path d="M21 18h-6"/><path d="M9 3.236v15"/>', "map-pin-check-inside": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="m9 10 2 2 4-4"/>', "map-pin-check": '<path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728"/><circle cx="12" cy="10" r="3"/><path d="m16 18 2 2 4-4"/>', "map-pin-house": '<path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/>', "map-pin-minus-inside": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="M9 10h6"/>', "map-pin-minus": '<path d="M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"/><circle cx="12" cy="10" r="3"/><path d="M16 18h6"/>', "map-pin-off": '<path d="M12.75 7.09a3 3 0 0 1 2.16 2.16"/><path d="M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568"/><path d="m2 2 20 20"/><path d="M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533"/><path d="M9.13 9.13a3 3 0 0 0 3.74 3.74"/>', "map-pin-pen": '<path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="10" r="3"/>', "map-pin-plus-inside": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="M12 7v6"/><path d="M9 10h6"/>', "map-pin-plus": '<path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"/><circle cx="12" cy="10" r="3"/><path d="M16 18h6"/><path d="M19 15v6"/>', "map-pin-x-inside": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="m14.5 7.5-5 5"/><path d="m9.5 7.5 5 5"/>', "map-pin-x": '<path d="M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077"/><circle cx="12" cy="10" r="3"/><path d="m21.5 15.5-5 5"/><path d="m21.5 20.5-5-5"/>', "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>', "map-pinned": '<path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/>', "map-plus": '<path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12"/><path d="M15 5.764V12"/><path d="M18 15v6"/><path d="M21 18h-6"/><path d="M9 3.236v15"/>', map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>', "mars-stroke": '<path d="m14 6 4 4"/><path d="M17 3h4v4"/><path d="m21 3-7.75 7.75"/><circle cx="9" cy="15" r="6"/>', mars: '<path d="M16 3h5v5"/><path d="m21 3-6.75 6.75"/><circle cx="10" cy="14" r="6"/>', martini: '<path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/>', "maximize-2": '<path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/><path d="M9 21H3v-6"/>', maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>', medal: '<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/>', "megaphone-off": '<path d="M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344"/><path d="M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"/><path d="m2 2 20 20"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 8v6"/>', megaphone: '<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/>', meh: '<circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="15" y2="15"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>', "memory-stick": '<path d="M6 19v-3"/><path d="M10 19v-3"/><path d="M14 19v-3"/><path d="M18 19v-3"/><path d="M8 11V9"/><path d="M16 11V9"/><path d="M12 11V9"/><path d="M2 15h20"/><path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"/>', "menu-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/>', menu: '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>', merge: '<path d="m8 6 4-4 4 4"/><path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"/><path d="m20 22-5-5"/>', "message-circle-code": '<path d="m10 9-3 3 3 3"/><path d="m14 15 3-3-3-3"/><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>', "message-circle-dashed": '<path d="M10.1 2.182a10 10 0 0 1 3.8 0"/><path d="M13.9 21.818a10 10 0 0 1-3.8 0"/><path d="M17.609 3.72a10 10 0 0 1 2.69 2.7"/><path d="M2.182 13.9a10 10 0 0 1 0-3.8"/><path d="M20.28 17.61a10 10 0 0 1-2.7 2.69"/><path d="M21.818 10.1a10 10 0 0 1 0 3.8"/><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"/><path d="m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98"/>', "message-circle-heart": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z"/>', "message-circle-more": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/>', "message-circle-off": '<path d="m2 2 20 20"/><path d="M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989"/><path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"/>', "message-circle-plus": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h8"/><path d="M12 8v8"/>', "message-circle-question-mark": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', "message-circle-question": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', "message-circle-reply": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="m10 15-3-3 3-3"/><path d="M7 12h8a2 2 0 0 1 2 2v1"/>', "message-circle-warning": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M12 8v4"/><path d="M12 16h.01"/>', "message-circle-x": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>', "message-circle": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>', "message-square-code": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="m10 8-3 3 3 3"/><path d="m14 14 3-3-3-3"/>', "message-square-dashed": '<path d="M12 19h.01"/><path d="M12 3h.01"/><path d="M16 19h.01"/><path d="M16 3h.01"/><path d="M2 13h.01"/><path d="M2 17v4.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H8"/><path d="M2 5a2 2 0 0 1 2-2"/><path d="M2 9h.01"/><path d="M20 3a2 2 0 0 1 2 2"/><path d="M22 13h.01"/><path d="M22 17a2 2 0 0 1-2 2"/><path d="M22 9h.01"/><path d="M8 3h.01"/>', "message-square-diff": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M10 15h4"/><path d="M10 9h4"/><path d="M12 7v4"/>', "message-square-dot": '<path d="M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7"/><circle cx="19" cy="6" r="3"/>', "message-square-heart": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5"/>', "message-square-lock": '<path d="M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10"/><path d="M20 15v-2a2 2 0 0 0-4 0v2"/><rect x="14" y="15" width="8" height="5" rx="1"/>', "message-square-more": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/>', "message-square-off": '<path d="M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826"/><path d="m2 2 20 20"/><path d="M8.656 3H20a2 2 0 0 1 2 2v11.344"/>', "message-square-plus": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 8v6"/><path d="M9 11h6"/>', "message-square-quote": '<path d="M14 14a2 2 0 0 0 2-2V8h-2"/><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M8 14a2 2 0 0 0 2-2V8H8"/>', "message-square-reply": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="m10 8-3 3 3 3"/><path d="M17 14v-1a2 2 0 0 0-2-2H7"/>', "message-square-share": '<path d="M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4"/><path d="M16 3h6v6"/><path d="m16 9 6-6"/>', "message-square-text": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>', "message-square-warning": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 15h.01"/><path d="M12 7v4"/>', "message-square-x": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="m14.5 8.5-5 5"/><path d="m9.5 8.5 5 5"/>', "message-square": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>', "messages-square": '<path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/>', "mic-2": '<path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12"/><path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5"/><circle cx="16" cy="7" r="5"/>', "mic-off": '<path d="M12 19v3"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M16.95 16.95A7 7 0 0 1 5 12v-2"/><path d="M18.89 13.23A7 7 0 0 0 19 12v-2"/><path d="m2 2 20 20"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/>', "mic-vocal": '<path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12"/><path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5"/><circle cx="16" cy="7" r="5"/>', mic: '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>', microchip: '<path d="M18 12h2"/><path d="M18 16h2"/><path d="M18 20h2"/><path d="M18 4h2"/><path d="M18 8h2"/><path d="M4 12h2"/><path d="M4 16h2"/><path d="M4 20h2"/><path d="M4 4h2"/><path d="M4 8h2"/><path d="M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-1.5c-.276 0-.494.227-.562.495a2 2 0 0 1-3.876 0C9.994 2.227 9.776 2 9.5 2z"/>', microscope: '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>', microwave: '<rect width="20" height="15" x="2" y="4" rx="2"/><rect width="8" height="7" x="6" y="8" rx="1"/><path d="M18 8v7"/><path d="M6 19v2"/><path d="M18 19v2"/>', milestone: '<path d="M12 13v8"/><path d="M12 3v3"/><path d="M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z"/>', "milk-off": '<path d="M8 2h8"/><path d="M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"/><path d="M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435"/><line x1="2" x2="22" y1="2" y2="22"/>', milk: '<path d="M8 2h8"/><path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/><path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>', "minimize-2": '<path d="m14 10 7-7"/><path d="M20 10h-6V4"/><path d="m3 21 7-7"/><path d="M4 14h6v6"/>', minimize: '<path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>', "minus-circle": '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>', "minus-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/>', minus: '<path d="M5 12h14"/>', "monitor-check": '<path d="m9 10 2 2 4-4"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/>', "monitor-cog": '<path d="M12 17v4"/><path d="m14.305 7.53.923-.382"/><path d="m15.228 4.852-.923-.383"/><path d="m16.852 3.228-.383-.924"/><path d="m16.852 8.772-.383.923"/><path d="m19.148 3.228.383-.924"/><path d="m19.53 9.696-.382-.924"/><path d="m20.772 4.852.924-.383"/><path d="m20.772 7.148.924.383"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/>', "monitor-dot": '<path d="M12 17v4"/><path d="M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693"/><path d="M8 21h8"/><circle cx="19" cy="6" r="3"/>', "monitor-down": '<path d="M12 13V7"/><path d="m15 10-3 3-3-3"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/>', "monitor-off": '<path d="M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2"/><path d="M22 15V5a2 2 0 0 0-2-2H9"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m2 2 20 20"/>', "monitor-pause": '<path d="M10 13V7"/><path d="M14 13V7"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/>', "monitor-play": '<path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"/><path d="M12 17v4"/><path d="M8 21h8"/><rect x="2" y="3" width="20" height="14" rx="2"/>', "monitor-smartphone": '<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/>', "monitor-speaker": '<path d="M5.5 20H8"/><path d="M17 9h.01"/><rect width="10" height="16" x="12" y="4" rx="2"/><path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4"/><circle cx="17" cy="15" r="1"/>', "monitor-stop": '<path d="M12 17v4"/><path d="M8 21h8"/><rect x="2" y="3" width="20" height="14" rx="2"/><rect x="9" y="7" width="6" height="6" rx="1"/>', "monitor-up": '<path d="m9 10 3-3 3 3"/><path d="M12 13V7"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/>', "monitor-x": '<path d="m14.5 12.5-5-5"/><path d="m9.5 12.5 5-5"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/>', monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>', "moon-star": '<path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>', moon: '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>', "more-horizontal": '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>', "more-vertical": '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>', "mountain-snow": '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/>', mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>', "mouse-off": '<path d="M12 6v.343"/><path d="M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218"/><path d="M19 13.343V9A7 7 0 0 0 8.56 2.902"/><path d="M22 22 2 2"/>', "mouse-pointer-2": '<path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>', "mouse-pointer-ban": '<path d="M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z"/><circle cx="16" cy="16" r="6"/><path d="m11.8 11.8 8.4 8.4"/>', "mouse-pointer-click": '<path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/>', "mouse-pointer-square-dashed": '<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h2"/><path d="M14 3h1"/><path d="M3 9v1"/><path d="M21 9v2"/><path d="M3 14v1"/>', "mouse-pointer": '<path d="M12.586 12.586 19 19"/><path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"/>', mouse: '<rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/>', "move-3-d": '<path d="M5 3v16h16"/><path d="m5 19 6-6"/><path d="m2 6 3-3 3 3"/><path d="m18 16 3 3-3 3"/>', "move-3d": '<path d="M5 3v16h16"/><path d="m5 19 6-6"/><path d="m2 6 3-3 3 3"/><path d="m18 16 3 3-3 3"/>', "move-diagonal-2": '<path d="M19 13v6h-6"/><path d="M5 11V5h6"/><path d="m5 5 14 14"/>', "move-diagonal": '<path d="M11 19H5v-6"/><path d="M13 5h6v6"/><path d="M19 5 5 19"/>', "move-down-left": '<path d="M11 19H5V13"/><path d="M19 5L5 19"/>', "move-down-right": '<path d="M19 13V19H13"/><path d="M5 5L19 19"/>', "move-down": '<path d="M8 18L12 22L16 18"/><path d="M12 2V22"/>', "move-horizontal": '<path d="m18 8 4 4-4 4"/><path d="M2 12h20"/><path d="m6 8-4 4 4 4"/>', "move-left": '<path d="M6 8L2 12L6 16"/><path d="M2 12H22"/>', "move-right": '<path d="M18 8L22 12L18 16"/><path d="M2 12H22"/>', "move-up-left": '<path d="M5 11V5H11"/><path d="M5 5L19 19"/>', "move-up-right": '<path d="M13 5H19V11"/><path d="M19 5L5 19"/>', "move-up": '<path d="M8 6L12 2L16 6"/><path d="M12 2V22"/>', "move-vertical": '<path d="M12 2v20"/><path d="m8 18 4 4 4-4"/><path d="m8 6 4-4 4 4"/>', move: '<path d="M12 2v20"/><path d="m15 19-3 3-3-3"/><path d="m19 9 3 3-3 3"/><path d="M2 12h20"/><path d="m5 9-3 3 3 3"/><path d="m9 5 3-3 3 3"/>', "music-2": '<circle cx="8" cy="18" r="4"/><path d="M12 18V2l7 4"/>', "music-3": '<circle cx="12" cy="18" r="4"/><path d="M16 18V2"/>', "music-4": '<path d="M9 18V5l12-2v13"/><path d="m9 9 12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>', music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>', "navigation-2-off": '<path d="M9.31 9.31 5 21l7-4 7 4-1.17-3.17"/><path d="M14.53 8.88 12 2l-1.17 3.17"/><line x1="2" x2="22" y1="2" y2="22"/>', "navigation-2": '<polygon points="12 2 19 21 12 17 5 21 12 2"/>', "navigation-off": '<path d="M8.43 8.43 3 11l8 2 2 8 2.57-5.43"/><path d="M17.39 11.73 22 2l-9.73 4.61"/><line x1="2" x2="22" y1="2" y2="22"/>', navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>', network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>', newspaper: '<path d="M15 18h-5"/><path d="M18 14h-8"/><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="10" y="6" rx="1"/>', nfc: '<path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/><path d="M16.37 2a20.16 20.16 0 0 1 0 20"/>', "non-binary": '<path d="M12 2v10"/><path d="m8.5 4 7 4"/><path d="m8.5 8 7-4"/><circle cx="12" cy="17" r="5"/>', "notebook-pen": '<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>', "notebook-tabs": '<path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M15 2v20"/><path d="M15 7h5"/><path d="M15 12h5"/><path d="M15 17h5"/>', "notebook-text": '<path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9.5 8h5"/><path d="M9.5 12H16"/><path d="M9.5 16H14"/>', notebook: '<path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M16 2v20"/>', "notepad-text-dashed": '<path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><path d="M16 4h2a2 2 0 0 1 2 2v2"/><path d="M20 12v2"/><path d="M20 18v2a2 2 0 0 1-2 2h-1"/><path d="M13 22h-2"/><path d="M7 22H6a2 2 0 0 1-2-2v-2"/><path d="M4 14v-2"/><path d="M4 8V6a2 2 0 0 1 2-2h2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/>', "notepad-text": '<path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/>', "nut-off": '<path d="M12 4V2"/><path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939"/><path d="M19 10v3.343"/><path d="M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192"/><line x1="2" x2="22" y1="2" y2="22"/>', nut: '<path d="M12 4V2"/><path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"/><path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"/>', "octagon-alert": '<path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/>', "octagon-minus": '<path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/><path d="M8 12h8"/>', "octagon-pause": '<path d="M10 15V9"/><path d="M14 15V9"/><path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/>', "octagon-x": '<path d="m15 9-6 6"/><path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/><path d="m9 9 6 6"/>', octagon: '<path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/>', omega: '<path d="M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21"/>', option: '<path d="M3 3h6l6 18h6"/><path d="M14 3h7"/>', orbit: '<path d="M20.341 6.484A10 10 0 0 1 10.266 21.85"/><path d="M3.659 17.516A10 10 0 0 1 13.74 2.152"/><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/>', origami: '<path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025"/><path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009"/><path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"/>', outdent: '<path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m7 8-4 4 4 4"/>', "package-2": '<path d="M12 3v6"/><path d="M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z"/><path d="M3.054 9.013h17.893"/>', "package-check": '<path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>', "package-minus": '<path d="M16 16h6"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>', "package-open": '<path d="M12 22v-9"/><path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"/><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"/>', "package-plus": '<path d="M16 16h6"/><path d="M19 13v6"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>', "package-search": '<path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/>', "package-x": '<path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/><path d="m17 13 5 5m-5 0 5-5"/>', package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>', "paint-bucket": '<path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>', "paint-roller": '<rect width="16" height="6" x="2" y="2" rx="2"/><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect width="4" height="6" x="8" y="16" rx="1"/>', "paintbrush-2": '<path d="M10 2v2"/><path d="M14 2v4"/><path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z"/><path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"/>', "paintbrush-vertical": '<path d="M10 2v2"/><path d="M14 2v4"/><path d="M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z"/><path d="M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"/>', paintbrush: '<path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>', palette: '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>', palmtree: '<path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/>', panda: '<path d="M11.25 17.25h1.5L12 18z"/><path d="m15 12 2 2"/><path d="M18 6.5a.5.5 0 0 0-.5-.5"/><path d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83"/><path d="M6 6.5a.495.495 0 0 1 .5-.5"/><path d="m9 12-2 2"/>', "panel-bottom-close": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 15h18"/><path d="m15 8-3 3-3-3"/>', "panel-bottom-dashed": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M14 15h1"/><path d="M19 15h2"/><path d="M3 15h2"/><path d="M9 15h1"/>', "panel-bottom-inactive": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M14 15h1"/><path d="M19 15h2"/><path d="M3 15h2"/><path d="M9 15h1"/>', "panel-bottom-open": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 15h18"/><path d="m9 10 3-3 3 3"/>', "panel-bottom": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 15h18"/>', "panel-left-close": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/>', "panel-left-dashed": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 14v1"/><path d="M9 19v2"/><path d="M9 3v2"/><path d="M9 9v1"/>', "panel-left-inactive": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 14v1"/><path d="M9 19v2"/><path d="M9 3v2"/><path d="M9 9v1"/>', "panel-left-open": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/>', "panel-left-right-dashed": '<path d="M15 10V9"/><path d="M15 15v-1"/><path d="M15 21v-2"/><path d="M15 5V3"/><path d="M9 10V9"/><path d="M9 15v-1"/><path d="M9 21v-2"/><path d="M9 5V3"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "panel-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>', "panel-right-close": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/>', "panel-right-dashed": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 14v1"/><path d="M15 19v2"/><path d="M15 3v2"/><path d="M15 9v1"/>', "panel-right-inactive": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 14v1"/><path d="M15 19v2"/><path d="M15 3v2"/><path d="M15 9v1"/>', "panel-right-open": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/>', "panel-right": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>', "panel-top-bottom-dashed": '<path d="M14 15h1"/><path d="M14 9h1"/><path d="M19 15h2"/><path d="M19 9h2"/><path d="M3 15h2"/><path d="M3 9h2"/><path d="M9 15h1"/><path d="M9 9h1"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "panel-top-close": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="m9 16 3-3 3 3"/>', "panel-top-dashed": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M14 9h1"/><path d="M19 9h2"/><path d="M3 9h2"/><path d="M9 9h1"/>', "panel-top-inactive": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M14 9h1"/><path d="M19 9h2"/><path d="M3 9h2"/><path d="M9 9h1"/>', "panel-top-open": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="m15 14-3 3-3-3"/>', "panel-top": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/>', "panels-left-bottom": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M9 15h12"/>', "panels-left-right": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/>', "panels-right-bottom": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 15h12"/><path d="M15 3v18"/>', "panels-top-bottom": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H3"/><path d="M21 15H3"/>', "panels-top-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>', paperclip: '<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>', parentheses: '<path d="M8 21s-4-3-4-9 4-9 4-9"/><path d="M16 3s4 3 4 9-4 9-4 9"/>', "parking-circle-off": '<path d="M12.656 7H13a3 3 0 0 1 2.984 3.307"/><path d="M13 13H9"/><path d="M19.071 19.071A1 1 0 0 1 4.93 4.93"/><path d="m2 2 20 20"/><path d="M8.357 2.687a10 10 0 0 1 12.956 12.956"/><path d="M9 17V9"/>', "parking-circle": '<circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>', "parking-meter": '<path d="M11 15h2"/><path d="M12 12v3"/><path d="M12 19v3"/><path d="M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z"/><path d="M9 9a3 3 0 1 1 6 0"/>', "parking-square-off": '<path d="M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41"/><path d="M3 8.7V19a2 2 0 0 0 2 2h10.3"/><path d="m2 2 20 20"/><path d="M13 13a3 3 0 1 0 0-6H9v2"/><path d="M9 17v-2.3"/>', "parking-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>', "party-popper": '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>', "pause-circle": '<circle cx="12" cy="12" r="10"/><line x1="10" x2="10" y1="15" y2="9"/><line x1="14" x2="14" y1="15" y2="9"/>', "pause-octagon": '<path d="M10 15V9"/><path d="M14 15V9"/><path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/>', pause: '<rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/>', "paw-print": '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>', "pc-case": '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M15 14h.01"/><path d="M9 6h6"/><path d="M9 10h6"/>', "pen-box": '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>', "pen-line": '<path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>', "pen-off": '<path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"/><path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353"/><path d="m2 2 20 20"/>', "pen-square": '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>', "pen-tool": '<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/>', pen: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>', "pencil-line": '<path d="M13 21h8"/><path d="m15 5 4 4"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>', "pencil-off": '<path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"/><path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353"/><path d="m15 5 4 4"/><path d="m2 2 20 20"/>', "pencil-ruler": '<path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>', pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>', pentagon: '<path d="M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"/>', "percent-circle": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/>', "percent-diamond": '<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"/><path d="M9.2 9.2h.01"/><path d="m14.5 9.5-5 5"/><path d="M14.7 14.8h.01"/>', "percent-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/>', percent: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>', "person-standing": '<circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/>', "philippine-peso": '<path d="M20 11H4"/><path d="M20 7H4"/><path d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7"/>', "phone-call": '<path d="M13 2a9 9 0 0 1 9 9"/><path d="M13 6a5 5 0 0 1 5 5"/><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', "phone-forwarded": '<path d="M14 6h8"/><path d="m18 2 4 4-4 4"/><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', "phone-incoming": '<path d="M16 2v6h6"/><path d="m22 2-6 6"/><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', "phone-missed": '<path d="m16 2 6 6"/><path d="m22 2-6 6"/><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', "phone-off": '<path d="M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272"/><path d="M22 2 2 22"/><path d="M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473"/>', "phone-outgoing": '<path d="m16 8 6-6"/><path d="M22 8V2h-6"/><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', "pi-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M10 7v10"/><path d="M16 17a2 2 0 0 1-2-2V7"/>', pi: '<line x1="9" x2="9" y1="4" y2="20"/><path d="M4 7c0-1.7 1.3-3 3-3h13"/><path d="M18 20c-1.7 0-3-1.3-3-3V4"/>', piano: '<path d="M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8"/><path d="M2 14h20"/><path d="M6 14v4"/><path d="M10 14v4"/><path d="M14 14v4"/><path d="M18 14v4"/>', pickaxe: '<path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999"/><path d="M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024"/><path d="M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069"/><path d="M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z"/>', "picture-in-picture-2": '<path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"/><rect width="10" height="7" x="12" y="13" rx="2"/>', "picture-in-picture": '<path d="M2 10h6V4"/><path d="m2 4 6 6"/><path d="M21 10V7a2 2 0 0 0-2-2h-7"/><path d="M3 14v2a2 2 0 0 0 2 2h3"/><rect x="12" y="14" width="10" height="7" rx="1"/>', "pie-chart": '<path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>', "piggy-bank": '<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/>', "pilcrow-left": '<path d="M14 3v11"/><path d="M14 9h-3a3 3 0 0 1 0-6h9"/><path d="M18 3v11"/><path d="M22 18H2l4-4"/><path d="m6 22-4-4"/>', "pilcrow-right": '<path d="M10 3v11"/><path d="M10 9H7a1 1 0 0 1 0-6h8"/><path d="M14 3v11"/><path d="m18 14 4 4H2"/><path d="m22 18-4 4"/>', "pilcrow-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 12H9.5a2.5 2.5 0 0 1 0-5H17"/><path d="M12 7v10"/><path d="M16 7v10"/>', pilcrow: '<path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/>', "pill-bottle": '<path d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4"/><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><rect width="16" height="5" x="4" y="2" rx="1"/>', pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>', "pin-off": '<path d="M12 17v5"/><path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"/><path d="m2 2 20 20"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"/>', pin: '<path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>', pipette: '<path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12"/><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z"/><path d="m2 22 .414-.414"/>', pizza: '<path d="m12 14-1 1"/><path d="m13.75 18.25-1.25 1.42"/><path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12"/><path d="M18.8 9.3a1 1 0 0 0 2.1 7.7"/><path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z"/>', "plane-landing": '<path d="M2 22h20"/><path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"/>', "plane-takeoff": '<path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"/>', plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>', "play-circle": '<path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/><circle cx="12" cy="12" r="10"/>', "play-square": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/>', play: '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>', "plug-2": '<path d="M9 2v6"/><path d="M15 2v6"/><path d="M12 17v5"/><path d="M5 8h14"/><path d="M6 11V8h12v3a6 6 0 1 1-12 0Z"/>', "plug-zap-2": '<path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/>', "plug-zap": '<path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="m2 22 3-3"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m18 3-4 4h6l-4 4"/>', plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>', "plus-circle": '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>', "plus-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>', plus: '<path d="M5 12h14"/><path d="M12 5v14"/>', "pocket-knife": '<path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2"/><path d="M18 6h.01"/><path d="M6 18h.01"/><path d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z"/><path d="M18 11.66V22a4 4 0 0 0 4-4V6"/>', pocket: '<path d="M20 3a2 2 0 0 1 2 2v6a1 1 0 0 1-20 0V5a2 2 0 0 1 2-2z"/><path d="m8 10 4 4 4-4"/>', podcast: '<path d="M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z" fill="currentColor"/><path d="M16.85 18.58a9 9 0 1 0-9.7 0"/><path d="M8 14a5 5 0 1 1 8 0"/><circle cx="12" cy="11" r="1" fill="currentColor"/>', "pointer-off": '<path d="M10 4.5V4a2 2 0 0 0-2.41-1.957"/><path d="M13.9 8.4a2 2 0 0 0-1.26-1.295"/><path d="M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158"/><path d="m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343"/><path d="M6 6v8"/><path d="m2 2 20 20"/>', pointer: '<path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/><path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>', popcorn: '<path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"/><path d="M10 22 9 8"/><path d="m14 22 1-14"/><path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"/>', popsicle: '<path d="M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z"/><path d="m22 22-5.5-5.5"/>', "pound-sterling": '<path d="M18 7c0-5.333-8-5.333-8 0"/><path d="M10 7v14"/><path d="M6 21h12"/><path d="M6 13h10"/>', "power-circle": '<path d="M12 7v4"/><path d="M7.998 9.003a5 5 0 1 0 8-.005"/><circle cx="12" cy="12" r="10"/>', "power-off": '<path d="M18.36 6.64A9 9 0 0 1 20.77 15"/><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68"/><path d="M12 2v4"/><path d="m2 2 20 20"/>', "power-square": '<path d="M12 7v4"/><path d="M7.998 9.003a5 5 0 1 0 8-.005"/><rect x="3" y="3" width="18" height="18" rx="2"/>', power: '<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/>', presentation: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>', "printer-check": '<path d="M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5"/><path d="m16 19 2 2 4-4"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/>', printer: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>', projector: '<path d="M5 7 3 5"/><path d="M9 6V3"/><path d="m13 7 2-2"/><circle cx="9" cy="13" r="3"/><path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"/><path d="M16 16h2"/>', proportions: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M12 9v11"/><path d="M2 9h13a2 2 0 0 1 2 2v9"/>', puzzle: '<path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/>', pyramid: '<path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"/><path d="M12 2v20"/>', "qr-code": '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>', quote: '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>', rabbit: '<path d="M13 16a3 3 0 0 1 2.24 5"/><path d="M18 12h.01"/><path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"/><path d="M20 8.54V4a2 2 0 1 0-4 0v3"/><path d="M7.612 12.524a3 3 0 1 0-1.6 4.3"/>', radar: '<path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.23 16.67"/><path d="M12 18h.01"/><path d="M17.99 11.66A6 6 0 0 1 15.77 16.67"/><circle cx="12" cy="12" r="2"/><path d="m13.41 10.59 5.66-5.66"/>', radiation: '<path d="M12 12h.01"/><path d="M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z"/><path d="M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z"/><path d="M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z"/>', radical: '<path d="M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"/>', "radio-receiver": '<path d="M5 16v2"/><path d="M19 16v2"/><rect width="20" height="8" x="2" y="8" rx="2"/><path d="M18 12h.01"/>', "radio-tower": '<path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"/><path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"/><circle cx="12" cy="9" r="2"/><path d="M16.2 4.8c2 2 2.26 5.11.8 7.47"/><path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"/><path d="M9.5 18h5"/><path d="m8 22 4-11 4 11"/>', radio: '<path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"/><circle cx="12" cy="12" r="2"/>', radius: '<path d="M20.34 17.52a10 10 0 1 0-2.82 2.82"/><circle cx="19" cy="19" r="2"/><path d="m13.41 13.41 4.18 4.18"/><circle cx="12" cy="12" r="2"/>', "rail-symbol": '<path d="M5 15h14"/><path d="M5 9h14"/><path d="m14 20-5-5 6-6-5-5"/>', rainbow: '<path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/>', rat: '<path d="M13 22H4a2 2 0 0 1 0-4h12"/><path d="M13.236 18a3 3 0 0 0-2.2-5"/><path d="M16 9h.01"/><path d="M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3"/><path d="M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18"/>', ratio: '<rect width="12" height="20" x="6" y="2" rx="2"/><rect width="20" height="12" x="2" y="6" rx="2"/>', "receipt-cent": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M12 6.5v11"/><path d="M15 9.4a4 4 0 1 0 0 5.2"/>', "receipt-euro": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 12h5"/><path d="M16 9.5a4 4 0 1 0 0 5.2"/>', "receipt-indian-rupee": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M12 17.5 8 15h1a4 4 0 0 0 0-8"/><path d="M8 11h8"/>', "receipt-japanese-yen": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="m12 10 3-3"/><path d="m9 7 3 3v7.5"/><path d="M9 11h6"/><path d="M9 15h6"/>', "receipt-pound-sterling": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 13h5"/><path d="M10 17V9.5a2.5 2.5 0 0 1 5 0"/><path d="M8 17h7"/>', "receipt-russian-ruble": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 15h5"/><path d="M8 11h5a2 2 0 1 0 0-4h-3v10"/>', "receipt-swiss-franc": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M10 17V7h5"/><path d="M10 11h4"/><path d="M8 15h5"/>', "receipt-text": '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>', "receipt-turkish-lira": '<path d="M10 6.5v11a5.5 5.5 0 0 0 5.5-5.5"/><path d="m14 8-6 3"/><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/>', receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>', "rectangle-circle": '<path d="M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><circle cx="14" cy="12" r="8"/>', "rectangle-ellipsis": '<rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/>', "rectangle-goggles": '<path d="M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>', "rectangle-horizontal": '<rect width="20" height="12" x="2" y="6" rx="2"/>', "rectangle-vertical": '<rect width="12" height="20" x="6" y="2" rx="2"/>', recycle: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>', "redo-2": '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/>', "redo-dot": '<circle cx="12" cy="17" r="1"/><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>', redo: '<path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>', "refresh-ccw-dot": '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/><circle cx="12" cy="12" r="1"/>', "refresh-ccw": '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>', "refresh-cw-off": '<path d="M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47"/><path d="M8 16H3v5"/><path d="M3 12C3 9.51 4 7.26 5.64 5.64"/><path d="m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64"/><path d="M21 12c0 1-.16 1.97-.47 2.87"/><path d="M21 3v5h-5"/><path d="M22 22 2 2"/>', "refresh-cw": '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>', refrigerator: '<path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/><path d="M5 10h14"/><path d="M15 7v6"/>', regex: '<path d="M17 3v10"/><path d="m12.67 5.5 8.66 5"/><path d="m12.67 10.5 8.66-5"/><path d="M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"/>', "remove-formatting": '<path d="M4 7V4h16v3"/><path d="M5 20h6"/><path d="M13 4 8 20"/><path d="m15 15 5 5"/><path d="m20 15-5 5"/>', "repeat-1": '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h1v4"/>', "repeat-2": '<path d="m2 9 3-3 3 3"/><path d="M13 18H7a2 2 0 0 1-2-2V6"/><path d="m22 15-3 3-3-3"/><path d="M11 6h6a2 2 0 0 1 2 2v10"/>', repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>', "replace-all": '<path d="M14 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/><path d="M14 4a2 2 0 0 1 2-2"/><path d="M16 10a2 2 0 0 1-2-2"/><path d="M20 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"/><path d="M20 2a2 2 0 0 1 2 2"/><path d="M22 8a2 2 0 0 1-2 2"/><path d="m3 7 3 3 3-3"/><path d="M6 10V5a 3 3 0 0 1 3-3h1"/><rect x="2" y="14" width="8" height="8" rx="2"/>', replace: '<path d="M14 4a2 2 0 0 1 2-2"/><path d="M16 10a2 2 0 0 1-2-2"/><path d="M20 2a2 2 0 0 1 2 2"/><path d="M22 8a2 2 0 0 1-2 2"/><path d="m3 7 3 3 3-3"/><path d="M6 10V5a3 3 0 0 1 3-3h1"/><rect x="2" y="14" width="8" height="8" rx="2"/>', "reply-all": '<path d="m12 17-5-5 5-5"/><path d="M22 18v-2a4 4 0 0 0-4-4H7"/><path d="m7 17-5-5 5-5"/>', reply: '<path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/>', rewind: '<path d="M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z"/><path d="M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z"/>', ribbon: '<path d="M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22"/><path d="m12 18 2.57-3.5"/><path d="M6.243 9.016a7 7 0 0 1 11.507-.009"/><path d="M9.35 14.53 12 11.22"/><path d="M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z"/>', rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>', "rocking-chair": '<polyline points="3.5 2 6.5 12.5 18 12.5"/><line x1="9.5" x2="5.5" y1="12.5" y2="20"/><line x1="15" x2="18.5" y1="12.5" y2="20"/><path d="M2.75 18a13 13 0 0 0 18.5 0"/>', "roller-coaster": '<path d="M6 19V5"/><path d="M10 19V6.8"/><path d="M14 19v-7.8"/><path d="M18 5v4"/><path d="M18 19v-6"/><path d="M22 19V9"/><path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"/>', rose: '<path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/>', "rotate-3-d": '<path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"/><path d="m15.194 13.707 3.814 1.86-1.86 3.814"/><path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"/>', "rotate-3d": '<path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"/><path d="m15.194 13.707 3.814 1.86-1.86 3.814"/><path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"/>', "rotate-ccw-key": '<path d="m14.5 9.5 1 1"/><path d="m15.5 8.5-4 4"/><path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><circle cx="10" cy="14" r="2"/>', "rotate-ccw-square": '<path d="M20 9V7a2 2 0 0 0-2-2h-6"/><path d="m15 2-3 3 3 3"/><path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/>', "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>', "rotate-cw-square": '<path d="M12 5H6a2 2 0 0 0-2 2v3"/><path d="m9 8 3-3-3-3"/><path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>', "rotate-cw": '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>', "route-off": '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5c.4 0 .9-.1 1.3-.2"/><path d="M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12"/><path d="m2 2 20 20"/><path d="M21 15.3a3.5 3.5 0 0 0-3.3-3.3"/><path d="M15 5h-4.3"/><circle cx="18" cy="5" r="3"/>', route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>', router: '<rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6.01 18H6"/><path d="M10.01 18H10"/><path d="M15 10v4"/><path d="M17.84 7.17a4 4 0 0 0-5.66 0"/><path d="M20.66 4.34a8 8 0 0 0-11.31 0"/>', "rows-2": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/>', "rows-3": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H3"/><path d="M21 15H3"/>', "rows-4": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 7.5H3"/><path d="M21 12H3"/><path d="M21 16.5H3"/>', rows: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/>', rss: '<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>', "ruler-dimension-line": '<path d="M12 15v-3.014"/><path d="M16 15v-3.014"/><path d="M20 6H4"/><path d="M20 8V4"/><path d="M4 8V4"/><path d="M8 15v-3.014"/><rect x="3" y="12" width="18" height="7" rx="1"/>', ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>', "russian-ruble": '<path d="M6 11h8a4 4 0 0 0 0-8H9v18"/><path d="M6 15h8"/>', sailboat: '<path d="M10 2v15"/><path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z"/><path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z"/>', salad: '<path d="M7 21h10"/><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"/><path d="m13 12 4-4"/><path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2"/>', sandwich: '<path d="m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777"/><path d="M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25"/><path d="M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9"/><path d="m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"/><rect width="20" height="4" x="2" y="11" rx="1"/>', "satellite-dish": '<path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3"/><path d="M17 13a6 6 0 0 0-6-6"/><path d="M21 13A10 10 0 0 0 11 3"/>', satellite: '<path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"/><path d="M16.5 7.5 19 5"/><path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"/><path d="M9 21a6 6 0 0 0-6-6"/><path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"/>', "saudi-riyal": '<path d="m20 19.5-5.5 1.2"/><path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2"/><path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2"/><path d="M20 10 4 13.5"/>', "save-all": '<path d="M10 2v3a1 1 0 0 0 1 1h5"/><path d="M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6"/><path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"/>', "save-off": '<path d="M13 13H8a1 1 0 0 0-1 1v7"/><path d="M14 8h1"/><path d="M17 21v-4"/><path d="m2 2 20 20"/><path d="M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41"/><path d="M29.5 11.5s5 5 4 5"/><path d="M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15"/>', save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>', "scale-3-d": '<path d="M5 7v11a1 1 0 0 0 1 1h11"/><path d="M5.293 18.707 11 13"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="5" r="2"/>', "scale-3d": '<path d="M5 7v11a1 1 0 0 0 1 1h11"/><path d="M5.293 18.707 11 13"/><circle cx="19" cy="19" r="2"/><circle cx="5" cy="5" r="2"/>', scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>', scaling: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M14 15H9v-5"/><path d="M16 3h5v5"/><path d="M21 3 9 15"/>', "scan-barcode": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M17 7v10"/>', "scan-eye": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="1"/><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>', "scan-face": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>', "scan-heart": '<path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z"/>', "scan-line": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>', "scan-qr-code": '<path d="M17 12v4a1 1 0 0 1-1 1h-4"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M17 8V7"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M7 17h.01"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="5" height="5" rx="1"/>', "scan-search": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.9-1.9"/>', "scan-text": '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h8"/><path d="M7 12h10"/><path d="M7 16h6"/>', scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>', "scatter-chart": '<circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="18.5" cy="5.5" r=".5" fill="currentColor"/><circle cx="11.5" cy="11.5" r=".5" fill="currentColor"/><circle cx="7.5" cy="16.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="14.5" r=".5" fill="currentColor"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/>', "school-2": '<path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 12h.01"/><path d="M18 16h.01"/><path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/><path d="M6 12h.01"/><path d="M6 16h.01"/><circle cx="12" cy="10" r="2"/>', school: '<path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 5v16"/><path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"/><path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"/><path d="M6 5v16"/><circle cx="12" cy="9" r="2"/>', "scissors-line-dashed": '<path d="M5.42 9.42 8 12"/><circle cx="4" cy="8" r="2"/><path d="m14 6-8.58 8.58"/><circle cx="4" cy="16" r="2"/><path d="M10.8 14.8 14 18"/><path d="M16 12h-2"/><path d="M22 12h-2"/>', "scissors-square-dashed-bottom": '<path d="M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2"/><path d="M10 22H8"/><path d="M16 22h-2"/><circle cx="8" cy="8" r="2"/><path d="M9.414 9.414 12 12"/><path d="M14.8 14.8 18 18"/><circle cx="8" cy="16" r="2"/><path d="m18 6-8.586 8.586"/>', "scissors-square": '<rect width="20" height="20" x="2" y="2" rx="2"/><circle cx="8" cy="8" r="2"/><path d="M9.414 9.414 12 12"/><path d="M14.8 14.8 18 18"/><circle cx="8" cy="16" r="2"/><path d="m18 6-8.586 8.586"/>', scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>', "screen-share-off": '<path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m22 3-5 5"/><path d="m17 3 5 5"/>', "screen-share": '<path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m17 8 5-5"/><path d="M17 3h5v5"/>', "scroll-text": '<path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>', scroll: '<path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>', "search-check": '<path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', "search-code": '<path d="m13 13.5 2-2.5-2-2.5"/><path d="m21 21-4.3-4.3"/><path d="M9 8.5 7 11l2 2.5"/><circle cx="11" cy="11" r="8"/>', "search-slash": '<path d="m13.5 8.5-5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', "search-x": '<path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', search: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>', section: '<path d="M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0"/><path d="M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0"/>', "send-horizonal": '<path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/>', "send-horizontal": '<path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/>', "send-to-back": '<rect x="14" y="14" width="8" height="8" rx="2"/><rect x="2" y="2" width="8" height="8" rx="2"/><path d="M7 14v1a2 2 0 0 0 2 2h1"/><path d="M14 7h1a2 2 0 0 1 2 2v1"/>', send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>', "separator-horizontal": '<path d="m16 16-4 4-4-4"/><path d="M3 12h18"/><path d="m8 8 4-4 4 4"/>', "separator-vertical": '<path d="M12 3v18"/><path d="m16 16 4-4-4-4"/><path d="m8 8-4 4 4 4"/>', "server-cog": '<path d="m10.852 14.772-.383.923"/><path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923"/><path d="m13.148 9.228.383-.923"/><path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544"/><path d="m14.772 10.852.923-.383"/><path d="m14.772 13.148.923.383"/><path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"/><path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"/><path d="M6 18h.01"/><path d="M6 6h.01"/><path d="m9.228 10.852-.923-.383"/><path d="m9.228 13.148-.923.383"/>', "server-crash": '<path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><path d="M6 6h.01"/><path d="M6 18h.01"/><path d="m13 6-4 6h6l-4 6"/>', "server-off": '<path d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5"/><path d="M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z"/><path d="M22 17v-1a2 2 0 0 0-2-2h-1"/><path d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z"/><path d="M6 18h.01"/><path d="m2 2 20 20"/>', server: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>', "settings-2": '<path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>', settings: '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>', shapes: '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>', "share-2": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>', share: '<path d="M12 2v13"/><path d="m16 6-4-4-4 4"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>', sheet: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="9" y2="21"/><line x1="15" x2="15" y1="9" y2="21"/>', shell: '<path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"/>', "shield-alert": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>', "shield-ban": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m4.243 5.21 14.39 12.472"/>', "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>', "shield-close": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/>', "shield-ellipsis": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/>', "shield-half": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 22V2"/>', "shield-minus": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9 12h6"/>', "shield-off": '<path d="m2 2 20 20"/><path d="M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"/><path d="M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"/>', "shield-plus": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9 12h6"/><path d="M12 9v6"/>', "shield-question-mark": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', "shield-question": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>', "shield-user": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M6.376 18.91a6 6 0 0 1 11.249.003"/><circle cx="12" cy="11" r="4"/>', "shield-x": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/>', shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>', "ship-wheel": '<circle cx="12" cy="12" r="8"/><path d="M12 2v7.5"/><path d="m19 5-5.23 5.23"/><path d="M22 12h-7.5"/><path d="m19 19-5.23-5.23"/><path d="M12 14.5V22"/><path d="M10.23 13.77 5 19"/><path d="M9.5 12H2"/><path d="M10.23 10.23 5 5"/><circle cx="12" cy="12" r="2.5"/>', ship: '<path d="M12 10.189V14"/><path d="M12 2v3"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"/><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>', shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>', "shopping-bag": '<path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>', "shopping-basket": '<path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>', "shopping-cart": '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>', shovel: '<path d="M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z"/><path d="M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z"/><path d="m9 15 7.879-7.878"/>', "shower-head": '<path d="m4 4 2.5 2.5"/><path d="M13.5 6.5a4.95 4.95 0 0 0-7 7"/><path d="M15 5 5 15"/><path d="M14 17v.01"/><path d="M10 16v.01"/><path d="M13 13v.01"/><path d="M16 10v.01"/><path d="M11 20v.01"/><path d="M17 14v.01"/><path d="M20 11v.01"/>', shredder: '<path d="M10 22v-5"/><path d="M14 19v-2"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M18 20v-3"/><path d="M2 13h20"/><path d="M20 13V7l-5-5H6a2 2 0 0 0-2 2v9"/><path d="M6 20v-3"/>', shrimp: '<path d="M11 12h.01"/><path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1"/><path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8"/><path d="M14 8a8.5 8.5 0 0 1 0 8"/><path d="M16 16c2 0 4.5-4 4-6"/>', shrink: '<path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"/><path d="M9 19.8V15m0 0H4.2M9 15l-6 6"/><path d="M15 4.2V9m0 0h4.8M15 9l6-6"/><path d="M9 4.2V9m0 0H4.2M9 9 3 3"/>', shrub: '<path d="M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5"/><path d="M14.5 14.5 12 17"/><path d="M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z"/>', shuffle: '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/>', "sidebar-close": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/>', "sidebar-open": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/>', sidebar: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>', "sigma-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M16 8.9V7H8l4 5-4 5h8v-1.9"/>', sigma: '<path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"/>', "signal-high": '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/>', "signal-low": '<path d="M2 20h.01"/><path d="M7 20v-4"/>', "signal-medium": '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/>', "signal-zero": '<path d="M2 20h.01"/>', signal: '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>', signature: '<path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"/><path d="M3 21h18"/>', "signpost-big": '<path d="M10 9H4L2 7l2-2h6"/><path d="M14 5h6l2 2-2 2h-6"/><path d="M10 22V4a2 2 0 1 1 4 0v18"/><path d="M8 22h8"/>', signpost: '<path d="M12 13v8"/><path d="M12 3v3"/><path d="M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z"/>', siren: '<path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/>', "skip-back": '<path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/>', "skip-forward": '<path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/>', skull: '<path d="m12.5 17-.5-1-.5 1h1z"/><path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="12" r="1"/>', slack: '<rect width="3" height="8" x="13" y="2" rx="1.5"/><path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5"/><rect width="3" height="8" x="8" y="14" rx="1.5"/><path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5"/><rect width="8" height="3" x="14" y="13" rx="1.5"/><path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5"/><rect width="8" height="3" x="2" y="8" rx="1.5"/><path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5"/>', "slash-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><line x1="9" x2="15" y1="15" y2="9"/>', slash: '<path d="M22 2 2 22"/>', slice: '<path d="M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14"/>', "sliders-horizontal": '<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>', "sliders-vertical": '<path d="M10 8h4"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M17 16h4"/><path d="M19 12V3"/><path d="M19 21v-5"/><path d="M3 14h4"/><path d="M5 10V3"/><path d="M5 21v-7"/>', sliders: '<path d="M10 8h4"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M17 16h4"/><path d="M19 12V3"/><path d="M19 21v-5"/><path d="M3 14h4"/><path d="M5 10V3"/><path d="M5 21v-7"/>', "smartphone-charging": '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12.667 8 10 12h4l-2.667 4"/>', "smartphone-nfc": '<rect width="7" height="12" x="2" y="6" rx="1"/><path d="M13 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"/>', smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>', "smile-plus": '<path d="M22 11v1a10 10 0 1 1-9-10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/><path d="M16 5h6"/><path d="M19 2v6"/>', smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>', snail: '<path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"/><circle cx="10" cy="13" r="8"/><path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"/><path d="M18 3 19.1 5.2"/><path d="M22 3 20.9 5.2"/>', snowflake: '<path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/>', "soap-dispenser-droplet": '<path d="M10.5 2v4"/><path d="M14 2H7a2 2 0 0 0-2 2"/><path d="M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19"/><path d="M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>', sofa: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 4v9"/>', "sort-asc": '<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/>', "sort-desc": '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/>', soup: '<path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M7 21h10"/><path d="M19.5 12 22 6"/><path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/><path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/><path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/>', space: '<path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"/>', spade: '<path d="M12 18v4"/><path d="M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5"/>', sparkle: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>', sparkles: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>', speaker: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M12 6h.01"/><circle cx="12" cy="14" r="4"/><path d="M12 14h.01"/>', speech: '<path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/><path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/>', "spell-check-2": '<path d="m6 16 6-12 6 12"/><path d="M8 12h8"/><path d="M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"/>', "spell-check": '<path d="m6 16 6-12 6 12"/><path d="M8 12h8"/><path d="m16 20 2 2 4-4"/>', "spline-pointer": '<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M5 17A12 12 0 0 1 17 5"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/>', spline: '<circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M5 17A12 12 0 0 1 17 5"/>', "split-square-horizontal": '<path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3"/><path d="M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3"/><line x1="12" x2="12" y1="4" y2="20"/>', "split-square-vertical": '<path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3"/><path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3"/><line x1="4" x2="20" y1="12" y2="12"/>', split: '<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"/><path d="m15 9 6-6"/>', spool: '<path d="M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66"/><path d="m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178"/>', spotlight: '<path d="M15.295 19.562 16 22"/><path d="m17 16 3.758 2.098"/><path d="m19 12.5 3.026-.598"/><path d="M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z"/><path d="M8 9V2"/>', "spray-can": '<path d="M3 3h.01"/><path d="M7 5h.01"/><path d="M11 7h.01"/><path d="M3 7h.01"/><path d="M7 9h.01"/><path d="M3 11h.01"/><rect width="4" height="4" x="15" y="5"/><path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"/><path d="m13 14 8-2"/><path d="m13 19 8-2"/>', sprout: '<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/>', "square-activity": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M17 12h-2l-2 5-2-10-2 5H7"/>', "square-arrow-down-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 8-8 8"/><path d="M16 16H8V8"/>', "square-arrow-down-right": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m8 8 8 8"/><path d="M16 8v8H8"/>', "square-arrow-down": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/>', "square-arrow-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m12 8-4 4 4 4"/><path d="M16 12H8"/>', "square-arrow-out-down-left": '<path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"/><path d="m3 21 9-9"/><path d="M9 21H3v-6"/>', "square-arrow-out-down-right": '<path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="m21 21-9-9"/><path d="M21 15v6h-6"/>', "square-arrow-out-up-left": '<path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"/><path d="m3 3 9 9"/><path d="M3 9V3h6"/>', "square-arrow-out-up-right": '<path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/>', "square-arrow-right": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="m12 16 4-4-4-4"/>', "square-arrow-up-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 16V8h8"/><path d="M16 16 8 8"/>', "square-arrow-up-right": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 8h8v8"/><path d="m8 16 8-8"/>', "square-arrow-up": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>', "square-asterisk": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8.5 14 7-4"/><path d="m8.5 10 7 4"/>', "square-bottom-dashed-scissors": '<path d="M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2"/><path d="M10 22H8"/><path d="M16 22h-2"/><circle cx="8" cy="8" r="2"/><path d="M9.414 9.414 12 12"/><path d="M14.8 14.8 18 18"/><circle cx="8" cy="16" r="2"/><path d="m18 6-8.586 8.586"/>', "square-chart-gantt": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 8h7"/><path d="M8 12h6"/><path d="M11 16h5"/>', "square-check-big": '<path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/>', "square-check": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/>', "square-chevron-down": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 10-4 4-4-4"/>', "square-chevron-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m14 16-4-4 4-4"/>', "square-chevron-right": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m10 8 4 4-4 4"/>', "square-chevron-up": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m8 14 4-4 4 4"/>', "square-code": '<path d="m10 9-3 3 3 3"/><path d="m14 15 3-3-3-3"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "square-dashed-bottom-code": '<path d="M10 9.5 8 12l2 2.5"/><path d="M14 21h1"/><path d="m14 9.5 2 2.5-2 2.5"/><path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"/><path d="M9 21h1"/>', "square-dashed-bottom": '<path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"/><path d="M9 21h1"/><path d="M14 21h1"/>', "square-dashed-kanban": '<path d="M8 7v7"/><path d="M12 7v4"/><path d="M16 7v9"/><path d="M5 3a2 2 0 0 0-2 2"/><path d="M9 3h1"/><path d="M14 3h1"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 9v1"/><path d="M21 14v1"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M14 21h1"/><path d="M9 21h1"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M3 14v1"/><path d="M3 9v1"/>', "square-dashed-mouse-pointer": '<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h2"/><path d="M14 3h1"/><path d="M3 9v1"/><path d="M21 9v2"/><path d="M3 14v1"/>', "square-dashed-top-solid": '<path d="M14 21h1"/><path d="M21 14v1"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"/><path d="M3 9v1"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 21h1"/>', "square-dashed": '<path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/>', "square-divide": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="12" x2="12" y1="16" y2="16"/><line x1="12" x2="12" y1="8" y2="8"/>', "square-dot": '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="1"/>', "square-equal": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 10h10"/><path d="M7 14h10"/>', "square-function": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"/><path d="M9 11.2h5.7"/>', "square-gantt-chart": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 8h7"/><path d="M8 12h6"/><path d="M11 16h5"/>', "square-kanban": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 7v7"/><path d="M12 7v4"/><path d="M16 7v9"/>', "square-library": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7v10"/><path d="M11 7v10"/><path d="m15 7 2 10"/>', "square-m": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 16V8l4 4 4-4v8"/>', "square-menu": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/>', "square-minus": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/>', "square-mouse-pointer": '<path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>', "square-parking-off": '<path d="M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41"/><path d="M3 8.7V19a2 2 0 0 0 2 2h10.3"/><path d="m2 2 20 20"/><path d="M13 13a3 3 0 1 0 0-6H9v2"/><path d="M9 17v-2.3"/>', "square-parking": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>', "square-pause": '<rect width="18" height="18" x="3" y="3" rx="2"/><line x1="10" x2="10" y1="15" y2="9"/><line x1="14" x2="14" y1="15" y2="9"/>', "square-pen": '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>', "square-percent": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/>', "square-pi": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M10 7v10"/><path d="M16 17a2 2 0 0 1-2-2V7"/>', "square-pilcrow": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 12H9.5a2.5 2.5 0 0 1 0-5H17"/><path d="M12 7v10"/><path d="M16 7v10"/>', "square-play": '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"/>', "square-plus": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/>', "square-power": '<path d="M12 7v4"/><path d="M7.998 9.003a5 5 0 1 0 8-.005"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "square-radical": '<path d="M7 12h2l2 5 2-10h4"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "square-round-corner": '<path d="M21 11a8 8 0 0 0-8-8"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>', "square-scissors": '<rect width="20" height="20" x="2" y="2" rx="2"/><circle cx="8" cy="8" r="2"/><path d="M9.414 9.414 12 12"/><path d="M14.8 14.8 18 18"/><circle cx="8" cy="16" r="2"/><path d="m18 6-8.586 8.586"/>', "square-sigma": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M16 8.9V7H8l4 5-4 5h8v-1.9"/>', "square-slash": '<rect width="18" height="18" x="3" y="3" rx="2"/><line x1="9" x2="15" y1="15" y2="9"/>', "square-split-horizontal": '<path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3"/><path d="M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3"/><line x1="12" x2="12" y1="4" y2="20"/>', "square-split-vertical": '<path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3"/><path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3"/><line x1="4" x2="20" y1="12" y2="12"/>', "square-square": '<rect x="3" y="3" width="18" height="18" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/>', "square-stack": '<path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"/><rect width="8" height="8" x="14" y="14" rx="2"/>', "square-star": '<path d="M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><rect x="3" y="3" width="18" height="18" rx="2"/>', "square-stop": '<rect width="18" height="18" x="3" y="3" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/>', "square-terminal": '<path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>', "square-user-round": '<path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="18" height="18" x="3" y="3" rx="2"/>', "square-user": '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>', "square-x": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>', square: '<rect width="18" height="18" x="3" y="3" rx="2"/>', "squares-exclude": '<path d="M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2"/>', "squares-intersect": '<path d="M10 22a2 2 0 0 1-2-2"/><path d="M14 2a2 2 0 0 1 2 2"/><path d="M16 22h-2"/><path d="M2 10V8"/><path d="M2 4a2 2 0 0 1 2-2"/><path d="M20 8a2 2 0 0 1 2 2"/><path d="M22 14v2"/><path d="M22 20a2 2 0 0 1-2 2"/><path d="M4 16a2 2 0 0 1-2-2"/><path d="M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z"/><path d="M8 2h2"/>', "squares-subtract": '<path d="M10 22a2 2 0 0 1-2-2"/><path d="M16 22h-2"/><path d="M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z"/><path d="M20 8a2 2 0 0 1 2 2"/><path d="M22 14v2"/><path d="M22 20a2 2 0 0 1-2 2"/>', "squares-unite": '<path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z"/>', "squircle-dashed": '<path d="M13.77 3.043a34 34 0 0 0-3.54 0"/><path d="M13.771 20.956a33 33 0 0 1-3.541.001"/><path d="M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44"/><path d="M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438"/><path d="M20.957 10.23a33 33 0 0 1 0 3.54"/><path d="M3.043 10.23a34 34 0 0 0 .001 3.541"/><path d="M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438"/><path d="M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44"/>', squircle: '<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/>', squirrel: '<path d="M15.236 22a3 3 0 0 0-2.2-5"/><path d="M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4"/><path d="M18 13h.01"/><path d="M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"/>', stamp: '<path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"/><path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"/><path d="M5 22h14"/>', "star-half": '<path d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"/>', "star-off": '<path d="M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43"/><path d="M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91"/><line x1="2" x2="22" y1="2" y2="22"/>', star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>', stars: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>', "step-back": '<path d="M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M21 20V4"/>', "step-forward": '<path d="M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/><path d="M3 4v16"/>', stethoscope: '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>', sticker: '<path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M14 3v4a2 2 0 0 0 2 2h4"/><path d="M8 13h.01"/><path d="M16 13h.01"/><path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/>', "sticky-note": '<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/>', "stop-circle": '<circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="6" height="6" rx="1"/>', store: '<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>', "stretch-horizontal": '<rect width="20" height="6" x="2" y="4" rx="2"/><rect width="20" height="6" x="2" y="14" rx="2"/>', "stretch-vertical": '<rect width="6" height="20" x="4" y="2" rx="2"/><rect width="6" height="20" x="14" y="2" rx="2"/>', strikethrough: '<path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/>', subscript: '<path d="m4 5 8 8"/><path d="m12 5-8 8"/><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/>', subtitles: '<rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>', "sun-dim": '<circle cx="12" cy="12" r="4"/><path d="M12 4h.01"/><path d="M20 12h.01"/><path d="M12 20h.01"/><path d="M4 12h.01"/><path d="M17.657 6.343h.01"/><path d="M17.657 17.657h.01"/><path d="M6.343 17.657h.01"/><path d="M6.343 6.343h.01"/>', "sun-medium": '<circle cx="12" cy="12" r="4"/><path d="M12 3v1"/><path d="M12 20v1"/><path d="M3 12h1"/><path d="M20 12h1"/><path d="m18.364 5.636-.707.707"/><path d="m6.343 17.657-.707.707"/><path d="m5.636 5.636.707.707"/><path d="m17.657 17.657.707.707"/>', "sun-moon": '<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>', "sun-snow": '<path d="M10 21v-1"/><path d="M10 4V3"/><path d="M10 9a3 3 0 0 0 0 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6 1.5-3H22"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h1"/><path d="m20 10-1.5 2 1.5 2"/><path d="m3.64 18.36.7-.7"/><path d="m4.34 6.34-.7-.7"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>', sunrise: '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>', sunset: '<path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/>', superscript: '<path d="m4 19 8-8"/><path d="m12 19-8-8"/><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/>', "swatch-book": '<path d="M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"/><path d="M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"/><path d="M 7 17h.01"/><path d="m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"/>', "swiss-franc": '<path d="M10 21V3h8"/><path d="M6 16h9"/><path d="M10 9.5h7"/>', "switch-camera": '<path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/><path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"/><circle cx="12" cy="12" r="3"/><path d="m18 22-3-3 3-3"/><path d="m6 2 3 3-3 3"/>', sword: '<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/>', swords: '<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>', syringe: '<path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/>', "table-2": '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>', "table-cells-merge": '<path d="M12 21v-6"/><path d="M12 9V3"/><path d="M3 15h18"/><path d="M3 9h18"/><rect width="18" height="18" x="3" y="3" rx="2"/>', "table-cells-split": '<path d="M12 15V9"/><path d="M3 15h18"/><path d="M3 9h18"/><rect width="18" height="18" x="3" y="3" rx="2"/>', "table-columns-split": '<path d="M14 14v2"/><path d="M14 20v2"/><path d="M14 2v2"/><path d="M14 8v2"/><path d="M2 15h8"/><path d="M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"/><path d="M2 9h8"/><path d="M22 15h-4"/><path d="M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"/><path d="M22 9h-4"/><path d="M5 3v18"/>', "table-config": '<path d="M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/><path d="m14.3 19.6 1-.4"/><path d="M15 3v7.5"/><path d="m15.2 16.9-.9-.3"/><path d="m16.6 21.7.3-.9"/><path d="m16.8 15.3-.4-1"/><path d="m19.1 15.2.3-.9"/><path d="m19.6 21.7-.4-1"/><path d="m20.7 16.8 1-.4"/><path d="m21.7 19.4-.9-.3"/><path d="M9 3v18"/><circle cx="18" cy="18" r="3"/>', "table-of-contents": '<path d="M16 5H3"/><path d="M16 12H3"/><path d="M16 19H3"/><path d="M21 5h.01"/><path d="M21 12h.01"/><path d="M21 19h.01"/>', "table-properties": '<path d="M15 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H3"/><path d="M21 15H3"/>', "table-rows-split": '<path d="M14 10h2"/><path d="M15 22v-8"/><path d="M15 2v4"/><path d="M2 10h2"/><path d="M20 10h2"/><path d="M3 19h18"/><path d="M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6"/><path d="M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2"/><path d="M8 10h2"/><path d="M9 22v-8"/><path d="M9 2v4"/>', table: '<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>', "tablet-smartphone": '<rect width="10" height="14" x="3" y="8" rx="2"/><path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"/><path d="M8 18h.01"/>', tablet: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>', tablets: '<circle cx="7" cy="7" r="5"/><circle cx="17" cy="17" r="5"/><path d="M12 17h10"/><path d="m3.46 10.54 7.08-7.08"/>', tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>', tags: '<path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"/><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"/><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"/>', "tally-1": '<path d="M4 4v16"/>', "tally-2": '<path d="M4 4v16"/><path d="M9 4v16"/>', "tally-3": '<path d="M4 4v16"/><path d="M9 4v16"/><path d="M14 4v16"/>', "tally-4": '<path d="M4 4v16"/><path d="M9 4v16"/><path d="M14 4v16"/><path d="M19 4v16"/>', "tally-5": '<path d="M4 4v16"/><path d="M9 4v16"/><path d="M14 4v16"/><path d="M19 4v16"/><path d="M22 6 2 18"/>', tangent: '<circle cx="17" cy="4" r="2"/><path d="M15.59 5.41 5.41 15.59"/><circle cx="4" cy="17" r="2"/><path d="M12 22s-4-9-1.5-11.5S22 12 22 12"/>', target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', telescope: '<path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/><path d="m13.56 11.747 4.332-.924"/><path d="m16 21-3.105-6.21"/><path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"/><path d="m6.158 8.633 1.114 4.456"/><path d="m8 21 3.105-6.21"/><circle cx="12" cy="13" r="2"/>', "tent-tree": '<circle cx="4" cy="4" r="2"/><path d="m14 5 3-3 3 3"/><path d="m14 10 3-3 3 3"/><path d="M17 14V2"/><path d="M17 14H7l-5 8h20Z"/><path d="M8 14v8"/><path d="m9 14 5 8"/>', tent: '<path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/>', "terminal-square": '<path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>', terminal: '<path d="M12 19h8"/><path d="m4 17 6-6-6-6"/>', "test-tube-2": '<path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3"/><path d="m16 2 6 6"/><path d="M12 16H4"/>', "test-tube-diagonal": '<path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3"/><path d="m16 2 6 6"/><path d="M12 16H4"/>', "test-tube": '<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>', "test-tubes": '<path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2"/><path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2"/><path d="M3 2h7"/><path d="M14 2h7"/><path d="M9 16H4"/><path d="M20 16h-5"/>', "text-align-center": '<path d="M21 5H3"/><path d="M17 12H7"/><path d="M19 19H5"/>', "text-align-end": '<path d="M21 5H3"/><path d="M21 12H9"/><path d="M21 19H7"/>', "text-align-justify": '<path d="M3 5h18"/><path d="M3 12h18"/><path d="M3 19h18"/>', "text-align-start": '<path d="M21 5H3"/><path d="M15 12H3"/><path d="M17 19H3"/>', "text-cursor-input": '<path d="M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6"/><path d="M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"/><path d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"/><path d="M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1"/><path d="M9 6v12"/>', "text-cursor": '<path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"/><path d="M7 22h1a4 4 0 0 0 4-4v-1"/><path d="M7 2h1a4 4 0 0 1 4 4v1"/>', "text-initial": '<path d="M15 5h6"/><path d="M15 12h6"/><path d="M3 19h18"/><path d="m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12"/><path d="M3.92 10h6.16"/>', "text-quote": '<path d="M17 5H3"/><path d="M21 12H8"/><path d="M21 19H8"/><path d="M3 12v7"/>', "text-search": '<path d="M21 5H3"/><path d="M10 12H3"/><path d="M10 19H3"/><circle cx="17" cy="15" r="3"/><path d="m21 19-1.9-1.9"/>', "text-select": '<path d="M14 21h1"/><path d="M14 3h1"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 14v1"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M3 9v1"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M5 3a2 2 0 0 0-2 2"/><path d="M7 12h10"/><path d="M7 16h6"/><path d="M7 8h8"/><path d="M9 21h1"/><path d="M9 3h1"/>', "text-selection": '<path d="M14 21h1"/><path d="M14 3h1"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 14v1"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M3 9v1"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M5 3a2 2 0 0 0-2 2"/><path d="M7 12h10"/><path d="M7 16h6"/><path d="M7 8h8"/><path d="M9 21h1"/><path d="M9 3h1"/>', "text-wrap": '<path d="m16 16-3 3 3 3"/><path d="M3 12h14.5a1 1 0 0 1 0 7H13"/><path d="M3 19h6"/><path d="M3 5h18"/>', text: '<path d="M21 5H3"/><path d="M15 12H3"/><path d="M17 19H3"/>', theater: '<path d="M2 10s3-3 3-8"/><path d="M22 10s-3-3-3-8"/><path d="M10 2c0 4.4-3.6 8-8 8"/><path d="M14 2c0 4.4 3.6 8 8 8"/><path d="M2 10s2 2 2 5"/><path d="M22 10s-2 2-2 5"/><path d="M8 15h8"/><path d="M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/>', "thermometer-snowflake": '<path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="M10.585 15H10"/><path d="M2 12h6.5L10 9"/><path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h2"/>', "thermometer-sun": '<path d="M12 9a4 4 0 0 0-2 7.5"/><path d="M12 3v2"/><path d="m6.6 18.4-1.4 1.4"/><path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M4 13H2"/><path d="M6.34 7.34 4.93 5.93"/>', thermometer: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>', "thumbs-down": '<path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>', "thumbs-up": '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>', "ticket-check": '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="m9 12 2 2 4-4"/>', "ticket-minus": '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 12h6"/>', "ticket-percent": '<path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 9h.01"/><path d="m15 9-6 6"/><path d="M15 15h.01"/>', "ticket-plus": '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 12h6"/><path d="M12 9v6"/>', "ticket-slash": '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="m9.5 14.5 5-5"/>', "ticket-x": '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="m9.5 14.5 5-5"/><path d="m9.5 9.5 5 5"/>', ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>', "tickets-plane": '<path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/><path d="m12 13.5 3.75.5"/><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/>', tickets: '<path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/>', "timer-off": '<path d="M10 2h4"/><path d="M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7"/><path d="M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2"/><path d="m2 2 20 20"/><path d="M12 12v-2"/>', "timer-reset": '<path d="M10 2h4"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"/><path d="M9 17H4v5"/>', timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>', "toggle-left": '<circle cx="9" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>', "toggle-right": '<circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/>', toilet: '<path d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"/><path d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>', "tool-case": '<path d="M10 15h4"/><path d="m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27"/><path d="m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122"/><path d="M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>', tornado: '<path d="M21 4H3"/><path d="M18 8H6"/><path d="M19 12H9"/><path d="M16 16h-6"/><path d="M11 20H9"/>', torus: '<ellipse cx="12" cy="11" rx="3" ry="2"/><ellipse cx="12" cy="12.5" rx="10" ry="8.5"/>', "touchpad-off": '<path d="M12 20v-6"/><path d="M19.656 14H22"/><path d="M2 14h12"/><path d="m2 2 20 20"/><path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"/><path d="M9.656 4H20a2 2 0 0 1 2 2v10.344"/>', touchpad: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M2 14h20"/><path d="M12 20v-6"/>', "tower-control": '<path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z"/><path d="M8 13v9"/><path d="M16 22v-9"/><path d="m9 6 1 7"/><path d="m15 6-1 7"/><path d="M12 6V2"/><path d="M13 2h-2"/>', "toy-brick": '<rect width="18" height="12" x="3" y="8" rx="1"/><path d="M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3"/><path d="M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3"/>', tractor: '<path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20"/><path d="M16 18h-5"/><path d="M18 5a1 1 0 0 0-1 1v5.573"/><path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246"/><path d="M4 11V4"/><path d="M7 15h.01"/><path d="M8 10.1V4"/><circle cx="18" cy="18" r="2"/><circle cx="7" cy="15" r="5"/>', "traffic-cone": '<path d="M16.05 10.966a5 2.5 0 0 1-8.1 0"/><path d="m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04"/><path d="M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z"/><path d="M9.194 6.57a5 2.5 0 0 0 5.61 0"/>', "train-front-tunnel": '<path d="M2 22V12a10 10 0 1 1 20 0v10"/><path d="M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8"/><path d="M10 15h.01"/><path d="M14 15h.01"/><path d="M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z"/><path d="m9 19-2 3"/><path d="m15 19 2 3"/>', "train-front": '<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>', "train-track": '<path d="M2 17 17 2"/><path d="m2 14 8 8"/><path d="m5 11 8 8"/><path d="m8 8 8 8"/><path d="m11 5 8 8"/><path d="m14 2 8 8"/><path d="M7 22 22 7"/>', train: '<rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h.01"/><path d="M16 15h.01"/>', "tram-front": '<rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h.01"/><path d="M16 15h.01"/>', transgender: '<path d="M12 16v6"/><path d="M14 20h-4"/><path d="M18 2h4v4"/><path d="m2 2 7.17 7.17"/><path d="M2 5.355V2h3.357"/><path d="m22 2-7.17 7.17"/><path d="M8 5 5 8"/><circle cx="12" cy="12" r="4"/>', "trash-2": '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>', trash: '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>', "tree-deciduous": '<path d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"/><path d="M12 19v3"/>', "tree-palm": '<path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/>', "tree-pine": '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/>', trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>', trello: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><rect width="3" height="9" x="7" y="7"/><rect width="3" height="5" x="14" y="7"/>', "trending-down": '<path d="M16 17h6v-6"/><path d="m22 17-8.5-8.5-5 5L2 7"/>', "trending-up-down": '<path d="M14.828 14.828 21 21"/><path d="M21 16v5h-5"/><path d="m21 3-9 9-4-4-6 6"/><path d="M21 8V3h-5"/>', "trending-up": '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>', "triangle-alert": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>', "triangle-dashed": '<path d="M10.17 4.193a2 2 0 0 1 3.666.013"/><path d="M14 21h2"/><path d="m15.874 7.743 1 1.732"/><path d="m18.849 12.952 1 1.732"/><path d="M21.824 18.18a2 2 0 0 1-1.835 2.824"/><path d="M4.024 21a2 2 0 0 1-1.839-2.839"/><path d="m5.136 12.952-1 1.732"/><path d="M8 21h2"/><path d="m8.102 7.743-1 1.732"/>', "triangle-right": '<path d="M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"/>', triangle: '<path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>', trophy: '<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>', "truck-electric": '<path d="M14 19V7a2 2 0 0 0-2-2H9"/><path d="M15 19H9"/><path d="M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14"/><path d="M2 13v5a1 1 0 0 0 1 1h2"/><path d="M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02"/><circle cx="17" cy="19" r="2"/><circle cx="7" cy="19" r="2"/>', truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>', "turkish-lira": '<path d="M15 4 5 9"/><path d="m15 8.5-10 5"/><path d="M18 12a9 9 0 0 1-9 9V3"/>', turntable: '<path d="M10 12.01h.01"/><path d="M18 8v4a8 8 0 0 1-1.07 4"/><circle cx="10" cy="12" r="4"/><rect x="2" y="4" width="20" height="16" rx="2"/>', turtle: '<path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"/><path d="M4.82 7.9 8 10"/><path d="M15.18 7.9 12 10"/><path d="M16.93 10H20a2 2 0 0 1 0 4H2"/>', "tv-2": '<path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/>', "tv-minimal-play": '<path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"/><path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/>', "tv-minimal": '<path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/>', tv: '<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>', twitch: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>', twitter: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>', "type-outline": '<path d="M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"/>', type: '<path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/>', "umbrella-off": '<path d="M12 13v7a2 2 0 0 0 4 0"/><path d="M12 2v2"/><path d="M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51"/><path d="m2 2 20 20"/><path d="M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10"/>', umbrella: '<path d="M12 13v7a2 2 0 0 0 4 0"/><path d="M12 2v2"/><path d="M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z"/>', underline: '<path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/>', "undo-2": '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>', "undo-dot": '<path d="M21 17a9 9 0 0 0-15-6.7L3 13"/><path d="M3 7v6h6"/><circle cx="12" cy="17" r="1"/>', undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>', "unfold-horizontal": '<path d="M16 12h6"/><path d="M8 12H2"/><path d="M12 2v2"/><path d="M12 8v2"/><path d="M12 14v2"/><path d="M12 20v2"/><path d="m19 15 3-3-3-3"/><path d="m5 9-3 3 3 3"/>', "unfold-vertical": '<path d="M12 22v-6"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M22 12h-2"/><path d="m15 19-3 3-3-3"/><path d="m15 5-3-3-3 3"/>', ungroup: '<rect width="8" height="6" x="5" y="4" rx="1"/><rect width="8" height="6" x="11" y="14" rx="1"/>', university: '<path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 12h.01"/><path d="M18 16h.01"/><path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/><path d="M6 12h.01"/><path d="M6 16h.01"/><circle cx="12" cy="10" r="2"/>', "unlink-2": '<path d="M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2"/>', unlink: '<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"/><line x1="8" x2="8" y1="2" y2="5"/><line x1="2" x2="5" y1="8" y2="8"/><line x1="16" x2="16" y1="19" y2="22"/><line x1="19" x2="22" y1="16" y2="16"/>', "unlock-keyhole": '<circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/>', unlock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>', unplug: '<path d="m19 5 3-3"/><path d="m2 22 3-3"/><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"/>', "upload-cloud": '<path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/>', upload: '<path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>', usb: '<circle cx="10" cy="7" r="1"/><circle cx="4" cy="20" r="1"/><path d="M4.7 19.3 19 5"/><path d="m21 3-3 1 2 2Z"/><path d="M9.26 7.68 5 12l2 5"/><path d="m10 14 5 2 3.5-3.5"/><path d="m18 12 1-1 1 1-1 1Z"/>', "user-2": '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>', "user-check-2": '<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="m16 19 2 2 4-4"/>', "user-check": '<path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>', "user-circle-2": '<path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>', "user-circle": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>', "user-cog-2": '<path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="M2 21a8 8 0 0 1 10.434-7.62"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="10" cy="8" r="5"/><circle cx="18" cy="18" r="3"/>', "user-cog": '<path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m14.305 16.53.923-.382"/><path d="m15.228 13.852-.923-.383"/><path d="m16.852 12.228-.383-.923"/><path d="m16.852 17.772-.383.924"/><path d="m19.148 12.228.383-.923"/><path d="m19.53 18.696-.382-.924"/><path d="m20.772 13.852.924-.383"/><path d="m20.772 16.148.924.383"/><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/>', "user-lock": '<circle cx="10" cy="7" r="4"/><path d="M10.3 15H7a4 4 0 0 0-4 4v2"/><path d="M15 15.5V14a2 2 0 0 1 4 0v1.5"/><rect width="8" height="5" x="13" y="16" rx=".899"/>', "user-minus-2": '<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M22 19h-6"/>', "user-minus": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="22" x2="16" y1="11" y2="11"/>', "user-pen": '<path d="M11.5 15H7a4 4 0 0 0-4 4v2"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="7" r="4"/>', "user-plus-2": '<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/>', "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>', "user-round-check": '<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="m16 19 2 2 4-4"/>', "user-round-cog": '<path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="M2 21a8 8 0 0 1 10.434-7.62"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><circle cx="10" cy="8" r="5"/><circle cx="18" cy="18" r="3"/>', "user-round-minus": '<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M22 19h-6"/>', "user-round-pen": '<path d="M2 21a8 8 0 0 1 10.821-7.487"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="8" r="5"/>', "user-round-plus": '<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/>', "user-round-search": '<circle cx="10" cy="8" r="5"/><path d="M2 21a8 8 0 0 1 10.434-7.62"/><circle cx="18" cy="18" r="3"/><path d="m22 22-1.9-1.9"/>', "user-round-x": '<path d="M2 21a8 8 0 0 1 11.873-7"/><circle cx="10" cy="8" r="5"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/>', "user-round": '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>', "user-search": '<circle cx="10" cy="7" r="4"/><path d="M10.3 15H7a4 4 0 0 0-4 4v2"/><circle cx="17" cy="17" r="3"/><path d="m21 21-1.9-1.9"/>', "user-square-2": '<path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="18" height="18" x="3" y="3" rx="2"/>', "user-square": '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>', "user-star": '<path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><path d="M8 15H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>', "user-x-2": '<path d="M2 21a8 8 0 0 1 11.873-7"/><circle cx="10" cy="8" r="5"/><path d="m17 17 5 5"/><path d="m22 17-5 5"/>', "user-x": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>', user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', "users-2": '<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>', "users-round": '<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>', users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>', "utensils-crossed": '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>', utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>', "utility-pole": '<path d="M12 2v20"/><path d="M2 5h20"/><path d="M3 3v2"/><path d="M7 3v2"/><path d="M17 3v2"/><path d="M21 3v2"/><path d="m19 5-7 7-7-7"/>', variable: '<path d="M8 21s-4-3-4-9 4-9 4-9"/><path d="M16 3s4 3 4 9-4 9-4 9"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/>', vault: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/><path d="m7.9 7.9 2.7 2.7"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/><path d="m13.4 10.6 2.7-2.7"/><circle cx="7.5" cy="16.5" r=".5" fill="currentColor"/><path d="m7.9 16.1 2.7-2.7"/><circle cx="16.5" cy="16.5" r=".5" fill="currentColor"/><path d="m13.4 13.4 2.7 2.7"/><circle cx="12" cy="12" r="2"/>', "vector-square": '<path d="M19.5 7a24 24 0 0 1 0 10"/><path d="M4.5 7a24 24 0 0 0 0 10"/><path d="M7 19.5a24 24 0 0 0 10 0"/><path d="M7 4.5a24 24 0 0 1 10 0"/><rect x="17" y="17" width="5" height="5" rx="1"/><rect x="17" y="2" width="5" height="5" rx="1"/><rect x="2" y="17" width="5" height="5" rx="1"/><rect x="2" y="2" width="5" height="5" rx="1"/>', vegan: '<path d="M16 8q6 0 6-6-6 0-6 6"/><path d="M17.41 3.59a10 10 0 1 0 3 3"/><path d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"/>', "venetian-mask": '<path d="M18 11c-1.5 0-2.5.5-3 2"/><path d="M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z"/><path d="M6 11c1.5 0 2.5.5 3 2"/>', "venus-and-mars": '<path d="M10 20h4"/><path d="M12 16v6"/><path d="M17 2h4v4"/><path d="m21 2-5.46 5.46"/><circle cx="12" cy="11" r="5"/>', venus: '<path d="M12 15v7"/><path d="M9 19h6"/><circle cx="12" cy="9" r="6"/>', verified: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>', "vibrate-off": '<path d="m2 8 2 2-2 2 2 2-2 2"/><path d="m22 8-2 2 2 2-2 2 2 2"/><path d="M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2"/><path d="M16 10.34V6c0-.55-.45-1-1-1h-4.34"/><line x1="2" x2="22" y1="2" y2="22"/>', vibrate: '<path d="m2 8 2 2-2 2 2 2-2 2"/><path d="m22 8-2 2 2 2-2 2 2 2"/><rect width="8" height="14" x="8" y="5" rx="1"/>', "video-off": '<path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"/><path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/><path d="m2 2 20 20"/>', video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>', videotape: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M2 8h20"/><circle cx="8" cy="14" r="2"/><path d="M8 12h8"/><circle cx="16" cy="14" r="2"/>', view: '<path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/><path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/><circle cx="12" cy="12" r="1"/><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>', voicemail: '<circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><line x1="6" x2="18" y1="16" y2="16"/>', volleyball: '<path d="M11.1 7.1a16.55 16.55 0 0 1 10.9 4"/><path d="M12 12a12.6 12.6 0 0 1-8.7 5"/><path d="M16.8 13.6a16.55 16.55 0 0 1-9 7.5"/><path d="M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10"/><path d="M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5"/><circle cx="12" cy="12" r="10"/>', "volume-1": '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/>', "volume-2": '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>', "volume-off": '<path d="M16 9a5 5 0 0 1 .95 2.293"/><path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/><path d="m2 2 20 20"/><path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/><path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/>', "volume-x": '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>', volume: '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>', vote: '<path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"/><path d="M22 19H2"/>', "wallet-2": '<path d="M17 14h.01"/><path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"/>', "wallet-cards": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"/><path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21"/>', "wallet-minimal": '<path d="M17 14h.01"/><path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"/>', wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>', wallpaper: '<path d="M12 17v4"/><path d="M8 21h8"/><path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15"/><circle cx="8" cy="9" r="2"/><rect x="2" y="3" width="20" height="14" rx="2"/>', "wand-2": '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>', "wand-sparkles": '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>', wand: '<path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>', warehouse: '<path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"/><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"/><path d="M6 13h12"/><path d="M6 17h12"/>', "washing-machine": '<path d="M3 6h3"/><path d="M17 6h.01"/><rect width="18" height="20" x="3" y="2" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"/>', watch: '<path d="M12 10v2.2l1.6 1"/><path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"/><path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"/><circle cx="12" cy="12" r="6"/>', "waves-ladder": '<path d="M19 5a2 2 0 0 0-2 2v11"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M7 13h10"/><path d="M7 9h10"/><path d="M9 5a2 2 0 0 0-2 2v11"/>', waves: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>', waypoints: '<circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/>', webcam: '<circle cx="12" cy="10" r="8"/><circle cx="12" cy="10" r="3"/><path d="M7 22h10"/><path d="M12 22v-4"/>', "webhook-off": '<path d="M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15"/><path d="M9 3.4a4 4 0 0 1 6.52.66"/><path d="m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05"/><path d="M20.3 20.3a4 4 0 0 1-2.3.7"/><path d="M18.6 13a4 4 0 0 1 3.357 3.414"/><path d="m12 6 .6 1"/><path d="m2 2 20 20"/>', webhook: '<path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"/><path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"/><path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"/>', weight: '<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/>', "wheat-off": '<path d="m2 22 10-10"/><path d="m16 8-1.17 1.17"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"/><path d="M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"/><path d="M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"/><line x1="2" x2="22" y1="2" y2="22"/>', wheat: '<path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>', "whole-word": '<circle cx="7" cy="12" r="3"/><path d="M10 9v6"/><circle cx="17" cy="12" r="3"/><path d="M14 7v8"/><path d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"/>', "wifi-cog": '<path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="M2 7.82a15 15 0 0 1 20 0"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><path d="M5 11.858a10 10 0 0 1 11.5-1.785"/><path d="M8.5 15.429a5 5 0 0 1 2.413-1.31"/><circle cx="18" cy="18" r="3"/>', "wifi-high": '<path d="M12 20h.01"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>', "wifi-low": '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>', "wifi-off": '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>', "wifi-pen": '<path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><path d="M5 12.859a10 10 0 0 1 10.5-2.222"/><path d="M8.5 16.429a5 5 0 0 1 3-1.406"/>', "wifi-sync": '<path d="M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5"/><path d="M11.965 14.105h4"/><path d="M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M21.965 22.105v-4"/><path d="M5 12.86a10 10 0 0 1 3-2.032"/><path d="M8.5 16.429h.01"/>', "wifi-zero": '<path d="M12 20h.01"/>', wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>', "wind-arrow-down": '<path d="M10 2v8"/><path d="M12.8 21.6A2 2 0 1 0 14 18H2"/><path d="M17.5 10a2.5 2.5 0 1 1 2 4H2"/><path d="m6 6 4 4 4-4"/>', wind: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>', "wine-off": '<path d="M8 22h8"/><path d="M7 10h3m7 0h-1.343"/><path d="M12 15v7"/><path d="M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"/><line x1="2" x2="22" y1="2" y2="22"/>', wine: '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>', workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>', worm: '<path d="m19 12-1.5 3"/><path d="M19.63 18.81 22 20"/><path d="M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z"/>', "wrap-text": '<path d="m16 16-3 3 3 3"/><path d="M3 12h14.5a1 1 0 0 1 0 7H13"/><path d="M3 19h6"/><path d="M3 5h18"/>', wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>', "x-circle": '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>', "x-octagon": '<path d="m15 9-6 6"/><path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/><path d="m9 9 6 6"/>', "x-square": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>', x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>', "zap-off": '<path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317"/><path d="M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773"/><path d="M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"/><path d="m2 2 20 20"/>', zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>', "zoom-in": '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>', "zoom-out": '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/>' }, ia = {}, w2 = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 };
function F2({
  name: t,
  size: e = 16,
  strokeWidth: h = 2,
  className: d = "",
  style: c,
  children: l,
  ...n
}) {
  const p = typeof e == "string" && w2[e] ? e : null, M = p ? w2[p] : e, i = ka[t];
  return !i && t && !ia[t] && (ia[t] = !0, typeof console < "u" && console.warn('[Whitelabel DS] Icon "' + t + '" is not a Lucide v0.544.0 name; rendering an empty slot.')), /* @__PURE__ */ a.createElement("svg", b2({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: M,
    height: M,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: h,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    "data-icon": t,
    "data-inl": "1",
    className: ["ds-icon", d].filter(Boolean).join(" "),
    style: {
      display: "inline-block",
      flex: "none",
      ...p ? { inlineSize: `var(--icon-${p})`, blockSize: `var(--icon-${p})` } : null,
      ...c
    },
    dangerouslySetInnerHTML: {
      __html: i || ""
    }
  }, n));
}
F2.names = Object.keys(ka);
F2.sizes = w2;
Object.assign(r, { Icon: F2 });
function _2() {
  return _2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, _2.apply(null, arguments);
}
function V0({
  variant: t = "ghost",
  size: e = "md",
  label: h,
  tone: d,
  children: c,
  className: l = "",
  ...n
}) {
  const p = ["ds-icon-btn", `ds-icon-btn--${t}`, `ds-icon-btn--${e}`, l].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement("button", _2({
    type: "button",
    className: p,
    "aria-label": h,
    title: h,
    "data-tone": d || void 0
  }, n), /* @__PURE__ */ a.createElement("span", {
    className: "ds-icon-btn__icon"
  }, c));
}
Object.assign(r, { IconButton: V0 });
function E2() {
  return E2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, E2.apply(null, arguments);
}
function k0({
  as: t = "label",
  variant: e = "default",
  required: h = !1,
  children: d,
  className: c = "",
  ...l
}) {
  const n = ["ds-label", e !== "default" && `ds-label--${e}`, c].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement(t, E2({
    className: n
  }, l), d, h && (e === "field" ? /* @__PURE__ */ a.createElement("span", {
    className: "ds-label__required",
    "aria-hidden": "true"
  }, " *") : /* @__PURE__ */ a.createElement("span", {
    style: {
      color: "var(--error-foreground)"
    }
  }, " *")));
}
Object.assign(r, { Label: k0 });
function A0({ src: t, alt: e = "", name: h = "Brand", height: d = 24, product: c, className: l = "", ...n }) {
  return a.createElement(
    "span",
    { className: ["ds-logo", l].filter(Boolean).join(" "), ...n },
    t ? a.createElement("img", { src: t, alt: e || h, style: { height: d } }) : a.createElement("span", { className: "ds-logo__wordmark", style: { fontSize: Math.round(d * 0.75) } }, h),
    c && a.createElement("span", { className: "ds-logo__product" }, c)
  );
}
Object.assign(r, { Logo: A0 });
function H2() {
  return H2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, H2.apply(null, arguments);
}
const N0 = "M12 1.5C12.7 7.6 16.4 11.3 22.5 12C16.4 12.7 12.7 16.4 12 22.5C11.3 16.4 7.6 12.7 1.5 12C7.6 11.3 11.3 7.6 12 1.5Z";
function L0({
  icon: t,
  motion: e,
  size: h = "md",
  loading: d = !1,
  disabled: c = !1,
  children: l,
  className: n = "",
  ...p
}) {
  const M = e || (t ? "nudge" : "spin"), i = ["ds-orb-btn", M !== "none" && `ds-orb-btn--${M}`, d && "ds-btn--loading", n].filter(Boolean).join(" "), o = /* @__PURE__ */ a.createElement("span", {
    className: "ds-orb-btn__orb",
    "aria-hidden": "true"
  }, d ? /* @__PURE__ */ a.createElement(r.Spinner, null) : /* @__PURE__ */ a.createElement("span", {
    className: "ds-orb-btn__icon"
  }, t || /* @__PURE__ */ a.createElement("svg", {
    viewBox: "0 0 24 24",
    focusable: "false"
  }, /* @__PURE__ */ a.createElement("path", {
    d: N0,
    fill: "currentColor"
  }))));
  return /* @__PURE__ */ a.createElement(r.Button, H2({
    variant: "primary",
    size: h,
    disabled: c || d,
    "aria-busy": d || void 0,
    className: i,
    iconEnd: o
  }, p), l);
}
Object.assign(r, { OrbButton: L0 });
function V2() {
  return V2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, V2.apply(null, arguments);
}
function z0({
  appearance: t = "filled",
  shape: e = "pill",
  loading: h = !1,
  children: d,
  className: c = "",
  ...l
}) {
  const n = ["ds-slide-btn", `ds-slide-btn--${t}`, e === "rounded" && "ds-slide-btn--rounded", c].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement(r.Button, V2({
    variant: t === "outline" ? "ghost" : "primary",
    loading: h,
    className: n
  }, l), /* @__PURE__ */ a.createElement("span", {
    className: "ds-slide-btn__fill",
    "aria-hidden": "true"
  }), /* @__PURE__ */ a.createElement("span", {
    className: "ds-slide-btn__label"
  }, d));
}
Object.assign(r, { SlideButton: z0 });
function k2() {
  return k2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, k2.apply(null, arguments);
}
const C0 = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  "body-large": "p",
  "body-small": "p",
  caption: "span",
  help: "span",
  metric: "span",
  "display-metric": "span",
  code: "code"
};
function S0({
  variant: t = "body",
  as: e,
  tone: h,
  children: d,
  className: c = "",
  style: l,
  ...n
}) {
  const p = e || C0[t] || "span", M = ["ds-text", `ds-text--${t}`, c].filter(Boolean).join(" "), i = h ? {
    secondary: "var(--content-secondary)",
    tertiary: "var(--content-tertiary)",
    inverse: "var(--content-inverse)",
    disabled: "var(--content-disabled)",
    error: "var(--error-foreground)",
    success: "var(--success-foreground)"
  }[h] : void 0;
  return /* @__PURE__ */ a.createElement(p, k2({
    className: M,
    style: i ? {
      color: i,
      ...l
    } : l
  }, n), d);
}
Object.assign(r, { Text: S0 });
function A2() {
  return A2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, A2.apply(null, arguments);
}
function j0({
  size: t = "md",
  src: e,
  alt: h = "",
  initials: d,
  icon: c,
  outlined: l = !1,
  tone: n = "default",
  className: p = "",
  ...M
}) {
  const i = ["ds-avatar", `ds-avatar--${t}`, l && "ds-avatar--outlined", n === "brand" && "ds-avatar--brand", p].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement("span", A2({
    className: i
  }, M), e ? /* @__PURE__ */ a.createElement("img", {
    src: e,
    alt: h
  }) : c || d);
}
Object.assign(r, { Avatar: j0 });
function B0({ tone: t = "neutral", size: e = "sm", dot: h = !1, children: d, className: c = "", ...l }) {
  return a.createElement(
    "span",
    { className: ["ds-badge-v2", `ds-badge-v2--${t}`, e === "md" && "ds-badge-v2--md", c].filter(Boolean).join(" "), ...l },
    h && a.createElement(
      "svg",
      { className: "ds-badge-v2__dot", viewBox: "0 0 8 8", "aria-hidden": "true" },
      a.createElement("circle", { className: "ds-badge-v2__dot-halo", cx: "4", cy: "4", r: "4" }),
      a.createElement("circle", { className: "ds-badge-v2__dot-indicator", cx: "4", cy: "4", r: "3" })
    ),
    a.createElement("span", { className: "ds-badge-v2__label" }, d)
  );
}
Object.assign(r, { Badge: B0 });
function $0({ as: t = "section", variant: e = "default", interactive: h = !1, subtle: d = !1, heading: c, supporting: l, action: n, footer: p, children: M, className: i = "", ...o }) {
  if (e === "figure" || e === "meter" || e === "trend" || e === "media") {
    const { figure: v, ...m } = o, y = e === "figure" ? z1.MetricCard : e === "meter" ? z1.MeterCard : e === "trend" ? z1.KpiTrendCard : z1.MediaCard, g = e === "figure" ? { variant: v || "chart", footer: p } : e === "media" ? { action: n, as: t === "section" ? void 0 : t } : {};
    return a.createElement(y, { className: i, ...g, ...m });
  }
  const s = ["ds-card-v2", e === "metric" && "ds-card ds-card--metric", h && "ds-card-v2--interactive", d && "ds-card-v2--subtle", i].filter(Boolean).join(" ");
  return a.createElement(
    t,
    { className: s, ...o },
    (c || l || n) && a.createElement(
      "header",
      { className: "ds-card-v2__header" },
      a.createElement(
        "div",
        { className: "ds-card-v2__header-content" },
        a.createElement(
          "div",
          { className: "ds-card-v2__text-stack" },
          c && a.createElement("h3", { className: "ds-card-v2__heading" }, c),
          l && a.createElement("p", { className: "ds-card-v2__supporting" }, l)
        ),
        n && a.createElement("div", { className: "ds-card-v2__action" }, n)
      ),
      a.createElement(r.Divider, null)
    ),
    M,
    p && a.createElement(
      "footer",
      { className: "ds-card-v2__footer" },
      a.createElement(r.Divider, null),
      a.createElement("div", { className: "ds-card-v2__footer-actions" }, p)
    )
  );
}
Object.assign(r, { Card: $0 });
function N2() {
  return N2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, N2.apply(null, arguments);
}
function O0({
  label: t,
  value: e,
  icon: h,
  selected: d = !1,
  disabled: c = !1,
  removable: l = !1,
  onSelect: n,
  onRemove: p,
  className: M = "",
  ...i
}) {
  const o = ["ds-chip", d && "ds-chip--selected", c && "ds-chip--disabled", M].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement("span", N2({
    className: o
  }, i), /* @__PURE__ */ a.createElement("button", {
    type: "button",
    className: "ds-chip__body",
    disabled: c,
    "aria-pressed": d,
    onClick: () => n && n(!d)
  }, h && /* @__PURE__ */ a.createElement("span", {
    className: "ds-chip__icon"
  }, h), /* @__PURE__ */ a.createElement("span", {
    className: "ds-chip__label"
  }, t), e != null && /* @__PURE__ */ a.createElement(a.Fragment, null, /* @__PURE__ */ a.createElement(r.Divider, {
    orientation: "vertical",
    fixed: !0,
    type: "strong",
    className: "ds-chip__separator"
  }), /* @__PURE__ */ a.createElement("span", {
    className: "ds-chip__value"
  }, e))), l && /* @__PURE__ */ a.createElement("button", {
    type: "button",
    className: "ds-chip__remove",
    disabled: c,
    "aria-label": `Remove ${t}`,
    onClick: () => p && p()
  }, /* @__PURE__ */ a.createElement(r.Icon, { name: "x", size: "sm", style: { display: "block" } })));
}
Object.assign(r, { Chip: O0 });
function L2() {
  return L2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, L2.apply(null, arguments);
}
function P0({
  variant: t = "chart",
  unit: e,
  footer: h,
  highlight: d = !1,
  span: c,
  overline: l,
  percent: n,
  text: p,
  chip: M,
  label: i,
  value: o,
  lastUpdate: s,
  trend: v,
  trendTone: m,
  chartType: y = "line",
  series: g,
  labels: u = [],
  data: f,
  centerValue: L,
  centerLabel: z,
  chart: E,
  legend: _,
  legendColor: B,
  footerMeta: $,
  className: A = "",
  ...w
}) {
  if (t === "meter" || t === "trend")
    return a.createElement(t === "meter" ? z1.MeterCard : z1.KpiTrendCard, { value: o, unit: e, percent: n, series: g, className: A, ...w });
  if (t === "tile") {
    const { style: o1, ...p1 } = w;
    return a.createElement(
      r.Card,
      { as: "div", className: ["ds-metric-card", "ds-metric-card--tile", d && "ds-metric-card--highlight", A].filter(Boolean).join(" "), style: { gridColumn: "span " + (c || 2), ...o1 }, ...p1 },
      a.createElement("span", { className: "ds-metric-card__label" }, i),
      a.createElement("b", { className: "ds-metric-card__value" }, o, e && a.createElement("small", null, " ", e)),
      h && a.createElement("span", { className: "ds-metric-card__footer" }, h)
    );
  }
  if (t === "feature") {
    const o1 = Math.max(0, Math.min(100, Number(n) || 0));
    return a.createElement(
      "div",
      { className: ["ds-metric-card", "ds-metric-card--feature", A].filter(Boolean).join(" "), ...w },
      l && a.createElement("span", { className: "ds-metric-card__overline" }, l),
      a.createElement(r.ProgressRing, { pct: o1, label: i, arcClass: "ds-financing__arc" }),
      p && a.createElement("p", { className: "ds-metric-card__text" }, p),
      M && a.createElement(r.Pill, { tone: "inverse" }, M)
    );
  }
  const H = m ?? "success", T = H === "critical" || H === "error", C = H === "error" ? "critical" : H, P = g && g.length === 1, q = r.chartPalette("primary"), h1 = ({
    color: o1
  }) => /* @__PURE__ */ a.createElement(r.Dot, {
    color: o1
  });
  let e1 = E;
  if (e1 === void 0)
    if (y === "donut" && f) {
      const o1 = f.reduce((p1, m1) => p1 + m1.value, 0) || 1;
      e1 = /* @__PURE__ */ a.createElement("div", {
        className: "ds-metric-card__donut"
      }, /* @__PURE__ */ a.createElement(r.DonutChart, {
        data: f,
        centerValue: L,
        centerLabel: z,
        size: "md"
      }), /* @__PURE__ */ a.createElement("ul", {
        className: "ds-metric-card__donut-legend"
      }, f.map((p1, m1) => /* @__PURE__ */ a.createElement("li", {
        key: m1
      }, /* @__PURE__ */ a.createElement(h1, {
        color: p1.color || q[m1 % q.length]
      }), /* @__PURE__ */ a.createElement("span", {
        className: "ds-metric-card__donut-label"
      }, p1.label), /* @__PURE__ */ a.createElement("strong", null, Math.round(p1.value / o1 * 100), " %")))));
    } else y === "bar" && f ? e1 = /* @__PURE__ */ a.createElement(r.BarChart, {
      data: f,
      size: "lg"
    }) : g && (e1 = /* @__PURE__ */ a.createElement(r.LineChart, {
      series: g,
      labels: u,
      size: "lg",
      area: P
    }));
  const _1 = _ !== void 0 ? typeof _ == "string" ? /* @__PURE__ */ a.createElement("span", {
    className: "ds-metric-card__legend-item"
  }, /* @__PURE__ */ a.createElement(h1, {
    color: B || q[0]
  }), _) : _ : y === "line" && g ? g.map((o1, p1) => /* @__PURE__ */ a.createElement("span", {
    key: p1,
    className: "ds-metric-card__legend-item"
  }, /* @__PURE__ */ a.createElement(h1, {
    color: o1.color || B || q[0]
  }), o1.name)) : B ? /* @__PURE__ */ a.createElement("span", {
    className: "ds-metric-card__legend-item"
  }, /* @__PURE__ */ a.createElement(h1, {
    color: B
  }), i) : null;
  return /* @__PURE__ */ a.createElement(r.Card, L2({
    variant: "metric",
    className: A
  }, w), /* @__PURE__ */ a.createElement("div", {
    className: "ds-metric-card__top"
  }, /* @__PURE__ */ a.createElement("span", {
    className: "ds-metric-card__label"
  }, i), s && /* @__PURE__ */ a.createElement("span", {
    className: "ds-metric-card__meta"
  }, /* @__PURE__ */ a.createElement(r.Icon, {
    name: "clock",
    size: "sm"
  }), s)), /* @__PURE__ */ a.createElement("div", {
    className: "ds-metric-card__value-row"
  }, /* @__PURE__ */ a.createElement("span", {
    className: "ds-metric-card__value"
  }, o), v && /* @__PURE__ */ a.createElement(r.Badge, {
    tone: C,
    dot: !1,
    className: "ds-metric-card__trend"
  }, /* @__PURE__ */ a.createElement(r.Icon, {
    name: T ? "trending-down" : "trending-up",
    size: "sm"
  }), v)), e1 && /* @__PURE__ */ a.createElement("div", {
    className: "ds-metric-card__chart"
  }, e1), (_1 || $) && /* @__PURE__ */ a.createElement("div", {
    className: "ds-metric-card__footer"
  }, /* @__PURE__ */ a.createElement("span", {
    className: "ds-metric-card__legend"
  }, _1), /* @__PURE__ */ a.createElement("span", {
    className: "ds-metric-card__footer-meta"
  }, $)));
}
Object.assign(r, { MetricCard: P0 });
function q0({ kind: t = "category", level: e, icon: h, children: d, className: c = "", ...l }) {
  const n = Math.max(0, Math.min(3, Number(e) || 0));
  return a.createElement(
    "span",
    { className: ["ds-tag-v2", `ds-tag-v2--${t}`, c].filter(Boolean).join(" "), ...l },
    n > 0 && a.createElement("span", { className: "ds-tag-v2__level", "aria-hidden": "true" }, [1, 2, 3].map((p) => a.createElement("i", { key: p, className: "ds-tag-v2__bar" + (p <= n ? " ds-tag-v2__bar--on" : "") }))),
    h,
    a.createElement("span", { className: "ds-tag-v2__label" }, d)
  );
}
Object.assign(r, { Tag: q0 });
function D0({ label: t, checked: e = !1, indeterminate: h = !1, disabled: d = !1, onChange: c, id: l, className: n = "", ...p }) {
  const M = e || h;
  return a.createElement(
    "label",
    { className: ["ds-checkbox-v2", d && "ds-checkbox-v2--disabled", n].filter(Boolean).join(" "), htmlFor: l },
    a.createElement("input", { id: l, type: "checkbox", className: "ds-checkbox-v2__input", checked: e, disabled: d, ref: (i) => {
      i && (i.indeterminate = h);
    }, onChange: (i) => c && c(i.target.checked), ...p }),
    a.createElement(
      "span",
      { className: ["ds-checkbox-v2__box", M && "ds-checkbox-v2__box--active"].filter(Boolean).join(" "), "aria-hidden": "true" },
      a.createElement(
        "svg",
        { className: "ds-checkbox-v2__icon", viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        a.createElement("path", { className: "ds-checkbox-v2__check" + (e && !h ? " ds-checkbox-v2__check--visible" : ""), d: "M13.5 4.5 6.5 12 3 8.5" }),
        a.createElement("path", { className: "ds-checkbox-v2__dash" + (h ? " ds-checkbox-v2__dash--visible" : ""), d: "M4 8h8" })
      )
    ),
    t && a.createElement("span", { className: "ds-checkbox-v2__label" }, t)
  );
}
Object.assign(r, { Checkbox: D0 });
function z2() {
  return z2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, z2.apply(null, arguments);
}
function Z0({
  tone: t = "default",
  field: e = !1,
  tight: h = !1,
  icon: d,
  children: c,
  className: l = "",
  ...n
}) {
  const p = ["ds-help-text", t !== "default" && `ds-help-text--${t}`, e && "ds-help-text--caption", (e || h) && "ds-help-text--field", l].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement("p", z2({
    className: p
  }, n), d, /* @__PURE__ */ a.createElement("span", null, c));
}
Object.assign(r, { HelpText: Z0 });
function T0({ label: t, size: e = "md", help: h, error: d, required: c, disabled: l, readOnly: n, active: p, prefix: M, suffix: i, iconStart: o, iconEnd: s, action: v, type: m = "text", id: y, className: g = "", ...u }) {
  const f = String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), L = y || "in-" + f, z = d || h ? L + "-h" : void 0, E = !!M && m === "number", _ = a.useRef(null), [B, $] = a.useState(null), A = a.useCallback(() => {
    const T = _.current;
    if (!T) return;
    const C = getComputedStyle(T), P = document.createElement("span");
    P.style.cssText = "position:absolute;visibility:hidden;white-space:pre;left:-9999px;top:0", ["font", "fontFeatureSettings", "fontVariantNumeric", "letterSpacing", "fontKerning"].forEach((h1) => {
      P.style[h1] = C[h1];
    }), P.textContent = T.value || T.placeholder || "0", document.body.appendChild(P);
    const q = P.getBoundingClientRect().width;
    P.remove(), $(Math.ceil(q) + 2);
  }, []);
  a.useLayoutEffect(() => {
    E && A();
  }, [E, u.value, A]), a.useEffect(() => {
    E && document.fonts && document.fonts.ready && document.fonts.ready.then(A);
  }, [E, A]);
  const w = E ? (T) => {
    A(), u.onInput && u.onInput(T);
  } : u.onInput, H = ["ds-input-v2__field", `ds-input-v2__field--${e}`, d && "ds-input-v2__field--error", p && "ds-input-v2__field--active", l && "ds-input-v2__field--disabled", E && "ds-input-v2__field--hug", n && "ds-input-v2__field--readonly"].filter(Boolean).join(" ");
  return a.createElement(
    "div",
    { className: ["ds-input-v2", g].filter(Boolean).join(" ") },
    t && a.createElement(r.Label, { variant: "field", htmlFor: L, required: c }, t),
    a.createElement(
      "div",
      { className: H, onMouseDown: E ? (T) => {
        const C = T.currentTarget.querySelector("input");
        C && T.target !== C && !C.disabled && (T.preventDefault(), C.focus());
      } : void 0 },
      o && a.createElement("span", { className: "ds-input-v2__icon", "aria-hidden": "true" }, o),
      M && a.createElement("span", { className: "ds-input-v2__affix ds-input-v2__affix--prefix", "aria-hidden": "true" }, M),
      a.createElement("input", { id: L, className: "ds-input-v2__control", "data-type": m === "number" ? "number" : void 0, type: m, disabled: l, readOnly: n, required: c, "aria-invalid": d ? "true" : void 0, "aria-describedby": z, ...u, ref: E ? _ : u.ref, onInput: w, style: E && B ? Object.assign({ inlineSize: B + "px" }, u.style) : u.style }),
      i && a.createElement("span", { className: "ds-input-v2__affix ds-input-v2__affix--suffix", "aria-hidden": "true" }, i),
      s && a.createElement("span", { className: "ds-input-v2__icon", "aria-hidden": "true" }, s),
      v
    ),
    (d || h) && a.createElement(r.HelpText, { field: !0, tone: d ? "error" : "default", id: z, role: d ? "alert" : void 0 }, d || h)
  );
}
Object.assign(r, { Input: T0 });
function R0({ label: t, selected: e = !1, disabled: h = !1, bare: d = !1, name: c, value: l, onChange: n, id: p, className: M = "", ...i }) {
  return a.createElement(
    d ? "span" : "label",
    { className: ["ds-radio-v2", d && "ds-radio-v2--bare", h && "ds-radio-v2--disabled", M].filter(Boolean).join(" "), htmlFor: d ? void 0 : p },
    a.createElement("input", { id: p, type: "radio", className: "ds-radio-v2__input", name: c, value: l, checked: e, disabled: h, onChange: () => n && n(l), ...i }),
    a.createElement(
      "span",
      { className: "ds-radio-v2__ring" + (e ? " ds-radio-v2__ring--selected" : ""), "aria-hidden": "true" },
      a.createElement("span", { className: "ds-radio-v2__dot" + (e ? " ds-radio-v2__dot--visible" : "") })
    ),
    t && a.createElement("span", { className: "ds-radio-v2__label" }, t)
  );
}
Object.assign(r, { Radio: R0 });
function C2() {
  return C2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, C2.apply(null, arguments);
}
function I0({
  label: t,
  selected: e = !1,
  disabled: h = !1,
  onClick: d,
  role: c = "tab",
  className: l = "",
  ...n
}) {
  return /* @__PURE__ */ a.createElement("button", C2({
    type: "button",
    role: c,
    [c === "tab" ? "aria-selected" : "aria-checked"]: e,
    disabled: h,
    onClick: d,
    className: ["ds-segmented__segment", e && "ds-segmented__segment--selected", l].filter(Boolean).join(" ")
  }, n), t);
}
Object.assign(r, { Segment: I0 });
function S2() {
  return S2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, S2.apply(null, arguments);
}
function F0({
  options: t = [],
  value: e,
  onChange: h,
  className: d = "",
  ...c
}) {
  const l = a.useRef(null), [n, p] = a.useState(null), [M, i] = a.useState(!1), o = a.useCallback(() => {
    const m = l.current;
    if (!m) return;
    const y = m.querySelector('[data-selected="true"]');
    y && p({
      left: y.offsetLeft,
      width: y.offsetWidth
    });
  }, []);
  a.useLayoutEffect(() => {
    o();
  }, [e, t, o]), a.useEffect(() => {
    const m = requestAnimationFrame(() => i(!0));
    return () => cancelAnimationFrame(m);
  }, []), a.useEffect(() => {
    const m = l.current;
    if (!m) return;
    let y;
    return typeof ResizeObserver < "u" && (y = new ResizeObserver(o), y.observe(m)), document.fonts && document.fonts.ready && document.fonts.ready.then(o), () => {
      y && y.disconnect();
    };
  }, [o]);
  const s = t.filter((m) => !m.disabled), v = (m) => {
    if (!s.length) return;
    const y = Math.max(0, s.findIndex((u) => u.value === e));
    let g = -1;
    m.key === "ArrowRight" || m.key === "ArrowDown" ? g = (y + 1) % s.length : m.key === "ArrowLeft" || m.key === "ArrowUp" ? g = (y - 1 + s.length) % s.length : m.key === "Home" ? g = 0 : m.key === "End" && (g = s.length - 1), !(g < 0) && (m.preventDefault(), h && h(s[g].value), requestAnimationFrame(() => {
      const u = l.current && l.current.querySelector('[data-selected="true"]');
      u && u.focus();
    }));
  };
  return /* @__PURE__ */ a.createElement("div", S2({
    className: ["ds-segmented", d].filter(Boolean).join(" "),
    role: "radiogroup",
    ref: l,
    onKeyDown: v
  }, c), n && /* @__PURE__ */ a.createElement(r.SlideIndicator, {
    box: n,
    variant: "pill",
    animate: !!M,
    "aria-hidden": "true"
  }), t.map((m) => /* @__PURE__ */ a.createElement(r.Segment, {
    key: m.value,
    role: "radio",
    selected: m.value === e,
    "data-selected": m.value === e,
    tabIndex: m.value === e ? 0 : -1,
    disabled: m.disabled,
    label: m.label,
    onClick: () => h && h(m.value)
  })));
}
Object.assign(r, { SegmentedControl: F0 });
const W0 = a.forwardRef(function({ className: e = "", ...h }, d) {
  return a.createElement("button", { ref: d, type: "button", className: ["ds-field-trigger", e].filter(Boolean).join(" "), ...h });
});
Object.assign(r, { FieldTrigger: W0 });
function Y0({ className: t = "", children: e, ...h }) {
  return a.createElement("span", { className: ["ds-kbd", t].filter(Boolean).join(" "), ...h }, e);
}
Object.assign(r, { Kbd: Y0 });
const { usePresence: K0 } = r;
function U0({ label: t, size: e = "md", value: h, placeholder: d = "Select…", options: c = [], onChange: l, help: n, error: p, required: M, disabled: i, id: o, className: s = "", ...v }) {
  const [m, y] = a.useState(!1), g = a.useRef(null), u = a.useRef(null), f = a.useRef(null), { mounted: L } = K0(m, u), z = String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), E = o || "sel-" + z, _ = E + "-list", B = p || n ? E + "-h" : void 0, $ = c.find((C) => C.value === h);
  a.useEffect(() => {
    if (!m) return;
    const C = (q) => {
      g.current && !g.current.contains(q.target) && y(!1);
    };
    document.addEventListener("pointerdown", C);
    const P = u.current;
    if (P) {
      const q = P.querySelector('[aria-selected="true"]') || P.querySelector('[role="option"]');
      q && q.focus({ preventScroll: !0 });
    }
    return () => document.removeEventListener("pointerdown", C);
  }, [m]);
  const A = (C) => {
    l && l(C), y(!1), f.current && f.current.focus();
  }, w = (C) => {
    ["ArrowDown", "ArrowUp", "Enter", " "].includes(C.key) && (C.preventDefault(), y(!0));
  }, H = (C) => {
    const P = Array.from(u.current.querySelectorAll('[role="option"]')), q = P.indexOf(document.activeElement);
    C.key === "ArrowDown" ? (C.preventDefault(), (P[q + 1] || P[0]).focus()) : C.key === "ArrowUp" ? (C.preventDefault(), (P[q - 1] || P[P.length - 1]).focus()) : C.key === "Home" ? (C.preventDefault(), P[0].focus()) : C.key === "End" ? (C.preventDefault(), P[P.length - 1].focus()) : C.key === "Escape" ? (C.preventDefault(), y(!1), f.current && f.current.focus()) : C.key === "Tab" && y(!1);
  }, T = ["ds-select-v2__trigger", `ds-select-v2__trigger--${e}`, m && "ds-select-v2__trigger--open", p && "ds-select-v2__trigger--error", !$ && "ds-select-v2__trigger--placeholder"].filter(Boolean).join(" ");
  return a.createElement(
    "div",
    { className: ["ds-select-v2", s].filter(Boolean).join(" "), ref: g },
    t && a.createElement(r.Label, { variant: "field", htmlFor: E, required: M }, t),
    a.createElement(
      r.FieldTrigger,
      { ref: f, id: E, role: "combobox", "aria-haspopup": "listbox", "aria-expanded": m ? "true" : "false", "aria-controls": m ? _ : void 0, "aria-invalid": p ? "true" : void 0, "aria-describedby": B, className: T, disabled: i, onClick: () => y((C) => !C), onKeyDown: w, ...v },
      a.createElement("span", { className: "ds-select-v2__value" }, $ ? $.label : d),
      a.createElement(r.Icon, { name: "chevron-down", size: 16, strokeWidth: 2.25, className: "ds-select-v2__chevron" })
    ),
    L && a.createElement(
      "div",
      { ref: u, id: _, className: "ds-menu-v2 ds-select-v2__panel", role: "listbox", "aria-label": typeof t == "string" ? t : void 0, onKeyDown: H },
      c.map((C) => {
        const P = C.value === h;
        return a.createElement(r.MenuItem, { key: String(C.value), role: "option", tabIndex: -1, "aria-selected": P ? "true" : "false", selected: P, check: P, icon: !0, label: C.label, onClick: () => A(C.value) });
      })
    ),
    (p || n) && a.createElement(r.HelpText, { field: !0, tone: p ? "error" : "default", id: B, role: p ? "alert" : void 0 }, p || n)
  );
}
Object.assign(r, { Select: U0 });
const G0 = 400, X0 = 80, Q0 = ({ down: t }) => /* @__PURE__ */ a.createElement("svg", { viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" }, /* @__PURE__ */ a.createElement("path", { d: t ? "M2.5 4.5 6 8l3.5-3.5" : "M2.5 7.5 6 4l3.5 3.5" }));
function J0({ dir: t = 1, label: e, disabled: h = !1, onStep: d, className: c = "", ...l }) {
  const n = a.useRef({ t: null, i: null }), p = () => {
    clearTimeout(n.current.t), clearInterval(n.current.i), n.current.t = n.current.i = null;
  };
  a.useEffect(() => p, []);
  const M = (i) => {
    h || i.button != null && i.button !== 0 || (i.preventDefault(), p(), d && d(t), n.current.t = setTimeout(() => {
      n.current.i = setInterval(() => d && d(t), X0);
    }, G0), window.addEventListener("pointerup", p, { once: !0 }), window.addEventListener("pointercancel", p, { once: !0 }));
  };
  return a.createElement(
    "button",
    { type: "button", className: ["ds-numstep__btn", c].filter(Boolean).join(" "), "aria-label": e, tabIndex: -1, disabled: h, onPointerDown: M, onMouseDown: (i) => i.preventDefault(), onClick: (i) => {
      i.detail === 0 && d && d(t);
    }, ...l },
    a.createElement(Q0, { down: t < 0 })
  );
}
Object.assign(r, { SpinButton: J0 });
const J1 = (t) => {
  const e = parseFloat(String(t).replace(",", "."));
  return Number.isFinite(e) ? e : null;
}, n2 = (t) => {
  const e = String(t), h = e.indexOf(".");
  return h < 0 ? 0 : e.length - h - 1;
};
function at({ label: t, value: e, defaultValue: h, onChange: d, min: c = -1 / 0, max: l = 1 / 0, step: n = 1, unit: p, help: M, error: i, required: o, disabled: s = !1, readOnly: v = !1, size: m = "md", id: y, incrementLabel: g = "Increase", decrementLabel: u = "Decrease", "aria-label": f, className: L = "", ...z }) {
  const E = a.useId(), _ = y || E, B = e !== void 0, [$, A] = a.useState(h === void 0 ? null : h), w = B ? e : $, [H, T] = a.useState(w == null ? "" : String(w)), C = a.useRef(w), P = a.useRef(H), q = a.useRef({});
  C.current = w, P.current = H, q.current = { onChange: d, isCtl: B, min: c, max: l, step: n }, a.useEffect(() => {
    T((V) => J1(V) === w ? V : w == null ? "" : String(w));
  }, [w]);
  const h1 = (V) => {
    const { onChange: R, isCtl: F, min: l1, max: O, step: j } = q.current, v1 = Math.max(n2(j), n2(V)), G = Number(Math.min(O, Math.max(l1, V)).toFixed(Math.min(v1, 8)));
    return F || A(G), C.current = G, P.current = String(G), T(String(G)), G !== w && R && R(G), G;
  }, e1 = (V, R) => {
    const { step: F, min: l1, max: O } = q.current, j = J1(P.current) ?? C.current ?? Math.min(O, Math.max(l1, 0));
    return h1(j + V * F * R);
  }, _1 = (V) => {
    if (s || v) return;
    const R = V.key;
    if (R === "ArrowUp" || R === "ArrowDown")
      V.preventDefault(), e1(R === "ArrowUp" ? 1 : -1, V.shiftKey ? 10 : 1);
    else if (R === "PageUp" || R === "PageDown")
      V.preventDefault(), e1(R === "PageUp" ? 1 : -1, 10);
    else if (R === "Home" && Number.isFinite(c))
      V.preventDefault(), h1(c);
    else if (R === "End" && Number.isFinite(l))
      V.preventDefault(), h1(l);
    else if (R === "Enter") {
      const F = J1(H);
      F != null && h1(F);
    }
  }, o1 = (V) => {
    const R = V.target.value.replace(",", ".").replace(c < 0 ? /[^\d.-]/g : /[^\d.]/g, "");
    T(R);
    const F = J1(R);
    F != null && F >= c && F <= l && (B || A(F), C.current = F, F !== w && d && d(F));
  }, p1 = () => {
    const V = J1(H);
    V != null ? h1(V) : T(w == null ? "" : String(w));
  }, m1 = w != null && w >= l, d1 = w != null && w <= c, r1 = ["ds-input__field", `ds-input__field--${m}`, i && "ds-input__field--error", s && "ds-input__field--disabled", v && "ds-input__field--readonly"].filter(Boolean).join(" "), E1 = (V, R, F) => /* @__PURE__ */ a.createElement(r.SpinButton, { dir: V, label: R, disabled: s || v || F, onStep: (l1) => e1(l1, 1) });
  return /* @__PURE__ */ a.createElement("div", { className: ["ds-field", L].filter(Boolean).join(" ") }, t && /* @__PURE__ */ a.createElement(r.Label, { variant: "field", htmlFor: _, required: o }, t), /* @__PURE__ */ a.createElement("div", { className: ["ds-numstep", s && "ds-numstep--disabled"].filter(Boolean).join(" ") }, /* @__PURE__ */ a.createElement("div", { className: r1 }, /* @__PURE__ */ a.createElement(
    "input",
    {
      id: _,
      className: "ds-input__control",
      "data-type": "number",
      type: "text",
      inputMode: n2(n) ? "decimal" : "numeric",
      autoComplete: "off",
      role: "spinbutton",
      "aria-label": f,
      "aria-valuemin": Number.isFinite(c) ? c : void 0,
      "aria-valuemax": Number.isFinite(l) ? l : void 0,
      "aria-valuenow": w ?? void 0,
      "aria-valuetext": w == null ? void 0 : p ? `${w} ${p}` : void 0,
      "aria-invalid": !!i || void 0,
      "aria-required": o || void 0,
      disabled: s,
      readOnly: v,
      value: H,
      onChange: o1,
      onKeyDown: _1,
      onBlur: p1,
      ...z
    }
  ), p && /* @__PURE__ */ a.createElement("span", { className: "ds-input__affix" }, p)), /* @__PURE__ */ a.createElement("div", { className: "ds-numstep__spin" }, E1(1, g, m1), E1(-1, u, d1))), (i || M) && /* @__PURE__ */ a.createElement(r.HelpText, { tone: i ? "error" : "default", tight: !0 }, i || M));
}
Object.assign(r, { NumberStepper: at });
function tt({ label: t, hint: e, active: h = !1, disabled: d = !1, onChange: c, className: l = "", ...n }) {
  const p = e ? "tg-" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, "") : void 0, M = t && a.createElement("span", { className: "ds-toggle-v2__label" }, t);
  return a.createElement(
    "label",
    { className: ["ds-toggle-v2", e && "ds-toggle-v2--hint", d && "ds-toggle-v2--disabled", l].filter(Boolean).join(" ") },
    e ? a.createElement("span", { className: "ds-toggle-v2__text" }, M, a.createElement("span", { id: p, className: "ds-toggle-v2__hint" }, e)) : M,
    a.createElement(
      "button",
      { type: "button", role: "switch", "aria-checked": h ? "true" : "false", "aria-describedby": p, disabled: d, className: ["ds-toggle-v2__track", h && "ds-toggle-v2__track--on"].filter(Boolean).join(" "), onClick: () => c && c(!h), ...n },
      a.createElement("span", { className: "ds-toggle-v2__thumb", "aria-hidden": "true" })
    )
  );
}
Object.assign(r, { Toggle: tt });
function j2() {
  return j2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, j2.apply(null, arguments);
}
function et({
  items: t = [],
  type: e = "chevron",
  className: h = "",
  ...d
}) {
  const c = e === "slash" ? /* @__PURE__ */ a.createElement(r.Separator, null, "/") : /* @__PURE__ */ a.createElement(r.Separator, null, /* @__PURE__ */ a.createElement(r.Icon, { name: "chevron-right", size: "sm", style: { display: "block" } }));
  return /* @__PURE__ */ a.createElement("nav", j2({
    className: ["ds-breadcrumb", h].filter(Boolean).join(" "),
    "aria-label": "Breadcrumb"
  }, d), t.map((l, n) => /* @__PURE__ */ a.createElement(a.Fragment, {
    key: n
  }, n > 0 && c, n === t.length - 1 ? /* @__PURE__ */ a.createElement("span", {
    className: "ds-breadcrumb__current",
    "aria-current": "page"
  }, l.label) : /* @__PURE__ */ a.createElement(z1.Link, {
    quiet: !0,
    href: l.href || "#"
  }, l.label))));
}
Object.assign(r, { Breadcrumb: et });
function B2() {
  return B2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, B2.apply(null, arguments);
}
function ht({
  children: t,
  className: e = "",
  ...h
}) {
  return /* @__PURE__ */ a.createElement("div", B2({
    className: ["ds-menu-v2", e].filter(Boolean).join(" "),
    role: "menu"
  }, h), t);
}
Object.assign(r, { Menu: ht });
const { Menu: dt } = r, { usePresence: rt } = r;
function ct(t, e) {
  const h = a.useRef(null), [d, c] = a.useState(null);
  return a.useEffect(() => {
    if (!t) return;
    const l = () => {
      const n = h.current;
      if (!n) return;
      const p = n.getBoundingClientRect();
      c(e === "end" ? { position: "fixed", top: p.bottom + 4, right: window.innerWidth - p.right, zIndex: "var(--z-overlay)" } : { position: "fixed", top: p.bottom + 4, left: p.left, zIndex: "var(--z-overlay)" });
    };
    return l(), window.addEventListener("scroll", l, !0), window.addEventListener("resize", l), () => {
      window.removeEventListener("scroll", l, !0), window.removeEventListener("resize", l);
    };
  }, [t, e]), [h, d];
}
function lt({ trigger: t, align: e = "start", children: h, className: d = "", ...c }) {
  const [l, n] = a.useState(!1), p = a.useRef(null), M = a.useRef(null), [i, o] = ct(l, e), { mounted: s } = rt(l, M);
  return a.useEffect(() => {
    const v = i.current && i.current.querySelector('button, [role="button"]');
    v && (v.setAttribute("aria-haspopup", "menu"), v.setAttribute("aria-expanded", l ? "true" : "false"));
  }, [l]), a.useEffect(() => {
    const v = (y) => {
      p.current && p.current.contains(y.target) || M.current && M.current.contains(y.target) || n(!1);
    }, m = (y) => {
      y.key === "Escape" && n(!1);
    };
    return document.addEventListener("mousedown", v), document.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", v), document.removeEventListener("keydown", m);
    };
  }, []), /* @__PURE__ */ a.createElement("span", { ref: p, className: d, style: { display: "inline-flex" }, ...c }, /* @__PURE__ */ a.createElement("span", { ref: i, style: { display: "inline-flex" }, onClick: () => n((v) => !v) }, t), s && o && /* @__PURE__ */ a.createElement("div", { ref: M, style: o, onClick: () => n(!1) }, /* @__PURE__ */ a.createElement(dt, null, h)));
}
Object.assign(r, { MenuDropdown: lt });
function $2() {
  return $2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, $2.apply(null, arguments);
}
function nt({
  label: t,
  icon: e,
  trailing: h,
  check: d = !1,
  bare: c = !1,
  selected: l = !1,
  destructive: n = !1,
  disabled: p = !1,
  className: M = "",
  children: i,
  ...o
}) {
  const s = ["ds-menu-item-v2", l && "ds-menu-item--selected", n && "ds-menu-item--destructive", M].filter(Boolean).join(" "), v = c ? [i] : [e && /* @__PURE__ */ a.createElement("span", {
    className: "ds-menu-item-v2__icon"
  }, e), /* @__PURE__ */ a.createElement("span", {
    className: "ds-menu-item-v2__label"
  }, t), h && /* @__PURE__ */ a.createElement("span", {
    className: "ds-menu-item__trailing"
  }, h), d && /* @__PURE__ */ a.createElement("svg", {
    className: "ds-menu-item-v2__check",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /* @__PURE__ */ a.createElement("path", {
    d: "M13.5 4.5 6.5 12 3 8.5"
  }))];
  return /* @__PURE__ */ a.createElement("button", $2({
    type: "button",
    role: "menuitem",
    className: s,
    disabled: p
  }, o), ...v);
}
Object.assign(r, { MenuItem: nt });
function O2() {
  return O2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, O2.apply(null, arguments);
}
function pt({
  icon: t,
  label: e,
  selected: h = !1,
  disabled: d = !1,
  collapsed: c = !1,
  as: l = "button",
  count: n,
  countLabel: p,
  className: M = "",
  ...i
}) {
  const o = l, s = ["ds-nav-item", h && "ds-nav-item--selected", d && "ds-nav-item--disabled", c && "ds-nav-item--collapsed", M].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement(o, O2({
    className: s,
    type: l === "button" ? "button" : void 0,
    "aria-current": h ? "page" : void 0,
    title: c ? e : void 0,
    "aria-label": n != null ? e + ", " + (p || n) : void 0
  }, i), t && /* @__PURE__ */ a.createElement("span", {
    className: "ds-nav-item__icon"
  }, t), !c && /* @__PURE__ */ a.createElement("span", {
    className: "ds-nav-item__label"
  }, e), n != null && /* @__PURE__ */ a.createElement("span", {
    className: "ds-nav-item__count"
  }, /* @__PURE__ */ a.createElement(r.Badge, {
    tone: "neutral",
    size: "sm"
  }, String(n))));
}
Object.assign(r, { NavItem: pt });
function P2() {
  return P2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, P2.apply(null, arguments);
}
function it({
  collapsed: t = !1,
  header: e,
  footer: h,
  children: d,
  className: c = "",
  ...l
}) {
  return /* @__PURE__ */ a.createElement("nav", P2({
    className: ["ds-sidebar", t && "ds-sidebar--collapsed", c].filter(Boolean).join(" ")
  }, l), e && /* @__PURE__ */ a.createElement("div", {
    className: "ds-sidebar__header"
  }, e), /* @__PURE__ */ a.createElement("div", {
    className: "ds-sidebar__content"
  }, d), h && /* @__PURE__ */ a.createElement("div", {
    className: "ds-sidebar__footer"
  }, h));
}
Object.assign(r, { Sidebar: it });
function q2() {
  return q2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, q2.apply(null, arguments);
}
function st({
  label: t,
  collapsed: e = !1,
  children: h,
  className: d = "",
  ...c
}) {
  return /* @__PURE__ */ a.createElement("div", q2({
    className: ["ds-sidebar-group", d].filter(Boolean).join(" ")
  }, c), t && !e && /* @__PURE__ */ a.createElement("span", {
    className: "ds-sidebar-group__label"
  }, t), /* @__PURE__ */ a.createElement("div", {
    className: "ds-sidebar-group__items"
  }, h));
}
Object.assign(r, { SidebarGroup: st });
function D2() {
  return D2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, D2.apply(null, arguments);
}
function ot({
  label: t,
  icon: e,
  count: h,
  selected: d = !1,
  disabled: c = !1,
  onClick: l,
  className: n = "",
  ...p
}) {
  return /* @__PURE__ */ a.createElement("button", D2({
    type: "button",
    role: "tab",
    "aria-selected": d,
    disabled: c,
    onClick: l,
    className: ["ds-tab", d && "ds-tab--selected", n].filter(Boolean).join(" ")
  }, p), e, t, h != null && /* @__PURE__ */ a.createElement(r.Badge, {
    tone: "neutral",
    size: "sm"
  }, String(h)));
}
Object.assign(r, { TabItem: ot });
function Z2() {
  return Z2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, Z2.apply(null, arguments);
}
function Mt({
  items: t = [],
  options: e,
  value: h,
  onChange: d,
  className: c = "",
  ...l
}) {
  const n = e || t, p = a.useRef(null), [M, i] = a.useState(null);
  return a.useLayoutEffect(() => {
    const o = p.current;
    if (!o) return;
    const s = o.querySelector('[data-selected="true"]');
    s && i({
      left: s.offsetLeft,
      width: s.offsetWidth
    });
  }, [h, n]), /* @__PURE__ */ a.createElement("div", Z2({
    className: ["ds-tabs", c].filter(Boolean).join(" "),
    role: "tablist",
    ref: p
  }, l), n.map((o) => /* @__PURE__ */ a.createElement(r.TabItem, {
    key: o.value,
    selected: o.value === h,
    "data-selected": o.value === h,
    disabled: o.disabled,
    icon: o.icon,
    label: o.label,
    count: o.count,
    onClick: () => d && d(o.value)
  })), M && /* @__PURE__ */ a.createElement(r.SlideIndicator, {
    box: M,
    variant: "underline",
    animate: !0
  }));
}
Object.assign(r, { Tabs: Mt });
const { usePresence: mt } = r;
function Aa(t, e, h, d) {
  const { mounted: c } = mt(t, e, { kind: h });
  return a.useLayoutEffect(() => {
    const l = e.current;
    if (c && l && !l.open)
      try {
        l.showModal();
      } catch {
        l.setAttribute("open", "");
      }
  }, [c]), a.useEffect(() => {
    const l = e.current;
    if (!l) return;
    const n = (M) => {
      M.preventDefault(), d && d();
    }, p = (M) => {
      M.target === l && d && d();
    };
    return l.addEventListener("cancel", n), l.addEventListener("click", p), () => {
      l.removeEventListener("cancel", n), l.removeEventListener("click", p);
    };
  }, [c, d]), c;
}
function Na({ onClose: t, block: e }) {
  return a.createElement(
    "div",
    { className: `ds-${e}-v2__close` },
    a.createElement(
      r.Button,
      { variant: "ghost", size: "sm", "aria-label": "Close", onClick: t },
      a.createElement(r.Icon, { name: "x", size: 16, style: { display: "block" } })
    )
  );
}
function ut({ open: t = !0, size: e = "md", title: h, description: d, footer: c, onClose: l, children: n, className: p = "", ...M }) {
  const i = a.useRef(null), o = "dlg-" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, "");
  return Aa(t, i, "pop", l) ? a.createElement(
    "dialog",
    { ref: i, className: ["ds-dialog-v2", `ds-dialog-v2--${e}`, p].filter(Boolean).join(" "), "aria-labelledby": h ? o : void 0, ...M },
    a.createElement(
      "div",
      { className: "ds-dialog-v2__panel" },
      (h || d || l) && a.createElement(
        "div",
        { className: "ds-dialog-v2__header" },
        a.createElement(
          "div",
          { className: "ds-dialog-v2__text-stack" },
          h && a.createElement("h2", { id: o, className: "ds-dialog-v2__title" }, h),
          d && a.createElement("p", { className: "ds-dialog-v2__description" }, d)
        ),
        l && a.createElement(Na, { onClose: l, block: "dialog" })
      ),
      n && a.createElement("div", { className: "ds-dialog-v2__body" }, n),
      c && a.createElement("div", { className: "ds-dialog-v2__footer" }, c)
    )
  ) : null;
}
Object.assign(r, { Dialog: ut, useModal: Aa, CloseButton: Na });
function vt({ open: t = !0, size: e = "md", side: h = "right", title: d, description: c, footer: l, onClose: n, children: p, className: M = "", ...i }) {
  const o = a.useRef(null), s = "drw-" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, "");
  return r.useModal(t, o, h === "left" ? "slide-left" : "slide", n) ? a.createElement(
    "dialog",
    { ref: o, className: ["ds-drawer-v2", `ds-drawer-v2--${e}`, h === "left" && "ds-drawer-v2--left", M].filter(Boolean).join(" "), "aria-labelledby": d ? s : void 0, ...i },
    a.createElement(
      "div",
      { className: "ds-drawer-v2__panel" },
      (d || c || n) && a.createElement(
        "div",
        { className: "ds-drawer-v2__header" },
        a.createElement(
          "div",
          { className: "ds-drawer-v2__text-stack" },
          d && a.createElement("h2", { id: s, className: "ds-drawer-v2__title" }, d),
          c && a.createElement("p", { className: "ds-drawer-v2__description" }, c)
        ),
        n && a.createElement(r.CloseButton, { onClose: n, block: "drawer" })
      ),
      a.createElement("div", { className: "ds-drawer-v2__body" }, p),
      l && a.createElement("div", { className: "ds-drawer-v2__footer" }, l)
    )
  ) : null;
}
Object.assign(r, { Drawer: vt });
const { closeWithMotion: yt, openWithMotion: xt } = r;
function ft() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function h2(t, e) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || e;
  } catch {
    return e;
  }
}
function gt(t, e) {
  const h = h2(t, e);
  return h.slice(-2) === "ms" ? parseFloat(h) : h.slice(-1) === "s" ? parseFloat(h) * 1e3 : parseFloat(h) || parseFloat(e);
}
function La(t) {
  if (!t) return () => {
  };
  const e = () => t.querySelector('[role="tooltip"]');
  let h = !1, d = !1, c = !1;
  const l = () => t.hasAttribute("data-pinnable");
  l() && !t.hasAttribute("data-motion") && t.setAttribute("data-motion", "");
  const n = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', p = () => {
    const u = Array.from(t.children).filter((f) => f.getAttribute("role") !== "tooltip");
    return u.map((f) => f.matches(n) ? f : f.querySelector(n)).find(Boolean) || u[0] || null;
  }, M = () => {
    if (!l()) return;
    const u = p();
    u && u.setAttribute("aria-expanded", c ? "true" : "false"), c ? t.setAttribute("data-pinned", "") : t.removeAttribute("data-pinned");
  }, i = (u) => {
    const f = u && u.__afiClose;
    f && f.done && (u.getAnimations().forEach((L) => {
      try {
        L.cancel();
      } catch {
      }
    }), u.removeAttribute("data-state"), u.removeAttribute("data-motion-js"), delete u.__afiClose);
  }, o = () => {
    const u = e();
    if (!u) return;
    if (!t.hasAttribute("data-open") && !u.__afiClose && W2(t), i(u), u.__afiClose) {
      t.setAttribute("data-open", ""), xt(u);
      return;
    }
    if (t.hasAttribute("data-open") || (t.setAttribute("data-open", ""), ft() || !u.animate)) return;
    const f = parseFloat(h2("--dimension-1", "4px")) || 4, L = (parseFloat(h2("--motion-reveal-blur-light", "4px")) || 4) / 2;
    u.animate(
      [{ opacity: 0, translate: "0 " + f + "px", scale: ".96", filter: "blur(" + L + "px)" }, { opacity: 1, translate: "0 0", scale: "1", filter: "blur(0px)" }],
      { duration: gt("--mo-dur-out", "400ms"), easing: h2("--mo-ease-out-spring", "cubic-bezier(.34,1.35,.5,1)"), fill: "backwards" }
    );
  }, s = () => {
    const u = e();
    !u || !t.hasAttribute("data-open") || u.__afiClose || yt(u, { kind: "pop", onDone: () => {
      h || d || c || t.removeAttribute("data-open");
    } });
  }, v = () => {
    h || d || c ? o() : s();
  }, m = () => {
    c = !1, M();
  }, y = (u, f, L) => {
    const z = L || t;
    return z.addEventListener(u, f), () => z.removeEventListener(u, f);
  }, g = [
    y("mouseenter", () => {
      h = !0, v();
    }),
    y("mouseleave", () => {
      h = !1, v();
    }),
    y("focusin", () => {
      d = !0, v();
    }),
    y("focusout", (u) => {
      t.contains(u.relatedTarget) || (d = !1, v());
    }),
    y("keydown", (u) => {
      u.key === "Escape" && (h || d || c || t.hasAttribute("data-open")) && (h = !1, d = !1, m(), v());
    }),
    y("click", (u) => {
      !l() || u.target.closest && u.target.closest('[role="tooltip"]') || (c = !c, M(), v());
    }),
    y("click", (u) => {
      c && !t.contains(u.target) && (m(), v());
    }, document),
    y("keydown", (u) => {
      u.key === "Escape" && c && (h = !1, d = !1, m(), v());
    }, document)
  ];
  return M(), () => {
    if (g.forEach((u) => u()), l()) {
      const u = p();
      u && u.removeAttribute("aria-expanded"), t.removeAttribute("data-pinned");
    }
  };
}
function W2(t) {
  if (!t) return;
  const e = t.querySelector('[role="tooltip"]');
  if (!e || (t.getAttribute("data-placement") || "auto") !== "auto") return;
  const h = t.getBoundingClientRect(), d = document.documentElement.clientWidth, c = window.innerHeight, l = 8, n = 8, p = e.offsetWidth, M = e.offsetHeight, i = { top: h.top - n - l, bottom: c - h.bottom - n - l, right: d - h.right - n - l, left: h.left - n - l }, o = { top: M, bottom: M, right: p, left: p }, s = ["top", "bottom", "right", "left"].find((m) => i[m] >= o[m]) || Object.keys(i).sort((m, y) => i[y] - i[m])[0];
  let v = 0;
  if (s === "top" || s === "bottom") {
    const m = h.left + h.width / 2, y = m - p / 2;
    v = Math.max(l, Math.min(d - l - p, y)) - y;
  } else {
    const m = h.top + h.height / 2, y = m - M / 2;
    v = Math.max(l, Math.min(c - l - M, y)) - y;
  }
  e.className = e.className.replace(/(ds-tooltip(?:-v2)?__pop--)(top|bottom|left|right)/, "$1" + s), e.style.setProperty("--tip-shift", Math.round(v) + "px");
}
function bt({ content: t, placement: e = "auto", shortcut: h, motion: d = !1, pinnable: c = !1, children: l, className: n = "", ...p }) {
  const M = a.useRef(null), i = d || c;
  a.useEffect(() => i ? La(M.current) : void 0, [i, c]);
  const o = () => W2(M.current);
  return a.createElement(
    "span",
    { ref: M, "data-motion": i ? "" : void 0, "data-pinnable": c ? "" : void 0, "data-placement": e, onMouseEnter: o, onFocus: o, className: ["ds-tooltip-v2", n].filter(Boolean).join(" "), ...p },
    l,
    a.createElement("span", { role: "tooltip", className: `ds-tooltip-v2__pop ds-tooltip-v2__pop--${e === "auto" ? "top" : e}` }, t, h && a.createElement("span", { className: "ds-tooltip-v2__kbd ds-tooltip__kbd" }, h))
  );
}
Object.assign(r, { Tooltip: bt, tooltipMotion: La, placeTooltip: W2 });
function wt({ kind: t = "text", align: e, truncate: h = !1, children: d, className: c = "", ...l }) {
  const n = e || (t === "numeric" || t === "monetary" || t === "action" ? "end" : t === "boolean" ? "center" : "start"), p = typeof d == "string" || typeof d == "number";
  return a.createElement(
    "td",
    { className: ["ds-table-v2__td", `ds-table-v2__td--${n}`, `ds-table-v2__td--${t}`, c].filter(Boolean).join(" "), ...l },
    p || h ? a.createElement("span", { className: "ds-table-v2__cell-text" }, d) : d
  );
}
Object.assign(r, { TableCell: wt });
function _t({ label: t, kind: e = "text", align: h, sortable: d = !1, sort: c, onSort: l, className: n = "", children: p, ...M }) {
  const i = h || (e === "numeric" || e === "monetary" || e === "action" ? "end" : e === "boolean" ? "center" : "start"), o = a.createElement(
    "span",
    { className: "ds-table-v2__th-inner" },
    a.createElement("span", { className: "ds-table-v2__th-label" }, t, p),
    d && a.createElement(
      "span",
      { className: "ds-table-v2__sort", "aria-hidden": "true" },
      a.createElement(r.Icon, { name: c === "desc" ? "chevron-down" : "chevron-up", size: "sm", className: ["ds-table-v2__sort-icon", c ? "" : "ds-table-v2__sort-icon--hint"].filter(Boolean).join(" ") })
    )
  );
  return a.createElement(
    "th",
    { scope: "col", className: ["ds-table-v2__th", `ds-table-v2__th--${i}`, `ds-table-v2__th--${e}`, n].filter(Boolean).join(" "), "aria-sort": c ? c === "desc" ? "descending" : "ascending" : void 0, ...M },
    d ? a.createElement("button", { type: "button", className: "ds-table-v2__sort-trigger", onClick: l }, o) : o
  );
}
Object.assign(r, { TableHeaderCell: _t });
function T2() {
  return T2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, T2.apply(null, arguments);
}
function Et({
  children: t,
  className: e = "",
  ...h
}) {
  return /* @__PURE__ */ a.createElement("tr", T2({
    className: ["ds-table-v2__head-row", e].filter(Boolean).join(" ")
  }, h), t);
}
Object.assign(r, { TableHeaderRow: Et });
function Ht({ selected: t = !1, hoverable: e = !0, highlighted: h = !1, clickable: d = !1, onClick: c, children: l, className: n = "", style: p, ...M }) {
  const i = d ? (o) => {
    if (c && c(o), o.target.closest && o.target.closest("button,a,input,select,textarea,[role=button]")) return;
    const s = o.currentTarget.querySelector("[data-row-action]:not(:disabled)");
    s && s.click();
  } : c;
  return a.createElement("tr", { className: ["ds-table-v2__row", e && !h && "ds-table-v2__row--hoverable", t && "ds-table-v2__row--selected", h && "ds-table-v2__row--highlighted", d && "ds-table-v2__row--clickable", n].filter(Boolean).join(" "), "aria-selected": t || void 0, style: p, onClick: i, ...M }, l);
}
Object.assign(r, { TableRow: Ht });
function Vt({ density: t = "default", quiet: e = !1, children: h, className: d = "", ...c }) {
  return a.createElement(
    "div",
    { className: ["ds-table-v2__scroll", "ds-table-v2__scroll--subtle", "ds-table-v2__scroll--raised", e && "ds-table-v2__scroll--quiet", d].filter(Boolean).join(" "), ...c },
    a.createElement("table", { className: `ds-table-v2__table ds-table-v2__table--${t}` }, h)
  );
}
Object.assign(r, { TableShell: Vt });
function d2() {
  return d2 = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var h = arguments[e];
      for (var d in h) ({}).hasOwnProperty.call(h, d) && (t[d] = h[d]);
    }
    return t;
  }, d2.apply(null, arguments);
}
function kt({
  columns: t = [],
  rows: e = [],
  density: h = "default",
  selectable: d = !1,
  selected: c = [],
  onSelect: l,
  onSelectAll: n,
  sort: p,
  onSort: M,
  hoverable: i = !0,
  quietActions: o = !1,
  rowClick: s = !1,
  empty: v = "No results",
  mobile: m = "scroll",
  className: y = "",
  ...g
}) {
  const [u, f] = a.useState(() => m === "cards" && !!(window.matchMedia && window.matchMedia("(max-width: 560px)").matches));
  a.useEffect(() => {
    if (m !== "cards" || !window.matchMedia) return;
    const _ = window.matchMedia("(max-width: 560px)"), B = () => f(_.matches);
    return _.addEventListener && _.addEventListener("change", B), () => _.removeEventListener && _.removeEventListener("change", B);
  }, [m]);
  const L = (_, B) => _.id ?? B, z = e.length > 0 && e.every((_, B) => c.includes(L(_, B))), E = c.length > 0 && !z;
  if (m === "cards" && u) {
    const _ = t.filter((H) => H.kind !== "action"), B = t.filter((H) => H.kind === "action"), $ = _[0], A = _.slice(1), w = (H, T) => H.render ? H.render(T) : T[H.key];
    return a.createElement(
      "div",
      d2({ className: ["ds-table-cards", y].filter(Boolean).join(" "), role: "list" }, g),
      e.length === 0 ? a.createElement("p", { className: "ds-table-cards__empty" }, v) : e.map((H, T) => {
        const C = L(H, T), P = c.includes(C);
        return a.createElement(
          r.Card,
          { key: C, as: "div", role: "listitem", className: ["ds-table-card", H.highlighted && "ds-table-card--highlighted", P && "ds-table-card--selected"].filter(Boolean).join(" ") },
          a.createElement(
            "div",
            { className: "ds-table-card__head" },
            d && a.createElement(r.Checkbox, { checked: P, onChange: () => l && l(C) }),
            a.createElement("div", { className: "ds-table-card__title" }, $ && w($, H))
          ),
          A.length > 0 && a.createElement("dl", { className: "ds-table-card__list" }, A.map((q) => a.createElement("div", { key: q.key, className: "ds-table-card__row" }, a.createElement("dt", null, q.label), a.createElement("dd", null, w(q, H))))),
          B.length > 0 && a.createElement("div", { className: "ds-table-card__actions" }, B.map((q) => a.createElement(a.Fragment, { key: q.key }, w(q, H))))
        );
      })
    );
  }
  return /* @__PURE__ */ a.createElement(r.TableShell, d2({
    density: h,
    quiet: o,
    className: y
  }, g), /* @__PURE__ */ a.createElement("thead", null, /* @__PURE__ */ a.createElement(r.TableHeaderRow, null, d && /* @__PURE__ */ a.createElement(r.TableHeaderCell, {
    className: "ds-table-v2__th-select",
    kind: "boolean",
    label: /* @__PURE__ */ a.createElement(r.Checkbox, {
      checked: z,
      indeterminate: E,
      onChange: () => n && n()
    })
  }), t.map((_) => /* @__PURE__ */ a.createElement(r.TableHeaderCell, {
    key: _.key,
    label: _.label,
    kind: _.kind,
    align: _.align,
    sortable: _.sortable,
    sort: p && p.key === _.key ? p.dir : void 0,
    onSort: () => M && M(_.key),
    style: _.width ? {
      width: _.width
    } : void 0
  })))), /* @__PURE__ */ a.createElement("tbody", null, e.length === 0 && /* @__PURE__ */ a.createElement("tr", null, /* @__PURE__ */ a.createElement("td", {
    className: "ds-table-v2__empty",
    colSpan: t.length + (d ? 1 : 0)
  }, v)), e.map((_, B) => {
    const $ = L(_, B), A = c.includes($);
    return /* @__PURE__ */ a.createElement(r.TableRow, {
      key: $,
      selected: A,
      hoverable: i,
      clickable: s,
      highlighted: !!_.highlighted
    }, d && /* @__PURE__ */ a.createElement(r.TableCell, {
      className: "ds-table-v2__td-select",
      kind: "boolean"
    }, /* @__PURE__ */ a.createElement(r.Checkbox, {
      checked: A,
      onChange: () => l && l($)
    })), t.map((w) => /* @__PURE__ */ a.createElement(r.TableCell, {
      key: w.key,
      kind: w.kind,
      align: w.align
    }, w.render ? w.render(_) : _[w.key])));
  })));
}
Object.assign(r, { Table: kt });
function At({ title: t, info: e, onInfoClick: h, onMenuClick: d, menuLabel: c = "More options", value: l, unit: n, delta: p, deltaLabel: M, deltaTone: i = "good", percent: o = 0, ticks: s, summary: v, onSummaryClick: m, className: y = "", ...g }) {
  const u = Math.max(0, Math.min(100, Number(o) || 0)), f = `${String(Math.round(u * 10) / 10).replace(".", ",")} %`, L = s != null ? Math.max(0, Math.floor(s * (100 - u) / 100)) : 0;
  return /* @__PURE__ */ a.createElement(r.Card, { variant: "metric", className: ["ds-meter-card", y].filter(Boolean).join(" "), ...g }, /* @__PURE__ */ a.createElement("div", { className: "ds-meter-card__top" }, /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__title", title: typeof t == "string" ? t : void 0 }, t), (e || d) && /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__actions" }, e && /* @__PURE__ */ a.createElement(r.IconButton, { variant: "ghost", size: "sm", label: e, onClick: h }, /* @__PURE__ */ a.createElement(r.Icon, { name: "info", size: "sm" })), d && /* @__PURE__ */ a.createElement(r.IconButton, { variant: "ghost", size: "sm", label: c, onClick: d }, /* @__PURE__ */ a.createElement(r.Icon, { name: "ellipsis", size: "sm" })))), /* @__PURE__ */ a.createElement("div", { className: "ds-meter-card__figure" }, /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__value" }, l, n && /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__unit" }, n)), (p || M) && /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__delta" }, p && /* @__PURE__ */ a.createElement("span", { className: `ds-meter-card__delta-value ds-meter-card__delta-value--${i}` }, p), M && /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__delta-label" }, M))), /* @__PURE__ */ a.createElement("div", { className: "ds-meter-card__meter", role: "meter", "aria-label": typeof t == "string" ? t : void 0, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": u, "aria-valuetext": f }, /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__max", "aria-hidden": "true" }, "100 %"), /* @__PURE__ */ a.createElement("div", { className: "ds-meter-card__bar", "aria-hidden": "true" }, /* @__PURE__ */ a.createElement("div", { className: "ds-meter-card__fill", style: { inlineSize: `${u}%` } }, u >= 15 && /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__fill-label" }, f)), /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__marker" }), /* @__PURE__ */ a.createElement("div", { className: ["ds-meter-card__track", s != null && "ds-meter-card__track--counted"].filter(Boolean).join(" ") }, Array.from({ length: L }, (z, E) => /* @__PURE__ */ a.createElement("span", { key: E, className: "ds-meter-card__tick" }))))), v && (m ? /* @__PURE__ */ a.createElement(r.PlainButton, { type: "button", className: "ds-meter-card__summary", onClick: m }, /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__summary-text" }, v), /* @__PURE__ */ a.createElement(r.Icon, { name: "chevron-right", size: "sm" })) : /* @__PURE__ */ a.createElement("div", { className: "ds-meter-card__summary ds-meter-card__summary--static" }, /* @__PURE__ */ a.createElement("span", { className: "ds-meter-card__summary-text" }, v))));
}
Object.assign(r, { MeterCard: At });
const p2 = (t) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(t);
function Nt({ title: t, value: e, unit: h, delta: d, direction: c, tone: l = "good", period: n, onPeriodClick: p, sub: M, series: i = [], point: o, chartLabel: s, className: v = "", ...m }) {
  var y, g;
  const u = "ds-kpi-" + a.useId().replace(/[^A-Za-z0-9_-]/g, ""), f = i.length, L = c ?? (typeof d == "string" && d.trim().startsWith("-") ? "down" : "up"), z = f ? Math.max(0, Math.min(f - 1, (y = o == null ? void 0 : o.index) != null ? y : f - 1)) : 0, E = Math.min(...i), _ = Math.max(...i), B = (C) => f > 1 ? 2 + C / (f - 1) * 94 : 50, $ = (C) => 30 + (1 - (C - E) / (_ - E || 1)) * 60, A = i.map((C, P) => `${P ? "L" : "M"}${B(P)} ${$(C)}`).join(" "), w = s ?? (f ? `${typeof t == "string" ? t + ": " : ""}trend of ${f} values, starts at ${p2(i[0])} and ends at ${p2(i[f - 1])}; punto marcado ${(g = o == null ? void 0 : o.label) != null ? g : p2(i[z])}${o != null && o.date ? " (" + o.date + ")" : ""}.` : void 0), H = typeof M == "string" ? /^([+\-−]?[\d.,]+(?:\s?(?:%|€|kWh|kg|t)(?![\wá-ú]))?)(.*)$/.exec(M) : null, T = { insetInlineStart: `${B(z)}%`, insetBlockStart: `${$(i[z])}%` };
  return /* @__PURE__ */ a.createElement(r.Card, { variant: "metric", className: ["ds-kpi-trend-card", `ds-kpi-trend-card--${l}`, f > 0 && "ds-kpi-trend-card--chart", v].filter(Boolean).join(" "), ...m }, f > 0 && /* @__PURE__ */ a.createElement("div", { className: "ds-kpi-trend-card__chart", role: "img", "aria-label": w }, /* @__PURE__ */ a.createElement(r.Sparkline, { d: A, from: B(0), to: B(f - 1), gid: u, tone: l }), /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__guide", style: T, "aria-hidden": "true" }), /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__point", style: T, "aria-hidden": "true" }), o && (o.label || o.date) && /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__tip", style: T, "aria-hidden": "true" }, o.label && /* @__PURE__ */ a.createElement("strong", null, o.label), o.date && /* @__PURE__ */ a.createElement("span", null, o.date))), /* @__PURE__ */ a.createElement("div", { className: "ds-kpi-trend-card__top" }, /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__title", title: typeof t == "string" ? t : void 0 }, t), (d || n) && /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__meta" }, d && /* @__PURE__ */ a.createElement(r.Badge, { tone: l === "bad" ? "critical" : "success", dot: !1, className: "ds-kpi-trend-card__delta" }, /* @__PURE__ */ a.createElement(r.Icon, { name: L === "down" ? "arrow-down-right" : "arrow-up-right", size: 14 }), d), n && (p ? /* @__PURE__ */ a.createElement(r.PlainButton, { type: "button", className: "ds-kpi-trend-card__period", onClick: p, "aria-haspopup": "listbox" }, /* @__PURE__ */ a.createElement("span", null, n), /* @__PURE__ */ a.createElement(r.Icon, { name: "chevron-down", size: 14 })) : /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__period" }, n)))), /* @__PURE__ */ a.createElement("div", { className: "ds-kpi-trend-card__figure" }, /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__value" }, e, h && /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__unit" }, h)), M && /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__sub" }, H ? /* @__PURE__ */ a.createElement(a.Fragment, null, /* @__PURE__ */ a.createElement("span", { className: "ds-kpi-trend-card__sub-figure" }, H[1]), H[2]) : M)));
}
Object.assign(r, { KpiTrendCard: Nt });
const Lt = a.createContext({ on: !1, loop: !1 });
Object.assign(r, { MediaCardContext: Lt });
function zt({ variant: t = "primary", size: e = "sm", className: h = "", children: d, ...c }) {
  return a.createElement("span", { className: ["ds-btn", `ds-btn--${t}`, `ds-btn--${e}`, h].filter(Boolean).join(" "), ...c }, d);
}
Object.assign(r, { ButtonFace: zt });
function Ct({ title: t, subtitle: e, caption: h, action: d, actionStyle: c = "pill", media: l, layout: n = "vertical", loop: p = !1, as: M = "button", href: i, className: o = "", onPointerEnter: s, onPointerLeave: v, onFocus: m, onBlur: y, ...g }) {
  const u = a.useId(), [f, L] = a.useState(!1), [z, E] = a.useState(!1), _ = f || z, B = a.useMemo(() => ({ on: _, loop: !!p }), [_, p]), $ = { t: u + "t", s: u + "s", c: u + "c", a: u + "a" }, A = {
    className: ["ds-media-card", n === "horizontal" && "ds-media-card--horizontal", o].filter(Boolean).join(" "),
    "aria-labelledby": d != null ? $.t + " " + $.a : $.t,
    "aria-describedby": [e != null && $.s, h != null && $.c].filter(Boolean).join(" ") || void 0,
    onPointerEnter: (w) => {
      w.pointerType !== "touch" && L(!0), s && s(w);
    },
    onPointerLeave: (w) => {
      L(!1), v && v(w);
    },
    onFocus: (w) => {
      try {
        E(w.currentTarget.matches(":focus-visible"));
      } catch {
        E(!0);
      }
      m && m(w);
    },
    onBlur: (w) => {
      E(!1), y && y(w);
    },
    ...g
  };
  return M === "a" && (A.as = "a", A.href = i), /* @__PURE__ */ a.createElement(r.MediaCardContext.Provider, { value: B }, /* @__PURE__ */ a.createElement(r.PlainButton, { ...A }, /* @__PURE__ */ a.createElement("span", { className: "ds-media-card__head" }, /* @__PURE__ */ a.createElement("span", { className: "ds-media-card__title", id: $.t }, t), e != null && /* @__PURE__ */ a.createElement("span", { className: "ds-media-card__subtitle", id: $.s }, e)), /* @__PURE__ */ a.createElement("span", { className: "ds-media-card__media", "aria-hidden": "true" }, l), /* @__PURE__ */ a.createElement("span", { className: "ds-media-card__foot" }, h != null && /* @__PURE__ */ a.createElement("span", { className: "ds-media-card__caption", id: $.c }, h), d != null && (c === "ghost" ? /* @__PURE__ */ a.createElement(r.ButtonFace, { variant: "ghost", className: "ds-media-card__pill ds-media-card__pill--ghost", id: $.a }, /* @__PURE__ */ a.createElement("span", null, d, /* @__PURE__ */ a.createElement(r.Icon, { name: "arrow-forward", size: 16, strokeWidth: 2.25, className: "ds-media-card__arrow" }))) : /* @__PURE__ */ a.createElement(r.ButtonFace, { className: "ds-media-card__pill", id: $.a }, /* @__PURE__ */ a.createElement("span", null, d))))));
}
Object.assign(r, { MediaCard: Ct });
function St({ show: t = !1, action: e, onAction: h, onClose: d, closeLabel: c = "Close", container: l, className: n = "", children: p, ...M }) {
  const i = a.useRef(null);
  a.useEffect(() => {
    const s = i.current;
    if (!s) return;
    const v = () => {
      s.style.removeProperty("--toast-l"), s.style.removeProperty("--toast-r");
    };
    if (!l) {
      v();
      return;
    }
    const m = () => {
      const g = document.querySelector(l);
      if (!g) {
        v();
        return;
      }
      const u = g.getBoundingClientRect();
      s.style.setProperty("--toast-l", Math.max(0, u.left) + "px"), s.style.setProperty("--toast-r", Math.max(0, window.innerWidth - u.right) + "px");
    };
    m(), window.addEventListener("resize", m);
    let y = null;
    try {
      const g = document.querySelector(l);
      g && typeof ResizeObserver < "u" && (y = new ResizeObserver(m), y.observe(g));
    } catch {
    }
    return () => {
      window.removeEventListener("resize", m), y && y.disconnect();
    };
  }, [l, t]);
  const o = ["ds-toast", t && "ds-toast--show", e && "ds-toast--action", d && "ds-toast--close", n].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement("div", { ref: i, className: o, role: "status", "aria-live": "polite", ...M }, p, e && /* @__PURE__ */ a.createElement(r.PlainButton, { type: "button", className: "ds-toast__action", onClick: h }, e), d && /* @__PURE__ */ a.createElement(r.PlainButton, { type: "button", className: "ds-toast__close", "aria-label": c, onClick: d }, /* @__PURE__ */ a.createElement(r.Icon, { name: "x", size: "sm" })));
}
Object.assign(r, { Toast: St });
const { closeWithMotion: jt, openWithMotion: Bt } = r;
function sa(t, e) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || e;
  } catch {
    return e;
  }
}
function R2(t, e) {
  const h = e && e.lead || 0, d = e && e.outset || 0;
  if (!t || !t.animate || window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const c = getComputedStyle(t), l = t.offsetHeight;
  if (!l) return null;
  const n = { height: l + "px", marginTop: c.marginTop, marginBottom: c.marginBottom, paddingTop: c.paddingTop, paddingBottom: c.paddingBottom, borderTopWidth: c.borderTopWidth, borderBottomWidth: c.borderBottomWidth, opacity: 1, filter: "blur(0px)", transform: "none", overflow: "hidden" }, p = { height: "0px", marginTop: h ? -h + "px" : "0px", marginBottom: "0px", paddingTop: "0px", paddingBottom: "0px", borderTopWidth: "0px", borderBottomWidth: "0px", opacity: 0, filter: "blur(8px)", transform: "translateY(-16px)", overflow: "hidden" };
  d > 0 && (n.overflow = p.overflow = "visible", n.clipPath = p.clipPath = "inset(-" + d + "px -" + d + "px 0 -" + d + "px)");
  const M = parseFloat(sa("--mo-dur-out-spring", "1000ms")) || 1e3;
  return t.animate([p, n], { duration: M, easing: sa("--mo-ease-out-spring", "cubic-bezier(.34,1.35,.5,1)"), fill: "backwards" });
}
function za(t, e) {
  return jt(t, { kind: "fold", onDone: e && e.onDone, gap: e && e.gap });
}
function Y2({ as: t = "div", lead: e = 0, gap: h = 0, outset: d = 0, play: c = !0, open: l = !0, className: n = "", children: p, ...M }) {
  const i = a.useRef(null), [o, s] = a.useState(!!l), v = a.useRef(!0), m = a.useRef(!!l);
  return a.useEffect(() => {
    if (v.current) {
      v.current = !1, c && l && R2(i.current, { lead: e, outset: d });
      return;
    }
    if (l) {
      o ? i.current && i.current.__afiClose && Bt(i.current) : s(!0);
      return;
    }
    o && za(i.current, { gap: h, onDone: () => s(!1) });
  }, [l]), a.useEffect(() => {
    o && !m.current && i.current && c && R2(i.current, { lead: e, outset: d }), m.current = o;
  }, [o]), l || o ? /* @__PURE__ */ a.createElement(t, { ref: i, className: n || void 0, ...M }, p) : null;
}
Y2.springIn = R2;
Y2.foldOut = za;
Object.assign(r, { Reveal: Y2 });
function $t({ className: t = "", children: e, ...h }) {
  const d = typeof e == "string" ? a.createElement("span", { className: "ds-stepper-v2__label" }, e) : e;
  return /* @__PURE__ */ a.createElement("button", { type: "button", className: ["ds-stepper-v2__link", t].filter(Boolean).join(" "), ...h }, d);
}
Object.assign(r, { StepLink: $t });
function Ot() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function oa(t, e) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || e;
  } catch {
    return e;
  }
}
function Ca(t, e, h) {
  if (!t || Ot() || e == null || !(h > e)) return;
  const d = (/ds-stepper-v2/.test(t.className), "ds-stepper-v2"), c = Array.from(t.querySelectorAll("." + d + "__step"));
  if (!c.length || !c[0].animate) return;
  const l = oa("--mo-ease-out-spring", "cubic-bezier(.34,1.35,.5,1)"), n = oa("--mo-ease-out", "cubic-bezier(.16,1,.3,1)"), p = (o, s) => getComputedStyle(o, s), M = (o) => {
    const s = p(o);
    return { backgroundColor: s.backgroundColor, color: s.color, borderColor: s.borderTopColor };
  }, i = (o, s, v) => {
    const m = o.className;
    o.className = d + "__step" + (v ? " " + d + "__step--" + v : "");
    const y = M(s);
    return o.className = m, y;
  };
  c.forEach((o, s) => {
    const v = s + 1, m = o.querySelector("." + d + "__num"), y = v - Math.max(e, 1) - 1, g = Math.max(0, y) * 140;
    if (m) {
      if (v > Math.max(e, 1) && v <= h && v > 1) {
        const u = p(o, "::before").borderTopColor, f = o.className;
        o.className = d + "__step";
        const L = p(o, "::before").borderTopColor;
        o.className = f, o.style.setProperty("--mo-fill", u), o.style.setProperty("--mo-base", L), o.style.setProperty("--mo-delay", g + 60 + "ms"), o.classList.add("is-filling"), setTimeout(() => {
          o.classList.remove("is-filling"), ["--mo-fill", "--mo-base", "--mo-delay"].forEach((z) => o.style.removeProperty(z));
        }, g + 60 + 860);
      }
      if (e >= 1 && v >= e && v < h) {
        const u = M(m), f = i(o, m, "cur");
        m.innerHTML = '<span class="mo-c" style="grid-area:1/1">✓</span><span class="mo-n" style="grid-area:1/1" aria-hidden="true">' + v + "</span>";
        const L = m.querySelector(".mo-c"), z = m.querySelector(".mo-n");
        m.animate([f, u], { duration: 400, easing: n, delay: g }), z.animate([{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }, { opacity: 0, filter: "blur(4px)", transform: "scale(.6)" }], { duration: 300, easing: n, delay: g, fill: "forwards" });
        const E = L.animate([{ opacity: 0, filter: "blur(4px)", transform: "scale(.2) rotate(-28deg)" }, { opacity: 1, filter: "blur(0px)", transform: "none" }], { duration: 1e3, easing: l, delay: g + 60, fill: "backwards" });
        E.onfinish = () => {
          m.querySelector(".mo-c") && (m.textContent = "✓");
        };
      }
      if (v === h) {
        const u = M(m), f = i(o, m, ""), L = u.backgroundColor, z = (g || 0) + 380;
        m.animate([Object.assign({ filter: "blur(3px)" }, f), Object.assign({ filter: "blur(0px)" }, u)], { duration: 800, easing: n, delay: z, fill: "backwards" }), m.animate([{ boxShadow: "0 0 0 0 color-mix(in srgb, " + L + " 45%, transparent)" }, { boxShadow: "0 0 0 7px color-mix(in srgb, " + L + " 0%, transparent)" }], { duration: 800, easing: n, delay: z });
      }
    }
  });
}
function Pt({ steps: t = [], current: e = 1, reached: h = 0, onStep: d, label: c = "Progress", className: l = "", ...n }) {
  const p = a.useRef(null), M = a.useRef(e);
  return a.useEffect(() => {
    M.current !== e && (Ca(p.current, M.current, e), M.current = e);
  }, [e]), /* @__PURE__ */ a.createElement("nav", { "aria-label": c, className: "ds-stepper-nav-v2" }, /* @__PURE__ */ a.createElement("ol", { ref: p, className: ["ds-stepper-v2", l].filter(Boolean).join(" "), ...n }, t.map((i, o) => {
    const s = o + 1, v = s < e ? " ds-stepper-v2__step--done" : s === e ? " ds-stepper-v2__step--cur" : "", m = s !== e && s <= Math.max(h, e - 1), y = [/* @__PURE__ */ a.createElement("span", { key: "n", className: "ds-stepper-v2__num" }, s < e ? "✓" : s), /* @__PURE__ */ a.createElement("span", { key: "l", className: "ds-stepper-v2__label" }, i)];
    return /* @__PURE__ */ a.createElement("li", { key: s, className: "ds-stepper-v2__step" + v, "aria-current": s === e ? "step" : void 0 }, m ? /* @__PURE__ */ a.createElement(r.StepLink, { onClick: () => d && d(s) }, y) : y);
  })));
}
function qt({ progress: t, ...e }) {
  const h = a.createElement(Dt, e);
  return t ? a.createElement(a.Fragment, null, a.createElement(z1.StepProgress, { visible: !!e.compact, ...t }), h) : h;
}
function Dt({ end: t, compact: e, stuck: h = !1, className: d = "", children: c, ...l }) {
  return /* @__PURE__ */ a.createElement("div", { className: ["ds-stepper-bar-v2", h && "ds-stepper-bar--stuck", d].filter(Boolean).join(" "), "data-compact": e === void 0 ? void 0 : e ? "true" : "false", ...l }, c, t ? /* @__PURE__ */ a.createElement("div", { className: "ds-stepper-bar-v2__end" }, t) : null);
}
function Zt() {
  try {
    return window.matchMedia("(max-width: 640px)").matches;
  } catch {
    return !1;
  }
}
const Tt = ".ds-app-header-v2, .ds-app-header-v2, .ds-stepper-bar-v2, .ds-stepper-bar-v2, .ds-step-progress-v2__bar, .ds-step-progress-v2__bar";
function I2(t, e) {
  const h = e || {}, d = t && t.querySelector ? t : document, c = h.target || document.documentElement, l = (m) => d.querySelector(m), n = l(".ds-app-header-v2, .ds-app-header-v2"), p = l(".ds-stepper-bar-v2, .ds-stepper-bar-v2"), M = l(".ds-step-progress-v2__bar, .ds-step-progress-v2__bar"), i = M && M.parentElement, o = n ? n.getBoundingClientRect().height : 0, v = !!M && Zt() && (i && i.getAttribute("data-visible") === "true" || !!p && p.getAttribute("data-compact") === "true") ? M.offsetHeight : p ? p.getBoundingClientRect().height : 0;
  return c.style.setProperty("--hdr-h", o + "px"), c.style.setProperty("--sh-h", o + v + "px"), { hdr: o, bar: v, sh: o + v };
}
function Rt(t, e) {
  const h = e || {}, d = t && t.querySelector ? t : document;
  let c = 0, l = null;
  const n = () => (c && (cancelAnimationFrame(c), c = 0), I2(d, h)), p = () => {
    c || (c = requestAnimationFrame(() => {
      c = 0, I2(d, h);
    }));
  }, M = () => {
    l && l.disconnect(), !(typeof ResizeObserver > "u") && (l = new ResizeObserver(p), d.querySelectorAll(Tt).forEach((s) => l.observe(s)));
  };
  let i = null;
  typeof MutationObserver < "u" && (i = new MutationObserver((s) => {
    s.some((v) => v.type === "childList") && M(), p();
  }), i.observe(d === document ? document.body : d, { subtree: !0, childList: !0, attributes: !0, attributeFilter: ["data-compact", "data-visible"] })), window.addEventListener("resize", p), M(), n();
  const o = () => {
    c && cancelAnimationFrame(c), l && l.disconnect(), i && i.disconnect(), window.removeEventListener("resize", p);
  };
  return o.update = n, o;
}
Object.assign(r, { Stepper: Pt, StepperBar: qt, appBarsOffset: I2, observeAppBars: Rt, stepperAdvance: Ca });
function It({ logo: t, name: e, lead: h, onBrandClick: d, brandLabel: c, brandHref: l, middle: n, end: p, middleAlign: M = "start", mobile: i = "inline", moreLabel: o = "More options", flow: s, stuck: v = !1, className: m = "", ...y }) {
  const [g, u] = a.useState(() => i === "menu" && !!(window.matchMedia && window.matchMedia("(max-width: 640px)").matches));
  a.useEffect(() => {
    if (i !== "menu" || !window.matchMedia) return;
    const A = window.matchMedia("(max-width: 640px)"), w = () => u(A.matches);
    return A.addEventListener && A.addEventListener("change", w), () => A.removeEventListener && A.removeEventListener("change", w);
  }, [i]);
  const f = g && !!(n || p), L = ["ds-app-header-v2", M === "center" && "ds-app-header-v2--center", v && "ds-app-header--stuck", m].filter(Boolean).join(" "), z = t && a.isValidElement(t) ? a.cloneElement(t, { className: [t.props.className, "ds-app-header-v2__logo"].filter(Boolean).join(" "), "aria-hidden": "true" }) : t, E = l ? { as: "a", href: l } : {}, _ = e ? a.createElement("span", { className: "ds-app-header-v2__name" }, e) : null, B = h ? a.createElement("div", { className: "ds-app-header-v2__brand ds-app-header-v2__brand--lead" }, h, h && e ? a.createElement(r.Divider, { orientation: "vertical", fixed: !0, className: "ds-app-header-v2__sep", "aria-hidden": "true" }) : null, _) : t || e ? a.createElement(r.PlainButton, { className: "ds-app-header-v2__brand", "aria-label": c, onClick: d, ...E }, z, t && e ? a.createElement(r.Divider, { orientation: "vertical", fixed: !0, className: "ds-app-header-v2__sep", "aria-hidden": "true" }) : null, _) : null, $ = f ? a.createElement("div", { className: "ds-app-header-v2__end" }, a.createElement(z1.Popover, { align: "end", trigger: a.createElement(r.IconButton, { variant: "ghost", size: "md", label: o }, a.createElement(r.Icon, { name: "ellipsis-vertical", size: "sm" })) }, a.createElement("div", { className: "ds-app-header-v2__more" }, n, p))) : null;
  return /* @__PURE__ */ a.createElement("header", { className: L, ...y }, B, f ? null : n ? a.createElement("div", { className: "ds-app-header-v2__middle" }, n) : null, f ? $ : p ? a.createElement("div", { className: "ds-app-header-v2__end" }, p) : null);
}
Object.assign(r, { AppHeader: It });
function Sa(t, e) {
  const h = e || {}, d = h.on == null ? 80 : h.on, c = h.off == null ? 24 : h.off, l = h.target || window;
  let n = !1;
  const p = () => l === window ? window.scrollY || window.pageYOffset || 0 : l.scrollTop || 0, M = () => {
    const o = p(), s = n ? o > c : o > d;
    s !== n && (n = s, t(n));
  };
  l.addEventListener("scroll", M, { passive: !0 }), M();
  const i = () => l.removeEventListener("scroll", M);
  return i.sync = M, i;
}
function Ft(t) {
  const e = t || {}, [h, d] = a.useState(!1);
  return a.useEffect(() => {
    if (e.enabled === !1) {
      d(!1);
      return;
    }
    return Sa(d, { on: e.on, off: e.off, target: e.target });
  }, [e.enabled, e.on, e.off, e.target]), h;
}
function Wt({ step: t = 1, total: e = 3, title: h, countText: d, visible: c = !1, phoneOnly: l = !0, className: n = "", style: p, ...M }) {
  const i = Math.min(Math.max(t, 1), e), o = ["ds-step-progress-v2", l ? "" : "ds-step-progress--all", n].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.createElement("div", { className: o, "data-visible": c ? "true" : "false", "aria-hidden": "true", style: e === 3 ? p : { "--step-progress-total": e, ...p }, ...M }, /* @__PURE__ */ a.createElement("div", { className: "ds-step-progress-v2__bar" }, /* @__PURE__ */ a.createElement("div", { className: "ds-step-progress-v2__in" }, /* @__PURE__ */ a.createElement("b", { className: "ds-step-progress-v2__name" }, h), /* @__PURE__ */ a.createElement("span", { className: "ds-step-progress-v2__count" }, d || "Step " + i + " of " + e)), /* @__PURE__ */ a.createElement("div", { className: "ds-step-progress-v2__track" }, Array.from({ length: e }, (s, v) => /* @__PURE__ */ a.createElement("i", { key: v, className: v + 1 <= i ? "on" : void 0 })))));
}
Object.assign(r, { StepProgress: Wt, scrollThreshold: Sa, useScrollThreshold: Ft });
function ja({ variant: t, summary: e, empty: h = !1, primary: d, secondary: c, hidden: l = !1, enter: n = !0, phoneOnly: p = !0, label: M = "Actions", className: i = "", children: o, ...s }) {
  const v = t === "pill", m = ["ds-action-bar-v2", v ? "ds-action-bar--pill" : e ? "ds-action-bar--summary" : "", p || v ? "" : "ds-action-bar--all", i].filter(Boolean).join(" "), y = h && a.isValidElement(d) ? a.cloneElement(d, { disabled: !0 }) : d;
  return /* @__PURE__ */ a.createElement("div", { role: "group", "aria-label": M, className: m, "data-empty": h ? "true" : void 0, "data-hidden": l ? "true" : void 0, "data-enter": n ? "true" : void 0, ...s }, e ? /* @__PURE__ */ a.createElement("div", { className: "ds-action-bar-v2__summary", "aria-live": "polite" }, /* @__PURE__ */ a.createElement("span", { className: "ds-action-bar-v2__label" }, e.label), /* @__PURE__ */ a.createElement("b", { className: "ds-action-bar-v2__value" }, h ? "—" : e.value), (h ? e.emptyNote : e.note) ? /* @__PURE__ */ a.createElement("small", { className: "ds-action-bar-v2__note" }, h ? e.emptyNote : e.note) : null) : null, o, c, y);
}
ja.Separator = function() {
  return /* @__PURE__ */ a.createElement(r.Divider, { orientation: "vertical", fixed: !0, className: "ds-action-bar-v2__sep", "aria-hidden": "true" });
};
Object.assign(r, { ActionBar: ja });
function Yt({ action: t, brand: e, links: h, linksLabel: d = "Legal information", legal: c, className: l = "", ...n }) {
  const p = e && a.isValidElement(e) ? a.cloneElement(e, { className: [e.props.className, "ds-app-footer-v2__logo"].filter(Boolean).join(" ") }) : e;
  return /* @__PURE__ */ a.createElement("footer", { className: ["ds-app-footer-v2", l].filter(Boolean).join(" "), ...n }, t ? /* @__PURE__ */ a.createElement("span", { className: "ds-app-footer-v2__action" }, t) : null, p ? /* @__PURE__ */ a.createElement("span", { className: "ds-app-footer-v2__brand" }, p) : null, h || c ? /* @__PURE__ */ a.createElement("span", { className: "ds-app-footer-v2__legal" }, h ? /* @__PURE__ */ a.createElement("nav", { className: "ds-app-footer-v2__links", "aria-label": d }, h) : null, c ? /* @__PURE__ */ a.createElement("span", { className: "ds-app-footer-v2__text" }, c) : null) : null);
}
Object.assign(r, { AppFooter: Yt });
function Kt() {
  return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Ma(t, e) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || e;
  } catch {
    return e;
  }
}
function Ba(t, e) {
  if (!t || Kt()) return;
  const h = Ma("--mo-ease-out-spring", "cubic-bezier(.34,1.35,.5,1)"), d = Ma("--mo-ease-out", "cubic-bezier(.16,1,.3,1)");
  t.querySelectorAll('[class*="__icon"], [class*="btn__label"], [class*="btn-v2__label"]').forEach((c) => {
    c.animate && (/__icon/.test(c.className) || (c.style.display = "inline-block"), e ? c.animate([{ opacity: 0, filter: "blur(6px)", transform: "scale(.82) translateY(5px)" }, { opacity: 1, filter: "blur(0px)", transform: "none" }], { duration: 1e3, easing: h }) : c.animate([{ opacity: 0, filter: "blur(5px)" }, { opacity: 1, filter: "blur(0px)" }], { duration: 400, easing: d }));
  });
}
function Ut({ code: t, label: e = "Reference code", copyLabel: h = "Copy", copiedLabel: d = "Copied", copiedMessage: c = "Code copied", onCopy: l, className: n = "", ...p }) {
  const [M, i] = a.useState(!1), o = a.useRef(null), s = a.useRef(!0), v = a.useRef(0);
  a.useEffect(() => {
    if (s.current) {
      s.current = !1;
      return;
    }
    Ba(o.current, M);
  }, [M]);
  const m = () => {
    const y = (g) => {
      if (!g) {
        l && l(!1);
        return;
      }
      i(!0), clearTimeout(v.current), v.current = setTimeout(() => i(!1), 1500), l && l(!0);
    };
    try {
      navigator.clipboard.writeText(t).then(() => y(!0), () => y(!1));
    } catch {
      y(!1);
    }
  };
  return /* @__PURE__ */ a.createElement("div", { ref: o, className: ["ds-copy-code-v2", n].filter(Boolean).join(" "), ...p }, /* @__PURE__ */ a.createElement("span", { className: "ds-copy-code-v2__label" }, e), /* @__PURE__ */ a.createElement("b", { className: "ds-copy-code-v2__value" }, t), /* @__PURE__ */ a.createElement(r.Button, { variant: "ghost", size: "sm", className: "ds-copy-code-v2__btn", onClick: m, iconStart: a.createElement(r.Icon, { name: M ? "check" : "copy", size: "sm" }) }, M ? d : h), /* @__PURE__ */ a.createElement("span", { className: "ds-sr-only", style: { position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap" }, role: "status", "aria-live": "polite" }, M ? c : ""));
}
Object.assign(r, { CopyCode: Ut, copyCodeSwap: Ba });
function Gt({ trigger: t, title: e, description: h, children: d, footer: c, open: l, defaultOpen: n = !1, onOpenChange: p, align: M = "start", width: i, closeLabel: o = "Close", className: s = "", ...v }) {
  const [m, y] = a.useState(n), g = l ?? m, u = (A) => {
    l == null && y(A), p && p(A);
  }, f = a.useRef(null), L = a.useRef(null), z = () => {
    const A = f.current, w = A && A.firstElementChild;
    return w && (w.matches("button,[href],[tabindex]") ? w : w.querySelector("button,[href],[tabindex]")) || w;
  }, E = a.useId ? a.useId() : "pop", _ = "ds-popover-" + String(E).replace(/[^a-zA-Z0-9_-]/g, "");
  a.useEffect(() => {
    if (!g) return;
    const A = (T) => {
      f.current && !f.current.contains(T.target) && u(!1);
    }, w = (T) => {
      if (T.key === "Escape") {
        T.stopPropagation(), u(!1);
        const C = z();
        C && C.focus && C.focus();
      }
    };
    document.addEventListener("pointerdown", A), document.addEventListener("keydown", w);
    const H = L.current;
    if (H) {
      const T = "input, select, textarea, button, [href], [tabindex]:not([tabindex='-1'])", C = H.querySelector(".ds-popover__body"), P = H.querySelector(".ds-popover__footer");
      (H.querySelector("[autofocus]") || C && C.querySelector(T) || P && P.querySelector(T) || H.querySelector(T) || H).focus({ preventScroll: !0 });
    }
    return () => {
      document.removeEventListener("pointerdown", A), document.removeEventListener("keydown", w);
    };
  }, [g]);
  const B = t && a.isValidElement(t) ? a.cloneElement(t, {
    "aria-expanded": g ? "true" : "false",
    "aria-controls": _,
    "aria-haspopup": "dialog",
    onClick: (A) => {
      t.props.onClick && t.props.onClick(A), u(!g);
    }
  }) : null, $ = () => {
    u(!1);
    const A = z();
    A && A.focus && A.focus();
  };
  return a.createElement(
    "span",
    { ref: f, className: ["ds-popover", s].filter(Boolean).join(" "), ...v },
    B,
    g && a.createElement(r.PopoverPanel, { ref: L, id: _, "aria-labelledby": e ? _ + "-t" : void 0, tabIndex: -1, align: M, width: i, title: e, titleId: _ + "-t", onClose: $, closeLabel: o, description: h, footer: c }, d)
  );
}
Object.assign(r, { Popover: Gt });
function Xt(t, e, h) {
  const d = h && h.delay != null ? h.delay : 1200, c = JSON.stringify(t), [l, n] = a.useState(() => ({ value: e(t), busy: !1 })), p = a.useRef(!0);
  return a.useEffect(() => {
    if (p.current) {
      p.current = !1;
      return;
    }
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches || d <= 0) {
      n({ value: e(t), busy: !1 });
      return;
    }
    n((o) => ({ value: o.value, busy: !0 }));
    const i = setTimeout(() => n({ value: e(t), busy: !1 }), d);
    return () => clearTimeout(i);
  }, [c]), l;
}
function $a({ busy: t = !1, label: e = "Calculating…", variant: h = "spinner", className: d = "" }) {
  return a.createElement(
    "div",
    { className: ["ds-loading-overlay__layer", d].filter(Boolean).join(" "), "aria-hidden": t ? void 0 : "true" },
    a.createElement(r.Spinner, { size: "lg" }),
    /* the loader bar is retired; `variant` is accepted and ignored */
    a.createElement("span", { className: "ds-loading-overlay__label", role: "status" }, t ? e : "")
  );
}
function Qt({ busy: t = !1, label: e = "Calculating…", variant: h = "spinner", children: d, className: c = "", ...l }) {
  return a.createElement(
    "div",
    { className: ["ds-loading-overlay", t && "is-busy", c].filter(Boolean).join(" "), "aria-busy": t ? "true" : "false", ...l },
    a.createElement("div", { className: "ds-loading-overlay__content", inert: t ? "" : void 0 }, d),
    a.createElement($a, { busy: t, label: e, variant: h })
  );
}
Object.assign(r, { LoadingOverlay: Qt, LoadingLayer: $a, useLiveResult: Xt });
function Jt({ value: t = 0, decimals: e = 0, format: h, duration: d, prefix: c, suffix: l, className: n = "", ...p }) {
  const M = (m) => h ? h(m) : Number(m).toLocaleString("en-US", { minimumFractionDigits: e, maximumFractionDigits: e }), [i, o] = a.useState(t), s = a.useRef(t);
  a.useEffect(() => {
    const m = s.current, y = Number(t) || 0;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches || m === y) {
      s.current = y, o(y);
      return;
    }
    let u = d;
    if (u == null)
      try {
        const E = getComputedStyle(document.documentElement).getPropertyValue("--motion-duration-move").trim();
        u = E.slice(-2) === "ms" ? parseFloat(E) : E.slice(-1) === "s" ? parseFloat(E) * 1e3 : 800;
      } catch {
        u = 800;
      }
    u = u || 800;
    let f, L;
    const z = (E) => {
      L == null && (L = E);
      const _ = Math.min(1, (E - L) / u), B = 1 - Math.pow(1 - _, 3), $ = m + (y - m) * B;
      s.current = $, o(_ < 1 ? $ : y), _ < 1 ? f = requestAnimationFrame(z) : s.current = y;
    };
    return f = requestAnimationFrame(z), () => cancelAnimationFrame(f);
  }, [t]);
  const v = Math.pow(10, e);
  return a.createElement(
    "span",
    { className: ["ds-animated-number", n].filter(Boolean).join(" "), ...p },
    a.createElement("span", { "aria-hidden": "true" }, c, M(Math.round(i * v) / v), l),
    a.createElement("span", { className: "ds-visually-hidden" }, c, M(t), l)
  );
}
Object.assign(r, { AnimatedNumber: Jt });
function ae({ value: t = 0, max: e = 100, label: h, tone: d = "after", ariaLabel: c, className: l = "", ...n }) {
  const p = Math.max(0, Math.min(100, (Number(t) || 0) / (Number(e) || 100) * 100));
  return a.createElement(
    "div",
    { className: ["ds-meter-pill", "ds-meter-pill--" + d, l].filter(Boolean).join(" "), role: "meter", "aria-valuemin": 0, "aria-valuemax": e, "aria-valuenow": t, "aria-label": c, "aria-valuetext": typeof h == "string" ? h : void 0, ...n },
    a.createElement(
      "div",
      { className: "ds-meter-pill__fill", style: { inlineSize: "max(" + p + "%, var(--dimension-10))" } },
      h != null && a.createElement("b", { className: "ds-meter-pill__label" }, h)
    )
  );
}
Object.assign(r, { MeterPill: ae });
function te({ summary: t, children: e, tone: h = "default", name: d, open: c, defaultOpen: l, onToggle: n, className: p = "", ...M }) {
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "details",
      { className: ["ds-accordion-v2", h === "info" && "ds-accordion-v2--info", p].filter(Boolean).join(" "), name: d, open: c ?? void 0, ...c == null && l ? { open: !0 } : {}, onToggle: n ? (i) => n(i.currentTarget.open, i) : void 0, ...M },
      a.createElement(
        "summary",
        { className: "ds-accordion-v2__summary" },
        t,
        a.createElement("span", { className: "ds-accordion-v2__chev", "aria-hidden": "true" }, a.createElement(r.Icon, { name: "chevron-down", size: "md" }))
      ),
      typeof e == "string" ? a.createElement("p", null, e) : e
    )
  );
}
Object.assign(r, { Accordion: te });
function ee({ title: t, children: e, tone: h = "default", icon: d, action: c, className: l = "", ...n }) {
  const p = d === !1 ? null : d || (h === "error" ? "circle-alert" : "info");
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "div",
      { className: ["ds-callout-v2", h === "error" && "ds-callout-v2--error", h === "info" && "ds-callout-v2--info", c && "ds-callout-v2--has-action", l].filter(Boolean).join(" "), role: h === "error" ? "alert" : void 0, ...n },
      p && a.createElement("span", { className: "ds-callout-v2__icon", "aria-hidden": "true" }, a.createElement(r.Icon, { name: p, size: "sm" })),
      a.createElement("div", { className: "ds-callout-v2__body" }, t && a.createElement("div", { className: "ds-callout-v2__title" }, t), e),
      c && a.createElement("div", { className: "ds-callout-v2__action" }, c)
    )
  );
}
Object.assign(r, { Callout: ee });
function he({ before: t, after: e, segments: h = 20, shape: d = "segments", className: c = "", ...l }) {
  const n = Math.max(Number(t && t.amount) || 0, Number(e && e.amount) || 0) || 1;
  if (d === "pill") {
    const i = (o, s) => a.createElement(
      "div",
      { className: "ds-comparison-meter-v2__rounded-row" },
      a.createElement("span", { className: "ds-comparison-meter-v2__label" }, o.label),
      a.createElement(r.MeterPill, { tone: s, value: Number(o.amount) || 0, max: n, label: o.unit ? o.value + " " + o.unit : o.value, ariaLabel: o.label })
    );
    return a.createElement(
      "div",
      { "data-ds-v2": "", style: { display: "contents" } },
      a.createElement("div", { className: ["ds-comparison-meter-v2", "ds-comparison-meter-v2--rounded", c].filter(Boolean).join(" "), ...l }, t && i(t, "before"), e && i(e, "after"))
    );
  }
  const p = (i) => a.createElement(
    "div",
    { className: "ds-comparison-meter-v2__row" },
    a.createElement("span", { className: "ds-comparison-meter-v2__label" }, i.label),
    a.createElement("span", { className: "ds-comparison-meter-v2__value" }, i.value, i.unit && a.createElement("span", { className: "ds-comparison-meter-v2__unit" }, i.unit))
  ), M = (i, o) => {
    const s = Math.round((Number(i.amount) || 0) / n * h);
    return a.createElement(
      "div",
      { className: "ds-comparison-meter-v2__segments ds-comparison-meter-v2__segments--" + o, role: "img", "aria-label": `${i.label}: ${s} of ${h} segments lit` },
      Array.from({ length: h }, (v, m) => a.createElement("i", { key: m, className: "ds-comparison-meter-v2__segment" + (m < s ? " ds-comparison-meter-v2__segment--on" : ""), style: { "--k": (m / Math.max(1, h - 1)).toFixed(3) } }))
    );
  };
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "div",
      { className: ["ds-comparison-meter-v2", c].filter(Boolean).join(" "), ...l },
      t && p(t),
      t && M(t, "before"),
      e && p(e),
      e && M(e, "after")
    )
  );
}
Object.assign(r, { ComparisonMeter: he });
function de({ href: t, inline: e = !1, quiet: h = !1, size: d, children: c, className: l = "", ...n }) {
  const p = ["ds-link-v2", e && "ds-link-v2--inline", h && "ds-link-v2--quiet", d && `ds-link-v2--size-${d}`, l].filter(Boolean).join(" ");
  return a.createElement(
    "span",
    { "data-ds-v2": "", style: { display: "contents" } },
    t ? a.createElement("a", { href: t, className: p, ...n }, c) : a.createElement("button", { type: "button", className: p, ...n }, c)
  );
}
Object.assign(r, { Link: de });
function re({ band: t, intro: e, title: h, children: d, className: c = "", ...l }) {
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "section",
      { className: ["ds-offer-card-v2", c].filter(Boolean).join(" "), "aria-label": typeof t == "string" ? t : void 0, ...l },
      t && a.createElement("div", { className: "ds-offer-card-v2__band" }, t),
      e && a.createElement("p", { className: "ds-offer-card-v2__intro" }, e),
      a.createElement("div", { className: "ds-offer-card-v2__body" }, h && a.createElement("h4", { className: "ds-offer-card-v2__title" }, h), d)
    )
  );
}
Object.assign(r, { OfferCard: re });
function ce({ total: t = 2, done: e = 0, label: h, className: d = "", style: c, ...l }) {
  const n = Math.max(1, t | 0), p = Math.max(0, Math.min(n, e | 0));
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "div",
      { className: ["ds-progress-segments-v2", d].filter(Boolean).join(" "), role: "progressbar", "aria-label": h || `Step ${p} of ${n}`, "aria-valuemin": 0, "aria-valuemax": n, "aria-valuenow": p, "aria-valuetext": `Step ${p} of ${n}`, style: { "--progress-segments-total": n, ...c }, ...l },
      Array.from({ length: n }, (M, i) => a.createElement("i", { key: i, className: "ds-progress-segments-v2__seg" + (i < p ? " ds-progress-segments-v2__seg--done" : "") }))
    )
  );
}
Object.assign(r, { ProgressSegments: ce });
function le({ legend: t, name: e, options: h = [], value: d, defaultValue: c, onChange: l, horizontal: n = !1, dense: p = !1, disabled: M = !1, className: i = "", ...o }) {
  const [s, v] = a.useState(c), m = d !== void 0 ? d : s, y = e || "rg-" + String(a.useId ? a.useId() : Math.random()).replace(/[^a-zA-Z0-9_-]/g, ""), g = h.map((u) => typeof u == "object" ? u : { value: u, label: String(u) });
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "fieldset",
      { className: ["ds-radio-group-v2", n && "ds-radio-group-v2--horizontal", p && "ds-radio-group-v2--dense", i].filter(Boolean).join(" "), disabled: M, ...o },
      t && a.createElement("legend", { className: "ds-radio-group-v2__legend" }, t),
      a.createElement("div", { className: "ds-radio-group-v2__options" }, g.map((u) => {
        const f = m === u.value;
        return a.createElement(r.Radio, { key: String(u.value), name: y, value: String(u.value), selected: f, disabled: u.disabled, label: u.label, onChange: () => {
          d === void 0 && v(u.value), l && l(u.value);
        } });
      }))
    )
  );
}
Object.assign(r, { RadioGroup: le });
function ne({ text: t, expanded: e = !1, controls: h, onClick: d, className: c = "", ...l }) {
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      r.PlainButton,
      { type: "button", className: ["ds-sheet-bar-v2", c].filter(Boolean).join(" "), "aria-expanded": e ? "true" : "false", "aria-controls": h, onClick: d, ...l },
      a.createElement("span", { className: "ds-sheet-bar-v2__text" }, t),
      a.createElement("span", { className: "ds-sheet-bar-v2__chevron", "aria-hidden": "true" }, a.createElement(r.Icon, { name: "chevron-up", size: "md" }))
    )
  );
}
Object.assign(r, { SheetBar: ne });
function pe({ label: t, min: e = 0, max: h = 100, step: d = 1, value: c, defaultValue: l, onChange: n, unit: p, format: M, minLabel: i, maxLabel: o, className: s = "", ...v }) {
  const [m, y] = a.useState(l ?? e), g = c ?? m, u = (A) => M ? M(A) : Number(A).toLocaleString("en-US"), [f, L] = a.useState(null), z = String(a.useId ? a.useId() : Math.random()).replace(/[^a-zA-Z0-9_-]/g, ""), E = (A) => {
    const w = Math.min(h, Math.max(e, Math.round((A - e) / d) * d + e));
    c == null && y(w), n && n(w);
  }, _ = () => {
    if (f == null) return;
    const A = parseFloat(String(f).replace(/\./g, "").replace(",", "."));
    isNaN(A) || E(A), L(null);
  }, B = f ?? u(g), $ = (g - e) / (h - e || 1);
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "div",
      { className: ["ds-slider-v2", s].filter(Boolean).join(" "), ...v },
      a.createElement(
        "div",
        { className: "ds-slider-v2__head" },
        a.createElement(r.Label, { variant: "inherit", htmlFor: "r-" + z }, t),
        a.createElement(
          r.Label,
          { variant: "inherit", className: "ds-slider-v2__value", htmlFor: "n-" + z },
          a.createElement("input", {
            id: "n-" + z,
            className: "ds-slider-v2__number",
            type: "text",
            inputMode: "numeric",
            value: B,
            "aria-label": typeof t == "string" ? t + (p ? " (" + p + ")" : "") : void 0,
            style: { "--n": String(B).length },
            onChange: (A) => L(A.target.value),
            onBlur: _,
            onKeyDown: (A) => {
              A.key === "Enter" && (A.preventDefault(), _());
            }
          }),
          p && a.createElement("span", { className: "ds-slider-v2__unit", "aria-hidden": "true" }, p)
        )
      ),
      a.createElement("input", { id: "r-" + z, className: "ds-slider-v2__range", type: "range", min: e, max: h, step: d, value: g, style: { "--pct": $.toFixed(4) }, "aria-valuetext": u(g) + (p ? " " + p : ""), onChange: (A) => E(Number(A.target.value)) }),
      a.createElement(
        "div",
        { className: "ds-slider-v2__scale" },
        a.createElement("span", null, i ?? u(e) + (p ? " " + p : "")),
        a.createElement("span", null, o ?? u(h) + (p ? " " + p : ""))
      )
    )
  );
}
Object.assign(r, { Slider: pe });
function ie({ rows: t = [], className: e = "", ...h }) {
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "dl",
      { className: ["ds-summary-list-v2", e].filter(Boolean).join(" "), style: { margin: 0 }, ...h },
      t.map((d, c) => a.createElement(
        "div",
        { key: c, className: "ds-summary-list-v2__row" + (d.total ? " ds-summary-list-v2__row--total" : "") },
        a.createElement("dt", { style: { margin: 0 } }, d.label),
        a.createElement("dd", { style: { margin: 0, fontVariantNumeric: "tabular-nums" } }, d.value)
      ))
    )
  );
}
Object.assign(r, { SummaryList: ie });
function Oa({ title: t, help: e, media: h, value: d, checked: c = !1, name: l, onChange: n, disabled: p = !1, className: M = "", ...i }) {
  return a.createElement(
    r.Card,
    { as: "label", className: ["ds-card-v2--choice", c && "ds-card-v2--selected", h && "ds-choice-card--media", M].filter(Boolean).join(" "), ...i },
    h && a.createElement("span", { className: "ds-choice-card__media", "aria-hidden": "true" }, h),
    a.createElement(r.Radio, { bare: !0, name: l, value: String(d), selected: c, disabled: p, onChange: () => n && n(d) }),
    a.createElement("span", { className: "ds-card-v2__choice-text" }, a.createElement("b", { className: "ds-card-v2__choice-title" }, t), e && a.createElement("small", { className: "ds-card-v2__choice-help" }, e))
  );
}
function se({ label: t, name: e, options: h = [], value: d, onChange: c, columns: l = 3, className: n = "", style: p, ...M }) {
  const i = e || "cc-" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, "");
  return a.createElement(
    "div",
    { role: "radiogroup", "aria-label": t, className: ["ds-choice-group", n].filter(Boolean).join(" "), style: { "--choice-columns": l, ...p }, ...M },
    h.map((o) => a.createElement(Oa, { key: String(o.value), name: i, value: o.value, title: o.title, help: o.help, media: o.media, disabled: o.disabled, checked: d === o.value, onChange: c }))
  );
}
Object.assign(r, { ChoiceCard: Oa, ChoiceCardGroup: se });
function oe({ title: t, live: e, empty: h, note: d, actions: c, busy: l = !1, busyLabel: n = "Calculating…", busyVariant: p = "spinner", children: M, className: i = "", ...o }) {
  return a.createElement(
    r.Card,
    { as: "div", className: ["ds-preview-panel", l && "is-busy", i].filter(Boolean).join(" "), "aria-live": "polite", "aria-busy": l ? "true" : "false", ...o },
    (t || e) && a.createElement(
      "div",
      { className: "ds-preview-panel__head" },
      t && a.createElement("h3", { className: "ds-preview-panel__title" }, t),
      e && a.createElement("span", { className: "ds-preview-panel__live" }, e)
    ),
    h ? a.createElement("p", { className: "ds-preview-panel__empty" }, h) : a.Children.map(M, (s) => s == null ? null : a.createElement("div", { className: "ds-preview-panel__block" }, s)),
    d && !h && a.createElement("p", { className: "ds-preview-panel__note" }, d),
    c && a.createElement("div", { className: "ds-preview-panel__actions" }, c),
    a.createElement(r.LoadingLayer, { busy: l, label: n, variant: p, className: "ds-preview-panel__busy" })
  );
}
function Me({ main: t, panel: e, actions: h, mobile: d = "stack", sheetSummary: c, className: l = "", ...n }) {
  const [p, M] = a.useState(!1), i = "pv-" + String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), o = d === "sheet";
  return a.createElement(
    "div",
    { className: ["ds-preview-layout", o && "ds-preview-layout--sheet", l].filter(Boolean).join(" "), ...n },
    a.createElement("div", { className: "ds-preview-layout__main" }, t),
    e && a.createElement(
      "aside",
      { className: ["ds-preview-layout__panel", p && "is-open"].filter(Boolean).join(" ") },
      o && a.createElement(r.SheetBar, { className: "ds-preview-layout__bar", text: c, expanded: p, controls: i, onClick: () => M((s) => !s) }),
      a.createElement("div", { id: i, className: "ds-preview-layout__panel-in" }, e)
    ),
    h && a.createElement("div", { className: "ds-preview-layout__actions" }, h)
  );
}
Object.assign(r, { PreviewPanel: oe, PreviewLayout: Me });
function me({ title: t, value: e, caption: h, before: d, after: c, className: l = "", ...n }) {
  return a.createElement(
    r.Card,
    { className: ["ds-comparison-card", l].filter(Boolean).join(" "), "aria-label": typeof t == "string" ? t : void 0, ...n },
    a.createElement("span", { className: "ds-comparison-card__title" }, t),
    a.createElement("b", { className: "ds-comparison-card__value" }, e),
    h && a.createElement("small", { className: "ds-comparison-card__caption" }, h),
    a.createElement(r.ComparisonMeter, { before: d, after: c, className: "ds-comparison-card__meter" })
  );
}
function ue({ children: t, className: e = "", ...h }) {
  return a.createElement("div", { className: ["ds-results-row", e].filter(Boolean).join(" "), ...h }, a.Children.map(t, (d) => d == null ? null : a.createElement("div", null, d)));
}
Object.assign(r, { ComparisonCard: me, ResultsRow: ue });
function ve({ label: t, help: e, error: h, required: d, disabled: c, readOnly: l, rows: n = 3, id: p, className: M = "", ...i }) {
  const o = String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), s = p || "ta-" + o, v = h || e ? s + "-h" : void 0, m = ["ds-input-v2__field", "ds-textarea-v2__field", h && "ds-input-v2__field--error", c && "ds-input-v2__field--disabled", l && "ds-input-v2__field--readonly"].filter(Boolean).join(" ");
  return a.createElement(
    "div",
    { className: ["ds-input-v2", M].filter(Boolean).join(" ") },
    t && a.createElement(r.Label, { variant: "field", htmlFor: s, required: d }, t),
    a.createElement(
      "div",
      { className: m },
      a.createElement("textarea", { id: s, className: "ds-input-v2__control ds-textarea-v2__control", rows: n, disabled: c, readOnly: l, required: d, "aria-invalid": h ? "true" : void 0, "aria-describedby": v, ...i })
    ),
    (h || e) && a.createElement(r.HelpText, { field: !0, tone: h ? "error" : "default", id: v, role: h ? "alert" : void 0 }, h || e)
  );
}
Object.assign(r, { Textarea: ve });
function ye({ label: t, help: e, error: h, accept: d, multiple: c = !1, disabled: l = !1, onFiles: n, children: p, id: M, className: i = "", ...o }) {
  const s = String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), v = M || "fd-" + s, m = v + "-l", y = h || e ? v + "-h" : void 0, [g, u] = a.useState([]), [f, L] = a.useState(!1), z = (E) => {
    const _ = Array.from(E || []);
    u(_.map((B) => B.name)), n && n(_);
  };
  return a.createElement(
    "div",
    { className: ["ds-filedrop-v2", i].filter(Boolean).join(" ") },
    t && a.createElement(r.Label, { as: "span", variant: "field", id: m }, t),
    a.createElement(
      r.Label,
      {
        variant: "inherit",
        htmlFor: v,
        className: "ds-filedrop-v2__zone",
        "data-over": f ? "true" : void 0,
        "data-error": h ? "true" : void 0,
        "data-disabled": l ? "true" : void 0,
        onDragOver: (E) => {
          l || (E.preventDefault(), L(!0));
        },
        onDragLeave: () => L(!1),
        onDrop: (E) => {
          E.preventDefault(), L(!1), l || z(E.dataTransfer.files);
        }
      },
      a.createElement(r.Icon, { name: "paperclip", size: "sm", "aria-hidden": "true" }),
      a.createElement("span", null, p || ["Drag a file or ", a.createElement("u", { key: "u" }, "browse")]),
      a.createElement("input", { id: v, type: "file", className: "ds-filedrop-v2__input", accept: d, multiple: c, disabled: l, "aria-labelledby": t ? m : void 0, "aria-invalid": h ? "true" : void 0, "aria-describedby": y, onChange: (E) => z(E.target.files), ...o })
    ),
    g.length > 0 && a.createElement("ul", { className: "ds-filedrop-v2__files" }, g.map((E, _) => a.createElement("li", { key: _ }, E))),
    (h || e) && a.createElement(r.HelpText, { field: !0, tone: h ? "error" : "default", id: y, role: h ? "alert" : void 0 }, h || e)
  );
}
Object.assign(r, { FileDrop: ye });
function xe({ href: t = "#content", children: e = "Skip to content", className: h = "", ...d }) {
  return a.createElement("a", { href: t, className: ["ds-skip-link", h].filter(Boolean).join(" "), ...d }, e);
}
Object.assign(r, { SkipLink: xe });
function fe({ bar: t, rail: e, railTitle: h = "Menu", menuLabel: d = "Open menu", breakpoint: c = 960, narrow: l = !1, menuOpen: n, onMenuOpenChange: p, skipLabel: M = "Skip to content", mainId: i = "content", children: o, className: s = "", ...v }) {
  const m = () => typeof window < "u" && window.innerWidth < c, [y, g] = a.useState(m), [u, f] = a.useState(!1), L = n !== void 0, z = L ? !!n : u, E = ($) => {
    L || f($), p && p($);
  };
  a.useEffect(() => {
    const $ = () => g(m());
    return window.addEventListener("resize", $), () => window.removeEventListener("resize", $);
  }, [c]), a.useEffect(() => {
    y || f(!1);
  }, [y]);
  const _ = y && e ? a.createElement(r.IconButton, { variant: "ghost", size: "md", label: d, "aria-haspopup": "dialog", "aria-expanded": String(z), onClick: () => E(!0) }, a.createElement(r.Icon, { name: "menu", size: "sm" })) : null, B = typeof t == "function" ? t({ menuButton: _, small: y }) : t;
  return a.createElement(
    "div",
    { className: ["ds-shell", s].filter(Boolean).join(" "), "data-compact": y ? "true" : void 0, ...v },
    a.createElement(r.SkipLink, { href: "#" + i }, M),
    a.createElement(
      "div",
      { className: "ds-shell__col" },
      a.createElement("div", { className: "ds-shell__bar" }, B),
      a.createElement(
        "div",
        { className: "ds-shell__body" },
        !y && e && a.createElement("div", { className: "ds-shell__rail" }, e),
        a.createElement("main", { id: i, tabIndex: -1, className: ["ds-shell__card", l && "ds-shell__card--narrow"].filter(Boolean).join(" ") }, o)
      )
    ),
    y && e && a.createElement(
      r.Drawer,
      { open: z, side: "left", size: "sm", title: h, onClose: () => E(!1) },
      a.createElement("div", { onClick: ($) => {
        $.target.closest && $.target.closest("a,button,[role=menuitem]") && E(!1);
      } }, e)
    )
  );
}
Object.assign(r, { ShellFrame: fe });
function ge({ eyebrow: t, title: e, lead: h, steps: d = [], question: c, children: l, footer: n, className: p = "", ...M }) {
  return a.createElement(
    "section",
    { className: ["ds-landing-hero", p].filter(Boolean).join(" "), ...M },
    a.createElement(
      "div",
      { className: "ds-landing-hero__text" },
      t && a.createElement("div", { className: "ds-landing-hero__eyebrow" }, typeof t == "string" ? a.createElement(r.Tag, null, t) : t),
      a.createElement("h1", { className: "ds-landing-hero__title" }, e),
      h && a.createElement("p", { className: "ds-landing-hero__lead" }, h),
      d.length > 0 && a.createElement("ol", { className: "ds-landing-hero__steps" }, d.map((i, o) => a.createElement(
        "li",
        { key: o, className: o === 0 ? "is-current" : void 0 },
        a.createElement("span", { className: "ds-landing-hero__num", "aria-hidden": "true" }, o + 1),
        a.createElement("span", { className: "ds-landing-hero__step" }, a.createElement("span", { className: "ds-landing-hero__step-title" }, i.title), i.description && a.createElement("span", { className: "ds-landing-hero__step-text" }, i.description))
      )))
    ),
    a.createElement(
      "div",
      { className: "ds-landing-hero__choices" },
      c && a.createElement("p", { className: "ds-landing-hero__question" }, c),
      a.createElement("div", { className: "ds-landing-hero__cards" }, l),
      n
    )
  );
}
Object.assign(r, { LandingHero: ge });
const be = ["record", "shield", "contacts", "inbox", "history", "new", "error"];
function we({ title: t, children: e, icon: h, illustration: d, src: c, assetBase: l = "/assets/empty-states/", actions: n, size: p = "full", headingLevel: M = 3, className: i = "", ...o }) {
  const s = a.createElement, m = !!d && (!!c || be.indexOf(d) >= 0) ? "illustrated" : h ? "icon" : "ghost", y = "h" + Math.min(6, Math.max(1, M)), g = m === "illustrated" ? s("img", { className: "ds-empty-v2__img", src: c || l + "empty-" + d + ".webp", alt: "", width: 280, height: 240, draggable: !1 }) : s(
    "span",
    { className: "ds-empty-v2__ghost", "aria-hidden": "true" },
    s("i", { className: "ds-empty-v2__g1" }),
    s("i", { className: "ds-empty-v2__g2" }),
    s(
      "span",
      { className: "ds-empty-v2__g3" },
      s("span", { className: "ds-empty-v2__tile" }, s(r.Icon, { name: h || "inbox", size: "sm" })),
      s("span", { className: "ds-empty-v2__lines" }, s("i"), s("i"))
    )
  );
  return s(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    s(
      "div",
      { className: ["ds-empty-v2", i].filter(Boolean).join(" "), "data-size": p, "data-level": m, ...o },
      s("span", { className: "ds-empty-v2__art" }, g),
      s(y, { className: "ds-empty-v2__title" }, t),
      e ? s("p", { className: "ds-empty-v2__help" }, e) : null,
      n ? s("div", { className: "ds-empty-v2__actions" }, n) : null
    )
  );
}
Object.assign(r, { EmptyState: we });
function _e({ total: t = 0, page: e = 1, pageSize: h = 10, onPageChange: d, labels: c, className: l = "", ...n }) {
  const p = Math.max(1, Math.ceil((t || 0) / (h || 10))), M = Math.min(Math.max(1, e | 0), p), i = Object.assign({ nav: "Pagination", range: (m, y, g) => `Showing ${m}–${y} of ${g}`, page: (m, y) => `Page ${m} of ${y}`, prev: "Previous", next: "Next" }, c || {}), o = t ? (M - 1) * h + 1 : 0, s = Math.min(M * h, t), v = (m) => () => {
    d && d(m);
  };
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "nav",
      { "aria-label": i.nav, className: ["ds-pagination-v2", l].filter(Boolean).join(" "), ...n },
      a.createElement("span", { className: "ds-pagination-v2__range" }, i.range(o, s, t)),
      a.createElement(
        "div",
        { className: "ds-pagination-v2__nav" },
        a.createElement(r.Button, { variant: "ghost", size: "sm", iconStart: a.createElement(r.Icon, { name: "arrow-left", size: "sm" }), disabled: M <= 1, onClick: v(M - 1) }, i.prev),
        a.createElement("span", { className: "ds-pagination-v2__page", "aria-current": "page" }, i.page(M, p)),
        a.createElement(r.Button, { variant: "ghost", size: "sm", iconEnd: a.createElement(r.Icon, { name: "arrow-right", size: "sm" }), disabled: M >= p, onClick: v(M + 1) }, i.next)
      )
    )
  );
}
Object.assign(r, { Pagination: _e });
function Ee({ name: t, meta: e, onRemove: h, removeLabel: d = "Remove", icon: c = "file-text", className: l = "", ...n }) {
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "div",
      { className: ["ds-file-chip-v2", l].filter(Boolean).join(" "), ...n },
      a.createElement(
        "span",
        { className: "ds-file-chip-v2__main" },
        a.createElement(r.Icon, { name: c, size: "sm", "aria-hidden": "true" }),
        a.createElement("span", { className: "ds-file-chip-v2__name" }, t, e ? " · " + e : "")
      ),
      h && a.createElement(r.Button, { variant: "ghost", tone: "destructive", size: "sm", "aria-label": d + " " + t, onClick: h }, d)
    )
  );
}
Object.assign(r, { FileChip: Ee });
function t2(t) {
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}
function Y1(t, e) {
  return new Date(t.getFullYear(), t.getMonth(), t.getDate() + e);
}
function ma(t, e) {
  const h = new Date(t.getFullYear(), t.getMonth() + e, 1), d = new Date(h.getFullYear(), h.getMonth() + 1, 0).getDate();
  return new Date(h.getFullYear(), h.getMonth(), Math.min(t.getDate(), d));
}
function R1(t, e) {
  return !!t && !!e && t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate();
}
function ua(t) {
  return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
}
function He({ start: t = null, end: e = null, month: h, onMonthChange: d, onPick: c, min: l, max: n, today: p, locale: M = "en-US", weekStart: i = 1, autoFocus: o = !1, labels: s, className: v = "", ...m }) {
  const y = Object.assign({ prev: "Previous month", next: "Next month" }, s || {}), g = t2(p || /* @__PURE__ */ new Date()), u = l ? t2(l) : null, f = n ? t2(n) : null, [L, z] = a.useState(() => {
    const O = t || e || g;
    return new Date(O.getFullYear(), O.getMonth(), 1);
  }), E = h ? new Date(h.getFullYear(), h.getMonth(), 1) : L, [_, B] = a.useState(() => t2(t || e || g)), [$, A] = a.useState(null), w = a.useRef(null), H = a.useRef(o), T = (O) => {
    const j = new Date(O.getFullYear(), O.getMonth(), 1);
    h || z(j), d && d(j);
  }, C = (O) => u && O < u || f && O > f, P = (O) => u && O < u ? u : f && O > f ? f : O, q = (O) => {
    O = P(O), B(O), H.current = !0, (O.getMonth() !== E.getMonth() || O.getFullYear() !== E.getFullYear()) && T(O);
  };
  a.useEffect(() => {
    if (!H.current || !w.current) return;
    const O = w.current.querySelector('button[data-date="' + ua(_) + '"]');
    O && O.focus(), H.current = !1;
  }, [_, E.getTime()]);
  const h1 = (O) => new Intl.DateTimeFormat(M, O), e1 = h1({ month: "long", year: "numeric" }).format(E), _1 = new Date(E.getFullYear(), E.getMonth(), 1), o1 = (_1.getDay() - i + 7) % 7, p1 = [];
  for (let O = 0; O < 42; O++) {
    const j = Y1(_1, O - o1);
    p1.push(j.getMonth() === E.getMonth() ? j : null);
  }
  const m1 = [], d1 = Y1(new Date(2024, 0, 7), i);
  for (let O = 0; O < 7; O++) {
    const j = Y1(d1, O);
    m1.push({ short: h1({ weekday: "narrow" }).format(j), long: h1({ weekday: "long" }).format(j) });
  }
  const r1 = e || (t && $ && $ >= t ? $ : null), E1 = _.getMonth() === E.getMonth() && _.getFullYear() === E.getFullYear() ? _ : p1.find(Boolean) || _1, V = (O, j) => {
    const v1 = O.key;
    let G = null;
    v1 === "ArrowLeft" ? G = Y1(j, -1) : v1 === "ArrowRight" ? G = Y1(j, 1) : v1 === "ArrowUp" ? G = Y1(j, -7) : v1 === "ArrowDown" ? G = Y1(j, 7) : v1 === "Home" ? G = Y1(j, -((j.getDay() - i + 7) % 7)) : v1 === "End" ? G = Y1(j, 6 - (j.getDay() - i + 7) % 7) : v1 === "PageUp" ? G = ma(j, O.shiftKey ? -12 : -1) : v1 === "PageDown" && (G = ma(j, O.shiftKey ? 12 : 1)), G && (O.preventDefault(), q(G));
  }, R = (O, j, v1) => a.createElement(r.PlainButton, { type: "button", className: "ds-calendar-v2__nav", "aria-label": j, title: j, onClick: () => T(new Date(E.getFullYear(), E.getMonth() + O, 1)) }, a.createElement(r.Icon, { name: v1, size: "sm", "aria-hidden": "true" })), F = [];
  for (let O = 0; O < 6; O++)
    F.push(a.createElement("tr", { key: O }, p1.slice(O * 7, O * 7 + 7).map((j, v1) => {
      if (!j) return a.createElement("td", { key: v1, className: "ds-calendar-v2__cell" });
      const G = R1(j, t), f1 = R1(j, e) || !e && r1 && R1(j, r1) && !R1(j, t), I = t && r1 && j > t && j < r1, Y = C(j), i1 = G || R1(j, e), s1 = ["ds-calendar-v2__day", G && "ds-calendar-v2__day--start", f1 && "ds-calendar-v2__day--end", I && "ds-calendar-v2__day--in", R1(j, g) && "ds-calendar-v2__day--today"].filter(Boolean).join(" ");
      return a.createElement(
        "td",
        { key: v1, className: ["ds-calendar-v2__cell", t && r1 && (I || G && !R1(t, r1) || f1) && "ds-calendar-v2__cell--band", G && r1 && !R1(t, r1) && "ds-calendar-v2__cell--band-start", f1 && t && "ds-calendar-v2__cell--band-end"].filter(Boolean).join(" "), role: "gridcell", "aria-selected": i1 ? "true" : "false" },
        a.createElement(r.PlainButton, {
          type: "button",
          className: s1,
          "data-date": ua(j),
          tabIndex: R1(j, E1) ? 0 : -1,
          disabled: Y,
          "aria-label": h1({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(j),
          "aria-current": R1(j, g) ? "date" : void 0,
          onClick: () => {
            B(j), c && c(j);
          },
          onKeyDown: (y1) => V(y1, j),
          onMouseEnter: () => A(j),
          onMouseLeave: () => A(null),
          onFocus: () => B(j)
        }, j.getDate())
      );
    })));
  const l1 = e1.charAt(0).toUpperCase() + e1.slice(1);
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "div",
      { className: ["ds-calendar-v2", v].filter(Boolean).join(" "), ...m },
      a.createElement("div", { className: "ds-calendar-v2__head" }, R(-1, y.prev, "chevron-left"), a.createElement("span", { className: "ds-calendar-v2__title", "aria-live": "polite" }, l1), R(1, y.next, "chevron-right")),
      a.createElement(
        "table",
        { className: "ds-calendar-v2__grid", role: "grid", "aria-label": l1, ref: w },
        a.createElement("thead", null, a.createElement("tr", null, m1.map((O, j) => a.createElement("th", { key: j, scope: "col", abbr: O.long, className: "ds-calendar-v2__dow" }, O.short)))),
        a.createElement("tbody", null, F)
      )
    )
  );
}
Object.assign(r, { Calendar: He });
function Ve(t) {
  return t ? String(t.getDate()).padStart(2, "0") + "/" + String(t.getMonth() + 1).padStart(2, "0") + "/" + t.getFullYear() : "";
}
function e2(t) {
  const e = String(t || "").trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
  if (!e) return null;
  const h = new Date(+e[3], +e[2] - 1, +e[1]);
  return h.getMonth() === +e[2] - 1 && h.getDate() === +e[1] ? h : null;
}
function ke({ start: t = null, end: e = null, onChange: h, min: d, max: c, today: l, locale: n = "en-US", presets: p = !0, fromLabel: M, toLabel: i, labels: o, className: s = "", ...v }) {
  const m = Object.assign({
    from: "From",
    to: "To",
    placeholder: "dd/mm/yyyy",
    pickFrom: "Choose start date",
    pickTo: "Choose end date",
    dialog: "Choose dates",
    close: "Close",
    clear: "Clear dates",
    format: "Use dd/mm/yyyy",
    order: "“To” cannot be before “From”",
    outside: "Date outside the allowed range",
    prev: "Previous month",
    next: "Next month",
    last7: "Last 7 days",
    last30: "Last 30 days",
    thisMonth: "This month",
    lastMonth: "Previous month",
    thisQuarter: "This quarter",
    presets: "Shortcuts"
  }, o || {}), y = new Date(l || /* @__PURE__ */ new Date()), g = new Date(y.getFullYear(), y.getMonth(), y.getDate()), u = String(a.useId ? a.useId() : "").replace(/[^a-zA-Z0-9_-]/g, ""), [f, L] = a.useState({ from: null, to: null }), [z, E] = a.useState({ from: !1, to: !1 }), [_, B] = a.useState(!1), [$, A] = a.useState("from"), w = a.useRef(null), H = a.useRef({}), T = a.useRef("from"), C = (V, R) => {
    h && h({ start: V, end: R });
  }, P = (V) => !(d && V < new Date(d.getFullYear(), d.getMonth(), d.getDate()) || c && V > new Date(c.getFullYear(), c.getMonth(), c.getDate())), q = (V) => f[V] != null ? f[V] : Ve(V === "from" ? t : e), h1 = (V, R) => {
    if (L((l1) => Object.assign({}, l1, { [V]: R })), E((l1) => Object.assign({}, l1, { [V]: !1 })), !R.trim()) {
      C(V === "from" ? null : t, V === "to" ? null : e);
      return;
    }
    const F = e2(R);
    F && P(F) && C(V === "from" ? F : t, V === "to" ? F : e);
  }, e1 = (V) => {
    E((F) => Object.assign({}, F, { [V]: !0 }));
    const R = e2(f[V]);
    (f[V] == null || !f[V].trim() || R && P(R)) && L((F) => Object.assign({}, F, { [V]: null }));
  }, _1 = (V) => {
    const R = f[V];
    if (R != null && R.trim() && z[V]) {
      const F = e2(R);
      if (!F) return m.format;
      if (!P(F)) return m.outside;
    }
    return V === "to" && t && e && e < t && (f.to == null || e2(f.to)) ? m.order : "";
  }, o1 = (V) => {
    T.current = V, A(V), B(!0);
  }, p1 = (V) => {
    if (B(!1), V) {
      const R = H.current[T.current];
      R && R.focus();
    }
  };
  a.useEffect(() => {
    if (!_) return;
    const V = (F) => {
      w.current && !w.current.contains(F.target) && B(!1);
    }, R = (F) => {
      F.key === "Escape" && (F.stopPropagation(), p1(!0));
    };
    return document.addEventListener("pointerdown", V), document.addEventListener("keydown", R), () => {
      document.removeEventListener("pointerdown", V), document.removeEventListener("keydown", R);
    };
  }, [_]);
  const m1 = (V) => {
    L({ from: null, to: null }), $ === "from" ? (C(V, e && e >= V ? e : null), A("to"), T.current = "to") : t && V < t ? C(V, null) : (C(t, V), p1(!0));
  }, d1 = new Date(g.getFullYear(), Math.floor(g.getMonth() / 3) * 3, 1), r1 = p === !1 ? [] : Array.isArray(p) ? p : [
    { label: m.last7, range: () => [new Date(g.getFullYear(), g.getMonth(), g.getDate() - 6), g] },
    { label: m.last30, range: () => [new Date(g.getFullYear(), g.getMonth(), g.getDate() - 29), g] },
    { label: m.thisMonth, range: () => [new Date(g.getFullYear(), g.getMonth(), 1), new Date(g.getFullYear(), g.getMonth() + 1, 0)] },
    { label: m.lastMonth, range: () => [new Date(g.getFullYear(), g.getMonth() - 1, 1), new Date(g.getFullYear(), g.getMonth(), 0)] },
    { label: m.thisQuarter, range: () => [d1, new Date(d1.getFullYear(), d1.getMonth() + 3, 0)] }
  ], E1 = (V, R, F) => {
    const l1 = _1(V), O = "dr-" + u + "-" + V;
    return a.createElement(r.Input, {
      id: O,
      label: R,
      className: "ds-daterange-v2__field",
      error: l1 || void 0,
      active: _ && $ === V,
      inputMode: "numeric",
      autoComplete: "off",
      placeholder: m.placeholder,
      value: q(V),
      onChange: (j) => h1(V, j.target.value),
      onBlur: () => e1(V),
      onClick: () => o1(V),
      action: a.createElement(r.PlainButton, {
        type: "button",
        className: "ds-daterange-v2__open",
        ref: (j) => {
          H.current[V] = j;
        },
        "aria-label": F,
        title: F,
        "aria-haspopup": "dialog",
        "aria-expanded": _ && T.current === V ? "true" : "false",
        onClick: () => _ && T.current === V ? p1(!1) : o1(V)
      }, a.createElement(r.Icon, { name: "calendar", size: "sm", "aria-hidden": "true" }))
    });
  };
  return a.createElement(
    "div",
    { "data-ds-v2": "", style: { display: "contents" } },
    a.createElement(
      "div",
      { ref: w, className: ["ds-daterange-v2", s].filter(Boolean).join(" "), ...v },
      E1("from", M || m.from, m.pickFrom),
      E1("to", i || m.to, m.pickTo),
      _ && a.createElement(
        r.PopoverPanel,
        {
          bare: !0,
          align: "start",
          "aria-label": m.dialog,
          className: "ds-daterange-v2__panel",
          title: m.dialog,
          onClose: () => p1(!0),
          closeLabel: m.close,
          footer: t || e ? a.createElement(r.Button, { variant: "ghost", size: "sm", onClick: () => {
            L({ from: null, to: null }), C(null, null), A("from"), T.current = "from";
          } }, m.clear) : void 0
        },
        r1.length > 0 && a.createElement("div", { className: "ds-daterange-v2__presets", role: "group", "aria-label": m.presets }, r1.map((V, R) => a.createElement(r.Button, { key: R, variant: "secondary", size: "sm", onClick: () => {
          const F = V.range();
          L({ from: null, to: null }), C(F[0], F[1]), p1(!0);
        } }, V.label))),
        a.createElement(r.Calendar, { start: t, end: e, min: d, max: c, today: l, locale: n, autoFocus: !0, labels: { prev: m.prev, next: m.next }, onPick: m1 })
      )
    )
  );
}
Object.assign(r, { DateRange: ke });
const D1 = (t) => {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(t).trim();
  } catch {
    return "";
  }
}, K1 = (t, e) => {
  const h = D1(t);
  return h.endsWith("ms") ? parseFloat(h) : h.endsWith("s") ? parseFloat(h) * 1e3 : e;
}, r2 = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches), I1 = (...t) => t.filter(Boolean).join(" ");
function Ae({ columns: t, header: e, label: h, empty: d, className: c = "", style: l, children: n, ...p }) {
  const M = a.Children.toArray(n).filter(Boolean).length;
  return a.createElement(
    "div",
    { className: I1("ds-rowlist", c), style: Object.assign({}, t ? { "--rowlist-cols": t } : null, l), ...p },
    e && a.createElement("div", { className: "ds-rowlist__cols ds-rowlist__head", role: "presentation" }, e),
    a.createElement(
      "div",
      { className: "ds-rowlist__body", role: "list", "aria-label": h },
      n,
      M === 0 && d ? a.createElement("div", { className: "ds-rowlist__empty" }, d) : null
    )
  );
}
function Ne({ label: t, shortcut: e, sort: h, onSort: d, align: c, className: l = "", ...n }) {
  const p = e ? String(t).toLowerCase().indexOf(e.toLowerCase()) : -1, M = p < 0 ? t : [String(t).slice(0, p), a.createElement("u", { key: "u" }, String(t)[p]), String(t).slice(p + 1)];
  return a.createElement(
    "button",
    {
      type: "button",
      className: I1("ds-rowlist__sort", c === "end" && "ds-rowlist__end", l),
      onClick: d,
      "aria-sort": h === "asc" ? "ascending" : h === "desc" ? "descending" : void 0,
      title: e ? `Sort (${e.toUpperCase()})` : void 0,
      ...n
    },
    a.createElement("span", null, M),
    r.Icon ? a.createElement(r.Icon, { name: "arrow-up", size: 12, className: "ds-rowlist__sorticon" }) : null
  );
}
function Le(t) {
  const {
    id: e,
    cells: h,
    children: d,
    open: c = !1,
    highlight: l = !1,
    phase: n,
    gone: p = !1,
    entering: M = !1,
    dragging: i = !1,
    label: o,
    onToggle: s,
    onHandlePointerDown: v,
    handleLabel: m,
    slotRef: y,
    rowRef: g,
    className: u = "",
    ...f
  } = t, L = n === "char" || n === "burn";
  return a.createElement(
    "div",
    {
      ref: y,
      "data-slot": e,
      className: I1("ds-rowlist__slot", c && "ds-rowlist__slot--open", L && "ds-rowlist__slot--charring", p && "ds-rowlist__slot--gone", M && "ds-rowlist__slot--enter", i && "ds-rowlist__slot--dragging")
    },
    a.createElement(
      "div",
      {
        ref: g,
        role: "listitem",
        tabIndex: s ? 0 : -1,
        "data-row": e,
        "aria-label": o,
        "aria-expanded": d ? !!c : void 0,
        className: I1("ds-rowlist__row", c && "ds-rowlist__row--open", l && "ds-rowlist__row--highlight", n === "lift" && "ds-rowlist__row--lift", n === "close" && "ds-rowlist__row--closing", L && "ds-rowlist__row--charring", u),
        onKeyDown: (z) => {
          s && z.target === z.currentTarget && (z.key === "Enter" || z.key === " ") && (z.preventDefault(), s());
        },
        ...f
      },
      a.createElement("div", { className: I1("ds-rowlist__cols ds-rowlist__line", s && "ds-rowlist__line--toggle"), onClick: s && !c ? s : void 0 }, h),
      d ? a.createElement("div", { className: "ds-rowlist__detail", "aria-hidden": !c }, a.createElement("div", null, a.createElement("div", { className: "ds-rowlist__detail-in" }, d))) : null,
      v ? a.createElement(
        "button",
        {
          type: "button",
          className: "ds-rowlist__handle",
          tabIndex: -1,
          "aria-label": m || "Drag to reorder",
          onPointerDown: v,
          onClick: (z) => z.stopPropagation()
        },
        r.Icon ? a.createElement(r.Icon, { name: "grip-vertical", size: 14 }) : "⋮"
      ) : null
    )
  );
}
const ze = ["Urgent", "High", "Medium", "Low"];
function Ce({ level: t = 1, labels: e = ze, onChange: h, className: d = "", ...c }) {
  const l = t === 0 ? 3 : Math.max(0, 4 - t), n = [1, 2, 3].map((M) => a.createElement("i", { key: M, "data-on": M <= l })), p = { className: I1("ds-priority", d), "data-level": t, title: e[t] };
  return h ? a.createElement("button", { type: "button", ...p, "aria-label": `Priority: ${e[t]}. Change`, onClick: (M) => {
    M.stopPropagation(), h((t + 1) % e.length);
  }, ...c }, n) : a.createElement("span", { ...p, role: "img", "aria-label": `Priority: ${e[t]}`, ...c }, n);
}
function Se({ value: t = 0, max: e = 5, label: h = "Effort", onChange: d, className: c = "", ...l }) {
  const [n, p] = a.useState(0), M = Array.from({ length: e }, (i, o) => o + 1);
  return d ? a.createElement(
    "span",
    { className: I1("ds-effort", "ds-effort--input", c), role: "radiogroup", "aria-label": h, onMouseLeave: () => p(0), onClick: (i) => i.stopPropagation(), ...l },
    M.map((i) => a.createElement("button", {
      key: i,
      type: "button",
      role: "radio",
      "aria-checked": i === t,
      "aria-label": `${h} ${i} of ${e}`,
      "data-on": i <= t,
      "data-hint": !!n && i <= n,
      onMouseEnter: () => p(i),
      onFocus: () => p(i),
      onBlur: () => p(0),
      onClick: () => d(i)
    }))
  ) : a.createElement(
    "span",
    { className: I1("ds-effort", c), role: "img", "aria-label": `${h}: ${t} of ${e}`, ...l },
    M.map((i) => a.createElement("i", { key: i, "data-on": i <= t }))
  );
}
function je({ people: t = [], max: e = 3, size: h = "md", onClick: d, label: c, empty: l = "—", className: n = "", ...p }) {
  const M = t.slice(0, e), i = t.length - M.length, o = c || (t.length ? t.map((v) => v.name || v.initials).join(", ") : "No one"), s = t.length ? M.map((v, m) => a.createElement(
    "span",
    { key: v.id || v.initials || m, style: { zIndex: M.length - m + 1 } },
    a.createElement(r.Avatar, { size: h, initials: v.initials, src: v.src, alt: v.name })
  )).concat(i > 0 ? [a.createElement("span", { key: "more", style: { zIndex: 0 } }, a.createElement(r.Avatar, { size: h, initials: "+" + i }))] : []) : a.createElement("span", { className: "ds-avatar-stack__empty" }, l);
  return d ? a.createElement("button", { type: "button", className: I1("ds-avatar-stack", n), "aria-label": `People: ${o}. Change`, onClick: d, ...p }, s) : a.createElement("span", { className: I1("ds-avatar-stack", n), role: "img", "aria-label": `People: ${o}`, ...p }, s);
}
function Be(t) {
  const e = a.useRef(null), h = a.useCallback(() => {
    const d = /* @__PURE__ */ new Map(), c = t.current;
    c && c.querySelectorAll("[data-slot]").forEach((l) => d.set(l.dataset.slot, l.getBoundingClientRect().top)), e.current = d;
  }, [t]);
  return a.useLayoutEffect(() => {
    const d = e.current, c = t.current;
    !d || !c || (e.current = null, !r2() && c.querySelectorAll("[data-slot]").forEach((l) => {
      if (l.classList.contains("ds-rowlist__slot--dragging")) return;
      const n = d.get(l.dataset.slot);
      if (n == null) return;
      const p = n - l.getBoundingClientRect().top;
      if (Math.abs(p) < 1) return;
      l.style.transition = "none", l.style.translate = `0 ${p}px`, l.getBoundingClientRect(), l.style.transition = `translate ${D1("--mo-dur-out") || "400ms"} ${D1("--mo-ease-out") || "ease-out"}`, l.style.translate = "0 0";
      const M = () => {
        l.style.transition = "", l.style.translate = "", l.removeEventListener("transitionend", M);
      };
      l.addEventListener("transitionend", M);
    }));
  }), h;
}
function $e({ items: t, setItems: e, getId: h = (n) => n.id, slots: d, flip: c, onStart: l }) {
  const [n, p] = a.useState(null), M = a.useRef(null), i = a.useRef(t);
  return i.current = t, a.useLayoutEffect(() => {
    const s = M.current;
    if (!s) return;
    const v = d.current[s.id];
    v && (v.style.translate = `0 ${s.startTop + s.dy - v.offsetTop}px`);
  }), { dragId: n, onPointerDown: (s) => (v) => {
    if (v.button !== 0) return;
    v.preventDefault(), v.stopPropagation();
    const m = d.current[s];
    if (!m) return;
    l && l(s), M.current = { id: s, startY: v.clientY, startTop: m.offsetTop, dy: 0 }, p(s);
    const y = (u) => {
      const f = M.current;
      if (!f) return;
      f.dy = u.clientY - f.startY;
      const L = d.current[f.id];
      if (!L) return;
      const z = f.startTop + f.dy + L.offsetHeight / 2, E = i.current, _ = E.filter((w) => h(w) !== f.id);
      let B = 0;
      _.forEach((w) => {
        const H = d.current[h(w)];
        H && H.offsetTop + H.offsetHeight / 2 < z && B++;
      });
      const $ = E.findIndex((w) => h(w) === f.id);
      if (B === $) {
        L.style.translate = `0 ${f.startTop + f.dy - L.offsetTop}px`;
        return;
      }
      c && c();
      const A = _.slice();
      A.splice(B, 0, E[$]), e(A);
    }, g = () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", g);
      const u = M.current;
      M.current = null;
      const f = u && d.current[u.id];
      f && (f.style.transition = r2() ? "none" : `translate ${D1("--mo-dur-out-spring")} ${D1("--mo-ease-out-spring")}`, f.style.translate = "0 0", setTimeout(() => {
        f.style.transition = "", f.style.translate = "";
      }, K1("--mo-dur-out-spring", 1e3))), p(null);
    };
    window.addEventListener("pointermove", y), window.addEventListener("pointerup", g), window.addEventListener("pointercancel", g);
  } };
}
function Pa(t, e = {}) {
  return new Promise((h) => {
    if (!t || r2()) {
      h();
      return;
    }
    const d = t.getBoundingClientRect(), c = 28, l = window.devicePixelRatio || 1, n = d.width, p = d.height, M = n + c * 2, i = p + c * 2, o = document.createElement("canvas");
    o.className = "ds-burn", o.width = M * l, o.height = i * l, o.style.cssText = `position:absolute;pointer-events:none;width:${M}px;height:${i}px;left:${-c}px;top:${-c}px`, t.style.overflow = "visible", t.parentElement && (t.parentElement.style.overflow = "visible"), t.appendChild(o), t.classList.add("ds-rowlist__row--burnt");
    const s = o.getContext("2d");
    s.scale(l, l);
    const v = e.color || D1("--color-primary-700") || "#242424", m = D1("--color-warning-500") || "#f59e0b", y = D1("--color-error-500") || "#ef4444", g = [D1("--color-neutral-300"), D1("--color-neutral-400"), D1("--color-neutral-500")], u = parseFloat(getComputedStyle(t).borderTopLeftRadius) || 0, f = Math.random() * 10, L = (H) => Math.sin(H * 0.35 + f) * 4 + Math.sin(H * 0.11 + f * 2) * 7, z = [], E = e.duration || K1("--mo-dur-in-out-spring", 1500) * 0.8, _ = performance.now(), B = 26, $ = (H) => H < 0.5 ? 4 * H * H * H : 1 - Math.pow(-2 * H + 2, 3) / 2;
    let A = !1;
    function w(H) {
      const T = Math.min(1, (H - _) / E), C = -B + $(T) * (n + B * 2);
      s.clearRect(0, 0, M, i), s.save(), s.translate(c, c), s.beginPath(), s.roundRect ? s.roundRect(0, 0, n, p, u) : s.rect(0, 0, n, p), s.clip();
      const P = s.createLinearGradient(C - B, 0, C + 2, 0);
      P.addColorStop(0, "rgba(0,0,0,0)"), P.addColorStop(0.45, y + "55"), P.addColorStop(0.8, m), P.addColorStop(1, v);
      for (let q = 0; q < p; q++)
        s.save(), s.translate(L(q), 0), s.fillStyle = P, s.fillRect(C - B, q, B + 2, 1), s.fillStyle = v, s.fillRect(C + 2, q, n - C + 20, 1), s.restore();
      if (s.restore(), T < 1) for (let q = 0; q < 14; q++) {
        const h1 = Math.random() * p, e1 = C + L(h1) - B * 0.4;
        e1 < 0 || e1 > n || z.push({ x: e1 + c, y: h1 + c, vx: -0.25 - Math.random() * 0.8, vy: -0.15 - Math.random() * 0.6, life: 1, s: 0.8 + Math.random() * 1.4, c: g[q % 3] });
      }
      for (const q of z)
        q.x += q.vx, q.y += q.vy, q.vy -= 6e-3, q.vx *= 0.99, q.life -= 0.016;
      for (const q of z) q.life > 0 && (s.globalAlpha = q.life * 0.8, s.fillStyle = q.c, s.beginPath(), s.arc(q.x, q.y, q.s, 0, 6.283), s.fill());
      for (s.globalAlpha = 1; z.length && z[0].life <= 0; ) z.shift();
      T >= 1 && !A && (A = !0, h()), T < 1 || z.length ? requestAnimationFrame(w) : o.remove();
    }
    requestAnimationFrame(w);
  });
}
async function Oe({ id: t, fate: e, wasOpen: h, setPhase: d, setGone: c, rowEl: l }) {
  const n = (p) => new Promise((M) => setTimeout(M, p));
  if (r2()) {
    c(t, !0), await n(K1("--mo-dur-exit", 300));
    return;
  }
  if (e === "complete") {
    d(t, "lift"), await n(K1("--mo-dur-exit", 300) * 0.6), c(t, !0), await n(K1("--mo-dur-fold", 450));
    return;
  }
  d(t, "close"), await n((h ? K1("--mo-dur-fold", 450) : K1("--mo-dur-exit", 300)) * 0.45), d(t, "char"), await n(K1("--mo-dur-in-out", 800)), d(t, "burn"), await Pa(typeof l == "function" ? l() : l), c(t, !0), await n(K1("--mo-dur-fold", 450));
}
Object.assign(r, { RowList: Ae, RowListItem: Le, RowListSort: Ne, PriorityBars: Ce, EffortMeter: Se, AvatarStack: je, useFlip: Be, useDragReorder: $e, burnAway: Pa, leaveRow: Oe });
function F1(t, e) {
  const h = Object.keys(e)[0], d = a.forwardRef(function(c, l) {
    const { type: n, ...p } = c, M = r[e[n] || e[h]];
    return a.createElement(M, l ? { ...p, ref: l } : p);
  });
  return d.displayName = t, d.types = Object.keys(e), d;
}
const Pe = F1("Bar", { action: "ActionBar", footer: "AppFooter", header: "AppHeader", sheet: "SheetBar" }), qe = F1("Chart", { bar: "BarChart", compare: "ComparisonMeter", donut: "DonutChart", legend: "LegendGroup", line: "LineChart", ring: "ProgressRing", sparkline: "Sparkline", stacked: "BarChart" }), De = F1("Control", { checkbox: "Checkbox", radio: "Radio", radioGroup: "RadioGroup", segment: "Segment", segmentedControl: "SegmentedControl", toggle: "Toggle" }), Ze = F1("Field", { copyCode: "CopyCode", fieldTrigger: "FieldTrigger", helpText: "HelpText", input: "Input", label: "Label", numberStepper: "NumberStepper", select: "Select", slider: "Slider", numberArrows: "SpinButton", spinButton: "SpinButton", textarea: "Textarea" }), Te = F1("File", { chip: "FileChip", drop: "FileDrop" }), Re = F1("Loading", { layer: "LoadingLayer", overlay: "LoadingOverlay", spinner: "Spinner" }), Ie = F1("Navigation", { breadcrumb: "Breadcrumb", menu: "Menu", menuDropdown: "MenuDropdown", navItem: "NavItem", pagination: "Pagination", sidebar: "Sidebar", skipLink: "SkipLink", tabs: "Tabs" }), Fe = F1("Notification", { callout: "Callout", toast: "Toast" }), We = F1("Preview", { layout: "PreviewLayout", panel: "PreviewPanel" }), Ye = F1("Shell", { frame: "ShellFrame" });
Object.assign(r, { Bar: Pe, Chart: qe, Control: De, Field: Ze, File: Te, Loading: Re, Navigation: Ie, Notification: Fe, Preview: We, Shell: Ye });
const Ge = r.BarChart, Xe = r.DonutChart, Qe = r.LegendGroup, Je = r.useChartPatterns, ah = r.setChartPatterns, th = r.LegendItem, eh = r.LegendItemLine, hh = r.LegendItemPattern, dh = r.LegendItemSwatch, rh = r.LineChart, ch = r.StackedBarChart, lh = r.Button, nh = r.Divider, ph = r.Icon, ih = r.IconButton, sh = r.Label, oh = r.Logo, Mh = r.OrbButton, mh = r.SlideButton, uh = r.Text, vh = r.Avatar, yh = r.Badge, xh = r.Card, fh = r.Chip, gh = r.MetricCard, bh = r.Tag, wh = r.Checkbox, _h = r.HelpText, Eh = r.Input, Hh = r.Radio, Vh = r.Segment, kh = r.SegmentedControl, Ah = r.Select, Nh = r.NumberStepper, Lh = r.SpinButton, zh = r.Toggle, Ch = r.Breadcrumb, Sh = r.Menu, jh = r.MenuDropdown, Bh = r.MenuItem, $h = r.NavItem, Oh = r.Sidebar, Ph = r.SidebarGroup, qh = r.TabItem, Dh = r.Tabs, Zh = r.Dialog, Th = r.Drawer, Rh = r.Tooltip, Ih = r.placeTooltip, Fh = r.tooltipMotion, Wh = r.Table, Yh = r.TableCell, Kh = r.TableHeaderCell, Uh = r.TableHeaderRow, Gh = r.TableRow, Xh = r.TableShell, Qh = r.closeWithMotion, Jh = r.openWithMotion, ad = r.usePresence, td = r.Spinner, ed = r.PlainButton, hd = r.SlideIndicator, dd = r.Separator, rd = r.Pill, cd = r.Dot, ld = r.Sparkline, nd = r.ProgressRing, pd = r.PopoverPanel, id = r.FieldTrigger, sd = r.Kbd, od = r.Popover, Md = r.LoadingOverlay, md = r.LoadingLayer, ud = r.useLiveResult, vd = r.AnimatedNumber, yd = r.MeterPill, xd = r.Accordion, fd = r.Callout, gd = r.ComparisonMeter, bd = r.Link, wd = r.OfferCard, _d = r.ProgressSegments, Ed = r.RadioGroup, Hd = r.SheetBar, Vd = r.Slider, kd = r.SummaryList, Ad = r.ChoiceCard, Nd = r.ChoiceCardGroup, Ld = r.PreviewPanel, zd = r.PreviewLayout, Cd = r.ButtonFace, Sd = r.ComparisonCard, jd = r.ResultsRow, Bd = r.EmptyState, $d = r.Pagination, Od = r.FileChip, Pd = r.Calendar, qd = r.DateRange, Dd = r.LandingHero, Zd = r.MeterCard, Td = r.KpiTrendCard, Rd = r.MediaCard, Id = r.Toast, Fd = r.Reveal, Wd = r.Stepper, Yd = r.StepperBar, Kd = r.StepLink, Ud = r.stepperAdvance, Gd = r.appBarsOffset, Xd = r.observeAppBars, Qd = r.StepProgress, Jd = r.scrollThreshold, ar = r.useScrollThreshold, tr = r.ActionBar, er = r.AppHeader, hr = r.AppFooter, dr = r.CopyCode, rr = r.copyCodeSwap, cr = r.Textarea, lr = r.FileDrop, nr = r.SkipLink, pr = r.ShellFrame, ir = r.Bar, sr = r.Chart, or = r.Control, Mr = r.Field, mr = r.File, ur = r.Loading, vr = r.Navigation, yr = r.Notification, xr = r.Preview, fr = r.Shell, gr = r.RowList, br = r.RowListItem, wr = r.RowListSort, _r = r.PriorityBars, Er = r.EffortMeter, Hr = r.AvatarStack, Vr = r.useFlip, kr = r.useDragReorder, Ar = r.burnAway, Nr = r.leaveRow;
for (const t of Object.keys(r)) z1[t] = r[t];
export {
  xd as Accordion,
  tr as ActionBar,
  vd as AnimatedNumber,
  hr as AppFooter,
  er as AppHeader,
  vh as Avatar,
  Hr as AvatarStack,
  yh as Badge,
  ir as Bar,
  Ge as BarChart,
  Ch as Breadcrumb,
  lh as Button,
  Cd as ButtonFace,
  Pd as Calendar,
  fd as Callout,
  xh as Card,
  sr as Chart,
  wh as Checkbox,
  fh as Chip,
  Ad as ChoiceCard,
  Nd as ChoiceCardGroup,
  Sd as ComparisonCard,
  gd as ComparisonMeter,
  or as Control,
  dr as CopyCode,
  qd as DateRange,
  Zh as Dialog,
  nh as Divider,
  Xe as DonutChart,
  cd as Dot,
  Th as Drawer,
  Er as EffortMeter,
  Bd as EmptyState,
  Mr as Field,
  id as FieldTrigger,
  mr as File,
  Od as FileChip,
  lr as FileDrop,
  _h as HelpText,
  ph as Icon,
  ih as IconButton,
  Eh as Input,
  sd as Kbd,
  Td as KpiTrendCard,
  sh as Label,
  Dd as LandingHero,
  Qe as LegendGroup,
  th as LegendItem,
  eh as LegendItemLine,
  hh as LegendItemPattern,
  dh as LegendItemSwatch,
  rh as LineChart,
  bd as Link,
  ur as Loading,
  md as LoadingLayer,
  Md as LoadingOverlay,
  oh as Logo,
  Rd as MediaCard,
  Sh as Menu,
  jh as MenuDropdown,
  Bh as MenuItem,
  Zd as MeterCard,
  yd as MeterPill,
  gh as MetricCard,
  $h as NavItem,
  vr as Navigation,
  yr as Notification,
  Nh as NumberStepper,
  wd as OfferCard,
  Mh as OrbButton,
  $d as Pagination,
  rd as Pill,
  ed as PlainButton,
  od as Popover,
  pd as PopoverPanel,
  xr as Preview,
  zd as PreviewLayout,
  Ld as PreviewPanel,
  _r as PriorityBars,
  nd as ProgressRing,
  _d as ProgressSegments,
  Hh as Radio,
  Ed as RadioGroup,
  jd as ResultsRow,
  Fd as Reveal,
  gr as RowList,
  br as RowListItem,
  wr as RowListSort,
  Vh as Segment,
  kh as SegmentedControl,
  Ah as Select,
  dd as Separator,
  Hd as SheetBar,
  fr as Shell,
  pr as ShellFrame,
  Oh as Sidebar,
  Ph as SidebarGroup,
  nr as SkipLink,
  mh as SlideButton,
  hd as SlideIndicator,
  Vd as Slider,
  ld as Sparkline,
  Lh as SpinButton,
  td as Spinner,
  ch as StackedBarChart,
  Kd as StepLink,
  Qd as StepProgress,
  Wd as Stepper,
  Yd as StepperBar,
  kd as SummaryList,
  qh as TabItem,
  Wh as Table,
  Yh as TableCell,
  Kh as TableHeaderCell,
  Uh as TableHeaderRow,
  Gh as TableRow,
  Xh as TableShell,
  Dh as Tabs,
  bh as Tag,
  uh as Text,
  cr as Textarea,
  Id as Toast,
  zh as Toggle,
  Rh as Tooltip,
  Gd as appBarsOffset,
  Ar as burnAway,
  Qh as closeWithMotion,
  rr as copyCodeSwap,
  Nr as leaveRow,
  Xd as observeAppBars,
  Jh as openWithMotion,
  Ih as placeTooltip,
  Jd as scrollThreshold,
  ah as setChartPatterns,
  Ud as stepperAdvance,
  Fh as tooltipMotion,
  Je as useChartPatterns,
  kr as useDragReorder,
  Vr as useFlip,
  ud as useLiveResult,
  ad as usePresence,
  ar as useScrollThreshold
};
