const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        isRequired:true
    },
    email:{
        type:String,
        isRequired: true,
        unique:true
    },
    password:{
        type: String,
        isRequired:true
    }
});

module.exports = mongoose.model('user', userSchema);