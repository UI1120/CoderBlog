import { Heart, Share2, Link2 } from "lucide-react";
import { Button } from "@/P00_common/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ActionButtonsProps {
  articleId: number | string;
  goodCount: number;
  articleTitle: string;
}

export function ActionButtons({ articleId, goodCount, articleTitle }: ActionButtonsProps) {
  const [liked, setLiked] = useState(false);
  const [currentGoodCount, setCurrentGoodCount] = useState(goodCount);

  const handleLike = async () => {
    if (!liked) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/articles/${articleId}/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        
        if (res.ok) {
           const data = await res.json();
           setLiked(true);
           setCurrentGoodCount(data.good_count);
           toast.success("いいねしました");
        } else {
           toast.error("失敗しました");
        }
      } catch (e) {
        console.error(e);
        toast.error("エラーが発生しました");
      }
    } else {
      // Currently API doesn't support 'unlike', only increment.
      // Reverting local state for UI feedback but effectively it's one-way in this design for now.
      // Or we can simulate toggle if backend supported it.
      // Based on design, it's just 'like' endpoint.
      // Let's just allow toggling off locally or show message.
      toast.info("いいねを取り消す機能は未実装です");
    }
  };

  const handleShareX = () => {
    const url = window.location.href;
    const text = articleTitle;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URLをコピーしました");
    } catch (err) {
      toast.error("URLのコピーに失敗しました");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleLike}
          variant={liked ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          <span>いいね</span>
          <span className="ml-1">({currentGoodCount})</span>
        </Button>

        <Button
          onClick={handleShareX}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Xでシェア</span>
        </Button>

        <Button
          onClick={handleCopyUrl}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Link2 className="w-5 h-5" />
          <span>URLコピー</span>
        </Button>
      </div>
    </div>
  );
}
