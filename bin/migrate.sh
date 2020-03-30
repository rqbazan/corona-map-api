#!/bin/bash
npx --node-arg '-r dotenv/config' \
  migrate $* \
    --migrations-dir './dist/migrate/history' \
    --store='./dist/migrate/store'
