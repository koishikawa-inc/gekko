import ease from './ease';
import { Params, TypeGekko } from './type';

const error = (...args: any) => {
  console.error('Gekko', ...args);
};

const optionsDefault: Params = {
  speed: 1000,
  isSpeedAsDuration: false,
  delay: 0,
  easing: 'outQuad',
  header: 'header',
  offset: 0,
};

class Gekko implements TypeGekko {
  private params: Params;
  private isStop: boolean = false;
  private isScrolling: boolean = false;

  constructor(options?: Partial<Params>) {
    this.params = {
      ...optionsDefault,
      ...options,
    };

    // a タグのクリックイベント登録
    document.querySelectorAll('a').forEach((elm) => {
      elm.addEventListener('click', (e: MouseEvent) => {
        this.onClick(e);
      });
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

  scroll(anchor: string, isSmooth: boolean = true): void {
    const target = document.getElementById(anchor.replace('#', ''));

    if (target) {
      this.isStop = false;
      const topScroll = window.pageYOffset || document.documentElement.scrollTop;
      const topTarget = target.getBoundingClientRect().top + topScroll;

      // ---------- ---------- ----------
      // 移動先座標計算
      let offset = document.querySelector(this.params.header)?.getBoundingClientRect().height || 0;
      offset += this.params.offset;

      const position = Math.max(0, topTarget - offset);
      const distance = position - topScroll;

      if (distance === 0) return;

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
      error('id is not found');
    }
  }

  stop(): void {
    this.isStop = true;
  }

  on(event: 'beforeScroll' | 'afterScroll' | 'stopScroll', callback: (anchor: string) => void) {
    const handler = (e: CustomEvent) => {
      callback(e.detail.anchor);
    };

    document.addEventListener(event, handler as EventListenerOrEventListenerObject);
  }

  options(options: Partial<Params>) {
    this.params = {
      ...this.params,
      ...options,
    };
  }

  destroy(): void {
    document.querySelectorAll('a').forEach((elm) => {
      elm.removeEventListener('click', this.onClick);
    });

    const mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    document.removeEventListener(mousewheelevent, this.onScroll);
    document.removeEventListener('touchstart', this.onScroll);
  }

  private onClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const elm = e.currentTarget as HTMLAnchorElement;

    if (!elm) {
      error('no elm');
      return;
    }

    const anchor = `${elm.protocol}//${elm.host}${elm.pathname}` === location.origin + location.pathname ? elm.hash : '';

    if (anchor && elm.dataset.gekko !== 'no-smooth') {
      this.scroll(anchor);
    } else if (anchor && elm.dataset.gekko === 'no-smooth') {
      this.scroll(anchor, false);
    } else {
      window.location.href = elm.href;
    }
  }

  private onScroll(): void {
    if (this.isScrolling) {
      this.stop();
    }
  }
}

export default Gekko;
