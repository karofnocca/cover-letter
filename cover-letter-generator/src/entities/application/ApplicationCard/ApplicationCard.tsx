import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import s from './ApplicationCard.module.css';
import type { CoverLetter } from '../model/types';

interface Props {
  data: CoverLetter;
  renderDeleteButton: (id: string) => React.ReactNode;
}

export const ApplicationCard = ({ data, renderDeleteButton }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(data.generatedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`${s.card} ${isExpanded ? s.cardExpanded : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`${s.previewWrapper} ${isExpanded ? s.expanded : ''}`}>
        <p className={s.previewText}>{data.generatedText}</p>
      </div>

      <div className={s.footer}>
        <div onClick={(e) => e.stopPropagation()}>
          {renderDeleteButton(data.id)}
        </div>

        <button
          className={`${s.actionBtn} ${isCopied ? s.copySuccess : ''}`}
          onClick={handleCopy}
        >
          {isCopied ? (
            <>
              Copied! <Check size={14} />
            </>
          ) : (
            <>
              Copy to clipboard <Copy size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
