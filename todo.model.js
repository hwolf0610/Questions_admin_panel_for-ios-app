const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let reactUser = new Schema({
    name: {
        type: String
    },
    birthday: {
        type: String
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    flag:{
        type:String
    }
});
module.exports = mongoose.model('reactUser', reactUser);