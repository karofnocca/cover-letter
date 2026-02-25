import s from './PageLoader.module.css';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={`${s.wrapper} ${className || ''}`}>
      <div className={s.spinner} />
      <span className={s.text}>Loading application...</span>
    </div>
  );
};
