const firebase = require('firebase'),
      admin = require('firebase-admin');

require('firebase/auth');
require('firebase/database');

var auth = module.exports;
var firebaseConfig = require('./firebase_config');

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
                res.status(200).json(idToken);
            });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(401).json(errorMessage);
    });
};

auth.isLogin = function(req, res, next){
    
    admin
    .auth()
    .verifyIdToken(req.body.token)
    .then((decodedToken) => {
        const uid = decodedToken.uid;
        res.json('Now, you are login');
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(401).json('You are not login');
    });

};

auth.getConfig = function(){
    return firebaseConfig;
};