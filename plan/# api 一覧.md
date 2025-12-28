# 🌐 API 一覧

本ドキュメントでは、設計に基づき必要なAPIエンドポイントと、それらがアクセスするデータベース（MySQL）およびストレージ（S3等）の関係を定義する。

## 1. 認証 API (`/api/auth`)

| メソッド | エンドポイント | 説明 | アクセスDB/ストレージ |
| :--- | :--- | :--- | :--- |
| POST | `/login` | ログイン。セッション作成。 | `accounts` (読込), `sessions` (書込) |
| POST | `/logout` | ログアウト。セッション削除。 | `sessions` (削除/無効化) |
| GET | `/me` | 自身のログイン状態・権限取得。 | `sessions`, `accounts`, `creators` |

---

## 2. 一般ユーザー向け API (`/api/public`)

### 2.1. 記事関連
| メソッド | エンドポイント | 説明 | アクセスDB/ストレージ |
| :--- | :--- | :--- | :--- |
| GET | `/articles` | 記事一覧取得（新着順、絞り込み）。 | `articles` (status=published), `article_tags`, `article_projects`, `categories`, `creators` |
| GET | `/articles/{id}` | 記事詳細（メタ情報）取得。 | `articles`, `categories`, `creators`, `tags`, `projects` |
| GET | `/articles/{id}/content` | 本文（Markdown）取得。 | DB内の `articles.content_path` を元に **S3ストレージ** から取得 |
| POST | `/articles/{id}/like` | いいね！の実行。 | `articles.good_count` (更新), `article_likes` (履歴書込) |
| POST | `/articles/{id}/view` | PVカウントアップ。 | `article_views` (ログ書込) |

### 2.2. マスタ・分類
| メソッド | エンドポイント | 説明 | アクセスDB/ストレージ |
| :--- | :--- | :--- | :--- |
| GET | `/categories` | 全カテゴリ一覧取得。 | `categories` |
| GET | `/tags` | 全タグ一覧取得。 | `tags` |
| GET | `/projects` | プロジェクト一覧または詳細取得。 | `projects` |
| GET | `/creators` | クリエイター（個人・グループ）取得。 | `creators`, `creator_members` |

### 2.3. コメント
| メソッド | エンドポイント | 説明 | アクセスDB/ストレージ |
| :--- | :--- | :--- | :--- |
| GET | `/articles/{id}/comments` | 指定記事のコメント一覧。 | `comments` |
| POST | `/articles/{id}/comments` | ゲストコメントの投稿。 | `comments` (書込) |

---

## 3. 管理画面用 API (`/api/admin`)
※ 全てのAPIにおいて有効なセッション（運営・執筆者ロール）が必須。

### 3.1. 記事管理
| メソッド | エンドポイント | 説明 | アクセスDB/ストレージ |
| :--- | :--- | :--- | :--- |
| GET | `/admin/articles` | 全ステータの記事一覧。 | `articles` (draft, scheduled含む全て) |
| POST | `/admin/articles` | 新規記事作成（メタ情報登録）。 | `articles` (書込、初期status=draft) |
| PUT | `/admin/articles/{id}` | 記事情報更新（メタ情報、タグ等）。 | `articles`, `article_tags`, `article_projects` (更新) |
| PUT | `/admin/articles/{id}/content` | Markdown本文の保存。 | **S3ストレージ** へのアップロード、`articles.content_path` 更新 |
| PATCH | `/admin/articles/{id}/status` | ステータス変更（Adminのみ）。 | `articles.status` 更新 (draft -> published 等) |
| POST | `/admin/media` | 画像・メディアアップロード。 | **S3ストレージ** 保存、`article_files` 登録 |

### 3.2. マスタ管理 (Adminのみ)
| メソッド | エンドポイント | 説明 | アクセスDB/ストレージ |
| :--- | :--- | :--- | :--- |
| POST/PUT | `/admin/categories`| カテゴリの作成・更新。 | `categories` |
| POST/PUT | `/admin/tags` | タグの作成・更新。 | `tags` |
| POST/PUT | `/admin/projects` | プロジェクト情報の更新。 | `projects` |

### 3.3. ユーザー・権限管理 (Adminのみ)
| メソッド | エンドポイント | 説明 | アクセスDB/ストレージ |
| :--- | :--- | :--- | :--- |
| GET | `/admin/accounts` | アカウント一覧取得。 | `accounts` |
| POST/PUT | `/admin/accounts` | アカウント作成・編集・ロール変更。 | `accounts` |
| POST/PUT| `/admin/creators` | クリエイター情報、メンバーシップ変更。 | `creators`, `creator_members` |

---

## 4. DBアクセス・実装方針メモ

1. **ハイブリッドデータ管理**:
   - `published_at`, `status`, `title` などの検索・フィルタリング対象は `MySQL`。
   - 大容量の `本文(Markdown)` および `メディアファイル` は `オブジェクトストレージ(S3)`。
2. **予約投稿の仕組み**:
   - バックエンドにバッチ、または定期的なタスクランナー（Cron相当）を設置。
   - `SELECT * FROM articles WHERE status='scheduled' AND published_at <= NOW()`
   - ヒットした記事を `status='published'` に一括更新する。
3. **PVといいねの整合性**:
   - いいね総数(`good_count`)は `articles` テーブルに物理カラムとして持ち、フロントエンドはここを参照する。
   - `article_likes` への書き込み時にトリガーまたはトランザクションで同期を図る。
