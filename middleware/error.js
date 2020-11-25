var errorHandler = module.exports;

errorHandler.routeError = function(err, req, res, next){
    if (err instanceof NotFound) {
        res.send('<h1>404 Not Found</h1>');
    } else {
        res.send(err);
    }
};