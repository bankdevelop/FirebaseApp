const express = require('express'),
      router =  express.Router();

router.get('/', (req, res, next) => {
   res.send(req.url); 
});

module.exports = router;