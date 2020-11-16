const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://monnis-live.firebaseio.com"
});

const setAdmin = (uid) => {
  admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
    return true;
  }).catch((error) => {
    return false;
  });
}

const setStaff = (uid) => {
  admin.auth().setCustomUserClaims(uid, {staff: true}).then(() => {
    return true;
  }).catch((error) => {
    return false;
  });
}

const writeToDB = (user, uid, update) => {
  const db = admin.database();
  const ref = db.ref("users");
  if (user.role === "Админ")
    setAdmin(uid);
  if (user.role === "Үйлчилгээний зөвлөх")
    setStaff(uid);
  delete user["password"];
  user.uid = uid;
  var record = {};
  update ? ref.child(uid).update(user) : ref.child(uid).set(user);
  return record;
}

const saveUser = (user) => {
  const userToBe = {
    email: user.email,
    emailVerified: true,
    phoneNumber: "+976" + user.phoneNumber,
    password: user.password,
    displayName: user.displayName,
    disabled: false
  };
  if (user.uid) {
    admin.auth().updateUser(user.uid, userToBe)
    .then((userRecord) => {
      return writeToDB(user, userRecord.uid, true);
    })
    .catch((error) => {
      console.log('Error updating user:', error);
    });
  } else {
    admin.auth().createUser(userToBe)
    .then((userRecord) => {
      return writeToDB(user, userRecord.uid, false);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
  }
}

exports.save = functions.https.onCall((data, context) => {
    if (!context.auth) {
      return { message: 'Authentication Required!', code: 401 };
    }
    if (!context.auth.token.admin) {
      return { message: 'Permission denied!', code: 401 };
    }
    saveUser(data, (user) => {
      return { message: user, code: 200 };
    });
    return { message: "Success", code: 200 };
});

exports.deleteUser = functions.https.onCall((data, context) => {
    if (!context.auth) {
      return { message: 'Authentication Required!', code: 401 };
    }
    if (!context.auth.token.admin) {
      return { message: 'Permission denied!', code: 401 };
    }

    const db = admin.database();
    admin.auth().deleteUser(data.uid)
    .then(() => {
      const ref = db.ref("users/" + data.uid);
      ref.remove();
      console.log('Successfully deleted user');
      return { message: "Success", code: 200 };
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
    return { message: "Success", code: 200 };
});


exports.toAdmin = functions.https.onRequest((req, res) => {
  const list = { is: true};
  setAdmin('rBkuww9mMpYum0REAOcI4qtmWc93');
  res.send(list);
});

exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
  console.log('This will be run every minutes!');
  return null;
});

