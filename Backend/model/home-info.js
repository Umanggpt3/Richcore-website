const mongoose = require('mongoose');

const homeInfoSchema = mongoose.Schema({
    data: { type: String, required: true },
});

module.exports = mongoose.model("homeInfo", homeInfoSchema);