import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronDown } from 'lucide-react';
import { useApplicationStore } from '../../../entities/application/model/store';
import { ApplicationCard } from '../../../entities/application/ApplicationCard/ApplicationCard';
import { GoalBanner } from '../../../widgets/GoalBanner/ui/GoalBanner';
import { DeleteButton } from '../../../features/delete-application/ui';
import s from './DashboardPage.module.css';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const { current, archive, deleteApplication } = useApplicationStore();

  const handleCreateNew = () => {
    navigate('/create', { state: { shouldFocus: true } });
  };

  const splitIntoColumns = (items: typeof current) => {
    const left = items.filter((_, idx) => idx % 2 === 0);
    const right = items.filter((_, idx) => idx % 2 !== 0);
    return { left, right };
  };

  const renderColumn = (items: typeof current, type: 'current' | 'archive') => (
    <div className={s.column}>
      {items.map((app) => (
        <ApplicationCard
          key={app.id}
          data={app}
          renderDeleteButton={(id) => (
            <DeleteButton
              id={id}
              onClick={() => deleteApplication(id, type)}
            />
          )}
        />
      ))}
    </div>
  );

  const hasAnyLetters = current.length > 0 || archive.length > 0;
  const currentCols = splitIntoColumns(current);
  const archiveCols = splitIntoColumns(archive);

  return (
    <div className={s.page}>
      <div className={s.header}>
        <h1 className={s.title}>Applications</h1>
        {hasAnyLetters && (
          <button className={s.createBtn} onClick={handleCreateNew}>
            <Plus size={18} />
            <span>Create New</span>
          </button>
        )}
      </div>

      {current.length > 0 && (
        <section className={s.section}>
          <h2 className={s.sectionLabel}>Current Batch ({current.length}/5)</h2>
          <div className={s.grid}>
            {renderColumn(currentCols.left, 'current')}
            {renderColumn(currentCols.right, 'current')}
          </div>
        </section>
      )}

      {current.length < 5 && (
        <div className={current.length > 0 ? s.bannerMargin : ''}>
          <GoalBanner />
        </div>
      )}

      {archive.length > 0 && (
        <section className={s.section}>
          <button
            className={s.archiveToggle}
            onClick={() => setIsArchiveOpen(!isArchiveOpen)}
          >
            <h2 className={s.sectionLabel}>Archive ({archive.length})</h2>
            <ChevronDown
              size={18}
              className={`${s.chevron} ${isArchiveOpen ? s.chevronRotate : ''}`}
            />
          </button>

          {isArchiveOpen && (
            <div className={s.grid}>
              {renderColumn(archiveCols.left, 'archive')}
              {renderColumn(archiveCols.right, 'archive')}
            </div>
          )}
        </section>
      )}
    </div>
  );
};