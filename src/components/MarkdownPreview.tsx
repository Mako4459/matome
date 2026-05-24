import { Check, Copy, Download } from 'lucide-react';

type Props = {
  markdown: string;
  copied: boolean;
  onCopy: () => void;
  onDownload: () => void;
};

export function MarkdownPreview({ markdown, copied, onCopy, onDownload }: Props) {
  return (
    <section className="markdown-panel" aria-label="Markdownプレビュー">
      <div className="panel-header">
        <h2>Markdownプレビュー</h2>
        <div className="actions">
          <button onClick={onCopy} disabled={!markdown}>
            {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
            コピー
          </button>
          <button onClick={onDownload} disabled={!markdown}>
            <Download size={18} aria-hidden="true" />
            .mdでダウンロード
          </button>
        </div>
      </div>
      <pre>{markdown || 'Obsidian用Markdownのひな形がここに表示されます。'}</pre>
    </section>
  );
}
