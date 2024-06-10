import { Params, TypeGekko } from './type';
declare class Gekko implements TypeGekko {
    private params;
    private isStop;
    private isScrolling;
    private optionsDefault;
    constructor(options?: Partial<Params>);
    /**
     * 指定のアンカーへスクロールする
     *
     * @param {string} anchor [必須] アンカーID。#はあってもなくても。
     * @param {boolean} [isSmooth=true] [オプション] スムーススクロールするか
     * @return {*}  {void}
     * @memberof Gekko
     */
    scroll(anchor: string, isSmooth?: boolean): void;
    /**
     * スクロールを停止
     *
     * @memberof Gekko
     */
    stop(): void;
    /**
     * スクロール時に、指定のイベントに対してイベントリスナーを登録します。
     *
     * @param event - リスンするイベント。'beforeScroll'、'afterScroll'、または 'stopScroll' のいずれかを指定。
     * @param callback - イベントがトリガされた時に実行されるコールバック関数。
     *                   `anchor` はスクロール先のアンカーID。＃は付かない。
     */
    on(event: 'beforeScroll' | 'afterScroll' | 'stopScroll', callback: (anchor: string) => void): void;
    /**
     * オプションを上書きする
     *
     * @param {Partial<Params>} options
     * @memberof Gekko
     */
    options(options: Partial<Params>): void;
    destroy(): void;
    private onClick;
    private onScroll;
    private error;
}
export default Gekko;
