interface GenerateData {
  jobTitle: string;
  company: string;
  skills: string;
  details: string;
}

export const fetchAICompletion = async (data: GenerateData) => {
  // const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  await new Promise((resolve) => setTimeout(resolve, 2500));

  /**
   * тут запрос в ИИШке
   */
  /*
  if (apiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `Generate cover letter for ${data.jobTitle}` }],
        }),
      });
      if (response.ok) {
         const aiData = await response.json();
         return aiData.choices[0].message.content;
      }
    } catch (e) {
      console.error("AI fetch failed, falling back to template");
    }
  }
  */

  const template = `Dear ${data.company || '[Company]'} Team,

I am writing to express my interest in the ${data.jobTitle || '[Job Title]'} position.

My experience in the realm combined with my skills in ${data.skills || '[Skills List]'} make me a strong candidate for this role.

${data.details || ''}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`;

  return template;
};
