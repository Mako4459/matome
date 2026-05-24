import { Copy, ExternalLink, MessageSquareText } from 'lucide-react';

type Props = {
  disabled: boolean;
  copiedPrompt: boolean;
  summaryMarkdown: string;
  onCopyPrompt: () => void;
  onOpenChatGpt: () => void;
  onSummaryChange: (value: string) => void;
};

export function SummaryComposer({
  disabled,
  copiedPrompt,
  summaryMarkdown,
  onCopyPrompt,
  onOpenChatGpt,
  onSummaryChange,
}: Props) {
  return (
    <section className="summary-panel" aria-label="ChatGPT要約作成">
      <div className="panel-header">
        <h2>ChatGPTで要約を作る</h2>
        <div className="actions">
          <button onClick={onCopyPrompt} disabled={disabled}>
            <Copy size={18} aria-hidden="true" />
            {copiedPrompt ? '依頼文をコピー済み' : '依頼文をコピー'}
          </button>
          <button onClick={onOpenChatGpt} disabled={disabled}>
            <ExternalLink size={18} aria-hidden="true" />
            ChatGPTに要約を依頼する
          </button>
        </div>
      </div>

      <label className="field summary-field">
        <span>
          <MessageSquareText size={18} aria-hidden="true" />
          ChatGPTで作成した要約
        </span>
        <textarea
          value={summaryMarkdown}
          onChange={(event) => onSummaryChange(event.target.value)}
          placeholder="ChatGPTの回答をここに貼り付けると、最終Markdownに反映されます。"
          rows={12}
          disabled={disabled}
        />
      </label>
    </section>
  );
}
