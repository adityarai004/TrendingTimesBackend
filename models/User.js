const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
        },
        gender: {
            type: String,
        },
        dob: {
            type: Number
        },
    },
    { timeStamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }
    catch (error) {
        return next(error)
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
};

const User = mongoose.model('User', userSchema);

module.exports = User