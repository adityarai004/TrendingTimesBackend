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
        }
    },
    { timeStamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (!this.isModified('password')) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
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