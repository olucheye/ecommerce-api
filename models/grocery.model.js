const mongoose = require('mongoose');

//@* import vendor vendor schema here

//*@ DB schema and model for Vendor

const grocerySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'No Name?'],
        trim: true
    },
    store: String,
    quantity: Number,
    price: Number,
    //vendor: vendorSchema

});

const Grocery = mongoose.model('Grocery', grocerySchema);

module.exports = Grocery;