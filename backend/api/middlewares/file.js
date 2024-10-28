import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        const newFileName = file.fieldname + '-' + uniqueSuffix + ext
        req.body.url = `uploads/${newFileName}`
        cb(null, newFileName)
    }
  });
  
const upload = multer({ storage });

export default upload;

