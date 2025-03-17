import express from 'express'
import {registerUser, loginUser} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
const router = express.Router()

// the router can be considered as switch as if the route hit by user is register it would do the following thing or if the user hits /login then do this.
// There are various HTTP methods like GET, POST etc. 
// Here the upload is the multer middleware which helps in uploading files in three ways. First is .single('filename') filename being the name used in the frontend or .fields([{fieldname: "filename or the fieldname used in frontend", maxCount: 1(no of files to be accepted)}, {fieldname: "fieldname 2", maxCount: 1}]) or by taking multiple files in a single fieldname .array('fieldname', no of files)
// Then call the controller for the main code to be carried out.
router.route('/register').post(
    upload.single("profileImg"),
    registerUser)

router.route('/login').post(loginUser)
export default router