required_vars=("ESS_PORT" "ESS_EMAIL" "ESS_PASS")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Environment variable $var is not set."
        exit 1
    fi
done

node dist/app.js $ESS_PORT ./templates.json $ESS_EMAIL $ESS_PASS