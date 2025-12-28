import { useState } from "react";
import { Button } from "./ui/button";
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
      user: "田中太郎",
      comment:
        "とても参考になりました！Reactのパフォーマンス最適化について詳しく解説されていて助かります。",
      date: "2025年12月2日 14:30",
    },
    {
      id: "2",
      user: "佐藤花子",
      comment:
        "useMemoとuseCallbackの使い分けがよく理解できました。実際のプロジェクトで試してみます。",
      date: "2025年12月3日 09:15",
    },
    {
      id: "3",
      user: "山田次郎",
      comment:
        "コードサンプルが分かりやすいですね。続編も期待しています！",
      date: "2025年12月3日 18:45",
    },
  ]);

  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !commentText.trim()) {
      toast.error("ユーザー名とコメントを入力してください");
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
    toast.success("コメントを投稿しました");
  };

  return (
    <div className="space-y-8">
      {/* コメント表示 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl mb-6">
          コメント ({comments.length})
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
      {/* コメント入力フォーム */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl mb-6">コメントを投稿</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="userName"
                className="block text-sm mb-2 text-gray-700"
              >
                ユーザー名
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="名前を入力してください"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67e0b8] focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="bg-[#67e0b8] hover:bg-[#4db896] text-white px-8"
              >
                投稿
              </Button>
            </div>
          </div>

          <div>
            <label
              htmlFor="commentText"
              className="block text-sm mb-2 text-gray-700"
            >
              コメント
            </label>
            <textarea
              id="commentText"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="コメントを入力してください"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67e0b8] focus:border-transparent resize-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}