const { default: mongoose } = require("mongoose");

const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prescription'
    },
    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);