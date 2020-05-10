//@requiring lodash to capitalize name input & search to avoid null errors
const _ = require('lodash');
const router = require('express').Router();
let Grocery = require('../models/grocery.model');
//let Store = require('../models/vendor.model');

router.route("/")

    //@desc: Worked with basic callback functions as required by Mongoose
    .get((req, res)=>{
        Grocery.find({}, function(err, electronics){
            if (!err) {
                res.send(electronics);
            }else{
                res.send(err);
            }
        });
    });

router.route("/add")
    .post((req,res)=>{

        const productName = _.capitalize(req.body.productName);
        const{store, quantity, price} = req.body;

        const newGrocery = new Grocery({
            productName, store, quantity, price
        });

        newGrocery.save(function(err){
            if(!err){
                res.send("New Grocery added");
            }else{
                res.send(err);
            }
        });
    });


//@== CRUD operations for specific files
//@== using promises and res.json to handle responses and error
//@== Using name instead of ID for specificity

router.route('/:name')
    .get((req,res)=>{

        
        let name = _.capitalize(req.params.name);

        Grocery.findOne({productName: name})
            .then(grocery => res.json({
                success: true,
                data: grocery}))
            .catch(err => res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
    })
    .delete((req,res)=>{

        let name = _.capitalize(req.params.name);

        Grocery.findOneAndDelete({productName: name})
            .then(()=>res.json(`Grocery successfully deleted`))
            .catch(err=>res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
    })
    .put((req,res)=>{

        let name = _.capitalize(req.params.name);

        //findOneAnd - other option to be used
        Grocery.update(
            {productName: name},
            {productName: req.body.productName, store: req.body.store,
            quantity: req.body.quantity, price: req.body.price},
            {overwrite: true}

        )
        .then(()=> res.status(200).json({
            success: true,
            message: "Item successfully updated"
        }))
        .catch(err=> res.status(400).json({
                success: false,
                message: 'Error: ' + err
            }));
    })
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