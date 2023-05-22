
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
    const SATURDAY_INDEX = 6; // or "0"?
    const SUNDAY_INDEX = SATURDAY_INDEX + 1;
    
    
    export const handler = async(event, context, callback) => {
        console.log("event:", event);
        
        const valueTest = event.Details ? event.Details.Parameters.test : "NotAValue";
        let date_ob = new Date();
        const dayOfWeekIndex = date_ob.getDay(); // one-based
        const dayOfWeek = WEEK_DAYS[dayOfWeekIndex];
        const isWeekend = (dayOfWeekIndex == 0) || (dayOfWeekIndex == SATURDAY_INDEX) || (dayOfWeekIndex == SUNDAY_INDEX);
        
        const responseBody = {
                "valueTest": valueTest,
                "altro": "CIAOIOOOOOO",
                "dayOfWeek": dayOfWeek,
                "dayOfWeekIndex": dayOfWeekIndex,
                "isWeekend": isWeekend,
            };
        
        // TODO implement
        const response = {
            statusCode: 200,
            body: JSON.stringify(responseBody),
            bodyObj: responseBody
        };
        
        if(callback){
            callback(null, responseBody);
        }
        
        // role: mOttina_connect_holy_days
        return response.bodyObj;
    };
    