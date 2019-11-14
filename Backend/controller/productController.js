const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const multer = require('multer');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const protienSchema = require('../model/protien.model');
const growthFactorSchema = require('../model/growth_factor.model');


const mongoose = require('mongoose');


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
        else if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        else if (file.mimetype === 'image/jpeg') {
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


router.post('/addProtien', (req, res, next) => {
    console.log("Product info data", req.body);
       var object = new protienSchema({
            
             proteinName: req.body.proteinName,
             proteinDescription: req.body.proteinDescription,
            powder: req.body.powder,
            ppAdvantages: req.body.powder.ppAdvantages,
            ppApplication: req.body.powder.ppApplication,
            ppimagePath: req.body.powder.ppimagePath,
            liquid: req.body.liquid,
            plAdvantages: req.body.liquid.plAdvantages,
            plApplication: req.body.liquid.plApplication,
            plimagePath: req.body.liquid.plimagePath,
        });

        console.log("object " , object);
   
    object.save((err,rows) => {
        res.status(201).json({
                    message: "success",
                    productId: rows._id
                })

    }); 

});

router.post('/addGrowthFactor' , (req,res,next) => {
    console.log("GF : " ,req.body);
    var object = new growthFactorSchema({
        
        growthFactorName: req.body.growthFactorName,
        growthFactorDescription: req.body.growthFactorDescription,
        powder: req.body.powder,
        gpAdvantages: req.body.powder.gpAdvantages,
        gpApplication: req.body.powder.gpApplication,
        gpimagePath: req.body.powder.gpimagePath,
        liquid: req.body.liquid,
        glAdvantages: req.body.liquidglAdvantages,
        glApplication: req.body.liquid.glApplication,
        glimagePath: req.body.liquid.glimagePath
        });

        console.log('object ' , object);
    object.save((err,rows) => {
        res.status(201).json({
            message: "success",
            productId: rows._id
        });
    })



});

router.get('/protienInfo', (req, res, next) => {

    protienSchema.find().then(result => {
        res.status(200).json({

            status: "success",
            data: result

        })
    })
});

router.get('/growthFactorInfo', (req,res,next) => {
    growthFactorSchema.find((err,rows) => {
        if(err){
            res.status(500).json({
                status : 'failure',
            });
        }else{
            res.status(200).json({

            status: "success",
            data: rows
            });
        }
    });
} );


router.post("/protienInfoById", (req, res, next) => {

    protienSchema.findById(req.body.id).then(product => {
        if (product) {
            res.status(200).json({
                message: "Protien found successfully",
                product: product
            });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.post("/growthFactorInfoById", (req, res, next) => {

    growthFactorSchema.findById(req.body.id).then(product => {
        if (product) {
            res.status(200).json({
                message: "Gf found successfully",
                product: product
            });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});


router.post('/updateProduct' , (req,res,next) => {

    protienSchema.update({_id:req.body._id}, req.body, (err,rows)=> {
        if(err){
            res.status(500).json({
                status: "failure",
            });
        }else{
            res.status(200).json({
                status: "success",
                data: rows
               
            });
        }
    } );
});


router.post('/updateGrowthFactor' , (req,res,next) => {

    growthFactorSchema.update({_id:req.body._id}, req.body, (err,rows)=> {
        if(err){
            res.status(500).json({
                status: "failure",
            });
        }else{
            res.status(200).json({
                status: "success",
                data: rows
               
            });
        }
    } );
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
                    if (req.bodyName) {
                        foundObject.protein.proteinName = req.bodyName;
                    }
                    if (req.bodyDescription) {
                        foundObject.protein.proteinDescription = req.bodyDescription;
                    }
                    // if (req.body.powder.ppAdvantages) {
                    //     foundObject.protein.powder.ppAdvantages.pop()
                    // foundObject.protein.powder.ppAdvantages.push(req.body.powder.ppAdvantages);
                    // }
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