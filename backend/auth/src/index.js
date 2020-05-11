const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const errHandlerMiddleware = require('./middlewares/errHandler');
const { NotFoundError } = require('./errors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', usersRouter);

app.get('/ping', function (req, res) {
  res.send('pong');
});

const httpPort = process.env.HTTP_PORT || 3456;

app.use('*', (req, res, next) => {
  next(new NotFoundError());
});

app.use(errHandlerMiddleware);
app.listen(httpPort, () => console.log(`Listening on port ${httpPort}`));
