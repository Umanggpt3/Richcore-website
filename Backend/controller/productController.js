const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const productInfoSchema = require('../model/products');


const mongoose = require('mongoose');

// image upload

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({ storage: storage });

// image upload end

//request to save the image

router.post('/upload', upload.single('file'), function(req, res, next) {
    console.log(req.file);
    if (!req.file) {
        res.status(500);
        return next(err);
    }
    console.log(req.protocol + req.get("host") + '/images/' + req.file.filename)
    res.json({ fileUrl: req.protocol + req.get("host") + '/images/' + req.file.filename });
})




router.post('/info', (req, res, next) => {
    console.log("Product info data", req.body.protein.powder.ppimagePath);

    var newproduct = new productInfoSchema({
        // id: req.body.id,
        protein: req.body.protein,
        proteinName: req.body.protein.proteinName,
        ppDescription: req.body.protein.proteinDescription,
        powder: req.body.protein.powder,
        ppAdvantages: req.body.protein.powder.ppAdvantages,
        ppApplication: req.body.protein.powder.ppApplication,
        ppimagePath: req.body.protein.powder.ppimagePath,
        liquid: req.body.protein.liquid,
        plAdvantages: req.body.protein.liquid.plAdvantages,
        plApplication: req.body.protein.liquid.plApplication,
        plimagePath: req.body.protein.liquid.plimagePath,
        growthFactor: req.body.growthFactor,
        growthFactorName: req.body.growthFactor.growthFactorName,
        gpDescription: req.body.growthFactor.growthFactorDescription,
        powder: req.body.growthFactor.powder,
        gpAdvantages: req.body.growthFactor.powder.gpAdvantages,
        gpApplication: req.body.growthFactor.powder.gpApplication,
        gpimagePath: req.body.growthFactor.powder.gpimagePath,
        liquid: req.body.growthFactor.liquid,
        glAdvantages: req.body.growthFactor.liquidglAdvantages,
        glApplication: req.body.growthFactor.liquid.glApplication,
        glimagePath: req.body.growthFactor.liquid.glimagePath,

    });

    newproduct.save().then(addedProduct => {
        res.status(201).json({
            message: "success",
            productId: addedProduct._id
        })
    })
})

router.get('/info', (req, res, next) => {

    productInfoSchema.find().then(result => {
        res.status(200).json({

            status: "success",
            data: result

        })
    })
})


router.get("/info/:id", (req, res, next) => {

    productInfoSchema.findById(req.params.id).then(product => {
        if (product) {
            res.status(200).json({
                message: "Product found successfully",
                product: product
            });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.put('/info/:id', (req, res, next) => {
    console.log("Update product", req.body);
    productInfoSchema.findOne({ _id: req.params.id }, function(err, foundObject) {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                if (!foundObject) {
                    res.status(404).send();
                } else {
                    if (req.body.proteinName) {
                        foundObject.protein.proteinName = req.body.proteinName;
                    }
                    if (req.body.proteinDescription) {
                        foundObject.protein.proteinDescription = req.body.proteinDescription;
                    }
                    if (req.body.proteinPowderAdvantage) {
                        //     foundObject.protein.powder.ppAdvantages.pop()
                        foundObject.protein.powder.ppAdvantages.push(req.body.proteinPowderAdvantage);
                    }
                    if (req.body.proteinPowderApplication) {
                        foundObject.protein.powder.ppApplication.push(req.body.proteinPowderApplication);
                    }
                    if (req.body.proteinPowderApplicationArr) {
                        foundObject.protein.powder.ppApplication = req.body.proteinPowderApplicationArr;
                    }
                    if (req.body.proteinPowderAdvantageArr) {
                        foundObject.protein.powder.ppAdvantages = req.body.proteinPowderAdvantageArr;
                    }
                    if (req.body.proteinLiquidAdvantageArr) {
                        foundObject.protein.liquid.plAdvantages = req.body.proteinLiquidAdvantageArr;
                    }
                    if (req.body.proteinLiquidApplicationArr) {
                        foundObject.protein.liquid.plApplication = req.body.proteinLiquidApplicationArr;
                    }
                    foundObject.save(function(err, updatedProduct) {
                        if (err) {
                            console.log(err);
                            res.status(500).send();
                        } else {
                            res.send(updatedProduct);
                        }
                    })
                }
            }

        }


    )
})


module.exports = router;