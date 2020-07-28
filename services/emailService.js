const nodeMailer = require('nodemailer');
const mail = require('config').get('mail');

let transporter;

function transportCreation() {
  const {host, port, auth} = mail;

  transporter = nodeMailer.createTransport({host, port, auth: {user: auth.user, pass: auth.pass}});

  return transporter;
}

module.exports = async function sendEmail(to, subject, text, cc = '') {
  transporter = transportCreation();
  const {from} = mail;

  const mailOptions = {from, to, subject, text, cc};

  return transporter.sendMail(mailOptions);
};
