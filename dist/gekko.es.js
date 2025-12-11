var B = Object.defineProperty;
var T = (t, n, o) => n in t ? B(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[n] = o;
var s = (t, n, o) => (T(t, typeof n != "symbol" ? n + "" : n, o), o);
const e = Math.pow, d = Math.sqrt, l = Math.sin, v = Math.cos, a = Math.PI, m = 1.70158, h = m * 1.525, k = m + 1, C = 2 * a / 3, O = 2 * a / 4.5;
function p(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}
const b = {
  inQuad: function(t) {
    return t * t;
  },
  outQuad: function(t) {
    return 1 - (1 - t) * (1 - t);
  },
  inOutQuad: function(t) {
    return t < 0.5 ? 2 * t * t : 1 - e(-2 * t + 2, 2) / 2;
  },
  inCubic: function(t) {
    return t * t * t;
  },
  outCubic: function(t) {
    return 1 - e(1 - t, 3);
  },
  inOutCubic: function(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - e(-2 * t + 2, 3) / 2;
  },
  inQuart: function(t) {
    return t * t * t * t;
  },
  outQuart: function(t) {
    return 1 - e(1 - t, 4);
  },
  inOutQuart: function(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - e(-2 * t + 2, 4) / 2;
  },
  inQuint: function(t) {
    return t * t * t * t * t;
  },
  outQuint: function(t) {
    return 1 - e(1 - t, 5);
  },
  inOutQuint: function(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - e(-2 * t + 2, 5) / 2;
  },
  inSine: function(t) {
    return 1 - v(t * a / 2);
  },
  outSine: function(t) {
    return l(t * a / 2);
  },
  inOutSine: function(t) {
    return -(v(a * t) - 1) / 2;
  },
  inExpo: function(t) {
    return t === 0 ? 0 : e(2, 10 * t - 10);
  },
  outExpo: function(t) {
    return t === 1 ? 1 : 1 - e(2, -10 * t);
  },
  inOutExpo: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? e(2, 20 * t - 10) / 2 : (2 - e(2, -20 * t + 10)) / 2;
  },
  inCirc: function(t) {
    return 1 - d(1 - e(t, 2));
  },
  outCirc: function(t) {
    return d(1 - e(t - 1, 2));
  },
  inOutCirc: function(t) {
    return t < 0.5 ? (1 - d(1 - e(2 * t, 2))) / 2 : (d(1 - e(-2 * t + 2, 2)) + 1) / 2;
  },
  inElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : -e(2, 10 * t - 10) * l((t * 10 - 10.75) * C);
  },
  outElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : e(2, -10 * t) * l((t * 10 - 0.75) * C) + 1;
  },
  inOutElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(e(2, 20 * t - 10) * l((20 * t - 11.125) * O)) / 2 : e(2, -20 * t + 10) * l((20 * t - 11.125) * O) / 2 + 1;
  },
  inBack: function(t) {
    return k * t * t * t - m * t * t;
  },
  outBack: function(t) {
    return 1 + k * e(t - 1, 3) + m * e(t - 1, 2);
  },
  inOutBack: function(t) {
    return t < 0.5 ? e(2 * t, 2) * ((h + 1) * 2 * t - h) / 2 : (e(2 * t - 2, 2) * ((h + 1) * (t * 2 - 2) + h) + 2) / 2;
  },
  inBounce: function(t) {
    return 1 - p(1 - t);
  },
  outBounce: p,
  inOutBounce: function(t) {
    return t < 0.5 ? (1 - p(1 - 2 * t)) / 2 : (1 + p(2 * t - 1)) / 2;
  },
  linear: function(t) {
    return t;
  }
};
class D {
  constructor(n) {
    s(this, "params");
    s(this, "isStop", !1);
    s(this, "isScrolling", !1);
    s(this, "optionsDefault", {
      speed: 1e3,
      isSpeedAsDuration: !1,
      delay: 0,
      easing: "outQuad",
      offset: 0
    });
    s(this, "clickHandler", (n) => {
      this.onClick(n);
    });
    s(this, "error", (...n) => {
      console.error("Gekko", ...n);
    });
    this.params = {
      ...this.optionsDefault,
      ...n
    }, document.querySelectorAll("a").forEach((i) => {
      i.target || i.addEventListener("click", this.clickHandler);
    }), window.location.hash && (window.scrollTo(0, 0), this.scroll(window.location.hash));
    const o = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
    document.addEventListener(o, () => {
      this.onScroll();
    }), document.addEventListener("touchstart", () => {
      this.onScroll();
    });
  }
  scroll(n, o = !0) {
    var c;
    const i = document.getElementById(n.replace("#", ""));
    if (i) {
      this.isStop = !1;
      const u = window.scrollY || document.documentElement.scrollTop, f = i.getBoundingClientRect().top + u;
      document.dispatchEvent(new CustomEvent("beforeScroll", { detail: { anchor: n } }));
      let r;
      typeof this.params.offset == "number" ? r = this.params.offset : typeof this.params.offset == "string" ? r = ((c = document.querySelector(this.params.offset)) == null ? void 0 : c.getBoundingClientRect().height) || 0 : typeof this.params.offset == "function" ? r = this.params.offset() : r = 0;
      const w = Math.max(0, f - r), S = w - u;
      if (S === 0)
        return;
      if (history.pushState({}, "", n), o) {
        this.isScrolling = !0;
        const M = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(S / this.params.speed) * 1e3, y = performance.now(), g = (Q) => {
          const E = (Q - y) / M;
          E < 1 && !this.isStop ? (window.scrollTo(0, u + S * b[this.params.easing](E)), window.requestAnimationFrame(g)) : this.isStop ? (this.isScrolling = !1, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }))) : (window.scrollTo(0, w), this.isScrolling = !1, document.dispatchEvent(new CustomEvent("afterScroll", { detail: { anchor: n } })));
        };
        window.requestAnimationFrame(g);
      } else
        window.scrollTo(0, w);
    } else
      this.error(`#${n} is not found.`);
  }
  stop() {
    this.isStop = !0;
  }
  on(n, o) {
    const i = (c) => {
      o(c.detail.anchor);
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
    document.querySelectorAll("a").forEach((o) => {
      o.removeEventListener("click", this.clickHandler);
    });
    const n = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
    document.removeEventListener(n, this.onScroll), document.removeEventListener("touchstart", this.onScroll);
  }
  onClick(n) {
    const o = n.currentTarget;
    if (!o) {
      this.error("Unexpected error occurred. Target does not exist.");
      return;
    }
    const i = (r) => r.replace(/\/$/, ""), c = `${o.protocol}//${o.host}${i(o.pathname)}`, u = i(location.origin + location.pathname), f = c === u ? o.hash : "";
    f && o.dataset.gekko !== "no-smooth" && (n.preventDefault(), n.stopPropagation(), this.scroll(f));
  }
  onScroll() {
    this.isScrolling && this.stop();
  }
}
export {
  D as default
};
