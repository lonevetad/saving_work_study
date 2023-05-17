echo $1
aws dynamodb create-table \
    --profile 668487117877_SSOStormITAdmin \
    --table-name vehicles_MarcoOttina \
    --region eu-west-1 \
    --attribute-definitions \
        "[ \
            {\"AttributeName\":\"vin\", \"AttributeType\": \"S\"}, \
            {\"AttributeName\":\"maker\", \"AttributeType\": \"S\"}, \
            {\"AttributeName\":\"brand\", \"AttributeType\": \"S\"}, \
            {\"AttributeName\":\"model\", \"AttributeType\": \"S\"}, \
            {\"AttributeName\":\"plate\", \"AttributeType\": \"S\"}, \
            {\"AttributeName\":\"color\", \"AttributeType\": \"S\"}, \
            {\"AttributeName\":\"status\", \"AttributeType\": \"S\"} \
        ]" \
    --key-schema "[ { \"AttributeName\": \"vin\", \"KeyType\": \"HASH\" } ]" \
    --billing-mode PAY_PER_REQUEST 
    > "output/create_table__vehicles_MarcoOttina.txt"