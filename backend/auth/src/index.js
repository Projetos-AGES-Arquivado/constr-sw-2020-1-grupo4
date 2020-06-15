const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const errHandlerMiddleware = require('./middlewares/errHandler');
const { NotFoundError } = require('./errors');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./swagger/swagger.json');
const cors = require('cors');


const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Header", "*"); 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
  app.use(cors());
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.get('/ping', function (req, res) {
  res.send('pong');
});

const httpPort = process.env.HTTP_PORT || 3456;

app.use('*', (req, res, next) => {
  next(new NotFoundError());
});

app.use(errHandlerMiddleware);
app.listen(httpPort, () => console.log(`Listening on port ${httpPort}`));
