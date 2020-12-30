const firebase = require('firebase'),
      dotenv = require('dotenv'),
      admin = require('firebase-admin');

require('firebase/auth');
require('firebase/database');

dotenv.config('../.env');
var env = process.env;
var auth = module.exports;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: env.FB_APIKEY,
    authDomain: env.FB_AUTHDOMAIN,
    databaseURL: env.FB_DB_URL,
    projectId: env.FB_PROJECT_ID,
    storageBucket: env.FB_STORAGE_BUCKET,
    messagingSenderId: env.FB_MSG_SENDER_ID,
    appId: env.FB_APP_ID,
    measurementId: env.FB_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig);

auth.createNewUser = function(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

auth.login = function(req, res, next){
    var token = null;

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.pass)
    .then((user) => {
        firebase
            .auth()
            .currentUser
            .getIdToken(true)
            .then(function(idToken) {
                res.json(idToken);
            });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(errorCode).send(errorMessage);
    });
};

auth.isLogin = function(req, res, next){
    admin
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(decodedToken);
        res.json(uid);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(errorCode).send(errorMessage);
    });
};

auth.getInit = function(){
    console.log(fb);
    return fb;
};

auth.getConfig = function(){
    return firebaseConfig;
};