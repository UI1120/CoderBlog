import { Heart, Share2, Link2, Loader2 } from "lucide-react";
import { Button } from "@/P00_common/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ActionButtonsProps {
  articleId: number | string;
  goodCount: number;
  articleTitle: string;
  onUpdateGoodCount?: (count: number) => void;
}

export function ActionButtons({ articleId, goodCount, articleTitle, onUpdateGoodCount }: ActionButtonsProps) {
  const [liked, setLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // local state is kept for internal logic but display uses prop or synced state
  // actually, let's trust prop goodCount if parent updates it

  // Cookieキー
  const likedKey = `liked_article_${articleId}`;

  // 初期状態チェック
  useEffect(() => {
    const isLiked = document.cookie.split('; ').find(row => row.startsWith(`${likedKey}=`));
    if (isLiked) {
      setLiked(true);
    }
  }, [likedKey]);

  const handleLike = async () => {
    if (!liked && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/articles/${articleId}/like`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });

        if (res.ok) {
          const data = await res.json();
          setLiked(true);

          // 親コンポーネントへ通知 (ヘッダーの数字更新用)
          if (onUpdateGoodCount) {
            onUpdateGoodCount(data.good_count);
          }

          // Cookieセット (永続的: 365日)
          const date = new Date();
          date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
          document.cookie = `${likedKey}=true; expires=${date.toUTCString()}; path=/`;

          toast.success("いいねしました");
        } else {
          toast.error("失敗しました");
        }
      } catch (e) {
        console.error(e);
        toast.error("エラーが発生しました");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (liked) toast.info("既にいいね済みです");
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
          disabled={liked || isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          )}
          <span>いいね</span>
          <span className="ml-1">({goodCount})</span>
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
