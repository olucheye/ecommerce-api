const router = require('express').Router();
const Vendor = require('../models/vendor.model');

//@ Router for root 
router.route('/')

    .get((req,res)=> {
        Vendor.find({}, function(err, vendor){
            if (!err) {
                res.send(vendor);
            }else{
                res.send(err);
            }
        });
    })

    .post( (req,res) => {

        const name = req.body.name;
        const location = req.body.location;
        const phoneNumber = req.body.phoneNumber;

        const newVendor = new Vendor({
            name,
            location,
            phoneNumber
        });

        newVendor.save(function(err){
            if(!err){
                res.send("New vendor saved");
            }else{
                res.send(err);
            }
        });


    });



module.exports = router;