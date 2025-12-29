import { useState, useEffect } from "react";
import { Button } from "@/000_common/ui/button";
import { toast } from "sonner";
import { API_BASE_URL } from "@/constants";

interface Comment {
  id: string;
  user: string;
  comment: string;
  date: string;
}

interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/articles/${articleId}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch comments:', err);
        setLoading(false);
      });
  }, [articleId]);

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

  if (loading) {
    return <div className="text-center py-8">コメントを読み込み中...</div>;
  }

  return (
    <div className="space-y-8">
      {/* コメント表示 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl mb-6">
          コメント({comments.length})
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
