const mongoose = require("mongoose");
const config = require('config');

module.exports = {
  mongoConnect: (logger) => {
    // let localUri = "mongodb://smart-tech:Asd123456789@ds041144.mlab.com:41144/smart-tech";
    // const hostUri = "mongodb+srv://znovation-salamatech:znovation-salamatech@cluster0-9f6rt.mongodb.net/test?retryWrites=true&w=majority";
    const db = config.get('mongoose');
    mongoose.set('debug', db.debug);

    mongoose.connection.on('connected', function () {
      console.info('Mongoose Connected To Mongodb.');
    });

    mongoose.connection.on('error', function () {
      console.error('MongoDB Connection Error. Please make sure MongoDB is installed and running.');
    });

    mongoose.connection.on('disconnected', function () {
      console.error('Mongoose default connection was disconnected.');
    });

    mongoose.connect(db.url, db.options).then(result => {
      logger.info(result)
    }).catch(err => {
      logger.error(err)
    });
  }
};


