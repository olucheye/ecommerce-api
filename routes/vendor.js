const router = require('express').Router();
const Vendor = require('../models/vendor.model');

//@ Router for root 
router.route('/')

     //@@ ROUTE: FETCH (Fetches all Vendors from the vendors collection)
    .get((req,res)=> {

        Vendor.find()
            .then((vendors)=> res.status(200).json({
                success: true,
                count: vendors.length,
                data: vendors

            }))
            .catch((err)=>res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
    })

    //@@ ROUTE: POST (Adds new item to the vendors collection)
    .post((req,res) => {

        let {name, location, phoneNumber} = req.body;

        const newVendor = new Vendor({ name, location, phoneNumber });

        newVendor.save()
            .then((vendor)=> res.status(201).json({
                success: true,
                message: `Vendor successfully saved`,
                data: vendor

            }))
            .catch((err)=>res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
            
    });

module.exports = router;