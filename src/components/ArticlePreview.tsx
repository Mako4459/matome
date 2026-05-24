import { ImageIcon } from 'lucide-react';
import type { ArticleMetadata } from '../types/article';

type Props = {
  article: ArticleMetadata | null;
};

export function ArticlePreview({ article }: Props) {
  if (!article) {
    return (
      <section className="preview-panel empty-preview">
        <ImageIcon size={28} aria-hidden="true" />
        <p>記事タイトル、URL、代表画像がここに表示されます。</p>
      </section>
    );
  }

  return (
    <section className="preview-panel" aria-label="記事プレビュー">
      {article.imageUrl ? (
        <img className="article-image" src={article.imageUrl} alt="記事画像" />
      ) : (
        <div className="image-placeholder">
          <ImageIcon size={28} aria-hidden="true" />
        </div>
      )}
      <div className="article-meta">
        <p className="site-name">{article.siteName || new URL(article.url).hostname}</p>
        <h2>{article.title}</h2>
        {article.description && <p className="article-description">{article.description}</p>}
        <a href={article.url} target="_blank" rel="noreferrer">
          {article.url}
        </a>
      </div>
    </section>
  );
}
