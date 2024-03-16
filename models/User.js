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
<<<<<<< HEAD
    if (!this.isModified('password')) {
=======
    if(!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password,salt);
>>>>>>> b04f1b58294f2040fb49920ae91d33f3c920ad28
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