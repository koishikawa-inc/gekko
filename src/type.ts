import ease from './ease';

export interface TypeGekko {
  scroll(anchor: string): void;
  stop(): void;
}

// easeのプロパティをユニオン型に変換
const getKeys = <T extends { [key: string]: unknown }>(obj: T): (keyof T)[] => {
  return Object.keys(obj);
};
const keys = getKeys(ease);
type Easing = (typeof keys)[number];

export type Params = {
  speed: number;
  isSpeedAsDuration: boolean;
  delay: number;
  offset: number | string | (() => number);
  easing: Easing;
};
