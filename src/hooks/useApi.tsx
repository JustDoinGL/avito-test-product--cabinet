import { useState, useCallback, useEffect } from 'react';
import { AbortControllerManager } from 'utils/helpers/AbortControllerManager'; // Импортируем класс

type UseApiResult<T, R> = {
  execute: (apiFunction: (data: T, options?: { signal?: AbortSignal }) => Promise<R>, data: T) => Promise<R | null>;
  isLoading: boolean;
  error: string | null;
};

const useApi = <T, R>(): UseApiResult<T, R> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerManager = new AbortControllerManager();

  const execute = useCallback(
    async (apiFunction: (data: T, options?: { signal?: AbortSignal }) => Promise<R>, data: T): Promise<R | null> => {
      const signal = abortControllerManager.createController();

      setIsLoading(true);
      setError(null);

      const maxRetries = 3;
      let attempt = 0;

      while (attempt < maxRetries) {
        try {
          const result = await apiFunction(data, { signal });
          setIsLoading(false);
          return result;
        } catch (err) {
          attempt++;
          if (attempt >= maxRetries) {
            if (signal.aborted) {
              console.log('Request was aborted');
            }
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setIsLoading(false);
            return null;
          }
          console.log(`Attempt ${attempt} failed. Retrying...`);
        }
      }

      setIsLoading(false);
      return null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    return () => {
      abortControllerManager.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { execute, isLoading, error };
};

export default useApi;
