const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

function listAllUsers(nextPageToken, callback) {
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, undefined)
  .then((listUsersResult) => {
      /*if (listUsersResult.pageToken) {
        listAllUsers(listUsersResult.pageToken, callback);
      }*/
      callback(listUsersResult);
      return listUsersResult;
    })
  .catch((error) => {
      console.log('Error listing users:', error);
  });
}

exports.getUsers = functions.https.onRequest((request, response) => {
  listAllUsers(null, (list) => {
      response.send(list);
  });
});

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
  console.log('This will be run every minutes!');
  return null;
});

