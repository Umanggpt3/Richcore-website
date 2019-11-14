const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const nodemailer = require("nodemailer");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

router.post('/contactUs', (req, res, next) => {


    console.log("inside mail", req.body)
    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'Gmail',

        auth: {
            user: 'sitshopnation@gmail.com', // generated ethereal user
            pass: 'qwerty@123' // generated ethereal password
        }
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: 'sitshopnation@gmail.com', // sender address
        to: 'chandansr95@gmail.com', // list of receivers
        subject: "Order placed successfully", // Subject line
        text: "Contact us data ", // plain text body
        html: "<b>req.body.userName</b>" // html body
    }, (err, res) => {
        if (err) {
            console.log("Mail ERROR", err);
        } else {
            console.log("Here is the response of mail", res);
        }
    });

    res.status(201).json({
        message: "Mail successfully sent",


    })

})
module.exports = router;