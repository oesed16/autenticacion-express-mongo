const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
require("./user");
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')

app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/registrations", { useNewUrlParser: true })
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));

app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['one', 'two'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
})); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/assets')));
app.use('/', routes);

app.listen(3000, () => console.log("Listening on port 3000 ..."));