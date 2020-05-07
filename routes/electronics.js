
const router = require('express').Router();
//let Store = require('../models/vendor.model');

router.route("/electronics/")

    .get((req, res)=>{
        Electronics.find({}, function(err, electronics){
            if (!err) {
                res.send(electronics);
            }else{
                res.send(err);
            }
        });
    })

    .post((req,res)=>{

    });


module.exports = router;