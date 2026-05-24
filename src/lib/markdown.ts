import type { ArticleMetadata } from '../types/article';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function yamlEscape(value: string) {
  return value.replace(/"/g, '\\"');
}

export function buildObsidianMarkdown(input: {
  article: ArticleMetadata;
  summaryMarkdown: string;
}) {
  const { article, summaryMarkdown } = input;
  const summary = summaryMarkdown.trim() || `## この記事の要約

ここにChatGPTで作成した要約を貼り付けます。

## 重要ポイント

- 

## 小学生にもわかる説明


## たとえ話


## 自分の言葉で言い換え


## 実務・勉強への活かし方

- 

## 重要用語の解説

- 

## 関連キーワード

- 

## Obsidianリンク候補

- [[ ]]

## 次に調べるテーマ

- `;

  return `---
title: "${yamlEscape(article.title)}"
source: "${yamlEscape(article.url)}"
created: ${today()}
tags: [web, summary, ai]
image: "${yamlEscape(article.imageUrl)}"
---

# ${article.title}

${article.imageUrl ? `![記事画像](${article.imageUrl})` : ''}

${summary}

## メモ

- 

---

出典: ${article.url}
`;
}

export function buildChatGptPrompt(article: ArticleMetadata) {
  return `以下のWeb記事を、Obsidianに保存する個人用ノートとして要約してください。

重要な条件:
- 記事全文を再掲しない
- 長い引用をしない
- 著作権に配慮し、要約・解説・学習メモとしてまとめる
- 日本語で書く
- Markdown形式で出力する
- 見出しは下の形式に合わせる
- 必要なら、私がこのあと記事本文を貼り付けます

記事タイトル:
${article.title}

出典URL:
${article.url}

代表画像URL:
${article.imageUrl || 'なし'}

${article.description ? `記事説明:\n${article.description}\n\n` : ''}出力形式:

## この記事の要約

## 重要ポイント

## 小学生にもわかる説明

## たとえ話

## 自分の言葉で言い換え

## 実務・勉強への活かし方

## 重要用語の解説

## 関連キーワード

## Obsidianリンク候補

## 次に調べるテーマ

記事本文を使う必要がある場合は、この依頼文の下に私が本文を貼り付けます。`;
}

export function filenameFromTitle(title: string) {
  const safeTitle = title
    .normalize('NFKC')
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 80);

  return `${safeTitle || 'web-ai-note'}.md`;
}
