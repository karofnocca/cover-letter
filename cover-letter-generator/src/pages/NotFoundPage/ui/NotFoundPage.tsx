import { useNavigate } from 'react-router-dom';
import s from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <h1 className={s.code}>404</h1>
      <p className={s.text}>Упс! Кажется, эта страница улетела в архив.</p>
      <button onClick={() => navigate('/')}>Вернуться на главную</button>
    </div>
  );
};
