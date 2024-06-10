import ease from './ease';
import { Params, TypeGekko } from './type';

class Gekko implements TypeGekko {
  private params: Params;
  private isStop: boolean = false;
  private isScrolling: boolean = false;

  private optionsDefault: Params = {
    speed: 1000,
    isSpeedAsDuration: false,
    delay: 0,
    easing: 'outQuad',
    offset: 0,
  };

  constructor(options?: Partial<Params>) {
    this.params = {
      ...this.optionsDefault,
      ...options,
    };

    // a タグのクリックイベント登録
    document.querySelectorAll('a').forEach((elm) => {
      if (!elm.target) {
        elm.addEventListener('click', this.clickHandler);
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
  scroll(anchor: string, isSmooth: boolean = true): void {
    const target = document.getElementById(anchor.replace('#', ''));

    if (target) {
      this.isStop = false;
      const topScroll = window.scrollY || document.documentElement.scrollTop;
      const topTarget = target.getBoundingClientRect().top + topScroll;

      //イベント発火
      document.dispatchEvent(new CustomEvent('beforeScroll', { detail: { anchor } }));

      // ---------- ---------- ----------
      // 移動先座標計算
      let offset;
      if (typeof this.params.offset == 'number') {
        offset = this.params.offset;
      } else if (typeof this.params.offset == 'string') {
        offset = document.querySelector(this.params.offset)?.getBoundingClientRect().height || 0;
      } else if (typeof this.params.offset == 'function') {
        offset = this.params.offset();
      } else {
        offset = 0;
      }

      const position = Math.max(0, topTarget - offset);
      const distance = position - topScroll;

      if (distance === 0) return;

      // ---------- ---------- ----------
      // ブラウザ履歴追加
      history.pushState({}, '', anchor);

      // ---------- ---------- ----------
      // スクロール
      if (isSmooth) {
        // スムーススクロール
        this.isScrolling = true;
        const duration = this.params.isSpeedAsDuration ? this.params.speed : Math.abs(distance / this.params.speed) * 1000;
        const timeStart = performance.now();
        const smoothScroll = (time: number) => {
          const progress = (time - timeStart) / duration;
          if (progress < 1 && !this.isStop) {
            // スムーススクロール　進行
            window.scrollTo(0, topScroll + distance * ease[this.params.easing](progress));
            // window.scrollTo(0, topScroll + (position - topScroll) * progress);
            window.requestAnimationFrame(smoothScroll);
          } else if (this.isStop) {
            // スムーススクロール 中断
            this.isScrolling = false;
            document.dispatchEvent(new CustomEvent('stopScroll', { detail: { anchor } }));
          } else {
            // スムーススクロール 終了
            window.scrollTo(0, position);
            this.isScrolling = false;
            document.dispatchEvent(new CustomEvent('afterScroll', { detail: { anchor } }));
          }
        };
        window.requestAnimationFrame(smoothScroll);
      } else {
        window.scrollTo(0, position);
      }
    } else {
      this.error('id is not found');
    }
  }

  /**
   * スクロールを停止
   *
   * @memberof Gekko
   */
  stop(): void {
    this.isStop = true;
  }

  /**
   * スクロール時に、指定のイベントに対してイベントリスナーを登録します。
   *
   * @param event - リスンするイベント。'beforeScroll'、'afterScroll'、または 'stopScroll' のいずれかを指定。
   * @param callback - イベントがトリガされた時に実行されるコールバック関数。
   *                   `anchor` はスクロール先のアンカーID。＃は付かない。
   */
  on(event: 'beforeScroll' | 'afterScroll' | 'stopScroll', callback: (anchor: string) => void) {
    const handler = (e: CustomEvent) => {
      callback(e.detail.anchor);
    };

    document.addEventListener(event, handler as EventListenerOrEventListenerObject);
  }

  /**
   * オプションを上書きする
   *
   * @param {Partial<Params>} options
   * @memberof Gekko
   */
  options(options: Partial<Params>) {
    this.params = {
      ...this.params,
      ...options,
    };
  }

  destroy(): void {
    document.querySelectorAll('a').forEach((elm) => {
      elm.removeEventListener('click', this.clickHandler);
    });

    const mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    document.removeEventListener(mousewheelevent, this.onScroll);
    document.removeEventListener('touchstart', this.onScroll);
  }

  private clickHandler = (e: MouseEvent) => {
    this.onClick(e);
  };

  private onClick(e: MouseEvent): void {
    const elm = e.currentTarget as HTMLAnchorElement;

    if (!elm) {
      this.error('Unexpected error occurred. Target does not exist.');
      return;
    }

    // ページ内のアンカーか判定して、移動先を決定
    const anchor = `${elm.protocol}//${elm.host}${elm.pathname}` === location.origin + location.pathname ? elm.hash : '';

    if (anchor && elm.dataset.gekko !== 'no-smooth') {
      e.preventDefault();
      e.stopPropagation();
      this.scroll(anchor);
    }
    // else if (anchor && elm.dataset.gekko === 'no-smooth') {
    //   this.scroll(anchor, false);
    // } else {
    //   window.location.href = elm.href;
    // }
  }

  private onScroll(): void {
    if (this.isScrolling) {
      this.stop();
    }
  }

  private error = (...args: any) => {
    console.error('Gekko', ...args);
  };
}

export default Gekko;
