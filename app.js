const express = require('express');
const mongoose = require('mongoose');
//const _ = require('lodash');
const PORT = (process.env.PORT || 3000);

//Define URL & confirm connection status
mongoose.connect('mongodb://localhost:27017/theMall', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => console.log("Database is now connected"));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requiring route files
const vendorRouter = require('./routes/vendor');
const groceryRouter = require('./routes/grocery');
const electronicsRouter = require('./routes/electronics');

// Using route files to serve requests to different endpoints
app.use('/api/v1/vendor', vendorRouter);
app.use('/api/v1/grocery', groceryRouter);
app.use('/api/v1/electronics', electronicsRouter);


//Server Output
app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
});