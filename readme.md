# Gekko

依存ライブラリのないスムーススクロールライブラリ。

Gekko は フィンランド語でヤモリを意味する言葉です。

## できること

- アンカーリンクまでアニメーションでスクロール
- 外部ページから遷移時にアニメーションでスクロール
- 絶対パス、相対パスに対応
- .no-scroll 追加でアニメーション無効
- スクロール開始時に「beforeScroll」イベントを発火
- スクロール終了時に「afterScroll」イベントを発火
- スクロール中断時に「stopScroll」イベントを発火
- メソッド制御

## 使い方

### ダウンロードして使う場合

dist/gekko.min.js を良きディレクトリに設置

```html
<script src="ディレクトリ/gekko.min.js"></script>

<script>
  const gekko = new Gekko();
</script>
```

動作テスト

```sh
> yarn install
> yarn dev
```

<!-- 準備中
### import して使う場合

```sh
npm install @darowasahito/gekko
```

```javascript
import Gekko from "Gekko";

const gekko = new Gekko();
```
-->

## オプション

### デフォルト

| プロパティ | 型                                                                                                                                                                                                                                                                                                                                                                                                                      | デフォルト | 説明                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| speed      | number                                                                                                                                                                                                                                                                                                                                                                                                                  | 1000       | アニメーションスピード。  isDuration が false のとき、1 秒間に移動するピクセル量。  isDuration が true のとき、アニメーション時間 |
| isDuration | boolean                                                                                                                                                                                                                                                                                                                                                                                                                 | false      | speed をアニメーション時間(duration)として扱うかどうか                                                                          |
| delay      | number                                                                                                                                                                                                                                                                                                                                                                                                                  | 0          | 遅延 ミリ秒                                                                                                                     |
| easing     | いずれかの文字列 'inQuad', 'outQuad' , 'inOutQuad' , 'inCubic' , 'outCubic' , 'inOutCubic' , 'inQuart' , 'outQuart' , 'inOutQuart' , 'inQuint' , 'outQuint' , 'inOutQuint' , 'inSine' , 'outSine' , 'inOutSine' , 'inExpo' , 'outExpo' , 'inOutExpo' , 'inCirc' , 'outCirc' , 'inOutCirc' , 'inElastic' , 'outElastic' , 'inOutElastic' , 'inBack' , 'outBack' , 'inOutBack' , 'inBounce' , 'outBounce' , 'inOutBounce' | 'outQuad'  | イージング                                                                                                                      |
| header     | string                                                                                                                                                                                                                                                                                                                                                                                                                  | 'header'   | ヘッダーのセレクタ。スクロール位置をヘッダーの高さ分ずらす                                                                      |
| offset     | number                                                                                                                                                                                                                                                                                                                                                                                                                  | 0          | スクロール位置を、指定ピクセル分ずらす                                                                                          |

## イベント

```javascript
const gekko = new Gekko();

//スクロール開始時
gekko.on("beforeScroll", function (anchor) {
  /*　anchor: 移動先のアンカー */
});

// スクロール終了時
gekko.on("afterScroll", function (anchor) {
  /*　anchor: 移動先のアンカー */
});

// スクロール中断時
gekko.on("stopScroll", function (anchor) {
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

// gekko破棄
gekko.destory();
```

## スムーススクロール無効化

```.no-scroll```がついたアンカーリンクは、スムーススクロールしません。

```html
<a href="#anchor" class="no-scroll">アンカーリンク</a>
```

## 参考

[cferdinandi/smooth-scroll](https://github.com/cferdinandi/smooth-scroll)  
vanilla js 化するにあたって参考にしました。

[jQuery Easing](http://gsgd.co.uk/sandbox/jquery/easing/)  
イージングのロジックを使っています。
