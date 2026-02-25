import { Copy, Check } from 'lucide-react';
import s from '../GeneratorPage.module.css';

interface GeneratorPreviewProps {
  isLoading: boolean;
  resultText: string;
  isCopied: boolean;
  handleCopy: () => void;
}

export const GeneratorPreview = ({
  isLoading,
  resultText,
  isCopied,
  handleCopy,
}: GeneratorPreviewProps) => (
  <section className={s.previewSection}>
    {isLoading ? (
      <div className={s.loaderWrapper}>
        <div className={s.spinner} />
        <p>AI is writing...</p>
      </div>
    ) : resultText ? (
      <div className={s.resultCard}>
        <div className={s.letterText}>{resultText}</div>
        <button
          className={`${s.copyBtn} ${isCopied ? s.copyBtnSuccess : ''}`}
          onClick={handleCopy}
        >
          {isCopied ? (
            <>
              Text copied! <Check size={16} />
            </>
          ) : (
            <>
              Copy to clipboard <Copy size={16} />
            </>
          )}
        </button>
      </div>
    ) : (
      <div className={s.emptyPreview}>
        Your personalized job application will appear here...
      </div>
    )}
  </section>
);
