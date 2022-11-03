import { defineComponent as r, computed as k, resolveComponent as v, withDirectives as z, openBlock as o, createBlock as g, normalizeStyle as w, unref as i, normalizeClass as a, withCtx as b, createElementBlock as B, resolveDynamicComponent as S, createCommentVNode as u, toDisplayString as D, vShow as I } from "vue";
const E = { key: 1 }, T = /* @__PURE__ */ r({
  __name: "Button",
  props: {
    row: null,
    config: null,
    size: null
  },
  setup(n) {
    const t = n, c = k(() => f()), e = k(() => !(typeof t.config.text == "function" ? t.config.text(t.row) : t.config.text)), f = () => {
      const l = typeof t.config.type == "function" ? t.config.type(t.row) : t.config.type || "primary";
      return l === "text" ? "" : l;
    };
    return (l, s) => {
      var d, m, x;
      const C = v("el-icon"), h = v("el-button");
      return (typeof ((d = n.config) == null ? void 0 : d.perm) == "function" ? n.config.perm(n.row) : (m = n.config) == null ? void 0 : m.perm) ? z((o(), g(h, {
        key: 0,
        loading: typeof n.config.loading == "function" ? n.config.loading(n.row) : n.config.loading,
        size: n.config.size || n.size || "default",
        text: n.config.isTextBtn,
        link: ((x = n.config) == null ? void 0 : x.link) || !1,
        icon: n.config.svgIcon,
        style: w(
          typeof n.config.styles == "function" ? n.config.styles && n.config.styles(n.row) : n.config.styles
        ),
        type: i(c),
        disabled: typeof n.config.disabled == "function" ? n.config.disabled(n.row) : n.config.disabled,
        plain: n.config.plain || !1,
        class: a({
          "button-block": n.config.isBlockBtn,
          "button-notext": i(e)
        }),
        onClick: s[0] || (s[0] = () => n.config.click && !n.config.items && n.config.click(n.row))
      }, {
        default: b(() => [
          n.config.icon ? (o(), g(C, {
            key: 0,
            style: w(
              typeof n.config.iconStyles == "function" ? n.config.iconStyles(n.row) : n.config.iconStyles
            ),
            class: a({
              "button-notext": i(e)
            })
          }, {
            default: b(() => [
              n.config.icon ? (o(), B("i", {
                key: 0,
                class: a(
                  typeof n.config.icon == "function" ? n.config.icon(n.row) : n.config.icon
                )
              }, null, 2)) : (o(), g(S(n.config.svgIcon), { key: 1 }))
            ]),
            _: 1
          }, 8, ["style", "class"])) : u("", !0),
          i(e) ? u("", !0) : (o(), B("span", E, D(typeof n.config.text == "function" ? n.config.text(n.row) : n.config.text), 1))
        ]),
        _: 1
      }, 8, ["loading", "size", "text", "link", "icon", "style", "type", "disabled", "plain", "class"])), [
        [
          I,
          !(typeof n.config.hide == "function" ? n.config.hide(n.row) : n.config.hide)
        ]
      ]) : u("", !0);
    };
  }
});
const N = (n, t) => {
  const c = n.__vccOpts || n;
  for (const [e, f] of t)
    c[e] = f;
  return c;
}, O = /* @__PURE__ */ N(T, [["__scopeId", "data-v-355633c6"]]), V = [
  O
], y = function(n) {
  y.installed || (y.installed = !0, V.forEach((t) => {
    n.component(t.name, t);
  }));
}, q = {
  install: y
};
export {
  q as default
};
