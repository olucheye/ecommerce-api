const mongoose = require('mongoose');

//@* import vendor vendor schema here

//*@ DB schema and model for Vendor

const electronicsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Name cannot be left blank'],
        minlength: 5,
        unique: true,
        trim: true
    },
    modelNumber: Number,
    store: String,
    quantity: Number,
    price: Number,
    sku: Number,
    vendor: vendorSchema

});

const Electronics = mongoose.model('Electronic', electronicsSchema);

module.exports = Electronics;