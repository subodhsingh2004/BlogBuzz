import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

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
        console.log("working")
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                transformation: { width: 280, height: 173, crop: "auto" },
                invalidate: true
            }
        )
        console.log("file is uploaded", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log(error.message)
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteCloudinary = async (id) => {
    try {
        const response = await cloudinary.uploader.destroy(id, { invalidate: true })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export { uploadOnCloudinary, deleteCloudinary }