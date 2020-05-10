const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    desc: String,
    store: String,
    quantity: Number,
    price: Number,
    sku: {
        type: Number,
        required: true,
        trim: true
    }
    //vendor: vendorSchema

});

const Electronics = mongoose.model('Electronic', electronicsSchema);

module.exports = Electronics;