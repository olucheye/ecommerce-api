const _ = require('lodash');
const router = require('express').Router();
const Electronics = require('../models/electronics.model');

//@Root Routes 
//@ Promises to handle callbacks reponse and errors
router.route("/")

    .get((req, res)=>{
        Electronics.find()
            .then(electronics => res.status(200).json({
                success: true,
                count: electronics.length,
                data: electronics
            }))
            .catch(err=> res.status(400).json({
                success: false,
                message: "Error: " + err
            }));
    });


router.route('/add')
    .post((req,res)=>{
        let brand = _.capitalize(req.body.brand);
        let {desc, store, quantity, price, sku} = req.body;
        

        const newElectronics = new Electronics({
             brand, desc, store, quantity, price, sku
        });

        newElectronics.save()
            .then(electronic => res.status(201).json({
                success: true,
                message: "New electronics added",
                data: electronic
            }))
            .catch((err)=> res.status(400).json({
                success: false,
                message: "Error: " + err
            })); 

    });


//@@ Item specific routes [GET, DELETE, PUT & PATCH]
//@@ DESC: Using sku as key for operation and not Object.id

router.route('/:sku')
    .get((req,res)=> {

        let {sku} = req.params;

        Electronics.findOne({sku: sku})
            .then(item=>res.status(200).json({
                success: true,
                data: item
            }))
            .catch(err=> res.status(400).json({
                success: false,
                message: "Error: " + err
            }));
    })

    .delete((req,res)=>{

        let {sku} = req.params;

        Electronics.findOneAndDelete({sku: sku})
        .then(()=>res.status(200).json({
            success: true,
            message: "Item successfully deleted"
        }))
        .catch(err=>res.status(400).json({
            success: false,
            message: "Error: " + err
        }));
    })

    .put((req,res)=>{
        let {sku} = req.params;
        let brand = _.capitalize(req.body.brand);

        Electronics.update(

            //let{ brand, desc, store, quantity, price, sku } = req.body;
            {sku: sku},
            { 
                brand: req.body.brand, desc: req.body.desc,
                store: req.body.store, quantity: req.body.quantity,
                price: Number(req.body.price),  sku: req.body.sku
            },
            {overwrite:true})

            .then(()=>res.status(200).json({
                success: true,
                message: `${brand} successfully updated`,
                data: item
            }))
            .catch(err=>res.status(400).json({
                success: false,
                message: "Error: " + err
            }));
    })

    .patch((req,res)=>{
        let sku = req.params.sku;
        
        //picking exact values updated
        let patchedData = Object.entries(req.body).map(val=>val[0]);

        Electronics.update({sku: sku}, {$set: req.body})
            .then(()=>res.status(200).json( {
                success: true,
                message: `${patchedData} was updated`
            }))
            .catch(err=>res.status(400).json({
                success: false,
                message: "Error: " + err
            }));
    });

module.exports = router;

