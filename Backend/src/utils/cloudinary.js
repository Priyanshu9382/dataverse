import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


// Configuration as same as given on cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadonCloudinary = async function(localFilePath) {
    try {
        if(!localFilePath) return null
        // Upload an image
        const response = await cloudinary.uploader
           .upload(
              localFilePath,{
                resource_type: 'auto'
              } 
           )
        fs.unlinkSync(localFilePath) // deletes the file from local storage of server in case of success
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // deletes the file from local storage of server in case of failure
        return null
    }
}

export {uploadonCloudinary}