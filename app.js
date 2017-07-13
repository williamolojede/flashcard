const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes');
const cardsRouter = require('./routes/cards');


const app = express();

// PORT
const DEFAULT_PORT = 3000;
app.set('port', process.env.PORT || DEFAULT_PORT)
// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
// COOKIE PARSER MIDDLEWARE
app.use(cookieParser());
app.use('/static', express.static('public'));
// TEMPLATE MIDDLEWARE
app.set('view engine', 'pug');

// ROUTES
app.use(mainRouter);
app.use('/cards', cardsRouter);

// 404 ERROR HANDLING
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 400;
  next(err);
});
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`${process.env.npm_package_name} is running on http://localhost:${app.get('port')}/`);
});
