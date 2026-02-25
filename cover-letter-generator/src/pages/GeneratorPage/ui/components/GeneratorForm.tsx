import { RotateCcw, Loader2 } from 'lucide-react';
import s from '../GeneratorPage.module.css';
import { TextField } from '../../../../shared/ui/TextField';
import { TextArea } from '../../../../shared/ui/TextArea';

interface GeneratorFormProps {
  formData: {
    jobTitle: string;
    company: string;
    skills: string;
    details: string;
  };
  errors: Record<string, boolean>;
  handleChange: (field: string, value: string) => void;
  handleGenerate: () => Promise<void>;
  isLoading: boolean;
  isOverLimit: boolean;
  resultText: string;
  isShaking: boolean;
  jobTitleRef: React.RefObject<HTMLInputElement | null>;
}

export const GeneratorForm = ({
  formData,
  errors,
  handleChange,
  handleGenerate,
  isLoading,
  isOverLimit,
  resultText,
  isShaking,
  jobTitleRef,
}: GeneratorFormProps) => {
  return (
    <section className={`${s.formSection} ${isShaking ? s.shake : ''}`}>
      <div className={s.formGrid}>
        <TextField
          label="Job title"
          ref={jobTitleRef}
          placeholder="Product manager"
          required
          isError={errors.jobTitle}
          value={formData.jobTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('jobTitle', e.target.value)
          }
        />
        <TextField
          label="Company"
          placeholder="Apple"
          required
          isError={errors.company}
          value={formData.company}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('company', e.target.value)
          }
        />
      </div>

      <TextField
        label="I am good at..."
        placeholder="Skills..."
        required
        isError={errors.skills}
        value={formData.skills}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange('skills', e.target.value)
        }
      />

      <div className={s.textAreaWrapper}>
        <TextArea
          label="Additional details"
          placeholder="Describe why you are a great fit..."
          required
          isError={errors.details || isOverLimit}
          value={formData.details}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange('details', e.target.value)
          }
        />
        <span className={`${s.charCounter} ${isOverLimit ? s.charFail : ''}`}>
          {formData.details.length}/1200
        </span>
      </div>

      <button
        className={`
          ${s.generateBtn} 
          ${resultText ? s.tryAgainBtn : ''} 
          ${isLoading ? s.loadingState : ''}
        `}
        onClick={handleGenerate}
        disabled={isLoading || isOverLimit}
      >
        {isLoading ? (
          <Loader2 className={s.btnSpinner} size={20} />
        ) : resultText ? (
          <>
            <RotateCcw size={18} /> Try Again
          </>
        ) : (
          'Generate Now'
        )}
      </button>
    </section>
  );
};
