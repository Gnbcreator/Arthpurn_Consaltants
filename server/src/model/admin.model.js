import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        String
    },
    mobileNo: {
        type: String
    }
})
adminSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) next();
        this.password =await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        console.error(error);
    }
})

adminSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
}

adminSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
            },
            process.env.ADMIN_ACCESS_TOKEN_SECRETE,
            {
                expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY
            }

        )
    } catch (error) {
        console.error(error)
    }
}

adminSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRETE,
            {
                expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY
            }

        )
    } catch (error) {
        console.error(error)
    }
}

export const Admin = mongoose.model.admins || mongoose.model('admin', adminSchema);