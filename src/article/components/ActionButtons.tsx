import { Heart, Share2, Link2 } from "lucide-react";
import { Button } from "@/common/ui/button";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface ActionButtonsProps {
  goodCount: number;
  articleTitle: string;
}

export function ActionButtons({ goodCount, articleTitle }: ActionButtonsProps) {
  const [liked, setLiked] = useState(false);
  const [currentGoodCount, setCurrentGoodCount] = useState(goodCount);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setCurrentGoodCount(prev => prev + 1);
      toast.success("いいねしました！");
    } else {
      setLiked(false);
      setCurrentGoodCount(prev => prev - 1);
      toast.success("いいねを取り消しました");
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
