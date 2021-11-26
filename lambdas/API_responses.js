const Responses ={
    _200(data = {}){
        return{
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow_Methods': '*',
                'Acces-Control-Allow_Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify(data)
        }
    },
    _400(data = {}){
        return{
            headers: {
                'Content-Type': 'application/json',
                'Acces-Control-Allow_Methods': '*',
                'Acces-Control-Allow_Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify(data)
        }
    }
}

module.exports = Responses;