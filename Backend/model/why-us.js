const mongoose = require('mongoose');

const whyUsInfoSchema = mongoose.Schema({
    quality: { type: String, required: false },
    innovation: { type: String, required: false },
    facility: { type: String, required: false },
    location: { type: String, required: false }
});

module.exports = mongoose.model("whyUsInfo", whyUsInfoSchema);