echo $1
aws dynamodb create-table --table-name $1 --profile 668487117877_SSOStormITAdmin > "output/$1.txt"
