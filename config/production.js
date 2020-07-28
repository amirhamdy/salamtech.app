module.exports = {
  'environment': 'production',
  'PORT': process.env.PORT || 3000,
  'swagger': {
    'host': 'salamtech-system-apis.herokuapp.com/api/v1',
  },
  'mongoose': {
    'url': process.env.MONGO_URL || 'mongodb+srv://znovation-salamatech:znovation-salamatech@cluster0-9f6rt.mongodb.net/test?retryWrites=true&w=majority',
    'debug': false
  },
  'JWT': {
    'secret': '@j%@RH+ZzK4mQ@?c%U)@3gGec6W>Cg!+#GJ~G_2n{=:9(z.?zN@5pdMG)u&Tf',
  },
};
