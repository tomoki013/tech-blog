# ともきちのエンジニア成長記

Astro と Tailwind CSS v4 で構築した、軽量・高速・多言語対応の個人技術ブログです。

このリポジトリは、個人技術ブログ **「ともきちのエンジニア成長記」** のソースコードです。

もともとは Next.js 製のブログとして運用していましたが、個人技術ブログに必要な機能を見直し、よりシンプルで高速な構成に作り直しました。

記事を読むためのサイトとして、不要なクライアント JavaScript や常設機能をできるだけ増やさず、Markdown から静的 HTML を生成して Cloudflare から配信することを重視しています。

## 設計方針

- **軽量・高速**
  - デフォルトではクライアント JavaScript に依存しない構成
  - Markdown をビルド時に HTML へ変換
  - 静的 HTML を Cloudflare から高速配信

- **コンテンツ中心**
  - 記事は Markdown で管理
  - Astro Content Collections を使って記事データを型安全に扱う
  - 読むことを妨げる不要な機能を増やさない

- **多言語対応**
  - 日本語をデフォルト言語として設計
  - 英語記事は `/en/` 配下に配置
  - 将来的に記事ごとの翻訳・未翻訳状態を管理しやすい構成

- **最小限の機能**
  - 認証、課金、DB、API、CMS は持たない
  - React や MDX は使わない
  - 検索機能やシンタックスハイライトは必要になった時に追加する

- **AI エージェントに任せやすい構成**
  - 技術選定と制約を明確にする
  - 不要な機能追加や SPA 化を避ける
  - シンプルな構造を維持し、レビューしやすくする

## 技術スタック

- **Framework**: Astro v6
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Content**: Markdown / Astro Content Collections
- **Linting & Formatting**: Biome
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Workers Static Assets
- **CI/CD**: GitHub Actions

## 主な機能

- 日本語・英語の多言語対応
- Markdown による記事管理
- Astro Content Collections による型安全なコンテンツ管理
- ダークモード対応
- レスポンシブデザイン
- SEO 基本対応
  - sitemap.xml
  - RSS
  - robots.txt
  - OGP メタタグ
- Cloudflare Workers Static Assets へのデプロイ
- Biome による lint / format
- TypeScript による型チェック

## 今後追加する可能性がある機能

このブログでは、機能をむやみに増やさない方針です。

ただし、記事数や内容に応じて、以下は追加する可能性があります。

- サイト内検索
- シンタックスハイライト

それ以外の大きな常設機能は、基本的には追加しない予定です。

## 必要な環境

- Node.js 22 LTS 以上
- pnpm 10 以上

## セットアップ

```bash
corepack enable
pnpm install
cp .env.example .env
````

`.env` の `PUBLIC_SITE_URL` を本番環境の URL に変更してください。

## 開発

```bash
pnpm dev
```

## 品質チェック

```bash
pnpm check      # Biome による lint / format チェック
pnpm typecheck  # TypeScript の型チェック
pnpm build      # 本番ビルド
```

## デプロイ

Cloudflare Workers Static Assets へデプロイします。

```bash
pnpm deploy
```

デプロイ設定は `wrangler.jsonc` を参照してください。

## プロジェクト構成

```txt
src/
  components/        再利用可能な Astro コンポーネント
  content/
    articles/        記事コンテンツ
      ja/            日本語記事
      en/            英語記事
  i18n/              多言語対応の設定・文言
  layouts/           共通レイアウト・記事レイアウト
  site.config.ts     サイト名、説明、著者情報などの設定
