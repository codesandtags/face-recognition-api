// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: 'AIzaSyB5YXitM15UFsaQgu6bE2dOqJl5QwS0MsA',
    authDomain: "face-recognition-brain.firebaseapp.com",
    databaseURL: "https://face-recognition-brain.firebaseio.com",
    projectId: "face-recognition-brain",
};
firebase.initializeApp(firebaseConfig);
// As httpOnly cookies are to be used, do not persist any state client side.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

// Firebase Admin to manage OAuth2
const admin = require('firebase-admin');
const serviceAccount = require("../../env/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://face-recognition-brain.firebaseio.com"
});

module.exports = {
    firebase,
    admin
}