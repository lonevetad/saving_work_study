import json
from datetime import date
import holidays

def lambda_handler(event, context):
    print("event:", event)
    
    country = 'IT'
    if 'Details' in event:
        de = event['Details']
        provided_country = None
        if('ContactData' in de):
            attr = de['ContactData']['Attributes']
            if 'country' in attr:
                provided_country = attr['country']
        
        if provided_country is None and 'Parameters' in de:
            par = de['Parameters']
            if 'country' in par:
                provided_country = par['country']
        
        if provided_country is not None:
            country = provided_country
            
    current_holidays = holidays.country_holidays(country)

    today = date.today()
    print("Today date is: ", today)
    
    isHoliday = today in current_holidays

    return {
        'dayOfWeek': today.weekday(),
        'isHoliday': isHoliday
    }
