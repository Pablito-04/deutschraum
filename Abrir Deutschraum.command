#!/bin/zsh
set -e
cd -- "$(dirname -- "$0")"
if ! command -v node >/dev/null 2>&1; then
  print 'Instala Node.js 22.12 o posterior y vuelve a abrir este archivo.'
  read '?Pulsa Intro para cerrar.'
  exit 1
fi
if [ ! -d node_modules ]; then
  npm ci
fi
npm run dev -- --open
