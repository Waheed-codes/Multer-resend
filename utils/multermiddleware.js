import path from "path"

import multer from "multer"

const allowedExtensions = [".png", ".jpg", "jpeg", ".webp"]

const allowedMimeType = ["image/png", "image/jpg", "image/jpeg", "image/webp"]


const uploadSimple = multer({ dest: "/home/waheed/Multer-resend/uploads" })

const uploadWithFeatures = multer({
    storage: multer.diskStorage({
        destination: "/home/waheed/Multer-resend/uploads",
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)  //jab yahan pae already apan .extname use karre toh phir baad mae use karne ki zaroorat nhi rehti.
            const name = path.basename(file.originalname, ext)
            const date = Date.now()
            cb(null, `${date}_${name}${ext}`)  //12234_waheed..png error yeh wali line mae tha,.${ext} ki jagah sirf ${ext} user karna 
        }
    }),

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()
        const mime = file.mimetype;  //image/png

        if (!allowedExtensions.includes(ext) || !allowedMimeType.includes(mime)) {
            return cb(new Error("Only PNG,JPG,JPEG,WEBP are allowed"))
        }

        cb(null, true)
    },
    limits: { fileSize: 2 * 1024 * 1024 } //2MB size allowed
})

const uploadMemoryStorage= multer({
    storage:multer.memoryStorage({
        
    })
})
export { uploadSimple, uploadWithFeatures }