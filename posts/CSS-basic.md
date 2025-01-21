---
title: "CSSの基本を学ぼう！ウェブデザイン初心者向けガイド"
description: "description"
date: '2025-01-22'
image: /images/
alt: "image"
tags: ["CSS"]
---

HTML学んだ次は、ウェブページを見やすく、そして魅力的にするためにCSS（Cascading Style Sheets）の知識が必要です。  
このブログでは、CSSの基本をわかりやすく解説しています。  

## CSSとは？

CSSは、ウェブページのスタイル（デザイン）を指定するための言語です。HTMLがウェブページの構造尾を作るのに対し、CSSはその構造に装飾を施します。  

### CSSの役割
- フォントや色の指定：文字サイズや色、フォントスタイルを設定  
- レイアウトの調整：ページの配置や間隔を調整  
- レスポンシブデザイン：モバイルやタブレット向けのデザインを作成  

## CSSの基本的な使いかた

CSSを使用するには、3つの方法があります：
1. インラインCSS
2. 内部CSS
3. 外部CSS

### 1.インラインCSS

HTMLの要素に直接スタイルを記述する方法です。  
一つの要素に限定したスタイルを適用したい場合に便利ですが、以下のデメリットがあるため頻繁には使いません。  
- コードが長くなる  
- ほかの要素に再利用できない  
- 保守性が低い  
```html
<p style="color: blue; font-size: 16px;">これは青色の文字です。</p>
```

### 2.内部CSS

HTMLファイルの`<head>`タグ内に`<style>`タグを使用してCSSを記述する方法です。  
少量のスタイルを指定する規模の小さいプロジェクトの場合に適しています。  
メリット  
- 外部ファイルを作成する必要がない  
- 同じページ内の複数の要素にスタイルを適用できる  

デメリット  
- HTMLとCSSが分離されていないため、規模が大きくなると管理が難しい  
```html
<!DOCTYPE html>
    <html lang="ja">
    <head>
        <style>
            p {
                color: green;
                font-size: 20px;
            }
        </style>
    </head>
    <body>
        <p>これは緑色の文字です。</p>
    </body>
</html>
```

### 3.外部CSS

外部のCSSファイルにスタイルを記述し、HTMLからリンクする方法です。  
これが最も一般的で、保守性が高いため、よく使われ、最も推奨される方法です。  
メリット  
- HTMLとCSSが分離されているため、規模が大きくなっても管理が容易  
- おなじCSSファイルを複数のHTMLファイルで再利用できる  
- サイト全体のデザイン変更が容易
  
デメリット  
- 外部ファイルをロードするため、少しだけ読み込み時間が増える  
  
HTMLファイル：
```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <p>外部CSSが適用された文字です。</p>
    </body>
</html>
```
CSSファイル：
```css
p {
    color: red;
    font-size: 22px;
}
```

## CSSの基本的な書き方

CSSは、以下のように「セレクタ」「プロパティ」「値」を組み合わせて記述します。  
```css
セレクタ {
    プロパティ: 値;
    プロパティ: 値;
}
```

### セレクタの種類

セレクタは、どのHTML要素にスタイルを適用すかを指定します。  

#### 要素セレクタ

HTMLタグ名を指定してスタイルを適用します。  
```css
p {
    color: blue;
    font-size: 16px;
}
```

#### クラスセレクタ

HTML要素に`class`属性を指定してスタイルを適用します。  
クラスセレクタは「.」で始まります。  
```css
.my-class {
    background-color: yellow;
}
```
HTML例：
```html
<p class="my-class">クラスセレクタが適用された段落。</p>
```

#### IDセレクタ

HTML要素に`id`属性を指定してスタイルを適用します。  
IDセレクタは「#」で始まります。  
```css
#my-id {
    color: purple;
    font-weight: bold;
}
```
HTML例：
```html
<p id="my-id">IDセレクタが適用された段落。</p>
```

### よく使うプロパティと値の指定方法

#### 色指定（`color`や`background-color`など）

色を指定する場合、次のような方法があります。  
1.キーワード  
   ブラウザが認識できる色名を指定します。  
```css
color: red;
color: blue;
```

2.16進数  
RGBの各色成分を16進数で指定します。  
```css
color: #ff0000; /* 赤 */
color: #00ff00; /* 緑 */
color: #0000ff; /* 青 */
```

