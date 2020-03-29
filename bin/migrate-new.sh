#!/bin/bash
migrate create $1 \
  --migrations-dir 'src/migrate/history' \
  --template-file 'src/migrate/template.ts' \
  --store='./dist/migrate/store'
