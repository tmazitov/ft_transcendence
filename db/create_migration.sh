#!/bin/bash

# Prompt the user for the migration file name
read -p "Enter the migration file name: " filename

# Check if the filename is empty
if [[ -z "$filename" ]]; then
    echo "Filename cannot be empty."
    exit 1
fi

# Create the migrations directory if it doesn't exist
mkdir -p migrations

# Generate a timestamp
timestamp=$(date +"%Y%m%d%H%M%S")

# Create the migration file with the timestamp and name
migration_file="migrations/${timestamp}_${filename}.sql"

# Create an empty migration file
touch "$migration_file"

# Notify the user
echo "Migration file created: $migration_file"