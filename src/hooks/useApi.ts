
import { useState, useEffect, useCallback } from 'react';

type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

// Hook personnalisé pour gérer les appels API avec état de chargement, erreurs, etc.
export function useApi<T>(apiFunction: (...args: any[]) => Promise<T>, options?: UseApiOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  // Fonction pour appeler l'API
  const execute = useCallback(async (...args: any[]) => {
    setStatus('loading');
    try {
      const result = await apiFunction(...args);
      setData(result);
      setStatus('success');
      setError(null);
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setStatus('error');
      if (options?.onError) {
        options.onError(error);
      }
      throw error;
    }
  }, [apiFunction, options]);

  // États dérivés pour plus de commodité
  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return {
    data,
    status,
    isLoading,
    isSuccess,
    isError,
    error,
    execute
  };
}

// Hook pour exécuter automatiquement l'appel API au chargement du composant
export function useApiEffect<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  deps: any[] = [],
  options?: UseApiOptions<T> & { args?: any[] }
) {
  const { execute, ...rest } = useApi<T>(apiFunction, options);

  useEffect(() => {
    execute(...(options?.args || []));
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...rest, refetch: execute };
}

export default useApi;
