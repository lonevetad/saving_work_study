var Holidays = require('date-holidays')
var hd = new Holidays('IT')

const holidays2023 = hd.getHolidays(2023);
console.log(holidays2023);
console.log(holidays2023.length, "holidays this year")

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const today = new Date();
const isHoliday = hd.isHoliday(today);
console.log("is holiday today (", today, ")?", isHoliday);

const nextSunday = today.addDays(4);
console.log("is", nextSunday, "an holiday?", hd.isHoliday(nextSunday));

if(isHoliday){
    for(const oKey in hd){
        const obj = hd[oKey];
        process.stdout.write(oKey);
        process.stdout.write("->",);
        try{
            console.log((obj !== hd) ? JSON.stringify(obj) : 'myself, but recursively');
        }catch(e){
            console.log("ops, inner recursion\n\t", e);
        }
    }
}

// mottinaHolidayChecker_01