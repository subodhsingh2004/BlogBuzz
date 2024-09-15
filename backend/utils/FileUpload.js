import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


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
            { invalidate: true },
            {
                transformation: { width: 280, height: 173, crop: "auto" }
            })
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