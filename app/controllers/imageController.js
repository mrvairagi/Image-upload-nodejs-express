const multer  = require('multer')
const ImageModel = require('../models/imageModel')
const helpers = require('../helpers')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
// multer({ storage: storage })

module.exports = class ImageController {

    /**
     * Add new image
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */

    static newImage = (req, res) => {
        
        let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('avatar');
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.json({status:false, message: req.fileValidationError});
            }
            else if (!req.file) {
                return res.json({status:false, message: 'Please select an image to upload'});
            }
            else if (err instanceof multer.MulterError) {
                return res.json({status:false, message: err});
            }
            else if (err) {
                return res.json({status:false, message: err});
            }
    
            // Save uploaded image
            let imageData = {
                image_name: req.file.filename
            }

            ImageModel.newImage(imageData, function(result, err){
                if(err) { return err }
                else{
                    if(result.error == false){
                        return res.json({
                            status: true,
                            data: result.data, 
                            message: 'Image is saved'
                        })
                    } else {
                        return res.json({
                            status: false,
                            data: result, 
                            message: 'Something went wrong'
                        })
                    }
                }
            })
        });
    }

} // End of class