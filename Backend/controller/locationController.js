const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

const locationInfoSchema = require('../model/location');

mongoose.connect('mongodb://localhost/Richcore');

router.post('/info', (req, res, next) => {
    console.log(req.body);

    var newlocation = new locationInfoSchema({
        id: req.body.id,
        location1: req.body.location1,
        location2: req.body.location2,
        location3: req.body.location3
    });

    newlocation.save().then(addedLocation => {
        res.status(201).json({
            message: "location added successfully",
            locationId: addedLocation._id,
        })
    })
})

router.get('/info', (req, res, next) => {

    locationInfoSchema.find(function(err, result) {

        if (err) {
            console.log(err);
            res.status(500).json({
                err: err
            })
        } else {
            console.log("Hello", result);

            res.status(200).json({

                status: "success",
                data: result

            })
        }

    })
})



module.exports = router;