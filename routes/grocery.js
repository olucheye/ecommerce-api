//@requiring lodash to capitalize name input & search to avoid null errors
const _ = require('lodash');
const router = require('express').Router();
let Grocery = require('../models/grocery.model');
//let Store = require('../models/vendor.model');

router.route("/")

    //@ Worked with basic callback functions as required by Mongoose
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
        const store = req.body.store;
        const quantity = req.body.quantity;
        const price = req.body.price;

        const newGrocery = new Grocery({
            productName,
            store,
            quantity,
            price
        });

        newGrocery.save(function(err){
            if(!err){
                res.send("New Grocery added");
            }else{
                res.send(err);
            }
        });
    });

/*
//@== CRUD operations for specific files
@== using promises and res.json to handle responses and error
@== Using name instead of ID for specificity
*/
router.route('/:name')
    .get((req,res)=>{

        let name = _.capitalize(req.params.name);

        Grocery.findOne({productName: name})
            .then(grocery => res.json(grocery))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .delete((req,res)=>{

        let name = _.capitalize(req.params.name);

        Grocery.findOneAndDelete({productName: name})
            .then(()=>res.json(`Grocery successfully deleted`))
            .catch(err=>res.status(400).json("Error: " + err));
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
        .then(()=> res.status(200).json('Grocery was successfully updated'))
        .catch(err=> res.status(400).json("Error: " + err));
    })
    .patch((req,res)=>{
        let name = _.capitalize(req.params.name);
        Grocery.update(
            {productName: name},
            {$set: req.body}
        )
        .then(()=> res.status(200).json('Grocery was successfully updated'))
        .catch(err=> res.status(400).json("Error: " + err));

    });


module.exports = router;