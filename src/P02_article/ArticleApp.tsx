import { ArticleDetail } from "./components/ArticleDetail";
import { Header } from '@/000_common/components/Header';
import { Footer } from '@/000_common/components/Footer';

// 繝｢繝・け繝・・繧ｿ
const mockArticle = {
  id: "1",
  title: "React繧剃ｽｿ縺｣縺溷柑邇・噪縺ｪWeb繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ髢狗匱",
  summary: "繝｢繝繝ｳ縺ｪReact縺ｮ讖溯・繧呈ｴｻ逕ｨ縺励※縲√ヱ繝輔か繝ｼ繝槭Φ繧ｹ縺ｮ鬮倥＞Web繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ繧呈ｧ狗ｯ峨☆繧区婿豕輔ｒ隗｣隱ｬ縺励∪縺吶・,
  category: "謚陦・,
  category_id: "tech",
  writer: "螻ｱ逕ｰ螟ｪ驛・,
  group: "髢狗匱繝√・繝",
  published_date: "2025蟷ｴ12譛・譌･",
  good_count: 42,
  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
  content:
    `# 縺ｯ縺倥ａ縺ｫ

縺薙・險倅ｺ九〒縺ｯ縲ヽeact繧剃ｽｿ縺｣縺溷柑邇・噪縺ｪWeb繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ髢狗匱縺ｫ縺､縺・※隗｣隱ｬ縺励∪縺吶・

## 荳ｻ隕√↑繝昴う繝ｳ繝・

### 1. 繧ｳ繝ｳ繝昴・繝阪Φ繝郁ｨｭ險・

蜀榊茜逕ｨ蜿ｯ閭ｽ縺ｪ繧ｳ繝ｳ繝昴・繝阪Φ繝医ｒ菴懈・縺吶ｋ縺薙→縺ｧ縲・幕逋ｺ蜉ｹ邇・′螟ｧ蟷・↓蜷台ｸ翫＠縺ｾ縺吶・

- **蜊倅ｸ雋ｬ莉ｻ縺ｮ蜴溷援**繧貞ｮ医ｋ
- **Props**繧帝←蛻・↓險ｭ險医☆繧・
- **繧ｫ繧ｹ繧ｿ繝繝輔ャ繧ｯ**縺ｧ蜈ｱ騾壹Ο繧ｸ繝・け繧呈歓蜃ｺ縺吶ｋ

### 2. 繝代ヵ繧ｩ繝ｼ繝槭Φ繧ｹ譛驕ｩ蛹・

\`\`\`javascript
import { memo, useMemo, useCallback } from 'react';

const MyComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]);
  
  return <div>{processedData}</div>;
});
\`\`\`

### 3. 迥ｶ諷狗ｮ｡逅・

驕ｩ蛻・↑迥ｶ諷狗ｮ｡逅・姶逡･繧帝∈謚槭☆繧九％縺ｨ縺碁㍾隕√〒縺呻ｼ・

1. 繝ｭ繝ｼ繧ｫ繝ｫ迥ｶ諷九↓縺ｯ \`useState\` 繧剃ｽｿ逕ｨ
2. 繧ｰ繝ｭ繝ｼ繝舌Ν迥ｶ諷九↓縺ｯ Context API 繧・憾諷狗ｮ｡逅・Λ繧､繝悶Λ繝ｪ繧呈､懆ｨ・
3. 繧ｵ繝ｼ繝舌・迥ｶ諷九↓縺ｯ React Query 縺ｪ縺ｩ縺ｮ繝ｩ繧､繝悶Λ繝ｪ繧呈ｴｻ逕ｨ

## 縺ｾ縺ｨ繧・

React縺ｮ讖溯・繧帝←蛻・↓豢ｻ逕ｨ縺吶ｋ縺薙→縺ｧ縲∽ｿ晏ｮ域ｧ縺碁ｫ倥￥縲√ヱ繝輔か繝ｼ繝槭Φ繧ｹ縺ｫ蜆ｪ繧後◆繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ繧呈ｧ狗ｯ峨〒縺阪∪縺吶らｶ咏ｶ夂噪縺ｪ蟄ｦ鄙偵→螳溯ｷｵ縺梧・蜉溘∈縺ｮ骰ｵ縺ｨ縺ｪ繧翫∪縺吶Ａ
};

const relatedArticles = [
  {
    id: "2",
    title: "TypeScript縺ｧ蝙句ｮ牙・縺ｪReact繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ繧剃ｽ懊ｋ",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80",
    category: "謚陦・,
    published_date: "2025蟷ｴ11譛・8譌･"
  },
  {
    id: "3",
    title: "Next.js縺ｧ繝輔Ν繧ｹ繧ｿ繝・け繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ繧呈ｧ狗ｯ峨☆繧・,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    category: "謚陦・,
    published_date: "2025蟷ｴ11譛・5譌･"
  },
  {
    id: "4",
    title: "繝｢繝繝ｳ縺ｪUI繧ｳ繝ｳ繝昴・繝阪Φ繝医Λ繧､繝悶Λ繝ｪ縺ｮ驕ｸ縺ｳ譁ｹ",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=80",
    category: "謚陦・,
    published_date: "2025蟷ｴ11譛・0譌･"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ArticleDetail article={mockArticle} relatedArticles={relatedArticles} />
      <Footer />
    </div>
  );
}
