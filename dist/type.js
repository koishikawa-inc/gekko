import ease from './ease';
// easeのプロパティをユニオン型に変換
const getKeys = (obj) => {
    return Object.keys(obj);
};
const keys = getKeys(ease);
