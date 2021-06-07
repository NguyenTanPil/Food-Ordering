const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./route/index.js');
const db = require('./config/db/index.js');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
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
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: require('./helpers/handlebars.js')
  }),
);
app.set('view engine', 'hbs'); // su dung file mat dinh la hbs
app.set('views', path.join(__dirname, 'resource', 'views'));

// route
route(app);

// error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.redirect('/error');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});