const _ = require('lodash');
const router = require('express').Router();
const Electronics = require('../models/electronics.model');

//@Root Routes 
//@ Promises to handle callbacks reponse and errors
router.route("/")

    .get((req, res)=>{
        Electronics.find()
            .then(electronics => res.status(200).json(electronics))
            .catch(err=> res.status(400).json("Error: " + err));
    });


router.route('/add')
    .post((req,res)=>{
        let brand = _.capitalize(req.body.brand);
        let desc = req.body.desc;
        let store = req.body.store;
        let quantity = req.body.quantity;
        let price = Number(req.body.price);
        let sku = req.body.sku;

        const newElectronics = new Electronics({
            brand,
            desc,
            store,
            quantity,
            price,
            sku,
        });

        newElectronics.save()
            .then(()=> res.status(200).json("New electronics saved"))
            .catch((err)=> res.status(400).json("Error: " + err)); 

    });


//@@ Item specific routes

module.exports = router;