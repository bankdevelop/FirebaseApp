const bodyParser = require('body-parser'),
      express = require('express'),
      dotenv = require('dotenv'),
      cors = require('cors'),
      apiClient = require('./route/api'),
      errorHandler = require('./middleware/error');

dotenv.config('.env');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/component', express.static('component'));

app.get('/', (req, res, next) => {
    var host = req.protocol+'://'+req.get('host');
    res.render('home', {'host':host});
});

// need to protect api with cors
// because if we not protect with cors, other webside
// can use this api too.
app.use('/api', apiClient);

app.get('*', errorHandler.routeError);

app.listen(5000, ()=>{
    console.log(`Server running on port ${5000}`)
});