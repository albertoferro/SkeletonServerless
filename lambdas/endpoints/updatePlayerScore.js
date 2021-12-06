
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

    const user =  JSON.parse(event.body);
    const {score} = user;

    const newUser = await Dynamo.update({tableName, primaryKey: 'ID', primaryKeyValue: ID, updateKey: 'score', updateValue: score}).catch( error => {
        console.log("error in dynamo update: ", error);
        return null;
    })

    if (!newUser){
        return Responses._400({message: 'faild to write user by ID'})
    }

    return Responses._200({ newUser })
    
}
