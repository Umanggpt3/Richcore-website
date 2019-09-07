const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');

const locationInfoSchema = require('../model/location');

router.post('/info', (req, res, next) => {
    console.log(req.body);

    var newlocation = new locationInfoSchema({
        id: req.body.id,
        location1: req.body.location1,
        location2: req.body.location2,
        location3: req.body.location3,
        location4: req.body.location4
    });

    newlocation.save().then(addedLocation => {
        res.status(201).json({
            message: "success",
            locationId: addedLocation._id,
        })
    })
})

router.get('/info', (req, res, next) => {

    locationInfoSchema.find().then(result => {


        console.log("Hello", result);

        res.status(200).json({

            status: "success",
            data: result

        })


    })
})

router.put('/update', (req, res, next) => {
    console.log("Update location", req.body);
    locationInfoSchema.findByIdAndUpdate(req.body.id, {
            $set: { location1: req.body.location1, location2: req.body.location2, location3: req.body.location3, location4: req.body.location4 }
        }, {
            new: true
        },
        function(err, updatedLocation) {
            if (err) {
                res.send("Error updating location");
            } else {
                res.json({
                    status: "success",
                    data: updatedLocation
                })
            }
        }
    )
})

router.delete("/:id", (req, res, next) => {

    locationInfoSchema.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Item deleted!" });
    });
})


module.exports = router;