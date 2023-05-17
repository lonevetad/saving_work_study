echo $1
echo $2
echo $3
echo $4
aws dynamodb put-item \
    --table-name $1 \
    --item "file://../../resources/v$2_i-ddb.json" \
    --condition-expression "attribute_not_exists($3)" \
    --region $4
