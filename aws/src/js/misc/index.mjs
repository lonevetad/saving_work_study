var Holidays = require('/opt/node_modules/date-holidays')
//import { Holidays } from "date-holidays";

const WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
    ];

export const handler = async(event, context, callback) => {
    console.log("START");
    console.log("event:", event);
    
    let country = 'IT';
    if(  event['Details'] ){
        const de =  event['Details'];
        let providedCountry = undefined;
        if(de['ContactData'] ){
            providedCountry = de['ContactData']['Attributes']['country'];
        }else if ( de['Parameters'] ){
            providedCountry = de['Parameters']['country'];
        }
        if(providedCountry){
            country = providedCountry;
        }
    }

    var hd = new Holidays(country);

    const today = new Date();
    const isHoliday = hd.isHoliday(today);
    
    const responseBody = {
            "isHoliday": isHoliday,
            "dayOfWeek": WEEK_DAYS[today.getDay()]
        };

    if(callback){
        callback(null, responseBody);
    }

    return responseBody;
};
