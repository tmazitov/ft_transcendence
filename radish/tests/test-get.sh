#!/bin/bash

# Check if key is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <key>"
    exit 1
fi

KEY=$1

# Send a GET request to retrieve the value for the given key
curl -X GET "http://localhost:5100/get/$KEY"
