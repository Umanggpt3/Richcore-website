const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const homeInfoSchema = require('../model/home-info');
const whyUsInfoSchema = require('../model/why-us');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Richcore');


/*******Home Info post Start**********/

/* router.post('/info', (req, res, next) => {
    console.log("Inside Homecontroller", req.body);

    var homeinfoSchema = new homeInfoSchema({
        data: req.body.data
    })

    homeinfoSchema.save().then(addedInfo => {
        res.status(201).json({
            status: "success",
            dataID: addedInfo._id
        })
    })

}) */

/*******Home Info post End**********/


/*******Home Info get Start**********/

router.get('/info', (req, res, next) => {

        homeInfoSchema.find().then(result => {


            console.log("Hello", result);

            res.status(200).json({

                status: "success",
                data: result

            })

        })

    })
    /*******Home Info get End**********/



/*******Home Info Update Start**********/

router.put('/update', (req, res, next) => {
    console.log("Update homeInfo", req.body);
    homeInfoSchema.findByIdAndUpdate(req.body.id, {
            $set: { data: req.body.data }
        }, {
            new: true
        },
        function(err, updatedHomeInfo) {
            if (err) {
                res.send("Error updating location");
            } else {
                res.json({
                    status: "success",
                    data: updatedHomeInfo
                })
            }
        }
    )
})

/*******Home Info Update End**********/

/*******Why-Us post Start**********/

/*router.post('/whyus', (req, res, next) => {
    console.log("Why us post info", req.body.location);

    var whyUsinfoSchema = new whyUsInfoSchema({
        quality: req.body.quality,
        innovation: req.body.innovation,
        facility: req.body.facility,
        location: req.body.location
    })

    whyUsinfoSchema.save().then(addedInfo => {
        res.status(201).json({
            status: "success",
            dataID: addedInfo._id
        })
    })
})*/

/*******WHY US POST END**********/

/*******WHY US GET START**********/

router.get('/whyus', (req, res, next) => {

        whyUsInfoSchema.find().then(result => {


            console.log("Hello", result);

            res.status(200).json({

                status: "success",
                data: result

            })

        })

    })
    /*******WHY US GET END**********/

/*******WHY US QUALITY UPDATE START**********/

router.put('/update-quality', (req, res, next) => {
    console.log("Update why us quality info", req.body);
    whyUsInfoSchema.findByIdAndUpdate(req.body.id, {
            $set: {
                quality: req.body.quality,
            }
        }, {
            new: true
        },
        function(err, updatedQualityInfo) {
            if (err) {
                res.send("Error updating location");
            } else {
                res.json({
                    status: "success",
                    data: updatedQualityInfo
                })
            }
        }
    )
})


/*******WHY US INNOVATION UPDATE START**********/

router.put('/update-innovation', (req, res, next) => {
    console.log("Update why us innovation info", req.body);
    whyUsInfoSchema.findByIdAndUpdate(req.body.id, {
            $set: {
                innovation: req.body.innovation,
            }
        }, {
            new: true
        },
        function(err, updatedInnovationInfo) {
            if (err) {
                res.send("Error updating location");
            } else {
                res.json({
                    status: "success",
                    data: updatedInnovationInfo
                })
            }
        }
    )
})

/*******WHY US FACILITY UPDATE START**********/

router.put('/update-facility', (req, res, next) => {
    console.log("Update why us facility info", req.body);
    whyUsInfoSchema.findByIdAndUpdate(req.body.id, {
            $set: {
                facility: req.body.facility,
            }
        }, {
            new: true
        },
        function(err, updatedFacilityInfo) {
            if (err) {
                res.send("Error updating location");
            } else {
                res.json({
                    status: "success",
                    data: updatedFacilityInfo
                })
            }
        }
    )
})


/*******WHY US LOCATION UPDATE START**********/

router.put('/update-location', (req, res, next) => {
    console.log("Update why us facility info", req.body);
    whyUsInfoSchema.findByIdAndUpdate(req.body.id, {
            $set: {
                location: req.body.location,
            }
        }, {
            new: true
        },
        function(err, updatedLocationInfo) {
            if (err) {
                res.send("Error updating location");
            } else {
                res.json({
                    status: "success",
                    data: updatedLocationInfo
                })
            }
        }
    )
})



module.exports = router;