var b = Object.defineProperty;
var q = (t, n, e) => n in t ? b(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var a = (t, n, e) => (q(t, typeof n != "symbol" ? n + "" : n, e), e);
const o = Math.pow, l = Math.sqrt, c = Math.sin, v = Math.cos, u = Math.PI, h = 1.70158, f = h * 1.525, k = h + 1, C = 2 * u / 3, O = 2 * u / 4.5;
function d(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}
const D = {
  inQuad: function(t) {
    return t * t;
  },
  outQuad: function(t) {
    return 1 - (1 - t) * (1 - t);
  },
  inOutQuad: function(t) {
    return t < 0.5 ? 2 * t * t : 1 - o(-2 * t + 2, 2) / 2;
  },
  inCubic: function(t) {
    return t * t * t;
  },
  outCubic: function(t) {
    return 1 - o(1 - t, 3);
  },
  inOutCubic: function(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - o(-2 * t + 2, 3) / 2;
  },
  inQuart: function(t) {
    return t * t * t * t;
  },
  outQuart: function(t) {
    return 1 - o(1 - t, 4);
  },
  inOutQuart: function(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - o(-2 * t + 2, 4) / 2;
  },
  inQuint: function(t) {
    return t * t * t * t * t;
  },
  outQuint: function(t) {
    return 1 - o(1 - t, 5);
  },
  inOutQuint: function(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - o(-2 * t + 2, 5) / 2;
  },
  inSine: function(t) {
    return 1 - v(t * u / 2);
  },
  outSine: function(t) {
    return c(t * u / 2);
  },
  inOutSine: function(t) {
    return -(v(u * t) - 1) / 2;
  },
  inExpo: function(t) {
    return t === 0 ? 0 : o(2, 10 * t - 10);
  },
  outExpo: function(t) {
    return t === 1 ? 1 : 1 - o(2, -10 * t);
  },
  inOutExpo: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? o(2, 20 * t - 10) / 2 : (2 - o(2, -20 * t + 10)) / 2;
  },
  inCirc: function(t) {
    return 1 - l(1 - o(t, 2));
  },
  outCirc: function(t) {
    return l(1 - o(t - 1, 2));
  },
  inOutCirc: function(t) {
    return t < 0.5 ? (1 - l(1 - o(2 * t, 2))) / 2 : (l(1 - o(-2 * t + 2, 2)) + 1) / 2;
  },
  inElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : -o(2, 10 * t - 10) * c((t * 10 - 10.75) * C);
  },
  outElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : o(2, -10 * t) * c((t * 10 - 0.75) * C) + 1;
  },
  inOutElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(o(2, 20 * t - 10) * c((20 * t - 11.125) * O)) / 2 : o(2, -20 * t + 10) * c((20 * t - 11.125) * O) / 2 + 1;
  },
  inBack: function(t) {
    return k * t * t * t - h * t * t;
  },
  outBack: function(t) {
    return 1 + k * o(t - 1, 3) + h * o(t - 1, 2);
  },
  inOutBack: function(t) {
    return t < 0.5 ? o(2 * t, 2) * ((f + 1) * 2 * t - f) / 2 : (o(2 * t - 2, 2) * ((f + 1) * (t * 2 - 2) + f) + 2) / 2;
  },
  inBounce: function(t) {
    return 1 - d(1 - t);
  },
  outBounce: d,
  inOutBounce: function(t) {
    return t < 0.5 ? (1 - d(1 - 2 * t)) / 2 : (1 + d(2 * t - 1)) / 2;
  },
  linear: function(t) {
    return t;
  }
}, M = (...t) => {
  console.error("Gekko", ...t);
}, A = {
  speed: 1e3,
  isSpeedAsDuration: !1,
  delay: 0,
  easing: "outQuad",
  offset: 0
};
class T {
  constructor(n) {
    a(this, "params");
    a(this, "isStop", !1);
    a(this, "isScrolling", !1);
    this.params = {
      ...A,
      ...n
    }, document.querySelectorAll("a").forEach((i) => {
      i.target || i.addEventListener("click", (s) => {
        this.onClick(s);
      });
    }), window.location.hash && document.addEventListener("DOMContentLoaded", () => {
      this.scroll(window.location.hash);
    });
    const e = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
    document.addEventListener(e, () => {
      this.onScroll();
    }), document.addEventListener("touchstart", () => {
      this.onScroll();
    });
  }
  scroll(n, e = !0) {
    var s;
    const i = document.getElementById(n.replace("#", ""));
    if (i) {
      this.isStop = !1;
      const m = window.pageYOffset || document.documentElement.scrollTop, y = i.getBoundingClientRect().top + m;
      let r;
      typeof this.params.offset == "number" ? r = this.params.offset : typeof this.params.offset == "string" ? r = ((s = document.querySelector(this.params.offset)) == null ? void 0 : s.getBoundingClientRect().height) || 0 : typeof this.params.offset == "function" ? r = this.params.offset() : r = 0;
      const p = Math.max(0, y - r), w = p - m;
      if (w === 0)
        return;
      if (history.pushState({}, "", n), document.dispatchEvent(new CustomEvent("beforeScroll", { detail: { anchor: n } })), e) {
        this.isScrolling = !0;
        const Q = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(w / this.params.speed) * 1e3, B = performance.now(), g = (L) => {
          const E = (L - B) / Q;
          E < 1 && !this.isStop ? (window.scrollTo(0, m + w * D[this.params.easing](E)), window.requestAnimationFrame(g)) : this.isStop ? (this.isScrolling = !1, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }))) : (window.scrollTo(0, p), this.isScrolling = !1, document.dispatchEvent(new CustomEvent("afterScroll", { detail: { anchor: n } })));
        };
        window.requestAnimationFrame(g);
      } else
        window.scrollTo(0, p);
    } else
      M("id is not found");
  }
  stop() {
    this.isStop = !0;
  }
  on(n, e) {
    const i = (s) => {
      e(s.detail.anchor);
    };
    document.addEventListener(n, i);
  }
  options(n) {
    this.params = {
      ...this.params,
      ...n
    };
  }
  destroy() {
    document.querySelectorAll("a").forEach((e) => {
      e.removeEventListener("click", this.onClick);
    });
    const n = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
    document.removeEventListener(n, this.onScroll), document.removeEventListener("touchstart", this.onScroll);
  }
  onClick(n) {
    n.preventDefault(), n.stopPropagation();
    const e = n.currentTarget;
    if (!e) {
      M("no elm");
      return;
    }
    const i = `${e.protocol}//${e.host}${e.pathname}` === location.origin + location.pathname ? e.hash : "";
    i && e.dataset.gekko !== "no-smooth" ? this.scroll(i) : i && e.dataset.gekko === "no-smooth" ? this.scroll(i, !1) : window.location.href = e.href;
  }
  onScroll() {
    this.isScrolling && this.stop();
  }
}
let S;
const P = (t) => (S || (S = new T(t)), S);
export {
  T as default,
  P as gk
};
