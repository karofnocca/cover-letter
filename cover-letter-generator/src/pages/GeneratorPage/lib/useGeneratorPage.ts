import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fireConfetti } from '../../../shared/lib/confetti';
import { useApplicationStore } from '../../../entities/application/model/store';
import { useGenerateLetter } from '../../../features/generate-cover-letter/model';

export const useGeneratorPage = () => {
  const { current, archiveCurrentCycle } = useApplicationStore();
  const { generate, isLoading, resultText, setResultText } =
    useGenerateLetter();

  const [isCopied, setIsCopied] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const jobTitleRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    skills: '',
    details: '',
  });

  const isOverLimit = formData.details.length > 1200;

  const focusJobTitle = () => {
    jobTitleRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    jobTitleRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (location.state?.shouldFocus) {
      setTimeout(focusJobTitle, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
    if (resultText) {
      setResultText('');
    }
  };

  const handleGenerate = async () => {
    if (current.length >= 5) {
      const isConfirmed = window.confirm(
        'Вы сгенерировали 5 писем. Хотите отправить их в архив и начать новый круг?'
      );

      if (isConfirmed) {
        archiveCurrentCycle();
      } else {
        return;
      }
    }

    const newErrors = {
      jobTitle: !formData.jobTitle.trim(),
      company: !formData.company.trim(),
      skills: !formData.skills.trim(),
      details: !formData.details.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error) || isOverLimit) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    const willBeFifth = current.length === 4;

    await generate(formData);

    if (willBeFifth) {
      setTimeout(fireConfetti, 500);
    }
  };

  const handleCopy = async () => {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const displayTitle =
    [formData.jobTitle, formData.company].filter(Boolean).join(', ') ||
    'New application';
  const isTitleActive = !!(formData.jobTitle.trim() || formData.company.trim());

  return {
    formData,
    handleChange,
    handleGenerate,
    handleCopy,
    isLoading,
    resultText,
    isCopied,
    isShaking,
    errors,
    isOverLimit,
    displayTitle,
    jobTitleRef,
    focusJobTitle,
    isTitleActive,
    currentCount: current.length,
  };
};
