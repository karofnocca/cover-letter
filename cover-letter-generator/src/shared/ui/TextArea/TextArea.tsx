import s from './TextArea.module.css';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isError?: boolean;
}

export const TextArea = ({ label, isError, ...props }: Props) => {
  return (
    <div className={s.wrapper}>
      <label className={s.label}>
        {label}
        {props.required && <span className={s.asterisk}>*</span>}
      </label>

      <textarea
        className={`${s.textarea} ${isError ? s.errorBorder : ''}`}
        {...props}
      />
    </div>
  );
};
