#!/bin/bash
migrate $* \
  --migrations-dir './dist/migrate/history' \
  --store='./dist/migrate/store' \
  --env
