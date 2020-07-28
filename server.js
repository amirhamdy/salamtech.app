// IMPORTS
const express = require("express");
const body = require("body-parser");
const cors = require('cors');
const connection = require("./DB");
const routes = require("./routes");
const swaggerDefinition = require('./swagger/swagger.js');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const logger = require('./logger');
const moment = require('moment');
const config = require('config');
const appEvents = require('./events/appEvents');

// CONFIGURATION
const app = express();
app.use(body.urlencoded({extended: true}));
app.use(cors());
app.use(body.json());
appEvents(app);
connection.mongoConnect(logger);
// ROUTES
routes(app);
// SWAGGER_CONFIGURATION
const options = {
  swaggerDefinition,
  apis: ['./swagger/*.js', './swagger/*.yaml'],
};
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = config.get('PORT');
const server = app.listen(port, () => {
  console.debug('--------------------------------------------------------------');
  console.debug(`Port: ${port}`);
  console.debug('Protocol: HTTPS');
  console.debug(`Environment: ${config.get('environment')}`);
  console.debug(`Documentation URI: /api-docs`);
  console.debug(`Timestamp: ${moment().toLocaleString()}`);
  console.debug('--------------------------------------------------------------');
});


