const mongoose = require('mongoose');

const growthFactorInfoSchema = mongoose.Schema({
    
        growthFactorName: { type: String },
        growthFactorDescription: String,
        powder: {
            gpAdvantages: [String],
            gpApplication: [String],
            gpimagePath: { type: String }
        },
        liquid: {
            glAdvantages: [String],
            glApplication: [String],
            glimagePath: { type: String }
        }
    
    
});

module.exports = mongoose.model("growthFactorInfo", growthFactorInfoSchema);

