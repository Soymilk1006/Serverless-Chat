'use strict';

var AWS = require('aws-sdk');

var dynamo = new AWS.DynamoDB();

exports.handler = function (event, context, callback) {
  dynamo.putItem(
    {
      TableName: event.tables.messages,
      Item: {
        Id: { S: event.id },
        Timestamp: {
          N: '' + new Date().getTime(),
        },
        Message: { S: event.message },
        Sender: { S: event.cognitoUsername },
      },
    },
    function (err, data) {
      if (err !== null) {
        callback(err);
      } else {
        callback(null, null);
      }
    }
  );
};
