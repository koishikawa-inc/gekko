export interface TypeGekko {
    scroll(anchor: string): void;
    stop(): void;
}
declare const keys: ("inQuad" | "outQuad" | "inOutQuad" | "inCubic" | "outCubic" | "inOutCubic" | "inQuart" | "outQuart" | "inOutQuart" | "inQuint" | "outQuint" | "inOutQuint" | "inSine" | "outSine" | "inOutSine" | "inExpo" | "outExpo" | "inOutExpo" | "inCirc" | "outCirc" | "inOutCirc" | "inElastic" | "outElastic" | "inOutElastic" | "inBack" | "outBack" | "inOutBack" | "inBounce" | "outBounce" | "inOutBounce" | "linear")[];
type Easing = (typeof keys)[number];
export type Params = {
    speed: number;
    isSpeedAsDuration: boolean;
    delay: number;
    offset: number | string | (() => number);
    easing: Easing;
};
export {};
