import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

const uploadOnCloudinary = async (imagePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SERCRETE
    });

    return await cloudinary.uploader.upload(imagePath, { folder: "ArthpurnConaltants_UserData" }, (err, result) => {
        if (err) console.log(err)
    })
}
export { uploadOnCloudinary }