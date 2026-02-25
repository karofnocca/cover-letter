import { useState } from 'react';
import { fetchAICompletion } from '../../../shared/api/openai';
import { useApplicationStore } from '../../../entities/application/model/store';

export interface GenerateFormData {
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
}

export const useGenerateLetter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const addApplication = useApplicationStore((s) => s.addApplication);

  const generate = async (formData: GenerateFormData) => {
    if (!formData.jobTitle || !formData.company) return;

    setIsLoading(true);
    try {
      const text = await fetchAICompletion(formData);
      setResultText(text);

      addApplication({
        id: Date.now().toString(),
        ...formData,
        generatedText: text,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, resultText, setResultText };
};
