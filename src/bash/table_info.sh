echo $1
aws dynamodb describe-table --table-name $1 --profile 668487117877_SSOStormITAdmin > "output/$1.txt"
