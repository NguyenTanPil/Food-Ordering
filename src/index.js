const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./route/index.js');

// static
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});