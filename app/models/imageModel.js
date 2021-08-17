const Image = require('../schema/image')

module.exports = class ImageModel {

    /**
     * Add new image in to the database
     * @param {*} data 
     * @param {*} callback 
     */
    static newImage = (data, callback) => {
        Image.create(data, function(err, result){
            if(err){
                callback({'error': true, data: result})
            } else {
                callback({'error': false, data: result})
            }
        })
    }
}