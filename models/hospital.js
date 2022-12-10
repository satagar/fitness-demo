const { default: mongoose } = require("mongoose");

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Hospital", hospitalSchema);