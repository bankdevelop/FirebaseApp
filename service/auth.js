const firebase = require('firebase'),
      dotenv = require('dotenv');

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
var fb = firebase.initializeApp(firebaseConfig);

auth.createNewUser = function(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

auth.login = function(username, password){
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
    });
};

auth.isLogin = function(idToken){
  console.log(firebase.auth().currentUser.getIdToken(true));
};

auth.getInit = function(){
    console.log(fb);
    return fb;
};

auth.getConfig = function(){
    return () => firebaseConfig;
};