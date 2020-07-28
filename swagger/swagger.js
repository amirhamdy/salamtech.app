const config = require('config');
const swagger = config.get('swagger');

module.exports = {
  host: swagger.host,
  info: {
    title: 'SalaamTech Swagger API',
    version: '1.0.0',
    description: 'SalaamTech endpoints to test APIS routes',
  },
  basePath: '/',
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  'security': [
    {
      'Bearer': []
    }
  ]
};
