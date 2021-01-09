const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var firebaseConfig = require('./firebase_config');
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

database = module.exports;