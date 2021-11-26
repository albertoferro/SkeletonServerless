
const Responses = require('./API_responses')
exports.handler = async (event) => {
    console.log('event receive', event)

    if(!event.pathParameters || !event.pathParameters.ID){
        // fails whiout ID
        return Responses._400({message: 'missisng the ID from the path'})
    }

    let ID = event.pathParameters.ID;

    if(data[ID]){
        // rerurn data
        return Responses._200(data[ID])
    }

    //failed as ID is not in the data
    return Responses._400({message: 'no ID in data'})
}

const data = {
    1234: { name: 'alberto', age: '38'},
    4321: { name: 'ferro', age: '38'}
}