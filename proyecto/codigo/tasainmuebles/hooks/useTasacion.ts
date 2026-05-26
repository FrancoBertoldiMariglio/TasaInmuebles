import { useEffect, useState } from 'react';
import {
  fetchTasacionById,
  TasacionConSolicitante,
} from '@/lib/queries/tasaciones';

export function useTasacion(id: string | undefined) {
  const [tasacion, setTasacion] = useState<TasacionConSolicitante | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTasacionById(id);
        if (!cancelled) setTasacion(data);
      } catch (e) {
        if (!cancelled) setError(e as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { tasacion, loading, error };
}
