import { defineComponent as B, computed as x, withDirectives as b, openBlock as o, createBlock as g, unref as e, normalizeStyle as k, normalizeClass as a, withCtx as w, createElementBlock as v, resolveDynamicComponent as z, createCommentVNode as u, toDisplayString as C, vShow as h } from "vue";
import { ElButton as S, ElIcon as r } from "element-plus";
const I = { key: 1 }, D = /* @__PURE__ */ B({
  __name: "Button",
  props: {
    row: null,
    config: null,
    size: null
  },
  setup(n) {
    const t = n, c = x(() => f()), i = x(() => !(typeof t.config.text == "function" ? t.config.text(t.row) : t.config.text)), f = () => {
      const l = typeof t.config.type == "function" ? t.config.type(t.row) : t.config.type || "primary";
      return l === "text" ? "" : l;
    };
    return (l, y) => {
      var d, s, m;
      return (typeof ((d = n.config) == null ? void 0 : d.perm) == "function" ? n.config.perm(n.row) : (s = n.config) == null ? void 0 : s.perm) ? b((o(), g(e(S), {
        key: 0,
        loading: typeof n.config.loading == "function" ? n.config.loading(n.row) : n.config.loading,
        size: n.config.size || n.size || "default",
        text: n.config.isTextBtn,
        link: ((m = n.config) == null ? void 0 : m.link) || !1,
        icon: n.config.svgIcon,
        style: k(
          typeof n.config.styles == "function" ? n.config.styles && n.config.styles(n.row) : n.config.styles
        ),
        type: e(c),
        disabled: typeof n.config.disabled == "function" ? n.config.disabled(n.row) : n.config.disabled,
        plain: n.config.plain || !1,
        class: a({
          "button-block": n.config.isBlockBtn,
          "button-notext": e(i)
        }),
        onClick: y[0] || (y[0] = () => n.config.click && !n.config.items && n.config.click(n.row))
      }, {
        default: w(() => [
          n.config.icon ? (o(), g(e(r), {
            key: 0,
            style: k(
              typeof n.config.iconStyles == "function" ? n.config.iconStyles(n.row) : n.config.iconStyles
            ),
            class: a({
              "button-notext": e(i)
            })
          }, {
            default: w(() => [
              n.config.icon ? (o(), v("i", {
                key: 0,
                class: a(
                  typeof n.config.icon == "function" ? n.config.icon(n.row) : n.config.icon
                )
              }, null, 2)) : (o(), g(z(n.config.svgIcon), { key: 1 }))
            ]),
            _: 1
          }, 8, ["style", "class"])) : u("", !0),
          e(i) ? u("", !0) : (o(), v("span", I, C(typeof n.config.text == "function" ? n.config.text(n.row) : n.config.text), 1))
        ]),
        _: 1
      }, 8, ["loading", "size", "text", "link", "icon", "style", "type", "disabled", "plain", "class"])), [
        [
          h,
          !(typeof n.config.hide == "function" ? n.config.hide(n.row) : n.config.hide)
        ]
      ]) : u("", !0);
    };
  }
});
const E = (n, t) => {
  const c = n.__vccOpts || n;
  for (const [i, f] of t)
    c[i] = f;
  return c;
}, T = /* @__PURE__ */ E(D, [["__scopeId", "data-v-41e8f588"]]), N = [
  T
], O = (n) => {
  N.map((t) => n.component(t.name, t));
}, q = {
  install: O
};
export {
  T as Button,
  q as default
};
