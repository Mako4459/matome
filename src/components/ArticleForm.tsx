import { FileText, Image, Link, Save } from 'lucide-react';

type Props = {
  url: string;
  title: string;
  imageUrl: string;
  description: string;
  onUrlChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
};

export function ArticleForm({
  url,
  title,
  imageUrl,
  description,
  onUrlChange,
  onTitleChange,
  onImageUrlChange,
  onDescriptionChange,
  onSubmit,
}: Props) {
  return (
    <section className="input-panel" aria-label="記事情報入力">
      <label className="field">
        <span>
          <Link size={18} aria-hidden="true" />
          URL
        </span>
        <input
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
          placeholder="https://example.com/article"
          inputMode="url"
          autoComplete="url"
        />
      </label>

      <label className="field">
        <span>
          <FileText size={18} aria-hidden="true" />
          記事タイトル
        </span>
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="記事タイトル"
        />
      </label>

      <label className="field">
        <span>
          <Image size={18} aria-hidden="true" />
          代表画像URL
        </span>
        <input
          value={imageUrl}
          onChange={(event) => onImageUrlChange(event.target.value)}
          placeholder="https://example.com/ogp-image.jpg"
          inputMode="url"
        />
      </label>

      <label className="field">
        <span>
          <FileText size={18} aria-hidden="true" />
          メモ・説明
        </span>
        <textarea
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="任意: 記事の説明や、自分用の短いメモを入力できます。"
          rows={4}
        />
      </label>

      <button className="primary-button" onClick={onSubmit}>
        <Save size={19} aria-hidden="true" />
        Markdownひな形を作成
      </button>
    </section>
  );
}
