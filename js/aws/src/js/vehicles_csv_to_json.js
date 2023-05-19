const fs = require("fs");
const { parse } = require("csv-parse");

const folderPath = "../../resources/"; 
const fileName = "vehicles__2023_05_19__18_24";

const parseOptions = {
    delimiter: ",",
    columns: true,
    ltrim: true,
  };

let data = [];
fs.createReadStream(folderPath + fileName + ".csv")
  .pipe(parse(parseOptions))
  .on("data", function (rowObj) {
    const newStatus = JSON.parse(rowObj.status);
    rowObj.status = {
        "odometer": newStatus.odometer.N,
        "unit": newStatus.unit.S
    };
    data.push(rowObj);
    console.log(rowObj);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("\n\n writing to file \n\n")
    
    fs.writeFile(
        folderPath + "all_vehicles.json", 
        JSON.stringify(data),
        (error) => {
            if(error){
                console.error(error);
                throw error;
            }
            console.log("data written correctly");
        }
    );
  })
;


// node vehicles_csv_to_json.js > ..\..\output\v_csv2json.txt