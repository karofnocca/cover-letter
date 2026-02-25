import { Link, useNavigate } from 'react-router-dom';
import { House, Check } from 'lucide-react';
import s from './Header.module.css';
import { useApplicationStore } from '../../../entities/application/model/store';
import Logomark from '../../../shared/assets/icons/Logomark.svg';

export const Header = () => {
  const navigate = useNavigate();

  const { current } = useApplicationStore();
  const goal = 5;
  const isGoalAchieved = current.length >= goal;

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to="/" className={s.logo}>
          <div className={s.logoIcon}>
            <img src={Logomark} alt="" />
          </div>
          <span className={s.text}>Alt+Shift</span>
        </Link>

        <div className={s.rightSection}>
          <div className={s.progressInfo}>
            <span className={s.progressText}>
              {isGoalAchieved ? goal : current.length}/{goal} applications
              generated
            </span>
            {isGoalAchieved ? (
              <div className={s.checkCircle}>
                <Check size={12} strokeWidth={4} />
              </div>
            ) : (
              <div className={s.steps}>
                {[...Array(goal)].map((_, i) => (
                  <div
                    key={i}
                    className={`${s.step} ${i < current.length ? s.stepActive : ''}`}
                  />
                ))}
              </div>
            )}
          </div>
          <button className={s.iconButton} onClick={() => navigate('/')}>
            <House size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
