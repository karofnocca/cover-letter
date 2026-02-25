import { forwardRef, type InputHTMLAttributes } from 'react';
import s from './TextField.module.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, isError, ...props }, ref) => (
    <div className={s.wrapper}>
      <label className={s.label}>
        {label}
        {props.required && <span className={s.asterisk}>*</span>}
      </label>
      <input
        ref={ref}
        className={`${s.input} ${isError ? s.errorBorder : ''}`}
        {...props}
      />
    </div>
  )
);
