import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import s from './EmptyState.module.css';

export const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className={s.banner}>
      <h2 className={s.title}>Hit your goal</h2>
      <p className={s.subtitle}>
        Generate and send out couple more job applications today to get hired
        faster
      </p>

      <button className={s.button} onClick={() => navigate('/create')}>
        <Plus size={18} />
        Create New
      </button>

      <div className={s.footer}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '24px',
                height: '4px',
                backgroundColor: '#E0E0E0',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>
        <span className={s.progressLabel}>0 out of 5</span>
      </div>
    </div>
  );
};
