const { default: mongoose } = require("mongoose");

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    qualifications: {
        type: [String],
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Doctor", doctorSchema);