import { useState, useCallback, useEffect, useRef } from 'react';

type UseFetchProps<T> = {
  getData: (signal?: AbortSignal) => Promise<T[]>;
  retries?: number;
  timeout?: number;
  requestDelay?: number;
  autoRefreshInterval?: number;
  enableAutoRefresh?: boolean;
};

type FetchError = {
  message: string;
  status?: number;
};

type UseFetchWithRetryOut<T> = {
  data: T[] | null;
  isLoading: boolean;
  error: FetchError | null;
  refetch: () => void;
};

function useFetchWithRetry<T>({
  getData,
  retries = 3,
  timeout = 5000,
  requestDelay = 1000,
  autoRefreshInterval = 30000,
  enableAutoRefresh = false,
}: UseFetchProps<T>): UseFetchWithRetryOut<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastFetchTimeRef = useRef<number>(0);

  const fetchData = useCallback(
    (attempt = 0, isRefetch = false) => {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchTimeout = setTimeout(() => {
        controller.abort();
      }, timeout);

      getData(signal)
        .then((result) => {
          clearTimeout(fetchTimeout);
          setData(result);
          setIsLoading(false);
          lastFetchTimeRef.current = Date.now();
        })
        .catch((error) => {
          clearTimeout(fetchTimeout);
          if (attempt < retries) {
            setTimeout(() => fetchData(attempt + 1, isRefetch), requestDelay);
          } else {
            setError({ message: error.message, status: error.status });
            setIsLoading(false);
          }
        });

      return () => {
        controller.abort();
        clearTimeout(fetchTimeout);
      };
    },
    [getData, requestDelay, retries, timeout],
  );

  const refetch = useCallback(() => {
    setError(null);
    fetchData(0, true);
  }, [fetchData]);

  useEffect(() => {
    const cleanup = fetchData(0, false);
    return cleanup;
  }, [fetchData]);

  useEffect(() => {
    if (!enableAutoRefresh) return;

    const intervalId = setInterval(() => {
      const timeSinceLastFetch = Date.now() - lastFetchTimeRef.current;
      if (timeSinceLastFetch >= autoRefreshInterval) {
        refetch();
      }
    }, autoRefreshInterval);

    return () => clearInterval(intervalId);
  }, [refetch, autoRefreshInterval, enableAutoRefresh]);

  return { data, error, isLoading, refetch };
}

export default useFetchWithRetry;