```

## 記事の配置

日本語記事は `src/content/articles/ja/` に配置します。

英語記事は `src/content/articles/en/` に配置します。

URL は次のような構成になります。

```txt
/articles/example/
/en/articles/example/
```

日本語版を正本とし、英語版はその翻訳・補足として扱います。

## ライセンス

このリポジトリ内のソースコードは MIT License のもとで公開しています。

ただし、記事本文、テキストコンテンツ、写真、画像、アイコン、OGP画像、デザイン素材、その他のコード以外のアセットは、明示がない限り MIT License の対象外です。これらのコンテンツに関する権利は Tomokichi が留保します。

詳細は [LICENSE](./LICENSE) および [CONTENT_RIGHTS.md](./CONTENT_RIGHTS.md) を参照してください。

---

# Tomokichi's Engineering Growth Log

A lightweight, high-performance, multilingual personal engineering blog built with Astro and Tailwind CSS v4.

This repository contains the source code for **Tomokichi's Engineering Growth Log**.

The blog was originally built with Next.js, but it was rebuilt with a simpler and faster architecture after reconsidering what a personal engineering blog actually needs.

The goal is to deliver articles as static HTML generated from Markdown, avoid unnecessary client-side JavaScript and permanent features, and serve the site quickly from Cloudflare.

## Philosophy

* **Lightweight and fast**

  * No dependency on client-side JavaScript by default
  * Markdown is converted to HTML at build time
  * Static HTML is served quickly from Cloudflare

* **Content-focused**

  * Articles are written in Markdown
  * Content is managed with Astro Content Collections
  * The site avoids unnecessary features that distract from reading

* **Multilingual**

  * Japanese is the default language
  * English articles are placed under `/en/`
  * The structure is designed to make translated and untranslated articles easier to manage

* **Minimal feature set**

  * No authentication, billing, database, API, or CMS
  * No React or MDX
  * Search and syntax highlighting may be added only when needed

* **Designed for AI-assisted development**

  * Technical constraints are kept clear
  * Unnecessary feature additions and SPA-like complexity are avoided
  * The structure stays simple and easy to review

## Tech Stack

* **Framework**: Astro v6
* **Styling**: Tailwind CSS v4
* **Language**: TypeScript
* **Content**: Markdown / Astro Content Collections
* **Linting & Formatting**: Biome
* **Package Manager**: pnpm
* **Deployment**: Cloudflare Workers Static Assets
* **CI/CD**: GitHub Actions

## Features

* Japanese and English support
* Markdown-based article authoring
* Type-safe content management with Astro Content Collections
* Dark mode support
* Responsive design
* Basic SEO support

  * sitemap.xml
  * RSS
  * robots.txt
  * Open Graph metadata
* Deployment to Cloudflare Workers Static Assets
* Linting and formatting with Biome
* Type checking with TypeScript

## Possible Future Features

This blog intentionally keeps its feature set small.

Depending on the number and type of articles, the following features may be added in the future:

* Site search
* Syntax highlighting

Other large permanent features are not planned for now.

## Requirements

* Node.js 22 LTS or later
* pnpm 10 or later

## Setup

```bash
corepack enable
pnpm install
cp .env.example .env
```

Update `PUBLIC_SITE_URL` in `.env` with the production URL.

## Development

```bash
pnpm dev
```

## Quality Checks

```bash
pnpm check      # Lint and format check with Biome
pnpm typecheck  # TypeScript type check
pnpm build      # Production build
```

## Deployment

Deploy to Cloudflare Workers Static Assets.

```bash
pnpm deploy
```

See `wrangler.jsonc` for deployment configuration.

## Project Structure

```txt
src/
  components/        Reusable Astro components
  content/
    articles/        Article content
      ja/            Japanese articles
      en/            English articles
  i18n/              Internationalization config and messages
  layouts/           Base and article layouts
  site.config.ts     Site name, description, author, and other settings
```

## Article Structure

Japanese articles are placed in `src/content/articles/ja/`.

English articles are placed in `src/content/articles/en/`.

The URL structure is as follows:

```txt
/articles/example/
/en/articles/example/
```

The Japanese version is treated as the canonical source, and the English version is treated as its translation or supplement.

## License

The source code in this repository is licensed under the MIT License.

Articles, text content, photographs, images, icons, OGP images, design assets, and other non-code assets are not covered by the MIT License unless explicitly stated otherwise. All rights to such content are reserved by Tomokichi.

See [LICENSE](./LICENSE) and [CONTENT_RIGHTS.md](./CONTENT_RIGHTS.md) for details.
