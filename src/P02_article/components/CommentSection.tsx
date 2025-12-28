import { useState } from "react";
import { Button } from "@/000_common/ui/button";
import { toast } from "sonner@2.0.3";

interface Comment {
  id: string;
  user: string;
  comment: string;
  date: string;
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "逕ｰ荳ｭ螟ｪ驛・,
      comment:
        "縺ｨ縺ｦ繧ょ盾閠・↓縺ｪ繧翫∪縺励◆・ヽeact縺ｮ繝代ヵ繧ｩ繝ｼ繝槭Φ繧ｹ譛驕ｩ蛹悶↓縺､縺・※隧ｳ縺励￥隗｣隱ｬ縺輔ｌ縺ｦ縺・※蜉ｩ縺九ｊ縺ｾ縺吶・,
      date: "2025蟷ｴ12譛・譌･ 14:30",
    },
    {
      id: "2",
      user: "菴占陸闃ｱ蟄・,
      comment:
        "useMemo縺ｨuseCallback縺ｮ菴ｿ縺・・縺代′繧医￥逅・ｧ｣縺ｧ縺阪∪縺励◆縲ょｮ滄圀縺ｮ繝励Ο繧ｸ繧ｧ繧ｯ繝医〒隧ｦ縺励※縺ｿ縺ｾ縺吶・,
      date: "2025蟷ｴ12譛・譌･ 09:15",
    },
    {
      id: "3",
      user: "螻ｱ逕ｰ谺｡驛・,
      comment:
        "繧ｳ繝ｼ繝峨し繝ｳ繝励Ν縺悟・縺九ｊ繧・☆縺・〒縺吶・縲らｶ夂ｷｨ繧よ悄蠕・＠縺ｦ縺・∪縺呻ｼ・,
      date: "2025蟷ｴ12譛・譌･ 18:45",
    },
  ]);

  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !commentText.trim()) {
      toast.error("繝ｦ繝ｼ繧ｶ繝ｼ蜷阪→繧ｳ繝｡繝ｳ繝医ｒ蜈･蜉帙＠縺ｦ縺上□縺輔＞");
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      user: userName,
      comment: commentText,
      date: new Date().toLocaleString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComments([...comments, newComment]);
    setUserName("");
    setCommentText("");
    toast.success("繧ｳ繝｡繝ｳ繝医ｒ謚慕ｨｿ縺励∪縺励◆");
  };

  return (
    <div className="space-y-8">
      {/* 繧ｳ繝｡繝ｳ繝郁｡ｨ遉ｺ */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl mb-6">
          繧ｳ繝｡繝ｳ繝・({comments.length})
        </h2>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#67e0b8] rounded-full flex items-center justify-center text-white">
                  {comment.user.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900">
                    {comment.user}
                  </div>
                  <div className="text-sm text-gray-500">
                    {comment.date}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 ml-13">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* 繧ｳ繝｡繝ｳ繝亥・蜉帙ヵ繧ｩ繝ｼ繝 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl mb-6">繧ｳ繝｡繝ｳ繝医ｒ謚慕ｨｿ</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="userName"
                className="block text-sm mb-2 text-gray-700"
              >
                繝ｦ繝ｼ繧ｶ繝ｼ蜷・
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="蜷榊燕繧貞・蜉帙＠縺ｦ縺上□縺輔＞"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67e0b8] focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="bg-[#67e0b8] hover:bg-[#4db896] text-white px-8"
              >
                謚慕ｨｿ
              </Button>
            </div>
          </div>

          <div>
            <label
              htmlFor="commentText"
              className="block text-sm mb-2 text-gray-700"
            >
              繧ｳ繝｡繝ｳ繝・
            </label>
            <textarea
              id="commentText"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="繧ｳ繝｡繝ｳ繝医ｒ蜈･蜉帙＠縺ｦ縺上□縺輔＞"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67e0b8] focus:border-transparent resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
