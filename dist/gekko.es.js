/*! @darowasahito/gekko v1.1.0 | MIT | 2026-04-09T03:13:23.725Z */
var Q = Object.defineProperty;
var B = (t, n, o) => n in t ? Q(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[n] = o;
var i = (t, n, o) => (B(t, typeof n != "symbol" ? n + "" : n, o), o);
const e = Math.pow, d = Math.sqrt, l = Math.sin, A = Math.cos, a = Math.PI, p = 1.70158, f = p * 1.525, C = p + 1, O = 2 * a / 3, I = 2 * a / 4.5;
function m(t) {
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
    return 1 - A(t * a / 2);
  },
  outSine: function(t) {
    return l(t * a / 2);
  },
  inOutSine: function(t) {
    return -(A(a * t) - 1) / 2;
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
    return t === 0 ? 0 : t === 1 ? 1 : -e(2, 10 * t - 10) * l((t * 10 - 10.75) * O);
  },
  outElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : e(2, -10 * t) * l((t * 10 - 0.75) * O) + 1;
  },
  inOutElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(e(2, 20 * t - 10) * l((20 * t - 11.125) * I)) / 2 : e(2, -20 * t + 10) * l((20 * t - 11.125) * I) / 2 + 1;
  },
  inBack: function(t) {
    return C * t * t * t - p * t * t;
  },
  outBack: function(t) {
    return 1 + C * e(t - 1, 3) + p * e(t - 1, 2);
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
class D {
  constructor(n) {
    i(this, "params");
    i(this, "isStop", !1);
    i(this, "isScrolling", !1);
    i(this, "delayTimeoutId", null);
    i(this, "currentAnchor", null);
    i(this, "currentTrigger", null);
    i(this, "optionsDefault", {
      speed: 1e3,
      isSpeedAsDuration: !1,
      delay: 0,
      easing: "outQuad",
      offset: 0
    });
    i(this, "clickHandler", (n) => {
      this.onClick(n);
    });
    i(this, "error", (...n) => {
      console.error("Gekko", ...n);
    });
    this.params = {
      ...this.optionsDefault,
      ...n
    }, document.querySelectorAll("a").forEach((r) => {
      r.target || r.addEventListener("click", this.clickHandler);
    }), window.location.hash && (window.scrollTo(0, 0), this.scroll(window.location.hash));
    const o = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
    document.addEventListener(o, () => {
      this.onScroll();
    }), document.addEventListener("touchstart", () => {
      this.onScroll();
    });
  }
  scroll(n, o = !0) {
    const r = document.getElementById(n.replace("#", ""));
    if (r) {
      this.isStop = !1, this.delayTimeoutId !== null && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null), document.dispatchEvent(new CustomEvent("beforeScroll", { detail: { anchor: n } })), this.currentAnchor = n;
      const s = () => {
        var E;
        const u = window.scrollY || document.documentElement.scrollTop, g = r.getBoundingClientRect().top + u;
        let c;
        typeof this.params.offset == "number" ? c = this.params.offset : typeof this.params.offset == "string" ? c = ((E = document.querySelector(this.params.offset)) == null ? void 0 : E.getBoundingClientRect().height) || 0 : typeof this.params.offset == "function" ? c = this.params.offset(this.currentTrigger) : c = 0;
        const S = Math.max(0, g - c), w = S - u;
        if (w === 0) {
          this.currentAnchor = null, this.currentTrigger = null;
          return;
        }
        if (history.pushState({}, "", n), o) {
          this.isScrolling = !0;
          const M = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(w / this.params.speed) * 1e3;
          let T = null;
          const y = (v) => {
            T === null && (T = v);
            const k = (v - T) / M;
            k < 1 && !this.isStop ? (window.scrollTo(0, u + w * b[this.params.easing](k)), window.requestAnimationFrame(y)) : this.isStop ? (this.isScrolling = !1, this.currentAnchor = null, this.currentTrigger = null, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }))) : (window.scrollTo(0, S), this.isScrolling = !1, this.currentAnchor = null, this.currentTrigger = null, document.dispatchEvent(new CustomEvent("afterScroll", { detail: { anchor: n } })));
          };
          window.requestAnimationFrame(y);
        } else
          window.scrollTo(0, S), this.currentAnchor = null, this.currentTrigger = null;
      }, h = typeof this.params.delay == "function" ? this.params.delay(this.currentTrigger) : this.params.delay;
      h > 0 ? this.delayTimeoutId = setTimeout(() => {
        this.delayTimeoutId = null, this.isStop || s();
      }, h) : s();
    } else
      this.error(`${n} is not found.`);
  }
  stop() {
    if (this.isStop = !0, this.delayTimeoutId !== null && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null, this.currentAnchor !== null)) {
      const n = this.currentAnchor;
      this.currentAnchor = null, this.currentTrigger = null, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }));
    }
  }
  on(n, o) {
    const r = (s) => {
      o(s.detail.anchor);
    };
    document.addEventListener(n, r);
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
    this.currentTrigger = o;
    const r = (g) => g.replace(/\/$/, ""), s = r(`${o.protocol}//${o.host}${o.pathname}`), h = r(`${location.origin}${location.pathname}`), u = s === h ? o.hash : "";
    u && o.dataset.gekko !== "no-smooth" && (n.preventDefault(), n.stopPropagation(), this.scroll(u));
  }
  onScroll() {
    this.isScrolling && this.stop();
  }
}
export {
  D as default
};
