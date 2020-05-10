const _ = require('lodash');
const router = require('express').Router();
const Electronics = require('../models/electronics.model');

//@Root Routes 
//@ Promises to handle callbacks reponse and errors
router.route("/")

    //@@ ROUTE: FETCH (Fetches all items from the electronics collection)
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
    //@@ ROUTE: POST (Adds new item to the electronics collection)
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
//@@ DESC: Uses sku as key for operation and not Object.id

router.route('/:sku')

    //@ROUTE: GET
    //@desc: Finds item and returns error if not found
    .get((req,res)=> {

        let {sku} = req.params;

        Electronics.findOne({sku: sku})
            .then(item => {
                if(!item){
                    res.status(404).json({
                        success: false,
                        message: "Item not found",
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        data: item
                    })
                }
            })
            .catch(err=> res.status(400).json({
                success: false,
                message: "Error: " + err
            }));
    })

    //@ROUTE: DELETE
    //@desc: Finds & validate item before deleting
    .delete((req,res)=>{

        let {sku} = req.params;
       
        Electronics.findOneAndRemove({sku:sku})
            .then(electronic => {
                if(!electronic){ 
                    res.status(404).json({
                        success: false,
                        message: "Item not found"
                    })
                }else{
                    res.status(204).json({
                        success: true,
                        message: "Item successfully deleted"
                    })
                }
            })
            .catch(err=>res.status(400).json({
                success: false,
                message: "Error: " + err
            }));
    })

    //@ROUTE: PUT
    //@desc: Finds item before updating
    .put((req,res)=>{
        let {sku} = req.params;
        let brand = _.capitalize(req.body.brand);

        Electronics.updateOne(
            //let{ brand, desc, store, quantity, price, sku } = req.body;
            {sku: sku},
            { 
                brand: req.body.brand, desc: req.body.desc,
                store: req.body.store, quantity: req.body.quantity,
                price: Number(req.body.price),  sku: req.body.sku
            },
            {overwrite:true})

            .then(electronic => {
                if(!electronic){ 
                    res.status(404).json({
                        success: false,
                        message: "Item not found"
                    })
                }else{
                    res.status(201).json({
                        success: true,
                        message: `${brand} successfully updated`,
                        data: item
                    })
                }
            })
            .catch(err=>res.status(400).json({
                success: false,
                message: "Error: " + err
            }));
    })

    //@ROUTE: PATCH
    .patch((req,res)=>{
        let sku = req.params.sku;
        
        //picking exact values updated
        let patchedData = Object.entries(req.body).map(val=>val[0]);

        Electronics.updateOne({sku: sku}, {$set: req.body})
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

