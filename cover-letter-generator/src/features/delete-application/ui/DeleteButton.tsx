import { Trash2 } from 'lucide-react';
import s from './DeleteButton.module.css';

interface Props {
  id: string;
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: Props) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this letter?')) {
      onClick();
    }
  };

  return (
    <button className={s.deleteBtn} onClick={handleDelete}>
      <Trash2 size={16} className={s.icon} />
      Delete
    </button>
  );
};
