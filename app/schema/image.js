var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var imageSchema = new Schema({
        image_name: String
    },
    { timestamps: true }
);

var image = mongoose.model('image', imageSchema);
module.exports = image;