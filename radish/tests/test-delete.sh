#!/bin/bash

# Check if key is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <key>"
    exit 1
fi

KEY=$1

# Send a DELETE request to delete the value for the given key
curl -X DELETE "http://localhost:3000/delete/$KEY"
    