import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

export type TasacionRow = Database['public']['Tables']['tasaciones']['Row'];
export type SolicitanteRow = Database['public']['Tables']['solicitantes']['Row'];

export type TasacionConSolicitante = TasacionRow & {
  solicitante: SolicitanteRow | null;
};

export async function fetchTasaciones(): Promise<TasacionConSolicitante[]> {
  const { data, error } = await supabase
    .from('tasaciones')
    .select('*, solicitante:solicitantes(*)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as TasacionConSolicitante[];
}

export async function fetchTasacionById(
  id: string,
): Promise<TasacionConSolicitante | null> {
  const { data, error } = await supabase
    .from('tasaciones')
    .select('*, solicitante:solicitantes(*)')
    .eq('id', id)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as unknown as TasacionConSolicitante;
}

export async function fetchTasacionByNumero(
  numero: number,
): Promise<TasacionConSolicitante | null> {
  const { data, error } = await supabase
    .from('tasaciones')
    .select('*, solicitante:solicitantes(*)')
    .eq('numero', numero)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as unknown as TasacionConSolicitante;
}
