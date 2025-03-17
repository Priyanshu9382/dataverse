import multer from 'multer'
// Multer middleware helps in handling multipart form especially when it includes uploading files. It adds req.file or .files to the request

// multer gives two options for controlling where to store the files: one is diskStorage and memoryStorage. 
// DiskStorage gives two options: destination and filename. 
// destination allows where to store the file.The function written past it takes (req, file, cb(callback)) as arguments. Note: the file path should be given relative to the directory in which the backend is written. For eg in this project it should be relative to backend hence ./public/temp.
// filename allows you to name a file according to your set nomenclature or you can use the originalname as it was stored in the users computer using the api .originalname It takes the same argument as the function written for destination.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
// Generally upload({dest: }) is used but for more control we need to export the storage.
export const upload = multer({ 
    storage,
 })