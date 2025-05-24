import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    const rawCookie = req.headers.cookie;
    const cookies = Object.fromEntries(
        rawCookie?.split('; ').map(cookie => cookie.split('='))
    );
    const token = req.cookies?.adminRefreshToken || cookies?.adminRefreshToken;
    
    if (!token) {
        return res.res.status(404).json({
            error: "Unauthorized admin..",
            success: false
        })
    }
    try {
        const decodedtoken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRETE)
        req.admin = decodedtoken;
        next()
    } catch (error) {
        return res.res.status(404).json({
            error: "error",
            success: false
        })
    }
};
export default adminAuth;