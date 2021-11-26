
const Dynamo = require('../common/Dynamo')
const Responses = require('../common/API_responses');
const tableName = process.env.tableName;

exports.handler = async (event) => {
    console.log('event receive', event)

    if(!event.pathParameters || !event.pathParameters.ID){
        // fails whiout ID
        return Responses._400({message: 'missisng the ID from the path'})
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('Error in dynamoget', err)
        return null
    })

    if (!user){
        return Responses._400({message: 'faild to get user by ID'})
    }

    return Responses._200({ user })
    
}
