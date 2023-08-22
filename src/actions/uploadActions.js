'use server'
import path from 'path'
import fs from 'fs/promises'
import os from 'os'
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

async function savePhotosToLocal(formData){
    const file = formData.get('image');
    const buffersPromise = file.arrayBuffer()
    .then(data => {
        const buffer = Buffer.from(data);
        const name = uuidv4();
        const ext = file.type.split("/")[1];

        // const uploadDir = path.join(process.cwd(), "public", `/${name}.${ext}`);// doesnt work in vercel
        
        const tmpDir = os.tmpdir();
        const uploadDir = path.join(tmpDir, `/${name}.${ext}`);
        fs.writeFile(uploadDir, buffer);

        return { filepath: uploadDir, filename: file.name }
    })

    return await Promise.resolve(buffersPromise);
}

async function uploadPhotoToCloudinary(newFile){
    const photosPromise = cloudinary.v2.uploader.upload(newFile.filepath, { folder: 'nextjs_upload'});

    return await Promise.resolve(photosPromise)
}

export async function uploadPhoto(formData){

    try {
        //Save to Temp Folder
        const newFile = await savePhotosToLocal(formData);

        //Save To Cloud after saving to temp folder
        const photo = await uploadPhotoToCloudinary(newFile);

        //Deleting from Temp folder after uploaded to cloud
        fs.unlink(newFile.filepath);

        revalidatePath("/");
        return photo;

    } catch (error) {
        return { errorMsg: error.message}
    }
}

export async function getAllPhotos(){

    try {
        const {resources} = await cloudinary.v2.search.expression(
            'folder:nextjs_upload/*'
        ).sort_by('created_at').max_results(500).execute();
        return resources;
    } catch (error) {
        return { errorMsg: error.message}
    }
}