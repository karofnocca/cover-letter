import { GoalBanner } from '../../../widgets/GoalBanner';
import { useGeneratorPage } from '../lib/useGeneratorPage';
import { GeneratorForm } from './components/GeneratorForm';
import { GeneratorPreview } from './components/GeneratorPreview';
import s from './GeneratorPage.module.css';

export const GeneratorPage = () => {
  const logic = useGeneratorPage();

  return (
    <div className={s.container}>
      <div className={s.layout}>
        <div className={s.formWrapper}>
          <h1
            className={`${s.pageTitle} ${logic.isTitleActive ? s.pageTitleActive : ''}`}
          >
            {logic.displayTitle}
          </h1>

          <GeneratorForm {...logic} />
        </div>
        <GeneratorPreview {...logic} />
      </div>

      <GoalBanner onInternalClick={logic.focusJobTitle} />
    </div>
  );
};
