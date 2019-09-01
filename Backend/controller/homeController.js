const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

const homeInfoSchema = require('../model/home-info');
mongoose.connect('mongodb://localhost/Richcore');

router.post('/info', (req, res, next) => {
    console.log(req.body);

    res.status(201).json({
        status: "success",
    })

    // var homeInfoSchema = new homeInfoSchema({
    //     data: req.body.data
    // })

    // homeInfoSchema.save().then(addedInfo => {
    //     res.status(201).json({
    //         status: "success",
    //     })
    // })

})

module.exports = router;