import asyncHandler from '../../utils/asyncHandler.js';
import { Admin } from '../model/admin.model.js';
import { User } from '../model/user.model.js';

/**
 * Generate the AccessToken and Refresh Token
 */

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const admin = await Admin.findById({ _id: userId });
        if (!admin) {
            alert("User not found...");
        }

        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Create Account
 */
const adminRegistration = asyncHandler(async (req, res) => {
    const { email, mobileNo, password } = req.body;

    if (!email || !mobileNo || !password) {

        return res.status(404).json({
            status: 404,
            message: "All fields required.."
        })

    }

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            status: 409,
            error: "Admin already exists..."
        });
    }


    await Admin.create({
        email: email,
        mobileNo: mobileNo,
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
const adminLogin = asyncHandler(async (req, res) => {
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

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(404).json({
            status: 404,
            error: "Admin does not exites...."
        })
    }

    const validPassword = await admin.isPasswordCorrect(password);

    if (!validPassword) {
        res.status(404).json({
            status: 404,
            error: "Invalid Credintials!!!!"
        })
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin?._id);
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict', // or 'Lax' or 'None' if cross-site
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }

    return res.status(200)
        .cookie('adminAccessToken', accessToken, options)
        .cookie('adminRefreshToken', refreshToken, options)

        .json({
            status: 200,
            message: "Admin  loggedin successfully...",

        })

})


/**
 * Get User Details
 */

const adminDetails = asyncHandler(async (req, resp) => {
    const admin = req.admin;

    const response = await Admin.findById(admin?._id).select("-password -refreshToken");
    if (!admin) {
        return resp.status(404).json({
            error: "Admin not found...",
            success: false
        })
    }

    return resp.status(201).json({
        message: "Admin found",
        success: true,
        admin: response
    })
})

const getUsers = asyncHandler(async (req, resp) => {

    const response = await User.find().select('-password -refreshToken');

    return resp.status(201).json({
        success: true,
        users: response
    })

})


/**
 * Socket.io connection and WebShockets
 */
// const sendMessage = asyncHandler(async (req, resp) => {

//     const response = await Admin.findById(admin?._id).select("-password -refreshToken");



// })

export { adminRegistration, adminLogin, adminDetails,getUsers }
