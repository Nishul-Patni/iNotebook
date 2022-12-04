const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/inotebookdb";

const connectToMongo = ()=>{
    mongoose.connect(URI, ()=>{
        console.log("Successfully connected to mongoose");
    });
}

module.exports = connectToMongo;