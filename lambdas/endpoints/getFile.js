
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

    const file = await S3.get(fileName, bucket). catch( error => {
        console.log("error in bucket get: ", error);
        return null;
    })

    if (!file){
        return Responses._400({message: 'faild to get data by fileName'})
    }

    return Responses._200({ file })
    
}
