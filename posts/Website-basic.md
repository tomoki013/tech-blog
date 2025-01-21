---
title: "0からWEBサイトを作ってみよう！"
description: "HTMLとCSSを使った初心者向けのWEBサイト作成ガイドです。VSCodeのインストールから基本構造の作成、CSSによるデザインの追加まで、わかりやすく解説しています。WEBサイト作成を基礎から始めたい方におすすめの内容です！"
date: '2025-01-21'
image: /images/
alt: "image"
tags: ["HTML", "CSS"]
---

## 初心者向け！HTMLとCSSを使ったWEBサイト作成ガイド

最近ではWordPressなどのCMSを使えば簡単にWEBサイトを作成することができますが、自分でHTMLやCSSを学びながら作成することで、より深い理解と自由なカスタマイズが可能になります。  
このブログでは、初心者でも取り組めるHTMLとCSSを使った簡単なWEBサイト作成の流れを紹介します。  

注意：今回の記事では、WEBサイト作成の流れに焦点を当てるため、HTMLやCSSの詳細な説明は省略しています。  
基本的なタグやプロパティの使い方については、別途私の書いた記事やオンラインリソース、公式ドキュメントを参考にしてください。  

### 1.必要なツールを準備する

WEBサイト作成には、以下のツールを使用します。  
1. テキストエディタ：コードを書くためにVisual Studio Code（VSCode）を使用します。  
2. ブラウザ：Google ChromeやMicrosoft Edgeなどのブラウザで作成したサイトを確認します。  

#### テキストエディタについて

テキストエディタには、VSCode以外にもAtomやSublime Text、Notepad++など多くの選択肢があります。  
しかしVSCodeは以下の理由で特におすすめです。  
- 全世界で広く使われている：世界中の開発者が使用しており、ドキュメントやサポートが豊富です。  
- 拡張機能が豊富：コード補完やデバッグ、テーマ変更などが簡単。  
- 直感的なインターフェース：初心者でも使いやすい設計。  
- マルチプラットフォーム対応：Windows、macOS、LinuxなどほとんどのOSで使用可能。  

#### VSCodeのインストール手順

1. [VSCode公式サイト](https://code.visualstudio.com/)にアクセス。  
2. ダウンロードページからインストーラーを取得してインストールします。  
3. インストール後、日本語化を行います。  
   - メニューバーから「Extensions」をクリック、「Japanese Language Pack for Visual Studio Code」を検索してインストール。  

### 2.プロジェクトを作成する

1. 任意の場所にフォルダを作成します。  
   - 例：`MyFirstWebsite`
2. VScodeでそのフォルダを開きます。  
   - 「ファイル」＞「フォルダを開く」を選択して作成したフォルダを選びます。  
  
### 3.基本のHTMLファイルを作成する

1. 新しいファイルを作成  
   - フォルダ内で右クリックし、「新しいファイル」選択。  
   - ファイル名を`index.html`にします。  
2. HTMLの基本構造を書く　　
```html
/* index.html */
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
</head>
<body>
    <header>
        <h1>初めてのWEBサイト</h1>
    </header>
    <main>
        <p>HTMLとCSSで作った最初のWEBサイトです！</p>
    </main>
    <footer>
        <p>&copy; 2025 My First Website</p>
    </footer>
</body>
</html>
```
- HTMLは「タグ」で囲って記述します。例えば`<p>`から`</p>`で囲まれた部分を「段落」を意味します。  
- `<body>`内が実際に画面に表示される部分です。上記の例では、`<h1>`や`<p>`タグの内容が表示されます。  

### 4.CSSを書く

1. CSSファイルを作成  
   - `index.html`と同じファイルを作成。  
   - ファイル名を`style.css`にします。  
2. CSSを書く
```css
/* style.css */
body {
   font-family: Arial, sans-serif;
   line-height: 1.6;
   margin: 0;
   padding: 0;
   background-color: #f4f4f9;
   color: #333;
}

header {
   background-color: #333;
   color: #fff;
   padding: 10px 0;
   text-align: center;
}

footer {
   background-color: #333;
   color: #fff;
   padding: 10px 0;
   text-align: center;
   margin-top: 20px;
}

main {
   padding: 20px;
   text-align: center;
}
```
- CSS（Cascading Style Sheets）はHTMLの見た目を装飾するための言語です。  
- 上記の例では、`<body>`や`<header>`、`<footer>`、`<main>`にそれぞれスタイルが適用されています。  

3. HTMLとCSSをリンク
   - `index.html`の`<head>`タグ内に以下のコードを追加します。  
```html
<link rel="stylesheet" href="style.css">
```
- `<link>`タグを使ってHTMLと外部CSSファイルを関連付けます。この例では、`style.css`が`index.html`に適用されます。  

### 5.ブラウザで確認する

1. `index.html`を右クリックして「Default Browser」や「Live Server」で開きます。  
2. ブラウザにデザインが反映されていることを確認します。  

### 6.次のステップ

HTMLとCSSの基礎を学んだら、以下のステップに進むのがおすすめです。  
- JavaScript：動的な動きを加える。  
- レスポンシブデザイン：スマホ対応のデザインを学ぶ。  
- ホスティング：作成したWEBサイトをインターネットに公開する。  

## まとめ

今回の流れで、HTMLとCSSを使った基本的なWEBサイト作成ができるようになります。  
最初はシンプルなものでも、自分でカスタマイズを加えていくと楽しくなります。  
ぜひ挑戦してみてください！  
