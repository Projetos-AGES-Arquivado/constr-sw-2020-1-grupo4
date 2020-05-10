const express = require('express');
var bodyParser = require('body-parser');
var Keycloak = require('keycloak-connect');
var mongo = require('mongoose');



setTimeout(function() {
  var mongoaddr = 'mongodb://constr-sw-2020-1-grupo4_mongodb_1:27017/users';
  console.log(mongoaddr);
  mongo.connect(mongoaddr);
}, 3000);



const kcConfig = {
  realm: 'ConstrSW',
  'auth-server-url': "http://52.91.106.206:8080/auth/",
  'ssl-required': 'external',
  'bearer-only': true,
  resource: 'constrsw-auth',
  credentials: {
    secret: process.env.CLIENT_SECRET
  },
  'confidential-port': 0
};

const keycloak = new Keycloak({}, kcConfig);
keycloak.redirectToLogin = () => false;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(keycloak.middleware());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/login', (req, res) => {
  keycloak.grantManager
    .obtainDirectly(req.body.login, req.body.password)
    .then(grant => {
      res.json(grant).status(200);
    })
    .catch(error => {
      res.send(error).status(401);
    });
});

module.exports.start = port =>
  app.listen(port, () => console.log(`Listening on port ${port}`));
