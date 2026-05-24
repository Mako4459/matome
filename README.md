# Web記事 Obsidian Markdown Web

URL、記事タイトル、代表画像URLを入力して、Obsidianに保存しやすいMarkdownノートを作成するWebアプリです。

OpenAI APIは使いません。要約はユーザーがChatGPTに手動で依頼し、ChatGPTの回答をこのアプリに貼り付けて最終Markdownを作成します。GitHub Pagesで無料運用できます。

## 概要

- React + Vite + TypeScript製の静的Webアプリ
- GitHub Pagesで公開可能
- APIキー不要、`.env` 不要、サーバー不要
- URL、記事タイトル、代表画像URLを手動入力
- ChatGPTに貼り付ける要約依頼文をコピー可能
- ChatGPTで作成した要約を貼り付けてMarkdownに反映
- Markdownをコピーまたは `.md` ファイルとしてダウンロード可能

## セットアップ

```bash
npm install
```

## ローカル起動

```bash
npm run dev
```

通常は次のURLで開けます。

```text
http://localhost:5173
```

## 使い方

1. 記事URLを入力します。
2. 記事タイトルを入力します。
3. 必要に応じて代表画像URLとメモを入力します。
4. 「Markdownひな形を作成」を押します。
5. 「依頼文をコピー」または「ChatGPTに要約を依頼する」を押します。
6. ChatGPTで作成された要約を貼り付けます。
7. Markdownプレビューを確認します。
8. 「コピー」または「.mdでダウンロード」でObsidianに保存します。

## GitHub Pagesで公開する方法

1. GitHubにリポジトリを作成します。
2. このプロジェクトをリポジトリにpushします。
3. GitHubのリポジトリ画面で `Settings` を開きます。
4. `Pages` を開きます。
5. `Build and deployment` の `Source` を `GitHub Actions` にします。
6. `main` ブランチにpushすると、`.github/workflows/deploy.yml` が自動でビルドと公開を行います。

公開URLは通常、次の形式になります。

```text
https://ユーザー名.github.io/リポジトリ名/
```

## 注意点

- このアプリは完全静的アプリです。
- GitHub Pagesではサーバー処理が使えないため、URLから記事タイトルや画像URLを自動取得しません。
- OpenAI API、`.env`、APIキーは不要です。
- 記事全文はアプリ内に保存しません。
- 画像ファイル自体は保存せず、画像URLだけをMarkdownに記録します。
- 出典URLはMarkdown末尾とYAML front matterに残します。
- ChatGPTへの要約依頼はユーザーが手動で行います。
- 記事本文をChatGPTに貼る場合は、利用規約や著作権に配慮してください。

## 今後追加できる機能

- Obsidian Vaultへの直接保存
- タグ自動生成
- カテゴリ分類
- 複数URLの一括ノート作成
- 保存履歴
- 検索機能
- PWA化
- Google Drive連携
