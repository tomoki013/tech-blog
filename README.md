# ともきちのエンジニア成長記

Astro + Markdown + Tailwind CSS v4 + Biome + Cloudflare Workers Static Assets で作る、軽量な多言語技術ブログです。

## 方針

- Astroで静的HTMLを生成
- 日本語をデフォルト、英語を `/en/` 配下に配置
- Markdown記事をAstro Content Collectionsで管理
- ダークモード対応
- 記事内画像なし
- React / MDX / 検索 / シンタックスハイライトなし
- Cloudflare Workers Static Assetsにデプロイ

## 必要環境

- Node.js 22 LTS推奨
- pnpm 10系推奨
- Cloudflareアカウント（デプロイする場合）

## セットアップ

```bash
corepack enable
corepack prepare pnpm@10.19.0 --activate
pnpm install
cp .env.example .env
```

`.env` の `PUBLIC_SITE_URL` を本番URLに変更してください。

```env
PUBLIC_SITE_URL=https://example.com
```

## 開発サーバー

```bash
pnpm dev
```

デフォルトでは `http://localhost:4321` で起動します。

## 品質チェック

```bash
pnpm check
pnpm typecheck
pnpm build
```

## プレビュー

```bash
pnpm build
pnpm preview
```

## 記事の追加

日本語記事：

```text
src/content/articles/ja/my-article.md
```

英語記事：

```text
src/content/articles/en/my-article.md
```

slugは日本語・英語で共通にしてください。

```text
src/content/articles/ja/cloud-run-migration.md
src/content/articles/en/cloud-run-migration.md
```

frontmatter例：

```md
---
title: "記事タイトル"
description: "記事の説明文"
publishedAt: "2026-05-11"
updatedAt: "2026-05-11"
tags: ["Astro", "Cloudflare"]
draft: false
---
```

`draft: true` の記事は記事一覧、詳細ページ、RSS、sitemapに出ません。

## 画像の差し替え

以下のファイルを必要に応じて差し替えてください。

```text
public/favicon.ico
public/icon.svg
public/profile.png
public/og/default.png
```

OGP画像は記事ごとには生成せず、`public/og/default.png` を全ページで使います。

## Cloudflare Workers Static Assetsへのデプロイ

### 1. Wranglerログイン

```bash
pnpm exec wrangler login
```

### 2. 設定確認

`wrangler.jsonc` の `name` を必要に応じて変更してください。

```jsonc
{
  "name": "tomokichi-engineer-blog",
  "assets": {
    "directory": "./dist"
  }
}
```

### 3. 手動デプロイ

```bash
pnpm build
pnpm deploy
```

## GitHub Actionsでのデプロイ

GitHubリポジトリに以下を設定してください。

### Repository Variables

- `PUBLIC_SITE_URL`

例：

```text
https://example.com
```

### Repository Secrets

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

`main` ブランチへのpushでCloudflare Workersへデプロイされます。

PRでは以下だけ実行されます。

```bash
pnpm check
pnpm typecheck
pnpm build
```

## よく触るファイル

```text
src/site.config.ts              サイト名・説明・画像パス
src/i18n/ui.ts                  UI文言
src/content.config.ts           記事frontmatterスキーマ
src/content/articles/ja/*.md    日本語記事
src/content/articles/en/*.md    英語記事
src/styles/global.css           全体デザイン
wrangler.jsonc                  Cloudflare Workers設定
```

## 初期実装で入れていないもの

- React
- MDX
- 検索
- シンタックスハイライト
- 記事内画像
- 記事ごとのOGP画像生成
- DB
- API
- Auth
- CMS
