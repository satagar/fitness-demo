const { default: mongoose } = require("mongoose");
const { HealthLog } = require(".");
const healthLog = require("./health-log");

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
    healthLog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'healthLog',
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

prescriptionSchema.pre('save', async function(next) {
    const prescription = this;
    if(prescription.isModified('healthLog') && prescription.healthLog instanceof HealthLog) {
        healthLog = await prescription.healthLog.save().then(null, err => { throw new Error(`Could not save healthlog because:\n${err}`) });
        prescription.healthLog = healthLog._id;
    }
    next();
})

module.exports = mongoose.model("Prescription", prescriptionSchema);