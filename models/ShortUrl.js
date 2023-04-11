const mongoose = require('mongoose');
const shortId = require('shortid');

// model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate 
    },
    clicks: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('ShortUrl', shortUrlSchema)