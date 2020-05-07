const mongoose = require('mongoose');
//*@ DB schema and model for Vendor

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be left blank'],
        minlength: 5,
        trim: true
    },
    location: String,
    phoneNumber: Number,
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;