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
        { title: "ともきちの旅行日記", url: "https://tomokichidiary.com" },
        { title: "Globe Tabidea", url: "https://globe.tabide.ai" },
      ],
    },
  },
  {
    id: "nobo-page",
    featured: true,
    status: "active",
    category: "app",
    title: {
      ja: "Nobo Page",
      en: "Nobo Page",
    },
    tagline: {
      ja: "ログインなしで作れて、一定期間で自動的に消える一時的な共有ページ作成アプリ。手軽さとセキュリティ設計の両立を追求しています。",
      en: "A login-free app for temporary shareable pages that automatically vanish after a set period — built to balance effortless use with security.",
    },
    highlights: {
      ja: [
        "アカウント登録なしで即座にページを作成・共有できる",
        "保存期間（1時間〜7日）を選べる自動削除と、任意のパスフレーズ保護",
        "検索エンジンに載せず、リンクを知る人だけがアクセスできる設計",
      ],
      en: [
        "Create and share pages instantly with no account registration",
        "Configurable auto-deletion (1 hour to 7 days) and optional passphrase protection",
        "Not indexed by search engines — accessible only to those who know the link",
      ],
    },
    description: {
      ja: "Nobo Pageは、ログインなしで一時的な共有ページ（ボード）を作成できるアプリです。作成したページはURLやQRコードで共有でき、1時間〜7日の範囲で選んだ保存期間を過ぎると自動的に削除されます。必要に応じてパスフレーズで保護でき、検索エンジンには載りません。イベント当日の案内、短期間だけ使う共有メモ、QRコードから開く情報ページなど、長く使い続けることを前提としない用途を想定しています。手軽さを保ちながら、ログインが担っていた本人確認や権限管理をどう置き換えるかを設計の中心テーマにしています。",
      en: "Nobo Page is an app for creating temporary shareable pages (boards) without logging in. Pages can be shared via URL or QR code, and once the retention period you choose (from 1 hour to 7 days) elapses they are deleted automatically. They can be optionally protected with a passphrase and are never indexed by search engines. It targets uses not meant to last long — same-day event guides, short-lived shared memos, or information pages opened via QR code. The central design theme is how to replace the identity verification and permission management that login usually provides, while keeping the experience effortless.",
    },
    background: {
      ja: "ログインなしのアプリは利用開始までの負担が小さい一方、「認証がない」わけではなく、セッションやトークン、共有URLなど別の仕組みで権限を判断する必要があります。手軽さだけを優先すると、共有リンクの漏洩や権限の過剰付与といったリスクが見えにくくなります。Nobo Pageでは、ログインをなくす代わりに必要になる仕組みを曖昧にしないことを設計の出発点にしています。",
      en: "Login-free apps lower the barrier to getting started, but that does not mean there is no authentication — permissions must still be judged through other mechanisms such as sessions, tokens, and shared URLs. Prioritizing only convenience makes risks like leaked share links or over-broad permissions harder to see. Nobo Page starts from the principle of not leaving the mechanisms that replace login ambiguous.",
    },
    challenges: {
      user: {
        ja: "アカウントを作るほどではないが、すぐに作って人に渡したい情報を、登録の手間なく共有できるようにすること。同時に、機密情報の保存には向かないことを利用者へ正直に伝えること。",
        en: "Letting people share information that isn't worth creating an account for, instantly and without registration — while honestly communicating that it isn't suited for storing sensitive data.",
      },
      technical: {
        ja: "アカウントに頼らずに「この操作を許可してよいか」を判断する仕組みを設計すること。共有する場合は閲覧・編集・管理の権限を分け、トークンを安全に扱う必要があります。",
        en: "Designing a mechanism to decide 'should this operation be allowed?' without relying on accounts. When sharing, view/edit/admin rights must be separated and tokens handled safely.",
      },
      operational: {
        ja: "ログインがないため、管理リンクを紛失した利用者の本人確認ができません。復元を前提にしない運用と、保存期間の限定によって責任範囲を小さく保つこと。",
        en: "Without login, there is no way to verify a user who lost their admin link. Keeping responsibility small through operation that doesn't assume recovery and through limited retention.",
      },
    },
    features: {
      ja: [
        { title: "ログインなしのページ作成", description: "登録不要で即座に共有ページを作成" },
        { title: "URL・QRコードでの共有", description: "リンクやQRコードからすぐにアクセス" },
        { title: "保存期間を選べる自動削除", description: "1時間〜7日で期限切れ後に自動削除" },
        { title: "パスフレーズ保護", description: "必要に応じてアクセスを制限" },
      ],
      en: [
        {
          title: "Login-free Page Creation",
          description: "Create shareable pages instantly with no registration",
        },
        {
          title: "URL & QR Code Sharing",
          description: "Open instantly from a link or QR code",
        },
        {
          title: "Auto-deletion with Selectable Retention",
          description: "Auto-deleted after expiry, from 1 hour to 7 days",
        },
        {
          title: "Passphrase Protection",
          description: "Optionally restrict access",
        },
      ],
    },
    responsibilities: {
      ja: ["企画・コンセプト設計", "セキュリティ設計", "UI/UX設計", "実装"],
      en: ["Planning & Concept Design", "Security Design", "UI/UX Design", "Implementation"],
    },
    stack: ["TypeScript", "Web Security", "Capability URL"],
    stackBreakdown: {
      frontend: ["TypeScript"],
      databaseAuth: ["Session / Cookie", "Capability URL (token-based access)"],
    },
    systemArchitecture: {
      description: {
        ja: "共有しないsession-onlyな利用では、作成時のセッションからのみデータを取得できる単純な構成にできます。共有する場合は、ランダムなトークンを含む権限URL（Capability URL）を発行し、サーバーにはトークンのハッシュ値だけを保存して権限を判定する構成を検討しています。",
        en: "For non-shared, session-only use, the design can be simple: data is retrievable only from the creating session. For sharing, the approach under consideration issues capability URLs containing random tokens and stores only the token hashes on the server to judge permissions.",
      },
      diagram: `Create page (no login)
 ↓
Session-only use → readable only from the creating session
 ↓
Share → issue capability URLs (view / edit / admin)
 ↓
Server stores token HASH only
 ↓
Limited retention → auto-delete`,
    },
    technicalRefinement: {
      ja: [
        {
          title: "ログインなしは「認証がない」ではないという前提",
          content:
            "アカウント認証を、セッション・Cookie・共有URLといった別の仕組みに置き換えていると捉え、何を根拠に操作を許可するかを明確にしています。",
        },
        {
          title: "閲覧・編集・管理の権限分離",
          content:
            "一つのリンクに全権限を持たせず、用途に応じて閲覧・編集・管理を分けることで、リンク漏洩時の被害を小さく抑える設計を検討しています。",
        },
        {
          title: "生のトークンをDBに保存しない",
          content:
            "共有URLのトークンはパスワードに近い役割を持つため、サーバーにはハッシュ値だけを保存し、アクセス時に同じ方法でハッシュ化して照合します。",
        },
        {
          title: "URLフラグメントの活用と限界の理解",
          content:
            "トークンをURLフラグメントに入れることでサーバーログへの残留は避けやすくなりますが、JSから読めるためXSS等では漏れる点も前提にしています。",
        },
      ],
      en: [
        {
          title: "Treating login-free as 'not without authentication'",
          content:
            "Viewing it as replacing account authentication with sessions, cookies, and shared URLs, and clarifying on what basis each operation is allowed.",
        },
        {
          title: "Separating view, edit, and admin rights",
          content:
            "Instead of granting all rights to one link, separating view/edit/admin by purpose to minimize damage when a link leaks.",
        },
        {
          title: "Not storing raw tokens in the DB",
          content:
            "Since share-URL tokens act much like passwords, storing only their hashes on the server and hashing the same way at access time to compare.",
        },
        {
          title: "Using URL fragments and understanding their limits",
          content:
            "Putting tokens in URL fragments helps avoid leaving them in server logs, but they remain readable from JS, so leakage via XSS is assumed.",
        },
      ],
    },
    uiUxDesign: {
      ja: [
        "登録なしで迷わず使い始められるシンプルな導線",
        "共有リンクの性質（リンクを知っている人はアクセスできる）を分かりやすく伝える表現",
        "機密情報の保存には向かないことを明示するUI",
      ],
      en: [
        "A simple flow that lets people start without registration or confusion",
        "Clear wording about the nature of share links (anyone with the link can access)",
        "UI that explicitly states it isn't suited for storing sensitive information",
      ],
    },
    performanceSeoAccessibility: {
      ja: [
        "ボードの閲覧・編集画面では外部スクリプトをできる限り置かない方針",
        "紹介ページとユーザーデータを扱う画面で求める安全性を分けて設計",
      ],
      en: [
        "A policy of placing as few external scripts as possible on board view/edit screens",
        "Designing the required safety level separately for marketing pages and screens handling user data",
      ],
    },
    securityPrivacy: {
      ja: [
        "閲覧・編集・管理権限を分離し、必要以上に広い権限を渡さない",
        "十分に推測困難なトークンを発行し、生のトークンをDBへ保存しない",
        "ユーザー入力をHTMLとして直接描画せず、XSSによる権限漏洩や不正操作を防ぐ",
        "HttpOnly CookieやCSPを活用しつつ、それだけでXSSを防げない前提で設計する",
        "保存期間を限定し、古い共有リンクが残り続けるのを防ぐ",
        "復元を前提にせず、機密情報向けではないことを利用者へ明確に伝える",
      ],
      en: [
        "Separating view/edit/admin rights and never granting broader permissions than needed",
        "Issuing sufficiently unguessable tokens and never storing raw tokens in the DB",
        "Not rendering user input directly as HTML, preventing permission leakage and abuse via XSS",
        "Using HttpOnly cookies and CSP while designing on the premise that they alone cannot prevent XSS",
        "Limiting retention to prevent old share links from lingering",
        "Not assuming recovery, and clearly telling users it isn't meant for sensitive data",
      ],
    },
    difficulties: {
      ja: [
        {
          challenge: "ログインなしで「誰に操作を許可するか」をどう判断するか",
          solution: "セッションや共有トークンを権限の根拠とし、用途に応じて権限を分離",
          result: "アカウントに頼らずに操作許可を判断できる設計方針を整理",
        },
        {
          challenge: "共有リンク漏洩時の被害をどう抑えるか",
          solution: "閲覧・編集・管理リンクの分離と、トークンのハッシュ保存・保存期間の限定",
          result: "漏洩時の影響範囲を限定し、リスクを前提にした共有設計を明確化",
        },
      ],
      en: [
        {
          challenge: "Deciding 'who is allowed to operate' without login",
          solution:
            "Using sessions and share tokens as the basis for permissions, separating rights by purpose",
          result: "Organized a design approach for judging operation permission without accounts",
        },
        {
          challenge: "Containing damage when a share link leaks",
          solution:
            "Separating view/edit/admin links, storing token hashes, and limiting retention",
          result:
            "Limited the blast radius of leaks and clarified sharing design that assumes risk",
        },
      ],
    },
    learnings: {
      ja: [
        "ログインをなくしても認証はなくならず、別の仕組みに置き換わるだけだということ",
        "共有機能があるとXSSの影響範囲が大きく広がること",
        "手軽さとセキュリティは、性質に合わせた制約を設けることで両立できること",
      ],
      en: [
        "Removing login doesn't remove authentication — it just shifts it to another mechanism",
        "Adding sharing greatly widens the blast radius of XSS",
        "Ease of use and security can coexist by setting constraints matched to the service's nature",
      ],
    },
    futurePlans: {
      ja: [
        "共有時の権限分離とトークン失効の仕組みの具体化",
        "保存期間や容量に関するポリシーの設計",
        "ユーザー入力の安全な表示方法の実装と検証",
      ],
      en: [
        "Concretizing permission separation and token revocation for sharing",
        "Designing policies for retention period and capacity",
        "Implementing and verifying safe rendering of user input",
      ],
    },
    links: {
      website: "https://nobo.page",
      article: "/articles/login-less-app-security-design/",
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
      ja: [
        "実際に運用を続けている旅行ブログ",
        "計測に基づく継続的なSEO施策",
        "表示速度とサイト構造の継続的な改善",
      ],
      en: [
        "A travel blog kept in continuous real-world operation",
        "Measurement-driven, continuous SEO implementation",
        "Ongoing improvement of page speed and site structure",
      ],
    },
    description: {
      ja: "実際に運用している旅行ブログです。旅行先での体験記に加え、空港アクセス・ビザ・決済などの実用的な旅行情報や、写真ギャラリー・目的地別の記事を継続的に更新しながら、SEO施策・ページ表示速度の改善・サイト構造の最適化に取り組んでいます。技術記事ではなく実コンテンツを扱うサイトを通じて、検索流入と読みやすさを両立させる知見を積み重ねることを目的としています。",
      en: "An actively maintained travel blog. Alongside firsthand travel diaries, it publishes practical travel information (airport access, visas, payments), a photo gallery, and destination-based articles. While keeping this content updated, I work on SEO, page speed improvements, and site structure optimization. The goal is to accumulate practical know-how on balancing search traffic and readability through a site that handles real content rather than technical writing.",
    },
    background: {
      ja: "技術検証用のサンプルではなく、実際に読者が訪れる旅行ブログを運用することで、検索エンジンからの流入やコンテンツの読まれ方を踏まえた改善を実践したいと考えました。定期的にLighthouseスコアやSearch Consoleの指標を計測し、課題を特定してから対処する改善サイクルを確立しています。コンテンツの構造やメタデータの最適化も継続的に実施しています。",
      en: "Rather than running a sample site for technical experiments, I wanted to operate a travel blog that real readers visit, so that improvements could be grounded in actual search traffic and reading behavior. I established an improvement cycle that regularly measures Lighthouse scores and Search Console metrics, identifies issues, and then addresses them. Content structure and metadata optimization are also ongoing.",
    },
    challenges: {
      user: {
        ja: "旅行先を調べている読者が、必要な情報に素早くたどり着き、ストレスなく読み進められること。記事数が増えるにつれ、ページ速度の低下やSEO上の課題が表面化しやすくなるため、技術的な改善を継続しながらコンテンツ運営を両立する必要があります。",
        en: "Helping readers researching destinations reach the information they need quickly and read without friction. As the number of articles grows, page-speed degradation and SEO issues surface more easily, so technical improvement must be sustained alongside content operations.",
      },
      technical: {
        ja: "記事数が増えても表示速度とCore Web Vitalsを維持できるよう、画像の最適化や不要なスクリプトの削減を継続すること。内部リンクやカテゴリ構造を整理し、回遊性とクローラビリティを両立させること。",
        en: "Sustaining page speed and Core Web Vitals as the article count grows through image optimization and reduction of unnecessary scripts. Organizing internal links and category structure to balance reader navigation with crawlability.",
      },
      operational: {
        ja: "コンテンツの執筆・更新と技術的な改善を限られた時間の中で両立し、計測→課題特定→改善のサイクルを止めずに回し続けること。",
        en: "Balancing content writing/updates with technical improvement within limited time, and keeping the measure → identify → improve cycle running without interruption.",
      },
    },
    features: {
      ja: [
        {
          title: "旅行記事の継続的な公開",
          description: "旅行体験記や実用的な旅行情報、写真ギャラリーを発信",
        },
        { title: "SEOを意識したサイト構造", description: "カテゴリ・内部リンク・メタデータの整理" },
        { title: "高速なページ表示", description: "画像最適化と軽量な構成による高速化" },
      ],
      en: [
        {
          title: "Continuous Travel Article Publishing",
          description: "Sharing travel diaries, practical travel information, and a photo gallery",
        },
        {
          title: "SEO-conscious Site Structure",
          description: "Organized categories, internal links, and metadata",
        },
        {
          title: "Fast Page Rendering",
          description: "Speed gains through image optimization and a lightweight setup",
        },
      ],
    },
    responsibilities: {
      ja: ["企画", "コンテンツ執筆", "デザイン", "実装", "SEO・パフォーマンス改善", "運用"],
      en: [
        "Planning",
        "Content Writing",
        "Design",
        "Implementation",
        "SEO & Performance Improvement",
        "Operation",
      ],
    },
    stack: ["SEO", "Performance optimization", "Content operations"],
    stackBreakdown: {
      tooling: ["Lighthouse", "Google Search Console", "Google Analytics"],
    },
    systemArchitecture: {
      description: {
        ja: "コンテンツ更新を中心に運用しつつ、Lighthouseによるパフォーマンス計測とSearch Consoleによる検索パフォーマンスの確認を定期的に行い、課題を特定してから改善を反映する運用フローを取っています。",
        en: "Centered on content updates, the operation regularly measures performance with Lighthouse and checks search performance with Search Console, identifying issues before reflecting improvements.",
      },
    },
    technicalRefinement: {
      ja: [
        {
          title: "定期的なパフォーマンス計測と改善サイクルの確立",
          content:
            "Lighthouseスコアを定点観測し、表示速度やCore Web Vitalsに課題が出たタイミングで原因を特定し、画像やスクリプトを中心に改善しています。",
        },
        {
          title: "コンテンツSEOの継続的な最適化",
          content:
            "Search Consoleの検索クエリや表示順位を確認しながら、タイトルや見出し、内部リンク構造を継続的に見直しています。",
        },
      ],
      en: [
        {
          title: "Establishing a regular performance measurement and improvement cycle",
          content:
            "Tracking Lighthouse scores over time, identifying causes when page speed or Core Web Vitals degrade, and improving mainly around images and scripts.",
        },
        {
          title: "Continuous content SEO optimization",
          content:
            "Continuously revisiting titles, headings, and internal link structure while monitoring search queries and rankings in Search Console.",
        },
      ],
    },
    uiUxDesign: {
      ja: [
        "旅行先を探している読者が目的の情報に素早くたどり着ける導線設計",
        "モバイルでの閲覧を前提とした読みやすいレイアウト",
        "関連記事やカテゴリによる回遊性の確保",
      ],
      en: [
        "Navigation designed so readers searching for destinations reach the right information quickly",
        "A readable layout designed mobile-first",
        "Encouraging exploration through related articles and categories",
      ],
    },
    performanceSeoAccessibility: {
      ja: [
        "Lighthouseによる定期的なパフォーマンス計測と改善",
        "適切なメタデータと構造化による検索エンジン最適化",
        "画像の最適化による表示速度の維持",
      ],
      en: [
        "Regular performance measurement and improvement with Lighthouse",
        "Search engine optimization through appropriate metadata and structure",
        "Maintaining page speed through image optimization",
      ],
    },
    securityPrivacy: {
      ja: ["必要以上の個人情報を収集しない運用方針", "依存関係を抑えた保守しやすい構成"],
      en: [
        "An operating policy that avoids collecting more personal data than necessary",
        "A maintainable setup with limited dependencies",
      ],
    },
    difficulties: {
      ja: [
        {
          challenge: "記事数の増加に伴う表示速度の低下",
          solution: "画像の最適化と不要なスクリプトの見直しを継続的に実施",
          result: "記事を増やしながらも快適な表示速度を維持",
        },
        {
          challenge: "検索流入の伸び悩み",
          solution: "Search Consoleの指標をもとにタイトル・見出し・内部リンクを改善",
          result: "計測に基づく改善で検索からの流入を継続的に見直せる体制を構築",
        },
      ],
      en: [
        {
          challenge: "Page-speed degradation as the article count grows",
          solution: "Continuously optimizing images and reviewing unnecessary scripts",
          result: "Maintained comfortable page speed even while increasing articles",
        },
        {
          challenge: "Plateauing search traffic",
          solution:
            "Improving titles, headings, and internal links based on Search Console metrics",
          result:
            "Built a setup for continuously revisiting search traffic through measurement-driven improvement",
        },
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
    futurePlans: {
      ja: [
        "記事コンテンツのさらなる拡充と更新",
        "検索意図に合わせたサイト構造の継続的な見直し",
        "表示速度とCore Web Vitalsのさらなる改善",
      ],
      en: [
        "Further expanding and updating article content",
        "Continuously revisiting site structure to match search intent",
        "Further improving page speed and Core Web Vitals",
      ],
    },
    links: {
      website: "https://tomokichidiary.com",
    },
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
