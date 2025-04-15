export $(grep -v '^#' .env | xargs)

ts-node src/app.ts 3000 ./templates.json $SMTP_EMAIL $SMTP_PASS 