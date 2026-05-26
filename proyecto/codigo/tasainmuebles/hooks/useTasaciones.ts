import { useCallback, useEffect, useState } from 'react';
import {
  fetchTasaciones,
  TasacionConSolicitante,
} from '@/lib/queries/tasaciones';

export function useTasaciones() {
  const [tasaciones, setTasaciones] = useState<TasacionConSolicitante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasaciones();
      setTasaciones(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { tasaciones, loading, error, refetch };
}
