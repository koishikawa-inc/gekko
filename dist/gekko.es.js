var B = Object.defineProperty;
var T = (t, n, o) => n in t ? B(t, n, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[n] = o;
var r = (t, n, o) => (T(t, typeof n != "symbol" ? n + "" : n, o), o);
const e = Math.pow, a = Math.sqrt, c = Math.sin, E = Math.cos, u = Math.PI, h = 1.70158, f = h * 1.525, v = h + 1, k = 2 * u / 3, C = 2 * u / 4.5;
function d(t) {
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
    return 1 - E(t * u / 2);
  },
  outSine: function(t) {
    return c(t * u / 2);
  },
  inOutSine: function(t) {
    return -(E(u * t) - 1) / 2;
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
    return 1 - a(1 - e(t, 2));
  },
  outCirc: function(t) {
    return a(1 - e(t - 1, 2));
  },
  inOutCirc: function(t) {
    return t < 0.5 ? (1 - a(1 - e(2 * t, 2))) / 2 : (a(1 - e(-2 * t + 2, 2)) + 1) / 2;
  },
  inElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : -e(2, 10 * t - 10) * c((t * 10 - 10.75) * k);
  },
  outElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : e(2, -10 * t) * c((t * 10 - 0.75) * k) + 1;
  },
  inOutElastic: function(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(e(2, 20 * t - 10) * c((20 * t - 11.125) * C)) / 2 : e(2, -20 * t + 10) * c((20 * t - 11.125) * C) / 2 + 1;
  },
  inBack: function(t) {
    return v * t * t * t - h * t * t;
  },
  outBack: function(t) {
    return 1 + v * e(t - 1, 3) + h * e(t - 1, 2);
  },
  inOutBack: function(t) {
    return t < 0.5 ? e(2 * t, 2) * ((f + 1) * 2 * t - f) / 2 : (e(2 * t - 2, 2) * ((f + 1) * (t * 2 - 2) + f) + 2) / 2;
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
};
class D {
  constructor(n) {
    r(this, "params");
    r(this, "isStop", !1);
    r(this, "isScrolling", !1);
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
    var l;
    const i = document.getElementById(n.replace("#", ""));
    if (i) {
      this.isStop = !1;
      const m = window.scrollY || document.documentElement.scrollTop, O = i.getBoundingClientRect().top + m;
      document.dispatchEvent(new CustomEvent("beforeScroll", { detail: { anchor: n } }));
      let s;
      typeof this.params.offset == "number" ? s = this.params.offset : typeof this.params.offset == "string" ? s = ((l = document.querySelector(this.params.offset)) == null ? void 0 : l.getBoundingClientRect().height) || 0 : typeof this.params.offset == "function" ? s = this.params.offset() : s = 0;
      const p = Math.max(0, O - s), w = p - m;
      if (w === 0)
        return;
      if (history.pushState({}, "", n), o) {
        this.isScrolling = !0;
        const M = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(w / this.params.speed) * 1e3, y = performance.now(), S = (Q) => {
          const g = (Q - y) / M;
          g < 1 && !this.isStop ? (window.scrollTo(0, m + w * b[this.params.easing](g)), window.requestAnimationFrame(S)) : this.isStop ? (this.isScrolling = !1, document.dispatchEvent(new CustomEvent("stopScroll", { detail: { anchor: n } }))) : (window.scrollTo(0, p), this.isScrolling = !1, document.dispatchEvent(new CustomEvent("afterScroll", { detail: { anchor: n } })));
        };
        window.requestAnimationFrame(S);
      } else
        window.scrollTo(0, p);
    } else
      this.error(`#${n} is not found.`);
  }
  stop() {
    this.isStop = !0;
  }
  on(n, o) {
    const i = (l) => {
      o(l.detail.anchor);
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
    const i = `${o.protocol}//${o.host}${o.pathname}` === location.origin + location.pathname ? o.hash : "";
    i && o.dataset.gekko !== "no-smooth" && (n.preventDefault(), n.stopPropagation(), this.scroll(i));
  }
  onScroll() {
    this.isScrolling && this.stop();
  }
}
export {
  D as default
};
