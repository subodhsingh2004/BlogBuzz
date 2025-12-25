import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { ApiError } from "./ApiError.js";

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})



const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                transformation: { width: 280, height: 173, crop: "auto" },
                invalidate: true
            }
        )
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteCloudinary = async (id) => {
    try {
        const response = await cloudinary.uploader.destroy(id, { invalidate: true })
        return response
    } catch (error) {
        throw new ApiError(400, error.message)
    }
}

export { uploadOnCloudinary, deleteCloudinary }