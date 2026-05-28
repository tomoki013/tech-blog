import type { Locale } from "@/i18n/config";
import type { ProjectId } from "./project-ids";

export type ProjectStatus = "active" | "maintained" | "prototype" | "archived";
export type ProjectCategory = "app" | "blog" | "tool" | "website";

export interface Project {
  id: ProjectId;
  featured: boolean;
  status: ProjectStatus;
  category: ProjectCategory;
  title: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  description: Record<Locale, string>;
  problem: Record<Locale, string>;
  approach: Record<Locale, string>;
  technicalDecisions: Record<Locale, string[]>;
  learnings: Record<Locale, string[]>;
  stack: string[];
  links: {
    website?: string;
    github?: string;
    article?: string;
  };
}

export const projects: Project[] = [
  {
    id: "tabidea",
    featured: true,
    status: "active",
    category: "app",
    title: {
      ja: "Tabidea",
      en: "Tabidea",
    },
    shortDescription: {
      ja: "AIが旅程を自動生成する旅行計画アプリ",
      en: "AI-powered travel itinerary planner",
    },
    description: {
      ja: "旅先と条件を入力するとAIが旅程を自動生成する旅行計画アプリ。Next.js、Supabase、Cloud Runを採用し、AI支援によるプロダクト開発を追求しています。",
      en: "A travel planning app that uses AI to automatically generate itineraries from destination and preference input. Built with Next.js, Supabase, and Cloud Run, exploring AI-assisted product development.",
    },
    problem: {
      ja: "旅行計画は調査・移動計算・スケジュール調整など、多くの時間と判断を必要とします。計画の初期段階で迷うコストを下げたいと考えました。",
      en: "Planning a trip requires hours of research, estimating travel times, and balancing schedules. The goal was to reduce the cognitive cost of the early planning stage.",
    },
    approach: {
      ja: "AIで旅程の下書きをすばやく生成し、ユーザーが手を加えながら完成させるUXを設計。Supabaseで認証とデータ管理を行い、Cloud Runで生成処理をスケールさせています。",
      en: "Designed a UX where AI rapidly generates an itinerary draft that users can then edit and refine. Supabase handles authentication and data, while Cloud Run scales the generation workload.",
    },
    technicalDecisions: {
      ja: [
        "Next.js App Routerでサーバーレンダリングとクライアント操作を両立",
        "Supabaseで認証・データ永続化を一元管理",
        "Cloud Runで生成処理をサーバーレスにスケール",
      ],
      en: [
        "Next.js App Router for combining server rendering with client interactivity",
        "Supabase for unified authentication and data persistence",
        "Cloud Run for serverless scaling of AI generation workloads",
      ],
    },
    learnings: {
      ja: [
        "AIの出力品質はプロンプト設計に大きく依存する",
        "生成結果を編集しやすいUIの設計がUX全体の品質を左右する",
        "Next.js + Supabaseの組み合わせは初期開発速度が高い",
      ],
      en: [
        "AI output quality depends heavily on prompt design",
        "Editable, well-structured UI for generated content is critical to overall UX quality",
        "The Next.js + Supabase combination offers high initial development speed",
      ],
    },
    stack: ["Next.js", "Supabase", "Cloud Run", "TypeScript"],
    links: {
      article: "/articles/tabidea-travel-tips-loading-ux/",
    },
  },
  {
    id: "travel-diary",
    featured: true,
    status: "maintained",
    category: "blog",
    title: {
      ja: "ともきちの旅行日記",
      en: "Tomokichi's Travel Diary",
    },
    shortDescription: {
      ja: "実運用中の旅行ブログ。SEOとパフォーマンス改善を継続的に実践しています。",
      en: "An active travel blog where SEO and performance improvements are practiced continuously.",
    },
    description: {
      ja: "実際に運用している旅行ブログです。コンテンツを継続的に更新しながら、SEO施策・ページ表示速度の改善・サイト構造の最適化に取り組んでいます。実プロダクトを通じた知見の積み重ねを目的としています。",
      en: "An actively maintained travel blog. Continuous content updates alongside ongoing SEO work, page speed improvements, and site structure optimization — learning through a real production environment.",
    },
    problem: {
      ja: "記事数が増えるにつれ、ページ速度の低下やSEO上の課題が表面化しやすくなります。技術的な改善を継続しながらコンテンツ運営を両立する必要があります。",
      en: "As article count grows, page speed degradation and SEO issues become more visible. The challenge is sustaining technical improvement while also maintaining content operations.",
    },
    approach: {
      ja: "定期的にLighthouseスコアを計測し、課題を特定してから対処する改善サイクルを確立。コンテンツの構造とメタデータの最適化も継続的に実施しています。",
      en: "Established a regular improvement cycle: measure Lighthouse scores, identify issues, then address them. Content structure and metadata optimization are also ongoing.",
    },
    technicalDecisions: {
      ja: ["定期的なパフォーマンス計測と改善サイクルの確立", "コンテンツSEOの継続的な最適化"],
      en: [
        "Establishing a regular performance measurement and improvement cycle",
        "Continuous content SEO optimization",
      ],
    },
    learnings: {
      ja: [
        "実運用サイトでのSEO施策は計測と検証のサイクルが重要",
        "パフォーマンス改善は一度では終わらない継続的な取り組み",
        "コンテンツ品質と技術品質は両輪で改善する必要がある",
      ],
      en: [
        "SEO strategies on live sites require a measurement and validation cycle",
        "Performance improvement is ongoing, not a one-time effort",
        "Content quality and technical quality must improve together",
      ],
    },
    stack: ["SEO", "Performance optimization", "Content operations"],
    links: {},
  },
  {
    id: "tech-blog",
    featured: true,
    status: "active",
    category: "blog",
    title: {
      ja: "ともきちのエンジニア成長記",
      en: "Tomokichi's Engineering Growth Log",
    },
    shortDescription: {
      ja: "このサイト自体。Astroで構築した静的ブログ兼ポートフォリオサイトです。",
      en: "This site itself — a static blog and portfolio built with Astro.",
    },
    description: {
      ja: "Astro v6で構築した個人エンジニアブログ兼ポートフォリオサイトです。以前はNext.jsで運用していましたが、パフォーマンスとシンプルさを優先してAstroに移行しました。静的サイト生成、Tailwind CSS v4、TypeScript、Cloudflare Workersで軽量なアーキテクチャを実現しています。",
      en: "A personal engineering blog and portfolio built with Astro v6. Previously on Next.js, redesigned with performance and simplicity as the primary goals. Static site generation, Tailwind CSS v4, TypeScript, and Cloudflare Workers form a lightweight, fast architecture.",
    },
    problem: {
      ja: "以前のNext.js構成はブログ用途には過剰な機能と複雑さを持っていました。ページ速度とメンテナンス性の向上が必要でした。",
      en: "The previous Next.js setup had unnecessary complexity and overhead for a blog. Page load speed and long-term maintainability needed improvement.",
    },
    approach: {
      ja: "Astroの静的サイト生成でクライアントサイドJavaScriptを最小化。Lighthouse CIとJavaScriptバジェットで継続的にパフォーマンスを計測・監視する仕組みを構築しました。",
      en: "Used Astro's static generation to minimize client-side JavaScript. Set up Lighthouse CI and a JavaScript budget script for continuous, automated performance monitoring.",
    },
    technicalDecisions: {
      ja: [
        "Astro v6で完全静的生成。サーバーサイドレンダリングなし",
        "Tailwind CSS v4でCSS変数ベースのデザイントークンを整備",
        "Biomeによるコード品質の統一（lint + format）",
        "Cloudflare Workers Static Assetsへの静的デプロイ",
        "Lighthouse CIとJavaScriptバジェットによる継続的なパフォーマンス監視",
      ],
      en: [
        "Astro v6 for fully static generation — no server-side rendering overhead",
        "Tailwind CSS v4 with CSS variable-based design tokens",
        "Biome for unified code quality (lint + format)",
        "Static deployment to Cloudflare Workers Static Assets",
        "Lighthouse CI and JavaScript budget for continuous performance monitoring",
      ],
    },
    learnings: {
      ja: [
        "静的サイト生成はブログ用途において十分な機能を提供しつつ、パフォーマンスを大幅に改善する",
        "アクセシビリティとSEOは設計段階から組み込む方が後付けより効果的",
        "Lighthouse CIによる継続的な計測が改善の動機と指針になる",
      ],
      en: [
        "Static site generation is more than sufficient for a blog while dramatically improving performance",
        "Accessibility and SEO built in from the design phase are more effective than retrofits",
        "Continuous Lighthouse CI measurement motivates and guides improvement",
      ],
    },
    stack: ["Astro", "Tailwind CSS v4", "TypeScript", "Cloudflare Workers", "Biome"],
    links: {
      article: "/articles/about-this-blog/",
    },
  },
  {
    id: "developer-status-links",
    featured: false,
    status: "prototype",
    category: "tool",
    title: {
      ja: "Developer Status Links",
      en: "Developer Status Links",
    },
    shortDescription: {
      ja: "開発者がよく使うサービスのステータスページをまとめたリンク集",
      en: "A curated collection of status page links for commonly used developer services",
    },
    description: {
      ja: "GitHub、Vercel、Cloudflareなど、開発者が頻繁に利用するサービスのステータスページへのリンクをまとめたユーティリティツールです。障害発生時にすばやく状況を確認することを目的としています。",
      en: "A utility tool collecting status page links for commonly used developer services such as GitHub, Vercel, and Cloudflare — designed for quick incident diagnosis.",
    },
    problem: {
      ja: "サービス障害が起きたとき、各サービスのステータスページURLを覚えていないと確認に手間がかかります。",
      en: "During service incidents, finding the right status page URL quickly can save valuable debugging time.",
    },
    approach: {
      ja: "よく使うサービスのステータスページURLを一箇所にまとめ、シンプルな一覧として提供。余分な機能は持たせず、目的に集中したツールを目指しました。",
      en: "Compiled status page URLs for common services into a simple, focused list — no extra features, just fast access to the information you need.",
    },
    technicalDecisions: {
      ja: ["シンプルさを優先し、不必要な機能を持たせない設計"],
      en: ["Prioritized simplicity — no unnecessary features"],
    },
    learnings: {
      ja: ["シンプルなユーティリティでも、情報の整理と使いやすさの設計は重要"],
      en: ["Even simple utility tools benefit from careful information organization and usability"],
    },
    stack: ["TypeScript"],
    links: {},
  },
  {
    id: "github-kurorekishi",
    featured: false,
    status: "prototype",
    category: "tool",
    title: {
      ja: "GitHub 黒歴史",
      en: "GitHub Kurorekishi",
    },
    shortDescription: {
      ja: "GitHubのリポジトリや活動を独自の視点で可視化するコンセプトツール",
      en: "A concept tool for visualizing GitHub repositories and activity in a unique way",
    },
    description: {
      ja: "GitHubのリポジトリや開発活動を独自の切り口で可視化するコンセプトプロジェクトです。最小限のデータ収集とプライバシーへの配慮を設計の軸に置き、Cloudflare Workersを活用した軽量な構成を探っています。",
      en: "A concept project for visualizing GitHub repositories and development activity from a unique angle. Built with minimal data collection and privacy in mind, exploring a lightweight architecture using Cloudflare Workers.",
    },
    problem: {
      ja: "GitHubの活動履歴を振り返ったり個性的な形で共有したりする手段が限られています。",
      en: "There are limited ways to reflect on GitHub activity history or share it in a personal, distinctive format.",
    },
    approach: {
      ja: "必要最小限のデータだけを扱い、Cloudflare Workersのエッジ処理を活かした軽量な実装を探求しています。現在はコンセプト段階です。",
      en: "Exploring lightweight implementation using Cloudflare Workers for edge processing, with strictly minimal data. Currently at concept stage.",
    },
    technicalDecisions: {
      ja: ["Cloudflare Workersによるエッジ処理の活用を検討中", "プライバシー優先・最小データ設計"],
      en: [
        "Exploring Cloudflare Workers for edge processing",
        "Privacy-first, minimal data design",
      ],
    },
    learnings: {
      ja: ["コンセプト探索段階での設計方針がプロジェクト全体の方向性を左右する"],
      en: ["Early design decisions in concept exploration shape the entire project direction"],
    },
    stack: ["Cloudflare Workers", "TypeScript", "GitHub API"],
    links: {},
  },
];
