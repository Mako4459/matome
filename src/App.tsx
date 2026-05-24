import { useMemo, useState } from 'react';
import { ArticleForm } from './components/ArticleForm';
import { ArticlePreview } from './components/ArticlePreview';
import { ErrorMessage } from './components/ErrorMessage';
import { MarkdownPreview } from './components/MarkdownPreview';
import { SummaryComposer } from './components/SummaryComposer';
import { buildChatGptPrompt, buildObsidianMarkdown, filenameFromTitle } from './lib/markdown';
import type { ArticleMetadata } from './types/article';

export default function App() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState<ArticleMetadata | null>(null);
  const [summaryMarkdown, setSummaryMarkdown] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const markdown = useMemo(() => {
    if (!article) return '';
    return buildObsidianMarkdown({ article, summaryMarkdown });
  }, [article, summaryMarkdown]);

  function handleSubmit() {
    setError('');
    setCopied(false);
    setCopiedPrompt(false);

    try {
      const trimmedUrl = url.trim();
      const trimmedTitle = title.trim();
      const trimmedImageUrl = imageUrl.trim();

      if (!trimmedUrl) {
        throw new Error('URLを入力してください。');
      }

      if (!trimmedTitle) {
        throw new Error('記事タイトルを入力してください。');
      }

      setArticle({
        title: trimmedTitle,
        url: trimmedUrl,
        imageUrl: trimmedImageUrl,
        description: description.trim() || undefined,
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : '処理中に不明なエラーが発生しました。',
      );
    }
  }

  async function handleCopy() {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function handleCopyPrompt() {
    if (!article) return;
    await navigator.clipboard.writeText(buildChatGptPrompt(article));
    setCopiedPrompt(true);
    window.setTimeout(() => setCopiedPrompt(false), 1800);
  }

  async function handleOpenChatGpt() {
    if (!article) return;
    await handleCopyPrompt();
    window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
  }

  function handleDownload() {
    if (!markdown || !article) return;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = filenameFromTitle(article.title);
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p>GitHub Pagesで無料運用できるObsidianノート作成ツール</p>
        <h1>Markdown Note Maker</h1>
      </header>

      <ArticleForm
        url={url}
        title={title}
        imageUrl={imageUrl}
        description={description}
        onUrlChange={setUrl}
        onTitleChange={setTitle}
        onImageUrlChange={setImageUrl}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
      />

      {error && <ErrorMessage message={error} />}

      <div className="content-grid">
        <ArticlePreview article={article} />
        <SummaryComposer
          disabled={!article}
          copiedPrompt={copiedPrompt}
          summaryMarkdown={summaryMarkdown}
          onCopyPrompt={handleCopyPrompt}
          onOpenChatGpt={handleOpenChatGpt}
          onSummaryChange={setSummaryMarkdown}
        />
        <MarkdownPreview
          markdown={markdown}
          copied={copied}
          onCopy={handleCopy}
          onDownload={handleDownload}
        />
      </div>
    </main>
  );
}
