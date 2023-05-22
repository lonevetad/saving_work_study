
// Import required AWS SDK clients and commands for Node.js
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

//import { ddbClient } from "./libs/ddbClient.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"

const TABLE_NAME = "vehicles_MarcoOttina";

// Create an Amazon DynamoDB service client object.
const DDB_CLIENT = new DynamoDBClient({
  region: REGION,
  //credentials: CREDENTIALS // TODO : should them be explicited?
});


async function executeGETVehicle(ddbClient, event, context){
    let operationResult = undefined;
    let codeResponse = 500;
    
    if(!(event.pathParameters && event.pathParameters.vin) ){
        operationResult = {
            'errorMsg':
                'event.pathParameters or .vin are not well defined',
            'whatIGot': {
                'event.pathParameters': event.pathParameters,
                'event.pathParameters.vin': event.pathParameters ? event.pathParameters.vin : null
            }
        };
        return {
            operationResult,
            codeResponse
        };
    }
    
    const vehicleID = event.pathParameters.vin; // event.vin || ITEMS_TEST[2].vin.S;
    console.log("reading vehicle with VIN:", vehicleID);
    
    const getParams = {
        TableName: TABLE_NAME,
        Key: {
            "vin": { "S": vehicleID },
        },
        // ProjectionExpression: "ATTRIBUTE_NAME",
    };
    
    const dataFetched = await ddbClient.send(new GetItemCommand(getParams));
    console.log("data read:", dataFetched);
    operationResult = dataFetched.Item;
    codeResponse = 200;
            
    return {
        "operationResult": operationResult,
        "codeResponse": codeResponse
    };
}



function getItemToPush(event){
    let vehicleDataRaw = 
        event.newWehicleData ||
             JSON.parse(event.body).newVehicleData
        ;
        
    if(!vehicleDataRaw){
        return undefined;
    }
    
    return {
        "vin": { "S": vehicleDataRaw.vin },
        "maker": { "S": vehicleDataRaw.maker },
        "brand": { "S": vehicleDataRaw.brand },
        "model": { "S": vehicleDataRaw.model },
        "plate": { "S": vehicleDataRaw.plate },
        "color": { "S": vehicleDataRaw.color },
        "status": { "M": {      
                "odometer": {"N": vehicleDataRaw.status.odometer.toString() },
                "unit": {"S": vehicleDataRaw.status.unit }
            }
        }
    }
}
async function executePUTNewVehicle(ddbClient, event, context){
    let operationResult = undefined;
    let codeResponse = 500;
    
    const newVehicle = getItemToPush(event);
    if(! newVehicle){
        return {
            "operationResult": {
                "note": "No vehicle data found",
                'whatIGot': {
                    'event': event,
                    'context': context
                }
            },
            "codeResponse": 412
        };
    }
    
    const newVehicleData = {
        TableName: TABLE_NAME,
        Item: newVehicle
    };
    
    const putResult = await ddbClient.send(new PutItemCommand(newVehicleData));
    operationResult = putResult;
    codeResponse = putResult ? 200 : 503;
    
    return {
        "operationResult": operationResult,
        "codeResponse": codeResponse
    };
}


function getMethod(event, context){
    return event.httpMethod ||
        ( (context.requestContext && context.requestContext.httpMethod) ? context.requestContext.httpMethod : undefined);
}



export const handler = async(event, context) => {
    let operationResult = undefined;
    let codeResponse = 502;
    
    console.log("I'VE GOT\nevent:\n", JSON.stringify(event));
    console.log("context:", context);
    
    const httpMethod = getMethod(event, context);
    const ddbClient = DDB_CLIENT; // TODO : should be created each time?
    
    switch (httpMethod) {
        case 'read':
        case 'GET': {
            const resp = await executeGETVehicle(ddbClient, event, context);
            operationResult = resp.operationResult;
            codeResponse = resp.codeResponse;
            break;
        }
        case 'create':
        case 'PUT': {
            const resp = await executePUTNewVehicle(ddbClient, event, context);
            operationResult = resp.operationResult;
            codeResponse = resp.codeResponse;
            
            if(codeResponse !== 200){
                operationResult = {
                  "note": "PUT gone bad",
                  "old_response": JSON.stringify(
                    operationResult ? operationResult : {'whatIGot': { 'event': event, 'context': context }}
                    )
                };
                console.error("PUT ERROR:", operationResult);
            }
            break;
        }
        default:{
            operationResult = { 'errorMsg': 'Unknown httpMethod: ' + httpMethod,
                'extra_note': {
                    "more_error_msg": "I'm a quantum-rendered teapot",
                    "more_error_code": 418
                },
                'whatIGot': {
                    'event': event,
                    'context': context
                }
            };
            codeResponse = 501;
        }
    }
    //
  
    return {
        statusCode: codeResponse,
        body: JSON.stringify(operationResult)
    };
};
