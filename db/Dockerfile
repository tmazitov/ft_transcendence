FROM alpine:latest

# Install sqlite3 and bash
RUN apk add --no-cache sqlite sqlite-libs bash

# Set workdir
WORKDIR /app

# Copy migrations and entrypoint script
COPY migrations/ ./migrations/
COPY entrypoint.sh .

# Make script executable
RUN chmod +x entrypoint.sh

# Run script
ENTRYPOINT ["./entrypoint.sh"]
