
// Import required AWS SDK clients and commands for Node.js
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

//import { ddbClient } from "./libs/ddbClient.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Set the AWS Region.
const REGION = "eu-west-1"; //e.g. "us-east-1"

const CREDENTIALS = {
    "accessKeyId": "ASIAZXJHP5Q27LIVYVMU",
    "secretAccessKey": "n9nNkFNuXamZeY+6qOfeQIoDOwsCURNYPnSr7/4R",
    "sessionToken": "IQoJb3JpZ2luX2VjEBsaCWV1LXdlc3QtMSJIMEYCIQCujvo+vD611Xy/qajcyZa7e/1VsW2THZ5hMKuuM01digIhAKJ0hG/vAJFRtUe7+P3CDfXs4TvnMQ2XDKM7cyIcpX76KoEDCEQQBBoMNjY4NDg3MTE3ODc3IgztJku5REgGZCDuafgq3gLA6Kat9gBFdHPoFL/rmk9QfjOOByF5etG9iN7aBIy0mp7lDv1nGdOa+/5ghbiRCbyQUNb/nX0hekQyHANscH1O1bA9TDlgFcNX8HoJ0KLKSYjwzKye/g4t8z3iFT2DC1LX2t9JC7+zYDIQgp+C3AV6a73noWUmGu4ZvQpTY/7HQKCmMlJmmJpqWwhvwZlAG1SynFlN0f93JCoRYj+UEoESjPqqKN6yowlaq/Ii+l2G0595Wi2VfSyR7nX0oAwC7G0u30rZBCOmChDk+ZLGcmBYtkHHYRdG4RWqJkDWuufef58gpkoFawAsk5Zl/5xtBsv5bRtyzCxRwwktNJrAXjRjZKCRwvUYESjTSJ2J8h18BOzkxF0fhmbaaaGROxfsmSAmuv67lJ4RF96/xO4QYJnh5XPpdpy86T8RyD87wK5q2BRpJNDTpAAxB6PVl9WgTLg2C4tdk/tnpB3BRxi90TCP5ZKjBjqlAV1WVON1VTeCb4xp3DUxm2d2s+oKOy0oCz1u2gl4sc5nU2iLejRgPv03gxYhSdwrW7zfWGM3+4GQjpDbv/dtla9GW+0tdg7trd3+L4l8o+f5BeM8dudIxKSOhISa4hROnjngC9o+Abs5R6gfGM8N+9ZXU90/rqq6SxuT6btZCMoa3fxkktmMOg98bDKbdEh75nn7H46RYbgATLunDSZ/FuAlHY+XSA=="
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
    }
];


function getItemTest(preferredIndex = undefined){
  if((!preferredIndex) && preferredIndex !== 0){
    preferredIndex =  Math.floor(Math.random()*ITEMS_TEST.length);
  }
  return ITEMS_TEST[preferredIndex];
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
  
    console.log("getting", JSON.stringify(getParams.Key), "...");
    const dataFetched = await ddbClient.send(new GetItemCommand(getParams));
    console.log("Success GET", dataFetched.Item);
    
    // Put a new Item
    const newWehicleData = {
      TableName: TABLE_NAME,
      Item: getItemTest()
    };
    const putResult = await ddbClient.send(new PutItemCommand(newWehicleData));
    console.log("\n\nResult PUT-ting", newWehicleData, "\n->", putResult);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
          "results": {
            "GET": dataFetched,
            "PUT": putResult
          }
        }),
    };
    return response;
};
