
// Import required AWS SDK clients and commands for Node.js
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

//import { ddbClient } from "./libs/ddbClient.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"

const CREDENTIALS = {
    "accessKeyId": "ASIAZXJHP5Q2QGOAT4U4",
    "secretAccessKey": "yLPnT5Ly6HOhgN8Z/UT9fY4KmCozZ+5bpGcwlz7o",
    "sessionToken": "IQoJb3JpZ2luX2VjEDEaCWV1LXdlc3QtMSJHMEUCICZZyywv3zVTehHFO/QKyIm/ok1JL6AfIGTkSRmX4qj0AiEAsC6O80qE4ADJNm8CrpWEVaTq9J6F6MGrkyfNkglUDKEqgQMIWhAEGgw2Njg0ODcxMTc4NzciDBwXuP6V5b94nutwKCreArIs8IHYbG9S0+FPORxlHoxxzfhKGSRox9XrSQ1jvTwS4ieUSI6X7LBgyD5D7d7W+pr6HDF14AjPFQ7YrNy1mJ1VSGfkivd7rbjXCwpm+i6Du7rowOg4M5VijekvgUG04wpHfw3gRFkK7TdtiBEO5ubnoX79dFid4utU1D/PqM5XpbjJzvIx/d6trbHR6wuDiPj8jg9kpmKzb0PayRyMeUV73UjqxeJ3MfvxLhJv5jeMvxCrwHmOehPoAiIEoiAJUFkCkyTxbkj6/Fges6YXZpm0ju9SVnf25akNFnsXp3UCBF0/zbtfo58KBcPnxjzER8f35pV9NcWHd2E+oPgZoMbLc3VmmN6e7rdk3kfvnJqx9dOTUxf91r368tnbnCLnoQSJAz4hPhzdLI3GmN6nYhUBBZoYMZ3ZHhzFgtpeNK4+fvBX+ZM19mbYRX+MpfeJ7c01JFSyOdH7itVNM/XhMIHJl6MGOqYBPhl9IosBzVAa21IN3vNn+CCuWH9W2LV0NCC6oBXGda/Xp+1d7wj9RG7AnPg7TdIHALdiOdXib44bH9Dm36hk9bfQ4J8B/yDYja67E5HNu3/kc8cvCPjM7Pcw1krr/1cqGn48Sx86+remNAvlDswc7VdKm+dMFt/X4scUYk0p3f/gEJOn1I0R2jjhKy6OXqZJ9fuKcAsUaTya3Bq18o3TfXlQPup9Pw=="
};

const TABLE_NAME = "vehicles_MarcoOttina";

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: CREDENTIALS
});
//export { ddbClient };



export const ITEMS_TEST = [
    {
        "vin": { "S": "2MYCS23F62A665492"},
        "maker": { "S": "Audi"},
        "brand": { "S": "Audi"},
        "model": { "S": "R6"},
        "plate": { "S": "AU111DI"},
        "color": { "S": "GreenRich"},
        "status": { "M": {
                "odometer": { "N": "0"},
                "unit": { "S": "km"}
            }
        }
    },
    {
        "vin": { "S": "1NXBR12E51Z554381"},
        "maker": { "S": "FCA"},
        "brand": { "S": "Fiat"},
        "model": { "S": "Punto"},
        "plate": { "S": "EZ610AB"},
        "color": { "S": "Blue"},
        "status": { "M": {
                "odometer": { "N": "88"},
                "unit": { "S": "km"}
            }
        }
    },
    {
        "vin": { "S": "1NXBR12E51Z554382" },
        "maker": { "S": "FCA" },
        "brand": { "S": "Fiat" },
        "model": { "S": "Supersportiva" },
        "plate": { "S": "FF888MN" },
        "color": { "S": "RossoFerrari" },
        "status": { "M": {      
                "odometer": {"N": "1024"},
                "unit": {"S": "km"}
            }
        }
    },
    {
        "vin": { "S": "1NXBR12E51Z554383" },
        "maker": { "S": "FCA" },
        "brand": { "S": "Fiat" },
        "model": { "S": "Panda" },
        "plate": { "S": "AA001BB" },
        "color": { "S": "Bianco" },
        "status": { "M": {      
                "odometer": {"N": "256000"},
                "unit": {"S": "km"}
            }
        }
    },
    {
        "vin": { "S": "1NXBR12E51Z554384" },
        "maker": { "S": "FCA" },
        "brand": { "S": "Fiat" },
        "model": { "S": "Panda" },
        "plate": { "S": "AA001BC" },
        "color": { "S": "Green" },
        "status": { "M": {      
                "odometer": {"N": "256000"},
                "unit": {"S": "km"}
            }
        }
    },
    {
        "vin": { "S": "1NXBR12E51Z554385" },
        "maker": { "S": "FCA" },
        "brand": { "S": "Fiat" },
        "model": { "S": "Panda" },
        "plate": { "S": "AC001BB" },
        "color": { "S": "GrigioTopo" },
        "status": { "M": {      
                "odometer": {"N": "128000"},
                "unit": {"S": "km"}
            }
        }
    },
    {
        "vin": { "S": "1NXBR12E51Z554386" },
        "maker": { "S": "BUG" },
        "brand": { "S": "Bugatti" },
        "model": { "S": "Veyron" },
        "plate": { "S": "BU001Ga" },
        "color": { "S": "Opal" },
        "status": { "M": {      
                "odometer": {"N": "7"},
                "unit": {"S": "km"}
            }
        }
    }
];


function getItemTest(preferredIndex = undefined){
  if((!preferredIndex) && preferredIndex !== 0){
    preferredIndex =  Math.floor(Math.random()*ITEMS_TEST.length);
  }
  return ITEMS_TEST[preferredIndex];
}

function getItemToPush(event, preferredIndex = undefined){
    const vehicleDataRaw = event.newWehicleData;
    if(!vehicleDataRaw){
        return getItemTest(preferredIndex);
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

export const handler = async(event, context) => {
    console.log("event:", event);
    console.log("context:", context);
  
  
    // Set the parameters
    const getParams = {
      TableName: TABLE_NAME,
      Key: {
        "vin": { "S": ITEMS_TEST[2].vin.S },
      },
      // ProjectionExpression: "ATTRIBUTE_NAME",
    };
    if(! (event.vehicleKeyQuery)){
        getParams.Key.vin.S = event.vehicleKeyQuery;
    }
  
    const dataFetched = await ddbClient.send(new GetItemCommand(getParams));
    
    // Put a new Item
    const newVehicleData = {
      TableName: TABLE_NAME,
      Item: getItemToPush(event)
    };
    const putResult = await ddbClient.send(new PutItemCommand(newVehicleData));

    const response = {
        statusCode: 200,
        body: //JSON.stringify(
            {
              "results": {
                "GET": dataFetched,
                "PUT": putResult
              }
            }
        //),
    };
    return response;
};
