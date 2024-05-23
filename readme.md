# Gekko

スムーススクロールライブラリ。

Gekko は フィンランド語でヤモリを意味する言葉です。

## 特徴
- 他のライブラリに依存しません
- Typescript対応

## できること

- アンカーリンクまでアニメーションでスクロール
- 外部ページから遷移時にアニメーションでスクロール
- 位置調整（ヘッダーなど）
- 絶対パス、相対パスに対応
- data-gekko="no-smooth" 追加でアニメーション無効
- スクロール開始時に「beforeScroll」イベントを発火
- スクロール終了時に「afterScroll」イベントを発火
- スクロール中断時に「stopScroll」イベントを発火
- メソッド制御

## 使い方


### import して使う場合

```sh
npm install @darowasahito/gekko
```

```javascript
import Gekko from "@darowasahito/gekko";

const gekko = new Gekko();
```

### CDNから読み込んでして使う場合

```html
<script src="https://cdn.jsdelivr.net/npm/@darowasahito/gekko/dist/gekko.min.js"></script>

<script>
  const gekko = new Gekko();
</script>
```

### ダウンロードして使う場合

dist/gekko.min.js を良きディレクトリに設置

```html
<script src="ディレクトリ/gekko.min.js"></script>

<script>
  const gekko = new Gekko();
</script>
```



## オプション

### デフォルト

| プロパティ | 型                                                                                                                                                                                                                                                                                                                                                                                                                      | デフォルト | 説明                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| speed      | number                                                                                                                                                                                                                                                                                                                                                                                                                  | 1000       | アニメーションスピード。  isSpeedAsDuration が false のとき、1 秒間に移動するピクセル量。  isSpeedAsDuration が true のとき、アニメーション時間 |
| isSpeedAsDuration | boolean                                                                                                                                                                                                                                                                                                                                                                                                                 | false      | speed をアニメーション時間(duration)として扱うかどうか                                                                          |
| delay      | number                                                                                                                                                                                                                                                                                                                                                                                                                  | 0          | 遅延 ミリ秒                                                                                                                     |
| easing     | いずれかの文字列 'inQuad', 'outQuad' , 'inOutQuad' , 'inCubic' , 'outCubic' , 'inOutCubic' , 'inQuart' , 'outQuart' , 'inOutQuart' , 'inQuint' , 'outQuint' , 'inOutQuint' , 'inSine' , 'outSine' , 'inOutSine' , 'inExpo' , 'outExpo' , 'inOutExpo' , 'inCirc' , 'outCirc' , 'inOutCirc' , 'inElastic' , 'outElastic' , 'inOutElastic' , 'inBack' , 'outBack' , 'inOutBack' , 'inBounce' , 'outBounce' , 'inOutBounce' | 'outQuad'  | イージング                                                                                                                      |
| offset     | number \| string \| () => number                                                                                                                                                                                                                                                                                                                                                                                                               | 0          | スクロール位置をずらす。  <br>number: 数値を指定。指定ピクセル分ずらす。 <br>string: セレクタを指定。該当セレクタの高さ分ずらす。<br> () => number: 数値を返す関数を指定。引数なし。返り値の数値分ずらす。

## イベント

```javascript
const gekko = new Gekko();

//スクロール開始時
gekko.on("beforeScroll", (anchor) => {
  /*　anchor: 移動先のアンカー */
});

// スクロール終了時
gekko.on("afterScroll", (anchor) =>  {
  /*　anchor: 移動先のアンカー */
});

// スクロール中断時
gekko.on("stopScroll", (anchor) =>  {
  /*　anchor: 移動先のアンカー */
});
```

## メソッド

```javascript
const gekko = new Gekko();

// #anchor までスムーススクロール
gekko.scroll("#anchor");

// スムーススクロール停止
gekko.stop();

// オプション更新
gekko.options( オプション );

// gekko破棄
gekko.destory();
```

## スムーススクロール無効化

```data-gekko="no-smooth"```がついたアンカーリンクは、スムーススクロールしません。

```html
<a href="#anchor" data-gekko="no-smooth">アンカーリンク</a>
```

## 参考

[cferdinandi/smooth-scroll](https://github.com/cferdinandi/smooth-scroll)  
vanilla js 化するにあたって参考にしました。

[jQuery Easing](http://gsgd.co.uk/sandbox/jquery/easing/)  
イージングのロジックを使っています。
