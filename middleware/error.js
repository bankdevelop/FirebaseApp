var errorHandler = module.exports;

errorHandler.routeError = (req, res, next) => {
    res.send('<h1>404 Not Found</h1>')
};