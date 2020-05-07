const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    desc: String,
    store: String,
    quantity: Number,
    price: Number,
    sku: Number,
    //vendor: vendorSchema

});

const Electronics = mongoose.model('Electronic', electronicsSchema);

module.exports = Electronics;