#!/bin/bash
migrate create $1 \
  --migrations-dir 'src/migrate/history' \
  --template-file 'src/migrate/template.js' \
  --store='./src/migrate/store'
