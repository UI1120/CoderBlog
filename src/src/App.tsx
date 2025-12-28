import { ArticleDetail } from "./components/ArticleDetail";
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// モックデータ
const mockArticle = {
  id: "1",
  title: "Reactを使った効率的なWebアプリケーション開発",
  summary: "モダンなReactの機能を活用して、パフォーマンスの高いWebアプリケーションを構築する方法を解説します。",
  category: "技術",
  category_id: "tech",
  writer: "山田太郎",
  group: "開発チーム",
  published_date: "2025年12月1日",
  good_count: 42,
  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
  content: 
`# はじめに

この記事では、Reactを使った効率的なWebアプリケーション開発について解説します。

## 主要なポイント

### 1. コンポーネント設計

再利用可能なコンポーネントを作成することで、開発効率が大幅に向上します。

- **単一責任の原則**を守る
- **Props**を適切に設計する
- **カスタムフック**で共通ロジックを抽出する

### 2. パフォーマンス最適化

\`\`\`javascript
import { memo, useMemo, useCallback } from 'react';

const MyComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]);
  
  return <div>{processedData}</div>;
});
\`\`\`

### 3. 状態管理

適切な状態管理戦略を選択することが重要です：

1. ローカル状態には \`useState\` を使用
2. グローバル状態には Context API や状態管理ライブラリを検討
3. サーバー状態には React Query などのライブラリを活用

## まとめ

Reactの機能を適切に活用することで、保守性が高く、パフォーマンスに優れたアプリケーションを構築できます。継続的な学習と実践が成功への鍵となります。`
};

const relatedArticles = [
  {
    id: "2",
    title: "TypeScriptで型安全なReactアプリケーションを作る",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80",
    category: "技術",
    published_date: "2025年11月28日"
  },
  {
    id: "3",
    title: "Next.jsでフルスタックアプリケーションを構築する",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    category: "技術",
    published_date: "2025年11月25日"
  },
  {
    id: "4",
    title: "モダンなUIコンポーネントライブラリの選び方",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=80",
    category: "技術",
    published_date: "2025年11月20日"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <ArticleDetail article={mockArticle} relatedArticles={relatedArticles} />
      <Footer/>
    </div>
  );
}
