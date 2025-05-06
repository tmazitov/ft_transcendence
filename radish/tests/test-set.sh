#!/bin/bash

# Check if key and value are provided, and optionally expire
if [ "$#" -lt 2 ] || [ "$#" -gt 3 ]; then
    echo "Usage: $0 <key> <value> [expire]"
    exit 1
fi

KEY=$1
VALUE=$2
EXPIRE=$3

# Construct the JSON body
if [ -z "$EXPIRE" ]; then
    JSON_BODY="{\"value\":\"$VALUE\"}"
else
    JSON_BODY="{\"value\":\"$VALUE\", \"expire\":$EXPIRE}"
fi

# Send a POST request with the key, value, and optionally expire in the JSON body
curl -X POST -H "Content-Type: application/json" \
    -d "$JSON_BODY" \
    "http://localhost:3000/set/$KEY"