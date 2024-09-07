import { useEffect, useState, useCallback, useRef } from 'react';

type UseFetchProps<T> = {
  getData: (id: string, signal: AbortSignal) => Promise<T>;
  id: string;
};

type UseFetchResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const useFetchID = <T,>({ getData, id }: UseFetchProps<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const maxRetries = 3;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    let attempts = 0;
    let success = false;

    while (attempts < maxRetries && !success) {
      try {
        const fetchedData = await getData(id, signal);
        setData(fetchedData);
        success = true;
      } catch (err) {
        attempts += 1;
        if (attempts >= maxRetries) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      }
    }

    setIsLoading(false);
  }, [getData, id]);

  useEffect(() => {
    fetchData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch };
};

export default useFetchID;
