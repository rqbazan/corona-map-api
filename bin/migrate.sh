#!/bin/bash
npx --node-arg '-r dotenv/config' migrate $* --migrations-dir 'dist/migrations' --store='./dist/config/migration-store'
