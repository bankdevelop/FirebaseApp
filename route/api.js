const express = require('express'),
      router =  express.Router(),
      auth = require('../service/auth');

router.get('/', (req, res, next) => {
   res.send(req.url); 
});

router.get('/login', (req, res, next) => {
   auth.login('demo@example.com', '12345678');
});

router.get('/check', (req, res, next) => {
   res.json(auth.isLogin(testToken));
});

router.get('/init', (req, res, next) => {1
   let data = auth.getConfig();
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Credentials', true);
   res.set('Content-Type', 'application/json');
   res.json(data);
});

module.exports = router;