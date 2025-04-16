#!/bin/bash

DB_FILE="/app/data/database.sqlite3"
MIGRATIONS_DIR="./migrations"

# Create the DB file if it doesn't exist
touch $DB_FILE

# Apply each .sql migration in order
for file in $(ls $MIGRATIONS_DIR/*.sql | sort); do
  echo "Applying migration: $file"
  sqlite3 $DB_FILE < "$file"
done

echo "All migrations applied. Starting interactive sqlite3 shell."
exec sqlite3 $DB_FILE
