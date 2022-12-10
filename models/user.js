const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const genders = ['male', 'female'];
const bloodGroups = ['a', 'b', 'ab', 'o'];

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() {
            return this.isNew;
        },
        select: false
    },
    gender: {
        type: String,
        enum: genders,
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
    appointments: {
        type: [
            {
                doctor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'doctor'
                },
                date: {
                    type: Date
                }
            }
        ],
    },
    refreshToken: {
        type: String,
        select: false
    }
}, {
    timestamps: true,
    statics: {
        bloodGroups: bloodGroups,
        genders: genders,
        async authenticate(email, password) {
            const user = await this.findOne({ email: email }).select('password');
            if(user) {
                if(await comparePassword(password, user.password)) {
                    return user;
                }
            }
            return false;
        },
    },
});

userSchema.virtual('role').get(function() {
    return `user`;
});

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) user.password = await hashPassword(user.password);
    next();
})

module.exports = mongoose.model("User", userSchema);