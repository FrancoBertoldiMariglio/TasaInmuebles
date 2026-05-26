-- ============================================================================
-- Revoke EXECUTE en funciones que SOLO se usan como triggers.
-- Cierra warnings del linter: *_security_definer_function_executable.
-- No las dejamos llamables vía /rest/v1/rpc porque no tienen razón de
-- exponerse — sólo Postgres las llama internamente desde los triggers.
-- ============================================================================

begin;

revoke execute on function public.create_unipersonal_for_tasador() from public, anon, authenticated;
revoke execute on function public.enforce_tasador_exclusividad()    from public, anon, authenticated;
revoke execute on function public.handle_updated_at()               from public, anon, authenticated;

commit;
