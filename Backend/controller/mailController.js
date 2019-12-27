const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const nodemailer = require("nodemailer");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

router.post('/contactUs', (req, response, next) => {


    console.log("inside mail", req.body)
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'outlook',

        auth: {
            user: 'queries@richcoreindia.com', // generated ethereal user
            pass: 'Poq78516' // generated ethereal password
        }
    });
    console.log(req.body);

    // send mail with defined transport object
    transporter.sendMail({
        from: 'queries@richcoreindia.com', // sender address
        to: 'queries@richcoreindia.com',
        cc:'sonakshi.mishra@richcoreindia.com, chandansr95@gmail.com', // list of receivers
        subject: "INFO from Website", // Subject line
        text: "Contact us data ", // plain text body
        html: "<b>"+ JSON.stringify(req.body) +"</b>" // html body
    }, (err, res) => {
        if (err) {
            console.log("Mail ERROR", err);
            response.status(200).json({
                status:"failure",
                message: "Mail Not sent",
        
        
            });
        } else {
            console.log("Here is the response of mail", res);
            response.status(200).json({
                status:"success",
                message: "Mail successfully sent",
        
        
            });

        }
    });

    

})
module.exports = router;