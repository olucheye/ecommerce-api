const _ = require('lodash');
const router = require('express').Router();
const Electronics = require('../models/electronics.model');

//@Root Routes
router.route("/")

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