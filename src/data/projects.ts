import type { Locale } from "@/i18n/config";
import type { ProjectId } from "./project-ids";

export type ProjectStatus = "active" | "maintained" | "prototype" | "archived";
export type ProjectCategory = "app" | "blog" | "tool" | "website" | "experiment";

export interface Project {
  id: ProjectId;
  featured: boolean;
  status: ProjectStatus;
  category: ProjectCategory;
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  description: Record<Locale, string>; // overview
  background: Record<Locale, string>;
  challenges: {
    user: Record<Locale, string>;
    technical: Record<Locale, string>;
    operational: Record<Locale, string>;
  };
  features: Record<Locale, { title: string; description?: string }[]>;
  responsibilities: Record<Locale, string[]>;
  stack: string[]; // Summary for cards
  stackBreakdown: {
    frontend?: string[];
    backend?: string[];
    databaseAuth?: string[];
    infrastructure?: string[];
    tooling?: string[];
  };
  systemArchitecture: {
    description: Record<Locale, string>;
    diagram?: string;
  };
  technicalRefinement: Record<Locale, { title: string; content: string }[]>;
  uiUxDesign: Record<Locale, string[]>;
  performanceSeoAccessibility: Record<Locale, string[]>;
  securityPrivacy: Record<Locale, string[]>;
  difficulties: Record<Locale, { challenge: string; solution: string; result: string }[]>;
  learnings: Record<Locale, string[]>;
  futurePlans: Record<Locale, string[]>;
  links: {
    website?: string;
    github?: string;
    article?: string;
    related?: { title: string; url: string }[];
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
    tagline: {
      ja: "AIによる旅程提案とユーザーによる調整を組み合わせて、旅行前から旅行後までを支える旅行計画アプリです。",
      en: "An AI travel planner that combines automatic itinerary generation with user adjustments, supporting the entire journey from planning to post-trip reflection.",
    },
    highlights: {
      ja: [
        "旅行計画に特化したアプリ体験の設計",
        "AI生成案の手動編集・再調整を前提としたUX",
        "旅行前から旅行後までの一貫した体験設計",
      ],
      en: [
        "App experience optimized specifically for travel planning beyond general-purpose chat AI",
        "UX designed for seamless manual editing and re-adjustment of AI proposals",
        "Holistic journey design covering pre-trip, during-trip, and post-trip phases",
      ],
    },
    description: {
      ja: "Tabideaは、旅行先や日数、予算、同行者、旅行テーマなどの条件をもとに、AIが旅程案を提案する旅行計画アプリです。生成された旅程は完成品として押し付けるのではなく、ユーザーが手動で編集したり、チャット形式でAIに相談しながら一部を修正したりできるようにしています。",
      en: "Tabidea is a travel planning app where AI suggests itinerary drafts based on destination, duration, budget, companions, and themes. Rather than presenting a final plan, it allows users to manually edit or refine specific parts through a chat-based AI consultation.",
    },
    background: {
      ja: "旅行の本来の目的は現地での体験を楽しむことですが、実際には事前の調査や調整に多くの時間が割かれます。Tabideaでは、そうした面倒な調査や初期プラン作成をAIでアシストすることで、ユーザーが旅行前から楽しく計画し、実際の旅行体験に集中できる状態を目指しています。",
      en: "While travel is meant for enjoyment, much time is often consumed by research and coordination. Tabidea aims to assist with these tedious tasks through AI, allowing users to enjoy the planning process and focus on the actual travel experience.",
    },
    challenges: {
      user: {
        ja: "行きたい場所を探す、営業時間を確認する、移動時間を計算するなど、旅行計画における細かい作業の負担をAIで軽減し、ユーザーが「どこに行くか」「どう楽しむか」に集中できるようにすること。",
        en: "Reducing the burden of detailed tasks like finding spots, checking hours, and calculating travel times through AI, allowing users to focus on 'where to go' and 'how to enjoy'.",
      },
      technical: {
        ja: "スポットの実在性、営業時間、エリアの距離感など、旅程としての精度を担保しつつ、人間が手軽に修正できる構造化されたデータ形式で提示すること。",
        en: "Ensuring accuracy regarding spot existence, opening hours, and regional distance, while presenting information in a structured data format that humans can easily edit.",
      },
      operational: {
        ja: "生成結果を継続的にスコアリング・評価し、プロンプトやUIへ反映していく改善サイクルを構築すること。",
        en: "Establishing an improvement cycle where generation results are continuously scored and evaluated to refine prompts and UI.",
      },
    },
    features: {
      ja: [
        { title: "AIによる旅程提案", description: "旅行条件に応じたプラン生成" },
        { title: "チャット形式での一部修正", description: "AIに相談しながら一部を再生成" },
        { title: "旅行気分を高める待ち時間UX", description: "Tips表示や進捗状況の可視化" },
        { title: "生成品質の継続的改善", description: "管理画面での評価・スコアリング基盤" },
      ],
      en: [
        {
          title: "AI Itinerary Suggestions",
          description: "Generates plans based on travel preferences",
        },
        {
          title: "Chat-based Refinement",
          description: "Regenerate specific parts by consulting with AI",
        },
        {
          title: "Waiting UX to Build Excitement",
          description: "Displays tips and visualizes progress",
        },
        {
          title: "Continuous Quality Improvement",
          description: "Scoring and evaluation infrastructure in admin panel",
        },
      ],
    },
    responsibilities: {
      ja: [
        "企画・コンセプト設計",
        "UI/UX設計",
        "フロントエンド実装 (Next.js)",
        "AI旅程生成機能・処理基盤の設計 (Cloud Run)",
        "生成品質評価フローの設計と運用",
      ],
      en: [
        "Planning & Concept Design",
        "UI/UX Design",
        "Frontend Implementation (Next.js)",
        "AI Generation Logic & Infrastructure Design (Cloud Run)",
        "Design & Operation of Quality Evaluation Flow",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Gemini API",
      "OpenAI API",
      "Google Maps API",
      "Netlify",
      "Cloud Run",
      "Lighthouse CI",
    ],
    stackBreakdown: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Netlify Functions", "Cloud Run"],
      databaseAuth: ["Supabase Auth", "Supabase Database"],
      infrastructure: ["Netlify", "Cloud Run"],
      tooling: ["Lighthouse CI", "Gemini API", "OpenAI API", "Google Maps API"],
    },
    systemArchitecture: {
      description: {
        ja: "Next.jsで構築されたフロントエンドと、Cloud Run上の生成APIを分離。管理画面で生成結果をスコアリングし、評価・改善サイクルを回す仕組みを構築しています。",
        en: "Decoupled Next.js frontend from a generation API on Cloud Run. Built a system to score results in an admin panel to drive an evaluation and improvement cycle.",
      },
      diagram: `User
 ↓
Next.js App
 ↓
Generation API
 ↓
Gemini API / OpenAI API / Google Maps API
 ↓
Supabase
 ↓
Admin / Scoring / Quality Improvement`,
    },
    technicalRefinement: {
      ja: [
        {
          title: "汎用チャットAIで済ませない旅行計画体験",
          content:
            "AIの出力を単なる文章ではなく、手動編集や保存、再提案が可能な構造化された旅程データとして扱う体験を設計しました。",
        },
        {
          title: "生成品質を改善し続ける仕組み",
          content:
            "管理画面で生成結果をスコアリングし、悪い提案を確認・テストすることで、継続的にプロンプトやロジックを改善できるフローを構築しました。",
        },
        {
          title: "正確性を意識した提案ロジック",
          content:
            "Google Maps API等と連携し、スポットの実在性や営業時間、移動の妥当性を考慮した、実際に使いやすい旅程を目指しています。",
        },
      ],
      en: [
        {
          title: "Planning Experience Beyond General Chat AI",
          content:
            "Designed the experience to treat AI output not as mere text, but as structured itinerary data that can be manually edited, saved, and refined.",
        },
        {
          title: "Continuous Quality Improvement System",
          content:
            "Built a workflow to score results in the admin panel and test improvements, allowing continuous refinement of prompts and logic.",
        },
        {
          title: "Accuracy-Focused Suggestion Logic",
          content:
            "Integrates with APIs like Google Maps to consider spot existence, hours, and travel feasibility for practical itineraries.",
        },
      ],
    },
    uiUxDesign: {
      ja: [
        "生成待ち時間を旅行への期待感に変えるTips・進捗表示",
        "ユーザーが自分の旅行に合わせて調整できる「余白」のある設計",
        "モバイルでも扱いやすい旅程編集インターフェース",
      ],
      en: [
        "Tips and progress indicators to turn waiting time into excitement",
        "Designed with 'margin' for users to adjust plans to their liking",
        "Mobile-friendly itinerary editing interface",
      ],
    },
    performanceSeoAccessibility: {
      ja: [
        "Lighthouse CIによる品質チェックの自動化",
        "生成待ち時間中の体感速度を向上させるインタラクティブなUI",
        "セマンティックHTMLと適切なARIA属性によるアクセシビリティ対応",
      ],
      en: [
        "Automated quality checks using Lighthouse CI",
        "Interactive UI to improve perceived speed during generation wait times",
        "Accessibility compliance through semantic HTML and appropriate ARIA attributes",
      ],
    },
    securityPrivacy: {
      ja: [
        "ユーザーの旅程データをDBに平文で保存しない設計（運営者からも閲覧不可）",
        "機密情報を扱う実行環境の分離",
        "データの最小化とプライバシーバイデザインの徹底",
      ],
      en: [
        "Design that avoids storing itinerary data in plaintext (unreadable even by operators)",
        "Isolation of execution environments handling sensitive information",
        "Commitment to data minimization and Privacy by Design",
      ],
    },
    difficulties: {
      ja: [
        {
          challenge: "AI提案の正確性（スポット実在性や営業時間の整合性）の担保",
          solution: "AIの自由度を制御するプロンプト設計と、外部API連携による検証の強化",
          result: "実際に旅行で利用可能なレベルの正確な旅程提案の実現",
        },
        {
          challenge: "生成待ち時間によるユーザーの離脱",
          solution: "旅行気分を高めるTips表示や、詳細な進捗状況の可視化によるUX改善",
          result: "待ち時間を期待感に変え、離脱率の低い生成体験を構築",
        },
      ],
      en: [
        {
          challenge: "Ensuring accuracy of AI suggestions (spot existence and hours)",
          solution:
            "Refined prompt engineering to control AI behavior and enhanced validation with external APIs",
          result: "Accurate itinerary suggestions suitable for real-world travel",
        },
        {
          challenge: "User drop-off during generation wait times",
          solution: "UX improvements through travel tips and detailed progress visualization",
          result: "Transformed wait time into anticipation, maintaining high user retention",
        },
      ],
    },
    learnings: {
      ja: [
        "AIアプリではプロンプトだけでなく入力設計とUX設計が出力品質に大きく影響する",
        "AIの価値は生成すること自体だけでなく、その後のユーザーによる調整のしやすさにある",
        "継続的な評価・改善サイクルがAIプロダクトの成長には不可欠",
      ],
      en: [
        "In AI apps, input and UX design affect output quality as much as prompts do",
        "The value of AI lies not just in generation, but in how easily users can adjust the output",
        "A continuous evaluation and improvement cycle is vital for AI product growth",
      ],
    },
    futurePlans: {
      ja: [
        "旅程の正確性と信頼性のさらなる向上",
        "旅行中の状況変化に応じたリアルタイムな旅程調整機能",
        "旅行後の振り返りから次の旅のインスピレーションを得る体験の拡充",
      ],
      en: [
        "Further improving the accuracy and reliability of itineraries",
        "Real-time adjustment features based on changing conditions during travel",
        "Expanding the experience from post-trip reflection to next-trip inspiration",
      ],
    },
    links: {
      website: "https://tabide.ai",
      article: "/articles/tabidea-travel-tips-loading-ux/",
      related: [
        { title: "ともきちの旅行日記", url: "https://travel.tomokichi.me" },
        { title: "Globe Tabidea", url: "https://globe.tabide.ai" },
      ],
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
    tagline: {
      ja: "実運用中の旅行ブログ。SEOとパフォーマンス改善を継続的に実践しています。",
      en: "An active travel blog where SEO and performance improvements are practiced continuously.",
    },
    highlights: {
      ja: ["継続的なSEO施策", "表示速度の高速化"],
      en: ["Continuous SEO implementation", "Page speed optimization"],
    },
    description: {
      ja: "実際に運用している旅行ブログです。コンテンツを継続的に更新しながら、SEO施策・ページ表示速度の改善・サイト構造の最適化に取り組んでいます。実プロダクトを通じた知見の積み重ねを目的としています。",
      en: "An actively maintained travel blog. Continuous content updates alongside ongoing SEO work, page speed improvements, and site structure optimization — learning through a real production environment.",
    },
    background: {
      ja: "定期的にLighthouseスコアを計測し、課題を特定してから対処する改善サイクルを確立。コンテンツの構造とメタデータの最適化も継続的に実施しています。",
      en: "Established a regular improvement cycle: measure Lighthouse scores, identify issues, then address them. Content structure and metadata optimization are also ongoing.",
    },
    challenges: {
      user: {
        ja: "記事数が増えるにつれ、ページ速度の低下やSEO上の課題が表面化しやすくなります。技術的な改善を継続しながらコンテンツ運営を両立する必要があります。",
        en: "As article count grows, page speed degradation and SEO issues become more visible. The challenge is sustaining technical improvement while also maintaining content operations.",
      },
      technical: { ja: "", en: "" },
      operational: { ja: "", en: "" },
    },
    features: { ja: [], en: [] },
    responsibilities: {
      ja: ["企画", "デザイン", "実装", "運用"],
      en: ["Planning", "Design", "Implementation", "Operation"],
    },
    stack: ["SEO", "Performance optimization", "Content operations"],
    stackBreakdown: {},
    systemArchitecture: {
      description: { ja: "", en: "" },
    },
    technicalRefinement: {
      ja: [
        { title: "定期的なパフォーマンス計測と改善サイクルの確立", content: "" },
        { title: "コンテンツSEOの継続的な最適化", content: "" },
      ],
      en: [
        {
          title: "Establishing a regular performance measurement and improvement cycle",
          content: "",
        },
        { title: "Continuous content SEO optimization", content: "" },
      ],
    },
    uiUxDesign: { ja: [], en: [] },
    performanceSeoAccessibility: { ja: [], en: [] },
    securityPrivacy: { ja: [], en: [] },
    difficulties: { ja: [], en: [] },
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
    futurePlans: { ja: [], en: [] },
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
    tagline: {
      ja: "Astroで構築した、技術ブログ兼ポートフォリオサイトです。",
      en: "A tech blog and portfolio site built with Astro.",
    },
    highlights: {
      ja: [
        "Next.jsからAstroへの移行による静的・軽量な構成",
        "Lighthouse CIとJSバジェットによる継続的な品質監視",
        "技術判断や改善プロセスが継続的に残る統合プラットフォーム",
      ],
      en: [
        "Strategic migration from Next.js to Astro for a lightweight, static architecture",
        "Continuous quality monitoring using Lighthouse CI and JS Budgets",
        "Unified platform preserving technical decisions and continuous improvement processes",
      ],
    },
    description: {
      ja: "「ともきちのエンジニア成長記」は、学習内容、開発メモ、技術選定、個人開発の過程を記録するための技術ブログ兼ポートフォリオサイトです。記事を読む体験を最優先にし、初回表示に不要なJavaScriptをできるだけ減らし、記事本文を静的HTMLとして配信する構成にしています。",
      en: "'Tomokichi's Engineering Growth Log' is a tech blog and portfolio site for recording learning, development memos, tech decisions, and indie dev processes. It prioritizes the reading experience, minimizing unnecessary JavaScript on initial load and delivering articles as static HTML.",
    },
    background: {
      ja: "もともとはNext.jsで運用していましたが、記事を読むだけのページに対してWebアプリ的な機能は過剰だと感じ、静的生成を中心にした軽量な構成へ移行しました。また、AIで簡単にサイトが作れる時代だからこそ、単なる成果物ではなく、自分の技術判断や改善の過程が継続的に残る場所としてポートフォリオと統合しました。",
      en: "Originally run on Next.js, I felt web-app features were overkill for a reading-focused blog and migrated to a lightweight, statically generated architecture. In an era where AI can easily build flashy sites, I integrated my blog and portfolio to create a space that continuously showcases my technical decisions and improvement processes, not just the final products.",
    },
    challenges: {
      user: {
        ja: "自分の技術的な成長過程を知りたい採用担当者や、個人開発プロジェクトの設計意図を知りたいエンジニアに向け、学習・実装・改善のプロセスを一つの場所に集約すること。",
        en: "Providing a unified platform for recruiters and engineers to trace technical growth, understand the design intent behind personal projects, and explore Astro and web performance implementations.",
      },
      technical: {
        ja: "記事本文を読むためのページにおいて、ブラウザがJavaScriptの実行を待たなくても本文を読める静的なHTML構成を実現すること。",
        en: "Realizing a static HTML architecture where browsers can render article text without waiting for JavaScript execution, contrary to typical heavy SPA setups.",
      },
      operational: {
        ja: "記事や機能が増えてもパフォーマンスや保守性を保てるように、ビルド、lint、Lighthouse CI、JavaScriptバジェットを組み合わせた継続的な品質確認の仕組みを作ること。",
        en: "Establishing continuous quality checks (lint, format, typecheck, build, Lighthouse CI, JS budget) to maintain performance and maintainability as content and features grow.",
      },
    },
    features: {
      ja: [
        { title: "技術記事の投稿", description: "Markdownによる記事管理" },
        { title: "多言語対応", description: "日本語・英語のコンテンツ提供" },
        { title: "作品一覧 / 詳細", description: "開発プロジェクトの詳細な背景や技術選定を掲載" },
        { title: "View Transitions", description: "シームレスで自然なページ遷移" },
      ],
      en: [
        { title: "Technical Article Publishing", description: "Markdown-based content management" },
        { title: "Bilingual Support", description: "Content available in Japanese and English" },
        {
          title: "Works Directory / Details",
          description: "Detailed background and tech stack for personal projects",
        },
        { title: "View Transitions", description: "Seamless and natural page navigations" },
      ],
    },
    responsibilities: {
      ja: [
        "Next.jsからAstro構成への移行判断",
        "サイトコンセプト・情報設計",
        "UI/UX設計・スタイリング (Tailwind CSS v4)",
        "Astroによるフロントエンド実装",
        "Cloudflare Workersへのデプロイ構成",
        "Lighthouse CI / JSバジェットの導入と運用",
      ],
      en: [
        "Next.js to Astro Migration Strategy",
        "Site Concept & Information Design",
        "UI/UX Design & Styling (Tailwind CSS v4)",
        "Frontend Implementation (Astro)",
        "Cloudflare Workers Deployment Setup",
        "Lighthouse CI & JS Budget Integration",
      ],
    },
    stack: [
      "Astro",
      "Tailwind CSS v4",
      "TypeScript",
      "Cloudflare Workers",
      "Biome",
      "Lighthouse CI",
    ],
    stackBreakdown: {
      frontend: ["Astro v6", "Tailwind CSS v4", "TypeScript"],
      infrastructure: ["Cloudflare Workers Static Assets", "GitHub Actions"],
      tooling: ["Biome", "Lighthouse CI", "pnpm"],
    },
    systemArchitecture: {
      description: {
        ja: "Astroで静的HTMLを生成し、Cloudflare Workers Static Assetsで配信する構成。CIでビルド・型チェック・lint・Lighthouse CI・JSバジェットを実行し品質を担保しています。",
        en: "Generates static HTML with Astro and serves it via Cloudflare Workers Static Assets. CI pipelines ensure quality by running builds, type checks, linting, Lighthouse CI, and JS budget checks.",
      },
      diagram: `Code / Content
 ↓
lint / format / typecheck
 ↓
build (Astro Build -> Static HTML / CSS / JS)
 ↓
JavaScript Budget Check
 ↓
Lighthouse CI
 ↓
Deploy (Cloudflare Workers Static Assets)`,
    },
    technicalRefinement: {
      ja: [
        {
          title: "Next.jsからAstroへ移行した判断",
          content:
            "記事ページの主な目的は文章を読むことであり、クライアント側JSや複雑な状態管理を必要としない静的構成の方がブログに合っていると判断しました。",
        },
        {
          title: "静的HTMLとして本文を届ける設計",
          content:
            "クライアント側でfetchやパースを行わず、ビルド時にHTML化することで、JSのダウンロード・実行を待たずに本文を表示できるようにしました。",
        },
        {
          title: "JavaScriptを初回表示に関与させすぎない設計",
          content:
            "テーマ切り替えなどの機能を追加する際も、「HTMLとCSSだけで実現できないか」「後から削除しやすいか」を慎重に評価しています。",
        },
        {
          title: "Cloudflare Workers Static Assetsへのデプロイ",
          content:
            "動的なサーバー処理やDBアクセスを廃止し、静的アセットとして配信することで、速度・安定性・保守性のバランスを取りました。",
        },
        {
          title: "Lighthouse CIとJavaScriptバジェットによる継続計測",
          content:
            "機能追加による肥大化を防ぐため、JS gzip合計50KBのバジェットを設定し、Lighthouse CIで複数ページを継続監視しています。",
        },
        {
          title: "技術ブログとポートフォリオの統合",
          content:
            "単発の作品紹介ではなく、記事や改善ログを同じ場所に蓄積し、継続的な開発の過程として自分のスキルを見せられる構成にしました。",
        },
      ],
      en: [
        {
          title: "Migrating from Next.js to Astro",
          content:
            "Determined that SSR and client-side state management were unnecessary for a reading-focused blog, choosing a static HTML approach for optimal performance.",
        },
        {
          title: "Delivering Text as Static HTML",
          content:
            "Markdown is converted to HTML at build time, eliminating client-side parsing and rendering to prioritize immediate content visibility.",
        },
        {
          title: "Minimizing Initial JS Payload",
          content:
            "Strictly evaluating the necessity of JS features against their impact on parsing, compilation, and main thread blocking.",
        },
        {
          title: "Deploying to Cloudflare Workers Static Assets",
          content:
            "Serving pre-built static files without dynamic server processing or DB access, balancing speed, stability, and low maintenance.",
        },
        {
          title: "Continuous Monitoring with Lighthouse CI & JS Budget",
          content:
            "Setting a 50KB total JS gzip budget and automating Lighthouse checks across multiple page types to prevent feature bloat.",
        },
        {
          title: "Integrating Tech Blog and Portfolio",
          content:
            "Combining articles, projects, and improvement logs in one place to demonstrate continuous development processes rather than one-off products.",
        },
      ],
    },
    uiUxDesign: {
      ja: [
        "装飾を増やしすぎず、本文の読みやすさとスクロールの軽さを優先した1カラム設計",
        "View Transitionsによる、静的サイトでありながら気持ちよく移動できる遷移体感",
        "コードブロック、見出し、関連記事への迷いのない導線設計",
      ],
      en: [
        "Single-column design prioritizing text readability and smooth scrolling over excessive decoration",
        "App-like, pleasant page navigations using View Transitions within a static site",
        "Clear navigation flows to code blocks, headings, and related articles",
      ],
    },
    performanceSeoAccessibility: {
      ja: [
        "FCP 0.5〜1.0s、TBT 0〜50msなどの厳格なパフォーマンス目標の設定",
        "実行環境ブレを考慮した、理想値とは別の現実的なCIしきい値の設定",
        "適切なメタデータ（canonical, hreflang等）の整備とセマンティックHTMLの徹底",
      ],
      en: [
        "Setting strict performance targets (e.g., FCP 0.5-1.0s, TBT 0-50ms)",
        "Configuring realistic CI thresholds separate from ideal targets to account for runner variance",
        "Comprehensive metadata (canonical, hreflang) and strict semantic HTML enforcement",
      ],
    },
    securityPrivacy: {
      ja: [
        "サーバー側の動的処理やDBアクセスを持たない静的配信による攻撃面の最小化",
        "依存関係（ライブラリ）を増やしすぎず、更新対応やセキュリティリスクを抑える運用方針",
      ],
      en: [
        "Minimized attack surface by avoiding server-side dynamic processing and database access",
        "Strict dependency management to mitigate security risks and complex build configurations",
      ],
    },
    difficulties: {
      ja: [
        {
          challenge: "Next.jsからAstroへの移行判断",
          solution: "ブログに本当に必要な機能を整理し、不要な機能を削ぎ落とす決断をした",
          result: "サイト構成がシンプルになり、記事本文を素早く届けることに集中できた",
        },
        {
          challenge: "速さと体験のバランス",
          solution:
            "「初回表示に本当に必要か」を基準に、検索やアニメーションなどの導入を慎重に判断",
          result: "JSの肥大化を防ぎつつ、必要なインタラクティブ性を維持",
        },
        {
          challenge: "Lighthouseの数字だけに最適化してしまうリスク",
          solution: "スコアだけでなく、実際の表示、スクロール、遷移体感も合わせて確認",
          result: "数値上の速さだけでなく、実際の読書体験も優れたサイトを実現",
        },
      ],
      en: [
        {
          challenge: "Next.js to Astro Migration Decision",
          solution:
            "Audited truly necessary blog features and made the hard choice to strip away excess capabilities",
          result:
            "Simplified architecture, allowing hyper-focus on delivering article content quickly",
        },
        {
          challenge: "Balancing Speed and UX",
          solution:
            "Carefully evaluated features like search and animations based on whether they are truly needed for initial render",
          result: "Prevented JS bloat while maintaining necessary interactivity",
        },
        {
          challenge: "Risk of over-optimizing for Lighthouse scores",
          solution:
            "Monitored real-world UX (smooth scrolling, actual transition feel) alongside raw metrics",
          result:
            "Achieved a site that is not only fast on paper but offers a genuinely superior reading experience",
        },
      ],
    },
    learnings: {
      ja: [
        "技術選定は「流行っているか」ではなく「用途に合っているか」で考えることが重要",
        "パフォーマンス改善は一度で終わるものではなく、JSバジェットなどの継続的な監視の仕組みが不可欠",
      ],
      en: [
        "Tech selection should be driven by the actual use case, not just industry trends",
        "Performance optimization is not a one-time task; continuous monitoring mechanisms like JS budgets are essential",
      ],
    },
    futurePlans: {
      ja: [
        "記事一覧ページの表示・遷移体感の改善",
        "Worksページの情報量と見せ方の改善",
        "多言語記事の拡充とShikiによるコード表示体験の改善",
      ],
      en: [
        "Improving article list display and navigation feel",
        "Refining the layout and information density of the Works page",
        "Expanding bilingual articles and enhancing code display with Shiki",
      ],
    },
    links: {
      website: "https://engineer-blog.tomoki-ttttt.workers.dev",
      article: "/articles/about-this-blog/",
      related: [
        {
          title: "爆速な技術ブログを作るために意識していること",
          url: "/articles/tech-blog-performance-notes/",
        },
        { title: "About", url: "/about/" },
      ],
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
    tagline: {
      ja: "開発者がよく使うサービスのステータスページをまとめたリンク集",
      en: "A curated collection of status page links for commonly used developer services",
    },
    highlights: {
      ja: ["主要開発サービスのステータスを一括確認"],
      en: ["Quick access to status pages of major developer services"],
    },
    description: {
      ja: "GitHub、Vercel、Cloudflareなど、開発者が頻繁に利用するサービスのステータスページへのリンクをまとめたユーティリティツールです。障害発生時にすばやく状況を確認することを目的としています。",
      en: "A utility tool collecting status page links for commonly used developer services such as GitHub, Vercel, and Cloudflare — designed for quick incident diagnosis.",
    },
    background: {
      ja: "よく使うサービスのステータスページURLを一箇所にまとめ、シンプルな一覧として提供。余分な機能は持たせず、目的に集中したツールを目指しました。",
      en: "Compiled status page URLs for common services into a simple, focused list — no extra features, just fast access to the information you need.",
    },
    challenges: {
      user: {
        ja: "サービス障害が起きたとき、各サービスのステータスページURLを覚えていないと確認に手間がかかります。",
        en: "During service incidents, finding the right status page URL quickly can save valuable debugging time.",
      },
      technical: { ja: "", en: "" },
      operational: { ja: "", en: "" },
    },
    features: { ja: [], en: [] },
    responsibilities: {
      ja: ["企画", "デザイン", "実装"],
      en: ["Planning", "Design", "Implementation"],
    },
    stack: ["TypeScript"],
    stackBreakdown: {},
    systemArchitecture: {
      description: { ja: "", en: "" },
    },
    technicalRefinement: {
      ja: [{ title: "シンプルさを優先し、不必要な機能を持たせない設計", content: "" }],
      en: [{ title: "Prioritized simplicity — no unnecessary features", content: "" }],
    },
    uiUxDesign: { ja: [], en: [] },
    performanceSeoAccessibility: { ja: [], en: [] },
    securityPrivacy: { ja: [], en: [] },
    difficulties: { ja: [], en: [] },
    learnings: {
      ja: ["シンプルなユーティリティでも、情報の整理と使いやすさの設計は重要"],
      en: ["Even simple utility tools benefit from careful information organization and usability"],
    },
    futurePlans: { ja: [], en: [] },
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
    tagline: {
      ja: "GitHubのリポジトリや活動を独自の視点で可視化するコンセプトツール",
      en: "A concept tool for visualizing GitHub repositories and activity in a unique way",
    },
    highlights: {
      ja: ["GitHub活動のユニークな可視化"],
      en: ["Unique visualization of GitHub activity"],
    },
    description: {
      ja: "GitHubのリポジトリや開発活動を独自の切り口で可視化するコンセプトプロジェクトです。最小限のデータ収集とプライバシーへの配慮を設計の軸に置き、Cloudflare Workersを活用した軽量な構成を探っています。",
      en: "A concept project for visualizing GitHub repositories and development activity from a unique angle. Built with minimal data collection and privacy in mind, exploring a lightweight architecture using Cloudflare Workers.",
    },
    background: {
      ja: "必要最小限のデータだけを扱い、Cloudflare Workersのエッジ処理を活かした軽量な実装を探求しています。現在はコンセプト段階です。",
      en: "Exploring lightweight implementation using Cloudflare Workers for edge processing, with strictly minimal data. Currently at concept stage.",
    },
    challenges: {
      user: {
        ja: "GitHubの活動履歴を振り返ったり個性的な形で共有したりする手段が限られています。",
        en: "There are limited ways to reflect on GitHub activity history or share it in a personal, distinctive format.",
      },
      technical: { ja: "", en: "" },
      operational: { ja: "", en: "" },
    },
    features: { ja: [], en: [] },
    responsibilities: {
      ja: ["企画", "デザイン", "実装"],
      en: ["Planning", "Design", "Implementation"],
    },
    stack: ["Cloudflare Workers", "TypeScript", "GitHub API"],
    stackBreakdown: {
      backend: ["Cloudflare Workers"],
      tooling: ["GitHub API"],
    },
    systemArchitecture: {
      description: { ja: "", en: "" },
    },
    technicalRefinement: {
      ja: [
        { title: "Cloudflare Workersによるエッジ処理の活用を検討中", content: "" },
        { title: "プライバシー優先・最小データ設計", content: "" },
      ],
      en: [
        { title: "Exploring Cloudflare Workers for edge processing", content: "" },
        { title: "Privacy-first, minimal data design", content: "" },
      ],
    },
    uiUxDesign: { ja: [], en: [] },
    performanceSeoAccessibility: { ja: [], en: [] },
    securityPrivacy: { ja: [], en: [] },
    difficulties: { ja: [], en: [] },
    learnings: {
      ja: ["コンセプト探索段階での設計方針がプロジェクト全体の方向性を左右する"],
      en: ["Early design decisions in concept exploration shape the entire project direction"],
    },
    futurePlans: { ja: [], en: [] },
    links: {},
  },
];
