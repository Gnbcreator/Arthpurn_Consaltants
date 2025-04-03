
import asyncHandler from '../../utils/asyncHandler.js';
import { User } from '../model/user.model.js';

/**
 * Generate the AccessToken and Refresh Token
 */

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById({ _id: userId });
        if (!user) {
            alert("User not found...");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: true });

        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Create Account
 */
const userRegistration = asyncHandler(async (req, res) => {
    const { fullname, email, mobileno, password } = req.body;

    if (!fullname || !email || !mobileno || !password) {

        return res.status(404).json({
            status: 404,
            message: "All fields required.."
        })

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            status: 409,
            error: "User already exists..."
        });
    }


    await User.create({
        fullname: fullname,
        email: email,
        mobileno: mobileno,
        password: password
    })

    return res.status(201).json({
        status: 201,
        message: "User Registered Successfully!",
        success: true
    });
});


/**
 * User login
 */
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(404).json({
            status: 404,
            error: "Email  required"
        })
    }
    if (!password) {
        return res.status(404).json({
            status: 404,
            error: "Password  required"
        })
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(202).json({
            status: 200,
            error: "User does not exites...."
        })
    }

    const validPassword = await user.isPasswordCorrect(password);

    if (!validPassword) {
        res.status(404).json({
            status: 404,
            error: "Invalid Credintials!!!!"
        })
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user?._id);
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie('userAccessToken', accessToken, options)
        .cookie('userRefreshToken', refreshToken, options)

        .json({
            status: 200,
            message: "User loggedin successfully...",

        })

})

export { userRegistration, userLogin };
