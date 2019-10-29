const path = require("path");
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = express.Router();

const homeController = require('../controller/homeController');
const locationController = require('../controller/locationController');
const mailController = require('../controller/mailController');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS,PUT")
    next();
});

app.use('/home', homeController);
app.use('/location', locationController);
app.use('/mail', mailController);
app.get('/', (req, res, next) => {
    res.status(200).json({
        name: 'Richcore'
    })
})

module.exports = app;