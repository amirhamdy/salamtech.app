module.exports = {
  'environment': 'development',
  'PORT': process.env.PORT || 3000,
  'swagger': {
    'host': 'localhost:3000/api/v1',
  },
  'mongoose': {
    'url': process.env.MONGO_URL || 'mongodb://localhost:27017/salamtech',
    'debug': true,
    'options': {
      'useNewUrlParser': true,
      'useUnifiedTopology': true,
      'useCreateIndex': true,
      'poolSize': 5, // Can now run 5 operations at a time
      'autoIndex': false,
      'useFindAndModify': false,
      'family': 4, // connect using IPv4
    },
  },
  'JWT': {
    'secret': 'RXKG}e*@j%@RH+ZzK4mQ@?c%U)@3gGec6W>',
  },
  'mail': {
    'from': 'SalamTech <info@salamtech.com>',
    'host': 'smtp.mailtrap.io',
    'port': 2525,
    'service': 'Gmail',
    'auth': {
      'user': '342450892c76f0',
      'pass': process.env.EmailPassword || '68e5e78a57aaac',
    },
  },
};
