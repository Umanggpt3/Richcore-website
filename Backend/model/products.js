const mongoose = require('mongoose');

const productInfoSchema = mongoose.Schema({
    protein: {
        proteinName: { type: String },
        proteinDescription: String,
        powder: {
            ppAdvantages: [String],
            ppApplication: [String],
            ppimagePath: { type: String }
        },
        liquid: {
            plAdvantages: [String],
            plApplication: [String],
            plimagePath: { type: String }
        }

    },
    growthFactor: {
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

    }
});

module.exports = mongoose.model("productInfo", productInfoSchema);