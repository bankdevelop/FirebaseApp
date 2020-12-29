const express = require('express'),
      router =  express.Router(),
      auth = require('../service/auth');

router.get('/', (req, res, next) => {
   res.send(req.url); 
});

router.post('/login', auth.login);

router.get('/check', (req, res, next) => {
   res.json(auth.isLogin(testToken));
});

router.get('/init', (req, res, next) => {
   res.json('ok'); //this ok
});

module.exports = router;