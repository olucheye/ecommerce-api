const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const PORT = (process.env.PORT || 3000);

//import models
//const store = require('models/')

//Define URL & confirm connection status
mongoose.connect('mongodb://localhost:27017/theMall', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => console.log("Database is now connected"));

const app = express();

app.use(express.urlencoded());

//app.use(express.json());

const groceryRouter = require('./routes/grocery');
const electronicsRouter = require('./routes/electronics');


app.use('/grocery', groceryRouter);
app.use('/electronics', electronicsRouter);


app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
});