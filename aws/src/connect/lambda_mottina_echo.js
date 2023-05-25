export const handler = async(event) => {
    console.log("event:", event)
    
    if(  event['Details'] ){
        if(event['Details']['ContactData'] ){
            console.log("event['Details']['ContactData'].Attributes: ", event['Details']['ContactData'].Attributes);
        }
        console.log("event['Details']['Parameters']: ", event['Details']['Parameters']);
    }
    
    return event['Parameters'] || event['Details']['ContactData'].Attributes || event['Details']['Parameters'];
};
