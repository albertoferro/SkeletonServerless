
const S3 = require('../common/S3')
const Responses = require('../common/API_responses');

const bucket = process.env.bucketName;

exports.handler = async (event) => {
    console.log('event receive', event)

    if(!event.pathParameters || !event.pathParameters.fileName){
        // fails whiout ID
        return Responses._400({message: 'missisng the fileName from the path'})
    }

    let fileName = event.pathParameters.fileName;

    const data =  JSON.parse(event.body)

    const newData = await S3.write(data, fileName, bucket). catch( error => {
        console.log("error in bucket write: ", error);
        return null;
    })

    if (!newData){
        return Responses._400({message: 'faild to write data by fileName'})
    }

    return Responses._200({ newData })
    
}
