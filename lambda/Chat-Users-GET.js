'use strict';

var AWS = require('aws-sdk');

var cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
  cognito.listUsers(
    {
      UserPoolId: 'us-east-1_GuJHYSRHx',
      AttributesToGet: [],
      Filter: '',
      Limit: 60,
    },
    function (err, data) {
      if (err === null) {
        var logins = [];
        data.Users.forEach(function (user) {
          if (event.cognitoUsername !== user.Username) {
            logins.push(user.Username);
          }
        });
        logins.push('why you are here');
        callback(null, logins);
      } else {
        callback(err);
      }
    }
  );
};
