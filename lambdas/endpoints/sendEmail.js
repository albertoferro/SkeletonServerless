
const Responses = require('../common/API_responses');
const AWS = require('aws-sdk');
const { _200 } = require('../common/API_responses');

const SES = new AWS.SES();

exports.handler = async (event) => {
    console.log('event receive', event);

    const { to, from, subject, text } = JSON.parse(event.body);

    if (!to || !from || !subject || !text){
        return Responses._400({ message: "to, from subject and text is required in the body"} );
    }

    const params ={
        Destination: {
            ToAddresses: [ to ]
        },
        Message: {
            Body: {
                Text: { Data: text }
            },
            Subject: { Data: subject }
        },
        Source: from
    }

    try{
        await SES.sendEmail(params).promise()
        return Responses-_200({});
    }catch(error){
        console.log('Error sending Email: ', error);
        return Responses._400({ message: "The email fialed to send"})
    }
}