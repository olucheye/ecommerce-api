const mongoose = require('mongoose');
//*@ DB schema and model for Vendor

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be left blank'],
        minlength: 5,
        unique: true,
        trim: true
    },
    location: String,
    phoneNumber: Number,
});

const Store = mongoose.model('Vendor', vendorSchema);

module.exports = Store;