(() => {
  "use strict";
  var e = {
      674: (e, t, n) => {
        var r = n(165);
        e.exports = function (e, t, n) {
          var o = [],
            i = !1,
            l = -1;
          function a() {
            for (l = 0; l < o.length; l += 2)
              try {
                e(o[l], r(o[l + 1]), s);
              } catch (e) {
                n.error(e);
              }
            l = -1;
          }
          function s() {
            i ||
              ((i = !0),
              t(function () {
                (i = !1), a();
              }));
          }
          return (
            (s.sync = a),
            {
              mount: function (t, n) {
                if (null != n && null == n.view && "function" != typeof n)
                  throw new TypeError(
                    "m.mount expects a component, not a vnode."
                  );
                var i = o.indexOf(t);
                i >= 0 && (o.splice(i, 2), i <= l && (l -= 2), e(t, [])),
                  null != n && (o.push(t, n), e(t, r(n), s));
              },
              redraw: s,
            }
          );
        };
      },
      804: (e, t, n) => {
        var r = n(165),
          o = n(726),
          i = n(921),
          l = n(555),
          a = n(462),
          s = n(500),
          u = n(910),
          c = n(333),
          f = {};
        function d(e) {
          try {
            return decodeURIComponent(e);
          } catch (t) {
            return e;
          }
        }
        e.exports = function (e, t) {
          var n,
            p,
            h,
            v,
            m,
            y,
            g =
              null == e
                ? null
                : "function" == typeof e.setImmediate
                ? e.setImmediate
                : e.setTimeout,
            w = i.resolve(),
            b = !1,
            x = !1,
            k = 0,
            S = f,
            E = {
              onbeforeupdate: function () {
                return !(!(k = k ? 2 : 1) || f === S);
              },
              onremove: function () {
                e.removeEventListener("popstate", z, !1),
                  e.removeEventListener("hashchange", C, !1);
              },
              view: function () {
                if (k && f !== S) {
                  var e = [r(h, v.key, v)];
                  return S && (e = S.render(e[0])), e;
                }
              },
            },
            j = (T.SKIP = {});
          function C() {
            b = !1;
            var r = e.location.hash;
            "#" !== T.prefix[0] &&
              ((r = e.location.search + r),
              "?" !== T.prefix[0] &&
                "/" !== (r = e.location.pathname + r)[0] &&
                (r = "/" + r));
            var o = r
                .concat()
                .replace(/(?:%[a-f89][a-f0-9])+/gim, d)
                .slice(T.prefix.length),
              i = a(o);
            function l(e) {
              console.error(e), O(p, null, { replace: !0 });
            }
            u(i.params, e.history.state),
              (function e(r) {
                for (; r < n.length; r++)
                  if (n[r].check(i)) {
                    var a = n[r].component,
                      s = n[r].route,
                      u = a,
                      c = (y = function (n) {
                        if (c === y) {
                          if (n === j) return e(r + 1);
                          (h =
                            null == n ||
                            ("function" != typeof n.view &&
                              "function" != typeof n)
                              ? "div"
                              : n),
                            (v = i.params),
                            (m = o),
                            (y = null),
                            (S = a.render ? a : null),
                            2 === k ? t.redraw() : ((k = 2), t.redraw.sync());
                        }
                      });
                    return void (a.view || "function" == typeof a
                      ? ((a = {}), c(u))
                      : a.onmatch
                      ? w
                          .then(function () {
                            return a.onmatch(i.params, o, s);
                          })
                          .then(c, o === p ? null : l)
                      : c("div"));
                  }
                if (o === p)
                  throw new Error("Could not resolve default route " + p + ".");
                O(p, null, { replace: !0 });
              })(0);
          }
          function z() {
            b || ((b = !0), g(C));
          }
          function O(t, n, r) {
            if (((t = l(t, n)), x)) {
              z();
              var o = r ? r.state : null,
                i = r ? r.title : null;
              r && r.replace
                ? e.history.replaceState(o, i, T.prefix + t)
                : e.history.pushState(o, i, T.prefix + t);
            } else e.location.href = T.prefix + t;
          }
          function T(r, o, i) {
            if (!r)
              throw new TypeError(
                "DOM element being rendered to does not exist."
              );
            if (
              ((n = Object.keys(i).map(function (e) {
                if ("/" !== e[0])
                  throw new SyntaxError("Routes must start with a '/'.");
                if (/:([^\/\.-]+)(\.{3})?:/.test(e))
                  throw new SyntaxError(
                    "Route parameter names must be separated with either '/', '.', or '-'."
                  );
                return { route: e, component: i[e], check: s(e) };
              })),
              (p = o),
              null != o)
            ) {
              var l = a(o);
              if (
                !n.some(function (e) {
                  return e.check(l);
                })
              )
                throw new ReferenceError(
                  "Default route doesn't match any known routes."
                );
            }
            "function" == typeof e.history.pushState
              ? e.addEventListener("popstate", z, !1)
              : "#" === T.prefix[0] && e.addEventListener("hashchange", C, !1),
              (x = !0),
              t.mount(r, E),
              C();
          }
          return (
            (T.set = function (e, t, n) {
              null != y && ((n = n || {}).replace = !0), (y = null), O(e, t, n);
            }),
            (T.get = function () {
              return m;
            }),
            (T.prefix = "#!"),
            (T.Link = {
              view: function (e) {
                var t,
                  n,
                  r,
                  i = o(
                    e.attrs.selector || "a",
                    c(e.attrs, ["options", "params", "selector", "onclick"]),
                    e.children
                  );
                return (
                  (i.attrs.disabled = Boolean(i.attrs.disabled))
                    ? ((i.attrs.href = null),
                      (i.attrs["aria-disabled"] = "true"))
                    : ((t = e.attrs.options),
                      (n = e.attrs.onclick),
                      (r = l(i.attrs.href, e.attrs.params)),
                      (i.attrs.href = T.prefix + r),
                      (i.attrs.onclick = function (e) {
                        var o;
                        "function" == typeof n
                          ? (o = n.call(e.currentTarget, e))
                          : null == n ||
                            "object" != typeof n ||
                            ("function" == typeof n.handleEvent &&
                              n.handleEvent(e)),
                          !1 === o ||
                            e.defaultPrevented ||
                            (0 !== e.button &&
                              0 !== e.which &&
                              1 !== e.which) ||
                            (e.currentTarget.target &&
                              "_self" !== e.currentTarget.target) ||
                            e.ctrlKey ||
                            e.metaKey ||
                            e.shiftKey ||
                            e.altKey ||
                            (e.preventDefault(),
                            (e.redraw = !1),
                            T.set(r, null, t));
                      })),
                  i
                );
              },
            }),
            (T.param = function (e) {
              return v && null != e ? v[e] : v;
            }),
            T
          );
        };
      },
      419: (e, t, n) => {
        var r = n(726);
        (r.trust = n(665)), (r.fragment = n(995)), (e.exports = r);
      },
      862: (e, t, n) => {
        var r = n(419),
          o = n(975),
          i = n(199),
          l = function () {
            return r.apply(this, arguments);
          };
        (l.m = r),
          (l.trust = r.trust),
          (l.fragment = r.fragment),
          (l.Fragment = "["),
          (l.mount = i.mount),
          (l.route = n(843)),
          (l.render = n(88)),
          (l.redraw = i.redraw),
          (l.request = o.request),
          (l.jsonp = o.jsonp),
          (l.parseQueryString = n(755)),
          (l.buildQueryString = n(224)),
          (l.parsePathname = n(462)),
          (l.buildPathname = n(555)),
          (l.vnode = n(165)),
          (l.PromisePolyfill = n(141)),
          (l.censor = n(333)),
          (e.exports = l);
      },
      199: (e, t, n) => {
        var r = n(88);
        e.exports = n(674)(
          r,
          "undefined" != typeof requestAnimationFrame
            ? requestAnimationFrame
            : null,
          "undefined" != typeof console ? console : null
        );
      },
      555: (e, t, n) => {
        var r = n(224),
          o = n(910);
        e.exports = function (e, t) {
          if (/:([^\/\.-]+)(\.{3})?:/.test(e))
            throw new SyntaxError(
              "Template parameter names must be separated by either a '/', '-', or '.'."
            );
          if (null == t) return e;
          var n = e.indexOf("?"),
            i = e.indexOf("#"),
            l = i < 0 ? e.length : i,
            a = n < 0 ? l : n,
            s = e.slice(0, a),
            u = {};
          o(u, t);
          var c = s.replace(/:([^\/\.-]+)(\.{3})?/g, function (e, n, r) {
              return (
                delete u[n],
                null == t[n] ? e : r ? t[n] : encodeURIComponent(String(t[n]))
              );
            }),
            f = c.indexOf("?"),
            d = c.indexOf("#"),
            p = d < 0 ? c.length : d,
            h = f < 0 ? p : f,
            v = c.slice(0, h);
          n >= 0 && (v += e.slice(n, l)),
            f >= 0 && (v += (n < 0 ? "?" : "&") + c.slice(f, p));
          var m = r(u);
          return (
            m && (v += (n < 0 && f < 0 ? "?" : "&") + m),
            i >= 0 && (v += e.slice(i)),
            d >= 0 && (v += (i < 0 ? "" : "&") + c.slice(d)),
            v
          );
        };
      },
      500: (e, t, n) => {
        var r = n(462);
        e.exports = function (e) {
          var t = r(e),
            n = Object.keys(t.params),
            o = [],
            i = new RegExp(
              "^" +
                t.path.replace(
                  /:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
                  function (e, t, n) {
                    return null == t
                      ? "\\" + e
                      : (o.push({ k: t, r: "..." === n }),
                        "..." === n
                          ? "(.*)"
                          : "." === n
                          ? "([^/]+)\\."
                          : "([^/]+)" + (n || ""));
                  }
                ) +
                "$"
            );
          return function (e) {
            for (var r = 0; r < n.length; r++)
              if (t.params[n[r]] !== e.params[n[r]]) return !1;
            if (!o.length) return i.test(e.path);
            var l = i.exec(e.path);
            if (null == l) return !1;
            for (r = 0; r < o.length; r++)
              e.params[o[r].k] = o[r].r
                ? l[r + 1]
                : decodeURIComponent(l[r + 1]);
            return !0;
          };
        };
      },
      462: (e, t, n) => {
        var r = n(755);
        e.exports = function (e) {
          var t = e.indexOf("?"),
            n = e.indexOf("#"),
            o = n < 0 ? e.length : n,
            i = t < 0 ? o : t,
            l = e.slice(0, i).replace(/\/{2,}/g, "/");
          return (
            l
              ? ("/" !== l[0] && (l = "/" + l),
                l.length > 1 && "/" === l[l.length - 1] && (l = l.slice(0, -1)))
              : (l = "/"),
            { path: l, params: t < 0 ? {} : r(e.slice(t + 1, o)) }
          );
        };
      },
      141: (e) => {
        var t = function (e) {
          if (!(this instanceof t))
            throw new Error("Promise must be called with 'new'.");
          if ("function" != typeof e)
            throw new TypeError("executor must be a function.");
          var n = this,
            r = [],
            o = [],
            i = u(r, !0),
            l = u(o, !1),
            a = (n._instance = { resolvers: r, rejectors: o }),
            s = "function" == typeof setImmediate ? setImmediate : setTimeout;
          function u(e, t) {
            return function i(u) {
              var f;
              try {
                if (
                  !t ||
                  null == u ||
                  ("object" != typeof u && "function" != typeof u) ||
                  "function" != typeof (f = u.then)
                )
                  s(function () {
                    t ||
                      0 !== e.length ||
                      console.error("Possible unhandled promise rejection:", u);
                    for (var n = 0; n < e.length; n++) e[n](u);
                    (r.length = 0),
                      (o.length = 0),
                      (a.state = t),
                      (a.retry = function () {
                        i(u);
                      });
                  });
                else {
                  if (u === n)
                    throw new TypeError(
                      "Promise can't be resolved with itself."
                    );
                  c(f.bind(u));
                }
              } catch (e) {
                l(e);
              }
            };
          }
          function c(e) {
            var t = 0;
            function n(e) {
              return function (n) {
                t++ > 0 || e(n);
              };
            }
            var r = n(l);
            try {
              e(n(i), r);
            } catch (e) {
              r(e);
            }
          }
          c(e);
        };
        (t.prototype.then = function (e, n) {
          var r,
            o,
            i = this._instance;
          function l(e, t, n, l) {
            t.push(function (t) {
              if ("function" != typeof e) n(t);
              else
                try {
                  r(e(t));
                } catch (e) {
                  o && o(e);
                }
            }),
              "function" == typeof i.retry && l === i.state && i.retry();
          }
          var a = new t(function (e, t) {
            (r = e), (o = t);
          });
          return l(e, i.resolvers, r, !0), l(n, i.rejectors, o, !1), a;
        }),
          (t.prototype.catch = function (e) {
            return this.then(null, e);
          }),
          (t.prototype.finally = function (e) {
            return this.then(
              function (n) {
                return t.resolve(e()).then(function () {
                  return n;
                });
              },
              function (n) {
                return t.resolve(e()).then(function () {
                  return t.reject(n);
                });
              }
            );
          }),
          (t.resolve = function (e) {
            return e instanceof t
              ? e
              : new t(function (t) {
                  t(e);
                });
          }),
          (t.reject = function (e) {
            return new t(function (t, n) {
              n(e);
            });
          }),
          (t.all = function (e) {
            return new t(function (t, n) {
              var r = e.length,
                o = 0,
                i = [];
              if (0 === e.length) t([]);
              else
                for (var l = 0; l < e.length; l++)
                  !(function (l) {
                    function a(e) {
                      o++, (i[l] = e), o === r && t(i);
                    }
                    null == e[l] ||
                    ("object" != typeof e[l] && "function" != typeof e[l]) ||
                    "function" != typeof e[l].then
                      ? a(e[l])
                      : e[l].then(a, n);
                  })(l);
            });
          }),
          (t.race = function (e) {
            return new t(function (t, n) {
              for (var r = 0; r < e.length; r++) e[r].then(t, n);
            });
          }),
          (e.exports = t);
      },
      921: (e, t, n) => {
        var r = n(141);
        "undefined" != typeof window
          ? (void 0 === window.Promise
              ? (window.Promise = r)
              : window.Promise.prototype.finally ||
                (window.Promise.prototype.finally = r.prototype.finally),
            (e.exports = window.Promise))
          : void 0 !== n.g
          ? (void 0 === n.g.Promise
              ? (n.g.Promise = r)
              : n.g.Promise.prototype.finally ||
                (n.g.Promise.prototype.finally = r.prototype.finally),
            (e.exports = n.g.Promise))
          : (e.exports = r);
      },
      224: (e) => {
        e.exports = function (e) {
          if ("[object Object]" !== Object.prototype.toString.call(e))
            return "";
          var t = [];
          for (var n in e) r(n, e[n]);
          return t.join("&");
          function r(e, n) {
            if (Array.isArray(n))
              for (var o = 0; o < n.length; o++) r(e + "[" + o + "]", n[o]);
            else if ("[object Object]" === Object.prototype.toString.call(n))
              for (var o in n) r(e + "[" + o + "]", n[o]);
            else
              t.push(
                encodeURIComponent(e) +
                  (null != n && "" !== n ? "=" + encodeURIComponent(n) : "")
              );
          }
        };
      },
      755: (e) => {
        function t(e) {
          try {
            return decodeURIComponent(e);
          } catch (t) {
            return e;
          }
        }
        e.exports = function (e) {
          if ("" === e || null == e) return {};
          "?" === e.charAt(0) && (e = e.slice(1));
          for (var n = e.split("&"), r = {}, o = {}, i = 0; i < n.length; i++) {
            var l = n[i].split("="),
              a = t(l[0]),
              s = 2 === l.length ? t(l[1]) : "";
            "true" === s ? (s = !0) : "false" === s && (s = !1);
            var u = a.split(/\]\[?|\[/),
              c = o;
            a.indexOf("[") > -1 && u.pop();
            for (var f = 0; f < u.length; f++) {
              var d = u[f],
                p = u[f + 1],
                h = "" == p || !isNaN(parseInt(p, 10));
              if ("" === d)
                null == r[(a = u.slice(0, f).join())] &&
                  (r[a] = Array.isArray(c) ? c.length : 0),
                  (d = r[a]++);
              else if ("__proto__" === d) break;
              if (f === u.length - 1) c[d] = s;
              else {
                var v = Object.getOwnPropertyDescriptor(c, d);
                null != v && (v = v.value),
                  null == v && (c[d] = v = h ? [] : {}),
                  (c = v);
              }
            }
          }
          return o;
        };
      },
      88: (e, t, n) => {
        e.exports = n(147)("undefined" != typeof window ? window : null);
      },
      995: (e, t, n) => {
        var r = n(165),
          o = n(178);
        e.exports = function () {
          var e = o.apply(0, arguments);
          return (
            (e.tag = "["), (e.children = r.normalizeChildren(e.children)), e
          );
        };
      },
      726: (e, t, n) => {
        var r = n(165),
          o = n(178),
          i = n(795),
          l =
            /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,
          a = {};
        function s(e) {
          for (var t in e) if (i.call(e, t)) return !1;
          return !0;
        }
        e.exports = function (e) {
          if (
            null == e ||
            ("string" != typeof e &&
              "function" != typeof e &&
              "function" != typeof e.view)
          )
            throw Error("The selector must be either a string or a component.");
          var t = o.apply(1, arguments);
          return "string" == typeof e &&
            ((t.children = r.normalizeChildren(t.children)), "[" !== e)
            ? (function (e, t) {
                var n = t.attrs,
                  r = i.call(n, "class"),
                  o = r ? n.class : n.className;
                if (((t.tag = e.tag), (t.attrs = {}), !s(e.attrs) && !s(n))) {
                  var l = {};
                  for (var a in n) i.call(n, a) && (l[a] = n[a]);
                  n = l;
                }
                for (var a in e.attrs)
                  i.call(e.attrs, a) &&
                    "className" !== a &&
                    !i.call(n, a) &&
                    (n[a] = e.attrs[a]);
                for (var a in ((null == o && null == e.attrs.className) ||
                  (n.className =
                    null != o
                      ? null != e.attrs.className
                        ? String(e.attrs.className) + " " + String(o)
                        : o
                      : null != e.attrs.className
                      ? e.attrs.className
                      : null),
                r && (n.class = null),
                n))
                  if (i.call(n, a) && "key" !== a) {
                    t.attrs = n;
                    break;
                  }
                return t;
              })(
                a[e] ||
                  (function (e) {
                    for (var t, n = "div", r = [], o = {}; (t = l.exec(e)); ) {
                      var i = t[1],
                        s = t[2];
                      if ("" === i && "" !== s) n = s;
                      else if ("#" === i) o.id = s;
                      else if ("." === i) r.push(s);
                      else if ("[" === t[3][0]) {
                        var u = t[6];
                        u &&
                          (u = u
                            .replace(/\\(["'])/g, "$1")
                            .replace(/\\\\/g, "\\")),
                          "class" === t[4]
                            ? r.push(u)
                            : (o[t[4]] = "" === u ? u : u || !0);
                      }
                    }
                    return (
                      r.length > 0 && (o.className = r.join(" ")),
                      (a[e] = { tag: n, attrs: o })
                    );
                  })(e),
                t
              )
            : ((t.tag = e), t);
        };
      },
      178: (e, t, n) => {
        var r = n(165);
        e.exports = function () {
          var e,
            t = arguments[this],
            n = this + 1;
          if (
            (null == t
              ? (t = {})
              : ("object" != typeof t || null != t.tag || Array.isArray(t)) &&
                ((t = {}), (n = this)),
            arguments.length === n + 1)
          )
            (e = arguments[n]), Array.isArray(e) || (e = [e]);
          else for (e = []; n < arguments.length; ) e.push(arguments[n++]);
          return r("", t.key, t, e);
        };
      },
      147: (e, t, n) => {
        var r = n(165);
        e.exports = function (e) {
          var t,
            n = e && e.document,
            o = {
              svg: "http://www.w3.org/2000/svg",
              math: "http://www.w3.org/1998/Math/MathML",
            };
          function i(e) {
            return (e.attrs && e.attrs.xmlns) || o[e.tag];
          }
          function l(e, t) {
            if (e.state !== t)
              throw new Error("'vnode.state' must not be modified.");
          }
          function a(e) {
            var t = e.state;
            try {
              return this.apply(t, arguments);
            } finally {
              l(e, t);
            }
          }
          function s() {
            try {
              return n.activeElement;
            } catch (e) {
              return null;
            }
          }
          function u(e, t, n, r, o, i, l) {
            for (var a = n; a < r; a++) {
              var s = t[a];
              null != s && c(e, s, o, l, i);
            }
          }
          function c(e, t, o, l, s) {
            var f = t.tag;
            if ("string" == typeof f)
              switch (
                ((t.state = {}), null != t.attrs && M(t.attrs, t, o), f)
              ) {
                case "#":
                  !(function (e, t, r) {
                    (t.dom = n.createTextNode(t.children)), b(e, t.dom, r);
                  })(e, t, s);
                  break;
                case "<":
                  d(e, t, l, s);
                  break;
                case "[":
                  !(function (e, t, r, o, i) {
                    var l = n.createDocumentFragment();
                    if (null != t.children) {
                      var a = t.children;
                      u(l, a, 0, a.length, r, null, o);
                    }
                    (t.dom = l.firstChild),
                      (t.domSize = l.childNodes.length),
                      b(e, l, i);
                  })(e, t, o, l, s);
                  break;
                default:
                  !(function (e, t, r, o, l) {
                    var a = t.tag,
                      s = t.attrs,
                      c = s && s.is,
                      f = (o = i(t) || o)
                        ? c
                          ? n.createElementNS(o, a, { is: c })
                          : n.createElementNS(o, a)
                        : c
                        ? n.createElement(a, { is: c })
                        : n.createElement(a);
                    if (
                      ((t.dom = f),
                      null != s &&
                        (function (e, t, n) {
                          "input" === e.tag &&
                            null != t.type &&
                            e.dom.setAttribute("type", t.type);
                          var r =
                            null != t && "input" === e.tag && "file" === t.type;
                          for (var o in t) z(e, o, null, t[o], n, r);
                        })(t, s, o),
                      b(e, f, l),
                      !x(t) && null != t.children)
                    ) {
                      var d = t.children;
                      u(f, d, 0, d.length, r, null, o),
                        "select" === t.tag &&
                          null != s &&
                          (function (e, t) {
                            if ("value" in t)
                              if (null === t.value)
                                -1 !== e.dom.selectedIndex &&
                                  (e.dom.value = null);
                              else {
                                var n = "" + t.value;
                                (e.dom.value === n &&
                                  -1 !== e.dom.selectedIndex) ||
                                  (e.dom.value = n);
                              }
                            "selectedIndex" in t &&
                              z(
                                e,
                                "selectedIndex",
                                null,
                                t.selectedIndex,
                                void 0
                              );
                          })(t, s);
                    }
                  })(e, t, o, l, s);
              }
            else
              !(function (e, t, n, o, i) {
                (function (e, t) {
                  var n;
                  if ("function" == typeof e.tag.view) {
                    if (
                      ((e.state = Object.create(e.tag)),
                      null != (n = e.state.view).$$reentrantLock$$)
                    )
                      return;
                    n.$$reentrantLock$$ = !0;
                  } else {
                    if (
                      ((e.state = void 0),
                      null != (n = e.tag).$$reentrantLock$$)
                    )
                      return;
                    (n.$$reentrantLock$$ = !0),
                      (e.state =
                        null != e.tag.prototype &&
                        "function" == typeof e.tag.prototype.view
                          ? new e.tag(e)
                          : e.tag(e));
                  }
                  if (
                    (M(e.state, e, t),
                    null != e.attrs && M(e.attrs, e, t),
                    (e.instance = r.normalize(a.call(e.state.view, e))),
                    e.instance === e)
                  )
                    throw Error(
                      "A view cannot return the vnode it received as argument"
                    );
                  n.$$reentrantLock$$ = null;
                })(t, n),
                  null != t.instance
                    ? (c(e, t.instance, n, o, i),
                      (t.dom = t.instance.dom),
                      (t.domSize = null != t.dom ? t.instance.domSize : 0))
                    : (t.domSize = 0);
              })(e, t, o, l, s);
          }
          var f = {
            caption: "table",
            thead: "table",
            tbody: "table",
            tfoot: "table",
            tr: "tbody",
            th: "tr",
            td: "tr",
            colgroup: "table",
            col: "colgroup",
          };
          function d(e, t, r, o) {
            var i = t.children.match(/^\s*?<(\w+)/im) || [],
              l = n.createElement(f[i[1]] || "div");
            "http://www.w3.org/2000/svg" === r
              ? ((l.innerHTML =
                  '<svg xmlns="http://www.w3.org/2000/svg">' +
                  t.children +
                  "</svg>"),
                (l = l.firstChild))
              : (l.innerHTML = t.children),
              (t.dom = l.firstChild),
              (t.domSize = l.childNodes.length),
              (t.instance = []);
            for (var a, s = n.createDocumentFragment(); (a = l.firstChild); )
              t.instance.push(a), s.appendChild(a);
            b(e, s, o);
          }
          function p(e, t, n, r, o, i) {
            if (t !== n && (null != t || null != n))
              if (null == t || 0 === t.length) u(e, n, 0, n.length, r, o, i);
              else if (null == n || 0 === n.length) k(e, t, 0, t.length);
              else {
                var l = null != t[0] && null != t[0].key,
                  a = null != n[0] && null != n[0].key,
                  s = 0,
                  f = 0;
                if (!l) for (; f < t.length && null == t[f]; ) f++;
                if (!a) for (; s < n.length && null == n[s]; ) s++;
                if (l !== a)
                  k(e, t, f, t.length), u(e, n, s, n.length, r, o, i);
                else if (a) {
                  for (
                    var d, p, w, b, x, E = t.length - 1, j = n.length - 1;
                    E >= f &&
                    j >= s &&
                    ((w = t[E]), (b = n[j]), w.key === b.key);

                  )
                    w !== b && h(e, w, b, r, o, i),
                      null != b.dom && (o = b.dom),
                      E--,
                      j--;
                  for (
                    ;
                    E >= f &&
                    j >= s &&
                    ((d = t[f]), (p = n[s]), d.key === p.key);

                  )
                    f++, s++, d !== p && h(e, d, p, r, y(t, f, o), i);
                  for (
                    ;
                    E >= f &&
                    j >= s &&
                    s !== j &&
                    d.key === b.key &&
                    w.key === p.key;

                  )
                    g(e, w, (x = y(t, f, o))),
                      w !== p && h(e, w, p, r, x, i),
                      ++s <= --j && g(e, d, o),
                      d !== b && h(e, d, b, r, o, i),
                      null != b.dom && (o = b.dom),
                      f++,
                      (w = t[--E]),
                      (b = n[j]),
                      (d = t[f]),
                      (p = n[s]);
                  for (; E >= f && j >= s && w.key === b.key; )
                    w !== b && h(e, w, b, r, o, i),
                      null != b.dom && (o = b.dom),
                      j--,
                      (w = t[--E]),
                      (b = n[j]);
                  if (s > j) k(e, t, f, E + 1);
                  else if (f > E) u(e, n, s, j + 1, r, o, i);
                  else {
                    var C,
                      z,
                      O = o,
                      T = j - s + 1,
                      A = new Array(T),
                      N = 0,
                      P = 0,
                      I = 2147483647,
                      $ = 0;
                    for (P = 0; P < T; P++) A[P] = -1;
                    for (P = j; P >= s; P--) {
                      null == C && (C = v(t, f, E + 1));
                      var L = C[(b = n[P]).key];
                      null != L &&
                        ((I = L < I ? L : -1),
                        (A[P - s] = L),
                        (w = t[L]),
                        (t[L] = null),
                        w !== b && h(e, w, b, r, o, i),
                        null != b.dom && (o = b.dom),
                        $++);
                    }
                    if (
                      ((o = O), $ !== E - f + 1 && k(e, t, f, E + 1), 0 === $)
                    )
                      u(e, n, s, j + 1, r, o, i);
                    else if (-1 === I)
                      for (
                        z = (function (e) {
                          var t = [0],
                            n = 0,
                            r = 0,
                            o = 0,
                            i = (m.length = e.length);
                          for (o = 0; o < i; o++) m[o] = e[o];
                          for (o = 0; o < i; ++o)
                            if (-1 !== e[o]) {
                              var l = t[t.length - 1];
                              if (e[l] < e[o]) (m[o] = l), t.push(o);
                              else {
                                for (n = 0, r = t.length - 1; n < r; ) {
                                  var a = (n >>> 1) + (r >>> 1) + (n & r & 1);
                                  e[t[a]] < e[o] ? (n = a + 1) : (r = a);
                                }
                                e[o] < e[t[n]] &&
                                  (n > 0 && (m[o] = t[n - 1]), (t[n] = o));
                              }
                            }
                          for (r = t[(n = t.length) - 1]; n-- > 0; )
                            (t[n] = r), (r = m[r]);
                          return (m.length = 0), t;
                        })(A),
                          N = z.length - 1,
                          P = j;
                        P >= s;
                        P--
                      )
                        (p = n[P]),
                          -1 === A[P - s]
                            ? c(e, p, r, i, o)
                            : z[N] === P - s
                            ? N--
                            : g(e, p, o),
                          null != p.dom && (o = n[P].dom);
                    else
                      for (P = j; P >= s; P--)
                        (p = n[P]),
                          -1 === A[P - s] && c(e, p, r, i, o),
                          null != p.dom && (o = n[P].dom);
                  }
                } else {
                  var R = t.length < n.length ? t.length : n.length;
                  for (s = s < f ? s : f; s < R; s++)
                    (d = t[s]) === (p = n[s]) ||
                      (null == d && null == p) ||
                      (null == d
                        ? c(e, p, r, i, y(t, s + 1, o))
                        : null == p
                        ? S(e, d)
                        : h(e, d, p, r, y(t, s + 1, o), i));
                  t.length > R && k(e, t, s, t.length),
                    n.length > R && u(e, n, s, n.length, r, o, i);
                }
              }
          }
          function h(e, t, n, o, l, s) {
            var u = t.tag;
            if (u === n.tag) {
              if (
                ((n.state = t.state),
                (n.events = t.events),
                (function (e, t) {
                  do {
                    var n;
                    if (
                      null != e.attrs &&
                      "function" == typeof e.attrs.onbeforeupdate &&
                      void 0 !== (n = a.call(e.attrs.onbeforeupdate, e, t)) &&
                      !n
                    )
                      break;
                    if (
                      "string" != typeof e.tag &&
                      "function" == typeof e.state.onbeforeupdate &&
                      void 0 !== (n = a.call(e.state.onbeforeupdate, e, t)) &&
                      !n
                    )
                      break;
                    return !1;
                  } while (0);
                  return (
                    (e.dom = t.dom),
                    (e.domSize = t.domSize),
                    (e.instance = t.instance),
                    (e.attrs = t.attrs),
                    (e.children = t.children),
                    (e.text = t.text),
                    !0
                  );
                })(n, t))
              )
                return;
              if ("string" == typeof u)
                switch ((null != n.attrs && D(n.attrs, n, o), u)) {
                  case "#":
                    !(function (e, t) {
                      e.children.toString() !== t.children.toString() &&
                        (e.dom.nodeValue = t.children),
                        (t.dom = e.dom);
                    })(t, n);
                    break;
                  case "<":
                    !(function (e, t, n, r, o) {
                      t.children !== n.children
                        ? (E(e, t), d(e, n, r, o))
                        : ((n.dom = t.dom),
                          (n.domSize = t.domSize),
                          (n.instance = t.instance));
                    })(e, t, n, s, l);
                    break;
                  case "[":
                    !(function (e, t, n, r, o, i) {
                      p(e, t.children, n.children, r, o, i);
                      var l = 0,
                        a = n.children;
                      if (((n.dom = null), null != a)) {
                        for (var s = 0; s < a.length; s++) {
                          var u = a[s];
                          null != u &&
                            null != u.dom &&
                            (null == n.dom && (n.dom = u.dom),
                            (l += u.domSize || 1));
                        }
                        1 !== l && (n.domSize = l);
                      }
                    })(e, t, n, o, l, s);
                    break;
                  default:
                    !(function (e, t, n, r) {
                      var o = (t.dom = e.dom);
                      (r = i(t) || r),
                        "textarea" === t.tag &&
                          null == t.attrs &&
                          (t.attrs = {}),
                        (function (e, t, n, r) {
                          if (
                            (t &&
                              t === n &&
                              console.warn(
                                "Don't reuse attrs object, use new object for every redraw, this will throw in next major"
                              ),
                            null != n)
                          ) {
                            "input" === e.tag &&
                              null != n.type &&
                              e.dom.setAttribute("type", n.type);
                            var o = "input" === e.tag && "file" === n.type;
                            for (var i in n) z(e, i, t && t[i], n[i], r, o);
                          }
                          var l;
                          if (null != t)
                            for (var i in t)
                              null == (l = t[i]) ||
                                (null != n && null != n[i]) ||
                                O(e, i, l, r);
                        })(t, e.attrs, t.attrs, r),
                        x(t) || p(o, e.children, t.children, n, null, r);
                    })(t, n, o, s);
                }
              else
                !(function (e, t, n, o, i, l) {
                  if (
                    ((n.instance = r.normalize(a.call(n.state.view, n))),
                    n.instance === n)
                  )
                    throw Error(
                      "A view cannot return the vnode it received as argument"
                    );
                  D(n.state, n, o),
                    null != n.attrs && D(n.attrs, n, o),
                    null != n.instance
                      ? (null == t.instance
                          ? c(e, n.instance, o, l, i)
                          : h(e, t.instance, n.instance, o, i, l),
                        (n.dom = n.instance.dom),
                        (n.domSize = n.instance.domSize))
                      : null != t.instance
                      ? (S(e, t.instance), (n.dom = void 0), (n.domSize = 0))
                      : ((n.dom = t.dom), (n.domSize = t.domSize));
                })(e, t, n, o, l, s);
            } else S(e, t), c(e, n, o, s, l);
          }
          function v(e, t, n) {
            for (var r = Object.create(null); t < n; t++) {
              var o = e[t];
              if (null != o) {
                var i = o.key;
                null != i && (r[i] = t);
              }
            }
            return r;
          }
          var m = [];
          function y(e, t, n) {
            for (; t < e.length; t++)
              if (null != e[t] && null != e[t].dom) return e[t].dom;
            return n;
          }
          function g(e, t, r) {
            var o = n.createDocumentFragment();
            w(e, o, t), b(e, o, r);
          }
          function w(e, t, n) {
            for (; null != n.dom && n.dom.parentNode === e; ) {
              if ("string" != typeof n.tag) {
                if (null != (n = n.instance)) continue;
              } else if ("<" === n.tag)
                for (var r = 0; r < n.instance.length; r++)
                  t.appendChild(n.instance[r]);
              else if ("[" !== n.tag) t.appendChild(n.dom);
              else if (1 === n.children.length) {
                if (null != (n = n.children[0])) continue;
              } else
                for (r = 0; r < n.children.length; r++) {
                  var o = n.children[r];
                  null != o && w(e, t, o);
                }
              break;
            }
          }
          function b(e, t, n) {
            null != n ? e.insertBefore(t, n) : e.appendChild(t);
          }
          function x(e) {
            if (
              null == e.attrs ||
              (null == e.attrs.contenteditable &&
                null == e.attrs.contentEditable)
            )
              return !1;
            var t = e.children;
            if (null != t && 1 === t.length && "<" === t[0].tag) {
              var n = t[0].children;
              e.dom.innerHTML !== n && (e.dom.innerHTML = n);
            } else if (null != t && 0 !== t.length)
              throw new Error(
                "Child node of a contenteditable must be trusted."
              );
            return !0;
          }
          function k(e, t, n, r) {
            for (var o = n; o < r; o++) {
              var i = t[o];
              null != i && S(e, i);
            }
          }
          function S(e, t) {
            var n,
              r,
              o,
              i = 0,
              s = t.state;
            if (
              ("string" != typeof t.tag &&
                "function" == typeof t.state.onbeforeremove &&
                null != (o = a.call(t.state.onbeforeremove, t)) &&
                "function" == typeof o.then &&
                ((i = 1), (n = o)),
              t.attrs &&
                "function" == typeof t.attrs.onbeforeremove &&
                null != (o = a.call(t.attrs.onbeforeremove, t)) &&
                "function" == typeof o.then &&
                ((i |= 2), (r = o)),
              l(t, s),
              i)
            ) {
              if (null != n) {
                var u = function () {
                  1 & i && ((i &= 2) || c());
                };
                n.then(u, u);
              }
              null != r &&
                ((u = function () {
                  2 & i && ((i &= 1) || c());
                }),
                r.then(u, u));
            } else C(t), j(e, t);
            function c() {
              l(t, s), C(t), j(e, t);
            }
          }
          function E(e, t) {
            for (var n = 0; n < t.instance.length; n++)
              e.removeChild(t.instance[n]);
          }
          function j(e, t) {
            for (; null != t.dom && t.dom.parentNode === e; ) {
              if ("string" != typeof t.tag) {
                if (null != (t = t.instance)) continue;
              } else if ("<" === t.tag) E(e, t);
              else {
                if (
                  "[" !== t.tag &&
                  (e.removeChild(t.dom), !Array.isArray(t.children))
                )
                  break;
                if (1 === t.children.length) {
                  if (null != (t = t.children[0])) continue;
                } else
                  for (var n = 0; n < t.children.length; n++) {
                    var r = t.children[n];
                    null != r && j(e, r);
                  }
              }
              break;
            }
          }
          function C(e) {
            if (
              ("string" != typeof e.tag &&
                "function" == typeof e.state.onremove &&
                a.call(e.state.onremove, e),
              e.attrs &&
                "function" == typeof e.attrs.onremove &&
                a.call(e.attrs.onremove, e),
              "string" != typeof e.tag)
            )
              null != e.instance && C(e.instance);
            else {
              var t = e.children;
              if (Array.isArray(t))
                for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  null != r && C(r);
                }
            }
          }
          function z(e, t, r, o, i, l) {
            if (
              !(
                "key" === t ||
                "is" === t ||
                null == o ||
                T(t) ||
                (r === o &&
                  !(function (e, t) {
                    return (
                      "value" === t ||
                      "checked" === t ||
                      "selectedIndex" === t ||
                      ("selected" === t && e.dom === s()) ||
                      ("option" === e.tag &&
                        e.dom.parentNode === n.activeElement)
                    );
                  })(e, t) &&
                  "object" != typeof o) ||
                ("type" === t && "input" === e.tag)
              )
            ) {
              if ("o" === t[0] && "n" === t[1]) return _(e, t, o);
              if ("xlink:" === t.slice(0, 6))
                e.dom.setAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  t.slice(6),
                  o
                );
              else if ("style" === t) L(e.dom, r, o);
              else if (A(e, t, i)) {
                if ("value" === t) {
                  if (
                    ("input" === e.tag || "textarea" === e.tag) &&
                    e.dom.value === "" + o &&
                    (l || e.dom === s())
                  )
                    return;
                  if (
                    "select" === e.tag &&
                    null !== r &&
                    e.dom.value === "" + o
                  )
                    return;
                  if (
                    "option" === e.tag &&
                    null !== r &&
                    e.dom.value === "" + o
                  )
                    return;
                  if (l && "" + o != "")
                    return void console.error(
                      "`value` is read-only on file inputs!"
                    );
                }
                e.dom[t] = o;
              } else
                "boolean" == typeof o
                  ? o
                    ? e.dom.setAttribute(t, "")
                    : e.dom.removeAttribute(t)
                  : e.dom.setAttribute("className" === t ? "class" : t, o);
            }
          }
          function O(e, t, n, r) {
            if ("key" !== t && "is" !== t && null != n && !T(t))
              if ("o" === t[0] && "n" === t[1]) _(e, t, void 0);
              else if ("style" === t) L(e.dom, n, null);
              else if (
                !A(e, t, r) ||
                "className" === t ||
                "title" === t ||
                ("value" === t &&
                  ("option" === e.tag ||
                    ("select" === e.tag &&
                      -1 === e.dom.selectedIndex &&
                      e.dom === s()))) ||
                ("input" === e.tag && "type" === t)
              ) {
                var o = t.indexOf(":");
                -1 !== o && (t = t.slice(o + 1)),
                  !1 !== n &&
                    e.dom.removeAttribute("className" === t ? "class" : t);
              } else e.dom[t] = null;
          }
          function T(e) {
            return (
              "oninit" === e ||
              "oncreate" === e ||
              "onupdate" === e ||
              "onremove" === e ||
              "onbeforeremove" === e ||
              "onbeforeupdate" === e
            );
          }
          function A(e, t, n) {
            return (
              void 0 === n &&
              (e.tag.indexOf("-") > -1 ||
                (null != e.attrs && e.attrs.is) ||
                ("href" !== t &&
                  "list" !== t &&
                  "form" !== t &&
                  "width" !== t &&
                  "height" !== t)) &&
              t in e.dom
            );
          }
          var N,
            P = /[A-Z]/g;
          function I(e) {
            return "-" + e.toLowerCase();
          }
          function $(e) {
            return "-" === e[0] && "-" === e[1]
              ? e
              : "cssFloat" === e
              ? "float"
              : e.replace(P, I);
          }
          function L(e, t, n) {
            if (t === n);
            else if (null == n) e.style.cssText = "";
            else if ("object" != typeof n) e.style.cssText = n;
            else if (null == t || "object" != typeof t)
              for (var r in ((e.style.cssText = ""), n))
                null != (o = n[r]) && e.style.setProperty($(r), String(o));
            else {
              for (var r in n) {
                var o;
                null != (o = n[r]) &&
                  (o = String(o)) !== String(t[r]) &&
                  e.style.setProperty($(r), o);
              }
              for (var r in t)
                null != t[r] && null == n[r] && e.style.removeProperty($(r));
            }
          }
          function R() {
            this._ = t;
          }
          function _(e, n, r) {
            if (null != e.events) {
              if (((e.events._ = t), e.events[n] === r)) return;
              null == r || ("function" != typeof r && "object" != typeof r)
                ? (null != e.events[n] &&
                    e.dom.removeEventListener(n.slice(2), e.events, !1),
                  (e.events[n] = void 0))
                : (null == e.events[n] &&
                    e.dom.addEventListener(n.slice(2), e.events, !1),
                  (e.events[n] = r));
            } else
              null == r ||
                ("function" != typeof r && "object" != typeof r) ||
                ((e.events = new R()),
                e.dom.addEventListener(n.slice(2), e.events, !1),
                (e.events[n] = r));
          }
          function M(e, t, n) {
            "function" == typeof e.oninit && a.call(e.oninit, t),
              "function" == typeof e.oncreate && n.push(a.bind(e.oncreate, t));
          }
          function D(e, t, n) {
            "function" == typeof e.onupdate && n.push(a.bind(e.onupdate, t));
          }
          return (
            (R.prototype = Object.create(null)),
            (R.prototype.handleEvent = function (e) {
              var t,
                n = this["on" + e.type];
              "function" == typeof n
                ? (t = n.call(e.currentTarget, e))
                : "function" == typeof n.handleEvent && n.handleEvent(e),
                this._ && !1 !== e.redraw && (0, this._)(),
                !1 === t && (e.preventDefault(), e.stopPropagation());
            }),
            function (e, n, o) {
              if (!e)
                throw new TypeError(
                  "DOM element being rendered to does not exist."
                );
              if (null != N && e.contains(N))
                throw new TypeError(
                  "Node is currently being rendered to and thus is locked."
                );
              var i = t,
                l = N,
                a = [],
                u = s(),
                c = e.namespaceURI;
              (N = e), (t = "function" == typeof o ? o : void 0);
              try {
                null == e.vnodes && (e.textContent = ""),
                  (n = r.normalizeChildren(Array.isArray(n) ? n : [n])),
                  p(
                    e,
                    e.vnodes,
                    n,
                    a,
                    null,
                    "http://www.w3.org/1999/xhtml" === c ? void 0 : c
                  ),
                  (e.vnodes = n),
                  null != u &&
                    s() !== u &&
                    "function" == typeof u.focus &&
                    u.focus();
                for (var f = 0; f < a.length; f++) a[f]();
              } finally {
                (t = i), (N = l);
              }
            }
          );
        };
      },
      665: (e, t, n) => {
        var r = n(165);
        e.exports = function (e) {
          return (
            null == e && (e = ""), r("<", void 0, void 0, e, void 0, void 0)
          );
        };
      },
      165: (e) => {
        function t(e, t, n, r, o, i) {
          return {
            tag: e,
            key: t,
            attrs: n,
            children: r,
            text: o,
            dom: i,
            domSize: void 0,
            state: void 0,
            events: void 0,
            instance: void 0,
          };
        }
        (t.normalize = function (e) {
          return Array.isArray(e)
            ? t("[", void 0, void 0, t.normalizeChildren(e), void 0, void 0)
            : null == e || "boolean" == typeof e
            ? null
            : "object" == typeof e
            ? e
            : t("#", void 0, void 0, String(e), void 0, void 0);
        }),
          (t.normalizeChildren = function (e) {
            var n = [];
            if (e.length) {
              for (
                var r = null != e[0] && null != e[0].key, o = 1;
                o < e.length;
                o++
              )
                if ((null != e[o] && null != e[o].key) !== r)
                  throw new TypeError(
                    !r || (null == e[o] && "boolean" != typeof e[o])
                      ? "In fragments, vnodes must either all have keys or none have keys."
                      : "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole."
                  );
              for (o = 0; o < e.length; o++) n[o] = t.normalize(e[o]);
            }
            return n;
          }),
          (e.exports = t);
      },
      975: (e, t, n) => {
        var r = n(921),
          o = n(199);
        e.exports = n(389)(
          "undefined" != typeof window ? window : null,
          r,
          o.redraw
        );
      },
      389: (e, t, n) => {
        var r = n(555),
          o = n(795);
        e.exports = function (e, t, n) {
          var i = 0;
          function l(e) {
            return new t(e);
          }
          function a(e) {
            return function (o, i) {
              "string" != typeof o
                ? ((i = o), (o = o.url))
                : null == i && (i = {});
              var a = new t(function (t, n) {
                e(
                  r(o, i.params),
                  i,
                  function (e) {
                    if ("function" == typeof i.type)
                      if (Array.isArray(e))
                        for (var n = 0; n < e.length; n++)
                          e[n] = new i.type(e[n]);
                      else e = new i.type(e);
                    t(e);
                  },
                  n
                );
              });
              if (!0 === i.background) return a;
              var s = 0;
              function u() {
                0 == --s && "function" == typeof n && n();
              }
              return (function e(t) {
                var n = t.then;
                return (
                  (t.constructor = l),
                  (t.then = function () {
                    s++;
                    var r = n.apply(t, arguments);
                    return (
                      r.then(u, function (e) {
                        if ((u(), 0 === s)) throw e;
                      }),
                      e(r)
                    );
                  }),
                  t
                );
              })(a);
            };
          }
          function s(e, t) {
            for (var n in e.headers)
              if (o.call(e.headers, n) && n.toLowerCase() === t) return !0;
            return !1;
          }
          return (
            (l.prototype = t.prototype),
            (l.__proto__ = t),
            {
              request: a(function (t, n, r, i) {
                var l,
                  a = null != n.method ? n.method.toUpperCase() : "GET",
                  u = n.body,
                  c =
                    (null == n.serialize || n.serialize === JSON.serialize) &&
                    !(
                      u instanceof e.FormData || u instanceof e.URLSearchParams
                    ),
                  f =
                    n.responseType ||
                    ("function" == typeof n.extract ? "" : "json"),
                  d = new e.XMLHttpRequest(),
                  p = !1,
                  h = !1,
                  v = d,
                  m = d.abort;
                for (var y in ((d.abort = function () {
                  (p = !0), m.call(this);
                }),
                d.open(
                  a,
                  t,
                  !1 !== n.async,
                  "string" == typeof n.user ? n.user : void 0,
                  "string" == typeof n.password ? n.password : void 0
                ),
                c &&
                  null != u &&
                  !s(n, "content-type") &&
                  d.setRequestHeader(
                    "Content-Type",
                    "application/json; charset=utf-8"
                  ),
                "function" == typeof n.deserialize ||
                  s(n, "accept") ||
                  d.setRequestHeader("Accept", "application/json, text/*"),
                n.withCredentials && (d.withCredentials = n.withCredentials),
                n.timeout && (d.timeout = n.timeout),
                (d.responseType = f),
                n.headers))
                  o.call(n.headers, y) && d.setRequestHeader(y, n.headers[y]);
                (d.onreadystatechange = function (e) {
                  if (!p && 4 === e.target.readyState)
                    try {
                      var o,
                        l =
                          (e.target.status >= 200 && e.target.status < 300) ||
                          304 === e.target.status ||
                          /^file:\/\//i.test(t),
                        a = e.target.response;
                      if ("json" === f) {
                        if (
                          !e.target.responseType &&
                          "function" != typeof n.extract
                        )
                          try {
                            a = JSON.parse(e.target.responseText);
                          } catch (e) {
                            a = null;
                          }
                      } else
                        (f && "text" !== f) ||
                          (null == a && (a = e.target.responseText));
                      if (
                        ("function" == typeof n.extract
                          ? ((a = n.extract(e.target, n)), (l = !0))
                          : "function" == typeof n.deserialize &&
                            (a = n.deserialize(a)),
                        l)
                      )
                        r(a);
                      else {
                        var s = function () {
                          try {
                            o = e.target.responseText;
                          } catch (e) {
                            o = a;
                          }
                          var t = new Error(o);
                          (t.code = e.target.status), (t.response = a), i(t);
                        };
                        0 === d.status
                          ? setTimeout(function () {
                              h || s();
                            })
                          : s();
                      }
                    } catch (e) {
                      i(e);
                    }
                }),
                  (d.ontimeout = function (e) {
                    h = !0;
                    var t = new Error("Request timed out");
                    (t.code = e.target.status), i(t);
                  }),
                  "function" == typeof n.config &&
                    (d = n.config(d, n, t) || d) !== v &&
                    ((l = d.abort),
                    (d.abort = function () {
                      (p = !0), l.call(this);
                    })),
                  null == u
                    ? d.send()
                    : "function" == typeof n.serialize
                    ? d.send(n.serialize(u))
                    : u instanceof e.FormData || u instanceof e.URLSearchParams
                    ? d.send(u)
                    : d.send(JSON.stringify(u));
              }),
              jsonp: a(function (t, n, r, o) {
                var l =
                    n.callbackName ||
                    "_mithril_" + Math.round(1e16 * Math.random()) + "_" + i++,
                  a = e.document.createElement("script");
                (e[l] = function (t) {
                  delete e[l], a.parentNode.removeChild(a), r(t);
                }),
                  (a.onerror = function () {
                    delete e[l],
                      a.parentNode.removeChild(a),
                      o(new Error("JSONP request failed"));
                  }),
                  (a.src =
                    t +
                    (t.indexOf("?") < 0 ? "?" : "&") +
                    encodeURIComponent(n.callbackKey || "callback") +
                    "=" +
                    encodeURIComponent(l)),
                  e.document.documentElement.appendChild(a);
              }),
            }
          );
        };
      },
      843: (e, t, n) => {
        var r = n(199);
        e.exports = n(804)("undefined" != typeof window ? window : null, r);
      },
      910: (e, t, n) => {
        var r = n(795);
        e.exports =
          Object.assign ||
          function (e, t) {
            for (var n in t) r.call(t, n) && (e[n] = t[n]);
          };
      },
      333: (e, t, n) => {
        var r = n(795),
          o = new RegExp(
            "^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$"
          );
        e.exports = function (e, t) {
          var n = {};
          if (null != t)
            for (var i in e)
              r.call(e, i) && !o.test(i) && t.indexOf(i) < 0 && (n[i] = e[i]);
          else for (var i in e) r.call(e, i) && !o.test(i) && (n[i] = e[i]);
          return n;
        };
      },
      795: (e) => {
        e.exports = {}.hasOwnProperty;
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = (t[r] = { exports: {} });
    return e[r](i, i.exports, n), i.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
  var r = n(862);
  n.n(r)().render(document.body, "assfa world");
})();
