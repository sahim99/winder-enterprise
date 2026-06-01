import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadProductImage(buffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'products',
        public_id: filename.split('.')[0], // remove extension
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result?.secure_url || '')
      }
    ).end(buffer)
  })
}

export { cloudinary }
