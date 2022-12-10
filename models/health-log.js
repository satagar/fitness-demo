const { default: mongoose } = require("mongoose");

const bloodGroups = ['a', 'b', 'ab', 'o'];

const healthLogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        enum: bloodGroups,
        required: true
    },
    bloodPressure: {
        type: Number,
        required: false
    },
    pulse: {
        type: Number,
        required: false
    },
    oxygenLevel: {
        type: Number,
        required: false
    },
}, {
    timestamps: true,
    statics: {
        bloodGroups: bloodGroups
    },
});

module.exports = mongoose.model("HealthLog", healthLogSchema);