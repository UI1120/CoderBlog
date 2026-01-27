# 🌐 API 一覧 (Unified & Physical Definitions)

本ドキュメントは、バックエンド実装用にAPIエンドポイントをリソース単位（フォルダ単位）で整理し、論理名・物理名を定義したものである。

## 📁 1. エンドポイント・リソース一覧 (E-Table)

実装時のフォルダ構成（Blueprint/Router）の基準となる分類。

| E-No.   | 論理名 (Logical Name) | 物理名 (Folder Name) | 対象URLプレフィックス / 概要                         |
| :------ | :-------------------- | :------------------- | :--------------------------------------------------- |
| **E01** | 認証                  | `auth`               | `/api/login`, `/api/logout`, `/api/auth`             |
| **E02** | アカウント            | `accounts`           | `/api/admin/accounts`                                |
| **E03** | 記事                  | `articles`           | `/api/articles`, `/api/admin/articles`               |
| **E04** | コメント              | `comments`           | `/api/articles/{id}/comments`, `/api/admin/comments` |
| **E05** | カテゴリ              | `categories`         | `/api/categories`, `/api/admin/categories`           |
| **E06** | タグ                  | `tags`               | `/api/tags`, `/api/admin/tags`                       |
| **E07** | プロジェクト          | `projects`           | `/api/projects`, `/api/admin/projects`               |
| **E08** | クリエイター          | `creators`           | `/api/creators`, `/api/admin/creators`               |
| **E09** | メディア              | `media`              | `/api/admin/media`                                   |
| **E10** | ヘッダーデータ        | `header`             | `/api/header`                                        |

---

## 🛠 2. API詳細・実装関数一覧 (B-Table)

各API機能の詳細定義。`Physical Name` はバックエンドの関数名・メソッド名として使用する。

### E01: 認証 (`auth`)

| B-No.   | E-No. | 論理名 (Feature) | 物理名 (Function Name) | Method | Endpoint      | Auth   | Design Doc |
| :------ | :---- | :--------------- | :--------------------- | :----- | :------------ | :----- | :--------- |
| **B01** | E01   | ログイン実行     | `login`                | POST   | `/api/login`  | Public | A01        |
| **B02** | E01   | 認証状態取得     | `get_auth_status`      | GET    | `/api/auth`   | Public | A01, A07   |
| **B03** | E01   | ログアウト実行   | `logout`               | POST   | `/api/logout` | User   | A01        |

### E02: アカウント (`accounts`)

| B-No.   | E-No. | 論理名 (Feature)   | 物理名 (Function Name) | Method | Endpoint                            | Auth  | Design Doc |
| :------ | :---- | :----------------- | :--------------------- | :----- | :---------------------------------- | :---- | :--------- |
| **B04** | E02   | アカウント一覧取得 | `get_account_list`     | GET    | `/api/admin/accounts`               | Admin | A07        |
| **B05** | E02   | アカウント作成     | `create_account`       | POST   | `/api/admin/accounts`               | Admin | A07        |
| **B06** | E02   | アカウント更新     | `update_account`       | POST   | `/api/admin/accounts/{id}`          | Admin | A07        |
| **B07** | E02   | パスワード変更     | `change_password`      | POST   | `/api/admin/accounts/{id}/password` | User  | A07        |

### E03: 記事 (`articles`)

| B-No.   | E-No. | 論理名 (Feature) | 物理名 (Function Name)  | Method | Endpoint                          | Auth   | Design Doc |
| :------ | :---- | :--------------- | :---------------------- | :----- | :-------------------------------- | :----- | :--------- |
| **B11** | E03   | 公開記事一覧取得 | `get_public_articles`   | GET    | `/api/articles`                   | Public | P01, P03   |
| **B12** | E03   | 記事詳細取得     | `get_article_detail`    | GET    | `/api/articles/{id}`              | Public | P02        |
| **B13** | E03   | 記事本文取得     | `get_article_content`   | GET    | `/api/articles/{id}/content`      | Public | P02        |
| **B14** | E03   | PVカウントアップ | `increment_article_pv`  | POST   | `/api/articles/{id}/view`         | Public | P02        |
| **B15** | E03   | いいね実行       | `like_article`          | POST   | `/api/articles/{id}/like`         | Public | P02        |
| **B31** | E03   | 管理記事一覧取得 | `get_admin_articles`    | GET    | `/api/admin/articles`             | User   | A03        |
| **B32** | E03   | 新規記事作成     | `create_article`        | POST   | `/api/admin/articles`             | User   | A04        |
| **B33** | E03   | 編集用記事取得   | `get_edit_article`      | GET    | `/api/admin/articles/{id}`        | User   | A04        |
| **B34** | E03   | 記事更新・削除   | `update_article`        | POST   | `/api/admin/articles/{id}`        | User   | A04, A03   |
| **B35** | E03   | ステータス変更   | `update_article_status` | POST   | `/api/admin/articles/{id}/status` | Admin  | A03        |

### E04: コメント (`comments`)

