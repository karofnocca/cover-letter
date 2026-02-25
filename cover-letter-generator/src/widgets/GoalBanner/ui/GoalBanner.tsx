import { Plus } from 'lucide-react';
import s from './GoalBanner.module.css';
import { useApplicationStore } from '../../../entities/application/model/store';
import { useNavigate, useLocation } from 'react-router-dom';

export const GoalBanner = ({
  onInternalClick,
}: {
  onInternalClick?: () => void;
}) => {
  const { current } = useApplicationStore();

  const goal = 5;
  const navigate = useNavigate();
  const location = useLocation();

  if (current.length >= goal) return null;

  const handleCreateClick = () => {
    if (location.pathname === '/create') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onInternalClick?.();
    } else {
      navigate('/create', { state: { shouldFocus: true } });
    }
  };

  return (
    <div className={s.banner}>
      <h2 className={s.title}>Hit your goal</h2>
      <p className={s.description}>
        Generate and send out couple more job applications to get hired faster
      </p>

      <button className={s.button} onClick={handleCreateClick}>
        <Plus size={18} />
        Create New
      </button>

      <div className={s.progressSection}>
        <div className={s.steps}>
          {[...Array(goal)].map((_, i) => (
            <div
              key={i}
              className={`${s.step} ${i < current.length ? s.stepActive : ''}`}
            />
          ))}
        </div>
        <span className={s.cycleCounter}>
          {current.length} out of {goal}
        </span>
      </div>
    </div>
  );
};
