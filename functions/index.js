const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const listAllUsers = (callback) => {
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

const setAdmin = (uid) => {
  admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
    return true;
  }).catch((error) => {
    return false;
  });
}

exports.toAdmin = functions.https.onRequest((req, res) => {
  const list = { is: true};
  setAdmin('rBkuww9mMpYum0REAOcI4qtmWc93');
  res.send(list);
});

exports.getUsers = functions.https.onCall((data, context) => {
  return new Promise((resolve) => {
    listAllUsers((list) => {
      if (!context.auth) {
        resolve( { message: 'Authentication Required!', code: 401 });
      }

      if (!context.auth.token.admin) {
        resolve( { message: 'Permission denied!', code: 401 });
      }
      resolve(list);
    });
  });
});

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
  console.log('This will be run every minutes!');
  return null;
});

