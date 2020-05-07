
const router = require('express').Router();
let Grocery = require('../models/grocery.model');
//let Store = require('../models/vendor.model');

router.route("/")

    .get((req, res)=>{
        Grocery.find({}, function(err, electronics){
            if (!err) {
                res.send(electronics);
            }else{
                res.send(err);
            }
        });
    })

    .post((req,res)=>{

        const productName = req.body.productName;
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


module.exports = router;