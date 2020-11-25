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
app.use(errorHandler.routeError);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
    res.render('index');
});

app.use('/api', apiClient);//need to protect with cors

app.listen(5000, ()=>{
    console.log(`Server running on port ${5000}`)
});