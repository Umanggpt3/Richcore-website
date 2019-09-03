const mongoose = require('mongoose');

const locationInfoSchema = mongoose.Schema({
    location1: { type: String, required: true },
    location2: { type: String, required: true },
    location3: { type: String, required: true },
    location4: { type: String, required: true }
});

module.exports = mongoose.model("locationInfo", locationInfoSchema);