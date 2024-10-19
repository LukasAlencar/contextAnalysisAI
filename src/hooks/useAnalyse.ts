import { useState } from 'react';
import { SentimentProps, analyse } from '../services/api';

interface AnalisarResult {
  data: SentimentProps | null;
  loading: boolean;
  error: string | null; // Store error messages as strings
  handleAnalisar: (text: string, context: string) => Promise<void>;
}

export function useAnalyse(): AnalisarResult {
  const [data, setData] = useState<SentimentProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let err: Error | null;

  const handleAnalisar = async (text: string, context: string) => {
    setLoading(true);
    try {
      const response = await analyse(text, context);
      // Validate the response data if necessary
      // if (response && typeof response === 'string') {
      setData(response);
      // } else {
      //   setError('Invalid API response');
      // }
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message || 'An error occurred'); // Provide a more informative error message
        }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleAnalisar };
}