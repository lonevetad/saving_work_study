echo $1
echo $2
echo $3
aws dynamodb get-item \
    --table-name $1 \
    --key "{\"$2\": {\"S\":\"$3\"}}" #le virgolette vanno messe OVUNQUE