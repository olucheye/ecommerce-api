const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config()

const MONGOURI = process.env.MONGODB_URI;
//Define URL & confirm connection status
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true});
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

const PORT = (process.env.PORT || 3000);

app.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
});