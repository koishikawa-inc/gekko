import { Params, TypeGekko } from './type';

declare class Gekko implements TypeGekko {
    private params;
    private isStop;
    private isScrolling;
    constructor(options?: Partial<Params>);
    scroll(anchor: string, isSmooth?: boolean): void;
    stop(): void;
    on(event: 'beforeScroll' | 'afterScroll' | 'stopScroll', callback: (anchor: string) => void): void;
    options(options: Partial<Params>): void;
    destroy(): void;
    private onClick;
    private onScroll;
}
export default Gekko;
