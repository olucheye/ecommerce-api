const express = require('express');
const app = express();


let Store = require('../models/vendor.model');

app.route("/electronics/")
    .get((req, res)=>{
        electronics.find({}, function(err, electronics){
            if (!err) {
                res.send(electronics);
            }else{
                res.send(err);
            }
        });
    })

    .post((req,res)=>{

    });