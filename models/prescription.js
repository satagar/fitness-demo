const { default: mongoose } = require("mongoose");

const prescriptionSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital'
    },
    date: {
        type: Date,
        required: true
    },
    healthLogs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'healthLog'
        }],
        required: true
    },
    symptops: {
        type: String,
        required: true
    },
    advice: {
        type: String,
        required: true
    },
    medications: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Prescription", prescriptionSchema);