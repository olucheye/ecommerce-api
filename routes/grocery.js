//@requiring lodash to capitalize name input & search to avoid null errors
const _ = require('lodash');
const router = require('express').Router();
let Grocery = require('../models/grocery.model');
//let Store = require('../models/vendor.model');

router.route("/")

    //@@ ROUTE: FETCH (Fetches all items from the electronics collection)
    .get((req, res)=>{
        
        Grocery.find()
            .then((groceries)=> res.status(200).json({
                success: true,
                count: groceries.length,
                data: groceries

            }))
            .catch((err)=>res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
    });

router.route("/add")

    //@@ ROUTE: POST (Adds new item to the electronics collection)
    .post((req,res)=>{

        const productName = _.capitalize(req.body.productName);
        const{store, quantity, price} = req.body;

        const newGrocery = new Grocery({
            productName, store, quantity, price
        });

        newGrocery.save()
            .then((grocery)=> res.status(201).json({
                success: true,
                message: `New Grocery added`,
                data: grocery

            }))
            .catch((err)=>res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
    });


//@== CRUD operations for specific files
//@== using promises and res.json to handle responses and error
//@== Using name instead of ID for specificity

router.route('/:name')

    //@ROUTE: GET
    //@desc: Finds item and returns error if not found
    .get((req,res)=>{
        
        let name = _.capitalize(req.params.name);

        Grocery.findOne({productName: name})
            .then(grocery => {
                if(!grocery){
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
            .catch(err => res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
    })

    //@ROUTE: DELETE
    //@desc: Finds & validate item before deleting
    .delete((req,res)=>{

        let name = _.capitalize(req.params.name);

        Grocery.findOneAndRemove({productName: name})
            .then(grocery => {
                if(!grocery){ 
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

        let name = _.capitalize(req.params.name);

        //findOneAnd - other option to be used
        Grocery.updateOne(
            {productName: name},
            {productName: req.body.productName, store: req.body.store,
            quantity: req.body.quantity, price: req.body.price},
            {overwrite: true}
        )
        .then(grocery => {
            if(!grocery){ 
                res.status(404).json({
                    success: false,
                    message: "Item not found"
                })
            }else{
                res.status(201).json({
                    success: true,
                    message: `${productName} successfully updated`,
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
        let name = _.capitalize(req.params.name);

        let patchedGrocery = Object.entries(req.body).map(item => item[0]);

        Grocery.update(
            {productName: name},
            {$set: req.body}
        )
        .then(()=> res.status(200).json({
            success: true,
            message: `${patchedGrocery} was successfully patched`
        }))
        .catch(err=> res.status(400).json({
            success: false,
            message: 'Error: ' + err
        }));

    });


module.exports = router;