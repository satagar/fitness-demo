const { default: mongoose } = require("mongoose");
const { hashPassword, comparePassword } = require("../helpers");

const genders = ['male', 'female'];

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
    healthLogs: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'healthLog'
        }]
    },
    prescriptions: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'prescription'
        }]
    },
    appointments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'appointment'
        }]
    },
    refreshToken: {
        type: String,
        select: false
    }
}, {
    timestamps: true,
    statics: {
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