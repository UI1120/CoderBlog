import { useState, useEffect } from "react";
import { Button } from "@/P00_common/ui/button";
import { toast } from "sonner";
import { API_BASE_URL } from "@/constants";

interface Comment {
  id: string;
  guest_name: string;
  content: string;
  date: string;
  status: 'approved' | 'pending';
}

interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.error("コメントを入力してください");
      return;
    }
    if (userName.length > 20) {
      toast.error("ユーザー名は20文字以内で入力してください");
      return;
    }
    if (commentText.length > 500) {
      toast.error("コメントは500文字以内で入力してください");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guest_name: userName.trim() || "匿名",
          content: commentText
        })
      });

      if (res.ok) {
        const newPending: Comment = {
          id: `pending-${Date.now()}`,
          guest_name: userName.trim() || "匿名",
          content: "【管理人の承認後に表示されます】",
          status: 'pending',
          date: new Date().toLocaleString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        };

        setPendingComments([newPending, ...pendingComments]);
        setUserName("");
        setCommentText("");
        toast.success("コメントを投稿しました。管理者の承認後に表示されます。");
      } else {
        toast.error("コメントの投稿に失敗しました");
      }
    } catch (e) {
      console.error(e);
      toast.error("エラーが発生しました");
    }
  };

  if (loading) {
    return <div className="text-center py-8">コメントを読み込み中...</div>;
  }

  return (
    <div className="space-y-8">
      {/* コメント表示 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl mb-6">
          コメント({comments.length + pendingComments.length})
        </h2>

        <div className="space-y-6">
          {[...pendingComments, ...comments].map((comment) => (
            <div
              key={comment.id}
              className={`border-b border-gray-200 pb-6 last:border-b-0 ${comment.status === 'pending' || comment.id.toString().startsWith('pending') ? 'opacity-70' : ''}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#67e0b8] rounded-full flex items-center justify-center text-white">
                  {(comment.guest_name || "G").charAt(0)}
                </div>
                <div>
                  <div className="text-gray-900">
                    {comment.guest_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {comment.date}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 ml-13">
                {comment.content}
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
                maxLength={20}
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
              maxLength={500}
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
