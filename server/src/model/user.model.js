import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    mobileno: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avtar: {
        type: String,
        trim: true,
    },
    about:{
        type:String,
    },
    banner: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        default: 'offline'
    },

    address: {
        city: { type: String },
        pincode: { type: String },
        state: { type: String },
        country: { type: String },
    },
    otp: {
        type: String,
        trim: true,
    },
    refreshToken: {
        type: String,
        trim: true,
    },

},
    {
        timestamps: true
    }

);



// Password hashing middleware
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 11);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    try {

        return await bcrypt.compare(password, this.password);

    } catch (error) {
        console.log(error)
    }
}
// Generate access token
userSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                fullname: this.fullname,
                email: this.email,
            },
            process.env.ACCESS_TOKEN_SECRETE,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        );
    } catch (error) {
        console.log(error)
    }
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRETE,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model.users || mongoose.model("users", userSchema);
