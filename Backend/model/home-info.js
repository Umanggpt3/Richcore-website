const mongoose = require('mongoose');

const homeInfoSchema = mongoose.Schema({
    data: { type: String, required: true },
    createdOn: { type: Date, default: new Date() }
});

module.exports = mongoose.model("HomeInfo", homeInfoSchema);