| B-No.   | E-No. | 論理名 (Feature) | 物理名 (Function Name)  | Method | Endpoint                          | Auth   | Design Doc |
| :------ | :---- | :--------------- | :---------------------- | :----- | :-------------------------------- | :----- | :--------- |
| **B16** | E04   | 公開コメント取得 | `get_article_comments`  | GET    | `/api/articles/{id}/comments`     | Public | P02        |
| **B17** | E04   | コメント投稿     | `post_comment`          | POST   | `/api/articles/{id}/comments`     | Public | P02        |
| **B41** | E04   | 管理コメント一覧 | `get_admin_comments`    | GET    | `/api/admin/comments`             | User   | A03        |
| **B42** | E04   | コメント状態更新 | `update_comment_status` | POST   | `/api/admin/comments/{id}/status` | User   | A03        |
| **B43** | E04   | コメント削除     | `delete_comment`        | POST   | `/api/admin/comments/{id}`        | User   | A03        |

### E05: カテゴリ (`categories`)

| B-No.   | E-No. | 論理名 (Feature)   | 物理名 (Function Name) | Method | Endpoint                     | Auth   | Design Doc |
| :------ | :---- | :----------------- | :--------------------- | :----- | :--------------------------- | :----- | :--------- |
| **B21** | E05   | 全カテゴリ取得     | `get_categories`       | GET    | `/api/categories`            | Public | P06        |
| **B51** | E05   | カテゴリ作成       | `create_category`      | POST   | `/api/admin/categories`      | Admin  | A05        |
| **B52** | E05   | 管理カテゴリ一覧   | `get_admin_categories` | GET    | `/api/admin/categories`      | User   | A05        |
| **B53** | E05   | カテゴリ更新・削除 | `update_category`      | POST   | `/api/admin/categories/{id}` | Admin  | A05        |

### E06: タグ (`tags`)

| B-No.   | E-No. | 論理名 (Feature) | 物理名 (Function Name) | Method | Endpoint               | Auth   | Design Doc |
| :------ | :---- | :--------------- | :--------------------- | :----- | :--------------------- | :----- | :--------- |
| **B22** | E06   | 全タグ取得       | `get_tags`             | GET    | `/api/tags`            | Public | P07        |
| **B54** | E06   | タグ作成         | `create_tag`           | POST   | `/api/admin/tags`      | Admin  | A05        |
| **B55** | E06   | 管理タグ一覧     | `get_admin_tags`       | GET    | `/api/admin/tags`      | User   | A05        |
| **B56** | E06   | タグ更新・削除   | `update_tag`           | POST   | `/api/admin/tags/{id}` | Admin  | A05        |

### E07: プロジェクト (`projects`)

| B-No.   | E-No. | 論理名 (Feature)     | 物理名 (Function Name) | Method | Endpoint                   | Auth   | Design Doc |
| :------ | :---- | :------------------- | :--------------------- | :----- | :------------------------- | :----- | :--------- |
| **B23** | E07   | プロジェクト取得     | `get_projects`         | GET    | `/api/projects`            | Public | P04        |
| **B57** | E07   | プロジェクト作成     | `create_project`       | POST   | `/api/admin/projects`      | Admin  | A05        |
| **B58** | E07   | 管理プロジェクト一覧 | `get_admin_projects`   | GET    | `/api/admin/projects`      | User   | A05        |
| **B59** | E07   | プロジェクト更新     | `update_project`       | POST   | `/api/admin/projects/{id}` | Admin  | A05        |

### E08: クリエイター (`creators`)

| B-No.   | E-No. | 論理名 (Feature)     | 物理名 (Function Name) | Method | Endpoint                   | Auth   | Design Doc |
| :------ | :---- | :------------------- | :--------------------- | :----- | :------------------------- | :----- | :--------- |
| **B24** | E08   | クリエイター取得     | `get_creators`         | GET    | `/api/creators`            | Public | P05        |
| **B61** | E08   | クリエイター作成     | `create_creator`       | POST   | `/api/admin/creators`      | Admin  | A06        |
| **B62** | E08   | 管理クリエイター一覧 | `get_admin_creators`   | GET    | `/api/admin/creators`      | User   | A06        |
| **B63** | E08   | クリエイター更新     | `update_creator`       | POST   | `/api/admin/creators/{id}` | Admin  | A06        |

### E09: メディア (`media`)

| B-No.   | E-No. | 論理名 (Feature)     | 物理名 (Function Name) | Method | Endpoint           | Auth | Design Doc |
| :------ | :---- | :------------------- | :--------------------- | :----- | :----------------- | :--- | :--------- |
| **B36** | E09   | メディアアップロード | `upload_media`         | POST   | `/api/admin/media` | User | A04        |

### E10: ヘッダーデータ (`header`)

| B-No.   | E-No. | 論理名 (Feature)     | 物理名 (Function Name)  | Method | Endpoint                 | Auth   | Design Doc |
| :------ | :---- | :------------------- | :---------------------- | :----- | :----------------------- | :----- | :--------- |
| **B25** | E10   | ヘッダープロジェクト | `get_header_projects`   | GET    | `/api/header/projects`   | Public | P00        |
| **B26** | E10   | ヘッダーカテゴリ     | `get_header_categories` | GET    | `/api/header/categories` | Public | P00        |
| **B27** | E10   | ヘッダータグ         | `get_header_tags`       | GET    | `/api/header/tags`       | Public | P00        |
| **B28** | E10   | ヘッダーライター     | `get_header_writers`    | GET    | `/api/header/writers`    | Public | P00        |
