import { useState, useCallback } from 'react';

type UseDeleteResult = {
  deleteItem: (deleteFunction: (id: string) => Promise<boolean>, id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
};

const useDelete = (): UseDeleteResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = useCallback(async (deleteFunction: (id: string) => Promise<boolean>, id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await deleteFunction(id);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteItem, isLoading, error };
};

export default useDelete;
