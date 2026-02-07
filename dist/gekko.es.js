var Q = Object.defineProperty;
var B = (t, n, o) => n in t ? Q(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[n] = o;
var r = (t, n, o) => (B(t, typeof n != "symbol" ? n + "" : n, o), o);
const e = Math.pow, d = Math.sqrt, l = Math.sin, T = Math.cos, a = Math.PI, p = 1.70158, f = p * 1.525, A = p + 1, C = 2 * a / 3, O = 2 * a / 4.5;
function m(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}
const I = {
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
    return 1 - T(t * a / 2);
  },
  outSine: function(t) {
    return l(t * a / 2);
  },
  inOutSine: function(t) {
    return -(T(a * t) - 1) / 2;
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
    return A * t * t * t - p * t * t;
  },
  outBack: function(t) {
    return 1 + A * e(t - 1, 3) + p * e(t - 1, 2);
  },
  inOutBack: function(t) {
    return t < 0.5 ? e(2 * t, 2) * ((f + 1) * 2 * t - f) / 2 : (e(2 * t - 2, 2) * ((f + 1) * (t * 2 - 2) + f) + 2) / 2;
  },
  inBounce: function(t) {
    return 1 - m(1 - t);
  },
  outBounce: m,
  inOutBounce: function(t) {
    return t < 0.5 ? (1 - m(1 - 2 * t)) / 2 : (1 + m(2 * t - 1)) / 2;
  },
  linear: function(t) {
    return t;
  }
};
class q {
  constructor(n) {
    r(this, "params");
    r(this, "isStop", !1);
    r(this, "isScrolling", !1);
    r(this, "delayTimeoutId", null);
    r(this, "currentAnchor", null);
    r(this, "optionsDefault", {
      speed: 1e3,
      isSpeedAsDuration: !1,
      delay: 0,
      easing: "outQuad",
      offset: 0
    });
    r(this, "clickHandler", (n) => {
      this.onClick(n);
    });
    r(this, "error", (...n) => {
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
    var u;
    const i = document.getElementById(n.replace("#", ""));
    if (i) {
      this.isStop = !1;
      const c = window.scrollY || document.documentElement.scrollTop, h = i.getBoundingClientRect().top + c;
      document.dispatchEvent(new CustomEvent("beforeScroll", { detail: { anchor: n } }));
      let s;
      typeof this.params.offset == "number" ? s = this.params.offset : typeof this.params.offset == "string" ? s = ((u = document.querySelector(this.params.offset)) == null ? void 0 : u.getBoundingClientRect().height) || 0 : typeof this.params.offset == "function" ? s = this.params.offset() : s = 0;
      const S = Math.max(0, h - s), w = S - c;
      if (w === 0)
        return;
      this.currentAnchor = n, history.pushState({}, "", n);
      const g = () => {
        if (o) {
          this.isScrolling = !0;
          const M = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(w / this.params.speed) * 1e3;
          let E = null;
          const v = (y) => {
            E === null && (E = y);
            const k = (y - E) / M;
            k < 1 && !this.isStop ? (window.scrollTo(0, c + w * I[this.params.easing](k)), window.requestAnimationFrame(v)) : this.isStop ? (this.isScrolling = !1, this.currentAnchor = null, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }))) : (window.scrollTo(0, S), this.isScrolling = !1, this.currentAnchor = null, document.dispatchEvent(new CustomEvent("afterScroll", { detail: { anchor: n } })));
          };
          window.requestAnimationFrame(v);
        } else
          window.scrollTo(0, S), this.currentAnchor = null;
      };
      this.params.delay > 0 ? this.delayTimeoutId = setTimeout(() => {
        this.delayTimeoutId = null, this.isStop || g();
      }, this.params.delay) : g();
    } else
      this.error(`#${n} is not found.`);
  }
  stop() {
    if (this.isStop = !0, this.delayTimeoutId !== null && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null, this.currentAnchor !== null)) {
      const n = this.currentAnchor;
      this.currentAnchor = null, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }));
    }
  }
  on(n, o) {
    const i = (u) => {
      o(u.detail.anchor);
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
    this.stop(), document.querySelectorAll("a").forEach((o) => {
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
    const i = (s) => s.replace(/\/$/, ""), u = `${o.protocol}//${o.host}${i(o.pathname)}`, c = i(location.origin + location.pathname), h = u === c ? o.hash : "";
    h && o.dataset.gekko !== "no-smooth" && (n.preventDefault(), n.stopPropagation(), this.scroll(h));
  }
  onScroll() {
    this.isScrolling && this.stop();
  }
}
export {
  q as default
};
