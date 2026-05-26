#!/usr/bin/env bash
# Wrapper de psql contra la DB remota.
#
# Uso:
#   ./query.sh "select count(*) from tasaciones"
#   ./query.sh -f some_script.sql
#   echo "select now()" | ./query.sh
#   ./query.sh                              # modo interactivo (psql REPL)
#
# Requiere DATABASE_URL en .env (Dashboard → Settings → Database → Connection string).
# Por defecto usa la cuenta postgres del pooler (mode "session").

source "$(dirname "$0")/_lib.sh"
load_env

if [[ $# -eq 0 ]]; then
  # Stdin pipe → psql ejecuta lo que venga
  if [[ ! -t 0 ]]; then
    psql_query -X
  else
    # Sin args + stdin tty → modo REPL
    info "Conectando a la DB en modo interactivo (Ctrl-D para salir)…"
    psql_query
  fi
elif [[ "$1" == "-f" ]]; then
  shift
  psql_query -X -f "$1"
else
  psql_query -X -c "$*"
fi
