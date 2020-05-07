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

router.route('/:sku')
    .get((req,res)=> {
        let sku = req.params.sku;
        Electronics.findOne({sku: sku})
            .then(item=>res.status(200).json(item))
            .catch(err=> res.status(400).json("Error: " + err));
    })

    .delete((req,res)=>{
        let sku = req.params.sku;

        Electronics.findOneAndDelete({sku: sku})
        .then(()=>res.status(200).json("Item successfully deleted"))
        .catch(err=>res.status(400).json("Error: " + err));
    })

    .put((req,res)=>{
        let sku = req.params.sku;
        let brand = _.capitalize(req.body.brand);

        Electronics.update(
            {sku: sku},
            { 
                brand: req.body.brand, desc: req.body.desc,
                store: req.body.store, quantity: req.body.quantity,
                price: Number(req.body.price),  sku: req.body.sku
            },
            {overwrite:true})
            .then(()=>res.status(200).json(`${brand} successfully updated`))
            .catch(err=>res.status(400).json("Error: " + err));
    })

    .patch((req,res)=>{
        let sku = req.params.sku;
        
        //picking exact values updated
        //let obj = Object.entries(req.body)
       

        Electronics.update({sku: sku}, {$set: req.body})
            .then(()=>res.status(200).json( `successfully updated`))
            // + obj.forEach(value => `${value[0]}`) trying to pass in each updated values
            .catch(err=>res.status(400).json("Error: " + err));
    });

module.exports = router;

