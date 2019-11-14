
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
    }
});

module.exports = transporter;