import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const rawCookie = req.headers.cookie;
    const cookies = Object.fromEntries(
        rawCookie.split('; ').map(cookie => cookie.split('='))
    );
    const token = req.cookies?.userRefreshToken || cookies?.userRefreshToken;

    if (!token) {
        return res.res.status(404).json({
            error: "Unauthorized user..",
            success: false
        })
    }
    try {
        const decodedtoken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRETE)
        req.user = decodedtoken;
        next()
    } catch (error) {
        return res.res.status(404).json({
            error: "error",
            success: false
        })
    }
};
export default userAuth;