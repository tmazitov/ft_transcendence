export $(grep -v '^#' .env | xargs)

ts-node src/app.ts $ESS_PORT ./templates.json $ESS_EMAIL $ESS_PASS 