3.RGB値  
`rgb()`関数を使用して、赤・緑・青の値（0~255）を指定します。  
```css
color: rgb(255, 0, 0); /* 赤 */
color: rgb(0, 255, 0); /* 緑 */
color: rgb(0, 0, 255); /* 青 */
```

4.RGBA値  
透明度（Alpha値）を追加して指定します。（0は完全透明、1は不透明）  
```css
color: rgba(255, 0, 0, 1); /* 半透明の赤 */
```

5.HSLとHSLA  
色相（Hue）、彩度（Saturation）、明度（Lightness）を指定します。  
Alpha値を含む場合はHSLAを使用します。  
```css
color: hsl(0, 100%, 50%); /* 赤 */
color: hsl(120, 100%, 50%); /* 緑 */
color: hsl(240, 100%, 50%); /* 青 */
color: hsla(0, 100%, 50%, 0.5); /* 半透明の赤 */
```

#### フォント指定（`font-family`や`font-size`など）

- `font-family`：使用するフォントを指定します。複数のフォントを指定する場合は、カンマで区切ります。 
```css
font-family: Arial, sans-serif;
font-family: "Times New Roman", serif;
```

- `font-size`：フォントサイズを指定します。  
  - 単位例：`px`（ピクセル）、`em`（親要素のフォントサイズに対する相対値）、`rem`（ルート要素のフォントサイズに対する相対値）  
```css
font-size: 16px;
font-size: 1.5em;
font-size: 1.5rem;
```

#### レイアウトプロパティ

CSSでは、要素の余白や枠線を調整するために次のプロパティを使用します。  
- `margin`：外側の余白を指定  

要素の周りに空間を作るためのプロパティです。  
- 単位：`px`（ピクセル）、`em`（親要素のフォントサイズに対する相対値）、`rem`（ルート要素のフォントサイズに対する相対値）%などが使えます。  
- 指定例：
```css
margin: 10px; /* 10pxの余白 */
margin: 10px 20px; /* 上下10px、左右20px */
margin: 10px 20px 30px; /* 上10px、左右20px、下30px */
margin: 10px 20px 30px 40px; /* 上10px、右20px、下30px、左40px */
```

- `padding`：内側の余白を指定  

要素の内側に空間を作るためのプロパティです。 
ボックスの中のテキストや画像の配置を使用する際によく使います。  
- 単位や指定方法は`margin`と同じです。  
- 指定例：
```css
padding: 10px; /* 10pxの余白 */
padding: 10px 20px; /* 上下10px、左右20px */
padding: 10px 20px 30px; /* 上10px、左右20px、下30px */
padding: 10px 20px 30px 40px; /* 上10px、右20px、下30px、左40px */
```

- `border`：枠線を指定  

要素の周りに枠線を作るためのプロパティです。  
線の太さ、種類、色を指定します。  
- 値の指定順序：`[線の太さ] [線の種類] [線の色]`  
- 種類の例：
   - `solid`（実線）
   - `dashed`（破線）
   - `dotted`（点線）
   - `double`（二重線）
   - `groove`（3Dグルーブ）
   - `ridge`（3Dリッジ）
   - `inset`（3Dインセット）
   - `outset`（3Dアウトセット）  
- 単位：`px`（ピクセル）、`em`（親要素のフォントサイズに対する相対値）、`rem`（ルート要素のフォントサイズに対する相対値）%などが使えます。  
- 指定例：
```css
border: 1px solid black; /* 1pxの黒色の枠線 */
border: 2px dashed red; /* 2pxの破線の赤色の枠線 */
border: 3px dotted blue; /* 3pxの点線の青色の枠線 */
```

## 実際にCSSを試してみよう

以下は、簡単なCSSデザインを使ったHTMLページの例です。  
HTMLファイル（index.html）：
```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1>CSSの基本を学ぼう！</h1>
        <p>CSSを使えば、ウェブページを簡単にデザインできます。</p>
    </body>
</html>
```
CSSファイル（styles.css）：
```css
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #555;
    font-size: 18px;
    margin: 20px;
}
```
このコードを使って実際にブラウザで表示してみましょう。  

## まとめ

CSSを使うことで、ウェブページにスタイルを適用し、より魅力的なデザインを作成できます。  
この記事では、CSSの基本的な使い方やプロパティについて紹介しました。  
HTMLと組み合わせて、少しずつデザインを楽しみながら学んでみてください！  
