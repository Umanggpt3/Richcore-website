const mongoose = require('mongoose');

const bannerImgSchema = mongoose.Schema({
    imagePath: { type: String, required: true },
});

module.exports = mongoose.model("bannerImage", bannerImgSchema);