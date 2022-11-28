var q = Object.defineProperty;
var y = (t, n, e) => n in t ? q(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var u = (t, n, e) => (y(t, typeof n != "symbol" ? n + "" : n, e), e);
const o = Math.pow, l = Math.sqrt, r = Math.sin, g = Math.cos, c = Math.PI, h = 1.70158, a = h * 1.525, v = h + 1, k = 2 * c / 3, C = 2 * c / 4.5;
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
    return 1 - g(t * c / 2);
  },
  outSine: function(t) {
    return r(t * c / 2);
  },
  inOutSine: function(t) {
    return -(g(c * t) - 1) / 2;
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
    return t === 0 ? 0 : t === 1 ? 1 : -o(2, 10 * t - 10) * r((t * 10 - 10.75) * k);
  },
  outElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : o(2, -10 * t) * r((t * 10 - 0.75) * k) + 1;
  },
  inOutElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(o(2, 20 * t - 10) * r((20 * t - 11.125) * C)) / 2 : o(2, -20 * t + 10) * r((20 * t - 11.125) * C) / 2 + 1;
  },
  inBack: function(t) {
    return v * t * t * t - h * t * t;
  },
  outBack: function(t) {
    return 1 + v * o(t - 1, 3) + h * o(t - 1, 2);
  },
  inOutBack: function(t) {
    return t < 0.5 ? o(2 * t, 2) * ((a + 1) * 2 * t - a) / 2 : (o(2 * t - 2, 2) * ((a + 1) * (t * 2 - 2) + a) + 2) / 2;
  },
  inBounce: function(t) {
    return 1 - d(1 - t);
  },
  outBounce: d,
  inOutBounce: function(t) {
    return t < 0.5 ? (1 - d(1 - 2 * t)) / 2 : (1 + d(2 * t - 1)) / 2;
  }
}, O = (...t) => {
  console.error("Gekko", ...t);
}, b = {
  speed: 1e3,
  isSpeedAsDuration: !1,
  delay: 0,
  easing: "outQuad",
  header: "header",
  offset: 0
};
class T {
  constructor(n) {
    u(this, "params");
    u(this, "isStop", !1);
    u(this, "isScrolling", !1);
    this.params = {
      ...b,
      ...n
    }, document.querySelectorAll("a").forEach((i) => {
      i.addEventListener("click", (s) => {
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
      const f = window.pageYOffset || document.documentElement.scrollTop, M = i.getBoundingClientRect().top + f;
      let w = ((s = document.querySelector(this.params.header)) == null ? void 0 : s.getBoundingClientRect().height) || 0;
      w += this.params.offset;
      const m = Math.max(0, M - w), p = m - f;
      if (p === 0)
        return;
      if (history.pushState({}, "", n), document.dispatchEvent(new CustomEvent("beforeScroll", { detail: { anchor: n } })), e) {
        this.isScrolling = !0;
        const Q = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(p / this.params.speed) * 1e3, B = performance.now(), S = (L) => {
          const E = (L - B) / Q;
          E < 1 && !this.isStop ? (window.scrollTo(0, f + p * D[this.params.easing](E)), window.requestAnimationFrame(S)) : this.isStop ? (this.isScrolling = !1, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }))) : (window.scrollTo(0, m), this.isScrolling = !1, document.dispatchEvent(new CustomEvent("afterScroll", { detail: { anchor: n } })));
        };
        window.requestAnimationFrame(S);
      } else
        window.scrollTo(0, m);
    } else
      O("id is not found");
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
      O("no elm");
      return;
    }
    const i = `${e.protocol}//${e.host}${e.pathname}` === location.origin + location.pathname ? e.hash : "";
    i && e.dataset.gekko !== "no-smooth" ? this.scroll(i) : i && e.dataset.gekko === "no-smooth" ? this.scroll(i, !1) : window.location.href = e.href;
  }
  onScroll() {
    this.isScrolling && this.stop();
  }
}
export {
  T as default
};
