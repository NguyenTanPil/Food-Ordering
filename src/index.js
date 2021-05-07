const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./route/index.js');
const db = require('./config/db/index.js');
const cookieParser = require('cookie-parser');
// connnet to db
db.connect();
// static
app.use(express.static(path.join(__dirname, 'public')));
// body
app.use(express.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.json());
// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs'); // su dung file mat dinh la hbs
app.set('views', path.join(__dirname, 'resource', 'views'));

// route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});