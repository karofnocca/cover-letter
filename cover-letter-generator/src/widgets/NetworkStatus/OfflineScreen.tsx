import { WifiOff, RefreshCw } from 'lucide-react';
import s from './OfflineScreen.module.css';

export const OfflineScreen = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className={s.overlay}>
      <div className={s.content}>
        <div className={s.iconWrapper}>
          <WifiOff size={48} strokeWidth={1.5} />
        </div>
        <h1 className={s.title}>No Internet Connection</h1>
        <p className={s.text}>
          It looks like you're offline. Please check your connection to continue
          generating letters.
        </p>
        <button className={s.retryBtn} onClick={handleRetry}>
          <RefreshCw size={18} />
          Try again
        </button>
      </div>
    </div>
  );
};
