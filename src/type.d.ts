export interface TypeGekko {
  scroll(anchor: string): void;
  stop(): void;
}

export type Params = {
  speed: number;
  isDuration: boolean;
  delay: number;
  header: string;
  offset: number;

  easing: 'inQuad' | 'outQuad' | 'inOutQuad' | 'inCubic' | 'outCubic' | 'inOutCubic' | 'inQuart' | 'outQuart' | 'inOutQuart' | 'inQuint' | 'outQuint' | 'inOutQuint' | 'inSine' | 'outSine' | 'inOutSine' | 'inExpo' | 'outExpo' | 'inOutExpo' | 'inCirc' | 'outCirc' | 'inOutCirc' | 'inElastic' | 'outElastic' | 'inOutElastic' | 'inBack' | 'outBack' | 'inOutBack' | 'inBounce' | 'outBounce' | 'inOutBounce';
};
