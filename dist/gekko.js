import ease from './ease';
class Gekko {
    params;
    isStop = false;
    isScrolling = false;
    optionsDefault = {
        speed: 1000,
        isSpeedAsDuration: false,
        delay: 0,
        easing: 'outQuad',
        offset: 0,
    };
    constructor(options) {
        this.params = {
            ...this.optionsDefault,
            ...options,
        };
        // a タグのクリックイベント登録
        document.querySelectorAll('a').forEach((elm) => {
            if (!elm.target) {
                elm.addEventListener('click', (e) => {
                    this.onClick(e);
                });
            }
        });
        // 別ページからのアンカーへのリンクでスムーススクロールする
        if (window.location.hash) {
            document.addEventListener('DOMContentLoaded', () => {
                this.scroll(window.location.hash);
            });
        }
        // スムーススクロール中のホイール操作やタッチ操作でアニメーション停止
        const mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        document.addEventListener(mousewheelevent, () => {
            this.onScroll();
        });
        document.addEventListener('touchstart', () => {
            this.onScroll();
        });
    }
    /**
     * 指定のアンカーへスクロールする
     *
     * @param {string} anchor [必須] アンカーID。#はあってもなくても。
     * @param {boolean} [isSmooth=true] [オプション] スムーススクロールするか
     * @return {*}  {void}
     * @memberof Gekko
     */
    scroll(anchor, isSmooth = true) {
        const target = document.getElementById(anchor.replace('#', ''));
        if (target) {
            this.isStop = false;
            const topScroll = window.scrollY || document.documentElement.scrollTop;
            const topTarget = target.getBoundingClientRect().top + topScroll;
            // ---------- ---------- ----------
            // 移動先座標計算
            let offset;
            if (typeof this.params.offset == 'number') {
                offset = this.params.offset;
            }
            else if (typeof this.params.offset == 'string') {
                offset = document.querySelector(this.params.offset)?.getBoundingClientRect().height || 0;
            }
            else if (typeof this.params.offset == 'function') {
                offset = this.params.offset();
            }
            else {
                offset = 0;
            }
            const position = Math.max(0, topTarget - offset);
            const distance = position - topScroll;
            if (distance === 0)
                return;
            // ---------- ---------- ----------
            // ブラウザ履歴追加
            history.pushState({}, '', anchor);
            //イベント発火
            document.dispatchEvent(new CustomEvent('beforeScroll', { detail: { anchor } }));
            // ---------- ---------- ----------
            // スクロール
            if (isSmooth) {
                // スムーススクロール
                this.isScrolling = true;
                const duration = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(distance / this.params.speed) * 1000;
                const timeStart = performance.now();
                const smoothScroll = (time) => {
                    const progress = (time - timeStart) / duration;
                    if (progress < 1 && !this.isStop) {
                        // スムーススクロール　進行
                        window.scrollTo(0, topScroll + distance * ease[this.params.easing](progress));
                        // window.scrollTo(0, topScroll + (position - topScroll) * progress);
                        window.requestAnimationFrame(smoothScroll);
                    }
                    else if (this.isStop) {
                        // スムーススクロール 中断
                        this.isScrolling = false;
                        document.dispatchEvent(new CustomEvent('stopScroll', { detail: { anchor } }));
                    }
                    else {
                        // スムーススクロール 終了
                        window.scrollTo(0, position);
                        this.isScrolling = false;
                        document.dispatchEvent(new CustomEvent('afterScroll', { detail: { anchor } }));
                    }
                };
                window.requestAnimationFrame(smoothScroll);
            }
            else {
                window.scrollTo(0, position);
            }
        }
        else {
            this.error('id is not found');
        }
    }
    /**
     * スクロールを停止
     *
     * @memberof Gekko
     */
    stop() {
        this.isStop = true;
    }
    /**
     * スクロール時に、指定のイベントに対してイベントリスナーを登録します。
     *
     * @param event - リスンするイベント。'beforeScroll'、'afterScroll'、または 'stopScroll' のいずれかを指定。
     * @param callback - イベントがトリガされた時に実行されるコールバック関数。
     *                   `anchor` はスクロール先のアンカーID。＃は付かない。
     */
    on(event, callback) {
        const handler = (e) => {
            callback(e.detail.anchor);
        };
        document.addEventListener(event, handler);
    }
    /**
     * オプションを上書きする
     *
     * @param {Partial<Params>} options
     * @memberof Gekko
     */
    options(options) {
        this.params = {
            ...this.params,
            ...options,
        };
    }
    destroy() {
        document.querySelectorAll('a').forEach((elm) => {
            elm.removeEventListener('click', this.onClick);
        });
        const mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        document.removeEventListener(mousewheelevent, this.onScroll);
        document.removeEventListener('touchstart', this.onScroll);
    }
    onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        const elm = e.currentTarget;
        if (!elm) {
            this.error('Unexpected error occurred. Target does not exist.');
            return;
        }
        // ページ内のアンカーか判定して、移動先を決定
        const anchor = `${elm.protocol}//${elm.host}${elm.pathname}` === location.origin + location.pathname ? elm.hash : '';
        if (anchor && elm.dataset.gekko !== 'no-smooth') {
            this.scroll(anchor);
        }
        else if (anchor && elm.dataset.gekko === 'no-smooth') {
            this.scroll(anchor, false);
        }
        else {
            window.location.href = elm.href;
        }
    }
    onScroll() {
        if (this.isScrolling) {
            this.stop();
        }
    }
    error = (...args) => {
        console.error('Gekko', ...args);
    };
}
export default Gekko;
