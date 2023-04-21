const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtStrategy = require("../config/jwt.config.js") 

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash; 
      next();
    });
});

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + process.env.JWT_EXP_DAYS);

    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000),
        },
        process.env.JWT_SECRET
    );
}

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        token: this.generateJWT(),
    };
}

module.exports = User = mongoose.model('user', UserSchema);